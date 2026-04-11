import { User } from "@/types/user.types"
import { cookies } from "next/headers"

export async function getUser() {
  const cookieStore = await cookies()
  try {
    const res = await fetch(`${process.env.API_URL}/user`, {
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(errorText)
    }

    const { data } = await res.json()
    return data as User
  } catch (error) {
    console.error("Failed to fetch user", error)
    throw new Error("Failed to fetch user")
  }
}

export async function deleteUser() {
  const cookieStore = await cookies()
  try {
    const res = await fetch(`${process.env.API_URL}/user`, {
      method: "DELETE",
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(errorText)
    }

    return res
  } catch (error) {
    console.error("Failed to delete user:", error)
    throw new Error("Failed to delete user")
  }
}
