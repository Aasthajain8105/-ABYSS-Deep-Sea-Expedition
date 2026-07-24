import React, { useState } from 'react';
import SubmarineInspector from './SubmarineInspector';
import LeviathanScanner from './LeviathanScanner';
import { Radio, Sparkles, Volume2, Cpu, Eye, ArrowRight, Heart } from 'lucide-react';
import { oceanAudio } from '../utils/soundEngine';

export default function MidnightSection({ onOpenBooking }) {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [whaleActive, setWhaleActive] = useState(false);

  const handleOpenScanner = () => {
    setIsScannerOpen(true);
    oceanAudio.playWhaleSong();
    oceanAudio.playSonarPing();
  };

  const triggerWhaleEvent = () => {
    setWhaleActive(true);
    oceanAudio.playWhaleSong();
    setTimeout(() => {
      setWhaleActive(false);
    }, 6000);
  };

  return (
    <section 
      id="midnight"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 py-24 z-10"
    >
      <div className="max-w-6xl mx-auto w-full space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-xs font-mono text-cyan-300 shadow-[0_0_25px_rgba(0,243,255,0.25)]">
            <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>PHASE 3 • MIDNIGHT ZONE (1,000M — 4,000M DESCENT)</span>
          </div>
          
          <h2 className="text-4xl sm:text-7xl font-extrabold text-white font-display uppercase tracking-tight">
            LEVIATHAN OS & MIDNIGHT ZONE
          </h2>

          <p className="text-slate-200 max-w-2xl mx-auto font-light text-base sm:text-lg">
            Complete solar dark. Atmospheric pressure reaches 400 atmospheres. Engage **LEVIATHAN OS** to scan giant marine life in real-time or explore titanium deep submersibles.
          </p>

          {/* LEVIATHAN OS Giant Whale Scan Trigger Banner */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            
            <button
              onClick={handleOpenScanner}
              className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 font-bold text-xs text-white font-mono tracking-wider uppercase hover:scale-105 transition-all shadow-[0_0_35px_rgba(244,63,94,0.4)] flex items-center space-x-3 cursor-pointer"
            >
              <Heart className="w-4 h-4 text-rose-300 animate-bounce" />
              <span>ENGAGE LEVIATHAN OS BIOMETRIC SCAN</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={triggerWhaleEvent}
              className="px-6 py-4 rounded-2xl glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-300 hover:bg-cyan-500/20 transition-all inline-flex items-center space-x-2"
            >
              <Volume2 className="w-4 h-4 text-cyan-400" />
              <span>HYDROPHONE WHALE AUDIO</span>
            </button>

          </div>
        </div>

        {/* Whale Swimming Animation Graphic Banner */}
        <div 
          onClick={handleOpenScanner}
          className="glass-panel p-6 rounded-3xl border border-cyan-400/40 relative overflow-hidden group cursor-pointer hover:border-cyan-300 transition-all shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-rose-500/20 transition-all" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-left">
              <span className="text-xs font-mono text-rose-400 font-bold flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-rose-400 animate-pulse" /> TARGET DETECTED: 30-METER BALEEN LEVIATHAN
              </span>
              <h3 className="text-2xl font-extrabold text-white font-display">
                CLICK TO OPEN LEVIATHAN HOLOGRAPHIC ORGAN SCANNER
              </h3>
              <p className="text-xs text-slate-300 font-light">
                Inspect 6 BPM dive bradycardia heartbeat, compressed titanium skeleton, myoglobin density, and acoustic telemetry.
              </p>
            </div>

            <div className="px-6 py-3 rounded-2xl bg-cyan-400 text-slate-950 font-bold text-xs font-mono uppercase shrink-0 group-hover:brightness-110 shadow-[0_0_20px_#00f3ff]">
              OPEN HOLOGRAPHIC SCAN
            </div>
          </div>
        </div>

        {/* Whale Hydrophone Silhouette Animation on Trigger */}
        {whaleActive && (
          <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center overflow-hidden">
            <div className="w-[800px] h-[300px] bg-cyan-400/10 rounded-full blur-[80px] animate-pulse" />
            <div className="absolute text-cyan-300 font-mono text-sm tracking-widest bg-slate-950/90 px-5 py-3 rounded-2xl border border-cyan-400 animate-bounce shadow-2xl">
              🐋 LEVIATHAN HYDROPHONE BROADCAST DETECTED IN MIDNIGHT ZONE (1,000M)!
            </div>
          </div>
        )}

        {/* Submarine Inspector */}
        <SubmarineInspector onOpenBooking={onOpenBooking} />

        {/* Holographic Organ Scanner Modal */}
        <LeviathanScanner 
          isOpen={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
        />

      </div>
    </section>
  );
}
