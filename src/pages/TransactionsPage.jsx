import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import PageContainer from '@components/common/PageContainer'
import PageHeader from '@components/common/PageHeader'
import Pagination from '@components/common/Pagination'
import {
  TransactionsTable,
  TransactionDetailsModal,
  TransactionsToolbar,
  TransactionsSkeleton,
} from '@components/transactions'
import { transactions } from '@data/transactions'
import { TRANSACTION_SEARCH_FIELDS } from '@constants/transactionSearch'
import { useSearch } from '@hooks/useSearch'
import { useTransactionFilters } from '@hooks/useTransactionFilters'
import { usePagination } from '@hooks/usePagination'
import { usePageSkeleton } from '@hooks/usePageSkeleton'
import { exportTransactionsToCsv } from '@utils/csvExport'

function TransactionsPage() {
  const isLoading = usePageSkeleton()
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const handleViewDetails = useCallback((transaction) => {
    setSelectedTransaction(transaction)
    setIsDetailsOpen(true)
  }, [])

  const handleCloseDetails = useCallback(() => {
    setIsDetailsOpen(false)
    setSelectedTransaction(null)
  }, [])

  const {
    filters,
    filteredTransactions,
    isFiltered,
    updateFilter,
    resetFilters,
    filteredCount,
  } = useTransactionFilters(transactions)

  const {
    query,
    setQuery,
    clearSearch,
    results,
    hasQuery,
    hasResults,
  } = useSearch(filteredTransactions, {
    fields: TRANSACTION_SEARCH_FIELDS,
    debounceMs: 300,
  })

  const {
    data: paginatedTransactions,
    page,
    pageSize,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    setPage,
    setPageSize,
  } = usePagination(results)

  const showNoResults = (hasQuery || isFiltered) && !hasResults

  const handleExportCsv = useCallback(() => {
    if (results.length === 0) {
      toast.error('No transactions to export')
      return
    }

    try {
      const { filename, rowCount } = exportTransactionsToCsv(results)
      toast.success(`Downloaded ${filename} (${rowCount} records)`)
    } catch {
      toast.error('Failed to export CSV')
    }
  }, [results])

  const handleClearFilters = useCallback(() => {
    resetFilters()
    clearSearch()
  }, [resetFilters, clearSearch])

  const description = (() => {
    const parts = []

    if (isFiltered) {
      parts.push(`${filteredCount} filtered`)
    }

    if (hasQuery) {
      parts.push(`${results.length} matching search`)
    }

    if (parts.length > 0) {
      return `${parts.join(' · ')} of ${transactions.length} transactions`
    }

    return `${transactions.length} transactions across all accounts`
  })()

  return (
    <PageContainer>
      <PageHeader title="Transactions" description={description} />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          {isLoading ? (
            <TransactionsSkeleton />
          ) : (
            <>
              <TransactionsToolbar
                query={query}
                onQueryChange={(e) => setQuery(e.target.value)}
                onClearSearch={clearSearch}
                filters={filters}
                onFilterChange={updateFilter}
                onResetFilters={resetFilters}
                onExport={handleExportCsv}
                exportDisabled={results.length === 0}
              />

              <div className="mt-6">
                <TransactionsTable
                  transactions={paginatedTransactions}
                  searchQuery={query}
                  showNoResults={showNoResults}
                  noResultsMessage={
                    hasQuery
                      ? `No transactions match "${query}". Try a different search term.`
                      : 'No transactions match the applied filters. Try adjusting your filters.'
                  }
                  onViewDetails={handleViewDetails}
                  onClearFilters={handleClearFilters}
                />
              </div>

              <TransactionDetailsModal
                transaction={selectedTransaction}
                isOpen={isDetailsOpen}
                onClose={handleCloseDetails}
              />

              {!showNoResults && totalItems > 0 && (
                <div className="mt-4 rounded-2xl border border-border bg-surface px-3 py-3 sm:px-4">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    totalItems={totalItems}
                    pageSize={pageSize}
                    onPageSizeChange={setPageSize}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    showRangeInfo
                    showGoToPage
                    showRowsPerPage
                    showPageInfo={false}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </PageContainer>
  )
}

export default TransactionsPage
