import { Medal } from "lucide-react"

export default function BadgesHeader() {
  return (
    <>
      <h1 className="text-2xl font-bold md:text-3xl">Badges</h1>
      <p className="flex items-center gap-x-1 text-xs text-muted-foreground md:text-base">
        Track your progress and show off what you&apos;ve mastered.
        <Medal />
      </p>
    </>
  )
}
