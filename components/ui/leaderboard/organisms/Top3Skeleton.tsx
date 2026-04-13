import UserCharSkeleton from "../molecules/UserCharSkeleton"

export default function Top3Skeleton() {
  return (
    <div className="mt-15 flex items-end justify-center gap-x-5 md:px-20 lg:px-30">
      <UserCharSkeleton rank={2} />
      <UserCharSkeleton rank={1} />
      <UserCharSkeleton rank={3} />
    </div>
  )
}
