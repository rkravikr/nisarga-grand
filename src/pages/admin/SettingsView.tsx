import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineSave } from 'react-icons/hi'

const SettingsView = () => {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      alert("Settings saved successfully!")
    }, 800)
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 font-heading">Restaurant Settings</h2>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <form onSubmit={handleSave} className="p-8 flex flex-col gap-8">
          
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Business Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Restaurant Name</label>
                <input type="text" defaultValue="Nisarga Grand" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" required />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Contact Number</label>
                <input type="tel" defaultValue="078294 99490" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" required />
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Full Address</label>
                <input type="text" defaultValue="37, CBI Main Rd, Laxmaiah Block, Ganganagar, RT Nagar, Bengaluru 560032" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" required />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Operations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Opening Hours</label>
                <input type="text" defaultValue="6:00 AM – 11:00 PM" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" required />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Accept Online Orders</label>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none cursor-pointer">
                  <option value="yes">Yes, Open for orders</option>
                  <option value="no">No, Walk-in only</option>
                </select>
              </div>
            </div>
          </section>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button 
              type="submit" 
              disabled={isSaving}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              <HiOutlineSave className="text-xl" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default SettingsView
