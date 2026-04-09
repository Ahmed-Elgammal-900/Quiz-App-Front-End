import { cn } from "@/lib/utils"

function Skeleton({
  className,
  "aria-hidden": ariaHidden = true,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden={ariaHidden}
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
