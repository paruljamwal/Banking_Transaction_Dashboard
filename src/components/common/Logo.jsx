import { cn } from '@utils/cn'
import { APP_NAME } from '@constants/routes'

function Logo({ collapsed = false, className }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white shadow-md">
        KT
      </div>
      {!collapsed && (
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{APP_NAME}</p>
          <p className="truncate text-xs text-sidebar-text">Dashboard</p>
        </div>
      )}
    </div>
  )
}

export default Logo
