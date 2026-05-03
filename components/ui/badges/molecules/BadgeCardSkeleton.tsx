import { Skeleton } from "../../system/skeleton"

export default function BadgeCardSkeleton() {
  return (
    <div className="flex h-20 items-center justify-between rounded-xl bg-card p-5 md:h-55 md:items-start">
      <div className="flex w-fit items-center gap-3 md:flex-col md:gap-y-4">
        <Skeleton className="flex h-12 w-12 items-center justify-center rounded-full md:h-14 md:w-14 md:self-start" />
        <Skeleton className="h-5 w-20" />
      </div>
      <Skeleton className="size-5 rounded-full md:self-end" />
    </div>
  )
}
