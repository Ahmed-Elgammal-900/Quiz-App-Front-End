import z from "zod"

const QuizSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string(),
  questionsCount: z.number().int().min(0),
  timeInSeconds: z.int(),
  score: z.int().nullable(),
  progress: z.int().nullable(),
  status: z.string().nullable(),
  passed: z.boolean().nullable(),
})

export const QuizzesSchema = z.array(QuizSchema)

const SafeAnswerSchema = z.object({
  id: z.uuid(),
  text: z.string(),
  questionId: z.uuid(),
})

const SafeQuestionSchema = z.object({
  id: z.uuid(),
  text: z.string(),
  quizId: z.uuid(),
  answers: z.array(SafeAnswerSchema),
})

const UserAnswerSchema = z.object({
  questionId: z.uuid(),
  selectedAnswerId: z.uuid(),
  questionIndex: z.number().int().min(0),
})

export const QuizUserProgressSchema = z.object({
  pausedAt: z.int(),
  answers: z.array(UserAnswerSchema),
  currentPage: z.number().int().positive(),
})

const PaginationSchema = z.object({
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  hasNext: z.boolean(),
})

export const GetQuizResponseSchema = z.object({
  quizTitle: z.string(),
  questions: z.array(SafeQuestionSchema),
  pagination: PaginationSchema,
})

export const resultSchema = z.object({
  quizTitle: z.string(),
  score: z.int(),
  status: z.string(),
  passed: z.boolean(),
  correctAnswers: z.int(),
  totalQuestions: z.int(),
  timeTaken: z.int(),
})
export const GetQuizResultSchema = GetQuizResponseSchema.nullable()

export const questionIdsSchema = z.array(z.uuid())

export type Result = z.infer<typeof resultSchema>
export type QuestionIds = z.infer<typeof questionIdsSchema>
export type QuizResponse = z.infer<typeof GetQuizResultSchema>
export type SafeQuestion = z.infer<typeof SafeQuestionSchema>
export type Answer = z.infer<typeof SafeAnswerSchema>
export type Pagination = z.infer<typeof PaginationSchema>
export type QuizProgress = z.infer<typeof QuizUserProgressSchema>
export type QuizzesResponse = z.infer<typeof QuizzesSchema>
