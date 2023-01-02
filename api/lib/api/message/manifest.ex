defmodule Api.Message.Manifest do
  @actions %{
    "test:operator" => BrothTest.MessageTest.TestOperator
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
