import { useMemo } from 'react'
import {
  getDashboardStats,
  getRecentTransactions,
  getDashboardInsights,
  getActivityTimeline,
} from '@utils/dashboardStats'

/**
 * @param {Record<string, unknown>[]} transactions
 */
export function useDashboardData(transactions = []) {
  return useMemo(
    () => ({
      stats: getDashboardStats(transactions),
      recentTransactions: getRecentTransactions(transactions, 5),
      insights: getDashboardInsights(transactions),
      activityTimeline: getActivityTimeline(transactions),
    }),
    [transactions],
  )
}
