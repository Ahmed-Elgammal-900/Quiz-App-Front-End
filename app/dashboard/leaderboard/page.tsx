import LeaderboardHeader from "@/components/ui/leaderboard/atoms/LeaderboardHeader"
import LeaderboardList from "@/components/ui/leaderboard/organisms/LeaderboardList"
import LeaderboardListSkeleton from "@/components/ui/leaderboard/organisms/LeaderboardListSkeleton"
import Top3 from "@/components/ui/leaderboard/organisms/Top3"
import Top3Skeleton from "@/components/ui/leaderboard/organisms/Top3Skeleton"
import UserRankSection from "@/components/ui/leaderboard/molecules/UserRankSection"
import UserRankSectionSkeleton from "@/components/ui/leaderboard/molecules/UserRankSectionSkeleton"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Leaderboard",
}

export default async function Leaderboard({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>
}) {
  const { page: rawPage, limit: rawLimit } = await searchParams
  const page = Number.parseInt(rawPage ?? "1", 10)
  const limit = Number.parseInt(rawLimit ?? "10", 10)

  if (
    !Number.isFinite(page) ||
    page < 1 ||
    !Number.isFinite(limit) ||
    limit < 1
  ) {
    redirect("/dashboard/leaderboard?page=1&limit=10")
  }
  return (
    <section className="mt-3">
      <LeaderboardHeader />
      <Suspense fallback={<Top3Skeleton />}>
        <Top3 />
      </Suspense>

      <Suspense fallback={<UserRankSectionSkeleton />}>
        <UserRankSection />
      </Suspense>

      <Suspense fallback={<LeaderboardListSkeleton />}>
        <LeaderboardList page={page} limit={limit} />
      </Suspense>
    </section>
  )
}
