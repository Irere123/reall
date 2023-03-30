defmodule Api.Message.User.Follow do
  use Api.Message.Call

  @primary_key false
  embedded_schema do
    field(:userId, :binary_id)
  end

  def changeset(initializer \\ %__MODULE__{}, data) do
    initializer
    |> cast(data, [:userId])
    |> validate_required([:userId])
  end

  defmodule Reply do
    use Api.Message.Push

    @derive {Jason.Encoder, only: []}

    @primary_key false
    embedded_schema do
    end
  end

  def execute(changeset, state) do
    with {:ok, %{userId: user_id}} <- apply_action(changeset, :validate) do
      Components.Follow.follow(state.user.id, user_id, true)
      {:reply, %Reply{}, state}
    end
  end
end
