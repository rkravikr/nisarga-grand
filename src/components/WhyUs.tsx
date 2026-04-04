import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const REASONS = [
  {
    icon: '🥦',
    title: '100% Pure Veg',
    description:
      'Every single dish on our menu is vegetarian. No compromise, no exceptions — perfect for families with diverse dietary needs.',
    color: '#2E7D32',
    bg: 'rgba(46,125,50,0.08)',
  },
  {
    icon: '💰',
    title: 'Budget Friendly',
    description:
      `A wholesome meal for just ₹60–₹200. Great food shouldn't cost a fortune — that's been our philosophy since day one.`,
    color: '#D4A843',
    bg: 'rgba(212,168,67,0.08)',
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Family Atmosphere',
    description:
      'Spacious seating, warm service and a welcoming vibe that feels like home. Bring the whole family and stay a while.',
    color: '#1976D2',
    bg: 'rgba(25,118,210,0.08)',
  },
  {
    icon: '🍳',
    title: 'Fresh Every Day',
    description:
      'We source fresh ingredients daily and prepare each dish in-house. No preservatives, no shortcuts — just honest cooking.',
    color: '#E53935',
    bg: 'rgba(229,57,53,0.08)',
  },
  {
    icon: '🗺️',
    title: 'Prime Location',
    description:
      'Located on CBI Main Rd, RT Nagar — easily accessible by metro, bus and two-wheeler. Open from 6 AM to 11 PM every day.',
    color: '#7B1FA2',
    bg: 'rgba(123,31,162,0.08)',
  },
  {
    icon: '🍽️',
    title: 'Diverse Cuisines',
    description:
      'South Indian classics, North Indian curries, street-style fast food and refreshing beverages — something for everyone.',
    color: '#00897B',
    bg: 'rgba(0,137,123,0.08)',
  },
]

const WhyUs = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="why-us"
      ref={ref}
      style={{
        padding: '100px 0',
        background: 'var(--color-surface)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative blobs */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(46,125,50,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="badge">💚 Why Nisarga Grand</span>
          <h2 className="section-title" style={{ marginTop: '0.75rem' }}>
            Why Families Love Us
          </h2>
          <p className="section-subtitle" style={{ margin: '0.875rem auto 0' }}>
            More than just a restaurant — a place where food brings people together.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {REASONS.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.1)' }}
              style={{
                padding: '1.75rem',
                background: 'var(--color-base)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: 'var(--radius-md)',
                  background: reason.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  marginBottom: '1.25rem',
                  border: `1px solid ${reason.color}22`,
                }}
              >
                {reason.icon}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  color: 'var(--color-text)',
                  margin: '0 0 0.625rem',
                }}
              >
                {reason.title}
              </h3>

              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {reason.description}
              </p>

              {/* Color accent line */}
              <div
                style={{
                  width: '36px',
                  height: '3px',
                  borderRadius: '3px',
                  background: reason.color,
                  marginTop: '1.25rem',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUs
