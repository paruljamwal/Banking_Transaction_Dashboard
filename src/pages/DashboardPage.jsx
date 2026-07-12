import PageContainer from '@components/common/PageContainer'
import PageHeader from '@components/common/PageHeader'

function PlaceholderCard({ children }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-surface p-8 text-center shadow-sm">
      {children}
    </div>
  )
}

function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="Overview and summary metrics will appear here."
      />
      <PlaceholderCard>
        <p className="text-sm font-medium text-text-secondary">
          Dashboard module coming soon
        </p>
        <p className="mt-2 text-xs text-muted">
          Charts, KPIs, and transaction summaries will be built in the next phase.
        </p>
      </PlaceholderCard>
    </PageContainer>
  )
}

export default DashboardPage
