import { Skeleton } from "../../system/skeleton"
import UserRankSkeleton from "./UserRankSkeleton"

export default function UserRankSectionSkeleton() {
  return (
    <div className="mt-25">
      <div className="mb-5 md:mx-auto md:w-180">
        <Skeleton className="h-10 w-23" />
      </div>
      <UserRankSkeleton />
    </div>
  )
}
