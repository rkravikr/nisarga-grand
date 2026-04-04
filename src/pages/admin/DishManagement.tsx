import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlinePlus, HiOutlinePencilAlt, HiOutlineTrash, HiOutlineX } from 'react-icons/hi'
import { useAdminStore } from '../../store/adminStore'
import type { Dish } from '../../data/dishes'

const DishManagement = () => {
  const { dishes, categories, addDish, updateDish, deleteDish, toggleDishAvailability } = useAdminStore()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDishId, setEditingDishId] = useState<string | null>(null)

  // Image Upload State
  const [imageType, setImageType] = useState<'url' | 'file'>('url')
  const [imageFile, setImageFile] = useState<File | null>(null)

  // Form State
  const [formData, setFormData] = useState<Partial<Dish> & { isAvailable?: boolean }>({
    name: '',
    price: 0,
    category: (categories[0] as Dish['category']) || 'South Indian',
    description: '',
    image: '',
    isBestseller: false,
    isNew: false,
    isAvailable: true,
  })

  const handleOpenModal = (dish?: Dish) => {
    if (dish) {
      setEditingDishId(dish.id)
      setFormData({ ...dish })
    } else {
      setEditingDishId(null)
      setFormData({
        name: '',
        price: 0,
        category: (categories[0] as Dish['category']) || 'South Indian',
        description: '',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80', // Default placeholder
        isBestseller: false,
        isNew: false,
        isAvailable: true,
      })
    }
    setImageType('url')
    setImageFile(null)
    setIsModalOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Construct FormData to support File uploads natively alongside JSON fields
    const submitData = new FormData()
    submitData.append('name', formData.name || '')
    submitData.append('price', String(formData.price || 0))
    submitData.append('category', formData.category || 'South Indian')
    submitData.append('description', formData.description || '')
    submitData.append('isBestseller', String(!!formData.isBestseller))
    submitData.append('isNewItem', String(!!formData.isNew))
    submitData.append('isAvailable', String(!!formData.isAvailable))

    if (imageType === 'file' && imageFile) {
      submitData.append('image', imageFile)
    } else if (imageType === 'url') {
      submitData.append('image', formData.image || '')
    }

    if (editingDishId) {
      updateDish(editingDishId, submitData as any)
    } else {
      addDish(submitData as any)
    }
    setIsModalOpen(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 font-heading">Menu Management</h2>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-sm"
        >
          <HiOutlinePlus /> Add New Dish
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500 uppercase tracking-wider">
                <th className="p-4 font-semibold">Dish</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold text-center">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dishes.map((dish) => {
                const extendedDish = dish as Dish & { isAvailable?: boolean }
                const isAvail = extendedDish.isAvailable !== false
                return (
                  <motion.tr key={dish.id} layout className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 flex items-center gap-4">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                        loading="lazy"
                      />
                      <div>
                        <div className="font-bold text-gray-900">{dish.name}</div>
                        <div className="text-xs text-gray-500 flex gap-2 mt-1">
                          <span className="text-green-600">Pure Veg</span>
                          {dish.isBestseller && <span className="text-yellow-600">★ Bestseller</span>}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 text-sm font-medium">{dish.category}</td>
                    <td className="p-4 text-gray-900 font-bold">₹{dish.price}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleDishAvailability(dish.id)}
                        className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${
                          isAvail ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {isAvail ? 'Available' : 'Out of Stock'}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(dish)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Dish"
                        >
                          <HiOutlinePencilAlt className="text-lg" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this dish?')) {
                              deleteDish(dish.id)
                            }
                          }}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Dish"
                        >
                          <HiOutlineTrash className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Add/Edit Modal ────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 font-heading">
                  {editingDishId ? 'Edit Dish' : 'Add New Dish'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <HiOutlineX className="text-xl" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <form id="dish-form" onSubmit={handleSave} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-700">Dish Name</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-700">Price (₹)</label>
                      <input
                        required
                        type="number"
                        min="0"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-700">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as Dish['category'] })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none cursor-pointer"
                      >
                        {categories.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-semibold text-gray-700">Dish Image</label>
                        <div className="flex bg-gray-100 rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => setImageType('url')}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${imageType === 'url' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                          >
                            URL
                          </button>
                          <button
                            type="button"
                            onClick={() => setImageType('file')}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${imageType === 'file' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                          >
                            File
                          </button>
                        </div>
                      </div>
                      
                      {imageType === 'url' ? (
                        <input
                          required={!editingDishId} // Must require either URL or File on new dishes
                          type="url"
                          placeholder="https://..."
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        />
                      ) : (
                        <input
                          required={!editingDishId && !imageFile}
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                          className="px-4 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 outline-none"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
                    />
                  </div>

                  <div className="flex flex-wrap gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700 text-sm">
                      <input
                        type="checkbox"
                        checked={formData.isBestseller}
                        onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                        className="w-4 h-4 text-yellow-500 accent-yellow-500"
                      />
                        Bestseller
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700 text-sm">
                      <input
                        type="checkbox"
                        checked={formData.isNew}
                        onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                        className="w-4 h-4 text-blue-500 accent-blue-500"
                      />
                        New Item
                    </label>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 rounded-lg font-semibold text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="dish-form"
                  className="px-5 py-2 rounded-lg font-bold text-white bg-green-600 hover:bg-green-700 transition-colors shadow-sm"
                >
                  {editingDishId ? 'Save Changes' : 'Create Dish'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DishManagement
