import {
  format,
  formatDistanceToNow,
  isValid,
  parseISO,
} from 'date-fns'

const DEFAULT_FORMAT = 'dd MMM yyyy'
const DEFAULT_DATETIME_FORMAT = 'dd MMM yyyy, hh:mm a'

/**
 * @param {string | Date | number} dateInput
 * @returns {Date | null}
 */
export function parseDate(dateInput) {
  if (!dateInput) return null

  if (dateInput instanceof Date) {
    return isValid(dateInput) ? dateInput : null
  }

  if (typeof dateInput === 'number') {
    const date = new Date(dateInput)
    return isValid(date) ? date : null
  }

  if (typeof dateInput === 'string') {
    const parsed = parseISO(dateInput)
    if (isValid(parsed)) return parsed

    const fallback = new Date(dateInput)
    return isValid(fallback) ? fallback : null
  }

  return null
}

/**
 * @param {string | Date | number} dateInput
 * @param {string} [pattern]
 * @returns {string}
 */
export function formatDate(dateInput, pattern = DEFAULT_FORMAT) {
  const date = parseDate(dateInput)
  if (!date) return '—'

  return format(date, pattern)
}

/**
 * @param {string | Date | number} dateInput
 * @param {string} [pattern]
 * @returns {string}
 */
export function formatDateTime(dateInput, pattern = DEFAULT_DATETIME_FORMAT) {
  return formatDate(dateInput, pattern)
}

/**
 * @param {string | Date | number} dateInput
 * @param {{ addSuffix?: boolean }} [options]
 * @returns {string}
 */
export function formatRelativeDate(dateInput, options = { addSuffix: true }) {
  const date = parseDate(dateInput)
  if (!date) return '—'

  return formatDistanceToNow(date, options)
}
