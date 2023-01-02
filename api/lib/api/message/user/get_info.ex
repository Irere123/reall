defmodule Api.Message.User.GetInfo do
  use Api.Message.Call

  @primary_key false
  embedded_schema do
    # required.
    field(:userIdOrUsername, :string)
  end

  # userId is either a uuid or username
  def changeset(initializer \\ %__MODULE__{}, data) do
    initializer
    |> cast(data, [:userIdOrUsername])
    |> validate_required([:userIdOrUsername])
  end

  defmodule Reply do
    use Api.Message.Push

    @derive {Jason.Encoder, only: ~w(
      id
      username
      avatarUrl
      bio
      online
      lastOnline
    )a}

    @primary_key {:id, :binary_id, []}
    schema "users" do
      field(:username, :string)
      field(:avatarUrl, :string)
      field(:bio, :string, default: "")
      field(:online, :boolean)
      field(:lastOnline, :utc_datetime_usec)
      field(:error, :string, virtual: true)
    end
  end

  alias Adapters.Users

  def execute(changeset, state) do
    case apply_action(changeset, :validate) do
      {:ok, %{userIdOrUsername: userIdOrUsername}} ->
        user =
          case Ecto.UUID.cast(userIdOrUsername) do
            {:ok, _} ->
              Users.get_by_id(userIdOrUsername)

            _ ->
              Users.get_by_username(userIdOrUsername)
          end

        case user do
          nil ->
            {:reply, %{error: "could not find user"}, state}

          _ ->
            {:reply, user, state}
        end

      error ->
        error
    end
  end
end
