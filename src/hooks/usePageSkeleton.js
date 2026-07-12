import { useState, useEffect } from 'react'

/**
 * Brief mount skeleton for perceived loading polish (UI only).
 * @param {number} [delayMs]
 */
export function usePageSkeleton(delayMs = 450) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), delayMs)
    return () => window.clearTimeout(timer)
  }, [delayMs])

  return isLoading
}
