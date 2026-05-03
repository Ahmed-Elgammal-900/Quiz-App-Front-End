import { Skeleton } from "../../system/skeleton"

export default function BadgesSkeleton() {
  return (
    <div className="mt-7 w-full pb-7 lg:w-[40%] lg:rounded-xl lg:bg-card lg:p-7">
      <div className="mb-5 flex items-center justify-between">
        <Skeleton className="h-7 w-30" />
        <Skeleton className="h-5 w-15" />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5 md:gap-x-7 lg:px-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex w-fit flex-col items-center justify-center"
          >
            <Skeleton className="mb-2 h-14 w-14 rounded-full md:h-16 md:w-16" />
            <Skeleton className="h-5 w-13" />
          </div>
        ))}
      </div>
    </div>
  )
}
