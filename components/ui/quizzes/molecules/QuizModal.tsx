"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/system/dialog"
import { QuizStatusBadge } from "../../dashboard/atom/QuizStatusBadge"
import { QuizStatus } from "@/constants/quiz-status.constant"
import { Clock, Hourglass, List } from "lucide-react"
import { Button } from "../../system/button"
import { cn, signTime } from "@/lib/utils"
import { buttonQuizConfig } from "@/config/quizzes.config"
import { useRouter } from "next/navigation"

interface QuizModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  score: number | null
  questionsCount: number
  status: string | null
  passed: boolean | null
  timeInSeconds: number
  description: string
  quizId: string
}

export function QuizModal({
  open,
  onOpenChange,
  title,
  questionsCount,
  score,
  status,
  passed,
  timeInSeconds,
  description,
  quizId,
}: QuizModalProps) {
  const router = useRouter()
  const redirToQuiz = () => {
    router.push(
      `/quiz/${quizId}?time=${signTime(timeInSeconds)}&page=1&limit=10`
    )
  }
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    const paddedMins = mins.toString().padStart(2, "0")
    const paddedSecs = secs.toString().padStart(2, "0")

    if (hrs > 0) {
      return `${hrs}:${paddedMins}:${paddedSecs}`
    }
    return `${mins}:${paddedSecs}`
  }
  const hasHours = timeInSeconds >= 3600
  const effectiveStatus = passed ? QuizStatus.PASSED : (status as QuizStatus)
  const buttonConfig = effectiveStatus
    ? buttonQuizConfig[effectiveStatus]
    : undefined
  const progress = Math.max(0, Math.min(score ?? 0, 100))
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-3 rounded-xl border bg-card px-4 py-2">
            <div className="text-primary">
              {hasHours ? <Hourglass size={18} /> : <Clock size={18} />}
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] leading-none font-bold tracking-tighter text-slate-400 uppercase">
                {hasHours ? "Time Elapsed" : "Remaining"}
              </span>

              <div className="flex items-baseline gap-1">
                <span className="font-mono text-2xl font-bold tracking-tight text-slate-800 tabular-nums dark:text-slate-200">
                  {formatTime(timeInSeconds)}
                </span>

                <span className="text-xs font-semibold text-slate-500 lowercase">
                  {hasHours ? "hrs" : "mins"}
                </span>
              </div>
            </div>
          </div>
          {effectiveStatus && <QuizStatusBadge status={effectiveStatus} />}
        </div>
        <div>
          <p className="mt-5 mb-2 flex items-center gap-x-2">
            <List />
            <span className="font-semibold">{questionsCount} Questions</span>
          </p>
        </div>
        {status === QuizStatus.IN_PROGRESS && (
          <div className="my-3 overflow-y-auto">
            <span className="text-primary capitalize">
              progress: {progress}%
            </span>
            <div className="mt-5 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                style={{ width: `${progress}%` }}
                className="animate-grow h-full rounded-full bg-primary"
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <Button
            className={cn(
              "mt-auto h-10 w-full hover:cursor-pointer",
              buttonConfig?.styles ?? "hover:bg-primary/80"
            )}
            onClick={redirToQuiz}
          >
            {buttonConfig ? buttonConfig.label : "Attempt Quiz"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
