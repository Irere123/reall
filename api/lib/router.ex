defmodule Api.Router do
  import Plug.Conn

  alias Api.Routes.DevOnly

  use Plug.Router
  plug(Api.Plugs.Cors)
  plug(:match)
  plug(:dispatch)

  options _ do
    send_resp(conn, 200, "")
  end

  forward("/dev", to: DevOnly)

  get _ do
    send_resp(conn, 404, "not found")
  end

  post _ do
    send_resp(conn, 404, "not found")
  end
end
