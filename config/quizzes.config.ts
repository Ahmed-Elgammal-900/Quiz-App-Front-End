import {
  Layout,
  Shield,
  Code2,
  Braces,
  Server,
  GitBranch,
  Component,
  Database,
  Layers,
  Binary,
} from "lucide-react"
import { QuizConfig } from "../types/config.types"
import { QuizStatus } from "@/constants/quiz-status.constant"

export const quizzesConfig: Record<string, QuizConfig> = {
  "React & Frontend": {
    icon: Layout,
    gradient: "from-cyan-400 to-blue-500",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    shadow: "shadow-blue-500/30",
  },
  "Security & Authentication": {
    icon: Shield,
    gradient: "from-red-400 to-rose-600",
    iconColor: "text-rose-500",
    bgColor: "bg-rose-50 dark:bg-rose-950",
    shadow: "shadow-rose-500/30",
  },
  "TypeScript Essentials": {
    icon: Code2,
    gradient: "from-blue-500 to-indigo-600",
    iconColor: "text-indigo-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-950",
    shadow: "shadow-indigo-500/30",
  },
  "JavaScript Fundamentals": {
    icon: Braces,
    gradient: "from-yellow-400 to-orange-500",
    iconColor: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950",
    shadow: "shadow-orange-500/30",
  },
  "NestJS & Node.js": {
    icon: Server,
    gradient: "from-emerald-400 to-teal-600",
    iconColor: "text-teal-500",
    bgColor: "bg-teal-50 dark:bg-teal-950",

    shadow: "shadow-teal-500/30",
  },
  "Git & DevOps": {
    icon: GitBranch,
    gradient: "from-violet-400 to-purple-600",
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950",
    shadow: "shadow-purple-500/30",
  },
  "System Design Fundamentals": {
    icon: Component,
    gradient: "from-sky-400 to-cyan-600",
    iconColor: "text-cyan-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-950",
    shadow: "shadow-cyan-500/30",
  },
  "Database & SQL": {
    icon: Database,
    gradient: "from-orange-400 to-amber-600",
    iconColor: "text-amber-500",
    bgColor: "bg-amber-50 dark:bg-amber-950",
    shadow: "shadow-amber-500/30",
  },
  "OOP & Design Patterns": {
    icon: Layers,
    gradient: "from-pink-400 to-fuchsia-600",
    iconColor: "text-fuchsia-500",
    bgColor: "bg-fuchsia-50 dark:bg-fuchsia-950",
    shadow: "shadow-fuchsia-500/30",
  },
  "Data Structures & Algorithms": {
    icon: Binary,
    gradient: "from-lime-400 to-green-600",
    iconColor: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950",
    shadow: "shadow-green-500/30",
  },
}

export const buttonQuizConfig = {
  [QuizStatus.COMPLETED]: {
    label: "Re-Attempt Quiz",
    styles: "bg-indigo-500 text-white hover:bg-indigo-600",
  },
  [QuizStatus.PAUSED]: {
    label: "Resume Quiz",
    styles: "bg-blue-500 text-white hover:bg-blue-600",
  },
  [QuizStatus.TIMEOUT]: {
    label: "Re-Attempt Quiz",
    styles: "bg-red-600 text-white hover:bg-red-700",
  },
  [QuizStatus.IN_PROGRESS]: {
    label: "Resume Quiz",
    styles:
      "from-amber-400 to-amber-500 bg-linear-to-br text-black hover:from-amber-500 hover:to-amber-600",
  },
  [QuizStatus.PASSED]: {
    label: "Review Quiz",
    styles: "bg-emerald-600 text-white hover:bg-emerald-700",
  },
}
