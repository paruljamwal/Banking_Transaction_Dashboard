import { useState, useMemo, useCallback } from 'react'
import { PAGINATION } from '@constants/pagination'
import { paginateData } from '@utils/paginateData'

/**
 * @param {unknown[]} data
 * @param {{ initialPage?: number, initialPageSize?: number }} [options]
 */
export function usePagination(data = [], options = {}) {
  const [page, setPage] = useState(
    options.initialPage || PAGINATION.DEFAULT_PAGE,
  )
  const [pageSize, setPageSize] = useState(
    options.initialPageSize || PAGINATION.DEFAULT_PAGE_SIZE,
  )

  const pagination = useMemo(
    () => paginateData(data, { page, pageSize }),
    [data, page, pageSize],
  )

  const goToPage = useCallback(
    (nextPage) => {
      setPage(Math.max(1, Math.min(nextPage, pagination.totalPages)))
    },
    [pagination.totalPages],
  )

  const nextPage = useCallback(() => {
    if (pagination.hasNextPage) setPage((prev) => prev + 1)
  }, [pagination.hasNextPage])

  const prevPage = useCallback(() => {
    if (pagination.hasPrevPage) setPage((prev) => prev - 1)
  }, [pagination.hasPrevPage])

  const resetPage = useCallback(() => {
    setPage(PAGINATION.DEFAULT_PAGE)
  }, [])

  const changePageSize = useCallback((size) => {
    setPageSize(size)
    setPage(PAGINATION.DEFAULT_PAGE)
  }, [])

  return {
    ...pagination,
    pageSize,
    setPage: goToPage,
    setPageSize: changePageSize,
    nextPage,
    prevPage,
    resetPage,
  }
}
