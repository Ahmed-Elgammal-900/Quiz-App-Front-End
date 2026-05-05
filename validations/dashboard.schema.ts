import { badgesConfig, BadgeTitle } from "@/config/badges.config"
import { QuizStatus } from "@/constants/quiz-status.constant"
import z from "zod"

export const StatsSchema = z.object({
  totalQuizzes: z.int(),
  passedQuizzes: z.int(),
  averageScore: z.int(),
  totalScore: z.int(),
})

const BadgeTitleSchema = z.enum(
  Object.keys(badgesConfig) as [BadgeTitle, ...BadgeTitle[]]
)

export const BadgeSchema = z.object({
  quizId: z.string(),
  badgeTitle: BadgeTitleSchema,
})

const QuizSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  timeInSeconds: z.number(),
  questionsCount: z.number(),
})

export const ActivitySchema = z.array(
  z.object({
    id: z.string(),
    status: z.enum(Object.values(QuizStatus) as [QuizStatus, ...QuizStatus[]]),
    score: z.coerce
      .number()
      .transform(Math.round)
      .pipe(z.number().int())
      .nullable(),
    passed: z.boolean(),
    attemptAt: z.date().or(z.iso.datetime()),
    progress: z.int().nullable(),
    remainingTimeSeconds: z.number().nullable(),
    quiz: QuizSchema,
  })
)

export type Stats = z.infer<typeof StatsSchema>
export type Badge = z.infer<typeof BadgeSchema>
export type Activity = z.infer<typeof ActivitySchema>
