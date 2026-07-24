import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { oceanAudio } from './utils/soundEngine';

import OceanCanvas from './components/OceanCanvas';
import CursorOrb from './components/CursorOrb';
import Navbar from './components/Navbar';
import DepthHUD from './components/DepthHUD';
import HeroSection from './components/HeroSection';
import TwilightSection from './components/TwilightSection';
import MidnightSection from './components/MidnightSection';
import AbyssSection from './components/AbyssSection';
import BioluminescentLab from './components/BioluminescentLab';
import OceanDashboard from './components/OceanDashboard';
import TestimonialsSection from './components/TestimonialsSection';
import BookingModal from './components/BookingModal';
import OceanAIAssistant from './components/OceanAIAssistant';
import EasterEggModal from './components/EasterEggModal';

export default function App() {
  const [currentDepth, setCurrentDepth] = useState(0);
  const [depthRatio, setDepthRatio] = useState(0);
  const [bioColor, setBioColor] = useState('#8ce8ff');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedSubForBooking, setSelectedSubForBooking] = useState(null);
  const [selectedDestForBooking, setSelectedDestForBooking] = useState(null);
  const [achievementOpen, setAchievementOpen] = useState(false);
  const [cameraRotation, setCameraRotation] = useState(0);

  // Initialize Lenis Smooth Scroll & Camera Sway Inertia
  useEffect(() => {
    let lenis;
    let animFrameId;

    try {
      lenis = new Lenis({
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.8,
      });

      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const ratio = Math.max(0, Math.min(1, scrollY / (maxScroll || 1)));

            setDepthRatio(ratio);

            // Calculate Hadal depth (0m -> 10,994m)
            const calculatedDepth = Math.round(ratio * 10994);
            setCurrentDepth(calculatedDepth);

            // Dynamic Camera Sway (-1.2deg to +1.2deg) simulating weightless floating underwater
            const sway = Math.sin(scrollY * 0.003) * 1.1;
            setCameraRotation(sway);

            // Lowpass depth audio acoustic filter dampening
            oceanAudio.updateDepthAcoustics(ratio);
            ticking = false;
          });
          ticking = true;
        }
      };

      lenis.on('scroll', handleScroll);

      function raf(time) {
        if (lenis) {
          lenis.raf(time);
          animFrameId = requestAnimationFrame(raf);
        }
      }
      animFrameId = requestAnimationFrame(raf);

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (animFrameId) cancelAnimationFrame(animFrameId);
        if (lenis) lenis.destroy();
      };
    } catch (err) {
      console.warn('Lenis scroll initialization deferred:', err);
    }
  }, []);

  const handleStartDescent = () => {
    const tw = document.getElementById('twilight');
    if (tw) {
      tw.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (sub = null, dest = null) => {
    setSelectedSubForBooking(sub);
    setSelectedDestForBooking(dest);
    setBookingOpen(true);
  };

  const handleJumpToDepthSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      oceanAudio.playSonarPing();
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#01040a] text-slate-100 selection:bg-cyan-400 selection:text-black transition-transform duration-75">
      
      {/* Dynamic Bioluminescent Liquid Orb Cursor */}
      <CursorOrb activeColor={bioColor} />

      {/* Living Ocean 60 FPS Canvas Backdrop */}
      <OceanCanvas 
        depthRatio={depthRatio} 
        bioColor={bioColor} 
      />

      {/* Glass Top Navigation Bar */}
      <Navbar 
        currentDepth={currentDepth}
        onOpenBooking={() => handleOpenBooking()} 
      />

      {/* Floating Telemetry Depth HUD */}
      <DepthHUD 
        currentDepth={currentDepth} 
        scrollProgress={depthRatio} 
      />

      {/* Main Continuous Narrative Descent (With Dynamic Camera Sway Inertia) */}
      <main 
        className="relative z-10 space-y-36 transition-transform duration-500 ease-out"
        style={{ transform: `rotate(${cameraRotation}deg)` }}
      >
        
        {/* Phase 1: Surface Realm (0m) - Documentary Opening */}
        <HeroSection 
          onStartDescent={handleStartDescent} 
          onOpenBooking={() => handleOpenBooking()} 
        />

        {/* Phase 2: Twilight Zone (200m - 1,000m) */}
        <TwilightSection 
          onBioColorChange={setBioColor} 
        />

        {/* Phase 3: Bioluminescent Organism Synthesis Lab */}
        <BioluminescentLab 
          onReleaseToOcean={setBioColor} 
        />

        {/* Phase 4: Midnight Zone (1,000m - 4,000m) */}
        <MidnightSection 
          onOpenBooking={handleOpenBooking} 
        />

        {/* Phase 5: Abyss & Hadal Challenger Deep (4,000m - 10,994m) */}
        <AbyssSection 
          onOpenBooking={handleOpenBooking} 
          onUnlockAchievement={() => setAchievementOpen(true)} 
        />

        {/* Phase 6: Ocean Intelligence Telemetry Stream */}
        <OceanDashboard 
          currentDepth={currentDepth} 
        />

        {/* Phase 8: Voices of the Abyss - Explorer Reflections */}
        <TestimonialsSection />

        {/* Cinematic Footer - Hadal Challenger Deep Final Milestone */}
        <footer className="w-full text-center py-24 font-mono text-xs text-slate-400 border-t border-white/5 bg-slate-950/80 backdrop-blur-3xl">
          <div className="max-w-4xl mx-auto space-y-4 px-6">
            <div className="text-white font-bold tracking-[0.25em] text-base font-serif-luxury uppercase">
              ABYSS — LUXURY DEEP SEA EXPEDITION
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xl mx-auto font-light">
              11,094m Challenger Deep Expedition Certified. Dedicated to deep-ocean oceanography, acoustic marine research, and titanium Hadal exploration.
            </p>
            <div className="text-[10px] text-slate-600 pt-4">
              © 2026 ABYSS LUXURY MARINE CORP. ALL RIGHTS RESERVED.
            </div>
          </div>
        </footer>

      </main>

      {/* AI Assistant Chat Widget */}
      <OceanAIAssistant onJumpToDepth={handleJumpToDepthSection} />

      {/* Expedition Booking Configurator Modal */}
      <BookingModal 
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialSub={selectedSubForBooking}
        initialDest={selectedDestForBooking}
      />

      {/* Secret Hadal Treasure Achievement Modal */}
      <EasterEggModal 
        isOpen={achievementOpen}
        onClose={() => setAchievementOpen(false)}
      />

    </div>
  );
}

