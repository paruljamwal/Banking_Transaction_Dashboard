import { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { cn } from '@utils/cn'
import Button from '@components/common/Button'
import Select from '@components/common/Select'
import Input from '@components/common/Input'
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

    if (
      !Number.isNaN(pageNum) &&
      pageNum >= 1 &&
      pageNum <= totalPages
    ) {
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
      className={cn('flex flex-col gap-4', className)}
    >
      {(showRowsPerPage || showRangeInfo) && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          {showRowsPerPage && onPageSizeChange && (
            <Select
              label={PAGINATION_LABELS.ROWS_PER_PAGE}
              value={String(pageSize)}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              options={pageSizeSelectOptions}
              placeholder=""
              wrapperClassName="w-full sm:w-36"
            />
          )}

          {showRangeInfo && totalItems !== undefined && (
            <p className="text-sm text-text-secondary sm:pb-2">
              Showing{' '}
              <span className="font-medium text-text">{rangeStart}</span>-
              <span className="font-medium text-text">{rangeEnd}</span> of{' '}
              <span className="font-medium text-text">{totalItems}</span>{' '}
              records
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
        <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
          {showPageInfo && !showRangeInfo && (
            <p className="text-sm text-text-secondary">
              Page <span className="font-medium text-text">{currentPage}</span>{' '}
              of{' '}
              <span className="font-medium text-text">{totalPages}</span>
            </p>
          )}

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              aria-label="Previous page"
              disabled={!canGoPrev}
              onClick={() => onPageChange(currentPage - 1)}
              leftIcon={<FiChevronLeft className="h-4 w-4" />}
            >
              <span className="hidden sm:inline">{previousLabel}</span>
            </Button>

            <ul className="flex items-center gap-1">
              {pages.map((page, index) => {
                if (typeof page === 'string') {
                  return (
                    <li key={`${page}-${index}`}>
                      <span
                        className="px-2 text-sm text-muted"
                        aria-hidden="true"
                      >
                        ...
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
                          ? 'bg-primary-600 text-white'
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
            >
              <span className="hidden sm:inline">{nextLabel}</span>
            </Button>
          </div>
        </div>

        {showGoToPage && (
          <form
            className="flex w-full items-end gap-2 sm:w-auto"
            onSubmit={(e) => {
              e.preventDefault()
              handleGoToPage()
            }}
          >
            <Input
              label={PAGINATION_LABELS.GO_TO_PAGE}
              type="number"
              min="1"
              max={totalPages}
              value={goToValue}
              onChange={(e) => setGoToValue(e.target.value)}
              placeholder={String(currentPage)}
              wrapperClassName="w-full sm:w-24"
              aria-label={PAGINATION_LABELS.GO_TO_PAGE}
            />
            <Button type="submit" variant="secondary" size="md" className="mb-0.5">
              {PAGINATION_LABELS.GO}
            </Button>
          </form>
        )}
      </div>
    </nav>
  )
}

export default Pagination
