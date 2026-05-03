import ResultPage from "@/components/ui/result/page/Result"
import { getResult } from "@/services/Quizzes.service"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Result",
}

export default async function Result({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const result = await getResult(slug)
  if (!result) throw new Error("Invalid result for this quiz")
  const {
    quizTitle: title,
    status,
    score,
    passed,
    correctAnswers,
    totalQuestions,
    timeTaken,
  } = result

  return (
    <ResultPage
      {...{
        status,
        score,
        passed,
        correctAnswers,
        totalQuestions,
        timeTaken,
        title,
      }}
    />
  )
}
