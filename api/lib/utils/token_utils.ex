defmodule Api.Utils.TokenUtils do
  alias Api.Schemas.User

  def tokens_to_user_id(access_token!, refresh_token) do
    access_token! = access_token! || ""

    case Api.AccessToken.verify_and_validate(access_token!) do
      {:ok, claims} ->
        {:existing_claim, claims["userId"]}

      _ ->
        verify_refresh_token(refresh_token)
    end
  end

  defp verify_refresh_token(refresh_token!) do
    refresh_token! = refresh_token! || ""

    case Api.RefreshToken.verify_and_validate(refresh_token!) do
      {:ok, refreshClaims} ->
        user = Api.Repo.get(User, refreshClaims["userId"])

        if user &&
             !user.reasonForBan &&
             user.tokenVersion == refreshClaims["tokenVersion"] do
          {:new_tokens, user.id, create_tokens(user), user}
        end

      _ ->
        nil
    end
  end

  def create_tokens(user) do
    %{
      accessToken: Api.AccessToken.generate_and_sign!(%{"userId" => user.id}),
      refreshToken:
        Api.RefreshToken.generate_and_sign!(%{
          "userId" => user.id,
          "tokenVersion" => user.tokenVersion
        })
    }
  end
end
