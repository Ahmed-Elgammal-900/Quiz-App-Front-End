"use client"
import { useEffect, useRef, useState } from "react"
import QuizQuestion from "../molecules/QuizQuestion"
import QuizTimer from "../atoms/QuizTimer"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import {
  insertProgressAction,
  pauseQuizAction,
  startQuizAction,
} from "@/actions/quiz.action"
import QuestionMap from "../molecules/QuizMapQuestions"
import PauseModal from "../molecules/PauseModal"
import CompleteModal from "../molecules/CompleteModal"
import QuestionSkeleton from "../molecules/QuestionSkeleton"
import { QuizStatus } from "@/constants/quiz-status.constant"
import ExitModal from "../molecules/ExitModal"
import type { AnswerSchema, QuizClientProps } from "@/types/quiz.types"
import BeforeReadyLoadingTemplate from "../template/BeforeReadyLoadingTemplate"
import CounterPage from "../template/CounterPage"
import ReadyUserTemplate from "../template/ReadyUserTemplate"
import TimeoutModal from "../molecules/TimeoutModal"

export default function QuizClient({
  time,
  status,
  quizDetails,
  quizProgress,
  questionsIds,
}: QuizClientProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [quizStatus, setQuizStatus] = useState<string>("")
  const [readyCounter, setReadyCounter] = useState<number>(1)
  const [answers, setAnswers] = useState<AnswerSchema[]>([])
  const remainingTimeRef = useRef<{ getRemaining: () => number }>(null)
  const [isReady, setIsReady] = useState<boolean>(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { slug } = useParams()
  const [userReady, setUserReady] = useState<boolean>(false)
  const [isTimeout, setIsTimeout] = useState<boolean>(false)
  const [timerPaused, setTimerPaused] = useState(false)
  const answersRef = useRef(answers)
  const quizStatusRef = useRef(quizStatus)

  useEffect(() => {
    return () => {
      sessionStorage.removeItem(`quiz-status-${slug}`)
      sessionStorage.removeItem(`quiz-time-${slug}`)
    }
  }, [slug])

  useEffect(() => {
    answersRef.current = answers
  }, [answers])

  useEffect(() => {
    quizStatusRef.current = quizStatus
  }, [quizStatus])

  useEffect(() => {
    if (!userReady) return

    const handleBeforeUnload = () => {
      if (quizStatusRef.current === QuizStatus.PASSED) return

      const remainingTimeSeconds = remainingTimeRef.current?.getRemaining() ?? 0
      const lastAnswer = answersRef.current[answersRef.current.length - 1]
      const pausedAtQuestionIndex = lastAnswer?.questionIndex ?? 0

      navigator.sendBeacon(
        `/api/quiz/pause`,
        new Blob(
          [
            JSON.stringify({
              quizId: slug,
              pausedAtQuestionIndex,
              remainingTimeSeconds,
            }),
          ],
          { type: "application/json" }
        )
      )
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [slug, userReady])

  useEffect(() => {
    if (!userReady || quizStatus === QuizStatus.PASSED) return
    let cancelled = false
    const startQuiz = async () => {
      if (cancelled) return
      try {
        await startQuizAction(slug as string)
      } catch (error) {
        console.error("can't start Quiz", error)
      }
    }

    startQuiz()

    return () => {
      cancelled = true
    }
  }, [userReady, quizStatus, slug])

  useEffect(() => {
    let cancelled = false
    const init = async () => {
      try {
        if (cancelled) return

        if (time) {
          sessionStorage.setItem(`quiz-time-${slug}`, String(time))
        }

        if (status) {
          sessionStorage.setItem(`quiz-status-${slug}`, status)
          setQuizStatus(status)
        } else {
          const status = sessionStorage.getItem(`quiz-status-${slug}`)
          if (status) {
            setQuizStatus(status)
          }
        }

        if (quizProgress) {
          setAnswers(quizProgress.answers)
          setCurrentIndex(quizProgress.pausedAt)
        }
        const params = new URLSearchParams(searchParams.toString())
        params.delete("status")
        params.delete("time")
        params.set("page", String(quizProgress?.currentPage ?? 1))
        params.set("limit", "10")
        router.replace(`?${params.toString()}`)
      } catch (error) {
        console.error("Failed to start quiz:", error)
      } finally {
        if (!cancelled) setIsReady(true)
      }
    }

    init()

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (userReady !== true || quizStatus === QuizStatus.PASSED) return

    const counting = new Audio("/sounds/counting.mp3")
    counting.play().catch(console.error)
  }, [userReady, quizStatus])

  useEffect(() => {
    if (readyCounter >= 5 || !userReady || quizStatus === QuizStatus.PASSED)
      return

    const interval = setInterval(() => {
      setReadyCounter((prev) => {
        if (prev >= 5) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [readyCounter, userReady, quizStatus])

  const goToNext = async () => {
    if (quizDetails?.pagination.total === currentIndex + 1) return

    const nextIndex = currentIndex + 1
    const limit = Number(searchParams.get("limit")) || 10

    if (nextIndex % limit === 0) {
      const nextPage = Math.floor(nextIndex / limit) + 1
      const params = new URLSearchParams(searchParams.toString())
      params.set("page", String(nextPage))
      router.replace(`?${params.toString()}`)
    }

    setCurrentIndex(nextIndex)
  }

  const onPause = async () => {
    const remainingTime = remainingTimeRef.current?.getRemaining()
    const questionIndex = answers[answers.length - 1]?.questionIndex ?? 0
    if (remainingTime === 0) setIsTimeout(true)
    try {
      await pauseQuizAction(
        slug as string,
        questionIndex ?? 0,
        remainingTime ?? 0
      )
      router.push("/dashboard")
    } catch (error) {
      console.error("Failed to pause quiz:", error)
    }
  }

  const onAnswer = async (optionId: string) => {
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionId !== currentQuestion.id)
      return [
        ...filtered,
        {
          questionId: currentQuestion.id,
          selectedAnswerId: optionId,
          questionIndex: currentIndex,
        },
      ]
    })

    const isLastQuestionNotAnswered =
      answers.length + 1 === quizDetails?.pagination.total
    try {
      if (isLastQuestionNotAnswered) {
        const remainingTime = remainingTimeRef.current?.getRemaining()
        await insertProgressAction(
          typeof slug === "string" ? slug : "",
          currentQuestion.id,
          optionId,
          remainingTime
        )
      } else {
        await insertProgressAction(
          typeof slug === "string" ? slug : "",
          currentQuestion.id,
          optionId
        )
      }
    } catch (error) {
      console.error("Failed to save Answer", error)
    }
  }

  const onNavigate = (questionIndex: number) => {
    const limit = Number(searchParams.get("limit")) || 10
    const currentPage = Number(searchParams.get("page")) || 1
    const targetPage = Math.floor(questionIndex / limit) + 1

    if (targetPage !== currentPage) {
      const params = new URLSearchParams(searchParams.toString())
      params.set("page", String(targetPage))
      router.replace(`?${params.toString()}`)
    }

    setCurrentIndex(questionIndex)
  }

  const onExit = () => {
    router.push("/dashboard")
  }

  const onComplete = () => {
    router.push(`/result/${slug}`)
  }

  if (!isReady) return <BeforeReadyLoadingTemplate />

  if (!userReady && quizStatus !== QuizStatus.PASSED)
    return <ReadyUserTemplate setUserReady={setUserReady} />

  if (readyCounter !== 5 && quizStatus !== QuizStatus.PASSED)
    return <CounterPage counter={readyCounter} />

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const offset = (page - 1) * limit
  const currentQuestion = quizDetails!.questions[currentIndex - offset]
  const isLast = currentIndex === quizDetails!.pagination.total - 1
  const isFinished =
    answers.length === quizDetails?.pagination.total &&
    quizStatus !== QuizStatus.PASSED

  const buttonText =
    !answers.some(({ questionId }) => questionId === currentQuestion?.id) &&
    answers.length === quizDetails!.pagination.total - 1
      ? "Your Last Question"
      : isLast
        ? "End of Questions"
        : "Next"

  return (
    <div className="mx-auto mt-6 max-w-2xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-base font-bold md:text-lg lg:text-xl">
          {quizDetails?.quizTitle}
        </h1>
        {!(quizStatus === QuizStatus.PASSED) ? (
          <QuizTimer
            ref={remainingTimeRef}
            timeInSeconds={time ?? 0}
            onFinish={onPause}
            storageKey={`quiz-time-${slug}`}
            timerPaused={timerPaused}
            timeout={isTimeout}
            isFinished={isFinished}
          />
        ) : null}
      </div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Question {currentIndex + 1} of {quizDetails?.pagination.total}
        </p>
        {quizStatus === QuizStatus.PASSED ? (
          <ExitModal onExit={onExit} />
        ) : (
          <PauseModal setTimerPaused={setTimerPaused} onPause={onPause} />
        )}
      </div>

      <QuestionMap
        answers={answers}
        currentIndex={currentIndex}
        onNavigate={onNavigate}
        questionsIds={questionsIds}
      />

      <CompleteModal isFinished={isFinished} onFinish={onComplete} />
      <TimeoutModal isFinished={isTimeout} onFinish={onComplete} />

      {currentQuestion ? (
        <QuizQuestion
          question={currentQuestion}
          selectedOption={
            answers.filter(
              ({ questionId }) => questionId === currentQuestion.id
            )[0]?.selectedAnswerId
          }
          onAnswer={onAnswer}
          quizStatus={quizStatus}
        />
      ) : (
        <QuestionSkeleton />
      )}

      <button
        type="button"
        onClick={goToNext}
        disabled={quizDetails?.pagination.total === currentIndex + 1}
        className="mt-8 w-full rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground hover:cursor-pointer disabled:cursor-not-allowed"
      >
        {buttonText}
      </button>
    </div>
  )
}
