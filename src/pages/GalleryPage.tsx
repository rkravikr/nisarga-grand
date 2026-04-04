import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineX, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
  'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
  'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&q=80',
  'https://images.unsplash.com/photo-1589302168068-964664d93cb0?w=800&q=80',
  'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80',
  'https://images.unsplash.com/photo-1615557960916-5f4791effe9d?w=800&q=80',
  'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&q=80',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
  'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=800&q=80',
  'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&q=80',
]

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedImage((prev) => (prev === null ? null : prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedImage((prev) => (prev === null ? null : prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1))
  }

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
          <span className="badge">📸 Our World</span>
          <h1 className="section-title" style={{ marginTop: '0.75rem' }}>
            The Gallery
          </h1>
          <p className="section-subtitle" style={{ margin: '0.75rem auto 0' }}>
            A glimpse into the warmth, ambiance, and culinary artistry at Nisarga Grand.
          </p>
        </div>
      </div>

      {/* ── Masonry Grid ────────────────────────── */}
      <div className="container-custom" style={{ marginTop: '3rem' }}>
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {GALLERY_IMAGES.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              onClick={() => setSelectedImage(idx)}
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                cursor: 'zoom-in',
                position: 'relative',
                display: 'inline-block',
                width: '100%',
              }}
              className="group"
            >
              <img
                src={src}
                alt={`Gallery image ${idx + 1}`}
                style={{ width: '100%', display: 'block', transition: 'transform 0.5s ease' }}
                className="group-hover:scale-105"
              />
              <div 
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'rgba(0,0,0,0.3)', 
                  opacity: 0, 
                  transition: 'opacity 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                className="group-hover:opacity-100"
              >
                <span style={{ color: '#fff', fontSize: '2rem' }}>⤢</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Lightbox Overlay ────────────────────────── */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.9)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={() => setSelectedImage(null)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: '#fff', fontSize: '2.5rem', cursor: 'pointer' }}
            >
              <HiOutlineX />
            </button>

            <button
              onClick={handlePrev}
              style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '2.5rem', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)' }}
            >
              <HiOutlineChevronLeft />
            </button>

            <button
              onClick={handleNext}
              style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '2.5rem', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)' }}
            >
              <HiOutlineChevronRight />
            </button>

            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              src={GALLERY_IMAGES[selectedImage]}
              alt="Expanded view"
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
              style={{ maxHeight: '90vh', maxWidth: '90vw', borderRadius: 'var(--radius-lg)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default GalleryPage
