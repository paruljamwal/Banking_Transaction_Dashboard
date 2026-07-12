import { FiMenu, FiBell, FiSun, FiMoon, FiSearch } from 'react-icons/fi'
import IconButton from '@components/common/IconButton'
import { useSidebarContext } from '@context/SidebarContext'
import { useTheme } from '@hooks/useTheme'
import mockUser from '@data/mockUser.json'
import { cn } from '@utils/cn'

function UserMenu() {
  const { user } = mockUser
  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="flex items-center gap-3 border-l border-border pl-4">
      <div className="hidden text-right sm:block">
        <p className="text-sm font-medium text-text">{user.name}</p>
        <p className="text-xs text-text-secondary">{user.role}</p>
      </div>
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white"
        title={user.email}
      >
        {initials}
      </div>
    </div>
  )
}

function Navbar() {
  const { toggle, isDesktop } = useSidebarContext()
  const { isDark, toggleTheme } = useTheme()
  const { notifications } = mockUser

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b border-border bg-navbar px-4 shadow-sm md:px-6">
      {!isDesktop && (
        <IconButton label="Open menu" onClick={toggle}>
          <FiMenu className="h-5 w-5" />
        </IconButton>
      )}

      <div className="flex flex-1 items-center gap-4">
        <div className="relative hidden max-w-md flex-1 md:block">
          <FiSearch className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            placeholder="Search..."
            className={cn(
              'h-10 w-full rounded-lg border border-border bg-bg py-2 pr-4 pl-10 text-sm text-text',
              'placeholder:text-muted focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none',
            )}
            disabled
            aria-label="Search (coming soon)"
          />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <IconButton
          label="Toggle theme"
          onClick={toggleTheme}
          className="hidden sm:inline-flex"
        >
          {isDark ? (
            <FiSun className="h-5 w-5" />
          ) : (
            <FiMoon className="h-5 w-5" />
          )}
        </IconButton>

        <IconButton label="Notifications" badge={notifications.unreadCount}>
          <FiBell className="h-5 w-5" />
        </IconButton>

        <UserMenu />
      </div>
    </header>
  )
}

export default Navbar
