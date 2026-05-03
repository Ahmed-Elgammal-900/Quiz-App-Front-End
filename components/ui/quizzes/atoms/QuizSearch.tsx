"use client"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { Input } from "../../system/input"

export default function QuizzesSearch() {
  const router = useRouter()

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams()
    if (value) params.set("search", value)
    router.replace(`/dashboard/quizzes?${params.toString()}`)
  }, 300)

  return (
    <div className="relative mt-5">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search for quizzes"
        aria-label="Search quizzes"
        className="ps-9 lg:max-w-[70%]"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  )
}
