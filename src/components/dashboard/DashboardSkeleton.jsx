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

      <div className="col-span-12 grid gap-4 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <Card padding="sm" className="space-y-4 px-4 py-4 sm:px-5">
            <div className="space-y-1">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-44" />
            </div>
            <div className="divide-y divide-border rounded-xl border border-border">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3">
                  <Skeleton className="h-9 w-9 rounded-lg" />
                  <div className="flex flex-1 items-center justify-between gap-3">
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-32" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="xl:col-span-5">
          <Card padding="sm" className="space-y-4 px-4 py-4 sm:px-5">
            <div className="space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-40" />
            </div>
            <div className="divide-y divide-border rounded-xl border border-border">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3">
                  <Skeleton className="h-9 w-9 rounded-lg" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="col-span-12">
        <TableSkeleton rows={5} columns={5} />
      </div>
    </div>
  )
}

export default DashboardSkeleton
