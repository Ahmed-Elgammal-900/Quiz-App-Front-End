import { Mail } from "lucide-react"
import { Input } from "../../system/input"
import { Field, FieldError, FieldLabel } from "../../system/field"

export default function EmailField({
  emailError,
}: {
  emailError: string | undefined
}) {
  return (
    <Field className="mb-5">
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <div className="relative">
        <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="email"
          type="email"
          name="email"
          className={`ps-9 focus:border-primary ${emailError && "border-destructive"}`}
          placeholder="Enter your Email"
        ></Input>
      </div>
      {emailError && <FieldError>{emailError}</FieldError>}
    </Field>
  )
}
