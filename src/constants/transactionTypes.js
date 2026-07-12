export const TRANSACTION_TYPES = {
  CREDIT: 'credit',
  DEBIT: 'debit',
  TRANSFER: 'transfer',
  WITHDRAWAL: 'withdrawal',
  DEPOSIT: 'deposit',
  REFUND: 'refund',
}

export const TRANSACTION_TYPE_LABELS = {
  [TRANSACTION_TYPES.CREDIT]: 'Credit',
  [TRANSACTION_TYPES.DEBIT]: 'Debit',
  [TRANSACTION_TYPES.TRANSFER]: 'Transfer',
  [TRANSACTION_TYPES.WITHDRAWAL]: 'Withdrawal',
  [TRANSACTION_TYPES.DEPOSIT]: 'Deposit',
  [TRANSACTION_TYPES.REFUND]: 'Refund',
}

export const TRANSACTION_TYPE_OPTIONS = Object.entries(TRANSACTION_TYPE_LABELS).map(
  ([value, label]) => ({ value, label }),
)
