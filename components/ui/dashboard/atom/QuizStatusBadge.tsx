import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { statusConfig } from "@/config/quiz-status.config"
import type { QuizStatusBadgeProps } from "@/types/dashboard.types"

const quizStatusVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium transition-colors",
  {
    variants: {
      status: {
        in_progress:
          "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300",
        paused:
          "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300",
        completed:
          "border-indigo-200 bg-indigo-50 text-indigo-800 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300",
        timeout:
          "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
        passed:
          "border-teal-200 bg-teal-50 text-teal-800 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300",
      },
    },
  }
)

export function QuizStatusBadge({ status, className }: QuizStatusBadgeProps) {
  const { label } = statusConfig[status]

  return (
    <span className={cn(quizStatusVariants({ status }), className)}>
      {label}
    </span>
  )
}
