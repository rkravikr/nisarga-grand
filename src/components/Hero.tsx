import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineArrowRight, HiOutlineStar } from 'react-icons/hi'

const FLOATING_FOODS = [
  { emoji: '🍛', size: 60, x: '8%',  y: '20%', delay: 0,    duration: 6 },
  { emoji: '🥘', size: 50, x: '85%', y: '15%', delay: 1.5,  duration: 7 },
  { emoji: '🫓', size: 45, x: '75%', y: '65%', delay: 0.8,  duration: 5.5 },
  { emoji: '🥤', size: 48, x: '12%', y: '72%', delay: 2,    duration: 6.5 },
  { emoji: '🍜', size: 42, x: '55%', y: '10%', delay: 0.4,  duration: 7.5 },
  { emoji: '🫕', size: 38, x: '92%', y: '50%', delay: 1.2,  duration: 5 },
  { emoji: '🥗', size: 40, x: '3%',  y: '48%', delay: 1.8,  duration: 8 },
]

const STATS = [
  { value: '50+', label: 'Menu Items' },
  { value: '10K+', label: 'Happy Customers' },
  { value: '₹200', label: 'Avg. Spend' },
  { value: '4.8★', label: 'Rating' },
]

const Hero = () => {
  const bgRef = useRef<HTMLDivElement>(null)

  // Parallax on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 12
      bgRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.08)`
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'var(--color-base)',
        paddingTop: 'clamp(80px, 10vh, 120px)',
      }}
    >
      {/* ── Animated Background Gradient ─────────── */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-10%',
          transition: 'transform 0.12s ease-out',
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '45%',
            height: '70%',
            background:
              'radial-gradient(ellipse, rgba(46,125,50,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            width: '35%',
            height: '55%',
            background:
              'radial-gradient(ellipse, rgba(212,168,67,0.12) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
      </div>

      {/* ── Floating Food Emojis ──────────────────── */}
      {FLOATING_FOODS.map((food, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -18, 0], rotate: [0, 6, -6, 0] }}
          transition={{
            duration: food.duration,
            delay: food.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: food.x,
            top: food.y,
            fontSize: `${food.size}px`,
            zIndex: 1,
            opacity: 0.35,
            filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.12))',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {food.emoji}
        </motion.div>
      ))}

      <div
        className="px-4 md:px-6 lg:px-8 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-16 items-center"
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: '120px',
          paddingBottom: '100px',
          gap: '2rem',
        }}
      >
        {/* Left — Text */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge">🍃 100% Pure Vegetarian · RT Nagar, Bengaluru</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 8vw, 3.8rem)',
              lineHeight: 1.1,
              color: 'var(--color-text)',
              marginTop: '1rem',
              marginBottom: '0',
            }}
          >
            Simple Food.{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Grand Experience.
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.75,
              marginTop: '1.25rem',
              marginBottom: '0',
              maxWidth: '480px',
            }}
          >
            South Indian classics, rich North Indian curries, street-style fast food
            — all under one roof. Family meals starting at just ₹60 a plate.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}
          >
            <Link to="/order" className="btn-primary" id="hero-order-btn">
              Order Now <HiOutlineArrowRight />
            </Link>
            <Link to="/menu" className="btn-outline" id="hero-menu-btn">
              Explore Menu
            </Link>
          </motion.div>

          {/* Review pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.625rem',
              marginTop: '1.75rem',
              padding: '0.5rem 1rem',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '50px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ display: 'flex', gap: '2px' }}>
              {[1,2,3,4,5].map((s) => (
                <HiOutlineStar
                  key={s}
                  style={{ color: '#F59E0B', fill: '#F59E0B', fontSize: '0.9rem' }}
                />
              ))}
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)' }}>
              4.8
            </span>
            <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              · 10,000+ customers love us
            </span>
          </motion.div>
        </div>

        {/* Right — hero visual card */}
        <motion.div
          initial={{ opacity: 0, x: 60, rotateY: 15 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          style={{ perspective: '1000px' }}
          className="hidden lg:block"
        >
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(46,125,50,0.2), 0 8px 24px rgba(0,0,0,0.1)',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1567337710282-00832b415979?w=700&q=80"
              alt="Delicious south Indian food spread at Nisarga Grand"
              style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
            />
            {/* Floating info card */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.25rem',
                right: '1.25rem',
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(16px)',
                borderRadius: 'var(--radius-md)',
                padding: '0.875rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.875rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              }}
            >
              <span style={{ fontSize: '2rem' }}>🍛</span>
              <div>
                <p style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem', color: '#1a1a1a' }}>
                  Today's Special
                </p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#6b7280' }}>
                  Bisi Bele Bath · Only ₹100
                </p>
              </div>
              <span style={{ marginLeft: 'auto', background: '#2E7D32', color: '#fff', borderRadius: '50px', padding: '0.3rem 0.8rem', fontSize: '0.78rem', fontWeight: 700 }}>
                NEW
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Stats Bar ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
          zIndex: 10,
        }}
      >
        <div className="px-4 md:px-6">
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-0"
          >
            {STATS.map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: '1.25rem 1rem',
                  textAlign: 'center',
                  borderRight: '1px solid var(--color-border)',
                  borderBottom: i < 2 ? '1px solid var(--color-border)' : 'none',
                }}
                className="md:border-b-0"
              >
                <p style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--color-primary)' }}>
                  {stat.value}
                </p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
