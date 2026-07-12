import { parseISO, subMonths, isSameMonth, isSameDay, format } from 'date-fns'
import { TRANSACTION_TYPES } from '@constants/transactionTypes'
import { STATUS } from '@constants/status'
import { formatCurrency } from '@utils/formatCurrency'

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

  const todayTransactions = transactions.filter((txn) =>
    isSameDay(parseISO(txn.date), REFERENCE_DATE),
  )

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
    todayTransactions: todayTransactions.length,
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
 */
export function getDashboardInsights(transactions) {
  const todayTxns = transactions.filter((txn) =>
    isSameDay(parseISO(txn.date), REFERENCE_DATE),
  )

  const highestToday = todayTxns.reduce(
    (max, txn) => (Number(txn.amount) > Number(max?.amount || 0) ? txn : max),
    todayTxns[0] || null,
  )

  const expenses = transactions.filter(
    (txn) => txn.transactionType === TRANSACTION_TYPES.EXPENSE,
  )
  const incomes = transactions.filter(
    (txn) => txn.transactionType === TRANSACTION_TYPES.INCOME,
  )

  const largestExpense = expenses.reduce(
    (max, txn) => (Number(txn.amount) > Number(max?.amount || 0) ? txn : max),
    expenses[0] || null,
  )

  const largestIncome = incomes.reduce(
    (max, txn) => (Number(txn.amount) > Number(max?.amount || 0) ? txn : max),
    incomes[0] || null,
  )

  const pendingApprovals = transactions.filter(
    (txn) => txn.status === STATUS.PENDING,
  ).length

  const failedTransactions = transactions.filter(
    (txn) => txn.status === STATUS.FAILED,
  ).length

  return [
    {
      id: 'highest-today',
      label: 'Highest transaction today',
      value: highestToday
        ? formatCurrency(highestToday.amount)
        : '—',
      detail: highestToday?.customerName || 'No activity today',
      tone: 'primary',
    },
    {
      id: 'largest-expense',
      label: 'Largest expense',
      value: largestExpense ? formatCurrency(largestExpense.amount) : '—',
      detail: largestExpense?.category || 'No expenses recorded',
      tone: 'danger',
    },
    {
      id: 'largest-income',
      label: 'Largest income',
      value: largestIncome ? formatCurrency(largestIncome.amount) : '—',
      detail: largestIncome?.category || 'No income recorded',
      tone: 'success',
    },
    {
      id: 'pending-approvals',
      label: 'Pending approvals',
      value: pendingApprovals.toLocaleString('en-IN'),
      detail: 'Awaiting clearance',
      tone: 'warning',
    },
    {
      id: 'failed-transactions',
      label: 'Failed transactions',
      value: failedTransactions.toLocaleString('en-IN'),
      detail: 'Requires review',
      tone: 'danger',
    },
  ]
}

/**
 * @param {Record<string, unknown>[]} transactions
 * @param {number} [limit]
 */
export function getActivityTimeline(transactions, limit = 6) {
  const EVENT_MAP = {
    [`${TRANSACTION_TYPES.TRANSFER}-${STATUS.COMPLETED}`]: {
      title: 'Transfer completed',
      tone: 'primary',
    },
    [`${TRANSACTION_TYPES.INCOME}-${STATUS.COMPLETED}`]: {
      title: 'Salary credited',
      tone: 'success',
    },
    [`${TRANSACTION_TYPES.REFUND}-${STATUS.COMPLETED}`]: {
      title: 'Refund received',
      tone: 'success',
    },
    [`${TRANSACTION_TYPES.EXPENSE}-${STATUS.FAILED}`]: {
      title: 'Payment failed',
      tone: 'danger',
    },
    [`${TRANSACTION_TYPES.EXPENSE}-${STATUS.COMPLETED}`]: {
      title: 'Payment processed',
      tone: 'neutral',
    },
  }

  return transactions.slice(0, limit).map((txn, index) => {
    const key = `${txn.transactionType}-${txn.status}`
    const event = EVENT_MAP[key] || {
      title: 'Account activity',
      tone: 'neutral',
    }

    return {
      id: `activity-${txn.id}`,
      title: index === 2 ? 'Card added' : event.title,
      description: `${txn.customerName} · ${formatCurrency(txn.amount)}`,
      time: format(parseISO(txn.createdTime || txn.date), 'hh:mm a'),
      tone: index === 2 ? 'card' : event.tone,
      isCardEvent: index === 2,
    }
  })
}

/**
 * @param {Record<string, unknown>[]} transactions
 * @param {number} [limit]
 */
export function getRecentTransactions(transactions, limit = 10) {
  return transactions.slice(0, limit)
}
