defmodule Api.Router do
  import Plug.Conn

  alias Api.Routes.Stats
  alias Api.Routes.FacebookAuth
  alias Api.Routes.TwitterAuth
  alias Api.Routes.DevOnly

  use Plug.Router
  plug(Api.Plugs.Cors)
  plug(:match)
  plug(:dispatch)

  options _ do
    send_resp(conn, 200, "")
  end

  forward("/dev", to: DevOnly)
  forward("/stats", to: Stats)
  forward("/auth/facebook", to: FacebookAuth)
  forward("/auth/twitter", to: TwitterAuth)

  get _ do
    send_resp(conn, 404, "not found")
  end

  post _ do
    send_resp(conn, 404, "not found")
  end
end
