import React, { useEffect, useState, useCallback, useRef } from 'react';
import { oceanAudio } from './utils/soundEngine';

// ── Layout & Controls ─────────────────────────────────────────────────────────
import Navbar from './components/Navbar';
import DepthHUD from './components/DepthHUD';
import DepthVignette from './components/DepthVignette';
import CreatureTooltip from './components/CreatureTooltip';
import CursorOrb from './components/CursorOrb';
import OceanAIAssistant from './components/OceanAIAssistant';
import BookingModal from './components/BookingModal';
import EasterEggModal from './components/EasterEggModal';

// ── Ocean Dive Experience ────────────────────────────────────────────────────
import HeroSection from './components/HeroSection';
import OceanDepthScroll from './components/OceanDepthScroll';
import BioluminescentLab from './components/BioluminescentLab';
import OceanDashboard from './components/OceanDashboard';
import TestimonialsSection from './components/TestimonialsSection';

// ── Submarines Page (separate tab) ──────────────────────────────────────────
import SubmarinesPage from './components/SubmarinesPage';

/** Total ocean scroll height */
const TOTAL_HEIGHT = 11000 * 6 + 2000; // PX_PER_M=6, plus hero & lab

export default function App() {
  // ── Page state: 'dive' | 'submarines' ──────────────────────────────────
  const [activePage, setActivePage] = useState('dive');

  // ── Dive state ──────────────────────────────────────────────────────────
  const [currentDepth, setCurrentDepth] = useState(0);
  const [depthRatio, setDepthRatio] = useState(0);
  const [bioColor, setBioColor] = useState('#8ce8ff');
  const [cameraRotation, setCameraRotation] = useState(0);

  // ── Modals ──────────────────────────────────────────────────────────────
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedSubForBooking, setSelectedSubForBooking] = useState(null);
  const [selectedDestForBooking, setSelectedDestForBooking] = useState(null);
  const [achievementOpen, setAchievementOpen] = useState(false);

  // ── Creature tooltip ────────────────────────────────────────────────────
  const [activeCreature, setActiveCreature] = useState(null);
  const [creaturePosition, setCreaturePosition] = useState(null);

  // Smooth scroll state
  const scrollRef = useRef(null);

  // ── Scroll listener for depth ───────────────────────────────────────────
  useEffect(() => {
    if (activePage !== 'dive') return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = Math.max(0, Math.min(1, scrollY / (maxScroll || 1)));

      setDepthRatio(ratio);

      // Hero section is ~100vh. OceanDepthScroll starts after that.
      // OceanDepthScroll is 66,000px. Total scroll includes hero + lab + etc.
      const heroHeight = window.innerHeight;
      const oceanScrollStart = heroHeight;
      const oceanScrollLength = 11000 * 6; // 66,000px

      const depthScrollY = Math.max(0, scrollY - oceanScrollStart);
      const depth = Math.round(Math.min(11000, (depthScrollY / oceanScrollLength) * 11000));
      setCurrentDepth(depth);

      // Camera sway
      const sway = Math.sin(scrollY * 0.002) * 0.8;
      setCameraRotation(sway);

      oceanAudio.updateDepthAcoustics?.(ratio);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePage]);

  // ── Smooth scroll to hero start on page switch back ─────────────────────
  useEffect(() => {
    if (activePage === 'dive') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activePage]);

  const handleStartDescent = () => {
    const el = document.getElementById('ocean-scroll');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenBooking = useCallback((sub = null, dest = null) => {
    setSelectedSubForBooking(sub);
    setSelectedDestForBooking(dest);
    setBookingOpen(true);
  }, []);

  const handleCreatureClick = useCallback((creature, position) => {
    setActiveCreature(creature);
    setCreaturePosition(position);
    oceanAudio.playBubblePop?.();
  }, []);

  const handleDismissCreature = useCallback(() => {
    setActiveCreature(null);
    setCreaturePosition(null);
  }, []);

  const handleJumpToDepthSection = useCallback((sectionId) => {
    if (activePage !== 'dive') {
      setActivePage('dive');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
    oceanAudio.playSonarPing?.();
  }, [activePage]);

  const handleSwitchToSubmarines = useCallback(() => {
    setActivePage('submarines');
    window.scrollTo({ top: 0 });
  }, []);

  const handleReturnToDive = useCallback(() => {
    setActivePage('dive');
  }, []);

  // ═══════════════════════════════════════════════════════════════════════════
  // SUBMARINES PAGE
  // ═══════════════════════════════════════════════════════════════════════════
  if (activePage === 'submarines') {
    return (
      <>
        <CursorOrb activeColor={bioColor} />
        <SubmarinesPage
          onBack={handleReturnToDive}
          onOpenBooking={handleOpenBooking}
        />
        <BookingModal
          isOpen={bookingOpen}
          onClose={() => setBookingOpen(false)}
          initialSub={selectedSubForBooking}
          initialDest={selectedDestForBooking}
        />
      </>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // OCEAN DIVE PAGE
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div
      className="relative w-full min-h-screen bg-[#01040a] text-slate-100 selection:bg-cyan-400 selection:text-black"
    >
      {/* Cursor orb */}
      <CursorOrb activeColor={bioColor} />

      {/* Cinematic depth vignette — porthole pressure crush */}
      <DepthVignette depthRatio={depthRatio} />

      {/* Creature tooltip — organic blob at creature position */}
      <CreatureTooltip
        creature={activeCreature}
        position={creaturePosition}
        onDismiss={handleDismissCreature}
      />

      {/* Phosphorescent rock navbar */}
      <Navbar
        currentDepth={currentDepth}
        onOpenBooking={() => handleOpenBooking()}
        onOpenSubmarines={handleSwitchToSubmarines}
      />

      {/* Submarine sonar instrument panel HUD */}
      <DepthHUD
        currentDepth={currentDepth}
        scrollProgress={depthRatio}
      />

      {/* Main content — continuous descent */}
      <main
        ref={scrollRef}
        className="relative"
        style={{
          transform: `rotate(${cameraRotation}deg)`,
          transformOrigin: 'center center',
          transition: 'transform 600ms ease-out',
        }}
      >
        {/* Surface hero */}
        <HeroSection
          onStartDescent={handleStartDescent}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* ─── THE OCEAN — 66,000px continuous depth scroll ────────────── */}
        <OceanDepthScroll
          depthRatio={depthRatio}
          currentDepth={currentDepth}
          onCreatureClick={handleCreatureClick}
          onTitanicClick={(titanic) => {
            setActiveCreature({
              ...titanic,
              type: 'shipwreck',
            });
            setCreaturePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
          }}
        />

        {/* ─── CREATE YOUR OWN JELLYFISH (PRESERVED) ───────────────────── */}
        <section id="biolab">
          <BioluminescentLab
            onReleaseToOcean={setBioColor}
          />
        </section>

        {/* ─── Ocean Intelligence ───────────────────────────────────────── */}
        <OceanDashboard
          currentDepth={currentDepth}
        />

        {/* ─── Explorer Voices ──────────────────────────────────────────── */}
        <TestimonialsSection />

        {/* Footer */}
        <footer className="w-full text-center py-20 font-mono border-t border-white/[0.03]">
          <div className="max-w-4xl mx-auto px-6 space-y-3">
            <div
              className="tracking-[0.3em] text-xs uppercase"
              style={{ fontFamily: "'Cinzel', serif", color: 'rgba(255,255,255,0.35)' }}
            >
              ABYSS — LUXURY DEEP SEA EXPEDITION
            </div>
            <p
              className="text-[10px] leading-relaxed max-w-xl mx-auto"
              style={{ color: 'rgba(100,120,140,0.5)', fontFamily: "'JetBrains Mono', monospace" }}
            >
              11,094m Challenger Deep Expedition Certified. Dedicated to oceanographic research & titanium Hadal exploration.
            </p>
            <div className="text-[9px]" style={{ color: 'rgba(60,80,100,0.4)' }}>
              © 2026 ABYSS LUXURY MARINE CORP. ALL RIGHTS RESERVED.
            </div>
          </div>
        </footer>
      </main>

      {/* AI Assistant */}
      <OceanAIAssistant onJumpToDepth={handleJumpToDepthSection} />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialSub={selectedSubForBooking}
        initialDest={selectedDestForBooking}
      />

      {/* Easter Egg Modal */}
      <EasterEggModal
        isOpen={achievementOpen}
        onClose={() => setAchievementOpen(false)}
      />
    </div>
  );
}
