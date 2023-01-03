import Config

config :api, ecto_repos: [Adapters.Repo]
config :api, websocket_auth_timeout: 10_000

config :api, Api.Repo,
  pool_size: 30,
  ssl: true

config :extwitter, :json_library, Jason

config :ueberauth, Ueberauth,
  providers: [
    facebook: {Ueberauth.Strategy.Facebook, []},
    google: {Ueberauth.Strategy.Google, []}
  ]

config :api, Facebook,
  client_id: System.get_env("FACEBOOK_CLIENT_ID"),
  client_secret: System.get_env("FACEBOOK_CLIENT_SECRET"),
  redirect_uri: "http://localhost:4000/auth/facebook/callback"

config :plug_cowboy,
  log_exceptions_with_status_code: [400..599]

import_config "#{Mix.env()}.exs"
