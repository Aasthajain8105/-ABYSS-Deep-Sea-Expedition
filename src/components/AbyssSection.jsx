import React, { useState, useRef, useEffect } from 'react';
import ExpeditionExplorer from './ExpeditionExplorer';
import LaserScanner from './LaserScanner';
import { Award } from 'lucide-react';
import { oceanAudio } from '../utils/soundEngine';

/**
 * AbyssSection — the void made visible.
 * Stripped of text-heavy cards. The abyss speaks through darkness, light, and touch.
 * Keeps: LaserScanner, ExpeditionExplorer, Hadal treasure chest.
 */
export default function AbyssSection({ onOpenBooking, onUnlockAchievement }) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="abyss"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-between items-start px-8 md:px-16 py-24 z-10"
    >
      {/* Zone inscription — top left, barely visible in the void */}
      <div
        className="max-w-sm transition-all duration-1400"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transitionDuration: '1.4s',
        }}
      >
        <div
          className="text-[9px] font-mono tracking-[0.45em] uppercase mb-3 flex items-center gap-2"
          style={{
            color: 'rgba(0,243,255,0.5)',
            textShadow: '0 0 20px rgba(0,243,255,0.4)',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <span
            className="w-1 h-1 rounded-full"
            style={{
              backgroundColor: '#00f3ff',
              boxShadow: '0 0 12px #00f3ff',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
          PHASE 5 — ABYSSOPELAGIC
          <span style={{ color: 'rgba(0,243,255,0.3)' }}>4,000M — 10,994M</span>
        </div>

        <h2
          className="text-5xl sm:text-7xl font-extrabold leading-[0.9] mb-5"
          style={{
            fontFamily: "'Cinzel', serif",
            color: 'transparent',
            backgroundImage: 'linear-gradient(135deg, rgba(180,220,240,0.8) 0%, rgba(0,243,255,0.5) 50%, rgba(0,100,150,0.3) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 30px rgba(0,243,255,0.2))',
          }}
        >
          THE<br />ABYSS
        </h2>

        <p
          className="text-xs leading-loose"
          style={{
            color: 'rgba(100,140,160,0.6)',
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: '0.06em',
          }}
        >
          Move your cursor — the submarine searchlight follows.
          Sweep the cyan laser mesh across ancient ruins.
        </p>

        {/* Hadal treasure — minimal, no card */}
        <button
          onClick={() => { oceanAudio.playSonarPing(); onUnlockAchievement(); }}
          className="group mt-6 flex items-center gap-2.5 transition-all duration-400"
          style={{ background: 'transparent', border: 'none', padding: 0 }}
        >
          <Award
            className="w-5 h-5 transition-all duration-300 group-hover:rotate-12"
            style={{
              color: 'rgba(251,191,36,0.5)',
              filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.4))',
            }}
          />
          <div className="flex flex-col items-start">
            <span
              className="text-[8px] font-mono tracking-[0.3em] uppercase"
              style={{ color: 'rgba(251,191,36,0.4)', fontFamily: "'JetBrains Mono', monospace" }}
            >
              0.001% EXPLORER PERK
            </span>
            <span
              className="text-xs transition-all duration-300 group-hover:text-amber-200"
              style={{
                color: 'rgba(251,191,36,0.55)',
                fontFamily: "'JetBrains Mono', monospace",
                textShadow: '0 0 12px rgba(251,191,36,0.3)',
              }}
            >
              UNBOX HADAL TREASURE CHEST
            </span>
          </div>
        </button>
      </div>

      {/* Laser Scanner — full width, preserved */}
      <div
        className="w-full mt-16 transition-all duration-1000"
        style={{
          opacity: visible ? 1 : 0,
          transitionDelay: '0.4s',
          transitionDuration: '1.2s',
        }}
      >
        <LaserScanner onOpenBooking={onOpenBooking} onUnlockAchievement={onUnlockAchievement} />
      </div>

      {/* Expedition Explorer — preserved */}
      <div className="w-full mt-12">
        <ExpeditionExplorer onOpenBooking={onOpenBooking} />
      </div>

    </section>
  );
}
