import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { cn } from '@utils/cn'
import Button from '@components/ui/Button'

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
  siblingCount = 1,
  showPageInfo = true,
  className,
}) {
  if (totalPages <= 0) return null

  const pages = getPageRange(currentPage, totalPages, siblingCount)
  const canGoPrev = currentPage > 1
  const canGoNext = currentPage < totalPages

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        'flex flex-col items-center justify-between gap-4 sm:flex-row',
        className,
      )}
    >
      {showPageInfo && (
        <p className="text-sm text-text-secondary">
          Page <span className="font-medium text-text">{currentPage}</span> of{' '}
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
          <span className="hidden sm:inline">Prev</span>
        </Button>

        <ul className="flex items-center gap-1">
          {pages.map((page, index) => {
            if (typeof page === 'string') {
              return (
                <li key={`${page}-${index}`}>
                  <span className="px-2 text-sm text-muted" aria-hidden="true">
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
          <span className="hidden sm:inline">Next</span>
        </Button>
      </div>
    </nav>
  )
}

export default Pagination
