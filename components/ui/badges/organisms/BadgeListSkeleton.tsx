import BadgesIndicatorSkeleton from "../atoms/BadgesIndicatorSkeleton"
import BadgeCardSkeleton from "../molecules/BadgeCardSkeleton"

export default function BadgesListSkeleton() {
  return (
    <div className="mt-13">
      <BadgesIndicatorSkeleton />
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <BadgeCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
