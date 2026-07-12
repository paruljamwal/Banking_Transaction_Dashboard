import { FiEye } from 'react-icons/fi'
import Card from '@components/common/Card'
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
    <Card padding="none" className="overflow-hidden">
      <Table scrollable maxHeight="max-h-[calc(100vh-12rem)]">
        <Table.Head sticky>
          <Table.Row>
            <Table.HeaderCell>Transaction ID</Table.HeaderCell>
            <Table.HeaderCell>Customer Name</Table.HeaderCell>
            <Table.HeaderCell className="hidden sm:table-cell">
              Account Number
            </Table.HeaderCell>
            <Table.HeaderCell>Transaction Type</Table.HeaderCell>
            <Table.HeaderCell className="hidden md:table-cell">
              Payment Method
            </Table.HeaderCell>
            <Table.HeaderCell align="right">Amount</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell className="hidden lg:table-cell">Date</Table.HeaderCell>
            <Table.HeaderCell align="center">Action</Table.HeaderCell>
          </Table.Row>
        </Table.Head>

        <Table.Body>
          {transactions.length === 0 ? (
            <Table.Empty colSpan={9} message="No transactions found" />
          ) : (
            transactions.map((txn, index) => (
              <Table.Row
                key={txn.id}
                className={cn(
                  index % 2 === 1 && 'bg-bg',
                  'hover:bg-primary-50/40',
                )}
              >
                <Table.Cell>
                  <span className="whitespace-nowrap font-medium text-text">
                    {txn.transactionId}
                  </span>
                </Table.Cell>

                <Table.Cell>
                  <span className="font-medium text-text">{txn.customerName}</span>
                </Table.Cell>

                <Table.Cell className="hidden sm:table-cell">
                  <span className="font-mono text-xs text-text-secondary">
                    {txn.accountNumber}
                  </span>
                </Table.Cell>

                <Table.Cell>
                  <Badge variant="primary" size="sm">
                    {TRANSACTION_TYPE_LABELS[txn.transactionType]}
                  </Badge>
                </Table.Cell>

                <Table.Cell className="hidden md:table-cell">
                  <span className="text-text-secondary">{txn.paymentMethod}</span>
                </Table.Cell>

                <Table.Cell align="right">
                  <span
                    className={cn(
                      'whitespace-nowrap font-semibold',
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
                  >
                    {STATUS_LABELS[txn.status]}
                  </Badge>
                </Table.Cell>

                <Table.Cell className="hidden lg:table-cell">
                  <span className="whitespace-nowrap text-text-secondary">
                    {formatDate(txn.date)}
                  </span>
                </Table.Cell>

                <Table.Cell align="center">
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label={`View details for ${txn.transactionId}`}
                    leftIcon={<FiEye className="h-4 w-4" />}
                  >
                    <span className="hidden xl:inline">View Details</span>
                    <span className="xl:hidden">View</span>
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
