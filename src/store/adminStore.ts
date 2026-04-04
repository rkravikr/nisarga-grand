import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'
import type { Dish } from '../data/dishes'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Set axios interceptor to automatically add token if auth exists
axios.interceptors.request.use((config) => {
  const state = useAdminStore.getState()
  if (state.token) {
    config.headers.Authorization = `Bearer ${state.token}`
  }
  return config
})

export type OrderStatus = 'pending' | 'preparing' | 'completed' | 'cancelled'

export interface OrderItem {
  dishId?: string
  name: string
  price: number
  quantity: number
}

export interface Order {
  _id: string
  customerName: string
  phone: string
  type: 'dine-in' | 'takeaway'
  tableNo?: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  createdAt: string // ISO string
}

interface AdminState {
  // Global Setup
  isLoading: boolean

  // Auth
  isAuthenticated: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void

  // Menu
  dishes: Dish[]
  categories: any[]
  fetchDishes: () => Promise<void>
  fetchCategories: () => Promise<void>
  addDish: (formData: FormData) => Promise<void>
  updateDish: (id: string, formData: FormData | object) => Promise<void>
  deleteDish: (id: string) => Promise<void>
  toggleDishAvailability: (id: string, currentStatus: boolean) => Promise<void>

  // Orders
  orders: Order[]
  fetchOrders: () => Promise<void>
  addOrder: (order: { items: OrderItem[], total: number }) => Promise<void>
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isLoading: false,

      // Auth
      isAuthenticated: false,
      token: null,
      login: (token) => set({ isAuthenticated: true, token }),
      logout: () => set({ isAuthenticated: false, token: null }),

      // Menu
      dishes: [],
      categories: [],
      fetchDishes: async () => {
        try {
          set({ isLoading: true })
          const { data } = await axios.get(`${API_URL}/dishes`)
          // Maps internal Mongoose _id to frontend component 'id' standard if needed
          const mapped = data.map((d: any) => ({
            ...d,
            id: d._id,
            image: d.image?.startsWith('/')
              ? `${API_URL.replace(/\/api\/?$/, '')}${d.image}`
              : d.image
          }))
          set({ dishes: mapped, isLoading: false })
        } catch (error) {
          console.error('Failed to fetch dishes', error)
          set({ isLoading: false })
        }
      },
      fetchCategories: async () => {
        try {
          const { data } = await axios.get(`${API_URL}/categories`)
          const categoryNames = data.map((c: any) => c.name)
          set({ categories: categoryNames })
        } catch (error) {
          console.error('Failed to fetch categories', error)
        }
      },
      addDish: async (formData) => {
        try {
          await axios.post(`${API_URL}/dishes`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
          await get().fetchDishes()
        } catch (error) {
          console.error('Add dish failed', error)
        }
      },
      updateDish: async (id, payload) => {
        try {
          if (payload instanceof FormData) {
            await axios.put(`${API_URL}/dishes/${id}`, payload, {
              headers: { 'Content-Type': 'multipart/form-data' }
            })
          } else {
            await axios.put(`${API_URL}/dishes/${id}`, payload)
          }
          await get().fetchDishes()
        } catch (error) {
          console.error('Update dish failed', error)
        }
      },
      deleteDish: async (id) => {
        try {
          await axios.delete(`${API_URL}/dishes/${id}`)
          await get().fetchDishes()
        } catch (error) {
          console.error('Delete dish failed', error)
        }
      },
      toggleDishAvailability: async (id, currentStatus) => {
        try {
          // Optimistic UI update
          set((state) => ({
            dishes: state.dishes.map((d) => d.id === id ? { ...d, isAvailable: !currentStatus } : d)
          }))
          await axios.put(`${API_URL}/dishes/${id}`, { isAvailable: !currentStatus })
          // await get().fetchDishes() // Or fetch to sync
        } catch (error) {
          console.error('Toggle dish failed', error)
        }
      },

      // Orders
      orders: [],
      fetchOrders: async () => {
        try {
          const { data } = await axios.get(`${API_URL}/orders`)
          set({ orders: data })
        } catch (error) {
          console.error('Failed to fetch orders', error)
        }
      },
      addOrder: async (order) => {
        try {
          await axios.post(`${API_URL}/orders`, order)
          // We can optionally refetch orders, though customers add orders, admins fetch them
        } catch (error) {
          console.error('Add order failed', error)
          throw error
        }
      },
      updateOrderStatus: async (id, status) => {
        try {
           // Optimistic UI update
           set((state) => ({
             orders: state.orders.map((o) => o._id === id ? { ...o, status } : o)
           }))
          await axios.put(`${API_URL}/orders/${id}`, { status })
        } catch (error) {
          console.error('Update order failed', error)
        }
      },
    }),
    {
      name: 'nisarga-admin-auth',
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated, token: state.token }), 
      // Only persist auth token. Everything else fetches fresh!
    }
  )
)
