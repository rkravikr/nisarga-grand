import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineClock, HiOutlineArrowRight } from 'react-icons/hi'

const ContactCTA = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="contact-cta"
      ref={ref}
      style={{
        padding: '40px 0',
        background: 'var(--color-surface)',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="md:py-24"
    >
      {/* BG Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(46,125,50,0.06) 0%, transparent 40%),
                             radial-gradient(circle at 80% 50%, rgba(212,168,67,0.06) 0%, transparent 40%)`,
          pointerEvents: 'none',
        }}
      />

      <div className="px-4 md:px-6 lg:px-8 max-w-[1440px] mx-auto" style={{ position: 'relative' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="badge">📍 Visit Us</span>
            <h2 className="section-title" style={{ marginTop: '0.75rem' }}>
              Come Dine With Us
            </h2>
            <p className="section-subtitle" style={{ marginTop: '0.875rem' }}>
              We're open every day for breakfast, lunch and dinner. Find us in the heart of RT Nagar, Bengaluru.
            </p>

            {/* Contact details */}
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                {
                  icon: <HiOutlineLocationMarker />,
                  label: 'Address',
                  value: '37, CBI Main Rd, Laxmaiah Block, Ganganagar, RT Nagar, Bengaluru — 560032',
                  color: '#E53935',
                },
                {
                  icon: <HiOutlinePhone />,
                  label: 'Phone',
                  value: '078294 99490',
                  color: '#2E7D32',
                },
                {
                  icon: <HiOutlineClock />,
                  label: 'Hours',
                  value: 'Everyday · 6:00 AM – 11:00 PM',
                  color: '#D4A843',
                },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-sm)',
                      background: `${item.color}14`,
                      border: `1px solid ${item.color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: item.color,
                      fontSize: '1.2rem',
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {item.label}
                    </p>
                    <p style={{ margin: '0.2rem 0 0', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-text)' }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">
                Get Directions <HiOutlineArrowRight />
              </Link>
              <Link to="/order" className="btn-outline">
                Order Online
              </Link>
            </div>
          </motion.div>

          {/* Right — Map card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-lg)',
                background: 'var(--color-base)',
              }}
            >
              {/* Map Embed */}
              <iframe
                title="Nisarga Grand location map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5248082258454!2d77.59399987453757!3d13.024297458040064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17b9c61b8a55%3A0x1a6699a9be6e0a5c!2sRT%20Nagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1712151982843!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Info strip */}
              <div
                style={{
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  background: 'var(--color-base)',
                  borderTop: '1px solid var(--color-border)',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <p style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text)' }}>
                    🍃 Nisarga Grand
                  </p>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    CBI Main Rd, RT Nagar · Open Now
                  </p>
                </div>
                <span
                  style={{
                    background: '#dcfce7',
                    color: '#16a34a',
                    padding: '0.3rem 0.875rem',
                    borderRadius: '50px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                  }}
                >
                  ● Open Now
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactCTA
