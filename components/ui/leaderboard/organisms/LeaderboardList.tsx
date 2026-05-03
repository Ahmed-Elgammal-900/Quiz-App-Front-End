import { getLeaderBoard } from "@/services/leadrboard.service"
import Pagination from "../molecules/Pagination"
import UserRank from "../molecules/UserRank"

export default async function LeaderboardList({
  page,
  limit,
}: {
  page?: number
  limit?: number
}) {
  const currentPage = page ?? 1
  const currentLimit = limit ?? 10
  const leaderboardList = await getLeaderBoard(currentPage, currentLimit)
  if (!leaderboardList) return null
  const rankOffset =
    (leaderboardList.meta.page - 1) * leaderboardList.meta.limit
  return (
    <>
      <section className="relative mt-20">
        <div className="mx-auto flex h-120 max-w-200 flex-col gap-y-5 overflow-y-auto py-5">
          {leaderboardList.data.map(({ userId, name, totalScore }, i) => (
            <UserRank
              key={userId}
              userId={userId}
              name={name}
              score={totalScore}
              rank={rankOffset + i + 1}
            />
          ))}
        </div>
      </section>
      <div className="mx-auto mt-7 mb-5 h-15 w-50">
        <Pagination totalPages={leaderboardList.meta.totalPages} />
      </div>
    </>
  )
}
