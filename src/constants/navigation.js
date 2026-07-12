import { FiGrid, FiList, FiBarChart2, FiSettings } from 'react-icons/fi'
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
  {
    id: 'reports',
    label: 'Reports',
    path: ROUTES.REPORTS,
    icon: FiBarChart2,
    description: 'Analytics and reports',
  },
  {
    id: 'settings',
    label: 'Settings',
    path: ROUTES.SETTINGS,
    icon: FiSettings,
    description: 'Application preferences',
  },
]
