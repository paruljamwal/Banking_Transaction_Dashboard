export const SORT_DIRECTION = {
  ASC: 'asc',
  DESC: 'desc',
}

export const DEFAULT_SORT = {
  key: 'date',
  direction: SORT_DIRECTION.DESC,
}

export const TABLE_COLUMNS = [
  { key: 'transactionId', label: 'Transaction ID', sortable: true, align: 'left' },
  { key: 'accountHolder', label: 'Account Holder', sortable: true, align: 'left' },
  { key: 'accountNumber', label: 'Account', sortable: false, align: 'left' },
  { key: 'amount', label: 'Amount', sortable: true, align: 'right' },
  { key: 'transactionType', label: 'Type', sortable: true, align: 'left' },
  { key: 'status', label: 'Status', sortable: true, align: 'left' },
  { key: 'paymentMethod', label: 'Payment Method', sortable: true, align: 'left' },
  { key: 'category', label: 'Category', sortable: true, align: 'left' },
  { key: 'date', label: 'Date', sortable: true, align: 'left' },
]

export const SEARCHABLE_FIELDS = [
  'accountHolder',
  'accountNumber',
  'transactionId',
  'description',
  'category',
  'paymentMethod',
  'receiver',
  'sender',
]

export const FILTER_KEYS = {
  TYPE: 'transactionType',
  STATUS: 'status',
  PAYMENT_METHOD: 'paymentMethod',
  CATEGORY: 'category',
  DATE_FROM: 'dateFrom',
  DATE_TO: 'dateTo',
  AMOUNT_MIN: 'amountMin',
  AMOUNT_MAX: 'amountMax',
}

export const TABLE_EMPTY_MESSAGE = 'No records found'
export const TABLE_LOADING_MESSAGE = 'Loading records...'
