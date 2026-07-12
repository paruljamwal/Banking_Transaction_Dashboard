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
        icon={<FiActivity className="h-5 w-5" />}
      />

      <StatsCard
        title="Income"
        value={formatCompactCurrency(stats.income)}
        icon={<FiArrowDownLeft className="h-5 w-5" />}
        footer={formatCurrency(stats.income)}
      />

      <StatsCard
        title="Expense"
        value={formatCompactCurrency(stats.expense)}
        icon={<FiArrowUpRight className="h-5 w-5" />}
        footer={formatCurrency(stats.expense)}
      />

      <StatsCard
        title="Pending"
        value={stats.pending.toLocaleString('en-IN')}
        icon={<FiClock className="h-5 w-5" />}
        footer="Awaiting clearance"
      />
    </div>
  )
}

export default DashboardStatsGrid
