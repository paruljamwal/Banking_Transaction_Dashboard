import {
  FiActivity,
  FiArrowDownLeft,
  FiArrowUpRight,
  FiCalendar,
} from 'react-icons/fi'
import StatsCard from '@components/common/StatsCard'
import StatsGridSkeleton from '@components/common/StatsGridSkeleton'
import { formatCurrency, formatCompactCurrency } from '@utils/formatCurrency'

function DashboardStatsGrid({ stats, loading = false }) {
  if (loading) {
    return <StatsGridSkeleton />
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Transactions"
        value={stats.totalTransactions.toLocaleString('en-IN')}
        change={`${stats.totalChange} vs last month`}
        trend={stats.totalTrend}
        description="All-time transaction volume across accounts"
        icon={<FiActivity className="h-5 w-5" />}
      />

      <StatsCard
        title="Today's Transactions"
        value={stats.todayTransactions.toLocaleString('en-IN')}
        change={`${stats.totalChange} vs last month`}
        trend={stats.totalTrend}
        description="Activity recorded for the current business day"
        icon={<FiCalendar className="h-5 w-5" />}
        iconClassName="bg-sky-50 text-sky-600 ring-sky-100"
      />

      <StatsCard
        title="Income"
        value={formatCompactCurrency(stats.totalIncome)}
        change={`${stats.incomeChange} vs last month`}
        trend={stats.incomeTrend}
        description={formatCurrency(stats.totalIncome)}
        icon={<FiArrowDownLeft className="h-5 w-5" />}
        iconClassName="bg-emerald-50 text-emerald-600 ring-emerald-100"
      />

      <StatsCard
        title="Expenses"
        value={formatCompactCurrency(stats.totalExpenses)}
        change={`${stats.expenseChange} vs last month`}
        trend={stats.expenseTrend}
        description={formatCurrency(stats.totalExpenses)}
        icon={<FiArrowUpRight className="h-5 w-5" />}
        iconClassName="bg-red-50 text-red-600 ring-red-100"
      />
    </div>
  )
}

export default DashboardStatsGrid
