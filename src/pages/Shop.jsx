import { useState, useMemo } from 'react'
import { Search, LayoutGrid, SlidersHorizontal } from 'lucide-react'
import { products, categories, vehicles } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Shop() {
  const [query, setQuery] = useState('')
  const [activeCategories, setActiveCategories] = useState([])
  const [sort, setSort] = useState('newest')
  const [inStockOnly, setInStockOnly] = useState(false)

  const toggleCategory = (name) => {
    setActiveCategories((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    )
  }

  const activeFilterCount = activeCategories.length + (inStockOnly ? 1 : 0)

  const clearAll = () => {
    setActiveCategories([])
    setInStockOnly(false)
  }

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchesQuery =
        query.trim() === '' ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase())
      const matchesCategory =
        activeCategories.length === 0 || activeCategories.includes(p.category)
      const matchesStock = !inStockOnly || p.tag === 'IN STOCK'
      return matchesQuery && matchesCategory && matchesStock
    })
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    return list
  }, [query, activeCategories, sort, inStockOnly])

  return (
    <section className="section">
      <div className="container">
        <div className="eyebrow">PERFORMANCE CATALOGUE</div>
        <div className="section-head">
          <h2>Shop all parts</h2>
          <p style={{ color: 'var(--grey-text)', fontSize: 14 }}>
            Genuine components, trusted brands and fitment support for your build.
          </p>
        </div>

        <div className="search-bar">
          <Search size={16} color="#6b7280" />
          <input
            placeholder="Search product, brand or SKU"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="shop-layout">
          <aside>
            <div className="filter-sidebar-head">
              <span>FILTER PARTS</span>
              <button className="clear-all-btn" onClick={clearAll}>Clear all</button>
            </div>
            <div className="filter-box">
              <h4>Category</h4>
              {categories.map((c) => (
                <div className="filter-row" key={c.name}>
                  <label>
                    <input
                      type="checkbox"
                      checked={activeCategories.includes(c.name)}
                      onChange={() => toggleCategory(c.name)}
                    />
                    {c.name}
                  </label>
                  <span>{c.count}</span>
                </div>
              ))}
            </div>
            <div className="filter-box">
              <h4>Vehicle</h4>
              {vehicles.map((v) => (
                <div className="filter-row" key={v.name}>
                  <label><input type="checkbox" readOnly />{v.name}</label>
                  <span>{v.count}</span>
                </div>
              ))}
            </div>
            <div className="filter-box">
              <h4>Availability</h4>
              <div className="filter-row">
                <label>
                  <input type="checkbox" checked={inStockOnly} onChange={() => setInStockOnly((v) => !v)} />
                  In stock only
                </label>
              </div>
            </div>
          </aside>

          <div>
            <div className="shop-toolbar">
              <span>Showing {filtered.length} of {products.length} products</span>
              <div className="toolbar-right">
                <button className="filters-pill">
                  <SlidersHorizontal size={14} /> Filters
                  {activeFilterCount > 0 && <span className="filters-count">{activeFilterCount}</span>}
                </button>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="newest">Newest first</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <span className="grid-toggle"><LayoutGrid size={14} /> Grid</span>
              </div>
            </div>
            <div className="product-grid">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            {filtered.length === 0 && (
              <p style={{ color: 'var(--grey-text)', marginTop: 24 }}>No parts match your search.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
