defmodule Api.Routes.Stats do
  import Plug.Conn
  import Ecto.Query

  use Plug.Router
  use Timex

  plug(Api.Plugs.Cors)
  plug(:match)
  plug(:dispatch)

  alias Components.StatsCache
  alias Api.Repo
  alias Api.Schemas.User

  defp getStats do
    yesterday = Timex.now() |> Timex.shift(days: -1)

    query =
      from(u in User,
        where: u.lastOnline > ^yesterday or u.online
      )

    numActive = Repo.aggregate(query, :count, :id)

    d = {DateTime.now!("Africa/Kigali"), {Repo.aggregate(User, :count, :id), numActive}}
    StatsCache.set("main", d)
    d
  end

  get "/" do
    {dt, {numUsers, numActive}} =
      case StatsCache.get("main") do
        nil ->
          getStats()

        {dt, stats} ->
          exp_dt = DateTime.add(dt, 60 * 60 * 24, :second)

          if :lt == DateTime.compare(exp_dt, DateTime.now!("Africa/Kigali")) do
            getStats()
          else
            {dt, stats}
          end
      end

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(
      200,
      Jason.encode!(%{
        "numUsers" => numUsers,
        "activeYesterday" => numActive,
        "lastUpdated" => DateTime.to_iso8601(dt)
      })
    )
  end
end
