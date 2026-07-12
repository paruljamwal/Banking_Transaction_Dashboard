export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
  REFUND: 'refund',
  TRANSFER: 'transfer',
}

export const TRANSACTION_TYPE_LABELS = {
  [TRANSACTION_TYPES.INCOME]: 'Income',
  [TRANSACTION_TYPES.EXPENSE]: 'Expense',
  [TRANSACTION_TYPES.REFUND]: 'Refund',
  [TRANSACTION_TYPES.TRANSFER]: 'Transfer',
}

export const TRANSACTION_TYPE_OPTIONS = Object.entries(TRANSACTION_TYPE_LABELS).map(
  ([value, label]) => ({ value, label }),
)
