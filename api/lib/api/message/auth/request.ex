defmodule Api.Message.Auth.Request do
  use Api.Message.Call,
    needs_auth: false

  @primary_key false
  embedded_schema do
    field(:accessToken, :string)
    field(:refreshToken, :string)
    field(:platform, :string)
    field(:currentRoomId, :binary_id)
    field(:reconnectToVoice, :boolean)
    field(:muted, :boolean, default: false)
    field(:deafened, :boolean, default: false)
  end

  @impl true
  def changeset(initializer \\ %__MODULE__{}, data) do
    initializer
    |> cast(data, [:accessToken, :refreshToken, :platform, :reconnectToVoice, :muted, :deafened])
    |> validate_required([:accessToken])
  end

  defmodule Reply do
    use Api.Message.Push

    @derive {Jason.Encoder, only: ~w(
      id
      username
      avatarUrl
      bannerUrl
      bio
      online
      lastOnline
    )a}

    @primary_key {:id, :binary_id, []}
    schema "users" do
      field(:username, :string)
      field(:avatarUrl, :string)
      field(:bannerUrl, :string)
      field(:bio, :string, default: "")
      field(:online, :boolean)
      field(:lastOnline, :utc_datetime_usec)
    end
  end

  alias Api.Auth

  @impl true
  def execute(changeset, state) do
    with {:ok, request} <- apply_action(changeset, :validate),
         {:ok, user} <- Auth.authenticate(request, state.ip) do
      {:reply, user, state}
    else
      # don't tolerate malformed requests with any response besides closing
      # out websocket.
      _ -> {:close, 4001, "invalid_authentication"}
    end
  end
end
