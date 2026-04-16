"use client"
import { buttonQuizConfig, quizzesConfig } from "@/config/quizzes.config"
import { cn } from "@/lib/utils"
import { ChevronRight, List } from "lucide-react"
import { Button } from "../../system/button"
import { QuizStatus } from "@/constants/quiz-status.constant"
import { QuizStatusBadge } from "../../dashboard/atom/QuizStatusBadge"
import { useQuizModal } from "@/hooks/useQuizModal"
import { QuizModal } from "./QuizModal"

export default function QuizCard({
  title,
  score,
  questionsCount,
  status,
  passed,
  timeInSeconds,
  description,
  quizId,
}: {
  title: string
  score: number | null
  questionsCount: number
  status: string | null
  passed: boolean | null
  timeInSeconds: number
  description: string
  quizId: string
}) {
  const { open, data, openModal, closeModal } = useQuizModal()
  const Quizconfig = quizzesConfig[title]
  const buttonConfig = buttonQuizConfig[status as QuizStatus]
  const { icon: Icon, iconColor, bgColor } = Quizconfig
  return (
    <>
      <div
        className="flex min-h-20 items-center justify-between gap-x-4 rounded-xl bg-card p-5 md:min-h-70 md:flex-col md:items-stretch md:justify-start md:gap-x-0"
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
        <div className="flex w-full items-center gap-4 md:flex-col md:items-start">
          <div className="w-fit-content flex items-center justify-between md:w-full">
            <div
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br sm:size-13",
                bgColor
              )}
            >
              <Icon className={cn("size-5 sm:size-6", iconColor)} />
            </div>

            {status && (
              <QuizStatusBadge
                className="hidden md:block"
                status={passed ? QuizStatus.PASSED : (status as QuizStatus)}
              />
            )}
          </div>
          <span className="text-xs font-bold sm:text-sm md:text-base">
            {title}
          </span>
          {status && (
            <QuizStatusBadge
              className="ms-auto block text-nowrap md:hidden"
              status={passed ? QuizStatus.PASSED : (status as QuizStatus)}
            />
          )}
        </div>
        <p className="mt-8 hidden items-center gap-x-2 md:flex">
          <List />
          <span className="font-semibold">{questionsCount} Questions</span>
        </p>
        {status === QuizStatus.IN_PROGRESS && (
          <div className="my-5 hidden md:block">
            <span className="text-primary capitalize">progress: {score}%</span>
            <div className="mt-5 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                style={{ width: `${score}%` }}
                className="animate-grow h-full rounded-full bg-primary"
              />
            </div>
          </div>
        )}
        <Button
          className={cn(
            "mt-auto hidden h-10 hover:cursor-pointer md:block",
            buttonConfig?.styles ?? "hover:bg-primary/80"
          )}
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
          {buttonConfig ? buttonConfig.label : "Attempt Quiz"}
        </Button>
        <ChevronRight className="shrink-0 md:hidden" />
      </div>
      {data && <QuizModal open={open} onOpenChange={closeModal} {...data} />}
    </>
  )
}
