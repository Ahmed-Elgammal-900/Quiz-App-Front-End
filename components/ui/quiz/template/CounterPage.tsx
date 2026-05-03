import type { CounterProps } from "@/types/quiz.types"

export default function CounterPage({ counter }: CounterProps) {
  return (
    <div className="fixed flex h-screen w-screen items-center justify-center">
      <div className="flex size-40 items-center justify-center rounded-full border-6 border-black bg-transparent text-5xl font-semibold text-black dark:border-white dark:text-white">
        {counter >= 4 ? "GO" : counter}
      </div>
    </div>
  )
}
