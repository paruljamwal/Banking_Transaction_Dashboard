import { useState, useMemo, useCallback } from 'react'
import { filterTransactions } from '@utils/filterTransactions'
import {
  mapFormToFilterPayload,
  getActiveFilterChips,
  hasActiveFilters,
} from '@utils/filterHelpers'
import { INITIAL_TRANSACTION_FILTERS } from '@constants/filters'

/**
 * @param {Record<string, unknown>[]} transactions
 */
export function useTransactionFilters(transactions = []) {
  const [draftFilters, setDraftFilters] = useState(INITIAL_TRANSACTION_FILTERS)
  const [appliedFilters, setAppliedFilters] = useState(INITIAL_TRANSACTION_FILTERS)

  const filteredTransactions = useMemo(() => {
    const payload = mapFormToFilterPayload(appliedFilters)
    return filterTransactions(transactions, payload)
  }, [transactions, appliedFilters])

  const activeChips = useMemo(
    () => getActiveFilterChips(appliedFilters),
    [appliedFilters],
  )

  const isFiltered = hasActiveFilters(appliedFilters)

  const updateDraftFilter = useCallback((field, value) => {
    setDraftFilters((prev) => ({ ...prev, [field]: value }))
  }, [])

  const applyFilters = useCallback(() => {
    setAppliedFilters({ ...draftFilters })
  }, [draftFilters])

  const resetFilters = useCallback(() => {
    setDraftFilters(INITIAL_TRANSACTION_FILTERS)
    setAppliedFilters(INITIAL_TRANSACTION_FILTERS)
  }, [])

  const removeFilter = useCallback((field) => {
    setDraftFilters((prev) => ({ ...prev, [field]: '' }))
    setAppliedFilters((prev) => ({ ...prev, [field]: '' }))
  }, [])

  return {
    draftFilters,
    appliedFilters,
    filteredTransactions,
    activeChips,
    isFiltered,
    updateDraftFilter,
    applyFilters,
    resetFilters,
    removeFilter,
    filteredCount: filteredTransactions.length,
  }
}
