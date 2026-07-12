import { generateMockTransactions } from './generateTransactions'

export const MOCK_TRANSACTION_COUNT = 300

export const mockTransactions = generateMockTransactions(MOCK_TRANSACTION_COUNT)

export const mockTransactionMeta = {
  totalRecords: mockTransactions.length,
  generatedAt: '2026-03-15',
  dateRange: {
    from: '2025-03-15',
    to: '2026-03-15',
  },
  accountHolders: [...new Set(mockTransactions.map((txn) => txn.accountHolder))].length,
  currencies: ['INR'],
}
