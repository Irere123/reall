defmodule Api.Routes.FacebookAuth do
  import Plug.Conn
  use Plug.Router
  alias Api.Plugs.Redirect

  plug(:match)
  plug(:dispatch)

  get "/web" do
    state =
      if Application.get_env(:api, :staging?) do
        %{
          redirect_base_url: fetch_query_params(conn).query_params["redirect_after_base"]
        }
        |> Jason.encode!()
        |> Base.encode64()
      else
        "web"
      end

    %{conn | params: Map.put(conn.params, "state", state)}
    |> Plug.Conn.put_private(:ueberauth_request_options, %{
      callback_url: Application.get_env(:api, :api_url) <> "/auth/discord/callback",
      options: [
        default_scope: "email",
        prompt: "none"
      ]
    })
    |> Ueberauth.Strategy.Facebook.handle_request!()
  end

  get "/callback" do
    conn
    |> fetch_query_params()
    |> Plug.Conn.put_private(:ueberauth_request_options, %{
      callback_url: Application.get_env(:api, :api_url) <> "/auth/discord/callback",
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
          "something went wrong, try again and if the error persists, tell ben to check the server logs"
        )
    )
  end

  # def handle_callback(
  #       %Plug.Conn{private: %{user: user, token: %{access_token: access_token}}} = conn
  #     ) do
  #   conn |> Redirect.redirect("/")
  # end
end
