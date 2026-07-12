import { FiFilter, FiX } from 'react-icons/fi'
import Card from '@components/common/Card'
import Select from '@components/common/Select'
import Input from '@components/common/Input'
import Button from '@components/common/Button'
import Badge from '@components/common/Badge'
import {
  TRANSACTION_TYPE_FILTER_OPTIONS,
  TRANSACTION_STATUS_FILTER_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
} from '@constants/filters'

function ActiveFilterChips({ chips, onRemove }) {
  if (!chips.length) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-text-secondary">Active:</span>
      {chips.map((chip) => (
        <Badge
          key={chip.key}
          variant="primary"
          size="sm"
          className="gap-1 pr-1"
        >
          {chip.label}
          <button
            type="button"
            onClick={() => onRemove(chip.field)}
            aria-label={`Remove ${chip.label} filter`}
            className="ml-1 rounded-full p-0.5 transition-colors hover:bg-primary-100"
          >
            <FiX className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  )
}

function TransactionFilters({
  filters,
  activeChips,
  filteredCount,
  totalCount,
  isFiltered,
  onFilterChange,
  onApply,
  onReset,
  onRemoveChip,
}) {
  return (
    <Card padding="md" className="space-y-4 md:space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <FiFilter className="h-4 w-4 text-primary-600" aria-hidden="true" />
          <h3 className="text-sm font-semibold tracking-tight text-text md:text-base">
            Filters
          </h3>
        </div>
        <p className="text-xs text-text-secondary md:text-sm">
          {isFiltered
            ? `${filteredCount} of ${totalCount} records`
            : `${totalCount} records`}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-5">
        <Input
          label="Date From"
          type="date"
          value={filters.dateFrom}
          onChange={(e) => onFilterChange('dateFrom', e.target.value)}
        />
        <Input
          label="Date To"
          type="date"
          value={filters.dateTo}
          onChange={(e) => onFilterChange('dateTo', e.target.value)}
        />
        <Select
          label="Transaction Type"
          value={filters.transactionType}
          onChange={(e) => onFilterChange('transactionType', e.target.value)}
          options={TRANSACTION_TYPE_FILTER_OPTIONS}
          placeholder=""
        />
        <Select
          label="Status"
          value={filters.status}
          onChange={(e) => onFilterChange('status', e.target.value)}
          options={TRANSACTION_STATUS_FILTER_OPTIONS}
          placeholder=""
        />
        <Select
          label="Payment Method"
          value={filters.paymentMethod}
          onChange={(e) => onFilterChange('paymentMethod', e.target.value)}
          options={PAYMENT_METHOD_OPTIONS}
          placeholder=""
        />
        <Input
          label="Min Amount"
          type="number"
          min="0"
          placeholder="0"
          value={filters.amountMin}
          onChange={(e) => onFilterChange('amountMin', e.target.value)}
        />
        <Input
          label="Max Amount"
          type="number"
          min="0"
          placeholder="Any"
          value={filters.amountMax}
          onChange={(e) => onFilterChange('amountMax', e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ActiveFilterChips chips={activeChips} onRemove={onRemoveChip} />
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onReset}>
            Reset Filters
          </Button>
          <Button variant="primary" size="sm" onClick={onApply}>
            Apply Filters
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default TransactionFilters
