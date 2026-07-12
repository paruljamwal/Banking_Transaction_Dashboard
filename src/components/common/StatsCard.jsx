import { FiTrendingDown, FiTrendingUp, FiMinus } from 'react-icons/fi'
import { cn } from '@utils/cn'
import Card from '@components/common/Card'
import Skeleton from '@components/common/Skeleton'

const TREND_STYLES = {
  up: {
    icon: FiTrendingUp,
    className: 'text-emerald-700 bg-emerald-50 ring-1 ring-emerald-100',
    label: 'Increased',
  },
  down: {
    icon: FiTrendingDown,
    className: 'text-red-700 bg-red-50 ring-1 ring-red-100',
    label: 'Decreased',
  },
  neutral: {
    icon: FiMinus,
    className: 'text-muted bg-bg ring-1 ring-border',
    label: 'No change',
  },
}

function StatsCard({
  title,
  value,
  change,
  trend = 'neutral',
  description,
  icon,
  iconClassName,
  className,
  loading = false,
}) {
  const trendStyle = TREND_STYLES[trend] || TREND_STYLES.neutral
  const TrendIcon = trendStyle.icon

  return (
    <Card padding="md" hoverable className={cn('relative overflow-hidden', className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          {loading ? (
            <div className="space-y-3" aria-hidden="true">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-3 w-40" />
            </div>
          ) : (
            <>
              <p className="text-sm font-medium text-text-secondary">{title}</p>
              <p className="mt-2 text-2xl font-bold tracking-tight text-text lg:text-[1.75rem]">
                {value}
              </p>
              {change && (
                <span
                  className={cn(
                    'mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
                    trendStyle.className,
                  )}
                  aria-label={`${trendStyle.label}: ${change}`}
                >
                  <TrendIcon className="h-3 w-3" aria-hidden="true" />
                  {change}
                </span>
              )}
              {description && (
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  {description}
                </p>
              )}
            </>
          )}
        </div>

        {icon && !loading && (
          <div
            className={cn(
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 ring-1 ring-primary-100',
              iconClassName,
            )}
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}

export default StatsCard
