import { FiEye, FiSearch } from 'react-icons/fi'
import Card from '@components/common/Card'
import Table from '@components/common/Table'
import Badge from '@components/common/Badge'
import Button from '@components/common/Button'
import Avatar from '@components/common/Avatar'
import EmptyState from '@components/common/EmptyState'
import TableSkeleton from '@components/common/TableSkeleton'
import HighlightText from '@components/common/HighlightText'
import { TRANSACTION_TYPE_LABELS } from '@constants/transactionTypes'
import { STATUS_LABELS, STATUS_VARIANTS } from '@constants/status'
import { formatCurrency } from '@utils/formatCurrency'
import { formatDate } from '@utils/formatDate'
import { getAmountColorClass } from '@utils/transactionDisplay'
import { cn } from '@utils/cn'

function TransactionsTable({
  transactions,
  searchQuery = '',
  showNoResults = false,
  noResultsMessage,
  onViewDetails,
  onClearFilters,
  loading = false,
}) {
  if (loading) {
    return <TableSkeleton rows={8} columns={7} />
  }

  if (showNoResults) {
    return (
      <Card padding="none" className="overflow-hidden">
        <EmptyState
          variant="no-results"
          size="lg"
          icon={<FiSearch className="h-7 w-7" />}
          title="No Results Found"
          description={
            noResultsMessage ||
            `No transactions match "${searchQuery}". Try adjusting your search or filters.`
          }
          action={
            <Button
              variant="primary"
              className="rounded-2xl"
              onClick={onClearFilters}
            >
              Clear filters
            </Button>
          }
        />
      </Card>
    )
  }

  return (
    <Card padding="none" className="overflow-hidden">
      <Table
        scrollable
        bordered={false}
        maxHeight="max-h-[calc(100vh-13rem)] md:max-h-[calc(100vh-14rem)]"
        minWidth="min-w-[800px] lg:min-w-[1040px]"
      >
        <Table.Head sticky>
          <Table.Row>
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell className="hidden md:table-cell">
              Transaction ID
            </Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell className="hidden lg:table-cell">
              Payment
            </Table.HeaderCell>
            <Table.HeaderCell align="right">Amount</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell className="hidden sm:table-cell">Date</Table.HeaderCell>
            <Table.HeaderCell align="center">Action</Table.HeaderCell>
          </Table.Row>
        </Table.Head>

        <Table.Body>
          {transactions.length === 0 ? (
            <Table.Empty colSpan={8} message="No transactions found" />
          ) : (
            transactions.map((txn, index) => (
              <Table.Row
                key={txn.id}
                clickable
                onClick={() => onViewDetails?.(txn)}
                className={cn(
                  index % 2 === 1 && 'bg-bg/40',
                  'cursor-pointer hover:bg-primary-50/40 hover:shadow-sm',
                )}
              >
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <Avatar name={txn.customerName} size="sm" />
                    <div className="min-w-0">
                      <HighlightText
                        text={txn.customerName}
                        query={searchQuery}
                        className="block truncate font-semibold text-text"
                      />
                      <p className="truncate text-xs text-muted">
                        {txn.accountNumber}
                      </p>
                    </div>
                  </div>
                </Table.Cell>

                <Table.Cell className="hidden md:table-cell">
                  <HighlightText
                    text={txn.transactionId}
                    query={searchQuery}
                    className="font-mono text-xs font-medium text-text-secondary"
                  />
                </Table.Cell>

                <Table.Cell>
                  <span className="inline-flex rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700 ring-1 ring-primary-100">
                    {TRANSACTION_TYPE_LABELS[txn.transactionType]}
                  </span>
                </Table.Cell>

                <Table.Cell className="hidden lg:table-cell">
                  <HighlightText
                    text={txn.paymentMethod}
                    query={searchQuery}
                    className="text-sm text-text-secondary"
                  />
                </Table.Cell>

                <Table.Cell align="right">
                  <span
                    className={cn(
                      'whitespace-nowrap text-base font-bold',
                      getAmountColorClass(txn.transactionType, txn.status),
                    )}
                  >
                    {formatCurrency(txn.amount)}
                  </span>
                </Table.Cell>

                <Table.Cell>
                  <Badge
                    variant={STATUS_VARIANTS[txn.status] || 'default'}
                    size="sm"
                    dot
                    className="rounded-full"
                  >
                    {STATUS_LABELS[txn.status]}
                  </Badge>
                </Table.Cell>

                <Table.Cell className="hidden sm:table-cell">
                  <span className="whitespace-nowrap text-sm text-text-secondary">
                    {formatDate(txn.date)}
                  </span>
                </Table.Cell>

                <Table.Cell align="center">
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label={`View details for ${txn.transactionId}`}
                    leftIcon={<FiEye className="h-4 w-4" />}
                    onClick={(e) => {
                      e.stopPropagation()
                      onViewDetails?.(txn)
                    }}
                    className="rounded-xl"
                  >
                    View
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </Card>
  )
}

export default TransactionsTable
