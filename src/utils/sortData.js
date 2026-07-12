/**
 * @param {Record<string, unknown>[]} data
 * @param {string} key
 * @param {'asc' | 'desc'} [direction]
 */
export function sortData(data, key, direction = 'asc') {
  if (!key) return [...data]

  const multiplier = direction === 'desc' ? -1 : 1

  return [...data].sort((a, b) => {
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
 * @param {Record<string, unknown>[]} data
 * @param {{ key: string, direction?: 'asc' | 'desc' }[]} sortConfig
 */
export function multiSortData(data, sortConfig = []) {
  if (!sortConfig.length) return [...data]

  return [...data].sort((a, b) => {
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
