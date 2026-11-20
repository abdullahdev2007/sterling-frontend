export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <img src="/images/logo.png" alt="Sterlings Lanka Performance" className="logo-img footer-logo" />
            <p style={{ color: 'var(--grey-text)', fontSize: 14, marginTop: 16 }}>
              Genuine parts. Trusted brands.<br />Built for performance.
            </p>
          </div>
          <div>
            <h4>SHOP</h4>
            <ul>
              <li>All parts</li>
              <li>New arrivals</li>
              <li>Offers</li>
              <li>Brands</li>
            </ul>
          </div>
          <div>
            <h4>SUPPORT</h4>
            <ul>
              <li>Contact us</li>
              <li>Delivery information</li>
              <li>FAQs</li>
              <li>Fitment help</li>
            </ul>
          </div>
          <div>
            <h4>CONTACT</h4>
            <ul>
              <li>+94 77 524 1577</li>
              <li>WhatsApp</li>
              <li>Facebook</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Sterling Lanka Performance.</span>
        </div>
      </div>
    </footer>
  )
}
