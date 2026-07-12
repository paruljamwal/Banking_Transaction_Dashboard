import { cn } from '@utils/cn'

const SIZE_STYLES = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
}

const VARIANT_STYLES = {
  primary: 'bg-primary-50 text-primary-600 ring-1 ring-primary-100',
  neutral: 'bg-bg text-text-secondary ring-1 ring-border',
  success: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
  warning: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
  danger: 'bg-red-50 text-red-700 ring-1 ring-red-100',
}

/**
 * @param {string} name
 */
export function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function Avatar({
  name,
  initials,
  size = 'md',
  variant = 'primary',
  className,
}) {
  const displayInitials = initials || getInitials(name)

  return (
    <div
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-semibold',
        SIZE_STYLES[size],
        VARIANT_STYLES[variant],
        className,
      )}
      title={name}
      aria-hidden={!name}
    >
      {displayInitials}
    </div>
  )
}

export default Avatar
