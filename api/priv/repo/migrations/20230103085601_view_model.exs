defmodule Adapters.Repo.Migrations.ViewModel do
  use Ecto.Migration

  def change do
    create table(:views, primary_key: false) do
      add :liked, :boolean, default: false
      add :shared, :boolean, default: false

      add :viewerId, references(:users, type: :uuid, on_delete: :delete_all), null: false, primary_key: true
      add :targetId, references(:users, type: :uuid, on_delete: :delete_all), null: false, primary_key: true

      timestamps()
    end
  end
end
