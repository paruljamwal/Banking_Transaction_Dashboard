import { Link } from 'react-router-dom'
import PageContainer from '@components/common/PageContainer'
import { ROUTES } from '@constants/routes'

function NotFoundPage() {
  return (
    <PageContainer className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-6xl font-bold text-primary-600">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-text">Page not found</h1>
      <p className="mt-2 max-w-md text-sm text-text-secondary">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to={ROUTES.DASHBOARD}
        className="mt-6 inline-flex items-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
      >
        Back to Dashboard
      </Link>
    </PageContainer>
  )
}

export default NotFoundPage
