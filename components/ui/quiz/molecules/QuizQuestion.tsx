"use client"
import { cn } from "@/lib/utils"
import { Input } from "../../system/input"
import React from "react"
import { Label } from "../../system/label"
import { QuizStatus } from "@/constants/quiz-status.constant"
import type { QuizQuestionProps } from "@/types/quiz.types"

export default function QuizQuestion({
  question,
  selectedOption,
  onAnswer,
  quizStatus,
}: QuizQuestionProps) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-base font-semibold text-black md:text-lg dark:text-white">
        {question.text}
      </h2>
      <div className="flex flex-col gap-5">
        {question.answers.map((answer) => (
          <React.Fragment key={answer.id}>
            <Input
              type="radio"
              id={`answer-${answer.id}`}
              name="option"
              checked={selectedOption === answer.id}
              value={answer.text}
              onChange={() => onAnswer(answer.id)}
              disabled={quizStatus === QuizStatus.PASSED}
              className="sr-only"
            />
            <Label
              className={cn(
                "min-h-13 cursor-pointer rounded-lg px-4 py-2 text-sm/7",
                selectedOption === answer.id
                  ? "bg-primary text-white dark:text-black"
                  : "border-gray-300 bg-card text-black dark:text-white",
                quizStatus === QuizStatus.PASSED && "cursor-default"
              )}
              htmlFor={`answer-${answer.id}`}
            >
              {answer.text}
            </Label>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
