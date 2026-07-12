import { useMemo } from 'react'
import { getRecentTransactions } from '@utils/dashboardStats'

/**
 * @param {Record<string, unknown>[]} transactions
 */
export function useDashboardData(transactions = []) {
  return useMemo(
    () => ({
      recentTransactions: getRecentTransactions(transactions, 5),
    }),
    [transactions],
  )
}
