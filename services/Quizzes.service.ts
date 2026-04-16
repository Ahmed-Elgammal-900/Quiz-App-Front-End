import { QuizzesSchema } from "@/validations/quizzes.schema"
import type { QuizzesResponse } from "@/validations/quizzes.schema"
import { cookies } from "next/headers"

export async function getQuizzes(): Promise<QuizzesResponse> {
  const cookieStore = await cookies()
  try {
    const res = await fetch(`${process.env.API_URL}/quizzes`, {
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    })
    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(errorText)
    }
    const { data } = await res.json()

    const parsed = QuizzesSchema.safeParse(data)
    if (!parsed.success)
      throw new Error(`Invalid quizzes shape: ${parsed.error}`)
    return parsed.data
  } catch (error) {
    console.error("Failed to fetch badges", error)
    throw error instanceof Error ? error : new Error("Failed to fetch badges")
  }
}
