import { statCard } from "@/components/ui/dashboard/molecule/StatCard"
import { QuizStatus } from "@/constants/quiz-status.constant"
import { VariantProps } from "class-variance-authority"
import { LucideIcon } from "lucide-react"

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

export interface ActivityCardData extends ActivityCardProps {
  id: string
  quiz: { title: string }
}

export interface StatCardProps extends VariantProps<typeof statCard> {
  label: string
  value: number
  icon: LucideIcon
  color: string
}

export interface QuizStatusBadgeProps {
  status: QuizStatus
  className?: string
}
