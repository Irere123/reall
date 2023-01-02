defmodule Api.Message.Manifest do
  alias Api.Message.Auth

  @actions %{
    "test:operator" => BrothTest.MessageTest.TestOperator,
    "auth:request" => Auth.Request
  }

  # verify that all of the actions are accounted for in the
  # operators list
  alias Api.Message.Types.Operator
  require Operator

  @actions
  |> Map.values()
  |> Enum.each(fn module ->
    Operator.valid_value?(module) ||
      raise CompileError,
        description: "the module #{inspect(module)} is not a member of #{inspect(Operator)}"
  end)

  def actions, do: @actions
end
