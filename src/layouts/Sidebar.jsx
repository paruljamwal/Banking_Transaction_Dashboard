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
          'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200',
          'text-sidebar-text hover:bg-sidebar-hover hover:text-white',
          isActive && 'bg-sidebar-active text-sidebar-text-active shadow-sm',
          collapsed && 'justify-center px-2',
        )
      }
    >
      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
      {!collapsed && (
        <span className="truncate">{item.label}</span>
      )}
    </NavLink>
  )
}

function Sidebar() {
  const { isCollapsed, isDesktop, isVisible, close, toggleCollapse } =
    useSidebarContext()

  const handleNavigate = () => {
    if (!isDesktop) close()
  }

  const sidebarWidth = isCollapsed ? 'w-[4.5rem]' : 'w-64'

  return (
    <>
      {!isDesktop && isVisible && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-overlay lg:hidden"
          onClick={close}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 flex h-full flex-col bg-sidebar text-white transition-all duration-300',
          sidebarWidth,
          !isDesktop && !isVisible && '-translate-x-full',
          !isDesktop && isVisible && 'translate-x-0',
          isDesktop && 'relative z-auto translate-x-0',
        )}
      >
        <div
          className={cn(
            'flex h-16 items-center border-b border-white/10 px-4',
            isCollapsed && 'justify-center px-2',
          )}
        >
          <Logo collapsed={isCollapsed} />
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
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
          <div className="border-t border-white/10 p-3">
            <button
              type="button"
              onClick={toggleCollapse}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-sidebar-text transition-colors hover:bg-sidebar-hover hover:text-white"
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
