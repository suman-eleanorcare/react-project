import { useState, useEffect, useRef } from 'react'
import './App.css'

const stats = [
  { value: '₹4.2M', label: 'Total Donated' },
  { value: '12,400+', label: 'Active Donors' },
  { value: '380+', label: 'Campaigns Funded' },
  { value: '98%', label: 'Fund Delivery Rate' },
]

const services = [
  {
    icon: '◎',
    title: 'Campaign Creation',
    desc: 'Launch a cause in minutes. Customizable pages, real-time tracking, and built-in storytelling tools designed to convert visitors into believers.',
    tag: 'Core',
  },
  {
    icon: '⬡',
    title: 'Smart Fund Routing',
    desc: 'Automated disbursements directly to verified beneficiaries. Multi-currency support with transparent fee breakdowns before every transaction.',
    tag: 'Finance',
  },
  {
    icon: '⌖',
    title: 'Donor CRM',
    desc: 'Know your community. Track giving history, segment audiences, and send personalized impact updates that keep donors coming back.',
    tag: 'Engagement',
  },
  {
    icon: '◈',
    title: 'Recurring Giving',
    desc: 'Sustainable funding through monthly, quarterly, or annual pledge programs with zero-friction pause and cancel options for donors.',
    tag: 'Revenue',
  },
  {
    icon: '⬔',
    title: 'Analytics & Reports',
    desc: 'Board-ready dashboards and exportable tax receipts. Every dollar tracked, visualized, and attributed for full compliance.',
    tag: 'Insights',
  },
  {
    icon: '⬡',
    title: 'Matching Gifts',
    desc: 'Partner with corporate donors for 2x or 3x matching campaigns. Automated verification and instant employer matching integrations.',
    tag: 'Growth',
  },
]

const testimonials = [
  {
    quote: "Helping Humanity transformed how we fund our community kitchen. We went from chaotic spreadsheets to a fully automated pipeline — and tripled our donor retention.",
    name: 'Priya Nair',
    role: 'Director, Akshara Foundation',
    avatar: 'P',
  },
  {
    quote: "The recurring giving feature alone paid for itself in the first month. Our donors love the transparency, and we love the predictable revenue.",
    name: 'Marcus Chen',
    role: 'Founder, UrbanRoots NGO',
    avatar: 'M',
  },
  {
    quote: "Finally, a platform that treats nonprofits as sophisticated operators. The analytics are what our board had been asking for — for years.",
    name: 'Aisha Okonkwo',
    role: 'CFO, LightBridge Org',
    avatar: 'A',
  },
]

const features = [
  { label: 'No platform fee on first ₹10K raised', badge: 'Free Tier' },
  { label: 'PCI-DSS Level 1 compliant payments', badge: 'Security' },
  { label: 'Real-time Slack & email donor alerts', badge: 'Automation' },
  { label: 'Embeddable widgets for any website', badge: 'Integrations' },
  { label: 'FCRA-compliant reporting exports', badge: 'Compliance' },
  { label: 'Dedicated onboarding specialist', badge: 'Support' },
  { label: 'A/B test your campaign copy', badge: 'Optimization' },
  { label: 'Multilingual donor checkout flows', badge: 'Global' },
]

function useIntersection(ref: React.RefObject<Element | null>, threshold = 0.15) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, threshold])
  return visible
}

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <div className="stat-card" style={{ animationDelay: `${delay}ms` }}>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export default function App() {
  const [activeTest, setActiveTest] = useState(0)
  const servicesRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)
  const servicesVis = useIntersection(servicesRef)
  const featuresVis = useIntersection(featuresRef)
  const testimonialsVis = useIntersection(testimonialsRef)

  useEffect(() => {
    const t = setInterval(() => setActiveTest(p => (p + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="root">
      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">
          <span className="logo-mark">◎</span>
          <span className="logo-text">Helping Humanity</span>
        </div>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#features">Features</a>
          <a href="#testimonials">Stories</a>
          <a href="#cta" className="nav-cta">Start Free</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">Trusted by 380+ nonprofits across India &amp; beyond</div>
        <h1 className="hero-title">
          Donations,<br />
          <em>done right.</em>
        </h1>
        <p className="hero-sub">
          The modern platform for nonprofits that want more than a payment link —
          full campaign lifecycle management, donor intelligence, and radical transparency.
        </p>
        <div className="hero-actions">
          <a href="#cta" className="btn-primary">Launch Your Campaign</a>
          <a href="#services" className="btn-ghost">See How It Works →</a>
        </div>
        <div className="stats-row">
          {stats.map((s, i) => <StatCard key={s.label} {...s} delay={i * 100} />)}
        </div>
        <div className="hero-noise" aria-hidden="true" />
      </section>

      {/* SERVICES */}
      <section id="services" ref={servicesRef} className={`services-section ${servicesVis ? 'in-view' : ''}`}>
        <div className="section-eyebrow">What We Offer</div>
        <h2 className="section-title">Every tool your cause needs</h2>
        <p className="section-sub">Built for the full arc of fundraising — from first ask to final report.</p>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card" key={s.title} style={{ animationDelay: `${i * 80}ms` }}>
              <div className="service-header">
                <span className="service-icon">{s.icon}</span>
                <span className="service-tag">{s.tag}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" ref={featuresRef} className={`features-section ${featuresVis ? 'in-view' : ''}`}>
        <div className="features-inner">
          <div className="features-left">
            <div className="section-eyebrow">Platform Features</div>
            <h2 className="section-title">Everything in one place</h2>
            <p className="section-sub">No plugins. No patchwork. A single, cohesive system that grows with your organization.</p>
            <a href="#cta" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>See Full Feature List</a>
          </div>
          <ul className="features-list">
            {features.map((f, i) => (
              <li key={f.label} className="feature-item" style={{ animationDelay: `${i * 60}ms` }}>
                <span className="feature-check">✓</span>
                <span className="feature-label">{f.label}</span>
                <span className="feature-badge">{f.badge}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" ref={testimonialsRef} className={`testimonials-section ${testimonialsVis ? 'in-view' : ''}`}>
        <div className="section-eyebrow">Stories</div>
        <h2 className="section-title">Causes that changed the game</h2>
        <div className="testimonials-track">
          {testimonials.map((t, i) => (
            <div key={t.name} className={`testimonial-card ${i === activeTest ? 'active' : ''}`}>
              <p className="testimonial-quote">"{t.quote}"</p>
              <div className="testimonial-person">
                <div className="testimonial-avatar">{t.avatar}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <button key={i} className={`dot ${i === activeTest ? 'active' : ''}`} onClick={() => setActiveTest(i)} aria-label={`Testimonial ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-title">Ready to fund your mission?</h2>
          <p className="cta-sub">Start for free. No credit card required. Your first ₹10K raised, zero platform fee.</p>
          <div className="cta-form">
            <input className="cta-input" type="email" placeholder="your@organization.org" />
            <button className="btn-primary cta-btn">Get Started Free</button>
          </div>
          <p className="cta-note">Join 12,400+ donors and 380+ nonprofits already on Helping Humanity</p>
        </div>
        <div className="cta-orb" aria-hidden="true" />
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">
          <span className="logo-mark">◎</span>
          <span className="logo-text">Helping Humanity</span>
        </div>
        <p className="footer-tagline">Transparent giving, for everyone.</p>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
          <a href="#">Status</a>
        </div>
        <p className="footer-copy">© 2026 Helping Humanity Technologies Pvt. Ltd. All rights reserved.</p>
      </footer>
    </div>
  )
}
