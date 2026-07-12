import { FiBarChart2 } from 'react-icons/fi'
import PageContainer from '@components/common/PageContainer'
import PageHeader from '@components/common/PageHeader'
import Card from '@components/common/Card'
import EmptyState from '@components/common/EmptyState'

function ReportsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Reports"
        description="Analytics and financial reporting."
      />
      <Card padding="none" className="overflow-hidden">
        <EmptyState
          variant="empty"
          size="lg"
          icon={<FiBarChart2 className="h-7 w-7" />}
          title="Reports Coming Soon"
          description="Charts and exportable reports will be implemented in a future sprint."
        />
      </Card>
    </PageContainer>
  )
}

export default ReportsPage
