defmodule Schemas.User do
  use Ecto.Schema

  # the struct defined here can also be pushed to the user
  use Api.Message.Push
  import Ecto.Changeset

  @timestamps_opts [type: :utc_datetime_usec]
  @derive {Jason.Encoder, only: ~w(id username avatarUrl bio goal gender online
           lastOnline schoolName age bannerUrl staff contributions numFollowers
          numLikes numFollowing
           inserted_at updated_at
          )a}
  @primary_key {:id, :binary_id, []}
  schema "users" do
    field(:username, :string)
    field(:email, :string)
    field(:schoolName, :string)
    field(:age, :integer)
    # field(:birthday, :utc_datetime_usec)
    field(:avatarUrl, :string)
    field(:bannerUrl, :string)
    field(:goal, :string)
    field(:gender, :string)
    field(:bio, :string, default: "")
    field(:facebookId, :string)
    field(:githubId, :string)
    field(:googleId, :string)
    field(:facebookAccessToken, :string)
    field(:githubAccessToken, :string)
    field(:youAreFollowing, :boolean, virtual: true)
    field(:followsYou, :boolean, virtual: true)
    field(:twitterId, :string)
    field(:tokenVersion, :integer, default: 1)
    field(:online, :boolean)
    field(:lastOnline, :utc_datetime_usec)
    field(:staff, :boolean)
    field(:contributions, :integer)
    field(:ip, :string)
    field(:numLikes, :integer)
    field(:numMatches, :integer)
    field(:numFollowers, :integer)
    field(:numFollowing, :integer)

    timestamps()
  end

  def changeset(user, attrs) do
    user
    |> cast(attrs, ~w(username githubId avatarUrl bannerUrl)a)
    |> validate_required([:username, :githubId, :avatarUrl, :bannerUrl])
  end

  defimpl Jason.Encoder do
    @fields ~w(id username avatarUrl bio goal gender online
    lastOnline schoolName age bannerUrl staff contributions numLikes
    inserted_at updated_at numFollowers numFollowing youAreFollowing followsYou

   )a

    def encode(user, opts) do
      user
      |> Map.take(@fields)
      |> Jason.Encoder.encode(opts)
    end
  end
end
