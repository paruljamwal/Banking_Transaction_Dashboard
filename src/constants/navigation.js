import { FiGrid, FiList } from 'react-icons/fi'
import { ROUTES } from '@constants/routes'

export const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: FiGrid,
    description: 'Overview and summary',
  },
  {
    id: 'transactions',
    label: 'Transactions',
    path: ROUTES.TRANSACTIONS,
    icon: FiList,
    description: 'View and manage transactions',
  },
]
