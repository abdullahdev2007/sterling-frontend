import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section">
      <div className="container empty-cart">
        <div className="eyebrow" style={{ justifyContent: 'center' }}>404</div>
        <h1 style={{ fontSize: 36, marginBottom: 12 }}>PAGE NOT FOUND</h1>
        <p style={{ marginBottom: 24 }}>
          The part you're looking for might have been moved or doesn't exist.
        </p>
        <Link to="/" className="btn btn-primary">Back to home</Link>
      </div>
    </section>
  )
}
