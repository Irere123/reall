defmodule Api.Routes.FacebookAuth do
  import Plug.Conn
  use Plug.Router
  alias Api.Plugs.Redirect

  plug(:match)
  plug(:dispatch)

  get "/web" do
    conn
    |> Plug.Conn.put_private(:ueberauth_request_options, %{
      callback_url: Application.get_env(:api, :api_url) <> "/auth/facebook/callback",
      options: [
        default_scope: "email,public_profile,user_friends"
      ]
    })
    |> Ueberauth.Strategy.Facebook.handle_request!()
  end

  get "/callback" do
    conn
    |> fetch_query_params()
    |> Plug.Conn.put_private(:ueberauth_request_options, %{
      callback_url: Application.get_env(:api, :api_url) <> "/auth/facebook/callback",
      options: []
    })
    |> Ueberauth.Strategy.Facebook.handle_callback!()
    |> handle_callback()
  end

  defp get_base_url do
    Application.fetch_env!(:api, :web_url)
  end

  def handle_callback(
        %Plug.Conn{assigns: %{ueberauth_failure: %{errors: [%{message_key: "missing_code"}]}}} =
          conn
      ) do
    conn
    |> Redirect.redirect(
      get_base_url() <>
        "/?error=" <>
        URI.encode("try again")
    )
  end

  def handle_callback(%Plug.Conn{assigns: %{ueberauth_failure: failure}} = conn) do
    IO.puts("Facebook oauth failure")
    IO.inspect(failure)

    conn
    |> Redirect.redirect(
      get_base_url() <>
        "/?error=" <>
        URI.encode(
          "something went wrong, try again and if the error persists, tell irere to check the server logs"
        )
    )
  end

  def handle_callback(
        %Plug.Conn{private: %{facebook_user: user, facebook_token: %{access_token: access_token}}} =
          conn
      ) do
    IO.inspect(user)
    IO.inspect(access_token)

    conn |> Redirect.redirect("/")
  end
end
