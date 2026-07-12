import PageContainer from '@components/common/PageContainer'
import {
  DashboardHeader,
  DashboardStatsGrid,
  DashboardRecentTransactions,
} from '@components/dashboard'
import { transactions } from '@data/transactions'
import mockUser from '@data/mockUser.json'
import { useDashboardData } from '@hooks/useDashboardData'

function DashboardPage() {
  const { stats, recentTransactions } = useDashboardData(transactions)

  return (
    <PageContainer>
      <DashboardHeader userName={mockUser.user.name} />

      <div className="space-y-6">
        <DashboardStatsGrid stats={stats} />
        <DashboardRecentTransactions transactions={recentTransactions} />
      </div>
    </PageContainer>
  )
}

export default DashboardPage
