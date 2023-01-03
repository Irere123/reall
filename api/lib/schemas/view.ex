defmodule Schemas.View do
  use Ecto.Schema

  import Ecto.Changeset
  alias Schemas.User

  @primary_key false
  schema "views" do
    # person who is being viewed
    belongs_to(:target, User, foreign_key: :targetId, type: :binary_id)
    # person who is viewed the profile
    belongs_to(:viewer, User, foreign_key: :viewerId, type: :binary_id)
    field(:liked, :boolean, default: false)
    field(:shared, :boolean, default: false)

    timestamps()
  end

  def changeset(view, attrs) do
    view
    |> cast(attrs, [:liked, :shared])
  end
end
