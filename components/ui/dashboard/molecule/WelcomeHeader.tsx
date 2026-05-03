"use client"
import { useUser } from "@/hooks/useUser"

export default function WelcomeHeader() {
  const user = useUser()
  const firstName = user?.name?.trim().split(/\s+/)[0] ?? "there"
  return (
    <>
      <h1 className="text-2xl font-bold md:text-3xl">Welcome, {firstName}!</h1>
      <p className="text-xs text-muted-foreground md:text-base">
        Ready to Boost your intellect
      </p>
    </>
  )
}
