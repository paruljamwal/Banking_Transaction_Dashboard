import Card from '@components/common/Card'
import Skeleton from '@components/common/Skeleton'

function StatsCardSkeleton() {
  return (
    <Card padding="md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-5 w-32 rounded-full" />
        </div>
        <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />
      </div>
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
