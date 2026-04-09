import {
  HelpCircle,
  LayoutDashboard,
  Settings,
  Star,
  Trophy,
} from "lucide-react"

export const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Quizzes", href: "/dashboard/quizzes", icon: HelpCircle },
  { label: "Badges", href: "/dashboard/badges", icon: Star },
  { label: "Leaderboard", href: "/dashboard/leaderboard", icon: Trophy },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]
