import { deleteUserAnswers } from "@/services/Quizzes.service"

export async function DELETE(req: Request) {
  const { quizId } = await req.json()

  await deleteUserAnswers(quizId)

  return Response.json({ success: true })
}
