"use client"
import { useUser } from "@/hooks/useUser"
import CurrentPasswordField from "../atoms/currentPasswordField"
import PasswordField from "../../auth/atoms/password-field"
import ConfirmPassword from "../../auth/atoms/confirm-password"
import { Button } from "../../system/button"
import { changePasswordAction } from "@/actions/auth.action"
import { useActionState, useEffect } from "react"
import { ActionState } from "@/types/auth.types"
import { toast } from "sonner"

export default function ChangePasswordForm() {
  const user = useUser()
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    changePasswordAction,
    {} as ActionState
  )
  useEffect(() => {
    if (!state.message && !state.errors && !state.success) return

    if (!state.success && !state.errors) {
      toast.error(state.message)
    }

    if (state.success) {
      toast.success(state.message)
    }
  }, [state])
  return (
    <form className="flex-2" action={formAction} noValidate>
      <section className="rounded-xl bg-card p-5">
        <h2 className="mb-5 text-lg font-semibold lg:text-xl">
          Change Password
        </h2>
        <CurrentPasswordField
          currentPasswordError={state?.errors?.currentPassword}
          providers={user?.providers}
        />
        <PasswordField
          passwordError={state?.errors?.newPassword}
          isLogin={false}
        />
        <ConfirmPassword
          confirmPasswordError={state?.errors?.confirmPassword}
        />
        <Button
          type="submit"
          className="h-10 p-3 px-5 hover:bg-primary/90"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save New Password"}
        </Button>
      </section>
    </form>
  )
}
