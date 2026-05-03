import { Skeleton } from "../../system/skeleton"

export default function ActivityCardSkeleton() {
  return (
    <div className="flex h-full w-full items-center gap-x-3 rounded-xl bg-card p-4">
      <Skeleton className="h-13 w-13 shrink-0 rounded-full" />
      <div className="flex w-full items-center justify-between">
        <div>
          <Skeleton className="mb-2 h-4 w-35" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-5 w-10" />
      </div>
    </div>
  )
}
