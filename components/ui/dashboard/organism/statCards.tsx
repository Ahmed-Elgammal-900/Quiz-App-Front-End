import { getStats } from "@/services/dashboard.service"
import StatCard from "../molecule/StatCard"
import { statsConfig } from "@/config/stats.config"

export default async function StatCards() {
  const stats = await getStats()
  if(!stats) throw new Error("not found stats")
  const grouped = Object.groupBy(statsConfig, (c) => c.group ?? c.property)

  return (
    <div className="mt-5 flex flex-col gap-y-4 lg:grid lg:grid-cols-4 lg:gap-x-4">
      {Object.entries(grouped).map(([key, configs]) => {
        if (configs!.length > 1) {
          return (
            <div key={key} className="flex flex-2 gap-x-4 lg:col-span-2">
              {configs!.map(({ property, ...rest }) => (
                <StatCard key={property} {...rest} value={stats[property]} />
              ))}
            </div>
          )
        }
        const { property, ...rest } = configs![0]
        return <StatCard key={property} {...rest} value={stats[property]} />
      })}
    </div>
  )
}
