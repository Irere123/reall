defmodule Adapters.Repo.Migrations.Followers do
  use Ecto.Migration

  def change do
    create table(:followers, primary_key: false) do
      add :userId, references(:users, on_delete: :delete_all, type: :uuid), null: false, primary_key: true
      add :followerId, references(:users, on_delete: :delete_all, type: :uuid), null: false, primary_key: true

      timestamps()
    end
  end
end
