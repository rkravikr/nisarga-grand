import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { useAdminStore } from '../store/adminStore'
import { useCartStore } from '../store/cartStore'

const MenuPreview = () => {
  const { dishes, categories } = useAdminStore()
  const [activeCategory, setActiveCategory] = useState(categories[0] || 'All')
  const addItem = useCartStore((s) => s.addItem)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const filtered = dishes.filter((d) => d.category === activeCategory).slice(0, 4)

  return (
    <section
      id="menu-preview"
      ref={ref}
      style={{
        padding: '100px 0',
        background: 'var(--color-base)',
      }}
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <span className="badge">🍽️ Menu Preview</span>
          <h2 className="section-title" style={{ marginTop: '0.75rem' }}>
            Explore Our Menu
          </h2>
          <p className="section-subtitle" style={{ margin: '0.875rem auto 0' }}>
            South Indian, North Indian, Fast Food & Beverages — all freshly made.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.55rem 1.25rem',
                borderRadius: '50px',
                border: '2px solid',
                borderColor: activeCategory === cat ? 'var(--color-primary)' : 'var(--color-border)',
                background: activeCategory === cat ? 'var(--color-primary)' : 'transparent',
                color: activeCategory === cat ? '#fff' : 'var(--color-text)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {cat === 'South Indian' ? '🫓 ' : cat === 'North Indian' ? '🍛 ' : cat === 'Fast Food' ? '🍔 ' : '🥤 '}
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Dish List */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {filtered.map((dish, i) => (
            <motion.div
              key={dish.id || dish._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              whileHover={{ x: 4 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                padding: '1rem 1.25rem',
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.25s ease',
              }}
            >
              {/* Image */}
              <img
                src={dish.image}
                alt={dish.name}
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: 'var(--radius-sm)',
                  objectFit: 'cover',
                  flexShrink: 0,
                }}
              />

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: '0.97rem',
                      color: 'var(--color-text)',
                      margin: 0,
                    }}
                  >
                    {dish.name}
                  </h3>
                  {dish.isBestseller && (
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#fff', background: '#2E7D32', padding: '0.15rem 0.5rem', borderRadius: '50px' }}>
                      🔥 BESTSELLER
                    </span>
                  )}
                  {dish.isNew && (
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#fff', background: '#D4A843', padding: '0.15rem 0.5rem', borderRadius: '50px' }}>
                      ✨ NEW
                    </span>
                  )}
                </div>
                <p
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-text-muted)',
                    margin: '0.3rem 0 0',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {dish.description}
                </p>
              </div>

              {/* Price + CTA */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', flexShrink: 0 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    color: 'var(--color-primary)',
                  }}
                >
                  ₹{dish.price}
                </span>
                <button
                  onClick={() =>
                    addItem({
                        id: dish.id || dish._id || '',
                      name: dish.name,
                      price: dish.price,
                      image: dish.image,
                      category: dish.category,
                    })
                  }
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                    border: 'none',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.12) rotate(12deg)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLButtonElement).style.transform = 'scale(1) rotate(0deg)'
                  }}
                  aria-label={`Add ${dish.name} to cart`}
                >
                  <HiOutlineShoppingCart />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Full Menu Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          style={{ textAlign: 'center', marginTop: '2.5rem' }}
        >
          <Link to="/menu" className="btn-primary">
            View Full Menu →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default MenuPreview
