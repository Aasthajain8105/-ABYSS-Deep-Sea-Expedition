import React, { useState } from 'react';
import { SUBMARINES } from '../utils/oceanData';
import { Eye, Shield, Zap, Compass, Info, CheckCircle2, ChevronRight } from 'lucide-react';
import { oceanAudio } from '../utils/soundEngine';

export default function SubmarineInspector({ onOpenBooking }) {
  const [selectedSubIndex, setSelectedSubIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const currentSub = SUBMARINES[selectedSubIndex];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 15, y: -y * 15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      
      {/* Submarine Switcher Tabs */}
      <div className="flex flex-wrap justify-center gap-3">
        {SUBMARINES.map((sub, idx) => (
          <button
            key={sub.id}
            onClick={() => {
              setSelectedSubIndex(idx);
              setActiveHotspot(null);
              oceanAudio.playBubblePop();
            }}
            className={`px-6 py-3 rounded-2xl font-mono text-xs tracking-wider transition-all border ${
              selectedSubIndex === idx
                ? 'glass-panel-glow border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,243,255,0.3)]'
                : 'glass-panel text-slate-400 hover:text-white border-white/5'
            }`}
          >
            {sub.name} <span className="text-[10px] text-slate-500">({sub.maxDepth})</span>
          </button>
        ))}
      </div>

      {/* Main Submarine 3D Parallax Display Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Submarine Interactive Canvas Stage */}
        <div 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-cyan-500/30 relative min-h-[420px] flex items-center justify-center overflow-hidden group cursor-crosshair"
          style={{
            transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
            transition: 'transform 0.15s ease-out'
          }}
        >
          {/* Spotlight Effect behind submarine */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-[90px] pointer-events-none group-hover:bg-cyan-400/25 transition-all" />

          {/* Submarine High-End Vector Illustration & Beam */}
          <div className="relative w-full max-w-md h-64 flex items-center justify-center">
            
            {/* Front Headlight Spotlight Beam */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-44 bg-gradient-to-r from-cyan-400/40 via-cyan-300/10 to-transparent blur-md clip-path-beam pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity" />

            {/* Submarine Hull SVG Graphic */}
            <svg className="w-full h-full drop-shadow-[0_0_35px_rgba(0,243,255,0.4)]" viewBox="0 0 500 250">
              <defs>
                <linearGradient id="hullGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0f2b48" />
                  <stop offset="50%" stopColor="#1e3a5f" />
                  <stop offset="100%" stopColor="#091426" />
                </linearGradient>
                <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#006699" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Tail Thruster */}
              <rect x="40" y="105" width="40" height="40" rx="4" fill="#1e293b" stroke="#00f3ff" strokeWidth="1.5" />
              <circle cx="20" cy="125" r="18" fill="none" stroke="#00f3ff" strokeWidth="2" strokeDasharray="4 4" className="animate-spin" />

              {/* Main Pressure Sphere Hull */}
              <ellipse cx="250" cy="125" rx="170" ry="80" fill="url(#hullGrad)" stroke="#00f3ff" strokeWidth="2" />

              {/* Structural Rib lines */}
              <path d="M 150 50 Q 180 125 150 200" stroke="rgba(0,243,255,0.3)" strokeWidth="2" fill="none" />
              <path d="M 230 45 Q 260 125 230 205" stroke="rgba(0,243,255,0.3)" strokeWidth="2" fill="none" />
              <path d="M 310 50 Q 340 125 310 200" stroke="rgba(0,243,255,0.3)" strokeWidth="2" fill="none" />

              {/* Front Panoramic Quartz Viewport Dome */}
              <path d="M 380 75 Q 450 125 380 175 Z" fill="url(#glassGrad)" stroke="#00f3ff" strokeWidth="3" />

              {/* Top Sail Bridge */}
              <path d="M 200 45 L 230 15 L 270 15 L 290 45 Z" fill="#0f172a" stroke="#00f3ff" strokeWidth="1.5" />
            </svg>

            {/* Interactive Hotspot Buttons overlay on submarine */}
            {currentSub.hotspots.map((spot) => (
              <button
                key={spot.id}
                onClick={() => {
                  setActiveHotspot(spot);
                  oceanAudio.playSonarPing();
                }}
                className={`absolute w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  activeHotspot?.id === spot.id
                    ? 'bg-cyan-400 text-slate-950 scale-125 shadow-[0_0_20px_#00f3ff]'
                    : 'bg-slate-900/90 text-cyan-400 border border-cyan-400/60 hover:scale-110'
                }`}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                title={spot.name}
              >
                <span className="absolute inset-0 rounded-full border border-cyan-400 animate-ping opacity-75"></span>
                <span className="text-[10px] font-bold font-mono">+</span>
              </button>
            ))}

          </div>

          {/* Bottom Prompt inside stage */}
          <div className="absolute bottom-4 left-6 text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span>CLICK HOTSPOTS TO INSPECT HULL SPECIFICATIONS</span>
          </div>

        </div>

        {/* Right Submarine Specs & Selected Hotspot Info */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="space-y-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
              {currentSub.type}
            </span>
            <h3 className="text-3xl font-extrabold text-white font-display">
              {currentSub.name}
            </h3>
            <p className="text-sm text-slate-300 font-light">
              "{currentSub.tagline}"
            </p>
          </div>

          {/* Hotspot Popup Card OR Default Specs */}
          {activeHotspot ? (
            <div className="glass-panel-glow p-6 rounded-2xl border border-cyan-400 space-y-3 animate-fade-in">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-cyan-300 font-bold uppercase">
                  SYSTEM INSPECTION HOTSPOT
                </span>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="text-xs font-mono text-slate-400 hover:text-white"
                >
                  [CLOSE]
                </button>
              </div>
              <h4 className="text-xl font-bold text-white font-display">
                {activeHotspot.name}
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                {activeHotspot.desc}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="glass-card p-3 rounded-xl">
                <div className="text-slate-400 text-[10px]">MAX DEPTH CERTIFIED</div>
                <div className="text-cyan-300 font-bold text-base mt-0.5">{currentSub.maxDepth}</div>
              </div>
              <div className="glass-card p-3 rounded-xl">
                <div className="text-slate-400 text-[10px]">PASSENGER CAPACITY</div>
                <div className="text-cyan-300 font-bold text-base mt-0.5">{currentSub.capacity}</div>
              </div>
              <div className="glass-card p-3 rounded-xl">
                <div className="text-slate-400 text-[10px]">CRUISING SPEED</div>
                <div className="text-cyan-300 font-bold text-base mt-0.5">{currentSub.speed}</div>
              </div>
              <div className="glass-card p-3 rounded-xl">
                <div className="text-slate-400 text-[10px]">LIFE SUPPORT</div>
                <div className="text-emerald-400 font-bold text-base mt-0.5">{currentSub.lifeSupport}</div>
              </div>
            </div>
          )}

          {/* Features Checkmarks */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              LUXURY SPECIFICATIONS
            </h4>
            <div className="grid grid-cols-1 gap-1.5 text-xs text-slate-300">
              {currentSub.features.map((feat) => (
                <div key={feat} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Book Vessel CTA */}
          <div className="pt-2 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 block">ESTIMATED EXPEDITION SEAT</span>
              <span className="text-xl font-bold text-white font-mono">{currentSub.pricePerSeat}</span>
            </div>
            <button
              onClick={() => {
                oceanAudio.playSonarPing();
                onOpenBooking(currentSub);
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 font-bold text-xs text-slate-950 font-display hover:brightness-110 transition-all flex items-center space-x-2 shadow-[0_0_20px_rgba(0,243,255,0.3)]"
            >
              <span>CONFIGURE VESSEL</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
