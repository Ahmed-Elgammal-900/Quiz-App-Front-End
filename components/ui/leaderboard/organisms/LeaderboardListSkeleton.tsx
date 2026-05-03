import { Skeleton } from "../../system/skeleton"
import UserRankSkeleton from "../molecules/UserRankSkeleton"

export default function LeaderboardListSkeleton() {
  return (
    <>
      <div className="relative mt-20">
        <div className="mx-auto flex h-120 max-w-200 flex-col gap-y-5 overflow-y-auto py-5 lg:p-10">
          {Array.from({ length: 5 }).map((_, i) => (
            <UserRankSkeleton key={i} />
          ))}
        </div>
      </div>
      <Skeleton className="mx-auto mt-7 mb-5 h-15 w-50" />
    </>
  )
}
