defmodule Api.Message.User.Search do
  use Api.Message.Call

  @primary_key false
  embedded_schema do
    field(:query, :string)
    # not used currently, but will be used in the future:
    field(:cursor, :integer)
    field(:limit, :integer)
  end

  @impl true
  def changeset(initializer \\ %__MODULE__{}, data) do
    initializer
    |> cast(data, [:query])
    |> validate_required([:query])
    |> validate_length(:query, min: 3, max: 100)
  end

  defmodule Reply do
    use Api.Message.Push

    @derive {Jason.Encoder, only: ~w(
        items
        users
        nextCursor
      )a}

    @primary_key false
    embedded_schema do
      # the types of this is User.
      # currently not enforced, but once we have real
      # DisplayUser schemas we'll make sure Search.search outputs those.
      field(:items, {:array, :map})
      embeds_many(:users, Api.Schemas.User)
      field(:nextCursor, :integer)
    end
  end

  alias Adapters.Users

  @impl true
  def execute(changeset, state) do
    case apply_action(changeset, :validate) do
      {:ok, %{query: query}} ->
        users = Users.search_username(query)

        {:reply, %Reply{items: users, users: users, nextCursor: nil}, state}

      error ->
        error
    end
  end
end
