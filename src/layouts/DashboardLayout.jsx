import { Outlet } from 'react-router-dom'
import Sidebar from '@layouts/Sidebar'
import Navbar from '@layouts/Navbar'
import { SidebarProvider } from '@context/SidebarContext'

function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-bg">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar />

          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default DashboardLayout
