import {
  FiArrowRight,
  FiCheckCircle,
  FiCreditCard,
  FiDollarSign,
  FiRefreshCw,
  FiXCircle,
} from 'react-icons/fi'
import Card from '@components/common/Card'
import { cn } from '@utils/cn'

const TONE_ICONS = {
  primary: FiArrowRight,
  success: FiCheckCircle,
  danger: FiXCircle,
  neutral: FiDollarSign,
  card: FiCreditCard,
}

const TONE_STYLES = {
  primary: 'text-primary-600',
  success: 'text-emerald-600',
  danger: 'text-red-600',
  neutral: 'text-text-secondary',
  card: 'text-violet-600',
}

function SectionHeader({ title, description }) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold tracking-tight text-text">{title}</h3>
      <p className="mt-0.5 text-xs text-muted">{description}</p>
    </div>
  )
}

function DashboardActivityTimeline({ activities = [] }) {
  return (
    <Card padding="sm" className="flex h-full flex-col px-4 py-4 sm:px-5">
      <SectionHeader
        title="Activity Timeline"
        description="Recent events across accounts"
      />

      <div className="flex-1 divide-y divide-border rounded-xl border border-border">
        {activities.map((activity) => {
          const tone = activity.isCardEvent ? 'card' : activity.tone
          const Icon = TONE_ICONS[tone] || FiRefreshCw
          const style = TONE_STYLES[tone] || TONE_STYLES.neutral

          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 px-3 py-3 transition-colors hover:bg-bg/60 sm:px-4"
            >
              <div
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bg ring-1 ring-border',
                  style,
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-text">{activity.title}</p>
                  <span className="shrink-0 text-[11px] font-medium text-muted">
                    {activity.time}
                  </span>
                </div>
                <p className="mt-0.5 text-xs leading-snug text-text-secondary">
                  {activity.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default DashboardActivityTimeline
