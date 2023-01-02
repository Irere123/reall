defmodule Components.StatsCache do
  use GenServer

  def start_link(_), do: GenServer.start_link(__MODULE__, nil, name: __MODULE__)

  def init(_) do
    :ets.new(__MODULE__, [:set, :public, :named_table])

    {:ok, nil, :hibernate}
  catch
    _, :badarg ->
      :ignore
  end

  def get(key) do
    case :ets.lookup(__MODULE__, key) do
      [{^key, value}] -> value
      [] -> nil
    end
  end

  def set(key, value) do
    :ets.insert(__MODULE__, {key, value})
    :ok
  end

  def reset do
    __MODULE__
    |> Process.whereis()
    |> Process.exit(:kill)
  end

  def update_counter(key, increment) do
    :ets.update_counter(__MODULE__, key, increment)
    :ok
  end
end
