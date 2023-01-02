defmodule Adapters.Mutations.Users do
  import Ecto.Query, warn: false

  alias Api.Repo
  alias Api.Schemas.User
  alias Adapters.Queries.Users, as: Query

  def delete(user_id) do
    %User{id: user_id} |> Repo.delete()
  end

  def bulk_insert(users) do
    Repo.insert_all(
      User,
      users,
      on_conflict: :nothing
    )
  end

  def set_ip(user_id, ip) do
    Query.start()
    |> Query.filter_by_id(user_id)
    |> Query.update_set_ip(ip)
    |> Repo.update_all([])
  end

  def set_online(user_id) do
    Query.start()
    |> Query.filter_by_id(user_id)
    |> Query.update_set_online_true()
    |> Repo.update_all([])
  end

  def set_offline(user_id) do
    Query.start()
    |> Query.filter_by_id(user_id)
    |> Query.update_set_online_false()
    |> Query.update_set_last_online_to_now()
    |> Repo.update_all([])
  end

  def twitter_find_or_create(user) do
    db_user =
      from(u in User,
        where: u.twitterId == ^user.twitterId,
        limit: 1
      )
      |> Repo.one()

    if db_user do
      if is_nil(db_user.twitterId) do
        from(u in User,
          where: u.id == ^db_user.id,
          update: [
            set: [
              twitterId: ^user.twitterId
            ]
          ]
        )
        |> Repo.update_all([])
      end

      {:find, db_user}
    else
      {:create,
       Repo.insert!(
         %User{
           username: user.username,
           email: if(user.email == "", do: nil, else: user.email),
           twitterId: user.twitterId,
           avatarUrl: user.avatarUrl,
           bannerUrl: user.bannerUrl,
           bio: user.bio
         },
         returning: true
       )}
    end
  end
end