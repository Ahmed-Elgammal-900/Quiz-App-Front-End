"use client"
import Link from "next/link"
import { FieldSeparator } from "../field"
import AuthButton from "./atoms/auth-button"
import GoogleAuth from "./atoms/goolgle-auth"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { ActionState, AuthFormProps } from "@/types/auth.types"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { VARIANT_CONFIG } from "@/config/auth.config"
import { FormFields } from "@/utils/auth-field-generator"

export default function AuthForm({ variant, action, token }: AuthFormProps) {
  const boundAction =
    variant === "resetPassword" ? action.bind(null, token ?? "") : action
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    boundAction as (
      _prevState: ActionState,
      payload: FormData
    ) => ActionState | Promise<ActionState>,
    {} as ActionState
  )

  useEffect(() => {
    if (!state.message && !state.errors && !state.success) return

    if (!state.success && state.errors?.resetToken) {
      toast.error(state.errors?.resetToken)
    } else if (!state.success) {
      toast.error(state.message ?? "Failed")
    }

    if (state.success) {
      toast.success(state.message ?? "success")
    }
  }, [state])
  const config = VARIANT_CONFIG[variant]
  const isLogin = variant === "login"
  return (
    <form action={formAction} noValidate suppressHydrationWarning>
      <div className="mx-auto mt-4 mb-10 w-full max-w-107 rounded-3xl bg-card px-7 py-10 shadow-xl sm:px-9">
        <div className="text-center">
          {" "}
          <h2 className="text-[23px] font-bold">{config.header}</h2>
          <p className="mb-5 text-sm">{config.description}</p>
        </div>
        {/* form fields */}
        <FormFields
          fields={config.fields}
          errors={state?.errors}
          isLogin={isLogin}
        />

        {/* Submit button */}
        {variant === "forgotPassword" && <div className="mb-10" />}
        <AuthButton isPending={isPending}>
          {isPending ? (
            config.buttonPending
          ) : (
            <>
              {config.buttonLabel}
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
            </>
          )}
        </AuthButton>
        {/* Google auth */}
        {config.showSocialAuth && (
          <>
            <FieldSeparator>Or Continue With</FieldSeparator>
            <GoogleAuth />
          </>
        )}

        {/* Back link */}
        {config.backLink && (
          <>
            <FieldSeparator className="mt-3" />
            <div className="mb-2 pt-4 text-center">
              <Link
                href={config.backLink.href}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="size-3.5" />
                {config.backLink.label}
              </Link>
            </div>
          </>
        )}

        {/* Footer link */}
        {config.footer && (
          <p className="pt-5 text-center text-sm">
            {config.footer.text}{" "}
            <Link
              href={config.footer.href}
              className="text-primary hover:underline"
            >
              {config.footer.linkLabel}
            </Link>
          </p>
        )}
      </div>
    </form>
  )
}
