defmodule Adapters.Access.Users do
  import Ecto.Query, warn: false

  alias Adapters.Queries.Users, as: Query
  alias Api.Repo
  alias Api.Schemas.User

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

  def get_ip(user_id) do
    # DO NOT COPY/PASTE THIS FUNCTION
    try do
      Components.UserSession.get(user_id, :ip)
    catch
      _, _ ->
        case get_by_id(user_id) do
          nil -> nil
          %{ip: ip} -> ip
        end
    end
  end
end
