import { getStats } from "@/services/dashboard.service"
import StatCard from "../molecule/StatCard"
import { statsConfig } from "@/config/stats.config"

export default async function StatCards() {
  const stats = await getStats()
  const { property: p0, ...rest0 } = statsConfig[0]
  const { property: p1, ...rest1 } = statsConfig[1]
  const { property: p2, ...rest2 } = statsConfig[2]
  const { property: p3, ...rest3 } = statsConfig[3]
  return (
    <div className="mt-5 flex flex-col gap-y-4 lg:grid lg:grid-cols-4 lg:gap-x-4">
      <StatCard {...rest0} value={stats[p0]} variant="full" />
      <div className="flex flex-2 gap-x-4 lg:col-span-2">
        <StatCard {...rest1} value={stats[p1]} />
        <StatCard {...rest2} value={stats[p2]} />
      </div>
      <StatCard {...rest3} value={stats[p3]} variant="full" />
    </div>
  )
}
