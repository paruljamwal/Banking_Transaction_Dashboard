export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  MIN_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
}

export const PAGE_SIZE_OPTIONS = [
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
]

export const PAGINATION_LABELS = {
  PREVIOUS: 'Previous',
  NEXT: 'Next',
  ROWS_PER_PAGE: 'Rows per page',
  GO_TO_PAGE: 'Go to page',
  GO: 'Go',
  SHOWING_RANGE: 'Showing {start}-{end} of {total} records',
}
