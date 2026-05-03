export interface ModalData {
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
