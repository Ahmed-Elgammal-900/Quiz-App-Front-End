import {
  TopThreeSchema,
  UserRankSchema,
  LeaderboardSchema,
} from "@/validations/leaderboard.schema"
import type {
  LeaderboardEntry,
  UserRank,
  Leaderboard,
} from "@/validations/leaderboard.schema"
import { cookies } from "next/headers"

export async function getTop3(): Promise<LeaderboardEntry[] | null> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")?.value
  if (!accessToken) return null
  try {
    const res = await fetch(`${process.env.API_URL}/quizzes/top-three`, {
      headers: { Cookie: `access_token=${accessToken}` },
      cache: "no-store",
    })
    if (!res.ok) {
      const { message } = await res.json()
      throw new Error(message)
    }
    const { data } = await res.json()

    const parsed = TopThreeSchema.safeParse(data)
    if (!parsed.success) {
      throw new Error(`Invalid Top 3 shape: ${parsed.error}`)
    }
    return parsed.data
  } catch (error) {
    console.error("Failed to fetch Top3", error)
    throw error instanceof Error ? error : new Error("Failed to fetch Top3")
  }
}

export async function getUserRank(): Promise<UserRank | null> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")?.value
  if (!accessToken) return null
  try {
    const res = await fetch(`${process.env.API_URL}/quizzes/my-rank`, {
      headers: { Cookie: `access_token=${accessToken}` },
      cache: "no-store",
    })
    if (!res.ok) {
      const { message } = await res.json()
      throw new Error(message)
    }
    const { data } = await res.json()

    const parsed = UserRankSchema.safeParse(data)
    if (!parsed.success) {
      throw new Error(`Invalid user rank shape: ${parsed.error}`)
    }
    return parsed.data
  } catch (error) {
    console.error("Failed to fetch user rank", error)
    throw error instanceof Error
      ? error
      : new Error("Failed to fetch user rank")
  }
}

export async function getLeaderBoard(
  page: number,
  limit: number
): Promise<Leaderboard | null> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")?.value
  if (!accessToken) return null
  try {
    const res = await fetch(
      `${process.env.API_URL}/quizzes/leaderboard?page=${page}&limit=${limit}`,
      {
        headers: { Cookie: `access_token=${accessToken}` },
        cache: "no-store",
      }
    )
    if (!res.ok) {
      const { message } = await res.json()
      throw new Error(message)
    }
    const { data } = await res.json()

    const parsed = LeaderboardSchema.safeParse(data)
    if (!parsed.success) {
      throw new Error(`Invalid Leaderboard shape: ${parsed.error}`)
    }
    return parsed.data
  } catch (error) {
    console.error("Failed to fetch Leaderboard", error)
    throw error instanceof Error
      ? error
      : new Error("Failed to fetch Leaderboard")
  }
}
