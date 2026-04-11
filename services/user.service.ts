import { UserSchema } from "@/validations/user.schema"
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

    const parsed = UserSchema.safeParse(data)
    if (!parsed.success) throw new Error(`Invalid user shape: ${parsed.error}`)
    return parsed.data
  } catch (error) {
    console.error("Failed to fetch user", error)
    throw error instanceof Error ? error : new Error("Failed to fetch user")
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
    throw error instanceof Error ? error : new Error("Failed to delete user")
  }
}
