import { cookies } from "next/headers"

export async function getStats() {
  const cookieStore = await cookies()

  const res = await fetch(`${process.env.API_URL}/quizzes/stats`, {
    headers: { Cookie: cookieStore.toString() },
    cache: "no-store",
  })
  if (!res.ok) {
    const errorText = await res.text()
    console.error("Failed to fetch stats", errorText)
    return null
  }
  const { data } = await res.json()
  return data
}

export async function getBadges() {
  const cookieStore = await cookies()

  const res = await fetch(`${process.env.API_URL}/quizzes/badges`, {
    headers: { Cookie: cookieStore.toString() },
    cache: "no-store",
  })
  if (!res.ok) {
    const errorText = await res.text()
    console.error("Failed to fetch badges", errorText)
    return null
  }
  const { data } = await res.json()
  return data
}

export async function getActivities() {
  const cookieStore = await cookies()

  const res = await fetch(`${process.env.API_URL}/quizzes/activities`, {
    headers: { Cookie: cookieStore.toString() },
    cache: "no-store",
  })
  if (!res.ok) {
    const errorText = await res.text()
    console.error("Failed to fetch activities", errorText)
    return null
  }
  const { data } = await res.json()
  return data
}
