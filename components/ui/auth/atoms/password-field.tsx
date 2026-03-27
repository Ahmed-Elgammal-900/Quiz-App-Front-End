import { Eye, EyeOff, Lock } from "lucide-react"
import { Field, FieldError, FieldLabel } from "../../field"
import { Input } from "../../input"
import Link from "next/link"
import { Button } from "../../button"
import { useState } from "react"

export default function PasswordField({
  passwordError,
  isLogin,
}: {
  passwordError: string | undefined
  isLogin: boolean
}) {
  const [passwordVisiple, setPasswordVisiple] = useState<boolean>(false)

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
          type={passwordVisiple ? "text" : "password"}
          name="password"
        />
        <Button
          onClick={() => setPasswordVisiple((prev) => !prev)}
          type="button"
          className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 bg-transparent text-muted-foreground hover:cursor-pointer"
        >
          {passwordVisiple ? <EyeOff></EyeOff> : <Eye></Eye>}
        </Button>
      </div>
      {passwordError && <FieldError>{passwordError}</FieldError>}
    </Field>
  )
}
