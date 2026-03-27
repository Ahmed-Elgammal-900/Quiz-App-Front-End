import Link from "next/link"

export default function ForgetPasswordSuccess() {
  return (
    <div className="mx-auto mt-40 mb-10 w-full max-w-107 rounded-3xl bg-card p-7 shadow-xl md:p-10">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
          <svg
            className="size-8 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </div>

        <h2 className="text-[23px] font-bold">Check Your Email</h2>
        <p className="text-sm text-muted-foreground">
          We sent a password reset link to your email. Check your inbox and
          follow the instructions.
        </p>
        <p className="text-xs text-muted-foreground">
          Didn't receive it? Check your spam folder.
        </p>

        <Link
          href="/login"
          className="mt-2 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </div>
  )
}
