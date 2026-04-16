import { Skeleton } from "../../system/skeleton"

export default function QuizCardSkeleton() {
  return (
    <div className="flex min-h-20 items-center justify-between gap-x-4 rounded-xl bg-card p-5 md:min-h-70 md:flex-col md:items-stretch md:justify-start md:gap-x-0">
      <div className="flex w-full items-center gap-4 md:flex-col md:items-start">
        <div className="w-fit-content flex items-center justify-between md:w-full">
          <Skeleton className="size-11 shrink-0 rounded-full sm:size-13" />

          <Skeleton className="hidden h-6 w-15 rounded-full md:block" />
        </div>
        <Skeleton className="h-6 w-30" />

        <Skeleton className="ms-auto h-6 w-15 md:hidden" />
      </div>
      <Skeleton className="mt-8 hidden h-8 w-40 md:block" />
      <Skeleton className="mt-auto hidden h-10 w-full md:block" />
      <Skeleton className="size-6 md:hidden" />
    </div>
  )
}
