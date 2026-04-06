import { useState, useEffect, useRef, useMemo } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiOutlineSearch,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineShoppingCart,
  HiMenu,
  HiX,
} from 'react-icons/hi'
import { useThemeStore } from '../store/themeStore'
import { useCartStore } from '../store/cartStore'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

// Simple mock dishes for search suggestions
const SEARCH_DATA = [
  { id: '1', name: 'Masala Dosa', category: 'South Indian', to: '/menu' },
  { id: '2', name: 'Idli Sambar', category: 'South Indian', to: '/menu' },
  { id: '3', name: 'Vada', category: 'South Indian', to: '/menu' },
  { id: '4', name: 'Paneer Butter Masala', category: 'North Indian', to: '/menu' },
  { id: '5', name: 'Dal Makhani', category: 'North Indian', to: '/menu' },
  { id: '6', name: 'Naan', category: 'North Indian', to: '/menu' },
  { id: '7', name: 'Pav Bhaji', category: 'Fast Food', to: '/menu' },
  { id: '8', name: 'Veg Burger', category: 'Fast Food', to: '/menu' },
  { id: '9', name: 'French Fries', category: 'Fast Food', to: '/menu' },
  { id: '10', name: 'Mango Lassi', category: 'Beverages', to: '/menu' },
  { id: '11', name: 'Fresh Lime Soda', category: 'Beverages', to: '/menu' },
  { id: '12', name: 'Filter Coffee', category: 'Beverages', to: '/menu' },
]

const Navbar = () => {
  const { isDark, toggleTheme } = useThemeStore()
  const totalItems = useCartStore((s) => s.totalItems)
  const navigate = useNavigate()

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  
  // Derived state for search suggestions
  const suggestions = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return SEARCH_DATA.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
    ).slice(0, 5)
  }, [query])

  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close search on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Auto-focus search input
  useEffect(() => {
    if (searchOpen) inputRef.current?.focus()
  }, [searchOpen])

  const handleSuggestionClick = (to: string) => {
    navigate(to)
    setSearchOpen(false)
    setQuery('')
  }

  const cartCount = totalItems()

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? 'var(--color-navbar-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled
          ? '1px solid var(--color-border)'
          : '1px solid transparent',
        transition: 'all 0.35s ease',
      }}
    >
      <div className="px-4 md:px-6 lg:px-8 max-w-[1440px] mx-auto">
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '70px',
            gap: '0.5rem',
          }}
        >
          {/* ── Logo ─────────────────────────────────── */}
          <NavLink
            to="/"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem',
              }}
            >
              🍃
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: 'var(--color-primary)',
                  display: 'block',
                  lineHeight: 1.1,
                }}
              >
                Nisarga
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 500,
                  fontSize: '0.7rem',
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                Grand
              </span>
            </div>
          </NavLink>

          <ul className="hidden lg:flex list-none m-0 p-0 gap-[0.25rem]">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  style={({ isActive }) => ({
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 500,
                    fontSize: '0.92rem',
                    color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                    background: isActive ? 'var(--color-accent-warm)' : 'transparent',
                    transition: 'all 0.2s ease',
                    display: 'block',
                  })}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ── Right Actions ─────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Search */}
            <div ref={searchRef} style={{ position: 'relative' }}>
              <button
                id="navbar-search-btn"
                onClick={() => setSearchOpen((p) => !p)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'transparent',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  transition: 'all 0.2s ease',
                }}
                aria-label="Search"
              >
                <HiOutlineSearch />
              </button>

              {/* Search Dropdown */}
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 0.5rem)',
                      right: 0,
                      width: '300px',
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-lg)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.625rem 0.875rem',
                        borderBottom: suggestions.length
                          ? '1px solid var(--color-border)'
                          : 'none',
                      }}
                    >
                      <HiOutlineSearch
                        style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}
                      />
                      <input
                        ref={inputRef}
                        id="navbar-search-input"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search dishes..."
                        style={{
                          flex: 1,
                          border: 'none',
                          outline: 'none',
                          background: 'transparent',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.9rem',
                          color: 'var(--color-text)',
                        }}
                      />
                    </div>

                    {suggestions.length > 0 && (
                      <ul style={{ listStyle: 'none', margin: 0, padding: '0.375rem 0' }}>
                        {suggestions.map((s) => (
                          <li key={s.id}>
                            <button
                              onClick={() => handleSuggestionClick(s.to)}
                              style={{
                                width: '100%',
                                textAlign: 'left',
                                padding: '0.5rem 0.875rem',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                color: 'var(--color-text)',
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.875rem',
                                transition: 'background 0.15s',
                              }}
                              onMouseEnter={(e) =>
                                ((e.currentTarget as HTMLElement).style.background =
                                  'var(--color-accent-warm)')
                              }
                              onMouseLeave={(e) =>
                                ((e.currentTarget as HTMLElement).style.background = 'transparent')
                              }
                            >
                              <span style={{ fontWeight: 500 }}>{s.name}</span>
                              <span
                                style={{
                                  fontSize: '0.75rem',
                                  color: 'var(--color-text-muted)',
                                  background: 'var(--color-border)',
                                  padding: '0.125rem 0.5rem',
                                  borderRadius: '50px',
                                }}
                              >
                                {s.category}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}

                    {query && suggestions.length === 0 && (
                      <p
                        style={{
                          margin: 0,
                          padding: '0.875rem',
                          fontSize: '0.875rem',
                          color: 'var(--color-text-muted)',
                          textAlign: 'center',
                        }}
                      >
                        No dishes found for "{query}"
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode Toggle */}
            <button
              id="navbar-dark-mode-btn"
              onClick={toggleTheme}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-sm)',
                background: 'transparent',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.1rem',
                transition: 'all 0.2s ease',
              }}
              aria-label="Toggle dark mode"
            >
              {isDark ? <HiOutlineSun /> : <HiOutlineMoon />}
            </button>

            {/* Cart */}
            <NavLink
              to="/order"
              id="navbar-cart-btn"
              style={{
                position: 'relative',
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--color-primary)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
              aria-label="Cart"
            >
              <HiOutlineShoppingCart />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    minWidth: '18px',
                    height: '18px',
                    background: 'var(--color-accent)',
                    color: '#fff',
                    borderRadius: '50px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 3px',
                  }}
                >
                  {cartCount}
                </motion.span>
              )}
            </NavLink>

            {/* Order CTA (desktop) */}
            <NavLink 
              to="/order" 
              className={`btn-primary hidden lg:inline-flex ${location.pathname === '/order' ? 'lg:hidden' : ''}`} 
              id="navbar-order-btn" 
              style={{ padding: '0.5rem 1.2rem', fontSize: '0.88rem' }}
            >
              Order Now
            </NavLink>

            {/* Theme Toggle - Desktop only in main bar */}
            <button
              onClick={toggleTheme}
              className="hidden sm:flex w-[38px] h-[38px] rounded-[var(--radius-sm)] bg-transparent border border-[var(--color-border)] text-[var(--color-text)] items-center justify-center cursor-pointer text-[1.2rem] transition-all duration-200 hover:bg-[var(--color-border)]"
              aria-label="Toggle theme"
            >
              {isDark ? <HiOutlineSun /> : <HiOutlineMoon />}
            </button>

            <button
              id="navbar-menu-btn"
              onClick={() => setMenuOpen((p) => !p)}
              className="flex lg:hidden w-[38px] h-[38px] rounded-[var(--radius-sm)] bg-transparent border border-[var(--color-border)] text-[var(--color-text)] items-center justify-center cursor-pointer text-[1.3rem]"
              aria-label="Open menu"
            >
              {menuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </nav>
      </div>

      {/* ── Mobile Menu ───────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              background: 'var(--color-navbar-bg)',
              backdropFilter: 'blur(16px)',
              borderTop: '1px solid var(--color-border)',
              overflow: 'hidden',
            }}
          >
            <div className="px-4 py-4 md:px-6">
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {NAV_LINKS.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      onClick={() => setMenuOpen(false)}
                      style={({ isActive }) => ({
                        display: 'block',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 500,
                        color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                        background: isActive ? 'var(--color-accent-warm)' : 'transparent',
                        transition: 'all 0.2s',
                      })}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
                <li style={{ marginTop: '0.5rem' }}>
                  {/* Mobile-only Theme Toggle (inside menu) */}
                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center justify-between p-[0.75rem] rounded-[var(--radius-md)] border border-[var(--color-border)] text-[var(--color-text)] mt-4"
                  >
                    <span className="font-semibold">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                    {isDark ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
                  </button>

                  <NavLink
                    to="/order"
                    onClick={() => setMenuOpen(false)}
                    className="btn-primary w-full text-center mt-4"
                    style={{ padding: '0.875rem' }}
                  >
                    Order Now
                  </NavLink>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
