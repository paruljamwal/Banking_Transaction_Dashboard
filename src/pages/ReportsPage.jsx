import PageContainer from '@components/common/PageContainer'
import PageHeader from '@components/common/PageHeader'

function ReportsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Reports"
        description="Analytics and financial reporting."
      />
      <div className="rounded-xl border border-dashed border-border bg-surface p-8 text-center shadow-sm">
        <p className="text-sm font-medium text-text-secondary">
          Reports module coming soon
        </p>
        <p className="mt-2 text-xs text-muted">
          Charts and exportable reports will be implemented in a future sprint.
        </p>
      </div>
    </PageContainer>
  )
}

export default ReportsPage
