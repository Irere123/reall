defmodule Components.Follow do
  alias Adapters.Follows

  # TODO: break this out into assertive "follow" and "unfollow" commands, instead of
  # ambiguous "should_follow"
  def follow(user_id, user_you_want_to_follow_id, should_follow) do
    if should_follow do
      if user_id != user_you_want_to_follow_id do
        Follows.insert(%{userId: user_you_want_to_follow_id, followerId: user_id})
      end
    else
      Follows.delete(
        user_you_want_to_follow_id,
        user_id
      )
    end
  end
end
