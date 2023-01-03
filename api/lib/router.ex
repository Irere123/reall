defmodule Api.Router do
  import Plug.Conn

  alias Api.Routes.Stats
  alias Api.Routes.User
  alias Api.Routes.TwitterAuth
  alias Api.Routes.GoogleAuth
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
  forward("/user", to: User)
  forward("/auth/twitter", to: TwitterAuth)
  forward("/auth/google", to: GoogleAuth)

  get _ do
    send_resp(conn, 404, "not found")
  end

  post _ do
    send_resp(conn, 404, "not found")
  end
end
