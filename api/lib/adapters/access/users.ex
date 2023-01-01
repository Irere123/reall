defmodule Adapters.Access.Users do
  import Ecto.Query, warn: false

  alias Adapters.Queries.Users, as: Query
  alias Api.Repo

  def get(user_id) do
    Repo.get(User, user_id)
  end

  def get_by_id(user_id) do
    Repo.get(User, user_id)
  end

  def get_by_username(username) do
    Query.start()
    |> Query.filter_by_username(username)
    |> Repo.one()
  end
end
