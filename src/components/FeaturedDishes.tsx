import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineStar, HiOutlineShoppingCart, HiOutlineFire } from 'react-icons/hi'
import { useAdminStore } from '../store/adminStore'
import { useCartStore } from '../store/cartStore'

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
}

const FeaturedDishes = () => {
  const { dishes } = useAdminStore()
  const featured = dishes.filter((d) => d.isBestseller).slice(0, 4)

  const addItem = useCartStore((s) => s.addItem)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="featured-dishes"
      ref={ref}
      style={{
        padding: '40px 0',
        background: 'var(--color-base)',
      }}
      className="md:py-24"
    >
      <div className="px-4 md:px-6 lg:px-8 max-w-[1440px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span className="badge">⭐ Customer Favourites</span>
          <h2 className="section-title" style={{ marginTop: '0.75rem' }}>
            Our Bestsellers
          </h2>
          <p className="section-subtitle" style={{ margin: '0.875rem auto 0', fontSize: '0.95rem' }}>
            Handpicked by our regulars — the dishes they keep coming back for.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {featured.map((dish, idx) => (
            <motion.div
              key={dish.id || dish._id}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(0,0,0,0.13)' }}
              style={{
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'box-shadow 0.3s ease',
                cursor: 'pointer',
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                <img
                  src={dish.image}
                  alt={dish.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.45s ease',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.08)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')
                  }
                />
                {/* Tag badge */}
                {(dish.isBestseller || dish.isNew || dish.isPopular) && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      left: '0.75rem',
                      padding: '0.25rem 0.7rem',
                      borderRadius: '50px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      background: dish.isBestseller
                        ? '#2E7D32'
                        : dish.isNew
                        ? '#D4A843'
                        : '#1976D2',
                      color: '#fff',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {dish.isBestseller ? '🔥 Bestseller' : dish.isNew ? '✨ New' : '❤️ Popular'}
                  </span>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      color: 'var(--color-text)',
                      margin: 0,
                    }}
                  >
                    {dish.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flexShrink: 0 }}>
                    <HiOutlineStar style={{ color: '#F59E0B', fill: '#F59E0B', fontSize: '0.85rem' }} />
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text)' }}>
                      {dish.rating}
                    </span>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: '0.83rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.6,
                    margin: '0.5rem 0 1rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {dish.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {dish.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '0.2rem 0.6rem',
                        background: 'var(--color-accent-warm)',
                        color: 'var(--color-accent)',
                        borderRadius: '50px',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      fontSize: '1.25rem',
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
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      padding: '0.5rem 1rem',
                      background: 'var(--color-primary)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLButtonElement).style.background =
                        'var(--color-primary-dk)'
                      ;(e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.04)'
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLButtonElement).style.background =
                        'var(--color-primary)'
                      ;(e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'
                    }}
                  >
                    <HiOutlineShoppingCart />
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <Link
            to="/menu"
            className="btn-outline"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <HiOutlineFire /> View Full Menu
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedDishes
