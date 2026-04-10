import { Skeleton } from "../../system/skeleton"
import ActivityCardSkeleton from "../molecule/ActivityCardSkeleton"

export default function RecentActivitySkeleton() {
  return (
    <div className="mt-5 w-full pb-7 lg:h-80 lg:w-[60%]">
      <Skeleton className="mb-5 h-7 w-35" />
      <div className="flex h-full flex-col gap-y-3">
        <ActivityCardSkeleton />
        <ActivityCardSkeleton />
        <ActivityCardSkeleton />
      </div>
    </div>
  )
}
