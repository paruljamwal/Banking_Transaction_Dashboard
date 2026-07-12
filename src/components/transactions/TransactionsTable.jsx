import { FiEye } from 'react-icons/fi'
import Table from '@components/common/Table'
import Badge from '@components/common/Badge'
import Button from '@components/common/Button'
import { TRANSACTION_TYPE_LABELS } from '@constants/transactionTypes'
import { STATUS_LABELS, STATUS_VARIANTS } from '@constants/status'
import { formatCurrency } from '@utils/formatCurrency'
import { formatDate } from '@utils/formatDate'
import { getAmountColorClass } from '@utils/transactionDisplay'
import { cn } from '@utils/cn'

function TransactionsTable({ transactions }) {
  return (
    <Table scrollable>
      <Table.Head sticky>
        <Table.Row>
          <Table.HeaderCell>Transaction ID</Table.HeaderCell>
          <Table.HeaderCell>Customer</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell align="right">Amount</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell className="hidden md:table-cell">
            Payment Method
          </Table.HeaderCell>
          <Table.HeaderCell className="hidden sm:table-cell">Date</Table.HeaderCell>
          <Table.HeaderCell align="center">Action</Table.HeaderCell>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {transactions.length === 0 ? (
          <Table.Empty colSpan={8} message="No transactions found" />
        ) : (
          transactions.map((txn) => (
            <Table.Row key={txn.id}>
              <Table.Cell>
                <span className="font-medium text-text">{txn.transactionId}</span>
              </Table.Cell>

              <Table.Cell>
                <div className="min-w-[140px]">
                  <p className="font-medium text-text">{txn.customerName}</p>
                  <p className="text-xs text-muted">{txn.accountNumber}</p>
                </div>
              </Table.Cell>

              <Table.Cell>
                <Badge variant="primary" size="sm">
                  {TRANSACTION_TYPE_LABELS[txn.transactionType]}
                </Badge>
              </Table.Cell>

              <Table.Cell align="right">
                <span
                  className={cn(
                    'font-semibold',
                    getAmountColorClass(txn.transactionType),
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
                >
                  {STATUS_LABELS[txn.status]}
                </Badge>
              </Table.Cell>

              <Table.Cell className="hidden md:table-cell">
                <span className="text-text-secondary">{txn.paymentMethod}</span>
              </Table.Cell>

              <Table.Cell className="hidden sm:table-cell">
                <span className="text-text-secondary">{formatDate(txn.date)}</span>
              </Table.Cell>

              <Table.Cell align="center">
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={`View ${txn.transactionId}`}
                  leftIcon={<FiEye className="h-4 w-4" />}
                >
                  <span className="hidden lg:inline">View</span>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table>
  )
}

export default TransactionsTable
