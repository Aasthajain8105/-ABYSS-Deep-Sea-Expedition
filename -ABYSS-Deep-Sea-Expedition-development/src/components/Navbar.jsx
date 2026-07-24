import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Anchor, Calendar, Layers } from 'lucide-react';
import { oceanAudio } from '../utils/soundEngine';

/**
 * Organic Rock Navbar — no floating glass card.
 * Navigation text is phosphorescent bio-ink etched directly into a dark rock-texture strip.
 * On hover: each zone name lights up with bioluminescent glow, like organisms reacting to touch.
 */
export default function Navbar({ onOpenBooking, currentDepth = 0 }) {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section from scroll
  useEffect(() => {
    const sections = ['hero', 'twilight', 'midnight', 'abyss', 'biolab'];
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.3 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const handleAudioToggle = () => {
    const active = oceanAudio.toggleSound();
    setIsAudioActive(active);
    if (active) oceanAudio.playSonarPing();
  };

  const scrollTo = (id) => {
    oceanAudio.playBubblePop();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'hero', label: '0m', sublabel: 'Surface', glow: '#7dd3fc' },
    { id: 'twilight', label: '200m', sublabel: 'Twilight', glow: '#818cf8' },
    { id: 'midnight', label: '1,000m', sublabel: 'Midnight', glow: '#6366f1' },
    { id: 'abyss', label: '4,000m', sublabel: 'Abyss', glow: '#00f3ff' },
    { id: 'biolab', label: 'LAB', sublabel: 'Bio Lab', glow: '#00ff88' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 pointer-events-none">
      {/* Rock texture strip — very dark, organic edge at bottom */}
      <div
        className="w-full pointer-events-auto transition-all duration-700"
        style={{
          background: scrolled
            ? 'linear-gradient(180deg, rgba(1,3,8,0.97) 0%, rgba(1,3,8,0.85) 80%, transparent 100%)'
            : 'linear-gradient(180deg, rgba(1,3,8,0.88) 0%, rgba(1,4,10,0.6) 70%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(4px)',
          borderBottom: scrolled ? '1px solid rgba(0,243,255,0.06)' : 'none',
          paddingBottom: '6px',
        }}
      >
        {/* Thin bioluminescent depth line — reacts to current depth */}
        <div
          className="w-full h-px"
          style={{
            background: `linear-gradient(90deg, transparent 0%, rgba(0,243,255,0.12) 20%, rgba(0,243,255,0.25) 50%, rgba(0,243,255,0.12) 80%, transparent 100%)`,
            opacity: scrolled ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        />

        <div className="max-w-7xl mx-auto px-5 md:px-8 py-3 flex items-center justify-between">

          {/* Brand — just the anchor icon + wordmark, no box */}
          <div
            onClick={() => scrollTo('hero')}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="relative">
              <Anchor
                className="w-5 h-5 transition-all duration-500 group-hover:rotate-12"
                style={{ color: '#00f3ff', filter: 'drop-shadow(0 0 8px rgba(0,243,255,0.6))' }}
              />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300"
                style={{
                  fontFamily: "'Cinzel', serif",
                  color: '#e2f8ff',
                  textShadow: scrolled ? '0 0 20px rgba(0,243,255,0.3)' : 'none',
                }}
              >
                ABYSS
              </span>
              <span
                className="text-[8px] tracking-[0.35em] uppercase"
                style={{ color: 'rgba(0,243,255,0.5)', fontFamily: "'JetBrains Mono', monospace" }}
              >
                DEEP LUXURY
              </span>
            </div>
          </div>

          {/* Depth navigation — phosphorescent etched on rock */}
          <nav className="hidden lg:flex items-center space-x-0.5">
            {navItems.map((item, i) => {
              const isActive = activeSection === item.id;
              return (
                <React.Fragment key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="group relative flex flex-col items-center px-4 py-2 rounded-none transition-all duration-300"
                    style={{ background: 'transparent', border: 'none' }}
                  >
                    {/* Depth label */}
                    <span
                      className="text-[9px] font-mono tracking-[0.3em] transition-all duration-400 uppercase leading-none"
                      style={{
                        color: isActive ? item.glow : 'rgba(120,140,160,0.6)',
                        textShadow: isActive ? `0 0 16px ${item.glow}80, 0 0 30px ${item.glow}40` : 'none',
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {item.label}
                    </span>
                    {/* Zone name */}
                    <span
                      className="text-[10px] font-mono mt-0.5 transition-all duration-400 tracking-wider"
                      style={{
                        color: isActive ? '#e2f8ff' : 'rgba(100,120,140,0.5)',
                        textShadow: isActive ? `0 0 12px ${item.glow}60` : 'none',
                      }}
                    >
                      {item.sublabel}
                    </span>
                    {/* Active indicator — bioluminescent dot */}
                    <div
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: item.glow,
                        boxShadow: `0 0 8px ${item.glow}`,
                        opacity: isActive ? 1 : 0,
                        transform: `translateX(-50%) scale(${isActive ? 1 : 0})`,
                      }}
                    />
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at center, ${item.glow}08 0%, transparent 70%)` }}
                    />
                  </button>
                  {i < navItems.length - 1 && (
                    <div className="w-px h-4 mx-1" style={{ background: 'rgba(0,243,255,0.08)' }} />
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center space-x-3">
            {/* Depth readout — engraved into the nav bar itself */}
            <div
              className="hidden md:flex flex-col items-end"
              style={{ opacity: scrolled ? 1 : 0, transition: 'opacity 0.5s' }}
            >
              <span
                className="text-[8px] font-mono tracking-widest"
                style={{ color: 'rgba(0,243,255,0.4)', fontFamily: "'JetBrains Mono', monospace" }}
              >
                DEPTH
              </span>
              <span
                className="text-xs font-bold font-mono tabular-nums"
                style={{
                  color: '#00f3ff',
                  textShadow: '0 0 12px rgba(0,243,255,0.5)',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {currentDepth.toLocaleString()}m
              </span>
            </div>

            {/* Sound toggle — minimal */}
            <button
              onClick={handleAudioToggle}
              className="flex items-center gap-1.5 transition-all duration-300"
              style={{
                color: isAudioActive ? '#00f3ff' : 'rgba(100,120,140,0.5)',
                textShadow: isAudioActive ? '0 0 12px rgba(0,243,255,0.6)' : 'none',
                background: 'transparent',
                border: 'none',
                padding: '6px',
              }}
              title="Toggle ocean ambience"
            >
              {isAudioActive
                ? <Volume2 className="w-4 h-4" />
                : <VolumeX className="w-4 h-4" />
              }
              {isAudioActive && (
                <div className="flex items-end gap-px h-3">
                  {[1, 2, 3].map(i => (
                    <div
                      key={i}
                      className="w-0.5 rounded-full"
                      style={{
                        backgroundColor: '#00f3ff',
                        height: `${i * 4}px`,
                        animation: `bounce ${0.6 + i * 0.1}s ease-in-out infinite alternate`,
                        boxShadow: '0 0 4px rgba(0,243,255,0.8)',
                      }}
                    />
                  ))}
                </div>
              )}
            </button>

            {/* Book Expedition — the one true CTA */}
            <button
              onClick={() => { oceanAudio.playSonarPing(); onOpenBooking(); }}
              className="group relative overflow-hidden px-4 py-2 text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-400 flex items-center gap-2"
              style={{
                background: 'rgba(0,243,255,0.06)',
                border: '1px solid rgba(0,243,255,0.25)',
                borderRadius: '6px',
                color: '#a0e8f0',
              }}
            >
              {/* Scan line sweep on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(0,243,255,0.08) 50%, transparent 100%)',
                  animation: 'none',
                }}
              />
              <Calendar className="w-3 h-3" style={{ color: '#00f3ff' }} />
              <span style={{ color: '#e2f8ff' }}>BOOK EXPEDITION</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
