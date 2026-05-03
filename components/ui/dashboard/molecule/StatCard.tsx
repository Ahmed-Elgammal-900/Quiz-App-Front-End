import type { StatCardProps } from "@/types/dashboard.types"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

export const statCard = cva("flex rounded-xl bg-card p-5", {
  variants: {
    variant: {
      default: "h-40 flex-1 flex-col",
      full: "h-24 flex-row-reverse items-center justify-between lg:h-40 lg:flex-1 lg:flex-col lg:items-start lg:justify-start",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export default function StatCard({
  label,
  value,
  icon: Icon,
  color,
  variant = "default",
}: StatCardProps) {
  return (
    <div className={statCard({ variant })}>
      <Icon className={cn("mt-2 mb-3 h-5 w-5", color)} />
      <div>
        <h3 className="mb-1 text-sm text-muted-foreground">{label}</h3>
        <p className="text-2xl font-semibold">{value.toLocaleString()}</p>
      </div>
    </div>
  )
}
