import { useState, useEffect } from 'react'
import { FiMenu, FiSun, FiMoon } from 'react-icons/fi'
import IconButton from '@components/common/IconButton'
import UserDropdown from '@components/common/UserDropdown'
import { useSidebarContext } from '@context/SidebarContext'
import { useTheme } from '@hooks/useTheme'
import mockUser from '@data/mockUser.json'
import { cn } from '@utils/cn'

function Navbar() {
  const { toggle, isDesktop } = useSidebarContext()
  const { isDark, toggleTheme } = useTheme()
  const { user } = mockUser
  const [isScrolled, setIsScrolled] = useState(false)

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
        'sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 overflow-visible border-b px-4 md:px-5',
        'transition-all duration-300',
        isScrolled
          ? 'border-border/80 bg-navbar/90 shadow-sm backdrop-blur-md'
          : 'border-border bg-navbar/95 backdrop-blur-sm',
      )}
    >
      {!isDesktop && (
        <IconButton label="Open menu" onClick={toggle} className="h-9 w-9 rounded-xl">
          <FiMenu className="h-5 w-5" />
        </IconButton>
      )}

      <div className="ml-auto flex items-center gap-2">
        <IconButton
          label="Toggle theme"
          onClick={toggleTheme}
          className="h-9 w-9 rounded-xl"
        >
          {isDark ? (
            <FiSun className="h-[18px] w-[18px]" />
          ) : (
            <FiMoon className="h-[18px] w-[18px]" />
          )}
        </IconButton>

        <span className="hidden h-5 w-px bg-border md:block" aria-hidden="true" />

        <UserDropdown user={user} />
      </div>
    </header>
  )
}

export default Navbar
