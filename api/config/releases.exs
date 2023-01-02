import Config

database_url =
  System.get_env("DATABASE_URL") ||
    raise """
    environment variable DATABASE_URL is missing.
    For example: ecto://USER:PASS@HOST/DATABASE
    """

config :api, Api.Repo, url: database_url

config :ueberauth, Ueberauth.Strategy.Facebook.OAuth,
  client_id: System.get_env("FACEBOOK_CLIENT_ID"),
  client_secret: System.get_env("FACEBOOK_CLIENT_SECRET")

config :ueberauth, Ueberauth.Strategy.Twitter.OAuth,
  consumer_key:
    System.get_env("TWITTER_API_KEY") ||
      raise("""
        environment variable TWITTER_API_KEY is missing.
        Create an oauth application on Twitter to get one
      """),
  consumer_secret:
    System.get_env("TWITTER_SECRET_KEY") ||
      raise("""
      environment variable TWITTER_SECRET_KEY is missing.
      Create an oauth application on Twitter to get one
      """)

config :api,
  num_voice_servers: 1,
  web_url: System.get_env("WEB_URL") || "https://bereall.netlify.app",
  api_url: System.get_env("API_URL") || "https://reall.onrender.com",
  access_token_secret:
    System.get_env("ACCESS_TOKEN_SECRET") ||
      raise("""
      environment variable ACCESS_TOKEN_SECRET is missing.
      type some random characters to create one
      """),
  refresh_token_secret:
    System.get_env("REFRESH_TOKEN_SECRET") ||
      raise("""
      environment variable REFRESH_TOKEN_SECRET is missing.
      type some random characters to create one
      """)

config :joken,
  access_token_key: System.fetch_env!("ACCESS_TOKEN_SECRET"),
  refresh_token_key: System.fetch_env!("REFRESH_TOKEN_SECRET")

config :extwitter, :oauth,
  consumer_key:
    System.get_env("TWITTER_API_KEY") ||
      raise("""
      environment variable TWITTER_API_KEY is missing.
      Create an oauth application on Twitter to get one
      """),
  consumer_secret:
    System.get_env("TWITTER_SECRET_KEY") ||
      raise("""
      environment variable TWITTER_SECRET_KEY is missing.
      Create an oauth application on Twitter to get one
      """),
  access_token:
    System.get_env("TWITTER_BEARER_TOKEN") ||
      raise("""
      environment variable TWITTER_BEARER_TOKEN is missing.
      Create an oauth application on Twitter to get one
      """),
  access_token_secret: ""
