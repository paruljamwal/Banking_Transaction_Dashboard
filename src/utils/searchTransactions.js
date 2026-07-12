import { SEARCHABLE_FIELDS } from '@constants/table'

/**
 * @param {Record<string, unknown>[]} transactions
 * @param {string} query
 * @param {string[]} [fields]
 */
export function searchTransactions(transactions, query, fields = SEARCHABLE_FIELDS) {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) return [...transactions]

  return transactions.filter((item) => {
    const searchFields =
      fields.length > 0
        ? fields
        : Object.keys(item).filter((key) => typeof item[key] !== 'object')

    return searchFields.some((field) => {
      const value = item[field]
      if (value === null || value === undefined) return false
      return String(value).toLowerCase().includes(normalizedQuery)
    })
  })
}

/**
 * @param {Record<string, unknown>[]} transactions
 * @param {string} query
 * @param {(item: Record<string, unknown>, query: string) => boolean} matcher
 */
export function searchTransactionsWithMatcher(transactions, query, matcher) {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return [...transactions]

  return transactions.filter((item) => matcher(item, normalizedQuery))
}
