defmodule Adapters.Follows do
  @moduledoc """
   Context module for follows
  """

  import Ecto.Query

  @fetch_limit 21

  alias Schemas.User
  alias Schemas.Follow

  def bulk_insert(follows) do
    Adapters.Repo.insert_all(
      Follow,
      follows,
      on_conflict: :nothing
    )
  end

  # "guard"
  def following_me?(user_id, user_id_to_check) do
    not is_nil(
      from(
        f in Follow,
        where: f.userId == ^user_id and f.followerId == ^user_id_to_check
      )
      |> Adapters.Repo.one()
    )
  end

  def delete(user_id, follower_id) do
    {rows_affected, _} =
      from(f in Follow, where: f.userId == ^user_id and f.followerId == ^follower_id)
      |> Adapters.Repo.delete_all()

    if rows_affected == 1 do
      from(u in User,
        where: u.id == ^user_id,
        update: [
          inc: [
            numFollowers: -1
          ]
        ]
      )
      |> Adapters.Repo.update_all([])

      from(u in User,
        where: u.id == ^follower_id,
        update: [
          inc: [
            numFollowing: -1
          ]
        ]
      )
      |> Adapters.Repo.update_all([])
    end
  end

  def insert(data) do
    %Follow{}
    |> Follow.insert_changeset(data)
    |> Adapters.Repo.insert()
    |> case do
      {:ok, _} ->
        # TODO: eliminate N+1 by setting up changesets
        # in an idiomatic fashion.

        from(u in User,
          where: u.id == ^data.userId,
          update: [
            inc: [
              numFollowers: 1
            ]
          ]
        )
        |> Adapters.Repo.update_all([])

        from(u in User,
          where: u.id == ^data.followerId,
          update: [
            inc: [
              numFollowing: 1
            ]
          ]
        )
        |> Adapters.Repo.update_all([])

      error ->
        error
    end
  end

  def get_follow(me_id, other_user_id) do
    from(f in Follow,
      where: f.userId == ^me_id and f.followerId == ^other_user_id,
      limit: 1
    )
  end

  def get_info(me_id, other_user_id) do
    from(
      f in Follow,
      where:
        (f.userId == ^me_id and f.followerId == ^other_user_id) or
          (f.userId == ^other_user_id and f.followerId == ^me_id),
      limit: 2
    )
    |> Adapters.Repo.all()
    |> case do
      # when both follow each other there should be two results
      [_, _] ->
        %{followsYou: true, youAreFollowing: true}

      # when following is unidirectional there should be one result
      # this success out the direction of that relationship
      [%{userId: ^me_id, followerId: ^other_user_id}] ->
        %{followsYou: true, youAreFollowing: false}

      [%{userId: ^other_user_id, followerId: ^me_id}] ->
        %{followsYou: false, youAreFollowing: true}

      # no relationship entries
      [] ->
        %{followsYou: false, youAreFollowing: false}
    end
  end
end
