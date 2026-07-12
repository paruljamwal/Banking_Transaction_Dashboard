import { format } from 'date-fns'
import { FiDownload, FiSend, FiRefreshCw } from 'react-icons/fi'
import Button from '@components/common/Button'
import Card from '@components/common/Card'
import { cn } from '@utils/cn'

function DashboardHeader({ userName, className }) {
  const currentDate = format(new Date(), 'EEEE, dd MMMM yyyy')
  const lastSynced = format(new Date(), 'hh:mm a')

  return (
    <Card
      padding="lg"
      className={cn(
        'relative overflow-hidden border-primary-100 bg-gradient-to-br from-surface via-surface to-primary-50/40',
        className,
      )}
    >
      <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary-100/40 blur-3xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-primary-600">Banking Dashboard</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-text md:text-3xl">
            Welcome back, {userName}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-secondary">
            <span>{currentDate}</span>
            <span className="hidden text-border sm:inline">·</span>
            <span className="inline-flex items-center gap-1.5">
              <FiRefreshCw className="h-3.5 w-3.5 text-emerald-600" />
              Last synced {lastSynced}
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 sm:flex-row sm:w-auto">
          <Button
            variant="secondary"
            size="md"
            leftIcon={<FiDownload className="h-4 w-4" />}
            className="rounded-2xl"
          >
            Export Transactions
          </Button>
          <Button
            variant="primary"
            size="md"
            leftIcon={<FiSend className="h-4 w-4" />}
            className="rounded-2xl"
          >
            Create Transfer
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default DashboardHeader
