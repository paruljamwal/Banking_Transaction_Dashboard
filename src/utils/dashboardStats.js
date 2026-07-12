import { parseISO, subMonths, isSameMonth } from 'date-fns'
import { TRANSACTION_TYPES } from '@constants/transactionTypes'
import { STATUS } from '@constants/status'

const REFERENCE_DATE = new Date('2026-03-15')

/**
 * @param {number} current
 * @param {number} previous
 */
function calculatePercentChange(current, previous) {
  if (previous === 0) return current > 0 ? 100 : 0
  return ((current - previous) / previous) * 100
}

/**
 * @param {number} percent
 */
function getTrendFromPercent(percent) {
  if (percent > 0) return 'up'
  if (percent < 0) return 'down'
  return 'neutral'
}

/**
 * @param {number} percent
 */
function formatPercentChange(percent) {
  const sign = percent > 0 ? '+' : ''
  return `${sign}${percent.toFixed(1)}%`
}

/**
 * @param {Record<string, unknown>[]} transactions
 * @param {Date} monthDate
 */
function filterByMonth(transactions, monthDate) {
  return transactions.filter((txn) =>
    isSameMonth(parseISO(txn.date), monthDate),
  )
}

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
  const currentMonth = filterByMonth(transactions, REFERENCE_DATE)
  const previousMonth = filterByMonth(transactions, subMonths(REFERENCE_DATE, 1))

  const totalIncome = sumByType(transactions, TRANSACTION_TYPES.INCOME)
  const totalExpense = sumByType(transactions, TRANSACTION_TYPES.EXPENSE)
  const pendingCount = transactions.filter(
    (txn) => txn.status === STATUS.PENDING,
  ).length

  const currentMonthIncome = sumByType(currentMonth, TRANSACTION_TYPES.INCOME)
  const previousMonthIncome = sumByType(previousMonth, TRANSACTION_TYPES.INCOME)

  const currentMonthExpense = sumByType(currentMonth, TRANSACTION_TYPES.EXPENSE)
  const previousMonthExpense = sumByType(previousMonth, TRANSACTION_TYPES.EXPENSE)

  const currentMonthCount = currentMonth.length
  const previousMonthCount = previousMonth.length

  const currentMonthPending = currentMonth.filter(
    (txn) => txn.status === STATUS.PENDING,
  ).length
  const previousMonthPending = previousMonth.filter(
    (txn) => txn.status === STATUS.PENDING,
  ).length

  const totalChange = calculatePercentChange(currentMonthCount, previousMonthCount)
  const incomeChange = calculatePercentChange(
    currentMonthIncome,
    previousMonthIncome,
  )
  const expenseChange = calculatePercentChange(
    currentMonthExpense,
    previousMonthExpense,
  )
  const pendingChange = calculatePercentChange(
    currentMonthPending,
    previousMonthPending,
  )

  return {
    totalTransactions: transactions.length,
    totalChange: formatPercentChange(totalChange),
    totalTrend: getTrendFromPercent(totalChange),
    totalIncome: totalIncome,
    incomeChange: formatPercentChange(incomeChange),
    incomeTrend: getTrendFromPercent(incomeChange),
    totalExpenses: totalExpense,
    expenseChange: formatPercentChange(expenseChange),
    expenseTrend: getTrendFromPercent(expenseChange),
    pendingTransactions: pendingCount,
    pendingChange: formatPercentChange(pendingChange),
    pendingTrend: getTrendFromPercent(pendingChange),
  }
}

/**
 * @param {Record<string, unknown>[]} transactions
 * @param {number} [limit]
 */
export function getRecentTransactions(transactions, limit = 10) {
  return transactions.slice(0, limit)
}
