"use client"
import { quizzesConfig } from "@/config/quizzes.config"
import { QuizStatus } from "@/constants/quiz-status.constant"
import { cn } from "@/lib/utils"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { QuizStatusBadge } from "../atom/QuizStatusBadge"
import { ActivityCardProps } from "@/types/dashboard.types"
import { useQuizModal } from "@/hooks/useQuizModal"
import { QuizModal } from "../../quizzes/molecules/QuizModal"
import { ChevronRight } from "lucide-react"

dayjs.extend(relativeTime)

export default function ActivityCard({
  title,
  attemptAt,
  score,
  status,
  passed,
  quizId,
  description,
  timeInSeconds,
  questionsCount,
}: ActivityCardProps) {
  const { open, data, openModal, closeModal } = useQuizModal()
  const config = quizzesConfig[title]

  if (!config) return null

  const { icon: Icon, iconColor, bgColor } = config
  return (
    <>
      <div
        className="group flex w-full items-center gap-x-4 rounded-xl bg-card p-4 hover:cursor-pointer md:p-5"
        onClick={() =>
          openModal({
            title,
            score,
            questionsCount,
            status,
            passed,
            timeInSeconds,
            description,
            quizId,
          })
        }
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
              <p className="text-xs text-muted-foreground">score: {score}</p>
              <span className="mx-1 size-1 rounded-full bg-muted-foreground" />
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
