import Config

config :api, ecto_repos: [Adapters.Repo]
config :api, websocket_auth_timeout: 10_000

config :extwitter, :json_library, Jason

config :ueberauth, Ueberauth,
  providers: [
    facebook:
      {Ueberauth.Strategy.Facebook,
       [
         default_scope: "email,public_profile,user_friends",
         display: "popup",
         profile_fields: "name,email,first_name,last_name"
       ]}
  ]

config :api, Facebook,
  client_id: System.get_env("FACEBOOK_CLIENT_ID"),
  client_secret: System.get_env("FACEBOOK_CLIENT_SECRET"),
  redirect_uri: "http://localhost:4000/auth/facebook/callback"

config :plug_cowboy,
  log_exceptions_with_status_code: [400..599]

import_config "#{Mix.env()}.exs"
