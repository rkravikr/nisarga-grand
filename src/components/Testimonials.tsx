import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { HiOutlineStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import ReviewSummary from './ReviewSummary'

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Regular customer',
    avatar: '👩‍🦱',
    rating: 5,
    review:
      `Nisarga Grand is our family's go-to spot for authentic vegetarian food in RT Nagar. The newly opened service hall is super comfortable for family dining. Highly recommend the Open Cheese Dosa!`,
    dish: 'Open Cheese Dosa',
  },
  {
    id: 2,
    name: 'Rahul Verma',
    role: 'Local resident',
    avatar: '👨‍💼',
    rating: 5,
    review:
      'I come here for breakfast almost every day. The Idly-Vada with sambar dip is out of this world, and the pricing is incredibly pocket-friendly (around ₹300 for two).',
    dish: 'Idly-Vada',
  },
  {
    id: 3,
    name: 'Kavya Reddy',
    role: 'College student',
    avatar: '👩‍🎓',
    rating: 5,
    review:
      `Always clean, highly hygienic ambiance, and very consistent quality over the years. The Veg Biryani here is packed with flavor and generous portions.`,
    dish: 'Veg Biryani',
  },
  {
    id: 4,
    name: 'Suresh Kumar',
    role: 'Food enthusiast',
    avatar: '👨‍🦳',
    rating: 4,
    review:
      `Their South Indian Thali is a fantastic value for money. The food tastes just like home. Note that since it's very popular, self-service can take a bit of extra time during peak hours.`,
    dish: 'South Indian Thali',
  },
  {
    id: 5,
    name: 'Meera Nair',
    role: 'IT professional',
    avatar: '👩‍💻',
    rating: 5,
    review:
      'Amazing breakfast spot! Their Poori Bhaaji is fresh and piping hot. The quality and taste have remained consistently excellent for as long as I can remember.',
    dish: 'Poori Bhaaji',
  },
]

const Testimonials = () => {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const prev = () => setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1))

  const t = TESTIMONIALS[current]

  return (
    <section
      id="testimonials"
      ref={ref}
      style={{
        padding: '100px 0',
        background: 'var(--color-surface)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Diagonal background stripe */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(46,125,50,0.04) 0%, transparent 50%, rgba(212,168,67,0.04) 100%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-custom" style={{ position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span className="badge">💬 Reviews</span>
          <h2 className="section-title" style={{ marginTop: '0.75rem' }}>
            What Our Guests Say
          </h2>
          <p className="section-subtitle" style={{ margin: '0.875rem auto 0' }}>
            Highly regarded as a go-to spot for authentic, delicious vegetarian food with a hygienic ambiance and pocket-friendly pricing.
          </p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={inView ? { opacity: 1, scale: 1 } : {}}
           transition={{ duration: 0.6, delay: 0.1 }}
        >
          <ReviewSummary />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ maxWidth: '780px', margin: '0 auto' }}
        >
          {/* Main review card */}
          <div
            style={{
              background: 'var(--color-base)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-lg)',
              padding: '3rem',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '280px',
            }}
          >
            {/* Quote mark */}
            <div
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.75rem',
                fontSize: '8rem',
                lineHeight: 1,
                color: 'var(--color-border)',
                fontFamily: 'Georgia, serif',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              "
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
              >
                {/* Stars */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '1.25rem' }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <HiOutlineStar
                      key={i}
                      style={{ color: '#F59E0B', fill: '#F59E0B', fontSize: '1.1rem' }}
                    />
                  ))}
                </div>

                {/* Review text */}
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.05rem',
                    lineHeight: 1.8,
                    color: 'var(--color-text)',
                    margin: '0 0 2rem',
                    fontStyle: 'italic',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  "{t.review}"
                </p>

                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      background: 'var(--color-accent-warm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.6rem',
                      border: '2px solid var(--color-border)',
                      flexShrink: 0,
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-text)' }}>
                      {t.name}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                      {t.role} · Loved: {t.dish}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
            <button
              onClick={prev}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.2rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--color-primary)'
                ;(e.currentTarget as HTMLButtonElement).style.color = '#fff'
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-primary)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--color-surface)'
                ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text)'
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)'
              }}
              aria-label="Previous review"
            >
              <HiChevronLeft />
            </button>

            {/* Dots */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: i === current ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '50px',
                    background: i === current ? 'var(--color-primary)' : 'var(--color-border)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.2rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--color-primary)'
                ;(e.currentTarget as HTMLButtonElement).style.color = '#fff'
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-primary)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--color-surface)'
                ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text)'
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)'
              }}
              aria-label="Next review"
            >
              <HiChevronRight />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
