import { useId } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { cn } from '@utils/cn'
import { UI_SIZES } from '@constants/ui'

function Select({
  label,
  hint,
  error,
  size = 'md',
  options = [],
  placeholder = 'Select an option',
  className,
  wrapperClassName,
  id: externalId,
  required,
  disabled,
  value,
  onChange,
  ...props
}) {
  const generatedId = useId()
  const selectId = externalId || generatedId
  const hintId = hint ? `${selectId}-hint` : undefined
  const errorId = error ? `${selectId}-error` : undefined

  return (
    <div className={cn('flex w-full flex-col gap-1.5', wrapperClassName)}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-text">
          {label}
          {required && (
            <span className="ml-0.5 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            [errorId, hintId].filter(Boolean).join(' ') || undefined
          }
          className={cn(
            'w-full appearance-none rounded-2xl border bg-surface pr-10 text-text transition-all duration-200',
            'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-border',
            UI_SIZES.input[size],
            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <FiChevronDown
          className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
      </div>

      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}

      {hint && !error && (
        <p id={hintId} className="text-xs text-muted">
          {hint}
        </p>
      )}
    </div>
  )
}

export default Select
