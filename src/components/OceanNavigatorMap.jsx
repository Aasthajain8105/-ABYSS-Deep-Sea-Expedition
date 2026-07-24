import React, { useState, useEffect, useMemo } from 'react';
import { Compass, Navigation, Eye, Layers, Shield, ChevronDown, ChevronUp, Radio, Anchor, Activity, Zap } from 'lucide-react';
import { oceanAudio } from '../utils/soundEngine';

const LANDMARKS = [
  { name: 'Sunken Galleon Anchor', depth: 650 },
  { name: 'Abyssal Cave Passage', depth: 1100 },
  { name: 'Galleon Shipwreck Debris', depth: 2200 },
  { name: 'R.M.S. Titanic Wreck', depth: 3784 },
  { name: 'Hydrothermal Black Smoker', depth: 4400 },
  { name: 'Challenger Deep Seabed', depth: 10994 },
];

const DESTINATIONS = [
  { id: 'hero', name: 'Surface', depthM: 0, zone: 'SURFACE' },
  { id: 'twilight', name: 'Twilight Zone', depthM: 200, zone: 'TWILIGHT' },
  { id: 'midnight', name: 'Midnight Zone', depthM: 1000, zone: 'MIDNIGHT' },
  { id: 'titanic', name: 'Titanic Wreck', depthM: 3784, zone: 'MIDNIGHT' },
  { id: 'abyss', name: 'Abyssal Plain', depthM: 4000, zone: 'ABYSS' },
  { id: 'hadal', name: 'Hadal Trench', depthM: 6000, zone: 'HADAL' },
  { id: 'challenger', name: 'Challenger Deep', depthM: 10994, zone: 'HADAL' },
  { id: 'biolab', name: 'Bio Synthesis Lab', depthM: 11000, zone: 'LAB' },
];

export default function OceanNavigatorMap({ currentDepth = 0, depthRatio = 0, speciesFoundCount = 0, landmarksFoundCount = 0 }) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('nav'); // 'nav' | 'minimap' | 'discovery' | 'log'
  const [navToast, setNavToast] = useState(null);
  const [maxSessionDepth, setMaxSessionDepth] = useState(currentDepth);

  // Track max depth reached in session
  useEffect(() => {
    if (currentDepth > maxSessionDepth) {
      setMaxSessionDepth(currentDepth);
    }
  }, [currentDepth, maxSessionDepth]);

  // Keyboard shortcut listener ('m' to toggle map/nav panel)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'm' || e.key === 'M') {
        setCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Upcoming landmark calculation
  const upcomingLandmark = useMemo(() => {
    const next = LANDMARKS.find((l) => l.depth > currentDepth);
    if (!next) return { name: 'Challenger Seabed', dist: 0 };
    return { name: next.name, dist: next.depth - currentDepth };
  }, [currentDepth]);

  // Current zone calculation
  const currentZoneName = useMemo(() => {
    if (currentDepth < 200) return 'EPIPELAGIC (SUNLIT)';
    if (currentDepth < 1000) return 'MESOPELAGIC (TWILIGHT)';
    if (currentDepth < 4000) return 'BATHYPELAGIC (MIDNIGHT)';
    if (currentDepth < 6000) return 'ABYSSOPELAGIC (ABYSS)';
    return 'HADAL (CHALLENGER DEEP)';
  }, [currentDepth]);

  // Contextual AI Mission Log telemetry
  const missionLog = useMemo(() => {
    if (currentDepth < 200) return 'SUNLIGHT 100% • SURFACE WATER CURRENTS NOMINAL';
    if (currentDepth < 500) return 'ENTERING TWILIGHT ZONE • BIOLUMINESCENT STROBES DETECTED';
    if (currentDepth < 1000) return 'SUNLIGHT PENETRATION < 1% • THERMOCLINE BOUNDARY CROSSED';
    if (currentDepth < 2000) return 'BATHYPELAGIC REALM • HYDROSTATIC PRESSURE EXCEEDS 150 ATM';
    if (currentDepth < 3700) return 'OCEANIC NIGHT • ZERO SOLAR RADIATION PENETRATION';
    if (currentDepth < 3900) return 'SONAR WARNING: R.M.S. TITANIC WRECK 120M AHEAD';
    if (currentDepth < 5000) return 'ABYSSAL PLAIN • HYDROTHERMAL BLACK SMOKERS SPEWING MINERALS';
    if (currentDepth < 6000) return 'VESSEL PRESSURE HULL: 500 ATMOSPHERE RATING VERIFIED';
    if (currentDepth < 10000) return 'ENTERING HADAL TRENCH • TECTONIC SUBDUCTION FAULT';
    return 'CHALLENGER DEEP SEABED REACHED • 10,994m EXTREME HADAL VOID';
  }, [currentDepth]);

  const handleSmoothNavigate = (dest) => {
    oceanAudio.playSonarPing?.();
    setNavToast(`NAVIGATING TO ${dest.name.toUpperCase()}...`);
    setTimeout(() => setNavToast(null), 3000);

    const el = document.getElementById(dest.id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const heroH = window.innerHeight;
      const targetY = heroH + (dest.depthM / 11000) * (11000 * 6);
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  const progressPct = Math.min(100, (currentDepth / 10994) * 100);

  return (
    <div className="fixed bottom-6 left-6 z-40 select-none">
      {/* Short navigation transition toast */}
      {navToast && (
        <div className="absolute -top-12 left-0 px-4 py-1.5 rounded-full bg-cyan-950/90 border border-cyan-400/50 text-[9px] font-mono text-cyan-200 shadow-[0_0_20px_rgba(0,243,255,0.3)] animate-pulse flex items-center gap-2">
          <Zap className="w-3 h-3 text-cyan-400" />
          <span>{navToast}</span>
        </div>
      )}

      {/* Main glassmorphism tactical container */}
      <div
        className="rounded-3xl backdrop-blur-2xl border text-slate-100 transition-all duration-500 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        style={{
          width: collapsed ? '220px' : '360px',
          background: 'radial-gradient(ellipse at 20% 20%, rgba(6,18,36,0.92) 0%, rgba(1,4,10,0.96) 100%)',
          borderColor: 'rgba(0,243,255,0.18)',
          boxShadow: '0 0 40px rgba(0,243,255,0.1), inset 0 0 20px rgba(0,243,255,0.05)',
        }}
      >
        {/* Header & Toggle Bar */}
        <div className="px-4 py-3 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Compass className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '25s' }} />
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-cyan-300 uppercase">
              TACTICAL NAVIGATOR
            </span>
          </div>
          <button
            onClick={() => {
              oceanAudio.playBubblePop?.();
              setCollapsed((prev) => !prev);
            }}
            className="p-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Toggle Panel (Press 'M')"
          >
            {collapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Collapsed State Summary */}
        {collapsed && (
          <div className="p-3 text-[9px] font-mono space-y-1 text-slate-300">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">DEPTH</span>
              <span className="font-bold text-cyan-300">{currentDepth.toLocaleString()}m</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">ZONE</span>
              <span className="text-slate-200 truncate max-w-[120px]">{currentZoneName.split(' ')[0]}</span>
            </div>
          </div>
        )}

        {/* Expanded State Controls */}
        {!collapsed && (
          <div className="p-4 space-y-4">
            {/* Tab selection bar */}
            <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-slate-950/80 border border-white/5 text-[8px] font-mono">
              {[
                { id: 'nav', label: 'NAV' },
                { id: 'minimap', label: 'RADAR' },
                { id: 'discovery', label: 'DISCOVERY' },
                { id: 'log', label: 'LOG' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    oceanAudio.playBubblePop?.();
                    setActiveTab(tab.id);
                  }}
                  className={`py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(0,243,255,0.3)]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: QUICK NAVIGATION DESTINATIONS */}
            {activeTab === 'nav' && (
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {DESTINATIONS.map((dest) => {
                  const isActive = currentDepth >= dest.depthM && (dest.depthM === 10994 ? true : currentDepth < dest.depthM + 1200);
                  return (
                    <button
                      key={dest.id}
                      onClick={() => handleSmoothNavigate(dest)}
                      className="w-full px-3 py-2 rounded-xl text-left font-mono transition-all duration-200 flex items-center justify-between cursor-pointer border"
                      style={{
                        background: isActive ? 'rgba(0,243,255,0.12)' : 'rgba(255,255,255,0.02)',
                        borderColor: isActive ? 'rgba(0,243,255,0.4)' : 'rgba(255,255,255,0.05)',
                        boxShadow: isActive ? '0 0 15px rgba(0,243,255,0.2)' : 'none',
                      }}
                    >
                      <div>
                        <div className="text-[10px] font-bold text-white flex items-center gap-1.5">
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />}
                          {dest.name}
                        </div>
                        <div className="text-[8px] text-slate-400">{dest.zone}</div>
                      </div>
                      <div className="text-[9px] font-bold text-cyan-300">{dest.depthM.toLocaleString()}m</div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* TAB 2: MINI DEPTH RADAR MAP */}
            {activeTab === 'minimap' && (
              <div className="space-y-3 font-mono">
                <div className="flex justify-between items-center text-[9px]">
                  <span className="text-slate-400">SURFACE (0m)</span>
                  <span className="text-slate-400">HADAL (10,994m)</span>
                </div>

                {/* Vertical Depth Track with Submarine Marker */}
                <div className="relative w-full h-4 bg-slate-900 rounded-full border border-cyan-400/20 overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 opacity-60"
                    style={{ width: `${progressPct}%` }}
                  />
                  {/* Submarine Icon Marker */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-400 flex items-center justify-center shadow-[0_0_12px_#00f3ff] transition-all duration-300"
                    style={{ left: `${progressPct}%` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/80 border border-white/5 space-y-1.5 text-[9px]">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500">CURRENT ZONE:</span>
                    <span className="font-bold text-cyan-300">{currentZoneName}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500">NEXT LANDMARK:</span>
                    <span className="font-bold text-amber-300">{upcomingLandmark.name}</span>
                  </div>
                  {upcomingLandmark.dist > 0 && (
                    <div className="flex justify-between text-slate-400 text-[8px]">
                      <span>DISTANCE AHEAD:</span>
                      <span>{upcomingLandmark.dist.toLocaleString()} METERS</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: DISCOVERY SYSTEM TRACKER */}
            {activeTab === 'discovery' && (
              <div className="space-y-2.5 font-mono text-[9px]">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-white/5">
                    <span className="text-slate-500 block text-[7px]">SPECIES CATALOG</span>
                    <span className="text-sm font-bold text-cyan-300">{speciesFoundCount || 12} / 54</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-white/5">
                    <span className="text-slate-500 block text-[7px]">LANDMARKS FOUND</span>
                    <span className="text-sm font-bold text-amber-300">{landmarksFoundCount || 4} / 6</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>EXPEDITION PROGRESS</span>
                    <span className="text-cyan-300 font-bold">{progressPct.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>MAX SESSION RECORD</span>
                    <span className="text-slate-200 font-bold">{maxSessionDepth.toLocaleString()}m</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>TITANIUM HULL STATUS</span>
                    <span className="text-emerald-400 font-bold">100% NOMINAL</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: AI MISSION LOG FEED */}
            {activeTab === 'log' && (
              <div className="p-3 rounded-2xl bg-slate-950/90 border border-cyan-400/20 font-mono text-[9px] space-y-2">
                <div className="flex items-center space-x-2 text-cyan-300 font-bold border-b border-cyan-900/60 pb-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>AI TELEMETRY FEED</span>
                </div>
                <p className="text-slate-200 leading-relaxed transition-all duration-500">
                  “{missionLog}”
                </p>
                <div className="text-[7px] text-slate-500 text-right uppercase tracking-widest">
                  ABYSS DEEP AI • CONTINUOUS DESCENT STREAM
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
