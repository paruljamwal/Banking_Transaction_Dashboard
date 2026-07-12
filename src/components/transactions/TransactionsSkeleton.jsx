import Card from '@components/common/Card'
import Skeleton from '@components/common/Skeleton'
import TableSkeleton from '@components/common/TableSkeleton'

function TransactionsSkeleton() {
  return (
    <div className="space-y-6">
      <Card padding="md">
        <div className="flex flex-wrap items-end gap-3">
          <Skeleton className="h-10 w-full max-w-sm flex-1 basis-full rounded-2xl sm:basis-[220px]" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-2xl sm:w-28" />
          ))}
          <div className="flex gap-2 sm:ml-auto">
            <Skeleton className="h-8 w-24 rounded-xl" />
            <Skeleton className="h-8 w-28 rounded-xl" />
          </div>
        </div>
      </Card>

      <TableSkeleton rows={8} columns={7} />
    </div>
  )
}

export default TransactionsSkeleton
