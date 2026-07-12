import { FiSettings } from 'react-icons/fi'
import PageContainer from '@components/common/PageContainer'
import PageHeader from '@components/common/PageHeader'
import Card from '@components/common/Card'
import EmptyState from '@components/common/EmptyState'

function SettingsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Settings"
        description="Configure application preferences and display options."
      />
      <Card padding="none" className="overflow-hidden">
        <EmptyState
          variant="empty"
          size="lg"
          icon={<FiSettings className="h-7 w-7" />}
          title="Settings Coming Soon"
          description="Theme, notifications, and profile settings will be available here."
        />
      </Card>
    </PageContainer>
  )
}

export default SettingsPage
