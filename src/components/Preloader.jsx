import { useEffect, useState } from 'react'
import './Preloader.css'

export default function Preloader() {
  const [phase, setPhase] = useState('visible')

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase('fading'), 2200)
    const hideTimer = setTimeout(() => setPhase('hidden'), 2900)
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer) }
  }, [])

  if (phase === 'hidden') return null

  return (
    <div className={`preloader ${phase === 'fading' ? 'preloader--out' : ''}`}>
      <div className="pl-content">
        <div className="pl-logo">
          <span className="pl-logo-m">M</span>
          <span className="pl-logo-ui">UI</span>
          <span className="pl-logo-dot" />
        </div>
        <p className="pl-tagline">PERSONAL TRAINER</p>
        <div className="pl-bar-wrap">
          <div className="pl-bar" />
        </div>
      </div>
    </div>
  )
}
