"use client"
import { Eye, EyeOff, Lock } from "lucide-react"
import { Field, FieldError, FieldLabel } from "../../system/field"
import { Input } from "../../system/input"
import Link from "next/link"
import { Button } from "../../system/button"
import { useState } from "react"

export default function PasswordField({
  passwordError,
  isLogin,
}: {
  passwordError: string | undefined
  isLogin: boolean
}) {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

  return (
    <Field className="mb-7">
      <div className="flex items-center justify-between">
        <FieldLabel htmlFor="password">Password</FieldLabel>
        {isLogin && (
          <Link
            href="/forget-password"
            className="text-sm text-primary hover:underline"
          >
            Forget Password?
          </Link>
        )}
      </div>
      <div className="relative">
        <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="password"
          className={`ps-10 focus:border-primary ${passwordError && "border-destructive"}`}
          placeholder="••••••••"
          type={passwordVisible ? "text" : "password"}
          name="password"
          aria-invalid={Boolean(passwordError)}
          aria-describedby={passwordError ? "password-error" : undefined}
        />
        <Button
          onClick={() => setPasswordVisible((prev) => !prev)}
          type="button"
          aria-pressed={passwordVisible}
          aria-label={passwordVisible ? "Hide password" : "Show password"}
          className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 bg-transparent text-muted-foreground hover:cursor-pointer"
        >
          {passwordVisible ? <EyeOff></EyeOff> : <Eye></Eye>}
        </Button>
      </div>
      {passwordError && (
        <FieldError id="password-error">{passwordError}</FieldError>
      )}
    </Field>
  )
}
