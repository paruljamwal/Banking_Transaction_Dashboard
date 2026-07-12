import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { FiMenu, FiBell, FiSun, FiMoon, FiSearch } from 'react-icons/fi'
import IconButton from '@components/common/IconButton'
import UserDropdown from '@components/common/UserDropdown'
import { useSidebarContext } from '@context/SidebarContext'
import { useTheme } from '@hooks/useTheme'
import mockUser from '@data/mockUser.json'
import { cn } from '@utils/cn'

function Navbar() {
  const { toggle, isDesktop } = useSidebarContext()
  const { isDark, toggleTheme } = useTheme()
  const { notifications, user } = mockUser
  const [isScrolled, setIsScrolled] = useState(false)
  const currentDate = format(new Date(), 'EEE, dd MMM yyyy')

  useEffect(() => {
    const main = document.querySelector('main')
    if (!main) return

    const handleScroll = () => setIsScrolled(main.scrollTop > 8)
    main.addEventListener('scroll', handleScroll, { passive: true })
    return () => main.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b px-4 transition-all duration-300 md:gap-4 md:px-6',
        isScrolled
          ? 'border-border/80 bg-navbar/90 shadow-sm backdrop-blur-md'
          : 'border-border bg-navbar/95 backdrop-blur-sm',
      )}
    >
      {!isDesktop && (
        <IconButton label="Open menu" onClick={toggle}>
          <FiMenu className="h-5 w-5" />
        </IconButton>
      )}

      <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-4">
        <div className="relative hidden min-w-0 flex-1 md:block lg:max-w-md">
          <FiSearch className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            placeholder="Search transactions, customers..."
            className={cn(
              'h-10 w-full rounded-2xl border border-border bg-bg/80 py-2 pr-4 pl-10 text-sm text-text',
              'placeholder:text-muted transition-all duration-200',
              'focus:border-primary-500 focus:bg-surface focus:ring-2 focus:ring-primary-500/15 focus:outline-none',
            )}
            aria-label="Global search"
          />
        </div>

        <p className="hidden shrink-0 text-xs font-medium text-text-secondary lg:block">
          {currentDate}
        </p>
      </div>

      <div className="flex items-center gap-0.5 sm:gap-1">
        <IconButton label="Toggle theme" onClick={toggleTheme}>
          {isDark ? (
            <FiSun className="h-[18px] w-[18px]" />
          ) : (
            <FiMoon className="h-[18px] w-[18px]" />
          )}
        </IconButton>

        <IconButton label="Notifications" badge={notifications.unreadCount}>
          <FiBell className="h-[18px] w-[18px]" />
        </IconButton>

        <UserDropdown user={user} />
      </div>
    </header>
  )
}

export default Navbar
