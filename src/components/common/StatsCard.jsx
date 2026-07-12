import { FiTrendingDown, FiTrendingUp, FiMinus } from 'react-icons/fi'
import { cn } from '@utils/cn'
import Card from '@components/common/Card'
import Skeleton from '@components/common/Skeleton'

const TREND_STYLES = {
  up: {
    icon: FiTrendingUp,
    className: 'text-emerald-700 bg-emerald-500/10',
    label: 'Increased',
  },
  down: {
    icon: FiTrendingDown,
    className: 'text-red-600 bg-red-500/10',
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
  description,
  icon,
  className,
  loading = false,
}) {
  const trendStyle = TREND_STYLES[trend] || TREND_STYLES.neutral
  const TrendIcon = trendStyle.icon

  return (
    <Card
      padding="sm"
      className={cn('flex h-full flex-col px-4 py-4 sm:px-5', className)}
    >
      {loading ? (
        <div className="space-y-3" aria-hidden="true">
          <div className="flex items-center justify-between gap-3">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-9 w-9 rounded-lg" />
          </div>
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-5 w-32 rounded-md" />
          <Skeleton className="h-3 w-full" />
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs font-medium tracking-wide text-muted uppercase">
              {title}
            </p>
            {icon && (
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bg text-text-secondary ring-1 ring-border"
                aria-hidden="true"
              >
                {icon}
              </div>
            )}
          </div>

          <p className="mt-3 text-2xl font-bold tracking-tight text-text tabular-nums">
            {value}
          </p>

          {change && (
            <div className="mt-2.5 flex min-h-[1.375rem] items-center">
              <span
                className={cn(
                  'inline-flex max-w-full items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold leading-none',
                  trendStyle.className,
                )}
                aria-label={`${trendStyle.label}: ${change}`}
              >
                <TrendIcon className="h-3 w-3 shrink-0" aria-hidden="true" />
                <span className="truncate">{change}</span>
              </span>
            </div>
          )}

          {description && (
            <p className="mt-auto pt-3 text-xs leading-snug text-muted">
              {description}
            </p>
          )}
        </>
      )}
    </Card>
  )
}

export default StatsCard
