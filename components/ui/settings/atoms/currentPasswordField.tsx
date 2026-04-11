"use client"
import { Eye, EyeOff, RotateCcwKeyIcon } from "lucide-react"
import { Field, FieldError, FieldLabel } from "../../system/field"
import { Input } from "../../system/input"
import { Button } from "../../system/button"
import { useState } from "react"

export default function CurrentPasswordField({
  currentPasswordError,
  providers,
}: {
  currentPasswordError: string | undefined
  providers: string[] | undefined
}) {
  const [passwordVisiple, setPasswordVisiple] = useState<boolean>(false)
  const disabled = providers?.length === 1 && providers[0] !== "local"
  return (
    <Field className="mb-7">
      <div className="flex items-center justify-between">
        <FieldLabel htmlFor="old-password">Current Password</FieldLabel>
      </div>
      <div className="relative">
        <RotateCcwKeyIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="old-password"
          className={`ps-10 focus:border-primary ${currentPasswordError && "border-destructive"}`}
          placeholder="••••••••"
          type={passwordVisiple ? "text" : "password"}
          name="current-password"
          disabled={disabled}
          aria-invalid={Boolean(currentPasswordError)}
          aria-describedby={
            currentPasswordError ? "current-password-error" : undefined
          }
        />
        {!disabled && (
          <Button
            onClick={() => setPasswordVisiple((prev) => !prev)}
            type="button"
            className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 bg-transparent text-muted-foreground hover:cursor-pointer"
          >
            {passwordVisiple ? <EyeOff></EyeOff> : <Eye></Eye>}
          </Button>
        )}
      </div>
      {currentPasswordError && <FieldError>{currentPasswordError}</FieldError>}
    </Field>
  )
}
