import React, { useState, useEffect, useRef } from 'react';
import { oceanAudio } from '../utils/soundEngine';

/**
 * TwilightSection — stripped of floating cards.
 * The ocean canvas now holds the species. This section provides
 * an immersive narrative overlay that blends into the environment.
 * Species data surfaces when the user clicks creatures in the canvas.
 */
export default function TwilightSection({ onBioColorChange }) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          onBioColorChange?.('#00f3ff');
          oceanAudio.playBubblePop?.();
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [onBioColorChange]);

  return (
    <section
      id="twilight"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-end items-start px-8 md:px-16 pb-24 z-10"
    >
      {/* Zone label — carved into the seafloor rock, bottom-left */}
      <div
        className="max-w-lg transition-all duration-1200 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transitionDuration: '1.2s',
        }}
      >
        {/* Carved zone badge */}
        <div
          className="text-[9px] font-mono tracking-[0.45em] uppercase mb-3 flex items-center gap-2"
          style={{
            color: 'rgba(129,140,248,0.7)',
            textShadow: '0 0 20px rgba(129,140,248,0.5)',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: '#818cf8', boxShadow: '0 0 10px #818cf8' }}
          />
          PHASE 2 — MESOPELAGIC
          <span style={{ color: 'rgba(129,140,248,0.4)' }}>200M — 1,000M</span>
        </div>

        {/* Section title — carved glyph style */}
        <h2
          className="text-5xl sm:text-7xl font-extrabold leading-[0.9] mb-5"
          style={{
            fontFamily: "'Cinzel', serif",
            color: 'transparent',
            backgroundImage: 'linear-gradient(135deg, rgba(200,220,255,0.9) 0%, rgba(129,140,248,0.7) 40%, rgba(99,102,241,0.5) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            textShadow: 'none',
            filter: 'drop-shadow(0 0 30px rgba(129,140,248,0.3))',
          }}
        >
          THE<br />TWILIGHT<br />ZONE
        </h2>

        {/* Narrative — single atmospheric sentence, not a data card */}
        <p
          className="text-sm leading-relaxed max-w-sm"
          style={{
            color: 'rgba(160,180,210,0.75)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.05em',
            lineHeight: '1.8',
          }}
        >
          Sunlight fractures into indigo threads. Bioluminescent organisms
          replace the sun. Click any glowing creature in the water to identify it.
        </p>

        {/* Creature interaction hint */}
        <div
          className="mt-5 flex items-center gap-2 text-[9px] font-mono tracking-widest"
          style={{
            color: 'rgba(129,140,248,0.5)',
            animation: 'pulse 3s ease-in-out infinite',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5" stroke="rgba(129,140,248,0.4)" strokeWidth="1" />
            <circle cx="7" cy="7" r="2" fill="rgba(129,140,248,0.6)" />
          </svg>
          CLICK CREATURES TO SCAN
        </div>
      </div>

      {/* Environmental data — engraved into the rock, bottom-right */}
      <div
        className="absolute bottom-24 right-8 md:right-16 flex flex-col items-end gap-2 transition-all duration-1000"
        style={{
          opacity: visible ? 0.6 : 0,
          transitionDelay: '0.4s',
          transitionDuration: '1.4s',
        }}
      >
        {[
          ['SOLAR IRRADIANCE', '1%', 'FAINT'],
          ['TEMPERATURE', '4°C–15°C', 'THERMOCLINE'],
          ['VISIBILITY', '15m', 'FADING'],
        ].map(([label, value, sub]) => (
          <div key={label} className="flex flex-col items-end">
            <span
              className="text-[7px] tracking-[0.35em] uppercase"
              style={{ color: 'rgba(129,140,248,0.35)', fontFamily: "'JetBrains Mono', monospace" }}
            >
              {label}
            </span>
            <span
              className="text-sm font-bold"
              style={{
                color: 'rgba(180,200,240,0.7)',
                fontFamily: "'JetBrains Mono', monospace",
                textShadow: '0 0 15px rgba(129,140,248,0.3)',
              }}
            >
              {value}
            </span>
            <span
              className="text-[7px] tracking-widest"
              style={{ color: 'rgba(129,140,248,0.25)', fontFamily: "'JetBrains Mono', monospace" }}
            >
              {sub}
            </span>
          </div>
        ))}
      </div>

    </section>
  );
}
