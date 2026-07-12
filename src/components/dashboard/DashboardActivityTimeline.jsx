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
  primary: 'bg-primary-50 text-primary-600 ring-primary-100',
  success: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
  danger: 'bg-red-50 text-red-600 ring-red-100',
  neutral: 'bg-bg text-text-secondary ring-border',
  card: 'bg-violet-50 text-violet-600 ring-violet-100',
}

function DashboardActivityTimeline({ activities = [] }) {
  return (
    <Card padding="md" className="h-full">
      <div className="mb-5">
        <h3 className="text-base font-semibold tracking-tight text-text md:text-lg">
          Activity Timeline
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          Recent events across your accounts
        </p>
      </div>

      <div className="space-y-0">
        {activities.map((activity, index) => {
          const tone = activity.isCardEvent ? 'card' : activity.tone
          const Icon = TONE_ICONS[tone] || FiRefreshCw
          const style = TONE_STYLES[tone] || TONE_STYLES.neutral

          return (
            <div key={activity.id} className="relative flex gap-3 pb-5 last:pb-0">
              {index < activities.length - 1 && (
                <span
                  className="absolute top-10 left-5 h-[calc(100%-1.25rem)] w-px bg-border"
                  aria-hidden="true"
                />
              )}
              <div
                className={cn(
                  'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ring-1',
                  style,
                )}
              >
                <Icon className="h-[18px] w-[18px]" />
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-text">{activity.title}</p>
                  <span className="shrink-0 text-xs font-medium text-muted">
                    {activity.time}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-text-secondary">
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
