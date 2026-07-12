/**
 * @param {Record<string, unknown>[]} data
 * @param {string} query
 * @param {string[]} [fields]
 */
export function searchData(data, query, fields = []) {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) return [...data]

  return data.filter((item) => {
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
 * @param {Record<string, unknown>[]} data
 * @param {string} query
 * @param {(item: Record<string, unknown>, query: string) => boolean} matcher
 */
export function searchDataWithMatcher(data, query, matcher) {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return [...data]

  return data.filter((item) => matcher(item, normalizedQuery))
}
