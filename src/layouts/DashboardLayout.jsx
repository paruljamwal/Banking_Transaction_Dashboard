import { Outlet } from 'react-router-dom'
import Sidebar from '@layouts/Sidebar'
import Navbar from '@layouts/Navbar'
import { SidebarProvider } from '@context/SidebarContext'

function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-bg">
        <Sidebar />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <Navbar />

          <main className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default DashboardLayout
