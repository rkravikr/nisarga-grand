import { motion } from 'framer-motion'
import { HiOutlineClock, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineFire } from 'react-icons/hi'
import { useAdminStore } from '../../store/adminStore'
import type { OrderStatus } from '../../store/adminStore'

const STATUS_CONFIG: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: <HiOutlineClock /> },
  preparing: { bg: 'bg-blue-100', text: 'text-blue-700', icon: <HiOutlineFire /> },
  completed: { bg: 'bg-green-100', text: 'text-green-700', icon: <HiOutlineCheckCircle /> },
  cancelled: { bg: 'bg-red-100', text: 'text-red-700', icon: <HiOutlineXCircle /> },
}

const OrderManagement = () => {
  const { orders, updateOrderStatus } = useAdminStore()

  const handleStatusChange = (id: string, newStatus: OrderStatus) => {
    updateOrderStatus(id, newStatus)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 font-heading">Order Queue</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {orders.length === 0 ? (
          <div className="text-center bg-white rounded-2xl border border-gray-200 p-12 shadow-sm text-gray-500">
            No active orders at the moment.
          </div>
        ) : (
          orders.map((order) => {
            const config = STATUS_CONFIG[order.status]
            return (
              <motion.div
                key={order._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row"
              >
                {/* Left side: Order Info */}
                <div className="p-6 md:w-1/3 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-bold text-lg text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap mr-2" title={order._id}>{order._id.substring(order._id.length - 6).toUpperCase()}</span>
                      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${config?.bg} ${config?.text}`}>
                        <span className="text-sm">{config?.icon}</span> {order.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mt-4 mb-4">
                      Received at: {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    
                    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Customer Details</div>
                      <div className="text-sm font-semibold text-gray-800 mb-1">{order.customerName}</div>
                      <div className="text-sm text-gray-600 mb-2">📞 {order.phone}</div>
                      
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-md capitalize">
                          {order.type === 'dine-in' ? '🍽️ Dine-in' : '🛍️ Takeaway'}
                        </span>
                        {order.type === 'dine-in' && order.tableNo && (
                          <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-md">
                            Table {order.tableNo}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center: Order Items */}
                <div className="p-6 md:w-1/3 flex flex-col">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Order Items</h4>
                  <ul className="flex-1 overflow-y-auto pr-2 flex flex-col gap-3">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-b-0">
                        <span className="font-medium text-gray-800">
                          <span className="text-gray-400 mr-2">{item.quantity}x</span> 
                          {item.name}
                        </span>
                        <span className="text-gray-600 font-semibold">₹{item.price * item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Total (inc. GST)</span>
                    <span className="text-xl font-bold text-gray-900">₹{order.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Right side: Actions */}
                <div className="p-6 md:w-1/3 bg-gray-50 flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 text-center border-b border-gray-100 pb-2">Update Status</h4>
                  
                  {order.status === 'pending' && (
                    <button 
                      onClick={() => handleStatusChange(order._id, 'preparing')}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <HiOutlineFire className="text-lg" /> Send to Kitchen
                    </button>
                  )}

                  {order.status === 'preparing' && (
                    <button 
                      onClick={() => handleStatusChange(order._id, 'completed')}
                      className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <HiOutlineCheckCircle className="text-lg" /> Mark Completed
                    </button>
                  )}

                  {(order.status === 'pending' || order.status === 'preparing') && (
                    <button 
                      onClick={() => {
                        if (window.confirm('Are you sure you want to cancel this order?')) {
                          handleStatusChange(order._id, 'cancelled')
                        }
                      }}
                      className="w-full py-2.5 bg-white border border-red-200 hover:bg-red-50 text-red-600 font-bold rounded-lg transition-colors"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </motion.div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default OrderManagement
