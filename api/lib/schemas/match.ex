defmodule Schemas.Match do
  use Ecto.Schema

  import Ecto.Changeset
  alias Schemas.User

  @primary_key {:id, :binary_id, []}
  schema "matches" do
    field(:read1, :boolean, default: false)
    field(:read2, :boolean, default: false)
    field(:unmatched, :boolean, default: false)

    belongs_to(:user1, User, foreign_key: :userId1, type: :binary_id)
    belongs_to(:user2, User, foreign_key: :userId2, type: :binary_id)

    timestamps()
  end

  def changeset(match, attrs) do
    match
    |> cast(attrs, [])
  end
end
