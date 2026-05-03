"use client"
import {
  BadgeCheck,
  Check,
  Clock9,
  HelpCircleIcon,
  Target,
  X,
} from "lucide-react"
import { QuizStatusBadge } from "../../dashboard/atom/QuizStatusBadge"
import { Separator } from "../../system/separator"
import { cn } from "@/lib/utils"
import { Button } from "../../system/button"
import { QuizStatus } from "@/constants/quiz-status.constant"
import { ResultProps } from "@/types/result.types"
import { useParams, useRouter } from "next/navigation"
import { deleteUserAnswersAction } from "@/actions/quiz.action"
import { quizzesConfig } from "@/config/quizzes.config"
import { useEffect, useRef } from "react"

export default function ResultPage({
  status,
  score,
  passed,
  correctAnswers,
  totalQuestions,
  timeTaken,
  title,
}: ResultProps) {
  const hasNavigatedAway = useRef(false)
  const router = useRouter()
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : undefined
  const config = quizzesConfig[title]

  if (!config) throw new Error(`Invalid quiz config for ${title}`)

  const { icon: Icon, iconColor, bgColor } = config

  useEffect(() => {
    if (!slug) return

    const handleBeforeUnload = () => {
      if (hasNavigatedAway.current) return

      navigator.sendBeacon(
        `/api/result/delete`,
        new Blob([JSON.stringify({ quizId: slug })], {
          type: "application/json",
        })
      )
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [slug])

  const formatSeconds = (seconds: number): string => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60

    if (h > 0) {
      return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    }

    return `${m}:${String(s).padStart(2, "0")}`
  }

  const handleRedir = async () => {
    try {
      hasNavigatedAway.current = true
      if (!slug) return
      await deleteUserAnswersAction(slug as string)
      router.push("/dashboard")
    } catch (error) {
      console.error("can't delete user answers", error)
    }
  }

  return (
    <div>
      <div className="mx-auto mt-10 max-w-2xl px-5 md:mt-15">
        <div className="flex items-center justify-center gap-3 text-center">
          <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-primary text-primary-foreground">
            <HelpCircleIcon size={30} />
          </div>
          <h1 className="text-3xl font-bold text-primary">Quizzer</h1>
        </div>
        <div className="mt-8 rounded-xl bg-card p-5">
          <div>
            <div className="flex items-center justify-between md:flex-row">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex size-15 shrink-0 items-center justify-center rounded-full bg-linear-to-br md:size-25",
                    bgColor
                  )}
                >
                  <Icon className={cn("size-7 md:size-11", iconColor)} />
                </div>
                <div>
                  <h2 className="font-bold md:ms-3 md:mb-3 md:text-xl">
                    {title}
                  </h2>
                  <div className="hidden items-center justify-between gap-3 rounded-full bg-muted px-5 py-3 md:flex">
                    <span className="font-bold text-primary md:text-2xl">
                      {score}%
                    </span>
                    <Separator orientation="vertical" />
                    <span className="text-sm font-semibold">
                      {correctAnswers} / {totalQuestions} correct
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <QuizStatusBadge
                  status={passed ? QuizStatus.PASSED : (status as QuizStatus)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-30 rounded-xl bg-card p-5">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-lg font-bold">Performance Summary</h2>
          </div>
          <div className="flex flex-col items-center gap-7 md:flex-row-reverse md:items-start md:gap-0">
            <div className="flex w-full items-center justify-between md:flex-col">
              <div className="flex items-center gap-2 font-semibold md:mb-3">
                <Target />
                Accuracy
              </div>
              <span className="text-xl font-bold text-primary md:text-3xl">
                {score}%
              </span>
            </div>
            <div className="flex w-full items-center justify-between md:flex-col md:items-start">
              <div className="flex items-center gap-2 font-semibold md:mb-3">
                <Clock9 />
                Time Taken
              </div>
              <span className="text-xl font-bold md:text-3xl">
                {formatSeconds(timeTaken)}
              </span>
            </div>
            <div className="flex w-full items-center justify-between md:flex-col md:items-start">
              <div className="flex items-center gap-2 font-semibold md:mb-3">
                <BadgeCheck />
                Passed
              </div>
              <span
                className={cn(
                  "font-bold",
                  passed ? "text-green-500" : "text-destructive"
                )}
              >
                {passed ? (
                  <Check size={36} strokeWidth={3} aria-label="Passed" />
                ) : (
                  <X size={36} strokeWidth={3} aria-label="Failed" />
                )}
              </span>
            </div>
          </div>
        </div>
        <Button
          onClick={handleRedir}
          className="mt-8 mb-8 block h-12 w-full rounded-xl bg-primary transition-colors hover:cursor-pointer hover:bg-primary/80"
        >
          Go To Dashboard
        </Button>
      </div>
    </div>
  )
}
