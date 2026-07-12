import PageContainer from '@components/common/PageContainer'
import PageHeader from '@components/common/PageHeader'
import { TransactionsTable } from '@components/transactions'
import { transactions } from '@data/transactions'

function TransactionsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Transactions"
        description={`${transactions.length} transactions across all accounts`}
      />

      <TransactionsTable transactions={transactions} />
    </PageContainer>
  )
}

export default TransactionsPage
