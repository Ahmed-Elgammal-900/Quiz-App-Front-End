import { StatConfig } from "@/types/config.types"
import { BookOpen, CheckCircle2, TrendingUp, Trophy } from "lucide-react"

export const statsConfig = [
  {
    property: "totalQuizzes",
    label: "Total Quizzes",
    icon: BookOpen,
    color: "text-blue-500",
    variant: "full",
    group: null,
  },
  {
    property: "passedQuizzes",
    label: "Passed Quizzes",
    icon: CheckCircle2,
    color: "text-green-500",
    variant: "default",
    group: "middle",
  },
  {
    property: "averageScore",
    label: "Average Score",
    icon: TrendingUp,
    color: "text-amber-500",
    variant: "default",
    group: "middle",
  },
  {
    property: "totalScore",
    label: "Total Score",
    icon: Trophy,
    color: "text-purple-500",
    variant: "full",
    group: null,
  },
] satisfies StatConfig[]
