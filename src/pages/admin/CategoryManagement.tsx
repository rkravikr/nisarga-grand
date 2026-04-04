import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlinePlus, HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { useAdminStore } from '../../store/adminStore'

const CategoryManagement = () => {
  const { categories } = useAdminStore()
  // Mock internal state for now since the store categories are readonly arrays in initial state
  const [cats, setCats] = useState<string[]>([...categories])
  const [newCat, setNewCat] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCat.trim() && !cats.includes(newCat.trim())) {
      setCats([...cats, newCat.trim()])
      setNewCat('')
    }
  }

  const handleDelete = (cat: string) => {
    if (window.confirm(`Delete category "${cat}"?`)) {
      setCats(cats.filter((c) => c !== cat))
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 font-heading">Categories</h2>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 overflow-hidden">
        <form onSubmit={handleAdd} className="flex gap-4 mb-8 pb-8 border-b border-gray-100">
          <input 
            type="text" 
            value={newCat} 
            onChange={(e) => setNewCat(e.target.value)} 
            placeholder="New category name..." 
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" 
            required
          />
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2">
            <HiOutlinePlus /> Add Category
          </button>
        </form>

        <ul className="flex flex-col gap-3">
          {cats.map((cat, i) => (
            <motion.li 
              key={cat} 
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100 group hover:border-green-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-xs">{i + 1}</span>
                <span className="font-semibold text-gray-800">{cat}</span>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <HiOutlinePencilAlt />
                </button>
                <button onClick={() => handleDelete(cat)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <HiOutlineTrash />
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CategoryManagement
