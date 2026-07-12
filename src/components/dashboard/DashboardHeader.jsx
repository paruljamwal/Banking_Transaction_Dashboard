import { format } from 'date-fns'
import { FiDownload, FiSend } from 'react-icons/fi'
import Button from '@components/common/Button'
import { cn } from '@utils/cn'

function DashboardHeader({ userName, className }) {
  const currentDate = format(new Date(), 'EEEE, dd MMMM yyyy')

  return (
    <div className={cn('mb-8 space-y-4', className)}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            Banking Dashboard
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Welcome back, <span className="font-medium text-text">{userName}</span>
          </p>
          <p className="mt-1 text-xs font-medium text-muted">{currentDate}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<FiDownload className="h-4 w-4" />}
            onClick={() => {}}
          >
            <span className="hidden sm:inline">Export Transactions</span>
            <span className="sm:hidden">Export</span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<FiSend className="h-4 w-4" />}
            onClick={() => {}}
          >
            <span className="hidden sm:inline">New Transfer</span>
            <span className="sm:hidden">Transfer</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader
