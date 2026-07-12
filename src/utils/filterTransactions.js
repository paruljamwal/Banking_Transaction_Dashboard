import { endOfDay } from 'date-fns'
import { FILTER_KEYS } from '@constants/table'
import { parseDate } from '@utils/formatDate'

/**
 * @param {Record<string, unknown>[]} transactions
 * @param {Record<string, unknown>} filters
 */
export function filterTransactions(transactions, filters = {}) {
  const activeFilters = Object.entries(filters).filter(
    ([, value]) => value !== '' && value !== null && value !== undefined,
  )

  if (activeFilters.length === 0) return [...transactions]

  return transactions.filter((item) =>
    activeFilters.every(([key, filterValue]) => {
      if (key === FILTER_KEYS.DATE_FROM) {
        const itemDate = parseDate(item.date)
        const fromDate = parseDate(filterValue)
        if (!itemDate || !fromDate) return false
        return itemDate >= fromDate
      }

      if (key === FILTER_KEYS.DATE_TO) {
        const itemDate = parseDate(item.date)
        const toDate = parseDate(filterValue)
        if (!itemDate || !toDate) return false
        return itemDate <= endOfDay(toDate)
      }

      if (key === FILTER_KEYS.AMOUNT_MIN) {
        return Number(item.amount) >= Number(filterValue)
      }

      if (key === FILTER_KEYS.AMOUNT_MAX) {
        return Number(item.amount) <= Number(filterValue)
      }

      const itemValue = item[key]

      if (Array.isArray(filterValue)) {
        return filterValue.length === 0 || filterValue.includes(itemValue)
      }

      if (typeof filterValue === 'function') {
        return filterValue(itemValue, item)
      }

      if (typeof itemValue === 'string' && typeof filterValue === 'string') {
        return itemValue.toLowerCase() === filterValue.toLowerCase()
      }

      return itemValue === filterValue
    }),
  )
}

/**
 * @param {Record<string, unknown>[]} transactions
 * @param {string} field
 * @param {unknown[]} values
 */
export function filterTransactionsByValues(transactions, field, values = []) {
  if (!values.length) return [...transactions]
  return transactions.filter((item) => values.includes(item[field]))
}

/**
 * @param {Record<string, unknown>[]} transactions
 * @param {string} field
 * @param {number} min
 * @param {number} max
 */
export function filterTransactionsByRange(transactions, field, min, max) {
  return transactions.filter((item) => {
    const value = Number(item[field])
    if (Number.isNaN(value)) return false
    if (min !== undefined && min !== null && value < min) return false
    if (max !== undefined && max !== null && value > max) return false
    return true
  })
}
