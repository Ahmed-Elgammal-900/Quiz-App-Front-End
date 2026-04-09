import { type VariantProps } from "class-variance-authority"
import { Skeleton } from "@/components/ui/system/skeleton"
import { statCard } from "./StatCard"

export default function StatCardSkeleton({
  variant,
}: VariantProps<typeof statCard>) {
  return (
    <div className={statCard({ variant })}>
      <Skeleton className="mt-2 mb-3 h-5 w-5 rounded-md" />
      <div>
        <Skeleton className="mb-1 h-4 w-24" />
        <Skeleton className="mt-2 h-8 w-16" />
      </div>
    </div>
  )
}
