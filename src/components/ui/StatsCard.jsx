import { FiTrendingDown, FiTrendingUp, FiMinus } from 'react-icons/fi'
import { cn } from '@utils/cn'
import Card from '@components/ui/Card'

const TREND_CONFIG = {
  up: {
    icon: FiTrendingUp,
    className: 'text-emerald-600 bg-emerald-50',
    label: 'Increased',
  },
  down: {
    icon: FiTrendingDown,
    className: 'text-red-600 bg-red-50',
    label: 'Decreased',
  },
  neutral: {
    icon: FiMinus,
    className: 'text-muted bg-bg',
    label: 'No change',
  },
}

function StatsCard({
  title,
  value,
  change,
  trend = 'neutral',
  icon,
  footer,
  className,
  loading = false,
}) {
  const trendConfig = TREND_CONFIG[trend] || TREND_CONFIG.neutral
  const TrendIcon = trendConfig.icon

  return (
    <Card padding="md" hoverable className={cn('relative overflow-hidden', className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-text-secondary">
            {title}
          </p>

          {loading ? (
            <div className="mt-2 h-8 w-24 animate-pulse rounded-md bg-bg" />
          ) : (
            <p className="mt-2 truncate text-2xl font-bold tracking-tight text-text sm:text-3xl">
              {value}
            </p>
          )}

          {change && !loading && (
            <div className="mt-3 flex items-center gap-2">
              <span
                className={cn(
                  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                  trendConfig.className,
                )}
                aria-label={`${trendConfig.label}: ${change}`}
              >
                <TrendIcon className="h-3 w-3" aria-hidden="true" />
                {change}
              </span>
            </div>
          )}
        </div>

        {icon && (
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600"
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
      </div>

      {footer && (
        <div className="mt-4 border-t border-border pt-4 text-xs text-muted">
          {footer}
        </div>
      )}
    </Card>
  )
}

export default StatsCard
