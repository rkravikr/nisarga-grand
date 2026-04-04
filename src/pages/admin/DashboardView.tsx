import { motion } from 'framer-motion'
import { HiOutlineCurrencyRupee, HiOutlineClipboardList, HiOutlineViewGridAdd } from 'react-icons/hi'
import { useAdminStore } from '../../store/adminStore'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// Mock Data for the chart
const dailyRevenueData = [
  { name: 'Mon', revenue: 4200 },
  { name: 'Tue', revenue: 3800 },
  { name: 'Wed', revenue: 5100 },
  { name: 'Thu', revenue: 4800 },
  { name: 'Fri', revenue: 8600 },
  { name: 'Sat', revenue: 12500 },
  { name: 'Sun', revenue: 11200 },
]

const DashboardView = () => {
  const { orders, dishes } = useAdminStore()

  // Metrics
  const todayOrders = orders.filter((o) => {
    const orderDate = new Date(o.createdAt).toDateString()
    const today = new Date().toDateString()
    return orderDate === today
  })

  const todayRevenue = todayOrders.reduce((acc, order) => acc + order.total, 0)
  const activeDishes = dishes.filter((d: any) => d.isAvailable !== false).length

  return (
    <div className="flex flex-col gap-6">
      {/* ── Metrics Row ────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-sm font-semibold text-[#6B7280] uppercase tracking-wide">Today's Revenue</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">₹{todayRevenue.toFixed(2)}</h3>
          </div>
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-2xl">
            <HiOutlineCurrencyRupee />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-sm font-semibold text-[#6B7280] uppercase tracking-wide">Orders Today</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">{todayOrders.length}</h3>
          </div>
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl">
            <HiOutlineClipboardList />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-sm font-semibold text-[#6B7280] uppercase tracking-wide">Active Dishes</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">{activeDishes} / {dishes.length}</h3>
          </div>
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-2xl">
            <HiOutlineViewGridAdd />
          </div>
        </motion.div>
      </div>

      {/* ── Main Content Area ────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6 font-heading">Revenue Overview (This Week)</h3>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyRevenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 13 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 13 }} dx={-10} />
                <Tooltip
                  cursor={{ stroke: '#16a34a', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Orders List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6 font-heading">Recent Orders</h3>
          <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4">
            {orders.length === 0 ? (
              <div className="text-center text-gray-500 py-8">No orders yet</div>
            ) : (
              orders.slice(0, 5).map((order) => (
                <div key={order._id} className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-green-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-gray-900" title={order._id}>{order._id.substring(order._id.length - 6).toUpperCase()}</span>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full ${
                        order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : order.status === 'preparing'
                          ? 'bg-blue-100 text-blue-700'
                          : order.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm text-[#4b5563] font-medium mb-1">Order #{order._id.substring(order._id.length - 4)}</div>
                  <div className="text-xs text-[#6B7280] flex justify-between">
                    <span>{order.items.length} items</span>
                    <span className="font-bold text-gray-900">₹{order.total.toFixed(2)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardView
