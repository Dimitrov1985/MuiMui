import { useLang } from '../context/LanguageContext'
import './Footer.css'

export default function Footer() {
  const { t } = useLang()
  const f = t.footer

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <span className="logo-bracket">[</span>
          COACH<span className="logo-accent">PRO</span>
          <span className="logo-bracket">]</span>
        </div>
        <p className="footer-copy">{f.copy}</p>
        <a
          href="https://wa.me/66945953441"
          className="btn btn-primary footer-btn"
          target="_blank"
          rel="noreferrer"
        >
          {f.cta}
        </a>
      </div>
    </footer>
  )
}
