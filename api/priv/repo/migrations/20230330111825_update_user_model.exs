defmodule Adapters.Repo.Migrations.UpdateUserModel do
  use Ecto.Migration

  def change do
    alter table(:users) do
      modify :inserted_at, :naive_datetime, null: false, default: fragment("now()")
      modify :updated_at, :naive_datetime, null: false, default: fragment("now()")
      add :numFollowing, :integer, default: 0
      add :numFollowers, :integer, default: 0
    end

    alter table(:followers) do
      modify :inserted_at, :naive_datetime, null: false, default: fragment("now()")
      modify :updated_at, :naive_datetime, null: false, default: fragment("now()")
    end
  end
end
