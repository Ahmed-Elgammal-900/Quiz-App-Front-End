import { HelpCircleIcon } from "lucide-react"
import { Button } from "../../system/button"

export default function ReadyUserTemplate({
  setUserReady,
}: {
  setUserReady: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <div className="fixed flex h-screen w-screen justify-center pt-25">
      <div className="flex flex-col items-center gap-15">
        <div className="flex flex-col items-center gap-30">
          <div className="flex items-center justify-center gap-3 text-center">
            <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-primary text-primary-foreground">
              <HelpCircleIcon size={30} />
            </div>
            <h1 className="text-3xl font-bold text-primary">Quizzer</h1>
          </div>
          <p className="text-center text-xl">Are You Ready!</p>
        </div>

        <Button onClick={() => setUserReady(true)} className="h-12 w-full hover:cursor-pointer">
          Start Quiz!
        </Button>
      </div>
    </div>
  )
}
