import { cookies } from "next/headers"
import { UserSchema } from "@/validations/user.schema"
import type { UserSchemaType } from "@/validations/user.schema"

export async function getUser(): Promise<UserSchemaType | null> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")?.value
  if (!accessToken) return null
  try {
    const res = await fetch(`${process.env.API_URL}/user`, {
      headers: { Cookie: `access_token=${accessToken}` },
      cache: "no-store",
    })

    if (!res.ok) {
      const { message } = await res.json()
      throw new Error(message)
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

export async function deleteUser(): Promise<Response | null> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")?.value
  if (!accessToken) return null
  try {
    const res = await fetch(`${process.env.API_URL}/user`, {
      method: "DELETE",
      headers: { Cookie: `access_token=${accessToken}` },
    })

    if (!res.ok) {
      const { message } = await res.json()
      throw new Error(message)
    }

    return res
  } catch (error) {
    console.error("Failed to delete user:", error)
    throw error instanceof Error ? error : new Error("Failed to delete user")
  }
}
