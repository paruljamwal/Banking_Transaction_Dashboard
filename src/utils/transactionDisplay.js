import { TRANSACTION_TYPES } from '@constants/transactionTypes'
import { STATUS } from '@constants/status'

const TYPE_AMOUNT_COLORS = {
  [TRANSACTION_TYPES.INCOME]: 'text-emerald-600',
  [TRANSACTION_TYPES.EXPENSE]: 'text-red-600',
  [TRANSACTION_TYPES.TRANSFER]: 'text-blue-600',
  [TRANSACTION_TYPES.REFUND]: 'text-emerald-600',
}

/**
 * @param {string} transactionType
 * @param {string} [status]
 * @returns {string}
 */
export function getAmountColorClass(transactionType, status) {
  if (status === STATUS.PENDING) return 'text-amber-500'
  return TYPE_AMOUNT_COLORS[transactionType] || 'text-text'
}
