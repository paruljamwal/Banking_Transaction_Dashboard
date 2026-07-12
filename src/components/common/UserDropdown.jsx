import { useState, useRef, useEffect } from 'react'
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
          'flex h-9 items-center gap-2 rounded-xl px-2',
          'text-text transition-colors duration-200',
          'hover:bg-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          isOpen && 'bg-bg',
        )}
      >
        <Avatar name={user.name} size="sm" />
        <span className="hidden text-sm font-medium md:inline">{user.name}</span>
      </button>

      {isOpen && (
        <div
          role="menu"
          className={cn(
            'absolute top-[calc(100%+0.375rem)] right-0 z-50 w-52',
            'rounded-xl border border-border bg-surface px-3.5 py-3 shadow-lg',
          )}
        >
          <p className="truncate text-sm font-medium text-text">{user.name}</p>
          <p className="mt-0.5 truncate text-xs text-text-secondary">{user.email}</p>
        </div>
      )}
    </div>
  )
}

export { getInitials }
export default UserDropdown
