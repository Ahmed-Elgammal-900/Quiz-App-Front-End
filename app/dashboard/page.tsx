import WelcomeHeader from "@/components/ui/dashboard/molecule/WelcomeHeader"
import StatsCardSkeleton from "@/components/ui/dashboard/organism/StatCardsSkeleton"
import StatsCards from "@/components/ui/dashboard/organism/statCards"
import { Suspense } from "react"
import Badges from "@/components/ui/dashboard/organism/Badges"
import BadgesSkeleton from "@/components/ui/dashboard/organism/BadgesSkeleton"
import RecentActivity from "@/components/ui/dashboard/organism/RecentActivity"
import RecentActivitySkeleton from "@/components/ui/dashboard/organism/RecentActivitySkeleton"

export default function Dashboard() {
  return (
    <div className="mt-3">
      <WelcomeHeader />
      <Suspense fallback={<StatsCardSkeleton />}>
        <StatsCards />
      </Suspense>
      <div className="flex flex-col items-center lg:mt-7 lg:flex-row-reverse lg:items-start lg:gap-x-5">
        <Suspense fallback={<BadgesSkeleton />}>
          <Badges />
        </Suspense>
        <Suspense fallback={<RecentActivitySkeleton />}>
          <RecentActivity />
        </Suspense>
      </div>
    </div>
  )
}
