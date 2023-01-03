defmodule Api.Message.Feed.View do
  use Api.Message.Cast

  @primary_key false
  embedded_schema do
    field(:targetId, :binary_id)
    field(:status, :string, default: "liked")
  end

  alias Utils.UUID
  alias Components.View

  def changeset(initializer \\ %__MODULE__{}, data) do
    initializer
    |> cast(data, [:targetId])
    |> validate_required([:targetId])
    |> UUID.normalize(:targetId)
  end

  def execute(changeset, state) do
    with {:ok, %{targetId: target_id, status: status}} <-
           apply_action(changeset, :validate) do
      liked = status === "liked"
      {:ok, val} = View.like_profile(state.user.id, target_id, liked)
      {:reply, %{p: val}, state}
    end
  end
end
