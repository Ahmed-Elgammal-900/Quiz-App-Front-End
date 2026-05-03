import { topThreeConfig } from "@/config/top3.config"
import { cn } from "@/lib/utils"
import { User } from "lucide-react"

export default function UserChar({
  name,
  score,
  rank,
}: {
  name: string
  score: number
  rank: number
}) {
  const config = topThreeConfig.find((c) => c.rank === rank)
  if (!config) return null
  const Icon = config.icon
  return (
    <div className="flex-1">
      <div>
        <div
          className={cn(
            "relative mx-auto flex size-20 items-center justify-center rounded-full border-3 bg-muted md:size-22 lg:size-23",
            config.borderColor
          )}
        >
          <User className="size-8 md:size-9 lg:size-10" />
          <span
            className={cn(
              "absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full px-3 font-semibold text-black!",
              config.rankNumberBgColor
            )}
          >
            {rank}
          </span>
        </div>
        <div className="mt-5 flex flex-col items-center justify-center">
          <span className="font-bold capitalize">{name}</span>
          <span className="mt-2 rounded-full bg-primary/10 px-4 py-2 font-semibold text-primary">
            {score}
          </span>
        </div>
      </div>
      <div
        className={cn(
          "mx-auto mt-10 flex w-auto items-start justify-center rounded-t-full md:w-35",
          config.graphHeight,
          rank === 1 ? `bg-linear-to-b ${config.fadeColor} to-card` : "bg-card"
        )}
      >
        <Icon
          className={cn(
            "siz-4 mt-7",
            config.iconColor,
            rank === 1 && "*:fill-current"
          )}
        />
      </div>
    </div>
  )
}
