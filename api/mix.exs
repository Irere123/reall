defmodule Api.MixProject do
  use Mix.Project

  def project do
    [
      app: :api,
      version: "0.1.0",
      elixir: "~> 1.14",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      elixirc_paths: elixirc_paths(Mix.env()),
      aliases: aliases()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    dev_only_apps = List.wrap(if Mix.env() == :dev, do: :remix)

    [
      mod: {Api, []},
      # moved logger to 2nd position to kill this error
      # calling logger:remove_handler(default) failed: :error {:badmatch, {:error, {:not_found, :default}}}
      extra_applications:
        [:ssl, :logger, :ueberauth, :ueberauth_facebook] ++
          dev_only_apps
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:plug_cowboy, "~> 2.6"},
      {:ecto_sql, "~> 3.9"},
      {:ecto_enum, "~> 1.4"},
      {:jason, "~> 1.4"},
      {:joken, "~> 2.0"},
      {:httpoison, "~> 1.8"},
      {:oauth2, "~> 2.0"},
      {:postgrex, "~> 0.16.5"},
      {:remix, "~> 0.0.2", only: :dev},
      {:ueberauth, "~> 0.10.3"},
      # {:ueberauth_github, "~> 0.8.1"},
      {:oauther, "~> 1.3"},
      {:extwitter, "~> 0.14.0"},
      {:ueberauth_twitter, "~> 0.4.1"},
      {:ueberauth_facebook, "~> 0.10.0"},
      {:timex, "~> 3.7"},
      {:credo, "~> 1.6"}
    ]
  end

  defp elixirc_paths(:test), do: ["lib", "test/_support"]
  defp elixirc_paths(_), do: ["lib"]

  defp aliases do
    [
      "ecto.setup": ["ecto.create", "ecto.migrate"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      test: ["ecto.create --quiet", "ecto.migrate", "test"]
    ]
  end
end
