import { useState, useEffect } from 'react'
import { BREAKPOINTS } from '@constants/theme'

/**
 * @param {number} query - min-width breakpoint in pixels
 * @returns {boolean}
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(`(min-width: ${query}px)`).matches,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${query}px)`)
    const handler = (event) => setMatches(event.matches)

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}

export function useIsDesktop() {
  return useMediaQuery(BREAKPOINTS.LG)
}
