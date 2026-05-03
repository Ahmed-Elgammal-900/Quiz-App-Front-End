import { signTime } from "@/lib/server/time-signing"
import QuizCard from "../molecules/QuizCard"
import { getQuizzes } from "@/services/Quizzes.service"
import { signStatus } from "@/lib/server/sign-status"
import { QuizStatus } from "@/constants/quiz-status.constant"
import type { QuizzesListProps } from "@/types/quizzes.types"

export default async function QuizzesList({ search }: QuizzesListProps) {
  const quizzes = await getQuizzes()

  if (!quizzes) return null

  const query = search?.trim().toLowerCase()

  const matched = query
    ? quizzes.filter((q) => q.title.toLowerCase().includes(query))
    : quizzes

  const filtered = matched.map((quiz) => ({
    ...quiz,
    signedTime: signTime(quiz.timeInSeconds),
    signedStatus: quiz.status
      ? signStatus(quiz.passed ? QuizStatus.PASSED : quiz.status)
      : "",
  }))

  if (filtered.length === 0) {
    return (
      <p className="mt-50 h-full text-center text-muted-foreground">
        {query
          ? `No quizzes found for "${query}"`
          : "No quizzes available yet."}
      </p>
    )
  }

  return (
    <div className="mt-5">
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(
          ({
            id,
            title,
            questionsCount,
            score,
            status,
            passed,
            description,
            timeInSeconds,
            signedTime,
            signedStatus,
            progress,
          }) => (
            <QuizCard
              title={title}
              status={status}
              passed={passed}
              score={score}
              key={id}
              questionsCount={questionsCount}
              description={description}
              timeInSeconds={timeInSeconds}
              quizId={id}
              signedTime={signedTime}
              signedStatus={signedStatus}
              progress={progress}
            />
          )
        )}
      </div>
    </div>
  )
}
