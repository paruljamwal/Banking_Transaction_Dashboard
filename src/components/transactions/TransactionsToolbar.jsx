import { FiDownload, FiFilter } from 'react-icons/fi'
import SearchBar from '@components/common/SearchBar'
import Button from '@components/common/Button'
import Select from '@components/common/Select'
import Card from '@components/common/Card'
import { PAGE_SIZE_OPTIONS } from '@constants/pagination'
import { cn } from '@utils/cn'

function TransactionsToolbar({
  query,
  onQueryChange,
  onClearSearch,
  filtersOpen,
  onToggleFilters,
  onExport,
  exportDisabled,
  pageSize,
  onPageSizeChange,
  className,
}) {
  const pageSizeOptions = PAGE_SIZE_OPTIONS.map((option) => ({
    value: String(option.value),
    label: `${option.label} rows`,
  }))

  return (
    <Card padding="md" className={cn('space-y-0', className)}>
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <SearchBar
          value={query}
          onChange={onQueryChange}
          onClear={onClearSearch}
          placeholder="Search transactions, customers, IDs..."
          className="w-full xl:max-w-md"
          ariaLabel="Search transactions"
        />

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={filtersOpen ? 'primary' : 'secondary'}
            size="md"
            leftIcon={<FiFilter className="h-4 w-4" />}
            onClick={onToggleFilters}
            className="rounded-2xl"
          >
            Filters
          </Button>

          <Button
            variant="secondary"
            size="md"
            leftIcon={<FiDownload className="h-4 w-4" />}
            onClick={onExport}
            disabled={exportDisabled}
            className="rounded-2xl"
          >
            <span className="hidden sm:inline">Export</span>
          </Button>

          <Select
            label="Rows"
            value={String(pageSize)}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            options={pageSizeOptions}
            placeholder=""
            wrapperClassName="w-full sm:w-36"
            className="rounded-2xl"
          />
        </div>
      </div>
    </Card>
  )
}

export default TransactionsToolbar
