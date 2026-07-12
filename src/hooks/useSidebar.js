import { useState, useCallback } from 'react'
import { useIsDesktop } from '@hooks/useMediaQuery'

export function useSidebar() {
  const isDesktop = useIsDesktop()
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])
  const toggleCollapse = useCallback(
    () => setIsCollapsed((prev) => !prev),
    [],
  )

  const isVisible = isDesktop || isOpen

  return {
    isOpen,
    isCollapsed: isDesktop && isCollapsed,
    isDesktop,
    isVisible,
    open,
    close,
    toggle,
    toggleCollapse,
  }
}
