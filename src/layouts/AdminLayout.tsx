import { Outlet, Navigate, NavLink, useLocation } from 'react-router-dom'
import { HiOutlineChartPie, HiOutlineCollection, HiOutlineClipboardList, HiOutlineCog, HiOutlineLogout, HiOutlineTag } from 'react-icons/hi'
import { useAdminStore } from '../store/adminStore'
import { motion } from 'framer-motion'

const NAV_ITEMS = [
  { path: '/admin/dashboard', icon: <HiOutlineChartPie />, label: 'Dashboard' },
  { path: '/admin/orders', icon: <HiOutlineClipboardList />, label: 'Orders' },
  { path: '/admin/dishes', icon: <HiOutlineCollection />, label: 'Dishes' },
  { path: '/admin/categories', icon: <HiOutlineTag />, label: 'Categories' },
  { path: '/admin/settings', icon: <HiOutlineCog />, label: 'Settings' },
]

const AdminLayout = () => {
  const { isAuthenticated, logout } = useAdminStore()
  const location = useLocation()

  if (!isAuthenticated && location.pathname !== '/admin/login') {
    return <Navigate to="/admin/login" replace />
  }

  // If we are at login page and authenticated, redirect to dashboard
  if (isAuthenticated && location.pathname === '/admin/login') {
    return <Navigate to="/admin/dashboard" replace />
  }

  // If it's just the login page (not authenticated), render just the outlet without Sidebar
  if (!isAuthenticated && location.pathname === '/admin/login') {
    return <Outlet />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 z-20">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="p-1.5 bg-green-600 rounded text-white text-sm">🍃</span>
            Admin Panel
          </span>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-green-50 text-green-700'
                    : 'hover:bg-gray-100 hover:text-gray-900'
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? '' : '#4b5563'
              })}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <span className="text-lg"><HiOutlineLogout /></span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-gray-800 capitalize">
            {location.pathname.split('/').pop() || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                A
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800">Admin</span>
                <span className="text-xs text-[#6B7280]">Manager</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
