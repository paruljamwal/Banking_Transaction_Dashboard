import Card from '@components/common/Card'
import Skeleton from '@components/common/Skeleton'

function TableSkeletonRow({ columns = 5 }) {
  return (
    <tr className="border-b border-border last:border-0">
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index} className="px-4 py-3.5">
          <Skeleton className="h-4 w-full max-w-[120px]" />
        </td>
      ))}
    </tr>
  )
}

function TableSkeleton({
  rows = 6,
  columns = 5,
  showHeader = true,
  wrapped = true,
}) {
  const table = (
    <div className="overflow-x-auto overscroll-x-contain">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        {showHeader && (
          <thead className="border-b border-border bg-bg">
            <tr>
              {Array.from({ length: columns }).map((_, index) => (
                <th key={index} className="px-4 py-3">
                  <Skeleton className="h-3 w-16" />
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {Array.from({ length: rows }).map((_, index) => (
            <TableSkeletonRow key={index} columns={columns} />
          ))}
        </tbody>
      </table>
    </div>
  )

  if (!wrapped) return table

  return (
    <Card padding="none" className="overflow-hidden">
      {table}
    </Card>
  )
}

export default TableSkeleton
