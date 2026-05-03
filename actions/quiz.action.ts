"use server"
import {
  insertProgress,
  startQuiz,
  pauseQuiz,
  deleteUserAnswers,
} from "@/services/Quizzes.service"

export async function startQuizAction(
  quizId: string
): Promise<{ success: boolean; message?: string }> {
  try {
    await startQuiz(quizId)
    return { success: true }
  } catch (error) {
    console.error("Failed to start quiz", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to start quiz",
    }
  }
}

export async function insertProgressAction(
  quizId: string,
  questionId: string,
  selectedAnswerId: string
): Promise<{ success: boolean; message?: string }> {
  try {
    await insertProgress(quizId, questionId, selectedAnswerId)
    return { success: true }
  } catch (error) {
    console.error("Failed to insert progress", error)
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to insert user answer",
    }
  }
}

export async function pauseQuizAction(
  quizId: string,
  pausedAtQuestionIndex: number,
  remainingTimeSeconds: number
): Promise<{ success: boolean; message?: string }> {
  try {
    await pauseQuiz(quizId, pausedAtQuestionIndex, remainingTimeSeconds)
    return { success: true }
  } catch (error) {
    console.error("Failed to pause quiz", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to pause quiz",
    }
  }
}

export async function deleteUserAnswersAction(
  quizId: string
): Promise<{ success: boolean; message?: string }> {
  try {
    await deleteUserAnswers(quizId)
    return { success: true }
  } catch (error) {
    console.error("Failed to delete user answers quiz", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to pause quiz",
    }
  }
}
