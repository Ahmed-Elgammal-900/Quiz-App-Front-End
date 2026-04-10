import { cookies } from "next/headers"

export async function getStats() {
  const cookieStore = await cookies()

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/quizzes/stats`, {
    headers: { Cookie: cookieStore.toString() },
    cache: "no-store",
  })
  if (!res.ok) console.error("Failed to fetch stats", res.text())
  const { data } = await res.json()
  return data ?? null
}

export async function getBadges() {
  const cookieStore = await cookies()

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/quizzes/badges`, {
    headers: { Cookie: cookieStore.toString() },
    cache: "no-store",
  })
  if (!res.ok) console.error("Failed to fetch badges", res.text())
  const { data } = await res.json()
  return data ?? null
}

export async function getActivities() {
  const cookieStore = await cookies()

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/quizzes/activities`, {
    headers: { Cookie: cookieStore.toString() },
    cache: "no-store",
  })
  if (!res.ok) console.error("Failed to fetch activities", res.text())
  const { data } = await res.json()
  return data ?? null
}
