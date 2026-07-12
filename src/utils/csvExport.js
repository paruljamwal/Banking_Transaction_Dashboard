import Papa from 'papaparse'
import { format } from 'date-fns'
import { TRANSACTION_TYPE_LABELS } from '@constants/transactionTypes'
import { STATUS_LABELS } from '@constants/status'
import { formatDate } from '@utils/formatDate'

export const TRANSACTION_CSV_COLUMNS = [
  'Transaction ID',
  'Customer',
  'Amount',
  'Status',
  'Type',
  'Date',
  'Payment Method',
  'Category',
]

/**
 * @param {Record<string, unknown>[]} transactions
 */
export function mapTransactionsToCsvRows(transactions = []) {
  return transactions.map((txn) => ({
    'Transaction ID': txn.transactionId,
    Customer: txn.customerName,
    Amount: txn.amount,
    Status: STATUS_LABELS[txn.status] || txn.status,
    Type: TRANSACTION_TYPE_LABELS[txn.transactionType] || txn.transactionType,
    Date: formatDate(txn.date),
    'Payment Method': txn.paymentMethod,
    Category: txn.category,
  }))
}

/**
 * @param {Date} [date]
 */
export function getTransactionCsvFilename(date = new Date()) {
  return `transactions-${format(date, 'yyyy-MM-dd')}.csv`
}

/**
 * @param {string} csvContent
 * @param {string} filename
 */
function triggerCsvDownload(csvContent, filename) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}

/**
 * @param {Record<string, unknown>[]} transactions
 * @param {{ filename?: string }} [options]
 */
export function exportTransactionsToCsv(transactions = [], options = {}) {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    throw new Error('exportTransactionsToCsv requires a non-empty array')
  }

  const rows = mapTransactionsToCsvRows(transactions)
  const csvContent = Papa.unparse(rows, { columns: TRANSACTION_CSV_COLUMNS })
  const filename = options.filename || getTransactionCsvFilename()

  triggerCsvDownload(csvContent, filename)

  return { filename, rowCount: rows.length }
}
