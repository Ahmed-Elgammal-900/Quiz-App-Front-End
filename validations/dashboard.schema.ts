import { QuizStatus } from "@/constants/quiz-status.constant"
import z from "zod"

export const StatsSchema = z.object({
  totalQuizzes: z.int(),
  passedQuizzes: z.int(),
  averageScore: z.int(),
  totalScore: z.int(),
})

export const BadgeSchema = z.object({ quizId: z.string(), badgeTitle: z.string() })

export const ActivitySchema = z.object({
  id: z.string(),
  attemptAt: z.union([z.date(), z.string()]),
  score: z.number(),
  status: z.enum(Object.values(QuizStatus) as [QuizStatus, ...QuizStatus[]]),
  passed: z.boolean(),
  quiz: z.object({
    title: z.string(),
  }),
})

export type Stats = z.infer<typeof StatsSchema>
export type Badge = z.infer<typeof BadgeSchema>
export type Activity = z.infer<typeof ActivitySchema>
