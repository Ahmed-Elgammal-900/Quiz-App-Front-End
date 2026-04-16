import z from "zod"

const QuizSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string(),
  questionsCount: z.number().int().min(0),
  timeInSeconds: z.int(),
  score: z.number().nullable(),
  status: z.string().nullable(),
  passed: z.boolean().nullable(),
})

export const QuizzesSchema = z.array(QuizSchema)

export type QuizzesResponse = z.infer<typeof QuizzesSchema>
