import { User } from "@/types/user.types"
import { cookies } from "next/headers"

export async function getUser() {
  const cookieStore = await cookies()

  const res = await fetch(`${process.env.API_URL}/user`, {
    headers: { Cookie: cookieStore.toString() },
    cache: "no-store",
  })

  if (!res.ok) {
    const errorText = await res.text()
    console.error("Failed to fetch user", errorText)
    return null
  }

  const { data }: { data: User | null } = await res.json()
  return data
}

export async function deleteUser() {
  const cookieStore = await cookies()

  const res = await fetch(`${process.env.API_URL}/user`, {
    method: "DELETE",
    headers: { Cookie: cookieStore.toString() },
    cache: "no-store",
  })

  if (!res.ok) {
    const errorText = await res.text()
    console.error("Failed to delete user:", errorText)
    throw errorText
  }

  return res
}
