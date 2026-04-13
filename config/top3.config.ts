import { Medal, Star, Trophy } from "lucide-react"

export const topThreeConfig = [
  {
    rank: 1,
    borderColor: "border-yellow-400",
    icon: Star,
    iconColor: "text-black",
    graphHeight: "h-70",
    fadeColor: "from-yellow-400/80",
    rankNumberBgColor: "bg-yellow-400",
    userCardGradient:
      "bg-linear-to-br from-yellow-400/20 via-yellow-400/5 to-transparent",
    userCardBorder: "border border-yellow-400/30",
    rankBgNumber: "bg-yellow-400/20",
    rankColor: "text-yellow-400",
  },
  {
    rank: 2,
    borderColor: "border-gray-400",
    icon: Trophy,
    iconColor: "text-gray-400",
    graphHeight: "h-50",
    rankNumberBgColor: "bg-gray-400",
    userCardGradient:
      "bg-linear-to-br from-gray-400/20 via-gray-400/5 to-transparent",
    userCardBorder: "border border-gray-400/30",
    rankBgNumber: "bg-gray-400/20",
    rankColor: "text-gray-400",
  },
  {
    rank: 3,
    borderColor: "border-amber-600",
    icon: Medal,
    iconColor: "text-amber-600",
    graphHeight: "h-30",
    rankNumberBgColor: "bg-amber-600",
    userCardGradient:
      "bg-linear-to-br from-amber-600/20 via-amber-600/5 to-transparent",
    userCardBorder: "border border-amber-600/30",
    rankBgNumber: "bg-amber-600/20",
    rankColor: "text-amber-600",
  },
]
