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
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={cn(
          'flex items-center gap-2 rounded-2xl border border-border bg-surface py-1.5 pr-2 pl-1.5',
          'transition-all duration-200 hover:border-primary-200 hover:shadow-sm',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
        )}
      >
        <Avatar name={user.name} size="sm" />
        <div className="hidden text-left md:block">
          <p className="max-w-[120px] truncate text-sm font-medium text-text">
            {user.name}
          </p>
          <p className="max-w-[120px] truncate text-xs text-text-secondary">
            {user.role}
          </p>
        </div>
        <FiChevronDown
          className={cn(
            'hidden h-4 w-4 text-muted transition-transform duration-200 md:block',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute top-full right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-border bg-surface px-4 py-3 shadow-lg"
        >
          <p className="text-sm font-semibold text-text">{user.name}</p>
          <p className="mt-0.5 text-xs text-text-secondary">{user.email}</p>
          <p className="mt-1 text-xs text-muted">{user.role}</p>
        </div>
      )}
    </div>
  )
}

export { getInitials }
export default UserDropdown
