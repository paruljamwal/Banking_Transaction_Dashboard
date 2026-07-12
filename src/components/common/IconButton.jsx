import { cn } from '@utils/cn'

function IconButton({
  children,
  label,
  onClick,
  className,
  badge,
  active = false,
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'relative inline-flex h-10 w-10 items-center justify-center rounded-lg',
        'text-text-secondary transition-colors duration-200',
        'hover:bg-bg hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
        active && 'bg-primary-50 text-primary-600',
        className,
      )}
    >
      {children}
      {badge > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </button>
  )
}

export default IconButton
