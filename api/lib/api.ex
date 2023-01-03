defmodule Api do
  use Application

  def start(_type, _args) do
    children = [
      Components.Supervisors.UserSession,
      Components.StatsCache,
      {Adapters.Repo, []},
      {Plug.Cowboy,
       scheme: :http,
       plug: Api.Router,
       options: [
         port: String.to_integer(System.get_env("PORT") || "4000"),
         dispatch: dispatch(),
         protocol_options: [idle_timeout: :infinity]
       ]}
    ]

    opts = [strategy: :one_for_one, name: Api.Supervisor]

    # TODO: make these into taks

    case Supervisor.start_link(children, opts) do
      {:ok, pid} ->
        {:ok, pid}

      error ->
        error
    end
  end

  defp dispatch do
    [
      {:_,
       [
         {"/socket", Api.SocketHandler, []},
         {:_, Plug.Cowboy.Handler, {Api.Router, []}}
       ]}
    ]
  end
end
