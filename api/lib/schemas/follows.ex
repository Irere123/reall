defmodule Schemas.Follow do
  use Ecto.Schema
  import Ecto.Changeset
  @timestamps_opts [type: :utc_datetime_usec]

  alias Schemas.User

  @primary_key false
  schema "followers" do
    # the person who is being followed
    belongs_to(:user, User, foreign_key: :userId, type: :binary_id)
    # the person who is following
    belongs_to(:follower, User, foreign_key: :followerId, type: :binary_id)

    timestamps()
  end

  def insert_changeset(follow, attrs) do
    follow
    |> cast(attrs, [:userId, :followerId])
    |> validate_required([:userId, :followerId])
    |> unique_constraint(:already_following, name: "followers_pkey")
  end
end
