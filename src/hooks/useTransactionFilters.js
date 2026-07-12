import { useState, useMemo, useCallback } from 'react'
import { filterTransactions } from '@utils/filterTransactions'
import { mapFormToFilterPayload, hasActiveFilters } from '@utils/filterHelpers'
import { INITIAL_TRANSACTION_FILTERS } from '@constants/filters'

/**
 * @param {Record<string, unknown>[]} transactions
 */
export function useTransactionFilters(transactions = []) {
  const [filters, setFilters] = useState(INITIAL_TRANSACTION_FILTERS)

  const filteredTransactions = useMemo(() => {
    const payload = mapFormToFilterPayload(filters)
    return filterTransactions(transactions, payload)
  }, [transactions, filters])

  const isFiltered = hasActiveFilters(filters)

  const updateFilter = useCallback((field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_TRANSACTION_FILTERS)
  }, [])

  return {
    filters,
    filteredTransactions,
    isFiltered,
    updateFilter,
    resetFilters,
    filteredCount: filteredTransactions.length,
  }
}
