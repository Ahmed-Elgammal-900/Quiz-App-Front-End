"use server"
import { deleteUser } from "@/services/user.service"
import { parseSetCookieHeader } from "@/utils/cookie"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function deleteUserAction() {
  const cookie = await cookies()
  try {
    const res = await deleteUser()
    const setCookieHeader = res.headers.get("set-cookie")

    if (setCookieHeader) {
      const parsed = parseSetCookieHeader(setCookieHeader)
      parsed.forEach(({ name, value, options }) => {
        cookie.set(name, value, options)
      })
    }
  } catch (error) {
    console.error("deleteUserAction error:", error)
    return { success: false, message: "An unexpected error occurred" }
  }
  redirect("/login")
}
