import { Skeleton } from "../../system/skeleton"

export default function BadgesIndicatorSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-card p-5">
      <div className="w-20">
        <Skeleton className="mb-3 h-7 w-full" />
        <Skeleton className="h-10 w-full rounded-full bg-primary/10" />
      </div>
      <Skeleton className="size-24 rounded-full border-3 bg-primary/10 md:size-26 lg:size-30" />
    </div>
  )
}
