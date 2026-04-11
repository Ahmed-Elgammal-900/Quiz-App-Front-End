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
