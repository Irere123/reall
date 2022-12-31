defmodule Api.Routes.DevOnly do
  import Plug.Conn

  use Plug.Router

  plug(:match)
  plug(:dispatch)

  get "/" do
    send_resp(conn, 200, "Hello world")
  end
end
