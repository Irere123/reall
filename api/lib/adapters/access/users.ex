defmodule Adapters.Access.Users do
  import Ecto.Query, warn: false
  @fetch_limit 16

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

  def get_top_users(offset \\ 0) do
    items =
      from(u in User,
        order_by: [desc: u.numLikes],
        offset: ^offset,
        limit: ^@fetch_limit
      )
      |> Repo.all()

    {Enum.slice(items, 0, -1 + @fetch_limit),
     if(length(items) == @fetch_limit, do: -1 + offset + @fetch_limit, else: nil)}
  end

  def search_username(query) do
    search_str = query <> "%"

    Query.start()
    # here
    |> where([u], ilike(u.username, ^search_str))
    |> order_by([u], desc: u.numLikes)
    |> limit([], 15)
    |> Repo.all()
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
