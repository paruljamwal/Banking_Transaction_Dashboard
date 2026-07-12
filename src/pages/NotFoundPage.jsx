import { Link } from 'react-router-dom'
import { FiAlertCircle } from 'react-icons/fi'
import PageContainer from '@components/common/PageContainer'
import EmptyState from '@components/common/EmptyState'
import Button from '@components/common/Button'
import { ROUTES } from '@constants/routes'

function NotFoundPage() {
  return (
    <PageContainer className="flex min-h-[60vh] items-center justify-center">
      <EmptyState
        size="lg"
        icon={<FiAlertCircle className="h-8 w-8" />}
        title="Page Not Found"
        description="The page you are looking for does not exist or has been moved."
        action={
          <Link to={ROUTES.DASHBOARD}>
            <Button variant="primary">Back to Dashboard</Button>
          </Link>
        }
      />
    </PageContainer>
  )
}

export default NotFoundPage
