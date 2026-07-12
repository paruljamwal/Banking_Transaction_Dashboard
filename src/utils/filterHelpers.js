import { FILTER_KEYS } from '@constants/table'
import { TRANSACTION_TYPE_LABELS } from '@constants/transactionTypes'
import { STATUS_LABELS } from '@constants/status'

const FILTER_LABELS = {
  [FILTER_KEYS.DATE_FROM]: 'From',
  [FILTER_KEYS.DATE_TO]: 'To',
  [FILTER_KEYS.TYPE]: 'Type',
  [FILTER_KEYS.STATUS]: 'Status',
  [FILTER_KEYS.PAYMENT_METHOD]: 'Payment',
  [FILTER_KEYS.AMOUNT_MIN]: 'Min Amount',
  [FILTER_KEYS.AMOUNT_MAX]: 'Max Amount',
}

/**
 * @param {Record<string, string>} formFilters
 */
export function mapFormToFilterPayload(formFilters) {
  return {
    [FILTER_KEYS.DATE_FROM]: formFilters.dateFrom || undefined,
    [FILTER_KEYS.DATE_TO]: formFilters.dateTo || undefined,
    [FILTER_KEYS.TYPE]: formFilters.transactionType || undefined,
    [FILTER_KEYS.STATUS]: formFilters.status || undefined,
    [FILTER_KEYS.PAYMENT_METHOD]: formFilters.paymentMethod || undefined,
    [FILTER_KEYS.AMOUNT_MIN]: formFilters.amountMin || undefined,
    [FILTER_KEYS.AMOUNT_MAX]: formFilters.amountMax || undefined,
  }
}

/**
 * @param {string} key
 * @param {string} value
 */
function formatFilterValue(key, value) {
  if (key === FILTER_KEYS.TYPE) {
    return TRANSACTION_TYPE_LABELS[value] || value
  }
  if (key === FILTER_KEYS.STATUS) {
    return STATUS_LABELS[value] || value
  }
  if (key === FILTER_KEYS.DATE_FROM || key === FILTER_KEYS.DATE_TO) {
    return value
  }
  if (key === FILTER_KEYS.AMOUNT_MIN || key === FILTER_KEYS.AMOUNT_MAX) {
    return `₹${Number(value).toLocaleString('en-IN')}`
  }
  return value
}

/**
 * @param {Record<string, string>} formFilters
 */
export function getActiveFilterChips(formFilters) {
  const payload = mapFormToFilterPayload(formFilters)

  return Object.entries(payload)
    .filter(([, value]) => value !== undefined && value !== '')
    .map(([key, value]) => ({
      key,
      field: key,
      label: `${FILTER_LABELS[key]}: ${formatFilterValue(key, value)}`,
      value,
    }))
}

/**
 * @param {Record<string, string>} formFilters
 */
export function hasActiveFilters(formFilters) {
  return getActiveFilterChips(formFilters).length > 0
}
