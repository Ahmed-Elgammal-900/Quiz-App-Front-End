"use client"
import { topThreeConfig } from "@/config/top3.config"
import { useUser } from "@/hooks/useUser"
import { cn } from "@/lib/utils"

export default function UserRank({
  name,
  rank,
  score,
}: {
  name: string
  score: number
  rank: number
}) {
  let config
  if (rank <= 3) {
    config = topThreeConfig.find((c) => c.rank === rank)
  }
  const user = useUser()
  const isCurrentUser = user?.name === name
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-xl p-6 md:mx-auto md:w-180",
        config
          ? `${config.userCardGradient} ${config.userCardBorder}`
          : isCurrentUser
            ? "border border-primary/30 bg-linear-to-br from-primary/20 via-primary/5 to-transparent"
            : "bg-card"
      )}
    >
      <div className="flex items-center gap-x-3">
        <span
          className={cn(
            "flex size-9 items-center justify-center rounded-full font-semibold",
            config ? config.rankBgNumber : "bg-primary/20",
            config?.rankColor ?? null
          )}
        >
          {rank}
        </span>
        <span className="font-bold capitalize">{name}</span>
      </div>
      <span className="font-semibold text-primary">{score}</span>
    </div>
  )
}
