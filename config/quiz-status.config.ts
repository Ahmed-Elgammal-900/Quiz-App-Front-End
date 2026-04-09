import { QuizStatus } from "@/constants/quiz-status.constant"

export const statusConfig: Record<QuizStatus, { label: string }> = {
  [QuizStatus.IN_PROGRESS]: {
    label: "In Progress",
  },
  [QuizStatus.PAUSED]: {
    label: "Paused",
  },
  [QuizStatus.COMPLETED]: {
    label: "Completed",
  },
  [QuizStatus.TIMEOUT]: {
    label: "Timeout",
  },
  [QuizStatus.PASSED]: {
    label: "Passed",
  },
}
