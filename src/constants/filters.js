export const TRANSACTION_TYPE_FILTER_OPTIONS = [
  { value: '', label: 'All Types' },
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expense' },
  { value: 'transfer', label: 'Transfer' },
  { value: 'refund', label: 'Refund' },
]

export const INITIAL_TRANSACTION_FILTERS = {
  dateFrom: '',
  dateTo: '',
  transactionType: '',
  amountMin: '',
  amountMax: '',
}
