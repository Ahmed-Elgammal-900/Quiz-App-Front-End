import QuizzesSearch from "@/components/ui/quizzes/atoms/QuizSearch"
import QuizzesHeader from "@/components/ui/quizzes/atoms/QuizzesHeader"
import QuizzesList from "@/components/ui/quizzes/organisms/QuizzesList"
import QuizzesListSkeleton from "@/components/ui/quizzes/organisms/QuizzesListSkeleton"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "quizzes",
}

export default async function Quizzes({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const { search } = await searchParams
  return (
    <div className="mt-3">
      <QuizzesHeader />
      <QuizzesSearch />
      <Suspense fallback={<QuizzesListSkeleton />} key={search}>
        <QuizzesList search={search} />
      </Suspense>
    </div>
  )
}
