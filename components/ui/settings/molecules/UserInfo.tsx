"use client"
import { useUser } from "@/hooks/useUser"
import DisplayName from "../atoms/DisplayName"
import Email from "../atoms/Email"

export default function UserInfo() {
  const user = useUser()
  return (
    <div className="flex-2 rounded-xl bg-primary/5 p-5">
      <h2 className="mb-5 text-lg font-semibold lg:text-xl">User Info</h2>
      <DisplayName value={user?.name} />
      <Email value={user?.email} />
    </div>
  )
}
