import './GiftPile.css'

function GiftPile() {
  return (
    <div className="gift-pile-stage">
      <svg viewBox="0 0 620 450" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gSapphireF" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4A7BFF"/><stop offset="1" stopColor="#1E3A8A"/></linearGradient>
          <linearGradient id="gSapphireT" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#A5C1FF"/><stop offset="1" stopColor="#5F86F0"/></linearGradient>
          <linearGradient id="gSapphireS" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1B3A8F"/><stop offset="1" stopColor="#0F1F52"/></linearGradient>

          <linearGradient id="gRubyF" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FF5A7A"/><stop offset="1" stopColor="#C2163E"/></linearGradient>
          <linearGradient id="gRubyT" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFB3C3"/><stop offset="1" stopColor="#F26D8F"/></linearGradient>
          <linearGradient id="gRubyS" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#A9143C"/><stop offset="1" stopColor="#5C0A22"/></linearGradient>

          <linearGradient id="gEmeraldF" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#35E1A0"/><stop offset="1" stopColor="#0D9B63"/></linearGradient>
          <linearGradient id="gEmeraldT" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#A5F2D0"/><stop offset="1" stopColor="#59DDAE"/></linearGradient>
          <linearGradient id="gEmeraldS" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0D9B63"/><stop offset="1" stopColor="#055236"/></linearGradient>

          <linearGradient id="gAmberF" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFD966"/><stop offset="1" stopColor="#F0A91A"/></linearGradient>
          <linearGradient id="gAmberT" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFF1C1"/><stop offset="1" stopColor="#FFD97A"/></linearGradient>
          <linearGradient id="gAmberS" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#D99114"/><stop offset="1" stopColor="#8A5B06"/></linearGradient>

          <linearGradient id="gPlumF" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#C77DFF"/><stop offset="1" stopColor="#7E3AB8"/></linearGradient>
          <linearGradient id="gPlumT" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#E6C8FF"/><stop offset="1" stopColor="#C28FF0"/></linearGradient>
          <linearGradient id="gPlumS" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7E3AB8"/><stop offset="1" stopColor="#4A2070"/></linearGradient>

          <linearGradient id="gTealF" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#42D9E6"/><stop offset="1" stopColor="#0C9BA8"/></linearGradient>
          <linearGradient id="gTealT" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#B0F4F8"/><stop offset="1" stopColor="#66DCE6"/></linearGradient>
          <linearGradient id="gTealS" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0C9BA8"/><stop offset="1" stopColor="#055E68"/></linearGradient>

          <linearGradient id="gGoldRibbon" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFEDB0"/><stop offset="0.5" stopColor="#FFC94B"/><stop offset="1" stopColor="#E09B1A"/></linearGradient>

          <radialGradient id="gGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.75"/>
            <stop offset="1" stopColor="#ffffff" stopOpacity="0"/>
          </radialGradient>

          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#1B1B3A" floodOpacity="0.25"/>
          </filter>
          <filter id="cartoonShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#0F0F2A" floodOpacity="0.35"/>
          </filter>
        </defs>

        <ellipse cx="310" cy="422" rx="240" ry="28" fill="#1B1B3A" opacity="0.2"/>

        <g transform="rotate(-1 345 235)" filter="url(#softShadow)">
          <g className="bounce" style={{ ['--d' as string]: '0.9s' }}>
            <polygon points="440,140 470,122 470,312 440,330" fill="url(#gSapphireS)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <polygon points="250,140 280,122 470,122 440,140" fill="url(#gSapphireT)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <polygon points="331,140 361,122 389,122 359,140" fill="url(#gGoldRibbon)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <rect x="250" y="140" width="190" height="190" fill="url(#gSapphireF)" stroke="#1B1B3A" strokeWidth="3"/>
            <rect x="331" y="140" width="28" height="190" fill="url(#gGoldRibbon)" stroke="#1B1B3A" strokeWidth="3"/>
            <polygon points="253.60,137.84 443.60,137.84 461.60,127.04 271.60,127.04" fill="url(#gGoldRibbon)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <polygon points="443.60,137.84 461.60,127.04 461.60,317.04 443.60,327.84" fill="url(#gGoldRibbon)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <ellipse cx="285" cy="170" rx="40" ry="24" fill="url(#gGlow)"/>
            <ellipse cx="295" cy="170" rx="12" ry="7" fill="#ffffff" opacity="0.5"/>
          </g>
        </g>

        <g transform="rotate(-7 175 325)" filter="url(#cartoonShadow)">
          <g className="bounce" style={{ ['--d' as string]: '0.2s' }}>
            <polygon points="260,250 290,232 290,382 260,400" fill="url(#gRubyS)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <polygon points="90,250 120,232 290,232 260,250" fill="url(#gRubyT)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <polygon points="163,250 193,232 217,232 187,250" fill="url(#gGoldRibbon)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <rect x="90" y="250" width="170" height="150" fill="url(#gRubyF)" stroke="#1B1B3A" strokeWidth="3"/>
            <rect x="163" y="250" width="24" height="150" fill="url(#gGoldRibbon)" stroke="#1B1B3A" strokeWidth="3"/>
            <polygon points="93.60,247.84 263.60,247.84 281.60,237.04 111.60,237.04" fill="url(#gGoldRibbon)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <polygon points="263.60,247.84 281.60,237.04 281.60,387.04 263.60,397.84" fill="url(#gGoldRibbon)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <ellipse cx="120" cy="276" rx="34" ry="20" fill="url(#gGlow)"/>
            <ellipse cx="128" cy="276" rx="10" ry="6" fill="#ffffff" opacity="0.6"/>
          </g>
        </g>

        <g transform="rotate(6 420 325)" filter="url(#cartoonShadow)">
          <g className="bounce" style={{ ['--d' as string]: '1.4s' }}>
            <polygon points="510,250 540,232 540,382 510,400" fill="url(#gEmeraldS)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <polygon points="330,250 360,232 540,232 510,250" fill="url(#gEmeraldT)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <polygon points="408,250 438,232 462,232 432,250" fill="url(#gGoldRibbon)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <rect x="330" y="250" width="180" height="150" fill="url(#gEmeraldF)" stroke="#1B1B3A" strokeWidth="3"/>
            <rect x="408" y="250" width="24" height="150" fill="url(#gGoldRibbon)" stroke="#1B1B3A" strokeWidth="3"/>
            <polygon points="333.60,247.84 513.60,247.84 531.60,237.04 351.60,237.04" fill="url(#gGoldRibbon)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <polygon points="513.60,247.84 531.60,237.04 531.60,387.04 513.60,397.84" fill="url(#gGoldRibbon)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <ellipse cx="365" cy="276" rx="34" ry="20" fill="url(#gGlow)"/>
            <ellipse cx="373" cy="276" rx="10" ry="6" fill="#ffffff" opacity="0.6"/>
          </g>
        </g>

        <g transform="rotate(-9 220 175)" filter="url(#softShadow)">
          <g className="bounce" style={{ ['--d' as string]: '0.6s' }}>
            <polygon points="290,115 320,97 320,217 290,235" fill="url(#gAmberS)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <polygon points="150,115 180,97 320,97 290,115" fill="url(#gAmberT)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <polygon points="210,115 240,97 260,97 230,115" fill="url(#gGoldRibbon)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <rect x="150" y="115" width="140" height="120" fill="url(#gAmberF)" stroke="#1B1B3A" strokeWidth="3"/>
            <rect x="210" y="115" width="20" height="120" fill="url(#gGoldRibbon)" stroke="#1B1B3A" strokeWidth="3"/>
            <polygon points="153.60,112.84 293.60,112.84 311.60,102.04 171.60,102.04" fill="url(#gGoldRibbon)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <polygon points="293.60,112.84 311.60,102.04 311.60,222.04 293.60,232.84" fill="url(#gGoldRibbon)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <ellipse cx="180" cy="137" rx="28" ry="16" fill="url(#gGlow)"/>
            <ellipse cx="186" cy="137" rx="8" ry="5" fill="#ffffff" opacity="0.7"/>
          </g>
        </g>

        <g transform="rotate(9 430 175)" filter="url(#softShadow)">
          <g className="bounce" style={{ ['--d' as string]: '1.9s' }}>
            <polygon points="500,115 530,97 530,217 500,235" fill="url(#gPlumS)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <polygon points="360,115 390,97 530,97 500,115" fill="url(#gPlumT)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <polygon points="420,115 450,97 470,97 440,115" fill="url(#gGoldRibbon)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <rect x="360" y="115" width="140" height="120" fill="url(#gPlumF)" stroke="#1B1B3A" strokeWidth="3"/>
            <rect x="420" y="115" width="20" height="120" fill="url(#gGoldRibbon)" stroke="#1B1B3A" strokeWidth="3"/>
            <polygon points="363.60,112.84 503.60,112.84 521.60,102.04 381.60,102.04" fill="url(#gGoldRibbon)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <polygon points="503.60,112.84 521.60,102.04 521.60,222.04 503.60,232.84" fill="url(#gGoldRibbon)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <ellipse cx="390" cy="137" rx="28" ry="16" fill="url(#gGlow)"/>
            <ellipse cx="396" cy="137" rx="8" ry="5" fill="#ffffff" opacity="0.7"/>
          </g>
        </g>

        <g transform="rotate(4 330 70)" filter="url(#cartoonShadow)">
          <g className="bounce" style={{ ['--d' as string]: '2.4s' }}>
            <polygon points="390,20 420,2 420,102 390,120" fill="url(#gTealS)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <polygon points="270,20 300,2 420,2 390,20" fill="url(#gTealT)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <polygon points="321,20 351,2 369,2 339,20" fill="url(#gGoldRibbon)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <rect x="270" y="20" width="120" height="100" fill="url(#gTealF)" stroke="#1B1B3A" strokeWidth="3"/>
            <rect x="321" y="20" width="18" height="100" fill="url(#gGoldRibbon)" stroke="#1B1B3A" strokeWidth="3"/>
            <polygon points="273.60,17.84 393.60,17.84 411.60,7.04 291.60,7.04" fill="url(#gGoldRibbon)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <polygon points="393.60,17.84 411.60,7.04 411.60,107.04 393.60,117.84" fill="url(#gGoldRibbon)" stroke="#1B1B3A" strokeWidth="3" strokeLinejoin="round"/>
            <ellipse cx="296" cy="40" rx="16" ry="10" fill="url(#gGlow)"/>
            <ellipse cx="302" cy="40" rx="6" ry="4" fill="#ffffff" opacity="0.8"/>
          </g>
        </g>

        <g fill="#FFF5B0">
          <path className="sparkle" style={{ ['--d' as string]: '0s' }} d="M195 40 l5 14 14 5 -14 5 -5 14 -5 -14 -14 -5 14 -5 Z"/>
          <path className="sparkle" style={{ ['--d' as string]: '0.9s' }} d="M500 60 l4 12 12 4 -12 4 -4 12 -4 -12 -12 -4 12 -4 Z"/>
          <path className="sparkle" style={{ ['--d' as string]: '1.6s' }} d="M60 200 l5 13 13 5 -13 5 -5 13 -5 -13 -13 -5 13 -5 Z"/>
          <path className="sparkle" style={{ ['--d' as string]: '2.2s' }} d="M545 290 l4 11 11 4 -11 4 -4 11 -4 -11 -11 -4 11 -4 Z"/>
          <path className="sparkle" style={{ ['--d' as string]: '1.2s' }} d="M440 30 l4 12 12 4 -12 4 -4 12 -4 -12 -12 -4 12 -4 Z"/>
        </g>
      </svg>
    </div>
  )
}

export default GiftPile