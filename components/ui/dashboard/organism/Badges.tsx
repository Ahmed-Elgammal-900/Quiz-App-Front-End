import { getBadges } from "@/services/dashboard.service"
import Link from "next/link"
import Badge from "../molecule/Badge"

export default async function Badges() {
  const badges = await getBadges()
  if(!badges) throw new Error("not found badges")
  return (
    <section
      aria-labelledby="earned-badges-title"
      className="mt-7 w-full lg:w-[40%] lg:rounded-xl lg:bg-card lg:p-7"
    >
      <div className="flex items-center justify-between">
        <h3 id="earned-badges-title" className="text-lg font-bold capitalize">
          earned badges
        </h3>
        {badges.length !== 0 && (
          <Link
            className="font-semibold text-primary capitalize"
            href={"/dashboard/badges"}
          >
            view all
          </Link>
        )}
      </div>
      <div className="flex min-h-40 flex-wrap items-center justify-center gap-5 py-5 md:gap-x-7 lg:justify-center">
        {badges.length === 0 ? (
          <p className="w-full text-center text-muted-foreground">
            No Badges earned
          </p>
        ) : (
          badges
            .slice(0, 7)
            .map(({ quizId, badgeTitle }) => (
              <Badge key={quizId} badgeTitle={badgeTitle} earned={true} />
            ))
        )}
      </div>
    </section>
  )
}
