const pillars = [
  { title: 'Genuine products', text: 'Quality parts sourced from trusted performance and automotive brands.' },
  { title: 'Fitment support', text: 'Guidance based on your vehicle model, generation and intended setup.' },
  { title: 'Build-focused advice', text: 'Recommendations shaped around your goals — not simply the most expensive option.' },
  { title: 'Islandwide access', text: 'Products and delivery coordination available for customers across Sri Lanka.' },
]

export default function About() {
  return (
    <>
      <section className="section">
        <div className="container about-hero-row">
          <div>
            <div className="eyebrow">ABOUT STERLING LANKA</div>
            <h1 style={{ fontSize: 44 }}>BUILT AROUND<br />REAL PERFORMANCE.</h1>
          </div>
          <p style={{ color: 'var(--grey-text)', maxWidth: 380 }}>
            We connect Sri Lanka's automotive enthusiasts with genuine spare parts and trusted
            performance upgrades — supported by practical product knowledge and fitment guidance.
          </p>
        </div>
      </section>

      <section className="about-split">
        <div className="about-image">
          <img src="/images/intake.jpg" alt="Engine detail" />
          <span className="about-image-tag">PERFORMANCE · RELIABILITY · FITMENT</span>
        </div>
        <div className="about-text">
          <div className="eyebrow">WHO WE ARE</div>
          <h2>Parts chosen for the way you drive.</h2>
          <p style={{ color: 'var(--grey-text)', marginBottom: 16 }}>
            Sterling Lanka Performance serves owners who care about both performance and
            dependability. Whether you are maintaining a daily-driven vehicle, restoring a JDM
            platform or planning a focused performance build, our goal is to help you choose the
            right component with clarity.
          </p>
          <p style={{ color: 'var(--grey-text)', marginBottom: 24 }}>
            We focus on recognized brands, compatible applications and straightforward
            communication before an order is confirmed.
          </p>
          <a href="/shop" className="btn btn-primary" style={{ width: 'fit-content' }}>Explore our parts</a>
        </div>
      </section>

      <section className="section section-grey">
        <div className="container">
          <div className="eyebrow">WHAT WE STAND FOR</div>
          <div className="section-head"><h2>Confidence in every part</h2></div>
          <div className="grid-4">
            {pillars.map((p) => (
              <div className="feature-card" key={p.title}>
                <h3>{p.title.toUpperCase()}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div>
          <div className="eyebrow" style={{ color: '#a1a1aa' }}>OUR SPECIALIZATION</div>
          <h2>EVO · STI · JDM BUILDS</h2>
          <p style={{ color: '#a1a1aa', marginTop: 10 }}>
            Engine performance, turbo and intake, braking, suspension, exhaust, cooling and essential replacement parts.
          </p>
        </div>
        <a href="https://wa.me/94775241577" className="btn btn-primary" style={{ background: '#fff', color: '#0a0a0a', borderColor: '#fff' }}>
          Discuss your build
        </a>
      </section>
    </>
  )
}
