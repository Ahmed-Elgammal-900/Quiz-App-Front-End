import { cookies } from "next/headers"
import z from "zod"
import {
  ActivitySchema,
  BadgeSchema,
  StatsSchema,
} from "@/validations/dashboard.schema"
import type { Stats, Badge, Activity } from "@/validations/dashboard.schema"

export async function getStats(): Promise<Stats> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")?.value
  if (!accessToken) throw new Error("Unauthenticated")
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/quizzes/stats`,
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
    const parsed = StatsSchema.safeParse(data)
    if (!parsed.success) throw new Error(`Invalid stats shape: ${parsed.error}`)
    return parsed.data
  } catch (error) {
    console.error("Failed to fetch stats", error)
    throw error instanceof Error ? error : new Error("Failed to fetch stats")
  }
}

export async function getBadges(): Promise<Badge[]> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")?.value
  if (!accessToken) throw new Error("Unauthenticated")
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/quizzes/earned-badges`,
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
    const parsed = z.array(BadgeSchema).safeParse(data)
    if (!parsed.success)
      throw new Error(`Invalid badges shape: ${parsed.error}`)
    return parsed.data
  } catch (error) {
    console.error("Failed to fetch badges", error)
    throw error instanceof Error ? error : new Error("Failed to fetch badges")
  }
}

export async function getActivities(): Promise<Activity> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")?.value
  if (!accessToken) throw new Error("Unauthenticated")
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/quizzes/activities`,
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
    const parsed = ActivitySchema.safeParse(data)
    if (!parsed.success)
      throw new Error(`Invalid activities shape: ${parsed.error}`)
    return parsed.data
  } catch (error) {
    console.error("Failed to fetch activities", error)
    throw error instanceof Error
      ? error
      : new Error("Failed to fetch activities")
  }
}
