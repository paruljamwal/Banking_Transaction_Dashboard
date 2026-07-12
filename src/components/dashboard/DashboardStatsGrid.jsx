import {
  FiActivity,
  FiArrowDownLeft,
  FiArrowUpRight,
  FiClock,
} from 'react-icons/fi'
import StatsCard from '@components/common/StatsCard'
import { formatCurrency, formatCompactCurrency } from '@utils/formatCurrency'

function DashboardStatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Transactions"
        value={stats.totalTransactions.toLocaleString('en-IN')}
        change={`${stats.totalChange} vs last month`}
        trend={stats.totalTrend}
        icon={<FiActivity className="h-5 w-5" />}
      />

      <StatsCard
        title="Total Income"
        value={formatCompactCurrency(stats.totalIncome)}
        change={`${stats.incomeChange} vs last month`}
        trend={stats.incomeTrend}
        icon={<FiArrowDownLeft className="h-5 w-5" />}
        footer={formatCurrency(stats.totalIncome)}
      />

      <StatsCard
        title="Total Expenses"
        value={formatCompactCurrency(stats.totalExpenses)}
        change={`${stats.expenseChange} vs last month`}
        trend={stats.expenseTrend}
        icon={<FiArrowUpRight className="h-5 w-5" />}
        footer={formatCurrency(stats.totalExpenses)}
      />

      <StatsCard
        title="Pending Transactions"
        value={stats.pendingTransactions.toLocaleString('en-IN')}
        change={`${stats.pendingChange} vs last month`}
        trend={stats.pendingTrend}
        icon={<FiClock className="h-5 w-5" />}
        footer="Awaiting clearance"
      />
    </div>
  )
}

export default DashboardStatsGrid
