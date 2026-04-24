import { pauseQuiz } from '@/services/Quizzes.service';

export async function POST(req: Request) {
  const { quizId, pausedAtQuestionIndex, remainingTimeSeconds } = await req.json();
  
  await pauseQuiz(quizId, pausedAtQuestionIndex, remainingTimeSeconds);
  
  return Response.json({ success: true });
}