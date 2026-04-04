import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import OrderPage from './pages/OrderPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'
import { useThemeStore } from './store/themeStore'
import { useAdminStore } from './store/adminStore'

import CustomerLayout from './layouts/CustomerLayout'
import AdminLayout from './layouts/AdminLayout'
import DashboardView from './pages/admin/DashboardView'
import DishManagement from './pages/admin/DishManagement'
import OrderManagement from './pages/admin/OrderManagement'
import CategoryManagement from './pages/admin/CategoryManagement'
import SettingsView from './pages/admin/SettingsView'
import AdminLogin from './pages/admin/AdminLogin'

function AppContent() {
  const { isDark } = useThemeStore()
  const { fetchDishes, fetchOrders, fetchCategories } = useAdminStore()

  // Initial fetch from backend API
  useEffect(() => {
    fetchDishes()
    fetchOrders()
    fetchCategories()

    // Automatic polling for new orders (keeps admin dashboard live without refreshing)
    const intervalId = setInterval(() => {
      fetchOrders()
    }, 5000) // 5 seconds polling for real-time feel

    return () => clearInterval(intervalId)
  }, [fetchDishes, fetchOrders, fetchCategories])

  // Sync dark class on initial load
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <Routes>
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="login" element={<AdminLogin />} />
        {/* Placeholder routes until we build the actual pages */}
        <Route path="dashboard" element={<DashboardView />} />
        <Route path="orders" element={<OrderManagement />} />
        <Route path="dishes" element={<DishManagement />} />
        <Route path="categories" element={<CategoryManagement />} />
        <Route path="settings" element={<SettingsView />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
