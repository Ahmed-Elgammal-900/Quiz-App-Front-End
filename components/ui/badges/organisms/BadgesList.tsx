import { badgesConfig, BadgeTitle } from "@/config/badges.config"
import BadgesIndicator from "../molecules/BadgesIndicator"
import BadgeCard from "../molecules/BadgeCard"
import { getBadges } from "@/services/dashboard.service"

export default async function BadgesList() {
  const badges = await getBadges()
  const badgeTitles = new Set(badges.map((badge) => badge.badgeTitle))
  return (
    <div className="mt-13">
      <BadgesIndicator earnedBadges={badges.length} />
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {(Object.keys(badgesConfig) as BadgeTitle[]).map((title, i) => (
          <BadgeCard
            badgeTitle={title}
            earned={badgeTitles.has(title)}
            key={i}
          />
        ))}
      </div>
    </div>
  )
}
