"use client"
import { cn } from "@/lib/utils"
import type { QuestionMapProps } from "@/types/quiz.types"

export default function QuestionMap({
  currentIndex,
  answers,
  onNavigate,
  questionsIds,
}: QuestionMapProps) {
  return (
    <div className="mb-6 grid grid-cols-5 gap-x-3 gap-y-5 rounded-xl bg-card p-5 md:grid-cols-10">
      {questionsIds.map((questionId, i) => {
        const isAnswered = answers.some(
          ({ questionId: id }) => questionId === id
        )
        const isCurrent = i === currentIndex

        return (
          <button
            key={questionId}
            onClick={() => onNavigate(i)}
            className={cn(
              "h-10 w-full cursor-pointer rounded-xl",
              isCurrent
                ? "dark:text-black cursor-default bg-primary text-white"
                : isAnswered
                  ? "bg-primary/10"
                  : "bg-transparent"
            )}
          >
            {i + 1}
          </button>
        )
      })}
    </div>
  )
}
