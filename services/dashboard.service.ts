import { cookies } from "next/headers"
import {
  ActivitySchema,
  BadgeSchema,
  StatsSchema,
} from "@/validations/dashboard.schema"
import type { Stats, Badge, Activity } from "@/validations/dashboard.schema"
import z from "zod"

export async function getStats(): Promise<Stats> {
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
    const parsed = StatsSchema.safeParse(data)
    if (!parsed.success) throw new Error(`Invalid stats shape: ${parsed.error}`)
    return parsed.data
  } catch (error) {
    console.error("Failed to fetch stats", error)
    throw new Error("Failed to fetch stats")
  }
}

export async function getBadges(): Promise<Badge[]> {
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
    const parsed = z.array(BadgeSchema).safeParse(data)
    if (!parsed.success)
      throw new Error(`Invalid badges shape: ${parsed.error}`)
    return parsed.data
  } catch (error) {
    console.error("Failed to fetch badges", error)
    throw new Error("Failed to fetch badges")
  }
}

export async function getActivities(): Promise<Activity[]> {
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
    const parsed = z.array(ActivitySchema).safeParse(data)
    if (!parsed.success)
      throw new Error(`Invalid activities shape: ${parsed.error}`)
    return parsed.data
  } catch (error) {
    console.error("Failed to fetch activities", error)
    throw new Error("Failed to fetch activities")
  }
}
