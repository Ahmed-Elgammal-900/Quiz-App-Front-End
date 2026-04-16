import QuizCard from "../molecules/QuizCard"
import { getQuizzes } from "@/services/Quizzes.service"

export default async function QuizzesList({ search }: { search?: string }) {
  const quizzes = await getQuizzes()

  const filtered = search
    ? quizzes.filter((q) =>
        q.title.toLowerCase().includes(search.toLowerCase())
      )
    : quizzes
  if (filtered.length === 0) {
    return (
      <p className="mt-50 h-full text-center text-muted-foreground">
        No quizzes found for &quot;{search}&quot;
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
            />
          )
        )}
      </div>
    </div>
  )
}
