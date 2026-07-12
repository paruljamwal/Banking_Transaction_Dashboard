import { cn } from '@utils/cn'
import { APP_NAME } from '@constants/routes'

function Logo({ collapsed = false, className }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-primary-600 text-sm font-bold text-white shadow-sm">
        KT
      </div>
      {!collapsed && (
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-text">{APP_NAME}</p>
          <p className="truncate text-xs text-text-secondary">Dashboard</p>
        </div>
      )}
    </div>
  )
}

export default Logo
