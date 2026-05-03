"use client"
import { Button } from "../../system/button"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { ArrowBigLeft, ArrowBigRight } from "lucide-react"

export default function Pagination({ totalPages }: { totalPages: number }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const parsedPage = Number.parseInt(searchParams.get("page") ?? "1", 10)
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1

  const goToPage = (newPage: number) => {
    const safePage = Math.min(totalPages, Math.max(1, newPage))
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(safePage))
    router.replace(`?${params.toString()}`)
  }
  return (
    <div className="flex items-center justify-center gap-x-2">
      <Button
        variant="outline"
        size="icon"
        aria-label="Go to previous page"
        disabled={page <= 1}
        onClick={() => goToPage(page - 1)}
      >
        <ArrowBigLeft className="size-4" />
      </Button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const pageNumber = i + 1
        const isActive = pageNumber === page

        const showPage =
          pageNumber === 1 ||
          pageNumber === totalPages ||
          Math.abs(pageNumber - page) <= 1

        if (!showPage) {
          if (pageNumber === 2 || pageNumber === totalPages - 1) {
            return (
              <span key={pageNumber} className="text-muted-foreground">
                ...
              </span>
            )
          }
          return null
        }

        return (
          <Button
            key={pageNumber}
            variant={isActive ? "default" : "outline"}
            size="icon"
            className={cn(isActive && "pointer-events-none")}
            onClick={() => goToPage(pageNumber)}
          >
            {pageNumber}
          </Button>
        )
      })}

      <Button
        variant="outline"
        size="icon"
        aria-label="Go to next page"
        disabled={page >= totalPages}
        onClick={() => goToPage(page + 1)}
      >
        <ArrowBigRight className="size-4" />
      </Button>
    </div>
  )
}
