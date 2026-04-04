import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineTrash, HiOutlineCheckCircle, HiOutlineArrowLeft } from 'react-icons/hi'
import { useCartStore } from '../store/cartStore'
import { useAdminStore } from '../store/adminStore'

const OrderPage = () => {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore()

  const [diningOption, setDiningOption] = useState<'dine-in' | 'takeaway'>('dine-in')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [tableNo, setTableNo] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const gst = subtotal * 0.05 // 5% GST
  const total = subtotal + gst

  const addOrder = useAdminStore((s) => s.addOrder)

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return

    setIsSubmitting(true)

    const orderPayload = {
      customerName: name || 'Guest',
      phone: phone || 'N/A',
      type: diningOption,
      tableNo,
      items: items.map(item => ({
        dishId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total,
    }

    try {
      await addOrder(orderPayload)
      setIsSubmitting(false)
      setIsSuccess(true)
      clearCart()
      window.scrollTo(0, 0)
    } catch (err) {
      alert("Error placing order. Please close the page, clear your cart, and try again.")
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <main className="min-h-screen pt-[120px] pb-20 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            background: 'var(--color-surface)',
            padding: '4rem 2rem',
            borderRadius: 'var(--radius-xl)',
            textAlign: 'center',
            maxWidth: '500px',
            width: '100%',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--color-border)',
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, delay: 0.2 }}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#dcfce7',
              color: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              margin: '0 auto 1.5rem',
            }}
          >
            <HiOutlineCheckCircle />
          </motion.div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, margin: '0 0 1rem' }}>
            Order Confirmed!
          </h2>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
            Thank you for your order, {name || 'Guest'}. 
            {diningOption === 'dine-in' 
              ? ` We are preparing your food for Table ${tableNo}.` 
              : ` Your order will be ready for takeaway shortly at the counter.`}
          </p>
          <Link to="/menu" className="btn-primary" style={{ display: 'inline-flex', padding: '0.875rem 2rem' }}>
            Order More
          </Link>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pb-20 pt-[100px]" style={{ background: 'var(--color-base)' }}>
      <div className="container-custom">
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/menu" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontWeight: 600, transition: 'color 0.2s' }}>
            <HiOutlineArrowLeft /> Back to Menu
          </Link>
        </div>

        <h1 className="section-title" style={{ marginBottom: '2rem' }}>
          Checkout
        </h1>

        {items.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '6rem 2rem',
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px dashed var(--color-border)',
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>🛒</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Your cart is empty
            </h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/menu" className="btn-primary">
              Explore Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Cart Items & Details */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              
              {/* Cart List */}
              <div
                style={{
                  background: 'var(--color-surface)',
                  padding: '2rem',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
                  Your Order ({items.length} items)
                </h3>
                
                <div className="flex flex-col gap-4">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: '1rem',
                          background: 'var(--color-base)',
                          borderRadius: 'var(--radius-lg)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          style={{ width: '70px', height: '70px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} 
                        />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ margin: '0 0 0.25rem', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1rem' }}>
                            {item.name}
                          </h4>
                          <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                            ₹{item.price}
                          </span>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--color-surface)', padding: '0.25rem', borderRadius: '50px', border: '1px solid var(--color-border)' }}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            style={{ width: '32px', height: '32px', borderRadius: '50%', border: 'none', background: 'var(--color-base)', cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer', fontWeight: 700 }}
                          >
                            -
                          </button>
                          <span style={{ width: '20px', textAlign: 'center', fontWeight: 600 }}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            style={{ width: '32px', height: '32px', borderRadius: '50%', border: 'none', background: 'var(--color-base)', cursor: 'pointer', fontWeight: 700 }}
                          >
                            +
                          </button>
                        </div>
                        
                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.id)}
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            border: 'none',
                            background: '#fee2e2',
                            color: '#ef4444',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            marginLeft: '0.5rem'
                          }}
                        >
                          <HiOutlineTrash />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Personal Details Form */}
              <div
                style={{
                  background: 'var(--color-surface)',
                  padding: '2rem',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
                  Dining Details
                </h3>

                <form id="checkout-form" onSubmit={handlePlaceOrder} className="flex flex-col gap-5">
                  <div className="flex gap-4 mb-2">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>
                      <input type="radio" value="dine-in" checked={diningOption === 'dine-in'} onChange={() => setDiningOption('dine-in')} style={{ accentColor: 'var(--color-primary)', width: '18px', height: '18px' }} />
                      Dine-in
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>
                      <input type="radio" value="takeaway" checked={diningOption === 'takeaway'} onChange={() => setDiningOption('takeaway')} style={{ accentColor: 'var(--color-primary)', width: '18px', height: '18px' }} />
                      Takeaway
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</label>
                      <input 
                        required 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="e.g. Rahul Sharma" 
                        style={{ padding: '0.875rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-base)', outline: 'none', fontFamily: 'var(--font-body)' }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone Number</label>
                      <input 
                        required 
                        type="tel" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        placeholder="e.g. 9876543210" 
                        style={{ padding: '0.875rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-base)', outline: 'none', fontFamily: 'var(--font-body)' }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                      />
                    </div>
                  </div>

                  {diningOption === 'dine-in' && (
                    <div className="flex flex-col gap-2">
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Table Number</label>
                      <select 
                        required 
                        value={tableNo} 
                        onChange={(e) => setTableNo(e.target.value)}
                        style={{ padding: '0.875rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-base)', outline: 'none', fontFamily: 'var(--font-body)', cursor: 'pointer' }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                      >
                        <option value="" disabled>Select Table</option>
                        {Array.from({length: 20}, (_, i) => (
                          <option key={i+1} value={i+1}>Table {i+1}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </form>
              </div>

            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5">
              <div
                style={{
                  background: 'var(--color-surface)',
                  padding: '2rem',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--color-border)',
                  position: 'sticky',
                  top: '100px'
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
                  Bill Summary
                </h3>

                <div className="flex flex-col gap-3 mb-6 pb-6" style={{ borderBottom: '1px dashed var(--color-border)' }}>
                  <div className="flex justify-between" style={{ color: 'var(--color-text)', fontSize: '0.95rem' }}>
                    <span>Subtotal</span>
                    <span style={{ fontWeight: 600 }}>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between" style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                    <span>GST (5%)</span>
                    <span style={{ fontWeight: 600 }}>₹{gst.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8">
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700 }}>To Pay</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                    ₹{total.toFixed(2)}
                  </span>
                </div>

                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: isSubmitting ? 'var(--color-primary-dk)' : 'var(--color-primary)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 12px rgba(46,125,50,0.3)',
                  }}
                >
                  {isSubmitting ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }} />
                  ) : (
                    'Place Order'
                  )}
                </button>
                <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  Payment will be collected securely at the counter.
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  )
}

export default OrderPage
