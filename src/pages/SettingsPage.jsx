import PageContainer from '@components/common/PageContainer'
import PageHeader from '@components/common/PageHeader'

function SettingsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Settings"
        description="Configure application preferences and display options."
      />
      <div className="rounded-xl border border-dashed border-border bg-surface p-8 text-center shadow-sm">
        <p className="text-sm font-medium text-text-secondary">
          Settings module coming soon
        </p>
        <p className="mt-2 text-xs text-muted">
          Theme, notifications, and profile settings will be available here.
        </p>
      </div>
    </PageContainer>
  )
}

export default SettingsPage
