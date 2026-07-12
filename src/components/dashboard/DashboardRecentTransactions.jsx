import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { FiArrowRight, FiEye, FiInbox } from 'react-icons/fi'
import Card from '@components/common/Card'
import Badge from '@components/common/Badge'
import Button from '@components/common/Button'
import Avatar from '@components/common/Avatar'
import EmptyState from '@components/common/EmptyState'
import TableSkeleton from '@components/common/TableSkeleton'
import { ROUTES } from '@constants/routes'
import { STATUS_LABELS, STATUS_VARIANTS } from '@constants/status'
import { formatCurrency } from '@utils/formatCurrency'
import { getAmountColorClass } from '@utils/transactionDisplay'
import { cn } from '@utils/cn'

function DashboardRecentTransactions({
  transactions,
  loading = false,
  onViewDetails,
}) {
  if (loading) {
    return <TableSkeleton rows={5} columns={5} />
  }

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-text">
            Recent Transactions
          </h3>
          <p className="mt-1 text-sm text-text-secondary">
            Latest five transactions across all accounts
          </p>
        </div>
      </div>

      {transactions.length === 0 ? (
        <EmptyState
          variant="empty"
          size="md"
          icon={<FiInbox className="h-6 w-6" />}
          title="No Recent Transactions"
          description="Transactions will appear here once activity is recorded."
          action={
            <Link to={ROUTES.TRANSACTIONS}>
              <Button variant="primary">View All Transactions</Button>
            </Link>
          }
        />
      ) : (
        <>
          <div className="divide-y divide-border">
            {transactions.map((txn) => (
              <div
                key={txn.id}
                className={cn(
                  'flex flex-col gap-3 px-6 py-4 transition-all duration-200 sm:flex-row sm:items-center sm:justify-between',
                  'hover:bg-primary-50/30',
                )}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar name={txn.customerName} size="md" />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-text">
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
                      'text-base font-bold',
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
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<FiEye className="h-4 w-4" />}
                    onClick={() => onViewDetails?.(txn)}
                    className="rounded-xl"
                  >
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border bg-bg/40 px-6 py-4">
            <Link to={ROUTES.TRANSACTIONS}>
              <Button
                variant="outline"
                fullWidth
                rightIcon={<FiArrowRight className="h-4 w-4" />}
                className="rounded-2xl"
              >
                View All Transactions
              </Button>
            </Link>
          </div>
        </>
      )}
    </Card>
  )
}

export default DashboardRecentTransactions
