import Card from '@components/common/Card'
import Skeleton from '@components/common/Skeleton'

function StatsCardSkeleton() {
  return (
    <Card padding="sm" className="flex h-full flex-col px-4 py-4 sm:px-5">
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-9 w-9 rounded-lg" />
      </div>
      <Skeleton className="mt-3 h-8 w-24" />
      <Skeleton className="mt-2.5 h-5 w-28 rounded-md" />
      <Skeleton className="mt-auto pt-3 h-3 w-full" />
    </Card>
  )
}

function StatsGridSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <StatsCardSkeleton key={index} />
      ))}
    </div>
  )
}

export default StatsGridSkeleton
