"use server"
import {
  insertProgress,
  startQuiz,
  pauseQuiz,
  deleteUserAnswers,
} from "@/services/Quizzes.service"

export async function startQuizAction(quizId: string) {
  try {
    await startQuiz(quizId)
  } catch (error) {
    console.error("Failed to start quiz", error)
  }
}

export async function insertProgressAction(
  quizId: string,
  questionId: string,
  selectedAnswerId: string
) {
  try {
    await insertProgress(quizId, questionId, selectedAnswerId)
  } catch (error) {
    console.error("Failed to insert progress", error)
  }
}

export async function pauseQuizAction(
  quizId: string,
  pausedAtQuestionIndex: number,
  remainingTimeSeconds: number
) {
  try {
    await pauseQuiz(quizId, pausedAtQuestionIndex, remainingTimeSeconds)
  } catch (error) {
    console.error("Failed to pause quiz", error)
  }
}

export async function deleteUserAnswersAction(
  quizId: string,
) {
  try {
    await deleteUserAnswers(quizId)
  } catch (error) {
    console.error("Failed to delete user answers quiz", error)
  }
}
