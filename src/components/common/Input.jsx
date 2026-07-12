import { useId } from 'react'
import { cn } from '@utils/cn'
import { UI_SIZES } from '@constants/ui'

function Input({
  label,
  hint,
  error,
  size = 'md',
  className,
  wrapperClassName,
  leftIcon,
  rightIcon,
  id: externalId,
  required,
  disabled,
  ...props
}) {
  const generatedId = useId()
  const inputId = externalId || generatedId
  const hintId = hint ? `${inputId}-hint` : undefined
  const errorId = error ? `${inputId}-error` : undefined

  return (
    <div className={cn('flex w-full flex-col gap-1.5', wrapperClassName)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-text">
          {label}
          {required && (
            <span className="ml-0.5 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted">
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            [errorId, hintId].filter(Boolean).join(' ') || undefined
          }
          className={cn(
            'w-full rounded-lg border bg-surface text-text transition-colors duration-200',
            'placeholder:text-muted',
            'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-border',
            UI_SIZES.input[size],
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className,
          )}
          {...props}
        />

        {rightIcon && (
          <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted">
            {rightIcon}
          </span>
        )}
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

export default Input
