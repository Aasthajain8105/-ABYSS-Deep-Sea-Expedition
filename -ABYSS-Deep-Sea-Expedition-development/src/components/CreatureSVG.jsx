import React from 'react';

/**
 * SVG creature drawings — one per creature type.
 * All drawn at roughly 100×60 viewBox, facing right where applicable.
 * Props: color, glowColor, scale (applied by parent)
 */

export function CreatureSVG({ type, color = '#00f3ff', glowColor, size = 80 }) {
  const glow = glowColor || color;
  const filter = `drop-shadow(0 0 6px ${glow}99)`;

  const svgs = {

    fish: (
      <svg width={size} height={size * 0.55} viewBox="0 0 100 55" style={{ filter, overflow: 'visible' }}>
        <ellipse cx="50" cy="27" rx="32" ry="15" fill={color} opacity="0.9"/>
        <polygon points="18,27 4,18 4,36" fill={color} opacity="0.85"/>
        <path d="M 50 14 Q 62 7 60 18" fill={color} opacity="0.7"/>
        <path d="M 50 40 Q 62 47 60 36" fill={color} opacity="0.7"/>
        <circle cx="75" cy="24" r="4" fill="rgba(0,0,0,0.7)"/>
        <circle cx="76.5" cy="23" r="1.2" fill="rgba(255,255,255,0.8)"/>
        <path d="M 35 20 Q 45 27 35 34" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5"/>
      </svg>
    ),

    fish_small: (
      <svg width={size * 0.7} height={size * 0.4} viewBox="0 0 80 44" style={{ filter, overflow: 'visible' }}>
        <ellipse cx="42" cy="22" rx="26" ry="11" fill={color} opacity="0.92"/>
        <polygon points="16,22 4,14 4,30" fill={color} opacity="0.85"/>
        <path d="M 42 12 Q 52 6 50 14" fill={color} opacity="0.7"/>
        <path d="M 42 32 Q 52 38 50 30" fill={color} opacity="0.7"/>
        <circle cx="62" cy="19" r="3.5" fill="rgba(0,0,0,0.7)"/>
        <circle cx="63.2" cy="18" r="1" fill="rgba(255,255,255,0.8)"/>
      </svg>
    ),

    fish_colorful: (
      <svg width={size} height={size * 0.6} viewBox="0 0 110 60" style={{ filter, overflow: 'visible' }}>
        <ellipse cx="56" cy="30" rx="36" ry="18" fill={color} opacity="0.9"/>
        <polygon points="20,30 4,18 4,42" fill={color} opacity="0.85"/>
        <path d="M 56 13 Q 72 5 68 17" fill="#ffd700" opacity="0.8"/>
        <path d="M 56 47 Q 72 55 68 43" fill="#ffd700" opacity="0.8"/>
        <circle cx="84" cy="26" r="5" fill="rgba(0,0,0,0.7)"/>
        <circle cx="85.5" cy="24.5" r="1.5" fill="rgba(255,255,255,0.8)"/>
        <line x1="30" y1="30" x2="68" y2="30" stroke="rgba(255,215,0,0.5)" strokeWidth="1"/>
        <line x1="38" y1="14" x2="38" y2="46" stroke="rgba(255,215,0,0.3)" strokeWidth="1"/>
      </svg>
    ),

    shark: (
      <svg width={size * 1.4} height={size * 0.6} viewBox="0 0 140 60" style={{ filter, overflow: 'visible' }}>
        <ellipse cx="68" cy="32" rx="52" ry="18" fill={color} opacity="0.9"/>
        <path d="M 120 32 L 140 28 L 136 32 L 140 36 Z" fill={color} opacity="0.85"/>
        <path d="M 80 14 L 95 2 L 88 18 Z" fill={color} opacity="0.85"/>
        <path d="M 55 15 L 65 20" stroke={color} strokeWidth="2" opacity="0.7"/>
        <path d="M 60 46 L 72 54 L 72 46 L 80 54 L 80 46 Z" fill={color} opacity="0.8"/>
        <path d="M 115 32 L 120 28 L 120 36 Z" fill={color} opacity="0.9"/>
        <circle cx="112" cy="28" r="4" fill="rgba(0,0,0,0.8)"/>
        <circle cx="113.2" cy="27" r="1.3" fill="rgba(255,255,255,0.6)"/>
        <path d="M 40 32 Q 68 20 90 26 Q 100 29 100 32 Q 100 35 90 38 Q 68 44 40 32 Z" fill="rgba(255,255,255,0.08)"/>
      </svg>
    ),

    hammerhead: (
      <svg width={size * 1.3} height={size * 0.7} viewBox="0 0 130 70" style={{ filter, overflow: 'visible' }}>
        <ellipse cx="62" cy="37" rx="48" ry="17" fill={color} opacity="0.9"/>
        <rect x="100" y="26" width="28" height="22" rx="3" fill={color} opacity="0.9"/>
        <circle cx="100" cy="32" r="4" fill="rgba(0,0,0,0.8)"/>
        <circle cx="128" cy="32" r="4" fill="rgba(0,0,0,0.8)"/>
        <path d="M 76 21 L 89 6 L 84 22 Z" fill={color} opacity="0.85"/>
        <path d="M 55 52 L 68 62 L 68 52 L 78 62 L 78 52 Z" fill={color} opacity="0.8"/>
        <path d="M 110 26 L 128 26" stroke="rgba(0,0,0,0.4)" strokeWidth="1"/>
      </svg>
    ),

    whale: (
      <svg width={size * 2.2} height={size * 0.8} viewBox="0 0 220 80" style={{ filter, overflow: 'visible' }}>
        <path d="M 10 42 C 50 18 130 18 190 34 C 210 40 215 46 205 50 C 190 55 130 58 50 58 C 28 58 12 52 10 42 Z" fill={color} opacity="0.9"/>
        <path d="M 6 42 L -10 32 L -8 42 L -10 52 Z" fill={color} opacity="0.85"/>
        <path d="M 150 20 L 162 8 L 158 22 Z" fill={color} opacity="0.8"/>
        <path d="M 8 42 L -8 30 L -4 42 L -8 54 Z" fill={color} opacity="0.85"/>
        <circle cx="194" cy="36" r="6" fill="rgba(0,0,0,0.7)"/>
        <path d="M 60 20 Q 110 14 160 20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3"/>
        <ellipse cx="185" cy="34" rx="8" ry="4" fill="rgba(255,255,255,0.05)"/>
        <path d="M 38 22 Q 40 20 42 22" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
      </svg>
    ),

    dolphin: (
      <svg width={size * 1.2} height={size * 0.7} viewBox="0 0 120 70" style={{ filter, overflow: 'visible' }}>
        <path d="M 10 38 C 40 20 90 22 108 35 C 112 38 110 42 106 43 C 88 48 40 48 14 40 Z" fill={color} opacity="0.9"/>
        <path d="M 6 38 L -6 30 L -4 38 L -6 46 Z" fill={color} opacity="0.85"/>
        <path d="M 68 22 L 80 8 L 74 24 Z" fill={color} opacity="0.85"/>
        <path d="M 96 24 L 110 28" stroke={color} strokeWidth="3" opacity="0.8"/>
        <circle cx="104" cy="33" r="4" fill="rgba(0,0,0,0.7)"/>
        <path d="M 30 24 Q 60 18 90 24" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2"/>
      </svg>
    ),

    manta: (
      <svg width={size * 1.8} height={size * 1.0} viewBox="0 0 180 100" style={{ filter, overflow: 'visible' }}>
        <path d="M 90 50 Q 20 10 0 50 Q 20 90 90 50 Z" fill={color} opacity="0.88"/>
        <path d="M 90 50 Q 160 10 180 50 Q 160 90 90 50 Z" fill={color} opacity="0.88"/>
        <ellipse cx="90" cy="50" rx="18" ry="12" fill={color} opacity="0.95"/>
        <path d="M 0 50 L -20 55" stroke={color} strokeWidth="3" opacity="0.7"/>
        <path d="M 84 40 C 86 35 94 35 96 40" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
        <circle cx="82" cy="46" r="2.5" fill="rgba(0,0,0,0.8)"/>
        <circle cx="98" cy="46" r="2.5" fill="rgba(0,0,0,0.8)"/>
      </svg>
    ),

    turtle: (
      <svg width={size * 1.1} height={size * 0.9} viewBox="0 0 110 90" style={{ filter, overflow: 'visible' }}>
        <ellipse cx="55" cy="45" rx="32" ry="28" fill={color} opacity="0.9"/>
        <path d="M 30 20 Q 45 8 55 14 Q 50 20 48 28 Z" fill={color} opacity="0.8"/>
        <path d="M 30 70 Q 45 82 55 76 Q 50 70 48 62 Z" fill={color} opacity="0.8"/>
        <path d="M 78 26 Q 92 14 88 28 Q 82 32 75 36 Z" fill={color} opacity="0.8"/>
        <path d="M 78 64 Q 92 76 88 62 Q 82 58 75 54 Z" fill={color} opacity="0.8"/>
        <ellipse cx="78" cy="40" rx="10" ry="7" fill={color} opacity="0.9"/>
        <circle cx="86" cy="38" r="3.5" fill="rgba(0,0,0,0.7)"/>
        <path d="M 28 30 Q 55 18 78 30 Q 88 40 78 52 Q 55 64 28 52 Q 20 45 28 30 Z" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
        <line x1="30" y1="45" x2="77" y2="45" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <line x1="55" y1="18" x2="55" y2="72" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      </svg>
    ),

    manatee: (
      <svg width={size * 1.5} height={size * 0.8} viewBox="0 0 150 80" style={{ filter, overflow: 'visible' }}>
        <path d="M 20 40 C 40 20 100 18 128 35 C 138 40 138 48 128 52 C 100 62 40 62 20 40 Z" fill={color} opacity="0.9"/>
        <path d="M 8 40 L -4 30 L -4 50 Z" fill={color} opacity="0.85"/>
        <ellipse cx="120" cy="30" rx="12" ry="8" fill={color} opacity="0.85"/>
        <ellipse cx="120" cy="50" rx="12" ry="8" fill={color} opacity="0.85"/>
        <circle cx="128" cy="34" r="5" fill="rgba(0,0,0,0.7)"/>
        <path d="M 40 24 Q 80 16 120 26" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2.5"/>
      </svg>
    ),

    seahorse: (
      <svg width={size * 0.5} height={size * 1.2} viewBox="0 0 50 120" style={{ filter, overflow: 'visible' }}>
        <path d="M 25 10 C 38 10 42 18 38 28 C 36 34 30 36 28 44 C 26 52 27 60 26 68 C 25 80 24 90 26 100 C 28 108 25 115 22 110 C 20 105 22 98 22 90 C 20 80 18 70 20 60 C 22 50 22 42 20 34 C 18 26 14 20 20 12 C 22 8 24 8 25 10 Z" fill={color} opacity="0.88"/>
        <path d="M 22 14 Q 18 6 22 4 Q 28 2 30 8 Q 28 14 25 12 Z" fill={color} opacity="0.9"/>
        <circle cx="28" cy="10" r="3.5" fill="rgba(0,0,0,0.7)"/>
        <path d="M 38 22 Q 46 22 46 28 Q 46 34 38 34" fill="none" stroke={color} strokeWidth="3" opacity="0.7"/>
        <path d="M 36 30 Q 44 30 44 36" fill="none" stroke={color} strokeWidth="2.5" opacity="0.6"/>
        <path d="M 22 110 C 20 116 16 118 14 116 C 12 114 14 110 16 108" fill="none" stroke={color} strokeWidth="3" opacity="0.8"/>
      </svg>
    ),

    octopus: (
      <svg width={size * 1.2} height={size * 1.0} viewBox="0 0 120 100" style={{ filter, overflow: 'visible' }}>
        <ellipse cx="60" cy="32" rx="28" ry="22" fill={color} opacity="0.9"/>
        {[0,1,2,3,4,5,6,7].map(i => {
          const angle = (i / 8) * Math.PI * 2;
          const startX = 60 + Math.cos(angle) * 20;
          const startY = 32 + Math.sin(angle) * 20;
          const endX = 60 + Math.cos(angle) * 52;
          const endY = 32 + Math.sin(angle) * 48;
          const cpX = 60 + Math.cos(angle + 0.4) * 38;
          const cpY = 32 + Math.sin(angle + 0.4) * 40;
          return <path key={i} d={`M ${startX} ${startY} Q ${cpX} ${cpY} ${endX} ${endY}`} stroke={color} strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.85"/>;
        })}
        <circle cx="52" cy="26" r="4.5" fill="rgba(0,0,0,0.8)"/>
        <circle cx="68" cy="26" r="4.5" fill="rgba(0,0,0,0.8)"/>
        <circle cx="53" cy="25" r="1.5" fill="rgba(255,255,255,0.8)"/>
        <circle cx="69" cy="25" r="1.5" fill="rgba(255,255,255,0.8)"/>
      </svg>
    ),

    squid: (
      <svg width={size * 1.4} height={size * 0.8} viewBox="0 0 140 80" style={{ filter, overflow: 'visible' }}>
        <path d="M 30 40 L 100 25 L 120 40 L 100 55 Z" fill={color} opacity="0.9"/>
        <path d="M 100 32 L 118 24 L 122 32 Z" fill={color} opacity="0.8"/>
        <path d="M 100 48 L 118 56 L 122 48 Z" fill={color} opacity="0.8"/>
        {[0,1,2,3,4,5,6,7].map(i => (
          <path key={i} d={`M 30 40 Q ${14 - i*2} ${30 + (i%4)*6} ${8} ${24 + i*10}`} stroke={color} strokeWidth={i < 2 ? 3 : 2} strokeLinecap="round" fill="none" opacity="0.8"/>
        ))}
        <circle cx="112" cy="36" r="4" fill="rgba(0,0,0,0.8)"/>
        <circle cx="113.2" cy="34.8" r="1.2" fill="rgba(255,255,255,0.7)"/>
        <ellipse cx="72" cy="40" rx="20" ry="8" fill="rgba(255,255,255,0.05)"/>
      </svg>
    ),

    jellyfish: (
      <svg width={size * 0.9} height={size * 1.3} viewBox="0 0 90 130" style={{ filter, overflow: 'visible' }}>
        <path d="M 10 38 Q 45 8 80 38 Z" fill={color} opacity="0.88"/>
        <path d="M 10 38 Q 16 50 45 52 Q 74 50 80 38" fill={color} opacity="0.7"/>
        <ellipse cx="45" cy="44" rx="25" ry="8" fill={color} opacity="0.3"/>
        {[0,1,2,3,4,5,6,7].map(i => (
          <path key={i} d={`M ${14 + i * 9} 50 Q ${14 + i * 9 + Math.sin(i) * 6} ${82 + i * 4} ${14 + i * 9 + Math.sin(i + 2) * 8} 130`} stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity={0.4 + Math.sin(i) * 0.3}/>
        ))}
        <circle cx="30" cy="36" r="3" fill="rgba(255,255,255,0.25)"/>
        <circle cx="60" cy="34" r="2" fill="rgba(255,255,255,0.2)"/>
      </svg>
    ),

    comb_jelly: (
      <svg width={size * 0.7} height={size * 1.2} viewBox="0 0 70 120" style={{ filter, overflow: 'visible' }}>
        <ellipse cx="35" cy="55" rx="22" ry="42" fill={color} opacity="0.45"/>
        {[0,1,2,3,4,5,6,7].map(i => (
          <line key={i} x1="14" y1={14 + i * 11} x2="56" y2={14 + i * 11} stroke={`hsl(${i * 45}, 100%, 65%)`} strokeWidth="2.5" opacity="0.85"/>
        ))}
        <ellipse cx="35" cy="55" rx="22" ry="42" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5"/>
        <circle cx="30" cy="20" r="2.5" fill="rgba(255,255,255,0.4)"/>
      </svg>
    ),

    crab: (
      <svg width={size * 1.4} height={size * 0.9} viewBox="0 0 140 90" style={{ filter, overflow: 'visible' }}>
        <ellipse cx="70" cy="50" rx="28" ry="20" fill={color} opacity="0.92"/>
        {[-3,-2,-1,0,1,2,3,4].map((i, idx) => (
          <line key={idx} x1={70 + (idx < 4 ? -20 : 20)} y1="50"
                x2={idx < 4 ? 10 - idx * 8 : 130 - (idx - 4) * 8}
                y2={50 + (idx % 2 === 0 ? -18 : 14)}
                stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.88"/>
        ))}
        <path d="M 46 42 Q 26 28 14 34 Q 10 42 18 46 Q 30 50 46 50 Z" fill={color} opacity="0.85"/>
        <path d="M 94 42 Q 114 28 126 34 Q 130 42 122 46 Q 110 50 94 50 Z" fill={color} opacity="0.85"/>
        <circle cx="56" cy="40" r="5" fill="rgba(0,0,0,0.8)"/>
        <circle cx="84" cy="40" r="5" fill="rgba(0,0,0,0.8)"/>
        <circle cx="57" cy="39" r="1.8" fill="rgba(255,255,255,0.7)"/>
        <circle cx="85" cy="39" r="1.8" fill="rgba(255,255,255,0.7)"/>
      </svg>
    ),

    coral: (
      <svg width={size * 0.9} height={size * 1.3} viewBox="0 0 90 130" style={{ filter, overflow: 'visible' }}>
        <line x1="45" y1="130" x2="45" y2="80" stroke={color} strokeWidth="6" strokeLinecap="round"/>
        <line x1="45" y1="100" x2="20" y2="70" stroke={color} strokeWidth="5" strokeLinecap="round"/>
        <line x1="45" y1="92" x2="70" y2="58" stroke={color} strokeWidth="5" strokeLinecap="round"/>
        <line x1="20" y1="70" x2="6" y2="44" stroke={color} strokeWidth="4" strokeLinecap="round"/>
        <line x1="20" y1="70" x2="34" y2="46" stroke={color} strokeWidth="4" strokeLinecap="round"/>
        <line x1="70" y1="58" x2="84" y2="34" stroke={color} strokeWidth="4" strokeLinecap="round"/>
        <line x1="70" y1="58" x2="58" y2="36" stroke={color} strokeWidth="4" strokeLinecap="round"/>
        <line x1="45" y1="80" x2="45" y2="50" stroke={color} strokeWidth="4" strokeLinecap="round"/>
        <circle cx="6" cy="42" r="4" fill={color} opacity="0.9"/>
        <circle cx="34" cy="44" r="4" fill={color} opacity="0.9"/>
        <circle cx="84" cy="32" r="4" fill={color} opacity="0.9"/>
        <circle cx="58" cy="34" r="4" fill={color} opacity="0.9"/>
        <circle cx="45" cy="48" r="4" fill={color} opacity="0.9"/>
      </svg>
    ),

    sea_pen: (
      <svg width={size * 0.5} height={size * 1.4} viewBox="0 0 50 140" style={{ filter, overflow: 'visible' }}>
        <line x1="25" y1="140" x2="25" y2="20" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.9"/>
        {Array.from({length: 12}, (_, i) => (
          <g key={i}>
            <path d={`M 25 ${120 - i * 9} Q ${25 + (i % 2 === 0 ? 18 : -18)} ${114 - i * 9} ${25 + (i % 2 === 0 ? 24 : -24)} ${108 - i * 9}`} stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85"/>
            <path d={`M ${25 + (i % 2 === 0 ? 12 : -12)} ${117 - i * 9} Q ${25 + (i % 2 === 0 ? 20 : -20)} ${112 - i * 9} ${25 + (i % 2 === 0 ? 18 : -18)} ${107 - i * 9}`} stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
          </g>
        ))}
        <circle cx="25" cy="18" r="5" fill={color} opacity="0.9"/>
      </svg>
    ),

    worm: (
      <svg width={size * 1.3} height={size * 0.5} viewBox="0 0 130 50" style={{ filter, overflow: 'visible' }}>
        <path d="M 10 25 Q 26 10 42 25 Q 58 40 74 25 Q 90 10 106 25 Q 118 36 126 28" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" opacity="0.88"/>
        {Array.from({length: 10}, (_, i) => {
          const x = 10 + i * 12;
          const y = i % 2 === 0 ? 20 : 30;
          return <ellipse key={i} cx={x} cy={y} rx="5" ry="2.5" fill="rgba(255,255,255,0.12)"/>;
        })}
        <circle cx="128" cy="27" r="6" fill={color} opacity="0.9"/>
        <circle cx="130" cy="25" r="2" fill="rgba(0,0,0,0.7)"/>
        {[0,1,2,3,4,5,6,7,8,9].map(i => (
          <line key={i} x1={10 + i * 12} y1={i % 2 === 0 ? 16 : 34} x2={10 + i * 12} y2={i % 2 === 0 ? 6 : 44} stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        ))}
      </svg>
    ),

    eel: (
      <svg width={size * 1.8} height={size * 0.7} viewBox="0 0 180 70" style={{ filter, overflow: 'visible' }}>
        <path d="M 10 35 Q 36 15 62 35 Q 88 55 114 35 Q 140 15 162 30 Q 170 34 175 38" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" opacity="0.88"/>
        <ellipse cx="176" cy="38" rx="10" ry="7" fill={color} opacity="0.9"/>
        <circle cx="180" cy="34" r="3.5" fill="rgba(0,0,0,0.8)"/>
        <path d="M 175 32 L 185 28 L 182 34 Z" fill="rgba(255,255,255,0.15)"/>
      </svg>
    ),

    anglerfish: (
      <svg width={size * 1.2} height={size * 1.0} viewBox="0 0 120 100" style={{ filter, overflow: 'visible' }}>
        <ellipse cx="50" cy="58" rx="36" ry="28" fill={color} opacity="0.92"/>
        <path d="M 78 58 L 110 46 L 108 52 L 118 54 L 108 60 L 110 66 Z" fill={color} opacity="0.88"/>
        <path d="M 30 34 Q 50 18 60 32" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
        <circle cx="42" cy="14" r="7" fill="#ffd700" opacity="0.95"/>
        <circle cx="42" cy="14" r="4" fill="#ffaa00" opacity="1"/>
        <circle cx="44" cy="12" r="2" fill="rgba(255,255,255,0.8)"/>
        {[0,1,2,3,4,5,6].map(i => (
          <line key={i} x1={30 + i * 8} y1="72" x2={28 + i * 8} y2="90" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.8"/>
        ))}
        <path d="M 20 48 L 10 42 L 12 50 Z" fill="rgba(255,255,255,0.1)"/>
        <circle cx="82" cy="50" r="6" fill="rgba(0,0,0,0.8)"/>
        <circle cx="83.5" cy="48.5" r="2" fill="rgba(255,200,0,0.6)"/>
      </svg>
    ),

    phronima: (
      <svg width={size * 0.8} height={size * 0.9} viewBox="0 0 80 90" style={{ filter, overflow: 'visible' }}>
        <ellipse cx="40" cy="45" rx="20" ry="32" fill={color} opacity="0.35"/>
        <ellipse cx="40" cy="45" rx="20" ry="32" fill="none" stroke={color} strokeWidth="2" opacity="0.8"/>
        <ellipse cx="40" cy="30" rx="12" ry="12" fill={color} opacity="0.88"/>
        {[0,1,2,3,4,5,6].map(i => (
          <line key={i} x1="40" y1={42 + i * 6} x2={i % 2 === 0 ? 16 : 64} y2={44 + i * 6} stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
        ))}
        <circle cx="34" cy="26" r="3.5" fill="rgba(0,0,0,0.8)"/>
        <circle cx="46" cy="26" r="3.5" fill="rgba(0,0,0,0.8)"/>
        <circle cx="34.8" cy="25.2" r="1.2" fill="rgba(255,255,255,0.8)"/>
        <circle cx="46.8" cy="25.2" r="1.2" fill="rgba(255,255,255,0.8)"/>
      </svg>
    ),

    barreleye: (
      <svg width={size * 0.9} height={size * 0.7} viewBox="0 0 90 70" style={{ filter, overflow: 'visible' }}>
        <ellipse cx="42" cy="42" rx="26" ry="18" fill={color} opacity="0.88"/>
        <path d="M 14 42 L 2 34 L 2 50 Z" fill={color} opacity="0.8"/>
        <path d="M 42 24 Q 52 16 50 26" fill={color} opacity="0.7"/>
        <ellipse cx="42" cy="28" rx="22" ry="10" fill="rgba(140,200,255,0.35)" stroke="rgba(0,200,255,0.4)" strokeWidth="1"/>
        <ellipse cx="32" cy="26" rx="8" ry="8" fill="#00cc88" opacity="0.9"/>
        <ellipse cx="52" cy="26" rx="8" ry="8" fill="#00cc88" opacity="0.9"/>
        <circle cx="32" cy="26" r="5" fill="rgba(0,0,0,0.8)"/>
        <circle cx="52" cy="26" r="5" fill="rgba(0,0,0,0.8)"/>
        <circle cx="33.5" cy="24.5" r="2" fill="rgba(255,255,255,0.7)"/>
        <circle cx="53.5" cy="24.5" r="2" fill="rgba(255,255,255,0.7)"/>
      </svg>
    ),

    viperfish: (
      <svg width={size * 1.3} height={size * 0.7} viewBox="0 0 130 70" style={{ filter, overflow: 'visible' }}>
        <ellipse cx="58" cy="35" rx="44" ry="15" fill={color} opacity="0.9"/>
        <path d="M 100 35 L 130 28 L 126 35 L 130 42 Z" fill={color} opacity="0.85"/>
        <path d="M 28 24 L 20 10 L 26 26 Z" fill={color} opacity="0.7"/>
        {[0,1,2,3,4,5].map(i => (
          <line key={i} x1={20 + i * 8} y1="44" x2={18 + i * 8} y2="65" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.8"/>
        ))}
        {[0,1,2,3,4,5].map(i => (
          <circle key={i} cx={15 + i * 14} cy="30" r="2.5" fill="#00ff44" opacity="0.9"/>
        ))}
        <circle cx="108" cy="30" r="5" fill="rgba(0,0,0,0.8)"/>
        <path d="M 16 38 L 8 58 M 22 38 L 16 60 M 28 38 L 24 58" stroke={color} strokeWidth="1.5" opacity="0.7"/>
      </svg>
    ),

    fangtooth: (
      <svg width={size * 0.9} height={size * 0.8} viewBox="0 0 90 80" style={{ filter, overflow: 'visible' }}>
        <ellipse cx="44" cy="40" rx="28" ry="22" fill={color} opacity="0.92"/>
        <path d="M 65 40 L 88 32 L 84 40 L 88 48 Z" fill={color} opacity="0.85"/>
        <path d="M 22 44 L 18 56 M 28 44 L 26 60 M 34 44 L 34 58" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
        <path d="M 22 36 L 18 24 M 30 34 L 28 20 M 36 36 L 36 22" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
        <circle cx="62" cy="34" r="6" fill="rgba(0,0,0,0.9)"/>
        <circle cx="63.5" cy="32.5" r="2" fill="rgba(0,100,200,0.5)"/>
        <path d="M 18 40 L 2 32 L 4 40 L 2 48 Z" fill={color} opacity="0.75"/>
      </svg>
    ),

    vampire_squid: (
      <svg width={size * 1.2} height={size * 1.1} viewBox="0 0 120 110" style={{ filter, overflow: 'visible' }}>
        <ellipse cx="60" cy="40" rx="28" ry="24" fill={color} opacity="0.92"/>
        {Array.from({length: 8}, (_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const r = 28;
          const ex = 60 + Math.cos(angle) * 55;
          const ey = 40 + Math.sin(angle) * 55;
          const cx1 = 60 + Math.cos(angle - 0.3) * r;
          const cy1 = 40 + Math.sin(angle - 0.3) * r;
          const cx2 = 60 + Math.cos(angle + 0.3) * r;
          const cy2 = 40 + Math.sin(angle + 0.3) * r;
          return (
            <g key={i}>
              <path d={`M ${cx1} ${cy1} Q ${60 + Math.cos(angle) * 42} ${40 + Math.sin(angle) * 42} ${ex} ${ey}`} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" opacity="0.8"/>
              <path d={`M ${cx1} ${cy1} Q ${60 + Math.cos(angle + 0.15) * 36} ${40 + Math.sin(angle + 0.15) * 36} ${cx2} ${cy2}`} fill={color} opacity="0.5"/>
            </g>
          );
        })}
        <circle cx="50" cy="34" r="5.5" fill="rgba(200,50,255,0.8)"/>
        <circle cx="70" cy="34" r="5.5" fill="rgba(200,50,255,0.8)"/>
        <circle cx="50" cy="34" r="3" fill="rgba(0,0,0,0.9)"/>
        <circle cx="70" cy="34" r="3" fill="rgba(0,0,0,0.9)"/>
      </svg>
    ),

    oarfish: (
      <svg width={size * 2.8} height={size * 0.6} viewBox="0 0 280 60" style={{ filter, overflow: 'visible' }}>
        <path d="M 260 30 Q 200 22 140 30 Q 80 38 20 30" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" opacity="0.88"/>
        <ellipse cx="268" cy="30" rx="14" ry="8" fill={color} opacity="0.92"/>
        <path d="M 270 20 Q 280 6 275 16" stroke={color} strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.85"/>
        {Array.from({length: 8}, (_, i) => (
          <path key={i} d={`M ${260 - i * 30} 28 L ${264 - i * 30} 10`} stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        ))}
        <path d="M 8 30 L -4 22 L -4 38 Z" fill={color} opacity="0.8"/>
        <circle cx="274" cy="26" r="4" fill="rgba(0,0,0,0.8)"/>
        <circle cx="260" cy="14" r="5" fill={color} opacity="0.7"/>
      </svg>
    ),

    mola: (
      <svg width={size * 0.9} height={size * 1.2} viewBox="0 0 90 120" style={{ filter, overflow: 'visible' }}>
        <ellipse cx="45" cy="60" rx="34" ry="42" fill={color} opacity="0.9"/>
        <path d="M 11 60 L -2 50 L 0 60 L -2 70 Z" fill={color} opacity="0.8"/>
        <path d="M 20 20 L 14 4 L 22 18 Z" fill={color} opacity="0.7"/>
        <path d="M 20 100 L 14 116 L 22 102 Z" fill={color} opacity="0.7"/>
        <circle cx="72" cy="52" r="6.5" fill="rgba(0,0,0,0.7)"/>
        <circle cx="73.5" cy="50.5" r="2.2" fill="rgba(255,255,255,0.7)"/>
        <ellipse cx="45" cy="60" rx="22" ry="30" fill="rgba(255,255,255,0.06)"/>
      </svg>
    ),

    nautilus: (
      <svg width={size * 1.0} height={size * 0.95} viewBox="0 0 100 95" style={{ filter, overflow: 'visible' }}>
        <path d="M 50 48 Q 20 6 50 6 Q 90 6 90 48 Q 90 88 50 88 Q 14 88 10 58 Q 8 30 50 48 Z" fill={color} opacity="0.9"/>
        {[1,2,3,4].map(i => (
          <path key={i} d={`M 50 48 Q ${50 - i * 10} ${48 - i * 8} ${50 - i * 12} ${48}`} fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5"/>
        ))}
        <line x1="50" y1="48" x2="90" y2="48" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5"/>
        <line x1="50" y1="48" x2="50" y2="88" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5"/>
        {[0,1,2,3,4,5,6,7].map(i => (
          <path key={i} d={`M 50 88 Q ${50 + Math.cos(Math.PI + i * 0.4) * 20} ${88 + Math.sin(i * 0.4) * 10} ${50 + Math.cos(Math.PI + i * 0.4) * 30} ${88 + i * 3}`} stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8"/>
        ))}
        <circle cx="70" cy="30" r="7" fill="rgba(0,0,0,0.7)"/>
        <circle cx="71.5" cy="28.5" r="2.5" fill="rgba(255,200,100,0.6)"/>
      </svg>
    ),

    isopod: (
      <svg width={size * 1.3} height={size * 0.7} viewBox="0 0 130 70" style={{ filter, overflow: 'visible' }}>
        <ellipse cx="65" cy="35" rx="40" ry="22" fill={color} opacity="0.9"/>
        {[0,1,2,3,4,5,6].map(i => (
          <line key={i} x1={28 + i * 11} y1="14" x2={24 + i * 11} y2="4" stroke={color} strokeWidth="3.5" strokeLinecap="round" opacity="0.85"/>
        ))}
        {[0,1,2,3,4,5,6].map(i => (
          <line key={i} x1={28 + i * 11} y1="56" x2={24 + i * 11} y2="68" stroke={color} strokeWidth="3.5" strokeLinecap="round" opacity="0.85"/>
        ))}
        <line x1="65" y1="13" x2="65" y2="57" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5"/>
        {[0,1,2,3,4,5].map(i => (
          <line key={i} x1={28 + i * 14} y1="13" x2={28 + i * 14} y2="57" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
        ))}
        <circle cx="100" cy="28" r="5" fill="rgba(0,0,0,0.8)"/>
        <circle cx="100" cy="42" r="5" fill="rgba(0,0,0,0.8)"/>
        <line x1="100" y1="22" x2="110" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
        <line x1="100" y1="48" x2="110" y2="56" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
      </svg>
    ),

    snailfish: (
      <svg width={size * 1.3} height={size * 0.6} viewBox="0 0 130 60" style={{ filter, overflow: 'visible' }}>
        <ellipse cx="46" cy="30" rx="32" ry="18" fill={color} opacity="0.7"/>
        <path d="M 78 30 Q 110 20 128 30" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" opacity="0.5"/>
        <path d="M 128 30 L 130 28 L 130 32 Z" fill={color} opacity="0.5"/>
        <path d="M 22 16 Q 44 6 60 20" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
        <path d="M 22 44 Q 44 54 60 40" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
        <circle cx="68" cy="26" r="5" fill="rgba(0,0,0,0.6)"/>
        <circle cx="69.2" cy="24.8" r="1.8" fill="rgba(255,255,255,0.5)"/>
      </svg>
    ),

    amphipod: (
      <svg width={size * 0.7} height={size * 0.6} viewBox="0 0 70 60" style={{ filter, overflow: 'visible' }}>
        <path d="M 10 30 Q 35 10 60 30 Q 35 50 10 30 Z" fill={color} opacity="0.88"/>
        {[0,1,2,3].map(i => (
          <line key={i} x1={20 + i * 8} y1="20" x2={18 + i * 8} y2="8" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.8"/>
        ))}
        {[0,1,2,3].map(i => (
          <line key={i} x1={20 + i * 8} y1="40" x2={18 + i * 8} y2="52" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.8"/>
        ))}
        <line x1="58" y1="28" x2="68" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
        <line x1="58" y1="32" x2="68" y2="38" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
        <circle cx="56" cy="27" r="3.5" fill="rgba(0,0,0,0.8)"/>
      </svg>
    ),

    siphonophore: (
      <svg width={size * 0.4} height={size * 2.0} viewBox="0 0 40 200" style={{ filter, overflow: 'visible' }}>
        <path d="M 20 0 Q 28 20 20 40 Q 12 60 20 80 Q 28 100 20 120 Q 12 140 20 160 Q 28 180 20 200" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.85"/>
        {Array.from({length: 12}, (_, i) => (
          <g key={i}>
            <path d={`M 20 ${16 + i * 16} Q ${20 + (i % 2 === 0 ? 16 : -16)} ${12 + i * 16} ${20 + (i % 2 === 0 ? 22 : -22)} ${8 + i * 16}`} stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.75"/>
            <circle cx={20 + (i % 2 === 0 ? 22 : -22)} cy={8 + i * 16} r="4" fill={color} opacity="0.7"/>
          </g>
        ))}
      </svg>
    ),

    gulper: (
      <svg width={size * 1.5} height={size * 0.8} viewBox="0 0 150 80" style={{ filter, overflow: 'visible' }}>
        <ellipse cx="58" cy="42" rx="38" ry="22" fill={color} opacity="0.88"/>
        <path d="M 92 42 Q 130 26 148 36 Q 130 54 92 42 Z" fill={color} opacity="0.7"/>
        <path d="M 30 42 Q 10 28 4 42 Q 10 56 30 42 Z" fill={color} opacity="0.9"/>
        <line x1="4" y1="42" x2="-12" y2="60" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
        <circle cx="-10" cy="62" r="5" fill={color} opacity="0.8"/>
        <circle cx="-9" cy="60" r="2" fill="#ffaa00" opacity="0.9"/>
        <circle cx="85" cy="36" r="6" fill="rgba(0,0,0,0.8)"/>
        <circle cx="86.5" cy="34.5" r="2" fill="rgba(255,255,255,0.5)"/>
      </svg>
    ),

    tripodfish: (
      <svg width={size * 0.7} height={size * 1.5} viewBox="0 0 70 150" style={{ filter, overflow: 'visible' }}>
        <ellipse cx="35" cy="40" rx="20" ry="14" fill={color} opacity="0.9"/>
        <path d="M 18 48 L -4 150" stroke={color} strokeWidth="3.5" strokeLinecap="round" opacity="0.85"/>
        <path d="M 35 54 L 35 150" stroke={color} strokeWidth="3.5" strokeLinecap="round" opacity="0.85"/>
        <path d="M 52 48 L 74 150" stroke={color} strokeWidth="3.5" strokeLinecap="round" opacity="0.85"/>
        <path d="M 35 26 Q 40 10 38 28" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
        <path d="M 28 32 Q 20 16 26 30" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
        <circle cx="50" cy="36" r="4.5" fill="rgba(0,0,0,0.8)"/>
        <circle cx="51.2" cy="34.8" r="1.5" fill="rgba(255,255,255,0.6)"/>
      </svg>
    ),

    sea_pig: (
      <svg width={size * 1.1} height={size * 0.7} viewBox="0 0 110 70" style={{ filter, overflow: 'visible' }}>
        <ellipse cx="55" cy="38" rx="40" ry="22" fill={color} opacity="0.85"/>
        <ellipse cx="88" cy="32" rx="16" ry="10" fill={color} opacity="0.88"/>
        <circle cx="92" cy="30" r="3.5" fill="rgba(0,0,0,0.6)"/>
        {[15,28,42,56,70,84].map(x => (
          <line key={x} x1={x} y1="58" x2={x} y2="70" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
        ))}
        {[15,28,42].map(x => (
          <line key={x} x1={x} y1="28" x2={x} y2="16" stroke={color} strokeWidth="3.5" strokeLinecap="round" opacity="0.75"/>
        ))}
        <path d="M 14 38 L 4 30 L 6 38 L 4 46 Z" fill={color} opacity="0.8"/>
      </svg>
    ),

    dumbo: (
      <svg width={size * 1.2} height={size * 1.0} viewBox="0 0 120 100" style={{ filter, overflow: 'visible' }}>
        <ellipse cx="60" cy="42" rx="26" ry="22" fill={color} opacity="0.88"/>
        <path d="M 36 30 Q 12 10 8 36 Q 14 52 36 44 Z" fill={color} opacity="0.8"/>
        <path d="M 84 30 Q 108 10 112 36 Q 106 52 84 44 Z" fill={color} opacity="0.8"/>
        {[0,1,2,3,4,5,6,7].map(i => {
          const angle = (i / 8) * Math.PI + Math.PI * 0.1;
          return <path key={i} d={`M ${60 + Math.cos(angle) * 22} ${42 + Math.sin(angle) * 20} Q ${60 + Math.cos(angle) * 36} ${42 + Math.sin(angle) * 36} ${60 + Math.cos(angle) * 46} ${42 + Math.sin(angle) * 42}`} stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.75"/>;
        })}
        <circle cx="50" cy="36" r="5" fill="rgba(0,0,0,0.8)"/>
        <circle cx="70" cy="36" r="5" fill="rgba(0,0,0,0.8)"/>
        <circle cx="51.5" cy="34.5" r="1.8" fill="rgba(255,255,255,0.75)"/>
        <circle cx="71.5" cy="34.5" r="1.8" fill="rgba(255,255,255,0.75)"/>
      </svg>
    ),

    hatchetfish: (
      <svg width={size * 0.6} height={size * 0.8} viewBox="0 0 60 80" style={{ filter, overflow: 'visible' }}>
        <path d="M 30 15 L 50 42 L 50 55 L 10 55 L 10 42 Z" fill={color} opacity="0.9"/>
        <path d="M 50 42 L 60 36 L 58 48 Z" fill={color} opacity="0.8"/>
        <path d="M 20 15 Q 30 6 40 15" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
        {[0,1,2,3,4].map(i => (
          <circle key={i} cx={15 + i * 7} cy="58" r="2" fill={color} opacity="0.9"/>
        ))}
        <circle cx="50" cy="38" r="4" fill="rgba(0,0,0,0.8)"/>
        <circle cx="51.2" cy="36.8" r="1.3" fill="rgba(255,255,255,0.7)"/>
      </svg>
    ),

    barnacle: (
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 50 50" style={{ filter, overflow: 'visible' }}>
        <ellipse cx="25" cy="38" rx="20" ry="14" fill={color} opacity="0.92"/>
        {[0,1,2,3,4].map(i => (
          <path key={i} d={`M ${8 + i * 8} 36 L ${6 + i * 8} 28 L ${10 + i * 8} 28 Z`} fill={color} opacity="0.75"/>
        ))}
        <ellipse cx="25" cy="34" rx="12" ry="8" fill={color} opacity="0.7"/>
        <path d="M 18 30 Q 25 24 32 30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
      </svg>
    ),

    sponge: (
      <svg width={size * 0.7} height={size * 1.2} viewBox="0 0 70 120" style={{ filter, overflow: 'visible' }}>
        <path d="M 25 120 L 20 30 Q 35 10 50 30 L 45 120 Z" fill={color} opacity="0.35"/>
        {Array.from({length: 8}, (_, i) => (
          <path key={i} d={`M ${20 + i * 4} ${120 - i * 12} Q ${35} ${108 - i * 12} ${50 - i * 4} ${120 - i * 12}`} fill="none" stroke={color} strokeWidth="2.5" opacity="0.7"/>
        ))}
        {Array.from({length: 6}, (_, i) => (
          <path key={i} d={`M 22 ${100 - i * 14} L 48 ${100 - i * 14}`} fill="none" stroke={color} strokeWidth="2" opacity="0.4"/>
        ))}
        <circle cx="35" cy="18" r="6" fill={color} opacity="0.7"/>
        <circle cx="28" cy="28" r="3" fill={color} opacity="0.5"/>
        <circle cx="42" cy="26" r="3" fill={color} opacity="0.5"/>
      </svg>
    ),

    sea_cucumber: (
      <svg width={size * 1.4} height={size * 0.5} viewBox="0 0 140 50" style={{ filter, overflow: 'visible' }}>
        <path d="M 15 25 Q 70 10 125 25 Q 70 40 15 25 Z" fill={color} opacity="0.88"/>
        {Array.from({length: 14}, (_, i) => (
          <line key={i} x1={15 + i * 8} y1="18" x2={13 + i * 8} y2="8" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.75"/>
        ))}
        {Array.from({length: 14}, (_, i) => (
          <line key={i} x1={15 + i * 8} y1="32" x2={13 + i * 8} y2="42" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.75"/>
        ))}
        <circle cx="122" cy="22" r="5.5" fill="rgba(0,0,0,0.6)"/>
        {[0,1,2].map(i => (
          <path key={i} d={`M 122 16 Q ${118 + i * 4} 8 ${120 + i * 3} 14`} stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"/>
        ))}
      </svg>
    ),

    worm_small: (
      <svg width={size * 0.9} height={size * 0.5} viewBox="0 0 90 50" style={{ filter, overflow: 'visible' }}>
        <path d="M 8 25 Q 22 10 36 25 Q 50 40 64 25 Q 74 15 82 22" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" opacity="0.88"/>
        {Array.from({length: 6}, (_, i) => (
          <line key={i} x1={10 + i * 13} y1={i % 2 === 0 ? 18 : 32} x2={10 + i * 13} y2={i % 2 === 0 ? 8 : 42} stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        ))}
        <circle cx="84" cy="22" r="5" fill={color} opacity="0.9"/>
        <circle cx="86" cy="20" r="1.8" fill="rgba(0,0,0,0.7)"/>
      </svg>
    ),

  };

  return svgs[type] || svgs['fish'];
}
