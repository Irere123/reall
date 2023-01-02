defmodule Api.Auth do
  alias Api.Utils.TokenUtils

  alias Adapters

  def authenticate(request, ip) do
    case TokenUtils.tokens_to_user_id(request.accessToken, request.refreshToken) do
      nil ->
        {:error, "invalid_authentication"}

      {:existing_claim, user_id} ->
        do_auth(Adapters.Users.get(user_id), nil, request, ip)

      # TODO: streamline this since we're duplicating user_id and user.
      {:new_tokens, _user_id, tokens, user} ->
        do_auth(user, tokens, request, ip)
    end
  end

  defp do_auth(user, tokens, request, ip) do
    alias Components.UserSession

    if user do
      # note that this will start the session and will be ignored if the
      # session is already running.
      UserSession.start_supervised(
        user_id: user.id,
        ip: ip,
        username: user.username,
        avatar_url: user.avatarUrl,
        banner_url: user.bannerUrl
      )

      if user.ip != ip do
        Adapters.Users.set_ip(user.id, ip)
      end

      # currently we only allow one active websocket connection per-user
      # at some point soon we're going to make this multi-connection, and we
      # won't have to do this.
      UserSession.set_active_ws(user.id, self())

      if tokens do
        UserSession.new_tokens(user.id, tokens)
      end
    end
  end
end
