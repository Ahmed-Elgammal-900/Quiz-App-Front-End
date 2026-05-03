"use client"
import { quizzesConfig } from "@/config/quizzes.config"
import { QuizStatus } from "@/constants/quiz-status.constant"
import { cn } from "@/lib/utils"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { QuizStatusBadge } from "../atom/QuizStatusBadge"
import type { ActivityCardProps } from "@/types/dashboard.types"
import { useQuizModal } from "@/hooks/useQuizModal"
import { QuizModal } from "../../quizzes/molecules/QuizModal"
import { ChevronRight } from "lucide-react"

dayjs.extend(relativeTime)

export default function ActivityCard({
  title,
  attemptAt,
  status,
  passed,
  quizId,
  description,
  timeInSeconds,
  questionsCount,
  signedTime,
  signedStatus,
  progress,
}: ActivityCardProps) {
  const { open, data, openModal, closeModal } = useQuizModal()
  const config = quizzesConfig[title]

  if (!config) throw new Error(`Invalid quiz config for ${title}`)

  const { icon: Icon, iconColor, bgColor } = config

  const handleOpen = () =>
    openModal({
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
    })
  return (
    <>
      <div
        role="button"
        className="group flex w-full items-center gap-x-4 rounded-xl bg-card p-4 hover:cursor-pointer md:p-5"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleOpen()}
        onClick={handleOpen}
      >
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br",
            bgColor
          )}
        >
          <Icon className={cn("h-6 w-6", iconColor)} />
        </div>
        <div className="flex w-full items-center justify-between">
          <div>
            <h4 className="text-sm">{title}</h4>
            <div className="flex items-center">
              {(status === QuizStatus.IN_PROGRESS ||
                status === QuizStatus.PAUSED) &&
                !passed && (
                  <>
                    <p className="text-xs text-muted-foreground">
                      progress: {Math.floor(progress ?? 0)}%
                    </p>
                    <span className="mx-1 size-1 rounded-full bg-muted-foreground" />
                  </>
                )}
              <p className="text-xs text-muted-foreground">
                {dayjs(attemptAt).fromNow()}
              </p>
            </div>
          </div>
          <QuizStatusBadge status={passed ? QuizStatus.PASSED : status} />
        </div>
        <ChevronRight className="transition-transform group-hover:translate-x-1" />
      </div>
      {data && <QuizModal open={open} onOpenChange={closeModal} {...data} />}
    </>
  )
}
