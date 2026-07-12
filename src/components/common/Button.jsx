import { cn } from '@utils/cn'
import { BUTTON_VARIANTS, UI_SIZES } from '@constants/ui'

function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className,
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  ...props
}) {
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        BUTTON_VARIANTS[variant],
        UI_SIZES.button[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {loading && (
        <span
          className={cn(
            'animate-spin rounded-full border-2 border-current border-t-transparent',
            UI_SIZES.loader.sm,
          )}
          aria-hidden="true"
        />
      )}
      {!loading && leftIcon && (
        <span className="shrink-0" aria-hidden="true">
          {leftIcon}
        </span>
      )}
      <span>{children}</span>
      {!loading && rightIcon && (
        <span className="shrink-0" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  )
}

export default Button
