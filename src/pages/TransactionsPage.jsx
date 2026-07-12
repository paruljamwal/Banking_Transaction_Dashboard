import PageContainer from '@components/common/PageContainer'
import PageHeader from '@components/common/PageHeader'
import SearchBar from '@components/common/SearchBar'
import { TransactionsTable } from '@components/transactions'
import { transactions } from '@data/transactions'
import { TRANSACTION_SEARCH_FIELDS } from '@constants/transactionSearch'
import { useSearch } from '@hooks/useSearch'

function TransactionsPage() {
  const {
    query,
    setQuery,
    clearSearch,
    results,
    hasQuery,
    hasResults,
    resultCount,
  } = useSearch(transactions, { fields: TRANSACTION_SEARCH_FIELDS, debounceMs: 300 })

  const description = hasQuery
    ? `Showing ${resultCount} of ${transactions.length} transactions`
    : `${transactions.length} transactions across all accounts`

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

      <TransactionsTable
        transactions={results}
        searchQuery={query}
        showNoResults={hasQuery && !hasResults}
      />
    </PageContainer>
  )
}

export default TransactionsPage
