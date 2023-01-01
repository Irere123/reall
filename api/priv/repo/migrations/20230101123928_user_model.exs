defmodule Api.Repo.Migrations.UserModel do
  use Ecto.Migration

  def change do
    execute("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";", "")

    create table(:users, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :username, :text, null: false
      add :email, :text, null: true
      add :schoolName, :text, null: true
      add :bio, :text, default: ""
      add :goal, :text, default: "friendship"
      add :avatarUrl, :text, null: false
      add :bannerUrl, :text, null: true
      add :tokenVersion, :integer, default: 1
      add :age, :integer, null: true
      add :contributions, :integer, default: 0
      add :numLikes, :integer, default: 0
      add :numMatches, :integer, default: 0
      # add :birthday, :naive_datetime, null: false
      add :online, :boolean, default: false
      add :lastOnline, :naive_datetime
      add :githubId, :text, null: true
      add :githubAccessToken, :text, null: true
      add :facebookId, :text, null: true
      add :facebookAccessToken, :text, null: true
      add :twitterId, :text, null: true
      add :ip, :text, null: true
      add :gender, :text, null: true
      add :staff, :boolean, default: false

      timestamps()
    end
  end
end
