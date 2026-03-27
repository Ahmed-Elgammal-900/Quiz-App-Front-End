import { SearchX } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-xl border p-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <SearchX className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-lg font-semibold">Page Not Found</h1>
        <p className="text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-primary"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
