defmodule Schemas.DmMessage do
  use Ecto.Schema

  alias Schemas.User
  alias Schemas.Conversation
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:senderId, :text, :receiverId]}
  @primary_key {:id, :binary_id, []}
  schema "dm_messages" do
    field(:text, :string)
    belongs_to(:sender, User, foreign_key: :senderId, type: :binary_id)
    belongs_to(:conversation, Conversation, foreign_key: :conversationId, type: :binary_id)
    belongs_to(:receiver, User, foreign_key: :receiverId, type: :binary_id)
  end

  def changeset(message, attrs) do
    message
    |> cast(attrs, [:senderId, :receiverId])
  end
end
