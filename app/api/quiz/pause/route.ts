import { pauseQuiz } from "@/services/Quizzes.service"

export async function POST(req: Request) {
  try {
    const { quizId, pausedAtQuestionIndex, remainingTimeSeconds } =
      await req.json()

    if (
      typeof quizId !== "string" ||
      !Number.isFinite(pausedAtQuestionIndex) ||
      pausedAtQuestionIndex < 0 ||
      !Number.isFinite(remainingTimeSeconds) ||
      remainingTimeSeconds < 0
    ) {
      return Response.json(
        { success: false, message: "Invalid payload" },
        { status: 400 }
      )
    }

    await pauseQuiz(quizId, pausedAtQuestionIndex, remainingTimeSeconds)
    return Response.json({ success: true })
  } catch (error) {
    console.error("Failed to pause quiz", error)
    return Response.json(
      { success: false, message: "Failed to pause quiz" },
      { status: 500 }
    )
  }
}
