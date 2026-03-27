import { HelpCircleIcon } from "lucide-react"

export default function AuthHeader() {
  return (
    <div className="mt-[5vh] flex flex-col items-center justify-center text-center">
      <div className="flex h-17 w-17 flex-col items-center justify-center rounded-full bg-primary text-primary-foreground">
        <HelpCircleIcon size={30} />
      </div>
      <h1 className="mt-5 text-3xl font-bold text-primary">Quizzer</h1>
      <p className="mt-1.5 text-foreground">Precision Intelligence Learning</p>
    </div>
  )
}
