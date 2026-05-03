import { Skeleton } from "../../system/skeleton"

export default function UserRankSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex h-25 w-full items-center justify-between rounded-xl bg-card p-6 md:mx-auto md:max-w-180"
    >
      <div className="flex items-center gap-x-3">
        <Skeleton className="size-9 rounded-full" />
        <Skeleton className="h-7 w-15 rounded-full" />
      </div>
      <Skeleton className="h-8 w-15 rounded-full" />
    </div>
  )
}
