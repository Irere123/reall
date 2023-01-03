defmodule Utils.TokenUtils do
  alias Schemas.User

  def tokens_to_user_id(access_token!, refresh_token) do
    access_token! = access_token! || ""

    case Utils.AccessToken.verify_and_validate(access_token!) do
      {:ok, claims} ->
        {:existing_claim, claims["userId"]}

      _ ->
        verify_refresh_token(refresh_token)
    end
  end

  defp verify_refresh_token(refresh_token!) do
    refresh_token! = refresh_token! || ""

    case Utils.RefreshToken.verify_and_validate(refresh_token!) do
      {:ok, refreshClaims} ->
        user = Adapters.Repo.get(User, refreshClaims["userId"])

        if user &&
             user.tokenVersion == refreshClaims["tokenVersion"] do
          {:new_tokens, user.id, create_tokens(user), user}
        end

      _ ->
        nil
    end
  end

  def create_tokens(user) do
    %{
      accessToken: Utils.AccessToken.generate_and_sign!(%{"userId" => user.id}),
      refreshToken:
        Utils.RefreshToken.generate_and_sign!(%{
          "userId" => user.id,
          "tokenVersion" => user.tokenVersion
        })
    }
  end
end
