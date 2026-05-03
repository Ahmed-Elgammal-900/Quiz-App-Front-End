export interface QuizzesListProps {
  search?: string
}

export interface QuizModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  questionsCount: number
  status: string | null
  passed: boolean | null
  timeInSeconds: number
  description: string
  quizId: string
  signedTime: string
  signedStatus: string
  progress: number | null
}

export interface QuizCardProps {
  title: string
  score: number | null
  questionsCount: number
  status: string | null
  passed: boolean | null
  timeInSeconds: number
  description: string
  quizId: string
  signedTime: string
  signedStatus: string
  progress: number | null
}
