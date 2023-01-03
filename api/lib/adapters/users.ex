defmodule Adapters.Users do
  @moduledoc """
  Context module for Users.  This module acts as a "gateway" module defining
  the "boundary" for Users database access.  Consider Adapters.Users.* modules
  to be "private modules".  If in the future we would like to enforce these
  boundary conditions at compile time, consider using Sasa Juric's Boundary
  library:

  https://hex.pm/packages/boundary

  """
  # ACCESS functions
  defdelegate get(user_id), to: Adapters.Access.Users

  #####################################################################################
  # CHOPPING BLOCK
  # we should strive to make the queries simpler and *reduce code*, so
  # these functions are on the chopping block.  Strategy should be to query the get
  # function and retrieve the data either from the fields or with a preload.
  defdelegate get_by_id(user_id), to: Adapters.Access.Users
  defdelegate get_by_username(username), to: Adapters.Access.Users
  defdelegate get_top_users(user_id, offset \\ 0), to: Adapters.Access.Users
  defdelegate search_username(query), to: Adapters.Access.Users

  defdelegate get_ip(user_id), to: Adapters.Access.Users
  # CHOPPING BLOCK
  ######################################################################################

  # MUTATIONS

  defdelegate delete(user_id), to: Adapters.Mutations.Users
  defdelegate bulk_insert(users), to: Adapters.Mutations.Users
  defdelegate set_online(user_id), to: Adapters.Mutations.Users
  defdelegate set_offline(user_id), to: Adapters.Mutations.Users

  defdelegate twitter_find_or_create(user), to: Adapters.Mutations.Users
  defdelegate set_ip(user_id, ip), to: Adapters.Mutations.Users
end
