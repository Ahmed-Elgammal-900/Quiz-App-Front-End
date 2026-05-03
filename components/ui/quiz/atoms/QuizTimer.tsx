"use client"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { Clock } from "lucide-react"
import type { QuizTimerProps } from "@/types/quiz.types"
import { cn } from "@/lib/utils"

const QuizTimer = forwardRef<{ getRemaining: () => number }, QuizTimerProps>(
  (
    { timeInSeconds, onFinish, storageKey, timerPaused, timeout, isFinished },
    ref
  ) => {
    const [remaining, setRemaining] = useState(() => {
      const saved = sessionStorage.getItem(storageKey)
      return saved ? Number(saved) : timeInSeconds
    })

    useEffect(() => {
      if (timerPaused || timeout || isFinished) return

      if (remaining <= 0) {
        onFinish()
        sessionStorage.removeItem(storageKey)
        return
      }

      sessionStorage.setItem(storageKey, String(remaining))

      const interval = setInterval(() => {
        setRemaining((t) => {
          if (t === 0) {
            clearInterval(interval)
            return 0
          }
          return t - 1
        })
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }, [remaining, timeout, timerPaused, isFinished, storageKey, onFinish])

    useImperativeHandle(ref, () => ({
      getRemaining: () => remaining,
    }))

    const mins = Math.floor(remaining / 60)
      .toString()
      .padStart(2, "0")
    const secs = (remaining % 60).toString().padStart(2, "0")

    return (
      <div className="flex w-25 items-center justify-end gap-2 text-sm font-medium">
        <Clock size={16} />
        <span className={cn("w-10", remaining <= 60 ? "text-destructive" : "")}>
          {mins}:{secs}
        </span>
      </div>
    )
  }
)

QuizTimer.displayName = "QuizTimer"

export default QuizTimer
