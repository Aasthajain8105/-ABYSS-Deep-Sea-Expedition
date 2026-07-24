import React, { useState, useRef, useEffect } from 'react';
import SubmarineInspector from './SubmarineInspector';
import LeviathanScanner from './LeviathanScanner';
import { Heart, Volume2, Radio } from 'lucide-react';
import { oceanAudio } from '../utils/soundEngine';

/**
 * MidnightSection — environmental narrative, stripped of text-heavy cards.
 * Keeps: Leviathan OS Scanner, SubmarineInspector, whale audio.
 * The zone narrative is projected as minimal text etched into darkness.
 */
export default function MidnightSection({ onOpenBooking }) {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [whaleActive, setWhaleActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleOpenScanner = () => {
    setIsScannerOpen(true);
    oceanAudio.playWhaleSong();
    oceanAudio.playSonarPing();
  };

  const triggerWhaleEvent = () => {
    setWhaleActive(true);
    oceanAudio.playWhaleSong();
    setTimeout(() => setWhaleActive(false), 6000);
  };

  return (
    <section
      id="midnight"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-between items-start px-8 md:px-16 py-24 z-10"
    >
      {/* Zone narrative — top-left, carved into the void */}
      <div
        className="max-w-md transition-all duration-1200"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-20px)',
          transitionDuration: '1.3s',
        }}
      >
        <div
          className="text-[9px] font-mono tracking-[0.45em] uppercase mb-3 flex items-center gap-2"
          style={{
            color: 'rgba(99,102,241,0.7)',
            textShadow: '0 0 20px rgba(99,102,241,0.5)',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: '#6366f1',
              boxShadow: '0 0 10px #6366f1',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
          PHASE 3 — BATHYPELAGIC
          <span style={{ color: 'rgba(99,102,241,0.4)' }}>1,000M — 4,000M</span>
        </div>

        <h2
          className="text-5xl sm:text-7xl font-extrabold leading-[0.9] mb-5"
          style={{
            fontFamily: "'Cinzel', serif",
            color: 'transparent',
            backgroundImage: 'linear-gradient(135deg, rgba(200,210,255,0.85) 0%, rgba(99,102,241,0.65) 50%, rgba(67,56,202,0.4) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 25px rgba(99,102,241,0.25))',
          }}
        >
          MIDNIGHT<br />ZONE
        </h2>

        <p
          className="text-xs leading-relaxed"
          style={{
            color: 'rgba(140,160,200,0.65)',
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: '0.05em',
            lineHeight: '1.9',
          }}
        >
          Total solar dark. 400 atmospheres of pressure.
          The blue whale passes below you.
        </p>
      </div>

      {/* Bottom controls — engraved into the environment */}
      <div
        className="w-full flex flex-col sm:flex-row items-start sm:items-end gap-4 transition-all duration-1000"
        style={{
          opacity: visible ? 1 : 0,
          transitionDelay: '0.5s',
          transitionDuration: '1.2s',
        }}
      >
        {/* Leviathan OS button — organic, no card */}
        <button
          onClick={handleOpenScanner}
          className="group relative flex items-center gap-3 transition-all duration-400"
          style={{
            background: 'transparent',
            border: 'none',
            padding: '0',
          }}
        >
          <div
            className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105"
            style={{
              background: 'radial-gradient(circle, rgba(244,63,94,0.15) 0%, rgba(244,63,94,0.05) 100%)',
              border: '1px solid rgba(244,63,94,0.3)',
              boxShadow: '0 0 20px rgba(244,63,94,0.15)',
            }}
          >
            <Heart
              className="w-5 h-5 text-rose-400"
              style={{ animation: 'pulse 1.2s ease-in-out infinite' }}
            />
            {/* Radar rings */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: '1px solid rgba(244,63,94,0.15)',
                animation: 'ping 2s cubic-bezier(0,0,0.2,1) infinite',
              }}
            />
          </div>
          <div className="flex flex-col">
            <span
              className="text-[8px] font-mono tracking-[0.3em] uppercase"
              style={{ color: 'rgba(244,63,94,0.5)', fontFamily: "'JetBrains Mono', monospace" }}
            >
              LEVIATHAN OS
            </span>
            <span
              className="text-sm font-bold transition-all duration-300 group-hover:text-white"
              style={{
                color: 'rgba(220,200,255,0.8)',
                fontFamily: "'Space Grotesk', sans-serif",
                textShadow: '0 0 15px rgba(244,63,94,0.3)',
              }}
            >
              ENGAGE BIOMETRIC SCAN
            </span>
            <span
              className="text-[8px] font-mono tracking-widest mt-0.5"
              style={{ color: 'rgba(99,102,241,0.4)', fontFamily: "'JetBrains Mono', monospace" }}
            >
              TARGET: 30m BALEEN LEVIATHAN
            </span>
          </div>
        </button>

        {/* Hydrophone button */}
        <button
          onClick={triggerWhaleEvent}
          className="flex items-center gap-2 transition-all duration-300"
          style={{
            background: 'transparent',
            border: 'none',
            padding: '0 0 0 8px',
            borderLeft: '1px solid rgba(99,102,241,0.15)',
          }}
        >
          <Volume2
            className="w-4 h-4"
            style={{ color: 'rgba(99,102,241,0.5)' }}
          />
          <span
            className="text-[9px] font-mono tracking-[0.3em] uppercase"
            style={{ color: 'rgba(99,102,241,0.45)', fontFamily: "'JetBrains Mono', monospace" }}
          >
            HYDROPHONE ARRAY
          </span>
        </button>
      </div>

      {/* Submarine Inspector — preserved */}
      <div className="w-full mt-16">
        <SubmarineInspector onOpenBooking={onOpenBooking} />
      </div>

      {/* Whale detection flash */}
      {whaleActive && (
        <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center overflow-hidden">
          <div className="w-[600px] h-[200px] bg-indigo-500/8 rounded-full blur-[80px] animate-pulse" />
          <div
            className="absolute font-mono text-xs tracking-widest px-5 py-3 animate-bounce"
            style={{
              color: '#818cf8',
              background: 'rgba(1,2,8,0.9)',
              border: '1px solid rgba(99,102,241,0.3)',
              borderRadius: '8px',
              boxShadow: '0 0 30px rgba(99,102,241,0.2)',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            🐋 LEVIATHAN HYDROPHONE BROADCAST — MIDNIGHT ZONE
          </div>
        </div>
      )}

      {/* Scanner modal — preserved */}
      <LeviathanScanner isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} />
    </section>
  );
}
