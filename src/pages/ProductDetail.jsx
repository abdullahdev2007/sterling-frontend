import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { products } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug)
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [openSection, setOpenSection] = useState('details')

  if (!product) {
    return (
      <div className="container section">
        <p>Product not found.</p>
        <Link to="/shop">← Back to shop</Link>
      </div>
    )
  }

  const whatsappMsg = encodeURIComponent(
    `Hi, I'd like to buy ${qty} x ${product.name} (LKR ${product.price.toLocaleString()} each).`
  )

  return (
    <section className="section">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/shop">{product.category}</Link> / {product.name}
        </div>

        <div className="pd-layout">
          <div>
            <div className="pd-main-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="pd-thumbs">
              {[1, 2, 3].map((n) => (
                <div className="thumb-sm" key={n}>
                  <img src={product.image} alt="" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="product-brand">{product.brand} PERFORMANCE</div>
            <h1 style={{ fontSize: 30, margin: '8px 0' }}>{product.name.toUpperCase()}</h1>
            <div className="pd-rating">
              <Star size={14} fill="currentColor" style={{ display: 'inline', marginRight: 4 }} />
              {product.rating} · {product.reviews} reviews
            </div>
            <div className="pd-price">LKR {product.price.toLocaleString()}</div>
            <p style={{ color: 'var(--grey-text)' }}>{product.description}</p>

            <div className="fitment-box">
              <div>
                <div style={{ fontSize: 11, color: 'var(--grey-text)' }}>Vehicle fitment</div>
                <strong>{product.vehicle}</strong>
              </div>
              <a href="#">Change</a>
            </div>

            <div className="qty-row">
              <div className="qty-control">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)}>+</button>
              </div>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => addItem(product, qty)}>
                Add to cart
              </button>
            </div>

            <a href={`https://wa.me/94775241577?text=${whatsappMsg}`} className="btn btn-whatsapp">
              Buy now on WhatsApp
            </a>

            <div className="trust-row">
              <span>✓ Genuine product</span>
              <span>✓ Fitment support</span>
              <span>✓ Secure delivery</span>
            </div>

            <div className="accordion-item">
              <div className="accordion-head" onClick={() => setOpenSection(openSection === 'details' ? '' : 'details')}>
                Product details {openSection === 'details' ? '−' : '+'}
              </div>
              {openSection === 'details' && <div className="accordion-body">{product.details}</div>}
            </div>
            <div className="accordion-item">
              <div className="accordion-head" onClick={() => setOpenSection(openSection === 'specs' ? '' : 'specs')}>
                Specifications & compatibility {openSection === 'specs' ? '−' : '+'}
              </div>
              {openSection === 'specs' && (
                <div className="accordion-body">Confirm exact fitment with our team on WhatsApp before ordering.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
