import { cookies } from "next/headers"

export async function getUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value
  if (!token) return null
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/user`, {
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    })

    if (!res.ok) throw new Error("Failed to fetch user")

    const { data } = await res.json()
    return data ?? null
  } catch (error) {
    throw error
  }
}

export async function deleteUser() {}
