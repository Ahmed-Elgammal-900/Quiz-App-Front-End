import { getUserRank } from "@/services/leadrboard.service"
import UserRank from "./UserRank"

export default async function UserRankSection() {
  const userRank = await getUserRank()
  return (
    <section className="mt-25">
      <h2 className="mb-5 font-bold md:mx-auto md:w-180">Your Rank</h2>
      <UserRank
        score={userRank.totalScore}
        rank={userRank.rank}
        name={userRank.name}
      />
    </section>
  )
}
