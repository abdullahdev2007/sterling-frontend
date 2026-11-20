import { Link } from 'react-router-dom'
import { Target, Disc, Wrench, Flame } from 'lucide-react'
import { products, categories } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'

const icons = [Target, Disc, Wrench, Flame]

export default function Home() {
  const featured = products.slice(0, 4)

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="eyebrow" style={{ color: '#d4d4d8' }}>BUILT FOR MORE</div>
          <h1>PERFORMANCE<br />WITHOUT<br />COMPROMISE.</h1>
          <p>Genuine spare parts and proven upgrades for Evo, STI and JDM builds — sourced by people who understand performance.</p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary">Shop performance parts</Link>
            <a href="https://wa.me/94775241577" className="btn" style={{ color: '#fff', borderColor: '#fff' }}>Talk to a specialist</a>
          </div>
          <div className="hero-stats">
            <div><b>100%</b>Genuine parts</div>
            <div><b>Islandwide</b>Fast delivery</div>
            <div><b>Expert</b>Part matching</div>
          </div>
        </div>
        <div className="hero-badge">
          <span>FEATURED BUILD</span>
          <strong>JDM STREET SPEC</strong>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="eyebrow">FIND YOUR UPGRADE</div>
          <div className="section-head">
            <h2>Shop by category</h2>
            <Link to="/shop" style={{ fontSize: 14, fontWeight: 600 }}>View all parts →</Link>
          </div>
          <div className="grid-4">
            {categories.map((cat, i) => {
              const Icon = icons[i]
              return (
                <div className="feature-card" key={cat.name}>
                  <Icon size={28} strokeWidth={1.5} />
                  <h3>{cat.name.toUpperCase()}</h3>
                  <p>{cat.count} products available</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section-grey">
        <div className="container">
          <div className="eyebrow">HAND-PICKED PARTS</div>
          <div className="section-head"><h2>Featured performance</h2></div>
          <div className="product-grid">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <section className="brands-strip">
        <div className="container brands-row">
          <span className="brands-label">TRUSTED BRANDS</span>
          <div className="brands-list">
            <span className="brand-name">HKS</span>
            <span className="brand-name brand-brembo">brembo</span>
            <span className="brand-name brand-tein">TEIN</span>
            <span className="brand-name brand-cobb">COBB<small>TUNING</small></span>
            <span className="brand-name">GReddy</span>
            <span className="brand-name brand-rays">RAYS</span>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div>
          <div className="eyebrow" style={{ color: '#a1a1aa' }}>THE RIGHT PART. THE FIRST TIME.</div>
          <h2>Not sure what fits<br />your build?</h2>
        </div>
        <a href="https://wa.me/94775241577" className="btn btn-primary" style={{ background: '#fff', color: '#0a0a0a', borderColor: '#fff' }}>
          Ask on WhatsApp
        </a>
      </section>
    </>
  )
}
