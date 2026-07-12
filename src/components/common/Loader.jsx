import { cn } from '@utils/cn'
import { UI_SIZES } from '@constants/ui'

function Loader({
  size = 'md',
  label = 'Loading',
  showLabel = true,
  className,
  fullScreen = false,
}) {
  const spinner = (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={cn('inline-flex flex-col items-center gap-3', className)}
    >
      <span
        className={cn(
          'animate-spin rounded-full border-2 border-primary-200 border-t-primary-600',
          UI_SIZES.loader[size],
        )}
        aria-hidden="true"
      />
      {showLabel && label && (
        <span className="text-sm font-medium text-text-secondary">{label}</span>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay">
        <div className="rounded-xl border border-border bg-surface px-8 py-6 shadow-lg">
          {spinner}
        </div>
      </div>
    )
  }

  return spinner
}

export default Loader
