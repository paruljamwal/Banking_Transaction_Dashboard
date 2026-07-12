import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { FiArrowRight, FiInbox } from 'react-icons/fi'
import Card from '@components/common/Card'
import Badge from '@components/common/Badge'
import Avatar from '@components/common/Avatar'
import EmptyState from '@components/common/EmptyState'
import TableSkeleton from '@components/common/TableSkeleton'
import { ROUTES } from '@constants/routes'
import { STATUS_LABELS, STATUS_VARIANTS } from '@constants/status'
import { formatCurrency } from '@utils/formatCurrency'
import { getAmountColorClass } from '@utils/transactionDisplay'
import { cn } from '@utils/cn'

function DashboardRecentTransactions({ transactions, loading = false }) {
  if (loading) {
    return <TableSkeleton rows={5} columns={5} />
  }

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold tracking-tight text-text">
            Recent Transactions
          </h3>
          <p className="mt-0.5 text-xs text-muted">
            Latest five transactions across all accounts
          </p>
        </div>

        {transactions.length > 0 && (
          <Link
            to={ROUTES.TRANSACTIONS}
            className={cn(
              'inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1',
              'text-xs font-medium text-primary-600 transition-colors',
              'hover:bg-primary-50 hover:text-primary-700',
            )}
          >
            View all
            <FiArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        )}
      </div>

      {transactions.length === 0 ? (
        <EmptyState
          variant="empty"
          size="md"
          icon={<FiInbox className="h-6 w-6" />}
          title="No Recent Transactions"
          description="Transactions will appear here once activity is recorded."
        />
      ) : (
        <div className="divide-y divide-border">
          {transactions.map((txn) => (
            <div
              key={txn.id}
              className="flex flex-col gap-3 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Avatar name={txn.customerName} size="md" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-text">
                    {txn.customerName}
                  </p>
                  <p className="text-xs text-muted">
                    {format(parseISO(txn.date), 'hh:mm a')} · {txn.bankName}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <span
                  className={cn(
                    'text-sm font-semibold tabular-nums',
                    getAmountColorClass(txn.transactionType, txn.status),
                  )}
                >
                  {formatCurrency(txn.amount)}
                </span>
                <Badge
                  variant={STATUS_VARIANTS[txn.status] || 'default'}
                  size="sm"
                  dot
                >
                  {STATUS_LABELS[txn.status]}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

export default DashboardRecentTransactions
