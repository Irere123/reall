defmodule Schemas.Conversation do
  use Ecto.Schema

  alias Schemas.User
  import Ecto.Changeset

  @primary_key {:id, :binary_id, []}
  schema "conversations" do
    belongs_to(:user1, User, foreign_key: :user1Id, type: :binary_id)
    belongs_to(:user2, User, foreign_key: :user2Id, type: :binary_id)

    timestamps()
  end

  def changeset(conversation, attrs) do
    conversation
    |> cast(attrs, [:user1Id, :user2Id])
  end
end
