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
  primary: 'bg-primary-50 text-primary-600 ring-primary-100',
  success: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
  warning: 'bg-amber-50 text-amber-600 ring-amber-100',
  danger: 'bg-red-50 text-red-600 ring-red-100',
}

const ICONS = {
  'highest-today': FiTrendingUp,
  'largest-expense': FiTrendingDown,
  'largest-income': FiTrendingUp,
  'pending-approvals': FiClock,
  'failed-transactions': FiXCircle,
}

function DashboardQuickInsights({ insights = [] }) {
  return (
    <Card padding="md" className="h-full">
      <div className="mb-5">
        <h3 className="text-base font-semibold tracking-tight text-text md:text-lg">
          Quick Insights
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          Key highlights from today&apos;s banking activity
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {insights.map((insight) => {
          const Icon = ICONS[insight.id] || FiAlertCircle
          const tone = TONE_STYLES[insight.tone] || TONE_STYLES.primary

          return (
            <div
              key={insight.id}
              className={cn(
                'group rounded-2xl border border-border bg-bg/50 p-4',
                'transition-all duration-200 hover:border-primary-200 hover:bg-surface hover:shadow-sm',
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ring-1',
                    tone,
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-text-secondary">
                    {insight.label}
                  </p>
                  <p className="mt-1 text-lg font-bold tracking-tight text-text">
                    {insight.value}
                  </p>
                  <p className="mt-1 truncate text-xs text-muted">{insight.detail}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default DashboardQuickInsights
