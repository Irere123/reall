defmodule Api.Routes.TwitterAuth do
  import Plug.Conn
  use Plug.Router

  require Logger
  alias Adapters.Users
  alias Api.Plugs.Redirect

  plug(:match)
  plug(:dispatch)

  get "/web" do
    token =
      ExTwitter.request_token(Application.get_env(:api, :api_url) <> "/auth/twitter/callback")

    {:ok, authenticate_url} = ExTwitter.authenticate_url(token.oauth_token)

    conn
    |> Redirect.redirect(authenticate_url)
  end

  get "/callback" do
    conn_with_qp =
      conn
      |> fetch_query_params

    base_url = Application.fetch_env!(:api, :web_url)

    try do
      with %{"oauth_token" => oauth_token, "oauth_verifier" => oauth_verifier} <-
             conn_with_qp.query_params,
           {:ok, access_token} <- ExTwitter.access_token(oauth_verifier, oauth_token),
           _ <-
             ExTwitter.configure(
               consumer_key: System.get_env("TWITTER_API_KEY"),
               consumer_secret: System.get_env("TWITTER_SECRET_KEY"),
               access_token: access_token.oauth_token,
               access_token_secret: access_token.oauth_token_secret
             ),
           %ExTwitter.Model.User{
             description: bio,
             name: username,
             id_str: twitterId,
             raw_data: %{email: email},
             profile_image_url_https: avatarUrl,
             profile_banner_url: bannerUrl
           } <- ExTwitter.verify_credentials(include_email: true),
           {_, db_user} <-
             Users.twitter_find_or_create(%{
               bio: bio,
               username: username,
               twitterId: twitterId,
               bannerUrl: bannerUrl,
               email: email,
               avatarUrl: avatarUrl
             }) do
        conn
        |> Redirect.redirect(
          base_url <>
            "/?accessToken=" <>
            Utils.AccessToken.generate_and_sign!(%{"userId" => db_user.id}) <>
            "&refreshToken=" <>
            Utils.RefreshToken.generate_and_sign!(%{
              "userId" => db_user.id,
              "tokenVersion" => db_user.tokenVersion
            })
        )
      else
        x ->
          IO.inspect(x)

          conn
          |> Redirect.redirect(
            base_url <>
              "/?error=" <>
              URI.encode("twitter login callback failed for some reason, tell ben to check logs")
          )
      end
    rescue
      e ->
        IO.inspect(e)

        conn_with_qp
        |> Redirect.redirect(
          base_url <>
            "/?error=" <>
            URI.encode("auth failed, enable cookies and try again or give Facebook a try")
        )
    end
  end
end
