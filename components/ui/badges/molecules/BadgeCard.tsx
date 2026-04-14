import { cn } from "@/lib/utils"
import BadgeIcon from "../atoms/BadgeIcon"
import { CircleCheck } from "lucide-react"

export default function BadgeCard({
  badgeTitle,
  earned,
}: {
  badgeTitle: string
  earned: boolean
}) {
  return (
    <div
      className={cn(
        "flex h-20 items-center justify-between rounded-xl p-5 md:h-55 md:items-start",
        earned ? "bg-card" : "bg-gray-400/20"
      )}
    >
      <BadgeIcon badgeTitle={badgeTitle} earned={earned} />
      {earned && <CircleCheck className="md:self-end" />}
    </div>
  )
}
