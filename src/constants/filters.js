export const PAYMENT_METHODS = [
  'UPI',
  'Net Banking',
  'Debit Card',
  'Credit Card',
  'NEFT',
  'RTGS',
  'IMPS',
  'Digital Wallet',
]

export const PAYMENT_METHOD_OPTIONS = [
  { value: '', label: 'All Methods' },
  ...PAYMENT_METHODS.map((method) => ({ value: method, label: method })),
]

export const TRANSACTION_STATUS_FILTER_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
  { value: 'failed', label: 'Failed' },
]

export const TRANSACTION_TYPE_FILTER_OPTIONS = [
  { value: '', label: 'All Types' },
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expense' },
  { value: 'refund', label: 'Refund' },
  { value: 'transfer', label: 'Transfer' },
]

export const INITIAL_TRANSACTION_FILTERS = {
  dateFrom: '',
  dateTo: '',
  transactionType: '',
  status: '',
  paymentMethod: '',
  amountMin: '',
  amountMax: '',
}
