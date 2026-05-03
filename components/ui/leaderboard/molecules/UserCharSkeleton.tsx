import { topThreeConfig } from "@/config/top3.config"
import { Skeleton } from "../../system/skeleton"
import { cn } from "@/lib/utils"

export default function UserCharSkeleton({ rank }: { rank: number }) {
  const config = topThreeConfig.find((c) => c.rank === rank)
  if (!config) return null
  return (
    <div className="flex-1">
      <div>
        <Skeleton className="relative mx-auto flex size-20 items-center justify-center rounded-full border-3 bg-muted md:size-22 lg:size-23">
          <div className="absolute bg-muted -bottom-2 left-1/2 w-7 h-5 -translate-x-1/2 rounded-full px-3" />
        </Skeleton>
        <div className="mt-5 flex flex-col items-center justify-center">
          <Skeleton className="w-15 h-6 rounded-full" />
          <Skeleton className="mt-2 w-10 rounded-full bg-primary/10 px-4 py-2 font-semibold text-primary" />
        </div>
      </div>
      <Skeleton
        className={cn(
          "mx-auto mt-10 flex w-auto items-start justify-center rounded-t-full md:w-35",
          config.graphHeight
        )}
      />
    </div>
  )
}
