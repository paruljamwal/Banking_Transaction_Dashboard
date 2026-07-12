import { useState, useRef, useEffect } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import Avatar, { getInitials } from '@components/common/Avatar'
import { cn } from '@utils/cn'

function UserDropdown({ user, organization }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={cn(
          'flex h-10 items-center gap-2.5 rounded-xl border px-2.5',
          'text-text transition-all duration-200',
          'border-transparent hover:border-border/60 hover:bg-bg',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          isOpen && 'border-border/70 bg-bg shadow-sm',
        )}
      >
        <Avatar name={user.name} size="sm" />
        <div className="hidden min-w-0 text-left md:block">
          <p className="text-sm leading-tight font-medium whitespace-nowrap text-text">
            {user.name}
          </p>
          <p className="text-[11px] leading-tight whitespace-nowrap text-muted">
            {user.role}
          </p>
        </div>
        <FiChevronDown
          className={cn(
            'hidden h-3.5 w-3.5 shrink-0 text-muted transition-transform duration-200 md:block',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className={cn(
            'absolute top-[calc(100%+0.5rem)] right-0 z-50 w-64',
            'overflow-hidden rounded-2xl border border-border bg-surface',
            'shadow-lg ring-1 ring-black/5',
          )}
        >
          <div className="border-b border-border/80 px-4 py-4">
            <div className="flex items-center gap-3">
              <Avatar name={user.name} size="md" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-text">{user.name}</p>
                <p className="mt-0.5 truncate text-xs text-text-secondary">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 px-4 py-3.5">
            <div className="flex flex-wrap gap-1.5">
              <span className="rounded-lg bg-primary-50 px-2 py-1 text-[11px] font-medium text-primary-700">
                {user.role}
              </span>
              <span className="rounded-lg bg-bg px-2 py-1 text-[11px] text-text-secondary ring-1 ring-border/80">
                {user.department}
              </span>
            </div>

            {organization && (
              <div className="rounded-xl bg-bg px-3 py-2.5 ring-1 ring-border/60">
                <p className="truncate text-xs font-medium text-text">
                  {organization.name}
                </p>
                <p className="mt-0.5 text-[11px] text-muted">{organization.branch}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export { getInitials }
export default UserDropdown
