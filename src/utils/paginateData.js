import { PAGINATION } from '@constants/pagination'

/**
 * @param {unknown[]} data
 * @param {{ page?: number, pageSize?: number }} [options]
 */
export function paginateData(data, options = {}) {
  const page = Math.max(1, options.page || PAGINATION.DEFAULT_PAGE)
  const pageSize = Math.max(
    1,
    options.pageSize || PAGINATION.DEFAULT_PAGE_SIZE,
  )

  const totalItems = data.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const safePage = Math.min(page, totalPages)
  const startIndex = (safePage - 1) * pageSize
  const endIndex = startIndex + pageSize

  return {
    data: data.slice(startIndex, endIndex),
    page: safePage,
    pageSize,
    totalItems,
    totalPages,
    startIndex: totalItems === 0 ? 0 : startIndex + 1,
    endIndex: Math.min(endIndex, totalItems),
    hasNextPage: safePage < totalPages,
    hasPrevPage: safePage > 1,
  }
}
