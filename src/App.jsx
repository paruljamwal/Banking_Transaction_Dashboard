import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@context/ThemeContext'
import DashboardLayout from '@layouts/DashboardLayout'
import DashboardPage from '@pages/DashboardPage'
import TransactionsPage from '@pages/TransactionsPage'
import ReportsPage from '@pages/ReportsPage'
import SettingsPage from '@pages/SettingsPage'
import NotFoundPage from '@pages/NotFoundPage'
import { ROUTES } from '@constants/routes'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} replace />} />

          <Route element={<DashboardLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
            <Route path={ROUTES.TRANSACTIONS} element={<TransactionsPage />} />
            <Route path={ROUTES.REPORTS} element={<ReportsPage />} />
            <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
