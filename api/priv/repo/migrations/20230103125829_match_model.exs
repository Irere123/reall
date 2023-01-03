defmodule Adapters.Repo.Migrations.MatchModel do
  use Ecto.Migration

  def change do
    create table(:matches, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :read1, :boolean, default: false
      add :read2, :boolean, default: false
      add :unmatched, :boolean, default: false

      add :userId1, references(:users, type: :uuid, on_delete: :delete_all), null: false, primary_key: false
      add :userId2, references(:users, type: :uuid, on_delete: :delete_all), null: false, primary_key: false

      timestamps()
    end
  end
end
