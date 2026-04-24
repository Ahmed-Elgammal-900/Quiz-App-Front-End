import QuizClient from "@/components/ui/quiz/organisms/QuizClient"
import { verifyStatus } from "@/lib/server/sign-status"
import { verifyTime } from "@/lib/server/time-signing"
import {
  getQuestionsIds,
  getQuizProgress,
  getQuizWithQuestions,
} from "@/services/Quizzes.service"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "quiz",
}

export default async function QuizPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{
    time?: string
    status?: string
    page?: string
    limit?: string
  }>
}) {
  const { slug } = await params
  const { time, status, page, limit } = await searchParams

  let verifiedTime
  let verifiedStatus

  const quizProgress = await getQuizProgress(slug, Number(limit ?? 10))

  const [questionsIds, quizDetails] = await Promise.all([
    getQuestionsIds(slug),
    getQuizWithQuestions(
      slug,
      Number(page ?? quizProgress?.currentPage ?? 1),
      Number(limit ?? 10)
    ),
  ])

  if (!questionsIds) return null

  if (time) {
    verifiedTime = verifyTime(time)
    if (!verifiedTime) {
      throw new Error("Invalid Time")
    }
  }

  if (status) {
    verifiedStatus = verifyStatus(status)
    if (!verifiedStatus) {
      throw new Error("Invalid Status")
    }
  }
  return (
    <section>
      <QuizClient
        time={verifiedTime}
        status={verifiedStatus}
        quizDetails={quizDetails}
        quizProgress={quizProgress ?? null}
        questionsIds={questionsIds}
      />
    </section>
  )
}
