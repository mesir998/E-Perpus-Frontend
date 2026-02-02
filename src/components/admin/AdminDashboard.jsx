import { useState } from 'react'
import SideBarAdmin from './layouts/SideBarAdmin'
import TopBarAdmin from './layouts/TopBarAdmin'
import { Outlet } from 'react-router-dom'

// GAK PERLU IMPORT CHART DI SINI ❌

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <SideBarAdmin isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBarAdmin onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
