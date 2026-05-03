import { AlertCircle } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "OAuth Error",
}

export default async function AuthError({
  searchParams,
}: {
  searchParams: Promise<{
    message?: string
  }>
}) {
  const params = await searchParams
  const message = params.message
  const errorHeader =
    message === "oauth_failed"
      ? "Authentication Failed"
      : (message ?? "Something went wrong")
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-xl bg-card p-10 text-center shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold text-foreground">
            {errorHeader}
          </h1>
          <p className="text-sm text-muted-foreground">
            {message === "oauth_failed"
              ? "Failed to sign in with Google. Please try again."
              : ""}
          </p>
        </div>
        <Link
          className="text-sm text-muted-foreground transition-colors hover:text-primary"
          href="/login"
        >
          ← Back to Login
        </Link>
      </div>
    </div>
  )
}
