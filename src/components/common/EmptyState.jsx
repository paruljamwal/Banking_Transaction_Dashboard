import { cn } from '@utils/cn'

const VARIANT_STYLES = {
  default: {
    icon: 'bg-bg text-muted',
    title: 'text-text',
    description: 'text-text-secondary',
  },
  'no-results': {
    icon: 'bg-amber-50 text-amber-600',
    title: 'text-text',
    description: 'text-text-secondary',
  },
  empty: {
    icon: 'bg-primary-50 text-primary-600',
    title: 'text-text',
    description: 'text-text-secondary',
  },
}

function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  size = 'md',
  variant = 'default',
}) {
  const sizeStyles = {
    sm: {
      wrapper: 'py-8 px-4',
      icon: 'h-10 w-10',
      title: 'text-base',
      description: 'text-xs leading-relaxed',
    },
    md: {
      wrapper: 'py-12 px-6',
      icon: 'h-12 w-12',
      title: 'text-lg',
      description: 'text-sm leading-relaxed',
    },
    lg: {
      wrapper: 'py-16 px-6',
      icon: 'h-16 w-16',
      title: 'text-xl',
      description: 'text-base leading-relaxed',
    },
  }

  const styles = sizeStyles[size]
  const variantStyle = VARIANT_STYLES[variant] || VARIANT_STYLES.default

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center animate-fade-in',
        styles.wrapper,
        className,
      )}
      role="status"
    >
      {icon && (
        <div className="mb-5 flex flex-col items-center">
          <div
            className={cn(
              'flex items-center justify-center rounded-2xl ring-1 transition-transform duration-200',
              styles.icon,
              variantStyle.icon,
            )}
            aria-hidden="true"
          >
            {icon}
          </div>
          <div
            className="mt-3 flex h-1.5 items-center justify-center gap-1.5 opacity-30"
            aria-hidden="true"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current text-muted" />
            <span className="h-1.5 w-10 rounded-full bg-current text-muted" />
            <span className="h-1.5 w-1.5 rounded-full bg-current text-muted" />
          </div>
        </div>
      )}

      {title && (
        <h3
          className={cn(
            'font-semibold tracking-tight',
            styles.title,
            variantStyle.title,
          )}
        >
          {title}
        </h3>
      )}

      {description && (
        <p
          className={cn(
            'mt-2 max-w-md',
            styles.description,
            variantStyle.description,
          )}
        >
          {description}
        </p>
      )}

      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

export default EmptyState
