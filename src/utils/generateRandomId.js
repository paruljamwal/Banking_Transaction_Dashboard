/**
 * @param {string} [prefix]
 * @returns {string}
 */
export function generateRandomId(prefix = 'id') {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).slice(2, 9)
  return `${prefix}_${timestamp}_${random}`
}

/**
 * @param {number} [length]
 * @returns {string}
 */
export function generateRandomShortId(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  for (let i = 0; i < length; i += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return result
}
