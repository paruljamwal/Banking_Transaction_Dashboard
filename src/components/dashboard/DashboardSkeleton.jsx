import Skeleton from '@components/common/Skeleton'
import StatsGridSkeleton from '@components/common/StatsGridSkeleton'
import TableSkeleton from '@components/common/TableSkeleton'
import Card from '@components/common/Card'

function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12">
        <Card padding="lg" className="space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-9 w-72" />
          <Skeleton className="h-4 w-56" />
        </Card>
      </div>
      <div className="col-span-12">
        <StatsGridSkeleton />
      </div>
      <div className="col-span-12 xl:col-span-8">
        <Card padding="md" className="space-y-4">
          <Skeleton className="h-6 w-40" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-2xl" />
            ))}
          </div>
        </Card>
      </div>
      <div className="col-span-12 xl:col-span-4">
        <Card padding="md" className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-2xl" />
          ))}
        </Card>
      </div>
      <div className="col-span-12">
        <TableSkeleton rows={5} columns={5} />
      </div>
    </div>
  )
}

export default DashboardSkeleton
