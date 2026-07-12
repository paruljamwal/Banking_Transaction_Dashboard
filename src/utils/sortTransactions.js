/**
 * @param {Record<string, unknown>[]} transactions
 * @param {string} key
 * @param {'asc' | 'desc'} [direction]
 */
export function sortTransactions(transactions, key, direction = 'asc') {
  if (!key) return [...transactions]

  const multiplier = direction === 'desc' ? -1 : 1

  return [...transactions].sort((a, b) => {
    const valueA = a[key]
    const valueB = b[key]

    if (valueA === valueB) return 0
    if (valueA === null || valueA === undefined) return 1
    if (valueB === null || valueB === undefined) return -1

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return (valueA - valueB) * multiplier
    }

    if (valueA instanceof Date && valueB instanceof Date) {
      return (valueA.getTime() - valueB.getTime()) * multiplier
    }

    return String(valueA).localeCompare(String(valueB)) * multiplier
  })
}

/**
 * @param {Record<string, unknown>[]} transactions
 * @param {{ key: string, direction?: 'asc' | 'desc' }[]} sortConfig
 */
export function sortTransactionsMulti(transactions, sortConfig = []) {
  if (!sortConfig.length) return [...transactions]

  return [...transactions].sort((a, b) => {
    for (const { key, direction = 'asc' } of sortConfig) {
      const multiplier = direction === 'desc' ? -1 : 1
      const valueA = a[key]
      const valueB = b[key]

      if (valueA === valueB) continue
      if (valueA === null || valueA === undefined) return 1
      if (valueB === null || valueB === undefined) return -1

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return (valueA - valueB) * multiplier
      }

      const comparison = String(valueA).localeCompare(String(valueB))
      if (comparison !== 0) return comparison * multiplier
    }

    return 0
  })
}
