import { getActivities } from "@/services/dashboard.service"
import ActivityCard from "../molecule/ActivityCard"
import { ScrollArea } from "../../system/scroll-area"
import { ActivityCardData } from "@/types/dashboard.types"

export default async function RecentActivity() {
  const activities = await getActivities()

  return (
    <div className="w-full pb-7 lg:mt-5 lg:w-[60%] lg:pb-5">
      <h3 className="mb-5 text-lg font-bold lg:mb-3">Recent Activities</h3>
      <ScrollArea
        className={activities.length > 3 ? "h-80 lg:h-80" : "h-60 lg:h-80"}
      >
        <div className="flex h-full flex-col items-center justify-center gap-y-5 lg:pe-3">
          {activities.length === 0 ? (
            <div className="flex h-60 items-center justify-center lg:h-80">
              <p className="text-center text-muted-foreground">
                No Recent Activity
              </p>
            </div>
          ) : (
            activities.map(
              ({
                id,
                quiz: { title },
                attemptAt,
                score,
                status,
                passed,
              }: ActivityCardData) => (
                <ActivityCard
                  key={id}
                  title={title}
                  attemptAt={attemptAt}
                  score={score}
                  status={status}
                  passed={passed}
                />
              )
            )
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
