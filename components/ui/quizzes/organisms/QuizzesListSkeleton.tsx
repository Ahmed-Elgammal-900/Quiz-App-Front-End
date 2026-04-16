import QuizCardSkeleton from "../molecules/QuizCardSkeleton"

export default function QuizzesListSkeleton() {
  return (
    <div className="mt-5">
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <QuizCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
