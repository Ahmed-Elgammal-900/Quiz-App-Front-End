import { ShieldCheck } from "lucide-react"
import { Field, FieldError, FieldLabel } from "../../system/field"
import { Input } from "../../system/input"

export default function ConfirmPassword({
  confirmPasswordError,
}: {
  confirmPasswordError: string | undefined
}) {
  return (
    <Field className="mb-8">
      <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
      <div className="relative">
        <ShieldCheck className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="password"
          className={`ps-10 focus:border-primary ${confirmPasswordError && "border-destructive"}`}
          placeholder="••••••••"
          id="confirm-password"
          name="confirm-password"
        />
      </div>
      {confirmPasswordError && <FieldError>{confirmPasswordError}</FieldError>}
    </Field>
  )
}
