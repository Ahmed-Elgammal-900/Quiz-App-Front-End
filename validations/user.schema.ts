import z from "zod"

export const UserSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
  providers: z.array(z.string()),
})

export type User = z.infer<typeof UserSchema>
