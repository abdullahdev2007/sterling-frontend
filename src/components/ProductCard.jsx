import { Link } from 'react-router-dom'
import { Plus, Heart } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { showToast } = useToast()
  const wishlisted = isWishlisted(product.id)

  const handleAdd = () => {
    addItem(product, 1)
    showToast(`${product.name} added to cart`)
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    toggleWishlist(product)
    showToast(wishlisted ? `Removed from wishlist` : `Saved to wishlist`)
  }

  return (
    <div className="product-card">
      <Link to={`/product/${product.slug}`}>
        <div className="thumb">
          {product.tag && <span className="badge">{product.tag}</span>}
          <button
            className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
            aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
            aria-pressed={wishlisted}
            onClick={handleWishlist}
          >
            <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
          <img src={product.image} alt={product.name} loading="lazy" />
        </div>
      </Link>
      <div className="product-info">
        <div className="product-brand">{product.brand}</div>
        <Link to={`/product/${product.slug}`}>
          <div className="product-name">{product.name}</div>
        </Link>
        <div className="product-meta">{product.vehicle}</div>
        <div className="product-price-row">
          <span className="product-price">LKR {product.price.toLocaleString()}</span>
          <button
            className="add-btn"
            aria-label={`Add ${product.name} to cart`}
            onClick={handleAdd}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
