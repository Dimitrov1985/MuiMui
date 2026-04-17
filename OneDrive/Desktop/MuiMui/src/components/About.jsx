import { useLang } from "../context/LanguageContext";
import "./About.css";

export default function About() {
  const { t } = useLang();
  const a = t.about;

  return (
    <section className="about-section" id="about">
      <div className="section">
        <div className="about-grid">
          <div className="about-photo reveal">
            <div className="about-photo-inner">
              <div className="about-photo-placeholder">
                <svg viewBox="0 0 320 420" fill="none">
                  <rect width="320" height="420" fill="#161616" />
                  <circle cx="160" cy="130" r="65" fill="#1e1e1e" />
                  <ellipse cx="160" cy="360" rx="110" ry="95" fill="#1e1e1e" />
                  <text
                    x="160"
                    y="410"
                    textAnchor="middle"
                    fill="#333"
                    fontSize="12"
                    fontFamily="Raleway"
                    fontWeight="600"
                  >
                    YOUR PHOTO
                  </text>
                </svg>
              </div>
              <div className="about-experience-tag">
                <span className="exp-num">{a.expNum}</span>
                <span className="exp-text">
                  {a.expText.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i === 0 && <br />}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </div>

          <div className="about-content">
            <p className="section-label reveal">{a.label}</p>
            <h2 className="section-title reveal reveal-delay-1">
              {a.title1}
              <br />
              <span className="outline-text">{a.title2}</span>
            </h2>

            <p className="about-tagline reveal reveal-delay-2">
              {a.tagline} <strong>{a.taglineStrong}</strong> {a.taglineEnd}
            </p>

            <p className="about-desc reveal reveal-delay-3">{a.desc}</p>

            <ul className="about-list reveal reveal-delay-3">
              {a.achievements.map((item, i) => (
                <li key={i}>
                  <span className="list-dot" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="about-actions reveal reveal-delay-4">
              <a
                href="https://wa.me/66945953441"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                {a.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
