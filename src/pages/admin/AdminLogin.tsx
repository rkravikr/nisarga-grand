import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAdminStore } from '../../store/adminStore'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const login = useAdminStore((s) => s.login)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // First try to login
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const response = await fetch(`${apiBase}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        // If login fails, try to register them if it's the very first time using the default mock credentials to seed the DB
        if (email === 'admin@nisarga.com' && password === 'password123') {
           const regResponse = await fetch('http://localhost:5000/api/auth/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password })
           })
           if (regResponse.ok) {
              const data = await regResponse.json()
              login(data.token)
              navigate('/admin/dashboard')
              return
           }
        }
        const errData = await response.json()
        throw new Error(errData.message || 'Invalid credentials')
      }

      const data = await response.json()
      login(data.token) // JWT token
      navigate('/admin/dashboard')
    } catch (err: any) {
      setError(err.message || 'Server error. Is the backend running?')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
      >
        <div className="bg-green-700 p-8 text-center">
          <div className="w-16 h-16 bg-white rounded-2xl mx-auto flex items-center justify-center text-3xl mb-4 shadow-inner">
            🍃
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Nisarga Grand</h2>
          <p className="text-green-100 text-sm">Restaurant Management Portal</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                placeholder="admin@nisarga.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Secure Login
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-8">
            Protected area. Unauthorized access is prohibited.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminLogin
