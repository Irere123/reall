defmodule Adapters.Repo.Migrations.DmModels do
  use Ecto.Migration

  def change do

    create table(:conversations, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :user1Id, references(:users, type: :uuid, on_delete: :delete_all), null: false, primary_key: false
      add :user2Id, references(:users, type: :uuid, on_delete: :delete_all), null: false, primary_key: false

      add :inserted_at, :naive_datetime, null: false, default: fragment("now()")
      add :updated_at, :naive_datetime, null: false, default: fragment("now()")
    end
  end
end
