import z from "zod"

const LeaderboardEntrySchema = z.object({
  userId: z.uuid(),
  name: z.string(),
  totalScore: z.coerce.number(),
})

export const UserRankSchema = z.object({
  rank: z.number(),
  userId: z.uuid(),
  name: z.string(),
  totalScore: z.number(),
})

export const LeaderboardSchema = z.object({
  data: z.array(LeaderboardEntrySchema),
  meta: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
})

export const TopThreeSchema = z.array(LeaderboardEntrySchema)

export type UserRank = z.infer<typeof UserRankSchema>
export type Leaderboard = z.infer<typeof LeaderboardSchema>
export type LeaderboardEntry = z.infer<typeof LeaderboardEntrySchema>
