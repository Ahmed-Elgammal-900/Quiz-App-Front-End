import { QuizStatus } from "@/constants/quiz-status.constant"
import { LucideIcon } from "lucide-react"

type StatCardVariant = "default" | "full"

export interface BadgeProps {
  badgeTitle: string
  earned?: boolean
}

export interface ActivityCardProps {
  title: string
  attemptAt: Date | string
  score: number
  status: QuizStatus
  passed: boolean
}

export interface ActivityData extends Omit<ActivityCardProps, "title"> {
  id: string
  quiz: { title: string }
}

export interface StatCardProps {
  variant?: StatCardVariant
  label: string
  value: number
  icon: LucideIcon
  color: string
}

export interface QuizStatusBadgeProps {
  status: QuizStatus
  className?: string
}

export interface Badge {
  quizId: string
  badgeTitle: string
}

export interface Stats {
  totalQuizzes: number
  passedQuizzes: number
  averageScore: number
  totalScore: number
}
