defmodule Adapters.Repo.Migrations.AddGoogle do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :googleId, :string, null: true
    end
  end
end
