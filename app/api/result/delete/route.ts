import { deleteUserAnswers } from "@/services/Quizzes.service"

export async function POST(req: Request) {
  try {
    const { quizId } = await req.json()
    if (!quizId || typeof quizId !== "string") {
      return Response.json(
        { success: false, message: "quizId is required" },
        { status: 400 }
      )
    }
    await deleteUserAnswers(quizId)
    return Response.json({ success: true })
  } catch (error) {
    console.error("Failed to delete user answers", error)
    return Response.json(
      { success: false, message: "Failed to delete user answers" },
      { status: 500 }
    )
  }
}
