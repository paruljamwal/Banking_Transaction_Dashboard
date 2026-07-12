import { createContext, useContext, useMemo } from 'react'
import { useSidebar } from '@hooks/useSidebar'

const SidebarContext = createContext(null)

export function SidebarProvider({ children }) {
  const sidebar = useSidebar()
  const value = useMemo(() => sidebar, [sidebar])

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}

export function useSidebarContext() {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider')
  }

  return context
}
