import { useState, useRef, useEffect } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import Avatar, { getInitials } from '@components/common/Avatar'
import { cn } from '@utils/cn'

function UserDropdown({ user }) {
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
          'flex h-9 max-w-[11.5rem] items-center gap-2 rounded-xl px-2',
          'text-text transition-colors duration-200',
          'hover:bg-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          isOpen && 'bg-bg ring-1 ring-border/70',
        )}
      >
        <Avatar name={user.name} size="sm" />
        <div className="hidden min-w-0 flex-1 text-left md:block">
          <p className="truncate text-sm leading-tight font-medium text-text">
            {user.name}
          </p>
          <p className="truncate text-[11px] leading-tight text-muted">
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
            'absolute top-[calc(100%+0.375rem)] right-0 z-50 w-56',
            'overflow-hidden rounded-xl border border-border bg-surface',
            'shadow-lg ring-1 ring-black/5',
          )}
        >
          <div className="border-b border-border/80 px-3.5 py-3">
            <p className="truncate text-sm font-semibold text-text">{user.name}</p>
            <p className="mt-0.5 truncate text-xs text-text-secondary">
              {user.email}
            </p>
          </div>
          <div className="px-3.5 py-2.5">
            <p className="text-xs text-muted">{user.role}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export { getInitials }
export default UserDropdown
