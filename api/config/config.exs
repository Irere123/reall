import Config

config :api, ecto_repos: [Api.Repo]
config :api, websococket_auth_timeout: 10_000

config :extwitter, :json_library, Jason

import_config "#{Mix.env()}.exs"
