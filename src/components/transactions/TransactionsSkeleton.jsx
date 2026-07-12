import Card from '@components/common/Card'
import Skeleton from '@components/common/Skeleton'
import TableSkeleton from '@components/common/TableSkeleton'

function TransactionsSkeleton() {
  return (
    <div className="space-y-6">
      <Card padding="sm" className="px-3 py-3 sm:px-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1.8fr)_auto]">
          <div className="space-y-1 md:col-span-2 xl:col-span-1">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-8 w-full rounded-xl" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-3 w-10" />
            <div className="grid grid-cols-2 gap-2">
              <Skeleton className="h-8 rounded-xl" />
              <Skeleton className="h-8 rounded-xl" />
            </div>
          </div>
          <div className="space-y-1">
            <Skeleton className="h-3 w-20" />
            <div className="grid grid-cols-3 gap-2">
              <Skeleton className="h-8 rounded-xl" />
              <Skeleton className="h-8 rounded-xl" />
              <Skeleton className="h-8 rounded-xl" />
            </div>
          </div>
          <div className="space-y-1 md:col-span-2 xl:col-span-1 xl:justify-self-end">
            <Skeleton className="h-3 w-12 xl:ml-auto" />
            <div className="flex justify-end gap-2">
              <Skeleton className="h-8 w-24 rounded-xl" />
              <Skeleton className="h-8 w-28 rounded-xl" />
            </div>
          </div>
        </div>
      </Card>

      <TableSkeleton rows={8} columns={7} />
    </div>
  )
}

export default TransactionsSkeleton
