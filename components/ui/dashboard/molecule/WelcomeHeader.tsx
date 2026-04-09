"use client"
import { useUser } from "@/hooks/useUser"

export default function WelcomeHeader() {
  const user = useUser()
  return (
    <>
      <h1 className="text-2xl font-bold md:text-3xl">
        Welcome Back, {user?.name.split(" ")[0]}!
      </h1>
      <p className="text-xs text-muted-foreground md:text-base">
        Ready to Boost your intellect
      </p>
    </>
  )
}
