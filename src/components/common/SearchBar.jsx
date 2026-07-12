import { FiSearch, FiX } from 'react-icons/fi'
import { cn } from '@utils/cn'
import { UI_SIZES } from '@constants/ui'

function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  size = 'md',
  className,
  disabled = false,
  ariaLabel = 'Search',
  ...props
}) {
  const hasValue = Boolean(value)

  const handleClear = () => {
    onChange?.({ target: { value: '' } })
    onClear?.()
  }

  return (
    <div className={cn('relative w-full', className)}>
      <FiSearch
        className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />

      <input
        type="text"
        role="searchbox"
        enterKeyHint="search"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={cn(
          'w-full rounded-2xl border border-border bg-surface pr-10 pl-10 text-text',
          'placeholder:text-muted transition-all duration-200',
          'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          UI_SIZES.input[size],
        )}
        {...props}
      />

      {hasValue && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-0.5 text-muted transition-colors hover:bg-bg hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          <FiX className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default SearchBar
