defmodule Api.Routes.GoogleAuth do
  import Plug.Conn
  use Plug.Router

  alias Adapters.Users

  plug(:match)
  plug(:dispatch)

  get "/web" do
    conn
    |> Plug.Conn.put_private(:ueberauth_request_options, %{
      callback_url: Application.get_env(:api, :api_url) <> "/auth/google/callback",
      options: [default_scope: "email profile"]
    })
    |> Ueberauth.Strategy.Google.handle_request!()
  end

  get "/callback" do
    conn
    |> fetch_query_params()
    |> Plug.Conn.put_private(:ueberauth_request_options, %{
      callback_url: Application.get_env(:api, :api_url) <> "/auth/google/callback",
      options: [default_scope: "email profile"]
    })
    |> Ueberauth.Strategy.Google.handle_callback!()
    |> handle_callback()
  end

  def get_base_url do
    Application.fetch_env!(:api, :web_url)
  end

  def handle_callback(
        %Plug.Conn{assigns: %{ueberauth_failure: %{errors: [%{message_key: "missing_code"}]}}} =
          conn
      ) do
    conn
    |> Api.Plugs.Redirect.redirect(
      get_base_url() <>
        "/?error=" <>
        URI.encode("try again")
    )
  end

  def handle_callback(%Plug.Conn{assigns: %{ueberauth_failure: failure}} = conn) do
    IO.puts("google oauth failure")
    IO.inspect(failure)

    conn
    |> Api.Plugs.Redirect.redirect(
      get_base_url() <>
        "/?error=" <>
        URI.encode(
          "something went wrong, try again and if the error persists, tell irere to check the server logs"
        )
    )
  end

  def handle_callback(
        %Plug.Conn{private: %{google_user: user, google_token: %{access_token: _access_token}}} =
          conn
      ) do
    try do
      {_, db_user} = Users.google_find_or_create(user)

      conn
      |> Api.Plugs.Redirect.redirect(
        get_base_url() <>
          "/?accessToken=" <>
          Utils.AccessToken.generate_and_sign!(%{"userId" => db_user.id}) <>
          "&refreshToken=" <>
          Utils.RefreshToken.generate_and_sign!(%{
            "userId" => db_user.id,
            "tokenVersion" => db_user.tokenVersion
          })
      )
    rescue
      e in RuntimeError ->
        conn
        |> Api.Plugs.Redirect.redirect(
          get_base_url() <>
            "/?error=" <>
            URI.encode(e.message)
        )
    end
  end
end
