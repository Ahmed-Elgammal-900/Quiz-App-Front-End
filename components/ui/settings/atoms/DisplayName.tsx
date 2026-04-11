import { User } from "lucide-react"
import { Field, FieldLabel } from "../../system/field"
import { Input } from "../../system/input"

export default function DisplayName({ value }: { value: string | undefined }) {
  return (
    <Field className="mb-5">
      <FieldLabel htmlFor="name">Display Name</FieldLabel>
      <div className="relative">
        <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          name="name"
          id="name"
          value={value}
          className="ps-10 text-sm"
          readOnly
        />
      </div>
    </Field>
  )
}
