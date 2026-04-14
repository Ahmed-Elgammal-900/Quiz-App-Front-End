import { cn } from "@/lib/utils"
import BadgeIcon from "../atoms/BadgeIcon"
import { CircleCheck } from "lucide-react"
import { BadgeProps } from "@/types/dashboard.types"

export default function BadgeCard({ badgeTitle, earned }: BadgeProps) {
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
