import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Cart() {
  const { items, removeItem, updateQty, subtotal } = useCart()
  const [name, setName] = useState('')
  const [city, setCity] = useState('')

  const buildWhatsAppLink = () => {
    const lines = items.map(
      (i) => `${i.qty} x ${i.name} — LKR ${(i.price * i.qty).toLocaleString()}`
    )
    const msg =
      `New order from Sterling Lanka Performance website:\n\n` +
      lines.join('\n') +
      `\n\nSubtotal: LKR ${subtotal.toLocaleString()}` +
      `\n\nName: ${name || '(not provided)'}` +
      `\nDelivery city: ${city || '(not provided)'}`
    return `https://wa.me/94775241577?text=${encodeURIComponent(msg)}`
  }

  if (items.length === 0) {
    return (
      <section className="section">
        <div className="container empty-cart">
          <h2 style={{ marginBottom: 12 }}>Your cart is empty</h2>
          <p style={{ marginBottom: 24 }}>Add some parts from the shop to get started.</p>
          <Link to="/shop" className="btn btn-primary">Continue shopping</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="container">
        <div className="eyebrow">YOUR SELECTION</div>
        <div className="section-head">
          <h2>Shopping cart</h2>
          <span style={{ fontSize: 14, color: 'var(--grey-text)' }}>{items.length} items ready to order</span>
        </div>

        <div className="cart-layout">
          <div>
            {items.map((item) => (
              <div className="cart-row" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <div className="product-brand">{item.brand}</div>
                  <div className="product-name">{item.name}</div>
                  <div className="product-meta">{item.vehicle}</div>
                  <div className="qty-control" style={{ marginTop: 8, width: 'fit-content' }}>
                    <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="cart-item-price">LKR {(item.price * item.qty).toLocaleString()}</div>
                  <button className="remove-link" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <h3>Order summary</h3>
            <div className="summary-row"><span>Subtotal</span><span>LKR {subtotal.toLocaleString()}</span></div>
            <div className="summary-row"><span>Delivery</span><span>Confirmed on WhatsApp</span></div>
            <div className="summary-row summary-total"><span>Estimated total</span><span>LKR {subtotal.toLocaleString()}</span></div>
            <p style={{ fontSize: 12, color: 'var(--grey-text)' }}>
              Final availability, fitment and delivery cost will be confirmed by our team.
            </p>

            <div className="field">
              <label>Your name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" />
            </div>
            <div className="field">
              <label>Delivery city</label>
              <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Colombo" />
            </div>

            <a href={buildWhatsAppLink()} className="btn btn-whatsapp" target="_blank" rel="noreferrer">
              Send order via WhatsApp
            </a>
            <div style={{ textAlign: 'center', marginTop: 14 }}>
              <Link to="/shop">← Continue shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
