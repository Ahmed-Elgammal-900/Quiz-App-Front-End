import BadgesHeader from "@/components/ui/badges/atoms/BadgesHeader"
import BadgesListSkeleton from "@/components/ui/badges/organisms/BadgeListSkeleton"
import BadgesList from "@/components/ui/badges/organisms/BadgesList"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "badges",
}

export default function Badges() {
  return (
    <section className="mt-5">
      <BadgesHeader />
      <Suspense fallback={<BadgesListSkeleton />}>
        <BadgesList />
      </Suspense>
    </section>
  )
}
