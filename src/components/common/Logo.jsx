import { cn } from '@utils/cn'
import { APP_NAME, APP_TAGLINE } from '@constants/routes'

function Logo({ collapsed = false, className }) {
  return (
    <div className={cn('flex min-w-0 items-center gap-3', className)}>
      <div
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl',
          'bg-gradient-to-br from-primary-500 to-primary-700',
          'text-sm font-bold text-white shadow-sm ring-1 ring-primary-400/30',
        )}
      >
        KT
      </div>
      {!collapsed && (
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight text-text">
            {APP_NAME}
          </p>
          <p className="truncate text-[11px] text-text-secondary">{APP_TAGLINE}</p>
        </div>
      )}
    </div>
  )
}

export default Logo
