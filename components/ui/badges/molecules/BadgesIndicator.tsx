import { badgesConfig } from "@/config/badges.config"
import { CircleStar } from "lucide-react"

export default function BadgesIndicator({
  earnedBadges,
}: {
  earnedBadges: number
}) {
  const totalBadges = Object.keys(badgesConfig).length
  return (
    <section className="flex items-center justify-between rounded-2xl bg-card p-5">
      <div>
        <span className="mb-2 block text-center capitalize">total earned</span>
        <div className="flex w-27 items-end justify-center rounded-full bg-primary/10 px-3 py-4 font-bold lg:text-lg">
          <span className="mx-1 block text-2xl font-extrabold text-primary">
            {earnedBadges}
          </span>{" "}
          / {totalBadges}
        </div>
      </div>
      <div className="flex size-24 items-center justify-center rounded-full border-3 bg-primary/10 p-4 md:size-26 lg:size-30">
        <CircleStar className="size-13 md:size-15 lg:size-18" />
      </div>
    </section>
  )
}
