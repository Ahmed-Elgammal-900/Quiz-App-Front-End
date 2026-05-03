import {
  Shield,
  Code2,
  Braces,
  Server,
  GitBranch,
  Layout,
  Database,
  Layers,
  Binary,
} from "lucide-react"
import { BadgeConfig } from "../types/config.types"

export const badgesConfig = {
  "React Developer": {
    icon: Layout,
    gradient: "from-cyan-400 to-blue-500",
    iconColor: "text-white",
    shadow: "shadow-blue-500/30",
  },
  "Security Guardian": {
    icon: Shield,
    gradient: "from-red-400 to-rose-600",
    iconColor: "text-white",
    shadow: "shadow-rose-500/30",
  },
  "TypeScript Master": {
    icon: Code2,
    gradient: "from-blue-500 to-indigo-600",
    iconColor: "text-white",
    shadow: "shadow-indigo-500/30",
  },
  "JavaScript Ninja": {
    icon: Braces,
    gradient: "from-yellow-400 to-orange-500",
    iconColor: "text-white",
    shadow: "shadow-orange-500/30",
  },
  "Backend Engineer": {
    icon: Server,
    gradient: "from-emerald-400 to-teal-600",
    iconColor: "text-white",
    shadow: "shadow-teal-500/30",
  },
  "DevOps Pro": {
    icon: GitBranch,
    gradient: "from-violet-400 to-purple-600",
    iconColor: "text-white",
    shadow: "shadow-purple-500/30",
  },
  "System Architect": {
    icon: Layout,
    gradient: "from-sky-400 to-cyan-600",
    iconColor: "text-white",
    shadow: "shadow-cyan-500/30",
  },
  "Database Wizard": {
    icon: Database,
    gradient: "from-orange-400 to-amber-600",
    iconColor: "text-white",
    shadow: "shadow-amber-500/30",
  },
  "Design Patterns Guru": {
    icon: Layers,
    gradient: "from-pink-400 to-fuchsia-600",
    iconColor: "text-white",
    shadow: "shadow-fuchsia-500/30",
  },
  "Algorithm Champion": {
    icon: Binary,
    gradient: "from-lime-400 to-green-600",
    iconColor: "text-white",
    shadow: "shadow-green-500/30",
  },
} satisfies Record<string, BadgeConfig>

export type BadgeTitle = keyof typeof badgesConfig
