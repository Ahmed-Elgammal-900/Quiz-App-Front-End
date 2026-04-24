"use client"
import type { UserSchemaType } from "@/validations/user.schema"
import { createContext } from "react"

export const UserContext = createContext<UserSchemaType | null>(null)

export function UserProvider({
  user,
  children,
}: {
  user: UserSchemaType | null
  children: React.ReactNode
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
