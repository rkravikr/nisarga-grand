import { motion } from 'framer-motion'
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail, HiOutlineClock } from 'react-icons/hi'

const ABOUT_DETAILS = [
  {
    category: 'Service Options',
    items: ['Outdoor seating', 'No-contact delivery', 'Delivery', 'On-site services', 'Takeaway', 'Dine-in'],
  },
  {
    category: 'Highlights',
    items: ['Great coffee', 'Great dessert', 'Great tea selection'],
  },
  {
    category: 'Popular For',
    items: ['Breakfast', 'Lunch', 'Dinner', 'Solo dining'],
  },
  {
    category: 'Offerings',
    items: [
      'All you can eat',
      'Coffee',
      'Healthy options',
      'Private dining room',
      'Quick bite',
      'Small plates',
      'Vegan options',
      'Vegetarian options only',
    ],
  },
  {
    category: 'Dining Options',
    items: ['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Catering', 'Counter service', 'Dessert', 'Seating', 'Table service'],
  },
  {
    category: 'Amenities & Atmosphere',
    items: ['Restrooms', 'Casual', 'Trendy', 'Family friendly', 'Groups', 'LGBTQ+ friendly', 'University students'],
  },
  {
    category: 'Planning & Payments',
    items: ['Accepts reservations', 'Credit cards', 'Debit cards', 'NFC mobile payments'],
  },
  {
    category: 'Parking & Facilities',
    items: ['Free parking lot', 'Free street parking', 'Good for kids'],
  },
]

const ContactPage = () => {
  return (
    <main className="min-h-screen pb-20" style={{ background: 'var(--color-base)' }}>
      {/* ── Page Header ─────────────────────────── */}
      <div
        style={{
          background: 'var(--color-surface)',
          paddingTop: '120px',
          paddingBottom: '3rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div className="container-custom">
          <span className="badge">📞 Get In Touch</span>
          <h1 className="section-title" style={{ marginTop: '0.75rem' }}>
            Contact & Location
          </h1>
          <p className="section-subtitle" style={{ margin: '0.75rem auto 0' }}>
            Have a question, or want to make a reservation? Find everything you need to know about Nisarga Grand below.
          </p>
        </div>
      </div>

      <div className="container-custom" style={{ marginTop: '3rem' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ── Left Column: Contact Cards & Info ────────────────────────── */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                background: 'var(--color-surface)',
                padding: '2rem',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                Restaurant Info
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { icon: <HiOutlineLocationMarker />, title: 'Address', value: '37, CBI Main Rd, Laxmaiah Block, Ganganagar, RT Nagar, Bengaluru, Karnataka 560032' },
                  { icon: <HiOutlinePhone />, title: 'Phone', value: '078294 99490' },
                  { icon: <HiOutlineMail />, title: 'Email', value: 'hello@nisargagrand.in' },
                  { icon: <HiOutlineClock />, title: 'Hours', value: 'Everyday · 6:00 AM – 11:00 PM' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-primary-lt)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{item.title}</p>
                      <p style={{ margin: '0.2rem 0 0', fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text)', lineHeight: 1.5 }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                height: '300px',
              }}
            >
              <iframe
                title="Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5248082258454!2d77.59399987453757!3d13.024297458040064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17b9c61b8a55%3A0x1a6699a9be6e0a5c!2sRT%20Nagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1712151982843!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
              />
            </motion.div>
          </div>

          {/* ── Right Column: About Details ────────────────────────── */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                background: 'var(--color-surface)',
                padding: '2rem',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                height: '100%',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                All About Us
              </h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                Everything you need to know regarding facilities, service options, and dining experiences at Nisarga Grand.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {ABOUT_DETAILS.map((section, idx) => (
                  <div key={idx}>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px dashed var(--color-border)' }}>
                      {section.category}
                    </h4>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {section.items.map((item, i) => (
                        <li key={i} style={{ position: 'relative', paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--color-text)', lineHeight: 1.4 }}>
                          <span style={{ position: 'absolute', left: 0, top: '2px', color: 'var(--color-primary-lt)' }}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ContactPage
