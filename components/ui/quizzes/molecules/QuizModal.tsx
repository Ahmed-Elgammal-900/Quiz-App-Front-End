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
import { cn } from "@/lib/utils"
import { buttonQuizConfig } from "@/config/quizzes.config"
import { useRouter } from "next/navigation"
import type { QuizModalProps } from "@/types/quizzes.types"

export function QuizModal({
  open,
  onOpenChange,
  title,
  questionsCount,
  status,
  passed,
  timeInSeconds,
  description,
  quizId,
  signedTime,
  signedStatus,
  progress,
}: QuizModalProps) {
  const router = useRouter()

  const redirToQuiz = () => {
    const params = new URLSearchParams()
    if (effectiveStatus !== QuizStatus.PASSED) params.set("time", signedTime)
    if (signedStatus) params.set("status", signedStatus)
    router.push(`/quiz/${quizId}?${params.toString()}`)
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

  const effectiveStatus: QuizStatus | null = passed
    ? QuizStatus.PASSED
    : (status as QuizStatus)

  const buttonConfig = effectiveStatus
    ? buttonQuizConfig[effectiveStatus]
    : undefined

  const isInProgress = status === QuizStatus.IN_PROGRESS
  const label = isInProgress ? "Remaining" : "Duration"
  const icon = isInProgress ? <Clock size={18} /> : <Hourglass size={18} />
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between">
          {effectiveStatus !== QuizStatus.PASSED && (
            <div className="inline-flex items-center gap-3 rounded-xl border bg-card px-4 py-2">
              <div className="text-primary">{icon}</div>

              <div className="flex flex-col">
                <span className="text-[10px] leading-none font-bold tracking-tighter text-slate-400 uppercase">
                  {label}
                </span>

                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-2xl font-bold tracking-tight text-slate-800 tabular-nums dark:text-slate-200">
                    {formatTime(timeInSeconds)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {effectiveStatus && <QuizStatusBadge status={effectiveStatus} />}
        </div>
        <div>
          <p className="mt-5 mb-2 flex items-center gap-x-2">
            <List />
            <span className="font-semibold">{questionsCount} Questions</span>
          </p>
        </div>
        {(effectiveStatus === QuizStatus.IN_PROGRESS ||
          effectiveStatus === QuizStatus.PAUSED) &&
          (() => {
            return (
              <div className="my-3 overflow-y-auto">
                <span className="text-primary capitalize">
                  progress: {progress ?? 0}%
                </span>
                <div className="mt-5 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    style={{ width: `${progress ?? 0}%` }}
                    className="animate-grow h-full rounded-full bg-primary"
                  />
                </div>
              </div>
            )
          })()}
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
