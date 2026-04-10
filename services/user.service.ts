import { User } from "@/types/user.types"
import { cookies } from "next/headers"

export async function getUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value
  if (!token) return null
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/user`, {
    headers: { Cookie: cookieStore.toString() },
    cache: "no-store",
  })

  if (!res.ok) console.error("Failed to fetch user", res.text())

  const { data }: { data: User | null } = await res.json()
  return data ?? null
}
