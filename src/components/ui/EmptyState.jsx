import { cn } from '@utils/cn'

function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  size = 'md',
}) {
  const sizeStyles = {
    sm: {
      wrapper: 'py-8',
      icon: 'h-10 w-10',
      title: 'text-base',
      description: 'text-xs',
    },
    md: {
      wrapper: 'py-12',
      icon: 'h-12 w-12',
      title: 'text-lg',
      description: 'text-sm',
    },
    lg: {
      wrapper: 'py-16',
      icon: 'h-16 w-16',
      title: 'text-xl',
      description: 'text-base',
    },
  }

  const styles = sizeStyles[size]

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center px-4 text-center',
        styles.wrapper,
        className,
      )}
    >
      {icon && (
        <div
          className={cn(
            'mb-4 flex items-center justify-center rounded-full bg-bg text-muted',
            styles.icon,
          )}
          aria-hidden="true"
        >
          {icon}
        </div>
      )}

      {title && (
        <h3 className={cn('font-semibold text-text', styles.title)}>{title}</h3>
      )}

      {description && (
        <p
          className={cn(
            'mt-2 max-w-sm text-text-secondary',
            styles.description,
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
