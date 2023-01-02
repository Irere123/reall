defmodule Adapters.Users do
  @moduledoc """
  Context module for Users.  This module acts as a "gateway" module defining
  the "boundary" for Users database access.  Consider Adapters.Users.* modules
  to be "private modules".  If in the future we would like to enforce these
  boundary conditions at compile time, consider using Sasa Juric's Boundary
  library:

  https://hex.pm/packages/boundary

  """

  defdelegate get_by_username(username), to: Adapters.Access.Users

  # MUTATIONS

  defdelegate set_online(user_id), to: Adapters.Mutations.Users
  defdelegate set_offline(user_id), to: Adapters.Mutations.Users

  defdelegate twitter_find_or_create(user), to: Adapters.Mutations.Users
end
