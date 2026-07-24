import React, { useState } from 'react';
import { Eye, Thermometer, SunDim, Sparkles, Waves, MousePointer, Activity } from 'lucide-react';
import { oceanAudio } from '../utils/soundEngine';

export default function TwilightSection({ onBioColorChange }) {
  const [activeSpecies, setActiveSpecies] = useState(0);

  const species = [
    {
      name: 'Crystal Atolla Jellyfish',
      depth: '200m - 600m',
      glow: '#00f3ff',
      tagline: 'Displays a circular alarm strobe light when threatened',
      desc: 'The first bioluminescent jellyfish encountered as sunlight dies. Atolla produces a brilliant blue light ring that alerts deep predators to its presence.'
    },
    {
      name: 'Comb Jelly (Ctenophore)',
      depth: '300m - 800m',
      glow: '#ff007f',
      tagline: 'Rainbow diffraction across eight ciliated comb rows',
      desc: 'Ctenophores scatter ambient ocean light along synchronized beating cilia, creating mesmerising iridescent rainbow pulses.'
    },
    {
      name: 'Deepwater Siphonophore',
      depth: '400m - 1000m',
      glow: '#00ff88',
      tagline: 'Colonial organism growing up to 40 meters long',
      desc: 'A massive floating colony of specialized zooids connected together, glowing with bioluminescent emerald lures.'
    }
  ];

  return (
    <section 
      id="twilight"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 py-24 z-10"
    >
      <div className="max-w-6xl mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-xs font-mono text-cyan-300 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
            <Eye className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>PHASE 2 • TWILIGHT ZONE (200M — 1,000M DESCENT)</span>
          </div>

          <h2 className="text-4xl sm:text-7xl font-extrabold text-white font-display uppercase tracking-tight">
            THE TWILIGHT ZONE
          </h2>

          <p className="text-slate-200 max-w-2xl mx-auto font-light text-base sm:text-lg">
            Sunlight slowly fades into deep sapphire shadows. Fish disappear into the depths. Temperature drops rapidly as biological luminescence takes over.
          </p>
        </div>

        {/* Phase 2 Environmental Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
          
          <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20 text-left">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <SunDim className="w-4 h-4 text-amber-400" /> SOLAR IRRADIANCE
            </div>
            <div className="text-2xl font-bold text-slate-100 mt-1">1% FAINT RAYS</div>
            <div className="text-[10px] text-cyan-400 mt-0.5">LIGHT FADING RAPIDLY</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20 text-left">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-blue-400" /> AMBIENT TEMPERATURE
            </div>
            <div className="text-2xl font-bold text-blue-300 mt-1">4.0°C - 15.0°C</div>
            <div className="text-[10px] text-slate-400 mt-0.5">THERMOCLINE DROP</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20 text-left">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <MousePointer className="w-4 h-4 text-cyan-400" /> MOUSE WATER RIPPLES
            </div>
            <div className="text-2xl font-bold text-cyan-300 mt-1">ACTIVE</div>
            <div className="text-[10px] text-slate-400 mt-0.5">MOVE CURSOR ON SEA</div>
          </div>

        </div>

        {/* Interactive Species Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          
          {/* Left Species Selection Cards */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-mono tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-cyan-400" /> TWILIGHT SPECIES REVEAL
            </h3>

            {species.map((s, idx) => (
              <div
                key={s.name}
                onClick={() => {
                  setActiveSpecies(idx);
                  onBioColorChange(s.glow);
                  oceanAudio.playBubblePop();
                }}
                className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                  activeSpecies === idx 
                    ? 'glass-panel-glow border-cyan-400 shadow-[0_0_30px_rgba(0,243,255,0.3)] scale-[1.02]' 
                    : 'glass-card hover:border-slate-600'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-white font-display text-lg">{s.name}</h4>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-700">
                    {s.depth}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-2 font-light">{s.tagline}</p>
                
                {/* Bioluminescent Color Chip */}
                <div className="flex items-center space-x-2 mt-3 text-[10px] font-mono text-slate-400">
                  <span>BIOLUMINESCENT SPECTRA:</span>
                  <span 
                    className="w-3.5 h-3.5 rounded-full inline-block shadow-lg"
                    style={{ backgroundColor: s.glow, boxShadow: `0 0 12px ${s.glow}` }}
                  />
                  <span className="text-slate-200 uppercase font-semibold">{s.glow}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Species Detailed Showcase Card */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-cyan-500/30 shadow-2xl space-y-6 relative overflow-hidden">
            <div 
              className="absolute top-0 right-0 w-72 h-72 rounded-full blur-[110px] opacity-35 pointer-events-none transition-all duration-500"
              style={{ backgroundColor: species[activeSpecies].glow }}
            />

            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-300 flex items-center gap-1.5 font-bold">
                <Sparkles className="w-4 h-4" /> FIRST JELLYFISH REVEALED
              </span>
              <span className="text-xs font-mono text-slate-400">
                MESOPELAGIC SPECIES #01
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-3xl font-extrabold text-white font-display">
                {species[activeSpecies].name}
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed font-light">
                {species[activeSpecies].desc}
              </p>
            </div>

            {/* Light Shift Trigger */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div className="text-xs font-mono text-slate-400">
                MATCH OCEAN CANVAS BIOLUMINESCENCE
              </div>
              <button
                onClick={() => {
                  onBioColorChange(species[activeSpecies].glow);
                  oceanAudio.playSonarPing();
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 hover:bg-cyan-500/30 transition-all shadow-[0_0_15px_rgba(0,243,255,0.2)]"
              >
                APPLY JELLYFISH GLOW
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
