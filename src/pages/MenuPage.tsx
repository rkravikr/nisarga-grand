import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineShoppingCart, HiOutlineSearch, HiOutlineStar } from 'react-icons/hi'
import { useAdminStore } from '../store/adminStore'
import { useCartStore } from '../store/cartStore'

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const { dishes, categories } = useAdminStore()
  const addItem = useCartStore((s) => s.addItem)

  // Filter dishes based on category and search query
  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const matchesCategory = activeCategory === 'All' || dish.category === activeCategory
      const matchesSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery, dishes])

  return (
    <main className="min-h-screen pb-20" style={{ background: 'var(--color-base)' }}>
      {/* ── Page Header ─────────────────────────── */}
      <div
        style={{
          background: 'var(--color-surface)',
          paddingTop: '120px',
          paddingBottom: '2.5rem',
          textAlign: 'center',
        }}
      >
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge">🍽️ Discover</span>
            <h1 className="section-title" style={{ marginTop: '0.75rem' }}>
              Our Grand Menu
            </h1>
            <p className="section-subtitle" style={{ margin: '0.75rem auto 0' }}>
              From comforting South Indian breakfasts to rich North Indian curries. Everything is 100% pure vegetarian and made fresh daily.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Sticky Navigation & Search Bar ────────────────────────── */}
      <div
        className="sticky top-0 z-30"
        style={{
          background: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
          padding: '1rem 0',
        }}
      >
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Categories Pill Scroller */}
          <div className="flex overflow-x-auto no-scrollbar gap-3 w-full md:w-auto py-1">
            <button
              onClick={() => setActiveCategory('All')}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: '50px',
                border: activeCategory === 'All' ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                background: activeCategory === 'All' ? 'var(--color-primary)' : 'var(--color-base)',
                color: activeCategory === 'All' ? '#fff' : 'var(--color-text)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                boxShadow: activeCategory === 'All' ? '0 4px 12px rgba(46,125,50,0.25)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== 'All') {
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-primary)'
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== 'All') {
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)'
                }
              }}
            >
              🌟 All Dishes
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: '50px',
                  border: activeCategory === cat ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                  background: activeCategory === cat ? 'var(--color-primary)' : 'var(--color-base)',
                  color: activeCategory === cat ? '#fff' : 'var(--color-text)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  boxShadow: activeCategory === cat ? '0 4px 12px rgba(46,125,50,0.25)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== cat) {
                    ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-primary)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== cat) {
                    ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)'
                  }
                }}
              >
                {cat === 'South Indian' ? '🫓 ' : cat === 'North Indian' ? '🍛 ' : cat === 'Fast Food' ? '🍔 ' : '🥤 '}
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '300px', flexShrink: 0 }}>
            <HiOutlineSearch
              style={{
                position: 'absolute',
                top: '50%',
                left: '1rem',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)',
                fontSize: '1.2rem',
              }}
            />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 1rem 0.6rem 2.75rem',
                borderRadius: '50px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-base)',
                color: 'var(--color-text)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = 'var(--color-primary)')}
              onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = 'var(--color-border)')}
            />
          </div>

        </div>
      </div>

      {/* ── Content Grid ────────────────────────── */}
      <div className="container-custom" style={{ marginTop: '3rem' }}>
        {filteredDishes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              textAlign: 'center',
              padding: '5rem 2rem',
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px dashed var(--color-border)',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.4rem', color: 'var(--color-text)' }}>
              No dishes found
            </h3>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem', lineHeight: 1.6 }}>
              We couldn't find anything matching "{searchQuery}". Try a different keyword or explore our categories!
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="btn-outline"
              style={{ marginTop: '1.5rem', padding: '0.6rem 1.5rem' }}
            >
              Clear Search
            </button>
          </motion.div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredDishes.map((dish, i) => (
                <motion.div
                  layout
                  key={dish.id || dish._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
                  whileHover={{ y: -6 }}
                  style={{
                    background: 'var(--color-surface)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-sm)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-lg)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-sm)'
                  }}
                >
                  {/* Image block */}
                  <div style={{ width: '100%', height: '200px', position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={dish.image}
                      alt={dish.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.08)')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
                    />
                    
                    {/* Gradient overlay for contrast */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 40%)', pointerEvents: 'none' }} />

                    {/* Veg Symbol */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        width: '24px',
                        height: '24px',
                        background: '#fff',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid #4CAF50',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      }}
                    >
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#4CAF50' }} />
                    </div>
                    {/* Badges */}
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem' }}>
                      {dish.isBestseller && (
                        <span style={{ background: '#2E7D32', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.05em', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                          BESTSELLER
                        </span>
                      )}
                      {dish.isNew && (
                        <span style={{ background: '#D4A843', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.05em', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                          NEW
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content block */}
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-text)' }}>
                        {dish.name}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--color-accent-warm)', padding: '4px 8px', borderRadius: '6px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent)' }}>{dish.rating}</span>
                        <HiOutlineStar style={{ color: 'var(--color-accent)', fill: 'var(--color-accent)', fontSize: '0.9rem' }} />
                      </div>
                    </div>

                    <p style={{ margin: '0.75rem 0 1rem', fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6, flex: 1 }}>
                      {dish.description}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border)' }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.35rem', color: 'var(--color-primary)' }}>
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
                        className="btn-primary"
                        style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', gap: '0.4rem' }}
                      >
                        <HiOutlineShoppingCart style={{ fontSize: '1.1rem' }} />
                        Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  )
}

export default MenuPage
