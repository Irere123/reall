defmodule Api.Repo do
  use Ecto.Repo,
    otp_app: :api,
    adapter: Ecto.Adapters.Postgres,
    pool_size: 20,
    timeout: 15_000
end
