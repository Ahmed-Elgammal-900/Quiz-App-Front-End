"use client"
import { XCircle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-7 lg:px-0">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-xl bg-card p-10 text-center shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
          <XCircle className="h-8 w-8 text-destructive" />
        </div>
        <h1 className="text-lg font-semibold">Something went wrong</h1>
        <p className="text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={reset}
          className="text-sm text-secondary hover:cursor-pointer hover:text-primary"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
