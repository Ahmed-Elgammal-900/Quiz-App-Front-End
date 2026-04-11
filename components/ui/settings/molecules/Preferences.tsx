import { Settings2 } from "lucide-react"
import DarkModeSwitch from "../atoms/DarkModeSwitch"

export default function Preference() {
  return (
    <section className="flex-1 items-center rounded-xl bg-card p-5">
      <h2 className="mb-5 flex items-center gap-x-3 font-semibold">
        <Settings2 className="text-primary" />
        Preferences
      </h2>
      <DarkModeSwitch />
    </section>
  )
}
