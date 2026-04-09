import { User } from "lucide-react"
import { Field, FieldError, FieldLabel } from "../../system/field"
import { Input } from "../../system/input"

export default function NameField({
  nameError,
}: {
  nameError: string | undefined
}) {
  return (
    <Field className="mb-5">
      <FieldLabel htmlFor="name">Name</FieldLabel>
      <div className="relative">
        <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="name"
          name="name"
          id="name"
          className={`ps-10 focus:border-primary ${nameError && "border-destructive"}`}
          placeholder="Enter Your Name"
        />
      </div>
      {nameError && <FieldError>{nameError}</FieldError>}
    </Field>
  )
}
