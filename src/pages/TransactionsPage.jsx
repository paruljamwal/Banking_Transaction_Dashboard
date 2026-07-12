import { useState, useCallback } from 'react'
import { FiDownload } from 'react-icons/fi'
import toast from 'react-hot-toast'
import PageContainer from '@components/common/PageContainer'
import PageHeader from '@components/common/PageHeader'
import SearchBar from '@components/common/SearchBar'
import Button from '@components/common/Button'
import Card from '@components/common/Card'
import Pagination from '@components/common/Pagination'
import {
  TransactionsTable,
  TransactionFilters,
  TransactionDetailsModal,
} from '@components/transactions'
import { transactions } from '@data/transactions'
import { TRANSACTION_SEARCH_FIELDS } from '@constants/transactionSearch'
import { useSearch } from '@hooks/useSearch'
import { useTransactionFilters } from '@hooks/useTransactionFilters'
import { usePagination } from '@hooks/usePagination'
import { exportTransactionsToCsv } from '@utils/csvExport'

function TransactionsPage() {
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
    draftFilters,
    filteredTransactions,
    activeChips,
    isFiltered,
    updateDraftFilter,
    applyFilters,
    resetFilters,
    removeFilter,
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
      <PageHeader title="Transactions" description={description}>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <Button
            variant="secondary"
            size="md"
            leftIcon={<FiDownload className="h-4 w-4" />}
            onClick={handleExportCsv}
            disabled={results.length === 0}
          >
            <span className="hidden sm:inline">Export CSV</span>
            <span className="sm:hidden">Export</span>
          </Button>
          <SearchBar
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClear={clearSearch}
            placeholder="Search by customer, ID, account, payment method..."
            className="w-full sm:w-80"
            ariaLabel="Search transactions"
          />
        </div>
      </PageHeader>

      <div className="space-y-4">
        <TransactionFilters
          filters={draftFilters}
          activeChips={activeChips}
          filteredCount={filteredCount}
          totalCount={transactions.length}
          isFiltered={isFiltered}
          onFilterChange={updateDraftFilter}
          onApply={applyFilters}
          onReset={resetFilters}
          onRemoveChip={removeFilter}
        />

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
        />

        <TransactionDetailsModal
          transaction={selectedTransaction}
          isOpen={isDetailsOpen}
          onClose={handleCloseDetails}
        />

        {!showNoResults && totalItems > 0 && (
          <Card padding="md">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              totalItems={totalItems}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
              startIndex={startIndex}
              endIndex={endIndex}
              showRowsPerPage
              showRangeInfo
              showGoToPage
              showPageInfo={false}
            />
          </Card>
        )}
      </div>
    </PageContainer>
  )
}

export default TransactionsPage
