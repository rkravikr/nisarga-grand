import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineX, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'

const GALLERY_IMAGES = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&q=80',
    alt: 'South Indian food spread at Nisarga Grand',
    span: 'large',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80',
    alt: 'Crispy Masala Dosa',
    span: 'small',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80',
    alt: 'Rich Paneer Butter Masala',
    span: 'small',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=600&q=80',
    alt: 'Mumbai-style Pav Bhaji',
    span: 'small',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=600&q=80',
    alt: 'Refreshing Mango Lassi',
    span: 'small',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
    alt: 'Fragrant Veg Biryani',
    span: 'large',
  },
]

const GalleryPreview = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [lightbox, setLightbox] = useState<number | null>(null)

  const openLightbox = (id: number) => setLightbox(id)
  const closeLightbox = () => setLightbox(null)

  const currentImg = GALLERY_IMAGES.find((g) => g.id === lightbox)
  const currentIdx = GALLERY_IMAGES.findIndex((g) => g.id === lightbox)

  const goPrev = () => {
    const newIdx = currentIdx === 0 ? GALLERY_IMAGES.length - 1 : currentIdx - 1
    setLightbox(GALLERY_IMAGES[newIdx].id)
  }
  const goNext = () => {
    const newIdx = currentIdx === GALLERY_IMAGES.length - 1 ? 0 : currentIdx + 1
    setLightbox(GALLERY_IMAGES[newIdx].id)
  }

  return (
    <section
      id="gallery-preview"
      ref={ref}
      style={{ padding: '100px 0', background: 'var(--color-base)' }}
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span className="badge">📸 Gallery</span>
          <h2 className="section-title" style={{ marginTop: '0.75rem' }}>
            A Feast for the Eyes
          </h2>
          <p className="section-subtitle" style={{ margin: '0.875rem auto 0' }}>
            Fresh, vibrant and made with love — just like everything we serve.
          </p>
        </motion.div>

        {/* Masonry-style Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'auto auto',
            gap: '1rem',
          }}
        >
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => openLightbox(img.id)}
              style={{
                gridColumn: img.span === 'large' ? 'span 2' : 'span 1',
                overflow: 'hidden',
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
                position: 'relative',
                height: img.span === 'large' ? '280px' : '200px',
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                  display: 'block',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.08)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')
                }
              />
              {/* Overlay on hover */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0)',
                  transition: 'background 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius-lg)',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0.35)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0)')
                }
              >
                <span style={{ fontSize: '2rem', opacity: 0, transition: 'opacity 0.3s' }}>🔍</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          style={{ textAlign: 'center', marginTop: '2.5rem' }}
        >
          <Link to="/gallery" className="btn-outline">
            View Full Gallery →
          </Link>
        </motion.div>
      </div>

      {/* ── Lightbox ──────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && currentImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.92)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              backdropFilter: 'blur(4px)',
            }}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                fontSize: '1.5rem',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <HiOutlineX />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              style={{
                position: 'absolute',
                left: '1.25rem',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                fontSize: '1.5rem',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <HiOutlineChevronLeft />
            </button>

            {/* Image */}
            <motion.img
              key={lightbox}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={currentImg.src}
              alt={currentImg.alt}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '90vw',
                maxHeight: '82vh',
                borderRadius: 'var(--radius-lg)',
                objectFit: 'contain',
                boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
              }}
            />

            {/* Caption */}
            <p
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.85rem',
                margin: 0,
                whiteSpace: 'nowrap',
              }}
            >
              {currentImg.alt} · {currentIdx + 1} / {GALLERY_IMAGES.length}
            </p>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext() }}
              style={{
                position: 'absolute',
                right: '1.25rem',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                fontSize: '1.5rem',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <HiOutlineChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default GalleryPreview
