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
import OceanCanvas from './components/OceanCanvas';
import SubmarineTimeline from './components/SubmarineTimeline';
import OceanNavigatorMap from './components/OceanNavigatorMap';

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

  // ── Scroll listener with Lenis & GSAP ───────────────────────────────────
  useEffect(() => {
    if (activePage !== 'dive') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    let ticking = false;
    let lastDepth = -1;
    let lastRatio = -1;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const ratio = Math.max(0, Math.min(1, scrollY / (maxScroll || 1)));

          const heroHeight = window.innerHeight;
          const oceanScrollStart = heroHeight;
          const oceanScrollLength = 11000 * 6;

          const depthScrollY = Math.max(0, scrollY - oceanScrollStart);
          const depth = Math.round(Math.min(11000, (depthScrollY / oceanScrollLength) * 11000));

          if (Math.abs(depth - lastDepth) >= 1) {
            setCurrentDepth(depth);
            lastDepth = depth;
          }

          if (Math.abs(ratio - lastRatio) >= 0.001) {
            setDepthRatio(ratio);
            lastRatio = ratio;

            const sway = Math.sin(scrollY * 0.0012) * 0.35;
            setCameraRotation(sway);

            oceanAudio.updateDepthAcoustics?.(ratio);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
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

  const [discoveredSpecies, setDiscoveredSpecies] = useState(new Set());
  const [discoveredLandmarks, setDiscoveredLandmarks] = useState(new Set());
  const [discoveryToast, setDiscoveryToast] = useState(null);

  const handleCreatureClick = useCallback((creature, position) => {
    setActiveCreature(creature);
    setCreaturePosition(position);
    oceanAudio.playBubblePop?.();
    if (creature?.id) {
      setDiscoveredSpecies((prev) => {
        if (!prev.has(creature.id)) {
          setDiscoveryToast(`NEW SPECIES DISCOVERED: ${creature.name.toUpperCase()} (▼ ${creature.depth || creature.depthM + 'm'})`);
          setTimeout(() => setDiscoveryToast(null), 4000);
        }
        return new Set(prev).add(creature.id);
      });
    }
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
      className="relative w-full max-w-full overflow-x-hidden min-h-screen bg-[#01040a] text-slate-100 selection:bg-cyan-400 selection:text-black"
    >
      {/* Dynamic ocean canvas background (0m to 11,000m continuous) */}
      <OceanCanvas
        depthRatio={depthRatio}
        bioColor={bioColor}
        onCreatureClick={handleCreatureClick}
      />

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

      {/* Floating Tactical Controller & Minimap & AI Mission Log */}
      <OceanNavigatorMap
        currentDepth={currentDepth}
        depthRatio={depthRatio}
        speciesFoundCount={discoveredSpecies.size}
        landmarksFoundCount={discoveredLandmarks.size}
      />

      {/* Main content — continuous descent */}
      <main
        ref={scrollRef}
        className="relative w-full max-w-full overflow-x-hidden z-10"
        style={{
          transform: `rotate(${cameraRotation}deg)`,
          transformOrigin: 'center center',
          transition: 'transform 800ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Surface hero */}
        <HeroSection
          onStartDescent={handleStartDescent}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* ─── CREATE YOUR OWN JELLYFISH (BIOLUMINESCENT LAB) ───────────── */}
        <section id="biolab">
          <BioluminescentLab
            onReleaseToOcean={setBioColor}
          />
        </section>

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

        {/* ─── Ocean Intelligence ───────────────────────────────────────── */}
        <OceanDashboard
          currentDepth={currentDepth}
        />

        {/* ─── Historic Submarine Timeline ─────────────────────────────── */}
        <section id="timeline">
          <SubmarineTimeline />
        </section>

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

      {/* ─── Smart Depth Telemetry Toast ──────────────────────────────── */}
      {(() => {
        const msg = currentDepth >= 200 ? (
          currentDepth < 500 ? "Sunlight fades completely. Entering the mesopelagic twilight zone." :
          currentDepth < 1000 ? "Hydrostatic pressure reaches 50 atmospheres (735 PSI)." :
          currentDepth < 2000 ? "Bathypelagic Boundary: Most military & commercial submarines cannot descend past this depth." :
          currentDepth < 3500 ? "You have entered complete darkness. Hydrostatic pressure exceeds 250 atmospheres." :
          currentDepth < 4000 ? "Approaching the R.M.S. Titanic wreck site at 3,784 meters." :
          currentDepth < 6000 ? "Abyssal Plain: Ambient temperature drops to 1.5°C. Only deep-sea specialists survive here." :
          currentDepth < 10000 ? "Entering the Hadal Trench. Only a handful of human submersibles have ever reached this realm." :
          "Challenger Deep Seabed: Hydrostatic pressure reaches 1,086 atmospheres (8 tons per sq inch)."
        ) : null;

        if (!msg) return null;

        return (
          <div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none px-5 py-2.5 rounded-full border shadow-2xl backdrop-blur-2xl flex items-center space-x-2.5 transition-all duration-700 max-w-md text-center"
            style={{
              background: 'rgba(3,10,24,0.85)',
              borderColor: 'rgba(0,243,255,0.25)',
              boxShadow: '0 0 30px rgba(0,243,255,0.15)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block flex-shrink-0" />
            <span className="text-[10px] font-mono tracking-wider text-cyan-200 uppercase">
              {msg}
            </span>
          </div>
        );
      })()}

      {/* ─── Interactive Discovery Notification Toast ─────────────────── */}
      {discoveryToast && (
        <div
          className="fixed top-24 right-6 z-40 pointer-events-none px-5 py-3 rounded-2xl border shadow-2xl backdrop-blur-2xl flex items-center space-x-3 animate-bounce"
          style={{
            background: 'radial-gradient(ellipse at 30% 30%, rgba(6,30,60,0.92) 0%, rgba(1,4,12,0.96) 100%)',
            borderColor: 'rgba(0,243,255,0.4)',
            boxShadow: '0 0 40px rgba(0,243,255,0.25), inset 0 0 15px rgba(0,243,255,0.1)',
          }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping inline-block flex-shrink-0" />
          <div>
            <div className="text-[8px] font-mono tracking-widest text-cyan-400 uppercase font-bold">SPECIES CATALOG UPDATED</div>
            <div className="text-xs font-mono tracking-wide text-slate-100 font-bold">{discoveryToast}</div>
          </div>
        </div>
      )}

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
