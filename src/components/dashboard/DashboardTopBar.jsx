import { Link } from 'react-router-dom'
import { FiChevronRight, FiRefreshCw } from 'react-icons/fi'
import { format } from 'date-fns'
import Button from '@components/common/Button'
import { ROUTES } from '@constants/routes'
import { cn } from '@utils/cn'

function DashboardTopBar({ className }) {
  const currentDate = format(new Date(), 'EEEE, dd MMMM yyyy')

  return (
    <div className={cn('mb-8 space-y-4', className)}>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-text-secondary">
          <li>
            <Link
              to={ROUTES.DASHBOARD}
              className="transition-colors hover:text-primary-600"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <FiChevronRight className="h-4 w-4 text-muted" />
          </li>
          <li className="font-medium text-text" aria-current="page">
            Dashboard
          </li>
        </ol>
      </nav>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            Banking Dashboard
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Financial overview and transaction activity summary
          </p>
          <p className="mt-2 text-xs font-medium text-muted">{currentDate}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<FiRefreshCw className="h-4 w-4" />}
          >
            Refresh
          </Button>
          <Link to={ROUTES.TRANSACTIONS}>
            <Button variant="primary" size="sm">
              View Transactions
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DashboardTopBar
