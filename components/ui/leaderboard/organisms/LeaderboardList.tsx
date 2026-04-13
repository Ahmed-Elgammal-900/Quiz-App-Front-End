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
  const leaderboardList = await getLeaderBoard(page ?? 1, limit ?? 10)
  return (
    <>
      <section className="relative mt-20">
        <div className="mx-auto flex h-120 max-w-200 flex-col gap-y-5 overflow-y-auto py-5 lg:p-10">
          {leaderboardList.data.map(({ userId, name, totalScore }, i) => (
            <UserRank
              key={userId}
              name={name}
              score={totalScore}
              rank={i + 1}
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
