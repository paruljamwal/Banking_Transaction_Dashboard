import { TRANSACTION_TYPES } from '@constants/transactionTypes'
import { STATUS } from '@constants/status'

/**
 * @param {Record<string, unknown>[]} transactions
 * @param {string} type
 */
function sumByType(transactions, type) {
  return transactions
    .filter((txn) => txn.transactionType === type)
    .reduce((sum, txn) => sum + Number(txn.amount), 0)
}

/**
 * @param {Record<string, unknown>[]} transactions
 */
export function getDashboardStats(transactions) {
  const income = sumByType(transactions, TRANSACTION_TYPES.INCOME)
  const expense = sumByType(transactions, TRANSACTION_TYPES.EXPENSE)
  const pending = transactions.filter(
    (txn) => txn.status === STATUS.PENDING,
  ).length

  return {
    totalTransactions: transactions.length,
    income,
    expense,
    pending,
  }
}

/**
 * @param {Record<string, unknown>[]} transactions
 * @param {number} [limit]
 */
export function getRecentTransactions(transactions, limit = 10) {
  return transactions.slice(0, limit)
}
