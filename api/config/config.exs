import Config

config :api, ecto_repos: [Api.Repo]
config :api, websococket_auth_timeout: 10_000

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

config :plug_cowboy,
  log_exceptions_with_status_code: [400..599]

import_config "#{Mix.env()}.exs"
