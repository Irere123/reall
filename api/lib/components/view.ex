defmodule Components.View do
  alias Adapters.Users

  def like_profile(user_id, target_id, liked) do
    IO.puts("liked ")
    IO.inspect(liked)

    case Users.like_profile(user_id, target_id, liked) do
      {:ok, fav} ->
        IO.inspect(fav)

      _ ->
        nil
    end
  end
end
