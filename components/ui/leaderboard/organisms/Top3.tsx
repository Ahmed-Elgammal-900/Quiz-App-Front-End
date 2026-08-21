import { getTop3 } from "@/services/leaderboard.service"
import UserChar from "../molecules/UserChar"

export default async function Top3() {
  const top3 = await getTop3()
  if (!top3) throw new Error("not found top3")
  return (
    <section className="mt-15 flex items-end justify-center gap-x-5 md:px-20 lg:px-30">
      {top3.length === 2 ? (
        <div className="flex-1" style={{ order: 1 }} />
      ) : null}
      {top3.map(({ userId, name, totalScore }, i) => {
        const rank = i + 1
        const order = rank === 1 ? 2 : rank === 2 ? 3 : 1

        return (
          <div key={userId} style={{ order }} className="flex">
            <UserChar name={name} score={totalScore} rank={rank} />
          </div>
        )
      })}
    </section>
  )
}
