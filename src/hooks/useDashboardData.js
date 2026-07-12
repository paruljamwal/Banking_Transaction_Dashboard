import { useMemo } from 'react'
import { getDashboardStats, getRecentTransactions } from '@utils/dashboardStats'

/**
 * @param {Record<string, unknown>[]} transactions
 */
export function useDashboardData(transactions = []) {
  return useMemo(
    () => ({
      stats: getDashboardStats(transactions),
      recentTransactions: getRecentTransactions(transactions, 10),
    }),
    [transactions],
  )
}
