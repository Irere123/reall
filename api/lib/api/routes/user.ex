defmodule Api.Routes.User do
  import Plug.Conn

  alias Adapters.Users

  use Plug.Router

  plug(Api.Plugs.Cors)
  plug(:match)
  plug(:dispatch)

  get "/:username" do
    %Plug.Conn{params: %{"username" => username}} = conn

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(
      200,
      Jason.encode!(%{user: Users.get_by_username(username)})
    )
  end
end
