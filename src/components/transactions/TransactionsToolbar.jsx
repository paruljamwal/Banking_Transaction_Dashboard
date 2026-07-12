import { FiDownload } from 'react-icons/fi'
import SearchBar from '@components/common/SearchBar'
import Button from '@components/common/Button'
import Input from '@components/common/Input'
import Select from '@components/common/Select'
import Card from '@components/common/Card'
import { TRANSACTION_TYPE_FILTER_OPTIONS } from '@constants/filters'
import { cn } from '@utils/cn'

function TransactionsToolbar({
  query,
  onQueryChange,
  onClearSearch,
  filters,
  onFilterChange,
  onResetFilters,
  onExport,
  exportDisabled,
  className,
}) {
  return (
    <Card padding="md" className={cn(className)}>
      <div className="flex flex-wrap items-end gap-3">
        <SearchBar
          value={query}
          onChange={onQueryChange}
          onClear={onClearSearch}
          placeholder="Search transactions, customers, IDs..."
          className="w-full min-w-[200px] flex-1 basis-full sm:basis-[220px] lg:max-w-sm"
          ariaLabel="Search transactions"
        />

        <Input
          label="From"
          type="date"
          size="sm"
          value={filters.dateFrom}
          onChange={(e) => onFilterChange('dateFrom', e.target.value)}
          wrapperClassName="w-full sm:w-[9.5rem]"
        />

        <Input
          label="To"
          type="date"
          size="sm"
          value={filters.dateTo}
          onChange={(e) => onFilterChange('dateTo', e.target.value)}
          wrapperClassName="w-full sm:w-[9.5rem]"
        />

        <Input
          label="Min"
          type="number"
          min="0"
          size="sm"
          placeholder="0"
          value={filters.amountMin}
          onChange={(e) => onFilterChange('amountMin', e.target.value)}
          wrapperClassName="w-full sm:w-[7.5rem]"
        />

        <Input
          label="Max"
          type="number"
          min="0"
          size="sm"
          placeholder="Any"
          value={filters.amountMax}
          onChange={(e) => onFilterChange('amountMax', e.target.value)}
          wrapperClassName="w-full sm:w-[7.5rem]"
        />

        <Select
          label="Type"
          size="sm"
          value={filters.transactionType}
          onChange={(e) => onFilterChange('transactionType', e.target.value)}
          options={TRANSACTION_TYPE_FILTER_OPTIONS}
          placeholder=""
          wrapperClassName="w-full sm:w-[8.5rem]"
        />

        <div className="flex w-full shrink-0 flex-wrap items-center gap-2 sm:ml-auto sm:w-auto">
          <Button variant="ghost" size="sm" onClick={onResetFilters}>
            Reset Filters
          </Button>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<FiDownload className="h-4 w-4" />}
            onClick={onExport}
            disabled={exportDisabled}
          >
            Export CSV
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default TransactionsToolbar
