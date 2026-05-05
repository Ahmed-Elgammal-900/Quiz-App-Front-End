import {
  GetQuizResponseSchema,
  questionIdsSchema,
  QuizUserProgressSchema,
  QuizzesSchema,
  ResultSchema,
} from "@/validations/quizzes.schema"
import type {
  QuestionIds,
  QuizProgress,
  QuizResponse,
  QuizzesResponse,
  Result,
} from "@/validations/quizzes.schema"
import { cookies } from "next/headers"

export async function getQuizzes(): Promise<QuizzesResponse> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")?.value
  if (!accessToken) throw new Error("Unauthenticated")
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes`, {
      headers: { Cookie: `access_token=${accessToken}` },
      cache: "no-store",
    })
    if (!res.ok) {
      let message = `Request failed with status ${res.status}`
      try {
        const body = await res.json()
        if (body.message) message = `${body.message} (${res.status})`
      } catch {
        /* response wasn't JSON */
      }
      throw new Error(message)
    }
    const { data } = await res.json()

    const parsed = QuizzesSchema.safeParse(data)
    if (!parsed.success)
      throw new Error(`Invalid quizzes shape: ${parsed.error}`)
    return parsed.data
  } catch (error) {
    console.error("Failed to fetch quizzes", error)
    throw error instanceof Error ? error : new Error("Failed to fetch quizzes")
  }
}

export async function getQuizWithQuestions(
  quizId: string,
  page?: number,
  limit?: number
): Promise<QuizResponse> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")?.value
  if (!accessToken) throw new Error("Unauthenticated")
  try {
    const params = new URLSearchParams()
    if (page !== undefined) params.set("page", String(page))
    if (limit !== undefined) params.set("limit", String(limit))
    const qs = params.toString() ? `?${params.toString()}` : ""
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/quizzes/${quizId}/questions${qs}`,
      {
        headers: { Cookie: `access_token=${accessToken}` },
        cache: "no-store",
      }
    )
    if (!res.ok) {
      let message = `Request failed with status ${res.status}`
      try {
        const body = await res.json()
        if (body.message) message = `${body.message} (${res.status})`
      } catch {
        /* response wasn't JSON */
      }
      throw new Error(message)
    }
    const { data } = await res.json()

    const parsed = GetQuizResponseSchema.safeParse(data)
    if (!parsed.success)
      throw new Error(`Invalid quizzes shape: ${parsed.error}`)
    return parsed.data
  } catch (error) {
    console.error("Failed to fetch quiz questions", error)
    throw error instanceof Error
      ? error
      : new Error("Failed to fetch quiz questions")
  }
}

export async function getQuizProgress(
  quizId: string,
  limit?: number
): Promise<QuizProgress> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")?.value
  if (!accessToken) throw new Error("Unauthenticated")
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/quizzes/${quizId}/progress?limit=${limit}`,
      {
        headers: { Cookie: `access_token=${accessToken}` },
        cache: "no-store",
      }
    )
    if (!res.ok) {
      let message = `Request failed with status ${res.status}`
      try {
        const body = await res.json()
        if (body.message) message = `${body.message} (${res.status})`
      } catch {
        /* response wasn't JSON */
      }
      throw new Error(message)
    }
    const { data } = await res.json()

    const parsed = QuizUserProgressSchema.safeParse(data)
    if (!parsed.success)
      throw new Error(`Invalid quizzes shape: ${parsed.error}`)
    return parsed.data
  } catch (error) {
    console.error("Failed to fetch quiz progress", error)
    throw error instanceof Error
      ? error
      : new Error("Failed to fetch quiz progress")
  }
}

export async function getResult(quizId: string): Promise<Result> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")?.value
  if (!accessToken) throw new Error("Unauthenticated")
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/quizzes/${quizId}/get-result`,
      {
        headers: { Cookie: `access_token=${accessToken}` },
        cache: "no-store",
      }
    )
    if (!res.ok) {
      let message = `Request failed with status ${res.status}`
      try {
        const body = await res.json()
        if (body.message) message = `${body.message} (${res.status})`
      } catch {
        /* response wasn't JSON */
      }
      throw new Error(message)
    }
    const { data } = await res.json()

    const parsed = ResultSchema.safeParse(data)
    if (!parsed.success)
      throw new Error(`Invalid result shape: ${parsed.error}`)
    return parsed.data
  } catch (error) {
    console.error("Failed to fetch result", error)
    throw error instanceof Error ? error : new Error("Failed to fetch result")
  }
}

export async function startQuiz(quizId: string) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")?.value
  if (!accessToken) throw new Error("Unauthenticated")
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/quizzes/${quizId}/start`,
      {
        method: "POST",
        headers: { Cookie: `access_token=${accessToken}` },
        cache: "no-store",
      }
    )
    if (!res.ok) {
      let message = `Request failed with status ${res.status}`
      try {
        const body = await res.json()
        if (body.message) message = `${body.message} (${res.status})`
      } catch {
        /* response wasn't JSON */
      }
      throw new Error(message)
    }
  } catch (error) {
    throw error instanceof Error ? error : new Error("Failed to start quiz")
  }
}

export async function insertProgress(
  quizId: string,
  questionId: string,
  selectedAnswerId: string
) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")?.value
  if (!accessToken) throw new Error("Unauthenticated")
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/quizzes/${quizId}/progress`,
      {
        method: "POST",
        headers: {
          Cookie: `access_token=${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questionId, selectedAnswerId }),
        cache: "no-store",
      }
    )
    if (!res.ok) {
      let message = `Request failed with status ${res.status}`
      try {
        const body = await res.json()
        if (body.message) message = `${body.message} (${res.status})`
      } catch {
        /* response wasn't JSON */
      }
      throw new Error(message)
    }
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Failed to insert user progress")
  }
}

export async function pauseQuiz(
  quizId: string,
  pausedAtQuestionIndex: number,
  remainingTimeSeconds: number
) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")?.value
  if (!accessToken) throw new Error("Unauthenticated")
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/quizzes/${quizId}/pause`,
      {
        method: "POST",
        headers: {
          Cookie: `access_token=${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pausedAtQuestionIndex, remainingTimeSeconds }),
        cache: "no-store",
      }
    )
    if (!res.ok) {
      let message = `Request failed with status ${res.status}`
      try {
        const body = await res.json()
        if (body.message) message = `${body.message} (${res.status})`
      } catch {
        /* response wasn't JSON */
      }
      throw new Error(message)
    }
  } catch (error) {
    throw error instanceof Error ? error : new Error("Failed to pause quiz")
  }
}

export async function getQuestionsIds(quizId: string): Promise<QuestionIds> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")?.value
  if (!accessToken) throw new Error("Unauthenticated")
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/quizzes/${quizId}/questions/ids`,
      {
        headers: { Cookie: `access_token=${accessToken}` },
        cache: "no-store",
      }
    )
    if (!res.ok) {
      let message = `Request failed with status ${res.status}`
      try {
        const body = await res.json()
        if (body.message) message = `${body.message} (${res.status})`
      } catch {
        /* response wasn't JSON */
      }
      throw new Error(message)
    }
    const { data } = await res.json()

    const parsed = questionIdsSchema.safeParse(data)
    if (!parsed.success)
      throw new Error(`Invalid questions ids shape: ${parsed.error}`)
    return parsed.data
  } catch (error) {
    console.error("Failed to fetch questions ids progress", error)
    throw error instanceof Error
      ? error
      : new Error("Failed to fetch questions ids progress")
  }
}

export async function deleteUserAnswers(quizId: string) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")?.value
  if (!accessToken) throw new Error("Unauthenticated")
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/quizzes/${quizId}/delete-user-answers`,
      {
        method: "DELETE",
        headers: {
          Cookie: `access_token=${accessToken}`,
        },
        cache: "no-store",
      }
    )
    if (!res.ok) {
      let message = `Request failed with status ${res.status}`
      try {
        const body = await res.json()
        if (body.message) message = `${body.message} (${res.status})`
      } catch {
        /* response wasn't JSON */
      }
      throw new Error(message)
    }
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Failed to delete user answers quiz")
  }
}
