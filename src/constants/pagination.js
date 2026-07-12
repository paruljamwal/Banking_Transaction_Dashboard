export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  MIN_PAGE_SIZE: 5,
  MAX_PAGE_SIZE: 100,
}

export const PAGE_SIZE_OPTIONS = [
  { label: '5 per page', value: 5 },
  { label: '10 per page', value: 10 },
  { label: '25 per page', value: 25 },
  { label: '50 per page', value: 50 },
  { label: '100 per page', value: 100 },
]

export const PAGINATION_LABELS = {
  PREVIOUS: 'Previous',
  NEXT: 'Next',
  PAGE_INFO: 'Page {current} of {total}',
}
