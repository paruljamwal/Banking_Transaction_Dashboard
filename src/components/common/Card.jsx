import { cn } from '@utils/cn'

function Card({
  children,
  className,
  padding = 'md',
  hoverable = false,
  ...props
}) {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)]',
        paddingStyles[padding],
        hoverable &&
          'transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function CardHeader({ children, className, bordered = false }) {
  return (
    <div
      className={cn('mb-4', bordered && 'border-b border-border pb-4', className)}
    >
      {children}
    </div>
  )
}

function CardTitle({ children, className, as: Tag = 'h3' }) {
  return (
    <Tag className={cn('text-base font-semibold text-text', className)}>
      {children}
    </Tag>
  )
}

function CardDescription({ children, className }) {
  return (
    <p className={cn('mt-1 text-sm text-text-secondary', className)}>
      {children}
    </p>
  )
}

function CardBody({ children, className }) {
  return <div className={cn(className)}>{children}</div>
}

function CardFooter({ children, className, bordered = false }) {
  return (
    <div
      className={cn(
        'mt-4 flex flex-wrap items-center gap-3',
        bordered && 'border-t border-border pt-4',
        className,
      )}
    >
      {children}
    </div>
  )
}

Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Body = CardBody
Card.Footer = CardFooter

export default Card
