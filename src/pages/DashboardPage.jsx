import PageContainer from '@components/common/PageContainer'
import {
  DashboardTopBar,
  DashboardStatsGrid,
  DashboardRecentTransactions,
} from '@components/dashboard'
import { transactions } from '@data/transactions'
import { useDashboardData } from '@hooks/useDashboardData'

function DashboardPage() {
  const { stats, recentTransactions } = useDashboardData(transactions)

  return (
    <PageContainer>
      <DashboardTopBar />

      <div className="space-y-6">
        <DashboardStatsGrid stats={stats} />
        <DashboardRecentTransactions transactions={recentTransactions} />
      </div>
    </PageContainer>
  )
}

export default DashboardPage
