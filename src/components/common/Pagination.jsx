import { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { cn } from '@utils/cn'
import Button from '@components/common/Button'
import {
  PAGE_SIZE_OPTIONS,
  PAGINATION_LABELS,
} from '@constants/pagination'

function getPageRange(currentPage, totalPages, siblingCount = 1) {
  const totalNumbers = siblingCount * 2 + 3
  const totalBlocks = totalNumbers + 2

  if (totalPages <= totalBlocks) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1)
  const rightSibling = Math.min(currentPage + siblingCount, totalPages)
  const showLeftEllipsis = leftSibling > 2
  const showRightEllipsis = rightSibling < totalPages - 1
  const pages = []

  pages.push(1)

  if (showLeftEllipsis) {
    pages.push('ellipsis-left')
  } else {
    for (let i = 2; i < leftSibling; i += 1) pages.push(i)
  }

  for (let i = leftSibling; i <= rightSibling; i += 1) {
    if (i !== 1 && i !== totalPages) pages.push(i)
  }

  if (showRightEllipsis) {
    pages.push('ellipsis-right')
  } else {
    for (let i = rightSibling + 1; i < totalPages; i += 1) pages.push(i)
  }

  if (totalPages > 1) pages.push(totalPages)

  return pages
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  onPageSizeChange,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  startIndex,
  endIndex,
  showGoToPage = false,
  showRowsPerPage = false,
  showRangeInfo = false,
  siblingCount = 1,
  showPageInfo = true,
  previousLabel = PAGINATION_LABELS.PREVIOUS,
  nextLabel = PAGINATION_LABELS.NEXT,
  className,
}) {
  const [goToValue, setGoToValue] = useState('')

  if (totalPages <= 0) return null

  const pages = getPageRange(currentPage, totalPages, siblingCount)
  const canGoPrev = currentPage > 1
  const canGoNext = currentPage < totalPages

  const rangeStart = totalItems === 0 ? 0 : startIndex
  const rangeEnd = totalItems === 0 ? 0 : endIndex

  const handleGoToPage = () => {
    const pageNum = Number.parseInt(goToValue, 10)

    if (!Number.isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum)
      setGoToValue('')
    }
  }

  const pageSizeSelectOptions = pageSizeOptions.map((option) => ({
    value: String(option.value),
    label: option.label,
  }))

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        'flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {showRowsPerPage && onPageSizeChange && (
          <div className="flex items-center gap-2">
            <label
              htmlFor="pagination-page-size"
              className="shrink-0 text-xs font-medium text-muted"
            >
              Rows
            </label>
            <select
              id="pagination-page-size"
              value={String(pageSize)}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className={cn(
                'h-8 rounded-lg border border-border bg-surface px-2.5 text-sm text-text',
                'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/15 focus:outline-none',
              )}
            >
              {pageSizeSelectOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {showRangeInfo && totalItems !== undefined && (
          <p className="text-xs text-text-secondary">
            <span className="font-medium text-text">
              {rangeStart}–{rangeEnd}
            </span>{' '}
            of{' '}
            <span className="font-medium text-text">{totalItems}</span>
          </p>
        )}

        {showPageInfo && !showRangeInfo && (
          <p className="text-xs text-text-secondary">
            Page{' '}
            <span className="font-medium text-text">{currentPage}</span> of{' '}
            <span className="font-medium text-text">{totalPages}</span>
          </p>
        )}
      </div>

      <div className="flex items-center justify-center gap-0.5">
        <Button
          variant="ghost"
          size="sm"
          aria-label="Previous page"
          disabled={!canGoPrev}
          onClick={() => onPageChange(currentPage - 1)}
          leftIcon={<FiChevronLeft className="h-4 w-4" />}
          className="h-8 px-2"
        >
          <span className="hidden sm:inline">{previousLabel}</span>
        </Button>

        <ul className="flex items-center gap-0.5">
          {pages.map((page, index) => {
            if (typeof page === 'string') {
              return (
                <li key={`${page}-${index}`}>
                  <span className="px-1.5 text-xs text-muted" aria-hidden="true">
                    …
                  </span>
                </li>
              )
            }

            const isActive = page === currentPage

            return (
              <li key={page}>
                <button
                  type="button"
                  onClick={() => onPageChange(page)}
                  aria-label={`Page ${page}`}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm font-medium transition-colors',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                    isActive
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-text-secondary hover:bg-bg hover:text-text',
                  )}
                >
                  {page}
                </button>
              </li>
            )
          })}
        </ul>

        <Button
          variant="ghost"
          size="sm"
          aria-label="Next page"
          disabled={!canGoNext}
          onClick={() => onPageChange(currentPage + 1)}
          rightIcon={<FiChevronRight className="h-4 w-4" />}
          className="h-8 px-2"
        >
          <span className="hidden sm:inline">{nextLabel}</span>
        </Button>
      </div>

      {showGoToPage && (
        <form
          className="flex items-center justify-end gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            handleGoToPage()
          }}
        >
          <label
            htmlFor="pagination-go-to"
            className="shrink-0 text-xs font-medium text-muted"
          >
            Go to
          </label>
          <input
            id="pagination-go-to"
            type="number"
            min="1"
            max={totalPages}
            value={goToValue}
            onChange={(e) => setGoToValue(e.target.value)}
            placeholder={String(currentPage)}
            aria-label={PAGINATION_LABELS.GO_TO_PAGE}
            className={cn(
              'h-8 w-14 rounded-lg border border-border bg-surface px-2 text-center text-sm text-text',
              'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/15 focus:outline-none',
            )}
          />
          <Button type="submit" variant="secondary" size="sm" className="h-8">
            {PAGINATION_LABELS.GO}
          </Button>
        </form>
      )}
    </nav>
  )
}

export default Pagination
