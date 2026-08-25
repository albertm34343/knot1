import { useEffect } from 'react'
import './SplashScreen.css'

function SplashScreen() {
  useEffect(() => {
    const root = document.documentElement

    const positionGift = () => {
      const logo = document.querySelector('.logo') as HTMLElement | null
      const slot = document.getElementById('giftSlot') as HTMLElement | null
      if (!logo || !slot) return

      const logoRect = logo.getBoundingClientRect()
      const slotRect = slot.getBoundingClientRect()
      if (slotRect.width === 0) return

      const targetLeft = logoRect.left + logoRect.width * 0.58 - slotRect.width / 2
      const targetTop = logoRect.top - slotRect.height * 0.92

      const impactX = targetLeft - slotRect.left
      const impactY = targetTop - slotRect.top
      const startY = -160 - slotRect.top - slotRect.height

      root.style.setProperty('--impact-x', impactX + 'px')
      root.style.setProperty('--impact-y', impactY + 'px')
      root.style.setProperty('--start-y', startY + 'px')
    }

    positionGift()

    if (document.fonts?.ready) {
      document.fonts.ready.then(positionGift)
    }

    window.addEventListener('resize', positionGift)
    return () => window.removeEventListener('resize', positionGift)
  }, [])

  return (
    <div className="stage">
      <div className="floor-glow"></div>
      <div className="particles" id="particles"></div>

      <div className="scene">
        <h1 className="logo" aria-label="knot">
          <span className="letter" style={{ ['--i' as string]: 0 }}>k</span>
          <span className="letter" style={{ ['--i' as string]: 1 }}>n</span>
          <span className="letter" style={{ ['--i' as string]: 2 }}>o</span>
          <span className="letter" style={{ ['--i' as string]: 3 }}>t</span>
        </h1>

        <div className="gift-slot" id="giftSlot">
          <div className="shadow"></div>
          <span className="dust dust1"></span>
          <span className="dust dust2"></span>
          <span className="dust dust3"></span>
          <span className="dust dust4"></span>

          <svg className="gift" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="ribbon" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffd76b"/>
                <stop offset="45%" stopColor="#ff8f5e"/>
                <stop offset="100%" stopColor="#ff4d75"/>
              </linearGradient>
              <linearGradient id="boxFace" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#382a54"/>
                <stop offset="100%" stopColor="#251c3a"/>
              </linearGradient>
            </defs>
            <rect x="18" y="52" width="84" height="54" rx="7" fill="url(#boxFace)"/>
            <rect x="18" y="52" width="84" height="54" rx="7" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5"/>
            <rect x="12" y="38" width="96" height="19" rx="6" fill="#3a2d54"/>
            <rect x="12" y="38" width="96" height="19" rx="6" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5"/>
            <rect x="51" y="38" width="18" height="68" fill="url(#ribbon)"/>
            <rect x="12" y="44" width="96" height="8" fill="url(#ribbon)"/>
            <path d="M55 40 L48 62 L60 56 Z" fill="url(#ribbon)"/>
            <path d="M65 40 L72 62 L60 56 Z" fill="url(#ribbon)"/>
            <path d="M58 32 C40 14 16 18 20 34 C23 47 44 44 58 33 Z" fill="url(#ribbon)"/>
            <path d="M62 32 C80 14 104 18 100 34 C97 47 76 44 62 33 Z" fill="url(#ribbon)"/>
            <rect x="52" y="25" width="16" height="16" rx="4" fill="url(#ribbon)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default SplashScreen