import { useState, useMemo, useCallback } from 'react'
import { useDebounce } from '@hooks/useDebounce'
import { searchTransactions } from '@utils/searchTransactions'
import { SEARCHABLE_FIELDS } from '@constants/table'

/**
 * @param {Record<string, unknown>[]} data
 * @param {{ fields?: string[], debounceMs?: number, initialQuery?: string }} [options]
 */
export function useSearch(data = [], options = {}) {
  const {
    fields = SEARCHABLE_FIELDS,
    debounceMs = 300,
    initialQuery = '',
  } = options

  const [query, setQuery] = useState(initialQuery)
  const debouncedQuery = useDebounce(query, debounceMs)

  const results = useMemo(
    () => searchTransactions(data, debouncedQuery, fields),
    [data, debouncedQuery, fields],
  )

  const clearSearch = useCallback(() => setQuery(''), [])

  const hasQuery = query.trim().length > 0
  const hasResults = results.length > 0

  return {
    query,
    debouncedQuery,
    setQuery,
    clearSearch,
    results,
    hasQuery,
    hasResults,
    resultCount: results.length,
  }
}
