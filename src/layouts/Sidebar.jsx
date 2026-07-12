import { NavLink } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import Logo from '@components/common/Logo'
import { NAV_ITEMS } from '@constants/navigation'
import { useSidebarContext } from '@context/SidebarContext'
import { cn } from '@utils/cn'

function SidebarNavItem({ item, collapsed, onNavigate }) {
  const Icon = item.icon

  return (
    <NavLink
      to={item.path}
      onClick={onNavigate}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        cn(
          'group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium',
          'transition-all duration-200 ease-out',
          'text-sidebar-text hover:bg-sidebar-hover hover:text-text',
          isActive &&
            'bg-sidebar-active text-sidebar-text-active shadow-sm ring-1 ring-primary-100',
          collapsed && 'justify-center px-2.5',
        )
      }
    >
      <Icon
        className={cn(
          'h-[18px] w-[18px] shrink-0 transition-transform duration-200',
          'group-hover:scale-105',
        )}
        aria-hidden="true"
      />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </NavLink>
  )
}

function Sidebar() {
  const { isCollapsed, isDesktop, isVisible, close, toggleCollapse } =
    useSidebarContext()

  const handleNavigate = () => {
    if (!isDesktop) close()
  }

  const sidebarWidth = isCollapsed ? 'w-16' : 'w-[13.5rem]'

  return (
    <>
      {!isDesktop && isVisible && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-overlay backdrop-blur-[2px] lg:hidden"
          onClick={close}
        />
      )}

      <aside
        className={cn(
          'z-50 flex h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar',
          'transition-all duration-300 ease-in-out',
          sidebarWidth,
          !isDesktop && 'fixed top-0 left-0',
          !isDesktop && !isVisible && '-translate-x-full',
          !isDesktop && isVisible && 'translate-x-0',
          isDesktop && 'relative',
        )}
      >
        <div
          className={cn(
            'flex h-16 items-center border-b border-sidebar-border px-4',
            isCollapsed && 'justify-center px-2',
          )}
        >
          <Logo collapsed={isCollapsed} />
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
          {NAV_ITEMS.map((item) => (
            <SidebarNavItem
              key={item.id}
              item={item}
              collapsed={isCollapsed}
              onNavigate={handleNavigate}
            />
          ))}
        </nav>

        {isDesktop && (
          <div className="border-t border-sidebar-border p-3">
            <button
              type="button"
              onClick={toggleCollapse}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className={cn(
                'flex w-full items-center justify-center gap-2 rounded-2xl px-3 py-2.5',
                'text-sm text-sidebar-text transition-all duration-200',
                'hover:bg-sidebar-hover hover:text-text',
              )}
            >
              {isCollapsed ? (
                <FiChevronRight className="h-5 w-5" />
              ) : (
                <>
                  <FiChevronLeft className="h-5 w-5" />
                  <span>Collapse</span>
                </>
              )}
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

export default Sidebar
