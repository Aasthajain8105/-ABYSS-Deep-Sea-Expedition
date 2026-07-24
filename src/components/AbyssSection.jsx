import React from 'react';
import ExpeditionExplorer from './ExpeditionExplorer';
import LaserScanner from './LaserScanner';
import { ShieldAlert, Sparkles, Award, Scan, Radio } from 'lucide-react';
import { oceanAudio } from '../utils/soundEngine';

export default function AbyssSection({ onOpenBooking, onUnlockAchievement }) {
  return (
    <section 
      id="abyss"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 py-24 z-10"
    >
      <div className="max-w-6xl mx-auto w-full space-y-24">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-xs font-mono text-cyan-300 shadow-[0_0_30px_rgba(0,243,255,0.25)] animate-pulse">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            <span>PHASE 5 • CHALLENGER DEEP & HADAL VOID (10,994M)</span>
          </div>

          <h2 className="text-4xl sm:text-7xl md:text-8xl font-extrabold text-white font-display uppercase tracking-tight">
            THE ABYSS & HADAL TRENCH
          </h2>

          <p className="text-slate-200 max-w-2xl mx-auto font-light text-base sm:text-lg">
            Almost total pitch-black darkness. Move your mouse to guide the submarine's 120,000-lumen spotlight beam. Sweep the cyan laser mesh across ancient ruins and shipwrecks.
          </p>

          {/* Secret Hadal Treasure Chest Trigger Button */}
          <div className="pt-4">
            <button
              onClick={() => {
                oceanAudio.playSonarPing();
                onUnlockAchievement();
              }}
              className="group relative px-7 py-3.5 rounded-2xl glass-panel-glow border border-amber-400/60 text-amber-300 font-mono text-xs hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,215,0,0.3)] flex items-center space-x-2.5 mx-auto"
            >
              <Award className="w-4.5 h-4.5 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>UNBOX HADAL TREASURE CHEST (0.001% EXPLORER PERK)</span>
            </button>
          </div>
        </div>

        {/* Phase 5 Interactive Laser Mesh Reveal Micro-Interaction */}
        <LaserScanner 
          onOpenBooking={onOpenBooking} 
          onUnlockAchievement={onUnlockAchievement} 
        />

        {/* Expedition Explorer Floating Control */}
        <ExpeditionExplorer onOpenBooking={onOpenBooking} />

      </div>
    </section>
  );
}
