import { Skeleton } from "../../system/skeleton"

export default function QuestionSkeleton() {
  return (
    <div className="m-auto">
      <Skeleton className="mb-6 h-10 w-[70%]" />
      <div className="flex flex-col items-center gap-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton className="h-13 w-full" key={i} />
        ))}
      </div>
    </div>
  )
}
