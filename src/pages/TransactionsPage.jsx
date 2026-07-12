import PageContainer from '@components/common/PageContainer'
import PageHeader from '@components/common/PageHeader'

function TransactionsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Transactions"
        description="View, filter, and manage banking transactions."
      />
      <div className="rounded-xl border border-dashed border-border bg-surface p-8 text-center shadow-sm">
        <p className="text-sm font-medium text-text-secondary">
          Transactions module coming soon
        </p>
        <p className="mt-2 text-xs text-muted">
          Transaction table, filters, and export features will be added next.
        </p>
      </div>
    </PageContainer>
  )
}

export default TransactionsPage
