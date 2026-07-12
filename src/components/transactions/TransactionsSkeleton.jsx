import Card from '@components/common/Card'
import Skeleton from '@components/common/Skeleton'
import TableSkeleton from '@components/common/TableSkeleton'

function TransactionsSkeleton() {
  return (
    <div className="space-y-6">
      <Card padding="md">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <Skeleton className="h-10 w-full max-w-md rounded-2xl" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-2xl" />
            ))}
          </div>
        </div>
      </Card>

      <Card padding="md" className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-2xl" />
          ))}
        </div>
      </Card>

      <TableSkeleton rows={8} columns={7} />
    </div>
  )
}

export default TransactionsSkeleton
