import StatCardSkeleton from "../molecule/StatCardSkeleton"

export default function StatCardsSkeleton() {
  return (
    <section
      role="status"
      aria-label="Loading dashboard statistics"
      aria-busy="true"
      aria-live="polite"
      className="mt-5 flex flex-col gap-y-4 lg:grid lg:grid-cols-4 lg:gap-x-4"
    >
      <StatCardSkeleton variant="full" />
      <div className="flex gap-x-4 lg:col-span-2">
        <div className="flex-1">
          <StatCardSkeleton />
        </div>
        <div className="flex-1">
          <StatCardSkeleton />
        </div>
      </div>
      <StatCardSkeleton variant="full" />
    </section>
  )
}
