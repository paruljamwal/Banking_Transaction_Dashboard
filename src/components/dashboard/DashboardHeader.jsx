import { format } from 'date-fns'
import Card from '@components/common/Card'
import { cn } from '@utils/cn'

function DashboardHeader({ userName, className }) {
  const currentDate = format(new Date(), 'EEEE, dd MMMM yyyy')

  return (
    <Card
      padding="lg"
      className={cn(
        'relative overflow-hidden border-primary-100 bg-gradient-to-br from-surface via-surface to-primary-50/40',
        className,
      )}
    >
      <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary-100/40 blur-3xl" />

      <div className="relative min-w-0">
        <p className="text-sm font-medium text-primary-600">Banking Dashboard</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-text md:text-3xl">
          Welcome back, {userName}
        </h1>
        <p className="mt-3 text-sm text-text-secondary">{currentDate}</p>
      </div>
    </Card>
  )
}

export default DashboardHeader
