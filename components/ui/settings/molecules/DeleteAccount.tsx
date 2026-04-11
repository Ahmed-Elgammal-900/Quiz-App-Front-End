"use client"
import { OctagonAlert, Trash2 } from "lucide-react"
import { Button } from "../../system/button"
import { toast } from "sonner"
import { useState } from "react"
import { deleteUserAction } from "@/actions/user.action"

export default function DeleteAccount() {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const response = await deleteUserAction()
      toast.error(response.message || "Something went wrong")
    } catch (error) {
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <section className="flex flex-3 flex-col rounded-xl border border-destructive bg-destructive/10 p-7 lg:flex-1">
      <div>
        <h2 className="flex items-center gap-x-3 font-semibold text-destructive">
          <OctagonAlert className="text-destructive" />
          Danger Zone
        </h2>
        <p className="mt-5 text-sm text-muted-foreground md:text-base">
          Deleting your account is permanent. All your progress, earned badges,
          and quiz history will be wiped from our servers immediately. This
          action cannot be undone.
        </p>
      </div>
      <Button
        className="mt-auto h-10 w-full hover:cursor-pointer"
        variant="destructive"
        onClick={handleDelete}
        disabled={isLoading}
      >
        <Trash2 /> {isLoading ? "Deleting..." : "Delete Account"}
      </Button>
    </section>
  )
}
