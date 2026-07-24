import React from 'react';

/**
 * TitanicLandmark — the RMS Titanic resting on the ocean floor at 3,784m.
 * Rendered as an SVG side-view silhouette with scattered debris, marine growth,
 * and an etched inscription. No card. The ship IS the UI.
 */
export default function TitanicLandmark({ onClick }) {
  return (
    <div
      className="relative w-full"
      style={{ height: '320px', cursor: 'pointer' }}
      onClick={onClick}
    >
      {/* Seafloor sediment layer */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '60px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(30,20,10,0.4) 40%, rgba(40,28,15,0.7) 100%)',
          borderTop: '1px solid rgba(80,60,30,0.3)',
        }}
      />

      {/* Debris field — scattered small bits */}
      {[
        [12, 0], [20, 10], [45, -5], [68, 8], [80, 2], [95, -8],
        [110, 5], [130, -3], [160, 12], [175, 0], [190, -6]
      ].map(([x, y], i) => (
        <div
          key={i}
          className="absolute"
          style={{
            bottom: `62px`,
            left: `${x * 5}px`,
            transform: `translateY(${y}px)`,
          }}
        >
          <svg width={8 + (i % 3) * 5} height={4 + (i % 2) * 3} viewBox="0 0 14 8">
            <rect x="0" y="2" width="14" height="4" rx="1" fill="rgba(80,55,30,0.6)" />
          </svg>
        </div>
      ))}

      {/* Main Titanic SVG — ship silhouette, bow section on left */}
      <div className="absolute bottom-[52px] left-1/2 -translate-x-1/2" style={{ width: '820px' }}>
        <svg
          width="820"
          height="180"
          viewBox="0 0 820 180"
          style={{
            filter: 'drop-shadow(0 0 18px rgba(80,50,20,0.5)) drop-shadow(0 0 40px rgba(100,60,20,0.25))',
            overflow: 'visible',
          }}
        >
          <defs>
            <linearGradient id="hullRust" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4a2a0a" />
              <stop offset="30%" stopColor="#6b3a12" />
              <stop offset="60%" stopColor="#5a3010" />
              <stop offset="100%" stopColor="#3a1e08" />
            </linearGradient>
            <linearGradient id="deckRust" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7a4820" />
              <stop offset="100%" stopColor="#4a2a0a" />
            </linearGradient>
            <filter id="rustFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise"/>
              <feColorMatrix type="saturate" values="0.3" in="noise" result="grayNoise"/>
              <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blended"/>
              <feComposite in="blended" in2="SourceGraphic" operator="in"/>
            </filter>
            <radialGradient id="marineGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0,180,100,0.15)"/>
              <stop offset="100%" stopColor="transparent"/>
            </radialGradient>
          </defs>

          {/* ── HULL — main continuous body ─────────────────────────────── */}
          {/* Bow section — pointed nose */}
          <path
            d="M 40 90 L 10 120 L 8 140 L 20 148 L 40 148 Z"
            fill="url(#hullRust)" opacity="0.95"
          />

          {/* Main hull body */}
          <path
            d="M 40 90 L 780 90 L 800 100 L 800 148 L 40 148 Z"
            fill="url(#hullRust)" opacity="0.95"
          />

          {/* Hull portholes */}
          {Array.from({length: 28}, (_, i) => (
            <ellipse
              key={i}
              cx={60 + i * 27}
              cy={108}
              rx="5"
              ry="4"
              fill="rgba(20,12,4,0.9)"
              stroke="rgba(120,80,30,0.5)"
              strokeWidth="1"
            />
          ))}

          {/* Waterline stripe */}
          <rect x="40" y="138" width="762" height="6" rx="2" fill="rgba(180,120,40,0.35)" />

          {/* ── DECK ─────────────────────────────────────────────────────── */}
          <rect x="40" y="86" width="760" height="8" fill="url(#deckRust)" opacity="0.9" rx="1"/>

          {/* ── SUPERSTRUCTURE ──────────────────────────────────────────── */}
          {/* Bridge structure — forward */}
          <rect x="100" y="58" width="200" height="30" fill="#3a2008" opacity="0.95" rx="2"/>
          <rect x="100" y="44" width="180" height="16" fill="#4a2a0c" opacity="0.9" rx="1"/>
          <rect x="110" y="32" width="140" height="14" fill="#5a3410" opacity="0.85" rx="1"/>

          {/* Bridge windows */}
          {Array.from({length: 8}, (_, i) => (
            <rect
              key={i}
              x={108 + i * 24}
              y={63}
              width="14"
              height="10"
              rx="1"
              fill="rgba(20,12,4,0.95)"
              stroke="rgba(100,65,20,0.4)"
              strokeWidth="0.8"
            />
          ))}

          {/* Second superstructure section */}
          <rect x="360" y="60" width="160" height="28" fill="#3a2008" opacity="0.9" rx="2"/>
          <rect x="370" y="48" width="120" height="14" fill="#482808" opacity="0.85" rx="1"/>
          {Array.from({length: 5}, (_, i) => (
            <rect key={i} x={375 + i * 24} y={65} width="14" height="10" rx="1" fill="rgba(15,9,3,0.95)" stroke="rgba(100,65,20,0.35)" strokeWidth="0.8"/>
          ))}

          {/* Aft superstructure */}
          <rect x="600" y="62" width="120" height="26" fill="#3a2008" opacity="0.88" rx="2"/>
          {Array.from({length: 4}, (_, i) => (
            <rect key={i} x={608 + i * 28} y={68} width="14" height="10" rx="1" fill="rgba(15,9,3,0.9)" stroke="rgba(100,65,20,0.3)" strokeWidth="0.8"/>
          ))}

          {/* ── FUNNELS (4 iconic Titanic funnels) ──────────────────────── */}
          {[155, 250, 355, 450].map((fx, i) => (
            <g key={i}>
              {/* Funnel body */}
              <path
                d={`M ${fx - 14} ${i < 3 ? 32 : 44} L ${fx + 14} ${i < 3 ? 32 : 44} L ${fx + 10} ${86} L ${fx - 10} ${86} Z`}
                fill={i < 3 ? "#4a2808" : "#3a2208"}
                opacity="0.95"
              />
              {/* Funnel top band — black cap */}
              <rect x={fx - 14} y={i < 3 ? 26 : 38} width="28" height={i < 3 ? 10 : 10} rx="1" fill="#1a1008" opacity="0.95"/>
              {/* Funnel glow — thermal vent effect */}
              <ellipse cx={fx} cy={i < 3 ? 26 : 38} rx="12" ry="4" fill="rgba(0,200,120,0.08)"/>
            </g>
          ))}

          {/* ── MASTS (broken, lying at angles) ─────────────────────────── */}
          {/* Forward mast — fallen */}
          <line x1="180" y1="32" x2="80" y2="82" stroke="#3a2008" strokeWidth="5" strokeLinecap="round" opacity="0.85"/>
          {/* Crow's nest piece */}
          <rect x="84" y="77" width="16" height="8" rx="2" fill="#3a2008" opacity="0.8"/>

          {/* Aft mast — tilted */}
          <line x1="640" y1="62" x2="700" y2="84" stroke="#3a2008" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>

          {/* ── PROPELLER SHAFT (partially visible at stern) ───────────── */}
          <ellipse cx="795" cy="148" rx="6" ry="14" fill="#2a1808" opacity="0.9"/>
          <ellipse cx="795" cy="148" rx="3" ry="10" fill="#1a1005" opacity="0.9"/>

          {/* ── CRANE ARMS / DAVITS ──────────────────────────────────────── */}
          {[220, 280, 680, 730].map((dx, i) => (
            <g key={i}>
              <line x1={dx} y1="86" x2={dx + (i < 2 ? 8 : -8)} y2="64" stroke="#3a2008" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
              <line x1={dx + (i < 2 ? 8 : -8)} y1="64" x2={dx + (i < 2 ? 22 : -22)} y2="68" stroke="#3a2008" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
            </g>
          ))}

          {/* ── MARINE GROWTH (coral/algae bloom patches) ────────────────── */}
          {[[80, 100, 30, 14], [220, 92, 20, 10], [450, 102, 25, 12], [650, 96, 18, 9], [740, 104, 22, 11]].map(([x, y, rx, ry], i) => (
            <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill="rgba(0,160,80,0.12)" />
          ))}

          {/* ── RUST STREAKS ─────────────────────────────────────────────── */}
          {[100, 180, 280, 400, 520, 640, 720].map((x, i) => (
            <path key={i} d={`M ${x} 95 Q ${x + 3} ${110 + i * 3} ${x} ${125 + i * 2}`} fill="none" stroke="rgba(180,80,20,0.3)" strokeWidth={1.5 + i % 2}/>
          ))}

          {/* ── SEDIMENT accumulation on deck ────────────────────────────── */}
          <path d="M 40 86 Q 200 84 300 86 Q 400 88 500 86 Q 600 84 780 86" fill="none" stroke="rgba(80,60,30,0.35)" strokeWidth="3"/>

        </svg>
      </div>

      {/* Volumetric Submarine Searchlight Beam Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-75"
        style={{
          background: 'radial-gradient(ellipse 60% 80% at 50% 40%, rgba(251,191,36,0.08) 0%, rgba(180,100,30,0.03) 50%, transparent 100%)',
        }}
      />

      {/* Atmospheric Rusticle Fog Overlay */}
      <div
        className="absolute inset-x-0 bottom-12 h-32 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(60,35,15,0.2) 60%, rgba(30,18,8,0.4) 100%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Inscription — etched into the water, not a card */}
      <div
        className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 w-full z-20"
        style={{ pointerEvents: 'none' }}
      >
        {/* Top glow */}
        <div className="w-64 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(180,100,30,0.4), transparent)' }} />

        <div
          className="text-[8px] font-mono tracking-[0.45em] uppercase"
          style={{
            color: 'rgba(200,140,60,0.55)',
            textShadow: '0 0 20px rgba(200,120,40,0.4)',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          HISTORIC LANDMARK • DEPTH 3,784 METERS
        </div>
        <div
          className="text-base sm:text-lg font-bold tracking-[0.2em] uppercase"
          style={{
            fontFamily: "'Cinzel', serif",
            color: 'transparent',
            backgroundImage: 'linear-gradient(135deg, rgba(245,158,11,0.9) 0%, rgba(217,119,6,0.8) 50%, rgba(180,83,9,0.7) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            textShadow: 'none',
            filter: 'drop-shadow(0 0 16px rgba(245,158,11,0.4))',
          }}
        >
          R.M.S. TITANIC WRECK SITE
        </div>

        {/* Educational Fact Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
          <span className="text-[8px] font-mono px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-200">
            SANK: APRIL 15, 1912
          </span>
          <span className="text-[8px] font-mono px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-200">
            DISCOVERED: 1985 (BALLARD)
          </span>
          <span className="text-[8px] font-mono px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-200">
            PRESSURE: 380 ATM (5,500 PSI)
          </span>
        </div>

        <div
          className="text-[8px] font-mono tracking-[0.3em] mt-1"
          style={{
            color: 'rgba(245,158,11,0.6)',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          CLICK WRECK SILHOUETTE FOR COMPLETE HISTORICAL DEEP SCAN
        </div>
        <div className="w-64 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(180,100,30,0.4), transparent)' }} />
      </div>

      {/* Marine snow settling on wreck */}
      {Array.from({length: 16}, (_, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-0.5 rounded-full"
          style={{
            left: `${10 + i * 6}%`,
            bottom: `${60 + (i % 4) * 12}px`,
            backgroundColor: 'rgba(200,180,140,0.3)',
            animation: `floatSlow ${6 + i * 0.5}s ease-in-out infinite ${i * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
}
