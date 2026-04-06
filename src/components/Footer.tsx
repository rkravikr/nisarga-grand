import { Link } from 'react-router-dom'
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail } from 'react-icons/hi'

const NAV_FOOTER = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
  { label: 'Order Now', to: '/order' },
]

const CATEGORIES = ['South Indian', 'North Indian', 'Fast Food', 'Beverages']

const Footer = () => {
  return (
    <footer
      style={{
        background: '#111827', // Fixed dark background for the footer
        color: 'rgba(255,255,255,0.85)',
        paddingTop: '4rem',
      }}
    >
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-8 pb-12 border-b border-white/10">
          {/* Brand - Spans 2 columns to give space to the long address and description */}
          <div className="col-span-2">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                }}
              >
                🍃
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.05rem', color: '#fff', display: 'block', lineHeight: 1.1 }}>
                  Nisarga Grand
                </span>
                <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Pure Veg Restaurant
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', margin: 0, maxWidth: '400px' }}>
              Simple food, warm hospitality and a grand experience — serving breakfast, lunch & dinner every single day in RT Nagar, Bengaluru.
            </p>

            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {[
                { icon: <HiOutlineLocationMarker />, text: '37, CBI Main Rd, Laxmaiah Block, Ganganagar, RT Nagar, Bengaluru 560032' },
                { icon: <HiOutlinePhone />, text: '078294 99490' },
                { icon: <HiOutlineMail />, text: 'hello@nisargagrand.in' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                  <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '0.1rem' }}>{item.icon}</span>
                  <span style={{ maxWidth: '300px' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', color: '#fff', margin: '0 0 1.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {NAV_FOOTER.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    style={{
                      fontSize: '0.9rem',
                      color: 'rgba(255,255,255,0.55)',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-primary)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu Categories */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', color: '#fff', margin: '0 0 1.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Our Menu
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link
                    to="/menu"
                    style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-primary)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)')}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', color: '#fff', margin: '0 0 1.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Opening Hours
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { day: 'Everyday', time: '6:00 AM – 11:00 PM' },
              ].map((h) => (
                <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                  <span style={{ color: 'rgba(255,255,255,0.45)' }}>{h.day}</span>
                  <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{h.time}</span>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '2rem',
                padding: '1rem 1.25rem',
                background: 'rgba(46,125,50,0.15)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(46,125,50,0.25)',
              }}
            >
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                🎉 <strong style={{ color: '#fff' }}>Daily Special:</strong> Bisi Bele Bath for just ₹100. Limited portions!
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            padding: '1.25rem 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>
            © {new Date().getFullYear()} Nisarga Grand. All rights reserved. · Made with ❤️ in Bengaluru
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <Link
                key={item}
                to="/"
                style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.3)')}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
