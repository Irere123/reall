defmodule Api.Message.Feed.GetProfiles do
  use Api.Message.Call

  @primary_key false
  embedded_schema do
    field(:cursor, :integer, default: 0)
    field(:limit, :integer, default: 100)
  end

  def changeset(initializer \\ %__MODULE__{}, data) do
    initializer
    |> cast(data, [:cursor, :limit])
    |> validate_number(:limit, greater_than: 0, message: "too low")
  end

  defmodule Reply do
    use Api.Message.Push

    @derive {Jason.Encoder, only: [:profiles, :nextCursor, :initial]}

    @primary_key false
    embedded_schema do
      embeds_many(:profiles, Api.Schemas.Room)
      field(:nextCursor, :integer)
      field(:initial, :boolean)
    end
  end

  alias Adapters.Users

  def execute(changeset, state) do
    with {:ok, request} <- apply_action(changeset, :validate),
         {users, nextCursor} <- Users.get_top_users(request.cursor) do
      {:reply, %Reply{profiles: users, nextCursor: nextCursor, initial: request.cursor == 0},
       state}
    end
  end
end
