/**
 * @param {Record<string, unknown>[]} data
 * @param {Record<string, unknown>} filters
 */
export function filterData(data, filters = {}) {
  const activeFilters = Object.entries(filters).filter(
    ([, value]) => value !== '' && value !== null && value !== undefined,
  )

  if (activeFilters.length === 0) return [...data]

  return data.filter((item) =>
    activeFilters.every(([key, filterValue]) => {
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
 * @param {Record<string, unknown>[]} data
 * @param {string} field
 * @param {unknown[]} values
 */
export function filterByValues(data, field, values = []) {
  if (!values.length) return [...data]
  return data.filter((item) => values.includes(item[field]))
}

/**
 * @param {Record<string, unknown>[]} data
 * @param {string} field
 * @param {number} min
 * @param {number} max
 */
export function filterByRange(data, field, min, max) {
  return data.filter((item) => {
    const value = Number(item[field])
    if (Number.isNaN(value)) return false
    if (min !== undefined && min !== null && value < min) return false
    if (max !== undefined && max !== null && value > max) return false
    return true
  })
}
