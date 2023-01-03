defmodule Api.Routes.DevOnly do
  import Plug.Conn

  alias Schemas.User
  use Plug.Router

  plug(:match)
  plug(:dispatch)

  get "/test-info" do
    env = Application.fetch_env!(:api, :env)

    if env == :dev do
      username = fetch_query_params(conn).query_params["username"]
      user = Adapters.Users.get_by_username(username)

      conn
      |> put_resp_content_type("application/json")
      |> send_resp(
        200,
        Jason.encode!(
          Utils.TokenUtils.create_tokens(
            if(is_nil(user),
              do:
                Adapters.Repo.insert!(
                  %User{
                    username: username,
                    email: "test@" <> username <> ".com",
                    githubAccessToken: "",
                    age: 18,
                    githubId: "id:" <> username,
                    avatarUrl: "https://placekitten.com/200/200",
                    bannerUrl: "https://placekitten.com/1000/300",
                    bio:
                      "This is some interesting info about the ex-founder of nothing, welcome to the bio of such a ocol person !"
                  },
                  returning: true
                ),
              else: user
            )
          )
        )
      )
    else
      conn
      |> put_resp_content_type("application/json")
      |> send_resp(400, Jason.encode!(%{"error" => "no"}))
    end
  end
end
