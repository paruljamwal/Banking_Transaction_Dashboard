import { FiDownload } from 'react-icons/fi'
import SearchBar from '@components/common/SearchBar'
import Button from '@components/common/Button'
import Input from '@components/common/Input'
import Select from '@components/common/Select'
import Card from '@components/common/Card'
import { TRANSACTION_TYPE_FILTER_OPTIONS } from '@constants/filters'
import { cn } from '@utils/cn'

function ToolbarSection({ label, children, className }) {
  return (
    <div className={cn('flex min-w-0 flex-col gap-1', className)}>
      <span className="text-[11px] font-medium tracking-wide text-muted uppercase">
        {label}
      </span>
      {children}
    </div>
  )
}

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
  const controlClassName = 'h-8 rounded-xl text-sm'

  return (
    <Card padding="sm" className={cn('px-3 py-3 sm:px-4', className)}>
      <div
        className={cn(
          'grid grid-cols-1 items-end gap-3',
          'md:grid-cols-2 md:gap-3',
          'xl:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1.8fr)_auto] xl:gap-3',
        )}
      >
        <ToolbarSection label="Search" className="md:col-span-2 xl:col-span-1">
          <SearchBar
            value={query}
            onChange={onQueryChange}
            onClear={onClearSearch}
            size="sm"
            placeholder="Search transactions, customers, IDs..."
            className="w-full"
            ariaLabel="Search transactions"
          />
        </ToolbarSection>

        <ToolbarSection label="Date">
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="date"
              size="sm"
              value={filters.dateFrom}
              onChange={(e) => onFilterChange('dateFrom', e.target.value)}
              aria-label="Date from"
              className={controlClassName}
            />
            <Input
              type="date"
              size="sm"
              value={filters.dateTo}
              onChange={(e) => onFilterChange('dateTo', e.target.value)}
              aria-label="Date to"
              className={controlClassName}
            />
          </div>
        </ToolbarSection>

        <ToolbarSection label="Amount & Type">
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.15fr)] gap-2">
            <Input
              type="number"
              min="0"
              size="sm"
              placeholder="Min"
              value={filters.amountMin}
              onChange={(e) => onFilterChange('amountMin', e.target.value)}
              aria-label="Minimum amount"
              className={controlClassName}
            />
            <Input
              type="number"
              min="0"
              size="sm"
              placeholder="Max"
              value={filters.amountMax}
              onChange={(e) => onFilterChange('amountMax', e.target.value)}
              aria-label="Maximum amount"
              className={controlClassName}
            />
            <Select
              size="sm"
              value={filters.transactionType}
              onChange={(e) => onFilterChange('transactionType', e.target.value)}
              options={TRANSACTION_TYPE_FILTER_OPTIONS}
              placeholder=""
              aria-label="Transaction type"
              className={controlClassName}
            />
          </div>
        </ToolbarSection>

        <ToolbarSection
          label="Actions"
          className="md:col-span-2 xl:col-span-1 xl:justify-self-end [&>span]:invisible"
        >
          <div className="flex items-center justify-end gap-2">
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
        </ToolbarSection>
      </div>
    </Card>
  )
}

export default TransactionsToolbar
