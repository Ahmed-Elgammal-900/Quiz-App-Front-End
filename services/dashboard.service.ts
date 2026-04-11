import { ActivityData, Badge, Stats } from "@/types/dashboard.types"
import { cookies } from "next/headers"

export async function getStats() {
  const cookieStore = await cookies()
  try {
    const res = await fetch(`${process.env.API_URL}/quizzes/stats`, {
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    })
    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(errorText)
    }
    const { data } = await res.json()
    return data as Stats
  } catch (error) {
    console.error("Failed to fetch stats", error)
    throw new Error("Failed to fetch stats")
  }
}

export async function getBadges() {
  const cookieStore = await cookies()
  try {
    const res = await fetch(`${process.env.API_URL}/quizzes/badges`, {
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    })
    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(errorText)
    }
    const { data } = await res.json()

    return data as Badge[]
  } catch (error) {
    console.error("Failed to fetch badges", error)
    throw new Error("Failed to fetch badges")
  }
}

export async function getActivities() {
  const cookieStore = await cookies()
  try {
    const res = await fetch(`${process.env.API_URL}/quizzes/activities`, {
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    })
    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(errorText)
    }
    const { data } = await res.json()
    return data as ActivityData[]
  } catch (error) {
    console.error("Failed to fetch activities", error)
    throw new Error("Failed to fetch activities")
  }
}
