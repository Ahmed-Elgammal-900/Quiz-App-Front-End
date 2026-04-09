import { cookies } from "next/headers"

export async function getStats() {
  const cookieStore = await cookies()
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/quizzes/stats`, {
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    })
    if (!res.ok) throw new Error("Failed to fetch stats")
    const { data } = await res.json()
    return data
  } catch (error) {
    throw error
  }
}

export async function getBadges() {
  const cookieStore = await cookies()

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/quizzes/badges`, {
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    })
    if (!res.ok) throw new Error("Failed to fetch badges")
    const { data } = await res.json()
    return data
  } catch (error) {
    throw error
  }
}

export async function getActivities() {
  const cookieStore = await cookies()

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/quizzes/activities`,
      {
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
      }
    )
    if (!res.ok) throw new Error("Failed to fetch activities")
    const { data } = await res.json()
    return data
  } catch (error) {
    throw error
  }
}
