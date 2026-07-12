import {
  FiTrendingUp,
  FiTrendingDown,
  FiAlertCircle,
  FiClock,
  FiXCircle,
} from 'react-icons/fi'
import Card from '@components/common/Card'
import { cn } from '@utils/cn'

const TONE_STYLES = {
  primary: 'text-primary-600',
  success: 'text-emerald-600',
  warning: 'text-amber-600',
  danger: 'text-red-600',
}

const ICONS = {
  'highest-today': FiTrendingUp,
  'largest-expense': FiTrendingDown,
  'largest-income': FiTrendingUp,
  'pending-approvals': FiClock,
  'failed-transactions': FiXCircle,
}

function SectionHeader({ title, description }) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold tracking-tight text-text">{title}</h3>
      <p className="mt-0.5 text-xs text-muted">{description}</p>
    </div>
  )
}

function DashboardQuickInsights({ insights = [] }) {
  return (
    <Card padding="sm" className="flex h-full flex-col px-4 py-4 sm:px-5">
      <SectionHeader
        title="Quick Insights"
        description="Key highlights from today's activity"
      />

      <div className="divide-y divide-border rounded-xl border border-border">
        {insights.map((insight) => {
          const Icon = ICONS[insight.id] || FiAlertCircle
          const tone = TONE_STYLES[insight.tone] || TONE_STYLES.primary

          return (
            <div
              key={insight.id}
              className="flex items-center gap-3 px-3 py-3 transition-colors hover:bg-bg/60 sm:px-4"
            >
              <div
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bg ring-1 ring-border',
                  tone,
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>

              <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted">{insight.label}</p>
                  <p className="mt-0.5 truncate text-sm text-text-secondary">
                    {insight.detail}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-bold tracking-tight text-text tabular-nums sm:text-base">
                  {insight.value}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default DashboardQuickInsights
