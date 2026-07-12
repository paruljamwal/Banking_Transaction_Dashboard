import PageContainer from '@components/common/PageContainer'
import PageHeader from '@components/common/PageHeader'
import SearchBar from '@components/common/SearchBar'
import { TransactionsTable, TransactionFilters } from '@components/transactions'
import { transactions } from '@data/transactions'
import { TRANSACTION_SEARCH_FIELDS } from '@constants/transactionSearch'
import { useSearch } from '@hooks/useSearch'
import { useTransactionFilters } from '@hooks/useTransactionFilters'

function TransactionsPage() {
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

  const showNoResults = (hasQuery || isFiltered) && !hasResults

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
        <SearchBar
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClear={clearSearch}
          placeholder="Search by customer, ID, account, payment method..."
          className="w-full sm:w-80"
          ariaLabel="Search transactions"
        />
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
          transactions={results}
          searchQuery={query}
          showNoResults={showNoResults}
          noResultsMessage={
            hasQuery
              ? `No transactions match "${query}". Try a different search term.`
              : 'No transactions match the applied filters. Try adjusting your filters.'
          }
        />
      </div>
    </PageContainer>
  )
}

export default TransactionsPage
