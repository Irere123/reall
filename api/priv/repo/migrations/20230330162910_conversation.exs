defmodule Adapters.Repo.Migrations.Conversation do
  use Ecto.Migration

  def change do
    create table(:dm_messages, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :text, :text, null: false
      add :senderId, references(:users, type: :uuid, on_delete: :delete_all), null: false, primary_key: false
      add :receiverId, references(:users, type: :uuid, on_delete: :delete_all), null: false, primary_key: false
      add :conversationId, references(:conversations, type: :uuid, on_delete: :delete_all), null: false, primary_key: false

      add :inserted_at, :naive_datetime, null: false, default: fragment("now()")
      add :updated_at, :naive_datetime, null: false, default: fragment("now()")
    end
  end
end
