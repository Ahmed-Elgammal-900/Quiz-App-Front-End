"use client"
import { useTheme } from "next-themes"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "../../system/field"
import { Switch } from "../../system/switch"

export default function DarkModeSwitch() {
  const { resolvedTheme, setTheme } = useTheme()

  if (!resolvedTheme) return null
  return (
    <Field orientation="horizontal">
      <FieldContent>
        <FieldLabel htmlFor="switch-focus-mode">Dark Mode</FieldLabel>
        <FieldDescription>
          Switch to dark theme or press
          <kbd className="mx-1.5 inline-flex items-center rounded border border-b-2 border-border bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
            d
          </kbd>
          on keyboard
        </FieldDescription>
      </FieldContent>
      <Switch
        id="switch-focus-mode"
        checked={resolvedTheme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
    </Field>
  )
}
