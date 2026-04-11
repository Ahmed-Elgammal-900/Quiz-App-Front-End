"use client"
import type { User } from "@/validations/user.schema"
import { createContext } from "react"

export const UserContext = createContext<User | null>(null)

export function UserProvider({
  user,
  children,
}: {
  user: User | null
  children: React.ReactNode
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
