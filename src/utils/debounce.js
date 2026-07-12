/**
 * @param {(...args: unknown[]) => void} fn
 * @param {number} delay
 * @returns {(...args: unknown[]) => void}
 */
export function debounce(fn, delay = 300) {
  let timeoutId = null

  const debounced = (...args) => {
    if (timeoutId) clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      fn(...args)
      timeoutId = null
    }, delay)
  }

  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  return debounced
}
