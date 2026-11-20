import { Link, NavLink } from 'react-router-dom'
import { Search, Heart } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'

export default function Header() {
  const { itemCount } = useCart()
  const { items: wishlistItems } = useWishlist()

  return (
    <>
      <div className="top-bar">
        <div className="container">
          <span>AUTHORIZED PERFORMANCE PARTS DEALER IN SRI LANKA</span>
          <span>ISLANDWIDE DELIVERY · WHATSAPP +94 77 524 1577</span>
        </div>
      </div>
      <header className="site-header">
        <Link to="/" className="logo-link">
          <img src="/images/logo.png" alt="Sterlings Lanka Performance" className="logo-img" />
        </Link>
        <nav className="main-nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
          <NavLink to="/shop" className={({ isActive }) => (isActive ? 'active' : '')}>Shop Parts</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink>
        </nav>
        <div className="header-actions">
          <button className="icon-btn" aria-label="Search"><Search size={16} /></button>
          <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
            <Heart size={16} />
            {wishlistItems.length > 0 && <span className="cart-count">{wishlistItems.length}</span>}
          </Link>
          <Link to="/cart" className="icon-btn">
            Cart
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </Link>
        </div>
      </header>
    </>
  )
}
