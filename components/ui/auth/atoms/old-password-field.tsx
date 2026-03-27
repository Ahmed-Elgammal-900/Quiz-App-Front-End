import { Eye, EyeOff, Lock } from "lucide-react"
import { Field, FieldError, FieldLabel } from "../../field"
import { Input } from "../../input"
import { Button } from "../../button"
import { useState } from "react"

export default function OldPasswordField({
  oldPasswordError,
}: {
  oldPasswordError: string | undefined
}) {
  const [passwordVisiple, setPasswordVisiple] = useState<boolean>(false)
  return (
    <Field className="mb-7">
      <div className="flex items-center justify-between">
        <FieldLabel htmlFor="old-password">Password</FieldLabel>
      </div>
      <div className="relative">
        <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="old-password"
          className={`ps-10 focus:border-primary ${oldPasswordError && "border-destructive"}`}
          placeholder="••••••••"
          type={passwordVisiple ? "text" : "password"}
          name="old-password"
        />
        <Button
          onClick={() => setPasswordVisiple((prev) => !prev)}
          type="button"
          className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 bg-transparent text-muted-foreground hover:cursor-pointer"
        >
          {passwordVisiple ? <EyeOff></EyeOff> : <Eye></Eye>}
        </Button>
      </div>
      {oldPasswordError && <FieldError>{oldPasswordError}</FieldError>}
    </Field>
  )
}
