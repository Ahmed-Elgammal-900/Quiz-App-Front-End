import type { QuizProgress, QuizResponse } from "@/validations/quizzes.schema"
import { Dispatch, SetStateAction } from "react"

export interface QuizTimerProps {
  timeInSeconds: number
  onFinish: () => void
  storageKey: string
  timerPaused: boolean
  timeout: boolean
  isFinished: boolean
}

export interface CompleteModalProps {
  isFinished: boolean
  onFinish: () => void
}

export interface ExitModalProps {
  onExit: () => void
}

export interface PauseModalProps {
  onPause: () => void
  setTimerPaused: Dispatch<SetStateAction<boolean>>
}

export interface AnswerSchema {
  questionId: string
  selectedAnswerId: string
  questionIndex: number
}

export interface QuestionMapProps {
  currentIndex: number
  answers: AnswerSchema[]
  onNavigate: (index: number) => void
  questionsIds: string[]
}

interface Answer {
  id: string
  text: string
  questionId: string
}

interface Question {
  id: string
  text: string
  quizId: string
  answers: Answer[]
}

export interface QuizQuestionProps {
  question: Question
  selectedOption?: string
  onAnswer: (optionId: string) => void
  quizStatus: string
}

export interface QuizClientProps {
  time: number | undefined
  status: string | undefined
  quizDetails: QuizResponse
  quizProgress: QuizProgress | null
  questionsIds: string[]
}

export interface CounterProps {
  counter: number
}
