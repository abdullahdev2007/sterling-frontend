import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist()
  const { addItem } = useCart()
  const { showToast } = useToast()

  if (items.length === 0) {
    return (
      <section className="section">
        <div className="container empty-cart">
          <Heart size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
          <h2 style={{ marginBottom: 12 }}>Your wishlist is empty</h2>
          <p style={{ marginBottom: 24 }}>Tap the heart on any part to save it for later.</p>
          <Link to="/shop" className="btn btn-primary">Browse parts</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="container">
        <div className="eyebrow">SAVED FOR LATER</div>
        <div className="section-head">
          <h2>Your wishlist</h2>
          <span style={{ fontSize: 14, color: 'var(--grey-text)' }}>{items.length} items saved</span>
        </div>
        <div className="product-grid">
          {items.map((product) => (
            <div className="product-card" key={product.id}>
              <Link to={`/product/${product.slug}`}>
                <div className="thumb">
                  {product.tag && <span className="badge">{product.tag}</span>}
                  <img src={product.image} alt={product.name} loading="lazy" />
                </div>
              </Link>
              <div className="product-info">
                <div className="product-brand">{product.brand}</div>
                <Link to={`/product/${product.slug}`}><div className="product-name">{product.name}</div></Link>
                <div className="product-meta">{product.vehicle}</div>
                <div className="product-price-row">
                  <span className="product-price">LKR {product.price.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                  <button
                    className="btn btn-primary"
                    style={{ flex: 1, justifyContent: 'center', padding: '10px 12px', fontSize: 13 }}
                    onClick={() => { addItem(product, 1); showToast(`${product.name} added to cart`) }}
                  >
                    Add to cart
                  </button>
                  <button className="remove-link" onClick={() => removeFromWishlist(product.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
