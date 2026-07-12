/**
 * @param {string} value
 * @returns {string}
 */
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * @param {string} text
 * @param {string} query
 * @returns {boolean}
 */
export function isQueryMatch(text, query) {
  if (!text || !query?.trim()) return false
  return String(text).toLowerCase().includes(query.trim().toLowerCase())
}

/**
 * @param {string} text
 * @param {string} query
 * @returns {{ text: string, highlight: boolean }[]}
 */
export function getHighlightedParts(text, query) {
  if (!text) return [{ text: '', highlight: false }]
  if (!query?.trim()) return [{ text: String(text), highlight: false }]

  const normalizedQuery = query.trim()
  const regex = new RegExp(`(${escapeRegExp(normalizedQuery)})`, 'gi')
  const parts = String(text).split(regex).filter(Boolean)

  return parts.map((part) => ({
    text: part,
    highlight: part.toLowerCase() === normalizedQuery.toLowerCase(),
  }))
}
