import PageContainer from '@components/common/PageContainer'
import {
  DashboardHeader,
  DashboardRecentTransactions,
  DashboardSkeleton,
} from '@components/dashboard'
import { transactions } from '@data/transactions'
import mockUser from '@data/mockUser.json'
import { useDashboardData } from '@hooks/useDashboardData'
import { usePageSkeleton } from '@hooks/usePageSkeleton'

function DashboardPage() {
  const isLoading = usePageSkeleton()
  const { recentTransactions } = useDashboardData(transactions)

  if (isLoading) {
    return (
      <PageContainer>
        <DashboardSkeleton />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <DashboardHeader userName={mockUser.user.name} />
        </div>

        <div className="col-span-12">
          <DashboardRecentTransactions transactions={recentTransactions} />
        </div>
      </div>
    </PageContainer>
  )
}

export default DashboardPage
