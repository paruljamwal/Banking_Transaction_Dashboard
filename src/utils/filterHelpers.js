import { FILTER_KEYS } from '@constants/table'

/**
 * @param {Record<string, string>} formFilters
 */
export function mapFormToFilterPayload(formFilters) {
  return {
    [FILTER_KEYS.DATE_FROM]: formFilters.dateFrom || undefined,
    [FILTER_KEYS.DATE_TO]: formFilters.dateTo || undefined,
    [FILTER_KEYS.TYPE]: formFilters.transactionType || undefined,
    [FILTER_KEYS.AMOUNT_MIN]: formFilters.amountMin || undefined,
    [FILTER_KEYS.AMOUNT_MAX]: formFilters.amountMax || undefined,
  }
}

/**
 * @param {Record<string, string>} formFilters
 */
export function hasActiveFilters(formFilters) {
  return Object.values(formFilters).some(
    (value) => value !== '' && value !== null && value !== undefined,
  )
}
