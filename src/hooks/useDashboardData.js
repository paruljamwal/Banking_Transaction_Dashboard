import { useMemo } from 'react'
import {
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
      recentTransactions: getRecentTransactions(transactions, 5),
      insights: getDashboardInsights(transactions),
      activityTimeline: getActivityTimeline(transactions),
    }),
    [transactions],
  )
}
