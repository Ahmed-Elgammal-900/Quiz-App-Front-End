import { badgesConfig } from "@/config/badges.config"
import { cn } from "@/lib/utils"
import type { BadgeProps } from "@/types/dashboard.types"

export default function BadgeIcon({ badgeTitle, earned = false }: BadgeProps) {
  const config = badgesConfig[badgeTitle]

  if (!config) return null

  const { icon: Icon, gradient, iconColor, shadow } = config

  return (
    <div className="flex w-fit items-center gap-3 md:flex-col md:gap-y-4">
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 md:h-14 md:w-14 md:self-start",
          earned
            ? `bg-linear-to-br ${gradient} ${shadow} shadow-lg`
            : "bg-linear-to-br from-gray-100 to-gray-200"
        )}
      >
        <Icon
          className={cn(
            "h-6 w-6 transition-all duration-300 md:h-7 md:w-7",
            earned ? iconColor : "text-gray-400"
          )}
        />
      </div>
      <span
        className={cn(
          "text-center text-sm font-medium transition-all duration-300",
          earned ? "text-foreground" : "text-gray-400"
        )}
      >
        {badgeTitle}
      </span>
    </div>
  )
}
