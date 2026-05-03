import { getActivities } from "@/services/dashboard.service"
import ActivityCard from "../molecule/ActivityCard"
import { ScrollArea } from "../../system/scroll-area"
import { signTime } from "@/lib/server/time-signing"
import { signStatus } from "@/lib/server/sign-status"
import { QuizStatus } from "@/constants/quiz-status.constant"

export default async function RecentActivity() {
  const activities = await getActivities()
  if (!activities) return null
  const signedActivities = activities.map((activity) => ({
    ...activity,
    signedTime: signTime(
      activity.remainingTimeSeconds || activity.quiz.timeInSeconds
    ),
    signedStatus: activity.status
      ? signStatus(activity.passed ? QuizStatus.PASSED : activity.status)
      : "",
  }))
  return (
    <div className="w-full pb-7 lg:mt-5 lg:w-[60%] lg:pb-5">
      <h3 className="mb-5 text-lg font-bold lg:mb-3">Recent Activities</h3>
      <ScrollArea
        className={
          signedActivities.length > 3 ? "h-80 lg:h-80" : "h-60 lg:h-80"
        }
      >
        <div className="flex h-full flex-col items-center justify-center gap-y-5 lg:pe-3">
          {signedActivities.length === 0 ? (
            <div className="flex h-60 items-center justify-center lg:h-80">
              <p className="text-center text-muted-foreground">
                No Recent Activity
              </p>
            </div>
          ) : (
            signedActivities.map(
              ({
                id,
                quiz: {
                  id: quizId,
                  title,
                  description,
                  timeInSeconds,
                  questionsCount,
                },
                attemptAt,
                status,
                passed,
                remainingTimeSeconds,
                signedTime,
                signedStatus,
                progress,
              }) => (
                <ActivityCard
                  key={id}
                  title={title}
                  attemptAt={attemptAt}
                  status={status}
                  passed={passed}
                  quizId={quizId}
                  description={description}
                  timeInSeconds={remainingTimeSeconds || timeInSeconds}
                  questionsCount={questionsCount}
                  signedTime={signedTime}
                  signedStatus={signedStatus}
                  progress={progress}
                />
              )
            )
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
