import React, { useState } from 'react';
import { 
  Scan, Sparkles, ShieldAlert, Anchor, Flame, Compass, Award, Zap, Radio, ChevronRight 
} from 'lucide-react';
import { oceanAudio } from '../utils/soundEngine';

export default function LaserScanner({ onOpenBooking, onUnlockAchievement }) {
  const [activeTarget, setActiveTarget] = useState('ruins');
  const [laserPos, setLaserPos] = useState(50);
  const [isScanning, setIsScanning] = useState(false);

  const targets = [
    {
      id: 'ruins',
      name: 'Ancient Sunken Monolith Ruins',
      depth: '4,500m Abyssal Plain',
      icon: Compass,
      tag: 'ARCHAEOLOGICAL SCAN',
      desc: 'Calcified stone monoliths dating back 4,000 years. Sub-surface sonar reveals geometric inscriptions and lost structural chambers.',
      scanResult: 'ORGANIC CALCIFICATION MATCH: 98.4% • PRE-HISTORIC CIVILIZATION'
    },
    {
      id: 'titanic',
      name: 'RMS Titanic Bow Section',
      depth: '3,800m Midnight Void',
      icon: Anchor,
      tag: 'HISTORIC WRECKAGE',
      desc: 'Forged steel bow covered in rusticles. Laser mesh reveals intact anchor chains, officer cabins, and deep-sea glass sponge colonies.',
      scanResult: 'STEEL OXIDATION RATE: 0.1mm/YR • GRAND STAIRCASE FRAME DETECTED'
    },
    {
      id: 'vents',
      name: 'Lost City Hydrothermal Smokers',
      depth: '2,400m Midnight Zone',
      icon: Flame,
      tag: 'THERMAL VENT MATRIX',
      desc: '60m tall calcified white smoker chimneys spewing 400°C mineral fluids. Teeming with blind Alvinocaridid shrimp colonies.',
      scanResult: 'VENT TEMP: 407°C • EXTREMOPHILE BACTERIAL DENSITY: HIGH'
    },
    {
      id: 'hadal',
      name: 'Challenger Deep Hadal Seafloor',
      depth: '10,994m Hadal Trench',
      icon: Award,
      tag: 'DEEPEST EARTH VOID',
      desc: 'The deepest geological point on planet Earth. Features translucent Hadal amphipods, manganese nodule fields, and the secret Hadal treasure chest.',
      scanResult: 'PRESSURE: 1,086 ATM • SECRET TREASURE CHEST LOCATED'
    }
  ];

  const current = targets.find((t) => t.id === activeTarget) || targets[0];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    setLaserPos(xPct);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-xs font-mono text-cyan-300 shadow-[0_0_30px_rgba(0,243,255,0.25)] animate-pulse">
          <Scan className="w-4 h-4 text-cyan-400" />
          <span>PHASE 5 • CHALLENGER DEEP LASER MESH SCANNER</span>
        </div>

        <h2 className="text-4xl sm:text-7xl font-extrabold text-white font-display uppercase tracking-tight">
          THE DEEPEST VOID & LASER REVEAL
        </h2>

        <p className="text-slate-200 max-w-2xl mx-auto font-light text-base sm:text-lg">
          Move your submarine spotlight beam over pitch-black abyssal targets. Sweep the cyan laser mesh across ancient ruins, historic shipwrecks, and hydrothermal smokers.
        </p>
      </div>

      {/* Target Selector Tabs */}
      <div className="flex flex-wrap justify-center gap-3 font-mono text-xs">
        {targets.map((t) => {
          const IconComp = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => {
                setActiveTarget(t.id);
                oceanAudio.playSonarPing();
              }}
              className={`px-5 py-3 rounded-2xl flex items-center space-x-2 transition-all border ${
                activeTarget === t.id
                  ? 'glass-panel-glow border-cyan-400 text-cyan-300 shadow-[0_0_25px_rgba(0,243,255,0.3)]'
                  : 'glass-panel text-slate-400 hover:text-white border-white/5'
              }`}
            >
              <IconComp className="w-4 h-4 text-cyan-400" />
              <span>{t.name.split(' ')[0]}</span>
              <span className="text-[10px] text-slate-400">({t.depth.split(' ')[0]})</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Laser Mesh Stage */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsScanning(true)}
        onMouseLeave={() => setIsScanning(false)}
        className="glass-panel p-8 rounded-3xl border border-cyan-400/50 relative min-h-[420px] flex flex-col justify-between overflow-hidden group cursor-crosshair shadow-[0_0_60px_rgba(0,243,255,0.2)]"
      >
        {/* Background Dark Void */}
        <div className="absolute inset-0 bg-slate-950/90 pointer-events-none" />

        {/* Laser Sweep Beam Vertical Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-300 via-cyan-400 to-pink-500 shadow-[0_0_25px_#00f3ff] pointer-events-none transition-all duration-75 z-20"
          style={{ left: `${laserPos}%` }}
        >
          {/* Laser Beam Glow Line */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-24 bg-cyan-400/40 rounded-full blur-md" />
        </div>

        {/* Laser Point Cloud Mesh & Target Vector Graphic */}
        <div className="relative w-full max-w-xl mx-auto h-64 flex items-center justify-center z-10">
          
          <svg className="w-full h-full drop-shadow-[0_0_35px_rgba(0,243,255,0.5)]" viewBox="0 0 500 250">
            <defs>
              <linearGradient id="laserMeshGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ff007f" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#00ff88" stopOpacity="0.7" />
              </linearGradient>
            </defs>

            {/* Target 1: Ancient Monolith Ruins */}
            {activeTarget === 'ruins' && (
              <g>
                {/* Monolith Pillars */}
                <rect x="120" y="60" width="45" height="150" fill="url(#laserMeshGrad)" stroke="#00f3ff" strokeWidth="2" />
                <rect x="220" y="40" width="55" height="170" fill="url(#laserMeshGrad)" stroke="#00f3ff" strokeWidth="2" />
                <rect x="330" y="70" width="45" height="140" fill="url(#laserMeshGrad)" stroke="#00f3ff" strokeWidth="2" />
                {/* Lintels */}
                <rect x="110" y="40" width="180" height="25" fill="none" stroke="#00f3ff" strokeWidth="2" strokeDasharray="4 4" />
                {/* Laser Point Cloud dots */}
                <circle cx="140" cy="90" r="3" fill="#ff007f" className="animate-ping" />
                <circle cx="250" cy="80" r="3" fill="#00f3ff" className="animate-ping" />
              </g>
            )}

            {/* Target 2: Titanic Bow Section */}
            {activeTarget === 'titanic' && (
              <g>
                <path d="M 80 180 L 380 180 L 440 80 L 220 80 Z" fill="url(#laserMeshGrad)" stroke="#00f3ff" strokeWidth="2" />
                <line x1="220" y1="80" x2="220" y2="180" stroke="#00f3ff" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="320" y1="80" x2="320" y2="180" stroke="#00f3ff" strokeWidth="2" strokeDasharray="4 4" />
                {/* Anchor chain */}
                <path d="M 400 90 Q 420 140 450 190" stroke="#ff007f" strokeWidth="3" fill="none" strokeDasharray="6 4" />
              </g>
            )}

            {/* Target 3: Hydrothermal Vents */}
            {activeTarget === 'vents' && (
              <g>
                <path d="M 160 210 L 180 50 L 220 50 L 240 210 Z" fill="url(#laserMeshGrad)" stroke="#00f3ff" strokeWidth="2" />
                <path d="M 300 210 L 320 80 L 350 80 L 370 210 Z" fill="url(#laserMeshGrad)" stroke="#00f3ff" strokeWidth="2" />
                {/* Mineral plume smoke */}
                <circle cx="200" cy="30" r="18" fill="rgba(255,0,127,0.4)" className="animate-pulse" />
                <circle cx="335" cy="60" r="14" fill="rgba(0,243,255,0.4)" className="animate-pulse" />
              </g>
            )}

            {/* Target 4: Hadal Trench Treasure Chest */}
            {activeTarget === 'hadal' && (
              <g>
                <rect x="180" y="100" width="140" height="90" rx="10" fill="url(#laserMeshGrad)" stroke="#ffd700" strokeWidth="3" />
                <path d="M 180 100 Q 250 50 320 100 Z" fill="#ffd700" stroke="#fff" strokeWidth="2" />
                <circle cx="250" cy="145" r="12" fill="#ffd700" className="animate-bounce" />
              </g>
            )}
          </svg>

        </div>

        {/* Real-Time Laser Scan Output Bar */}
        <div className="pt-4 border-t border-cyan-900/60 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10 font-mono text-xs">
          <div className="space-y-1 text-left">
            <span className="text-[10px] text-cyan-300 font-bold uppercase flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> LASER REVEAL DATA • POSITION: {laserPos.toFixed(0)}%
            </span>
            <div className="text-white font-bold">{current.scanResult}</div>
          </div>

          <div className="flex items-center space-x-3">
            {activeTarget === 'hadal' ? (
              <button
                onClick={onUnlockAchievement}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 font-bold text-xs text-slate-950 font-display hover:brightness-110 transition-all shadow-[0_0_20px_#ffd700]"
              >
                OPEN TREASURE CHEST
              </button>
            ) : (
              <button
                onClick={() => onOpenBooking()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 font-bold text-xs text-slate-950 font-display hover:brightness-110 transition-all shadow-[0_0_20px_#00f3ff]"
              >
                BOOK EXPEDITION HERE
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
