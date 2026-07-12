import { cn } from '@utils/cn'
import { BADGE_VARIANTS, UI_SIZES } from '@constants/ui'

function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className,
  ...props
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        BADGE_VARIANTS[variant],
        UI_SIZES.badge[size],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-current"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}

export default Badge
