import { useLang } from '../context/LanguageContext'
import './Services.css'

export default function Services() {
  const { t } = useLang()
  const s = t.services

  return (
    <section className="services-section" id="services">
      <div className="section">
        <div className="services-header">
          <div>
            <p className="section-label reveal">{s.label}</p>
            <h2 className="section-title reveal reveal-delay-1">
              {s.title1}<br />
              <span className="outline-text-dark">{s.title2}</span>
            </h2>
          </div>
          <p className="services-intro reveal reveal-delay-2">
            {s.intro1}<br />
            {s.intro2} <strong>{s.intro3}</strong>
          </p>
        </div>

        <div className="services-grid">
          {s.cards.map((card, i) => (
            <div
              key={i}
              className={`service-card reveal reveal-delay-${i + 1} ${i === 0 ? 'service-card--highlight' : ''}`}
            >
              {i === 0 && <div className="card-badge">{s.popular}</div>}
              <div className="card-icon">{card.icon}</div>
              <div className="card-subtitle">{card.subtitle}</div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-desc">{card.desc}</p>
              <ul className="card-features">
                {card.features.map((f, j) => (
                  <li key={j}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7l4 4 6-6" stroke="#c8f542" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="card-price">{card.price}</div>
              <a
                href="https://wa.me/66945953441"
                className={`btn ${i === 0 ? 'btn-primary' : 'btn-outline'}`}
                target="_blank"
                rel="noreferrer"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {s.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
