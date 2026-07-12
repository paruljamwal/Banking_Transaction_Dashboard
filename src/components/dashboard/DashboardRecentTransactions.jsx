import Card from '@components/common/Card'
import Badge from '@components/common/Badge'
import Table from '@components/common/Table'
import { TRANSACTION_TYPE_LABELS } from '@constants/transactionTypes'
import { STATUS_LABELS, STATUS_VARIANTS } from '@constants/status'
import { formatCurrency } from '@utils/formatCurrency'
import { formatDate } from '@utils/formatDate'

function DashboardRecentTransactions({ transactions }) {
  return (
    <Card padding="none" className="overflow-hidden">
      <div className="border-b border-border px-6 py-4">
        <h3 className="text-base font-semibold text-text">Recent Transactions</h3>
        <p className="mt-0.5 text-sm text-text-secondary">
          Latest 10 transactions across all accounts
        </p>
      </div>

      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Transaction ID</Table.HeaderCell>
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell align="right">Amount</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {transactions.map((txn) => (
            <Table.Row key={txn.id}>
              <Table.Cell>
                <span className="font-medium text-text">{txn.transactionId}</span>
              </Table.Cell>
              <Table.Cell>
                <div>
                  <p className="font-medium text-text">{txn.customerName}</p>
                  <p className="text-xs text-muted">{txn.bankName}</p>
                </div>
              </Table.Cell>
              <Table.Cell>
                <Badge variant="primary" size="sm">
                  {TRANSACTION_TYPE_LABELS[txn.transactionType]}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <Badge variant={STATUS_VARIANTS[txn.status] || 'default'} size="sm" dot>
                  {STATUS_LABELS[txn.status]}
                </Badge>
              </Table.Cell>
              <Table.Cell align="right">
                <span className="font-semibold text-text">
                  {formatCurrency(txn.amount)}
                </span>
              </Table.Cell>
              <Table.Cell>
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
