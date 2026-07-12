import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import Card from '@components/common/Card'
import Badge from '@components/common/Badge'
import Button from '@components/common/Button'
import Table from '@components/common/Table'
import { ROUTES } from '@constants/routes'
import { TRANSACTION_TYPE_LABELS } from '@constants/transactionTypes'
import { STATUS_LABELS, STATUS_VARIANTS } from '@constants/status'
import { formatCurrency } from '@utils/formatCurrency'
import { formatDate } from '@utils/formatDate'
import { getAmountColorClass } from '@utils/transactionDisplay'
import { cn } from '@utils/cn'

function DashboardRecentTransactions({ transactions }) {
  return (
    <Card padding="none" className="overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h3 className="text-base font-semibold text-text">Recent Transactions</h3>
          <p className="mt-0.5 text-sm text-text-secondary">
            Latest 10 transactions across all accounts
          </p>
        </div>
        <Link to={ROUTES.TRANSACTIONS}>
          <Button
            variant="outline"
            size="sm"
            rightIcon={<FiArrowRight className="h-4 w-4" />}
          >
            View All Transactions
          </Button>
        </Link>
      </div>

      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell align="right">Amount</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell className="hidden sm:table-cell">Date</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {transactions.map((txn) => (
            <Table.Row key={txn.id}>
              <Table.Cell>
                <div className="min-w-[120px]">
                  <p className="font-medium text-text">{txn.customerName}</p>
                  <p className="text-xs text-muted">{txn.bankName}</p>
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
              <Table.Cell className="hidden sm:table-cell">
                <span className="text-text-secondary">{formatDate(txn.date)}</span>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Card>
  )
}

export default DashboardRecentTransactions
