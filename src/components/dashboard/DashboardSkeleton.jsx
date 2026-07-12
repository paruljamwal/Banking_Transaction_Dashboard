import Skeleton from '@components/common/Skeleton'
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
        <TableSkeleton rows={5} columns={5} />
      </div>
    </div>
  )
}

export default DashboardSkeleton
