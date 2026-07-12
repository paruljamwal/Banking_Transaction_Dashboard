import { TRANSACTION_TYPES } from '@constants/transactionTypes'

const AMOUNT_COLOR_MAP = {
  [TRANSACTION_TYPES.INCOME]: 'text-emerald-600',
  [TRANSACTION_TYPES.EXPENSE]: 'text-red-600',
  [TRANSACTION_TYPES.TRANSFER]: 'text-amber-500',
  [TRANSACTION_TYPES.REFUND]: 'text-emerald-600',
}

/**
 * @param {string} transactionType
 * @returns {string}
 */
export function getAmountColorClass(transactionType) {
  return AMOUNT_COLOR_MAP[transactionType] || 'text-text'
}
