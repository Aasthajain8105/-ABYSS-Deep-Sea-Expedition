import React from 'react';
import { Compass, Thermometer, ShieldAlert, Activity, Radio } from 'lucide-react';
import { OCEAN_ZONES } from '../utils/oceanData';

export default function DepthHUD({ currentDepth, scrollProgress }) {
  // Compute zone based on current depth
  const currentZone = OCEAN_ZONES.find(
    (z) => currentDepth >= z.depthMin && currentDepth <= z.depthMax
  ) || OCEAN_ZONES[OCEAN_ZONES.length - 1];

  // Calculated hydrostatic pressure in atmospheres (P = 1 + depth / 10)
  const pressureAtm = (1 + currentDepth / 10).toFixed(0);
  
  // Calculated temperature drop
  let tempC = (25 - (currentDepth / 10994) * 23.9).toFixed(1);
  if (currentDepth > 2000) tempC = (1.1 + (1 - currentDepth / 10994) * 1.5).toFixed(1);

  // Oxygen saturation
  const oxygenPct = Math.max(24, (98 - (currentDepth / 10994) * 72)).toFixed(0);

  return (
    <div className="fixed right-4 md:right-8 top-28 z-30 pointer-events-none hidden sm:block">
      <div className="glass-panel p-4 rounded-2xl w-60 border border-cyan-500/20 shadow-2xl backdrop-blur-xl pointer-events-auto transition-all duration-300 hover:border-cyan-400/50">
        
        {/* HUD Header & Radar Ping */}
        <div className="flex items-center justify-between border-b border-cyan-900/40 pb-2 mb-3">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-cyan-300 uppercase">
              ABYSS TELEMETRY
            </span>
          </div>
          {/* Animated Sonar Radar Circle */}
          <div className="relative w-5 h-5 flex items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-cyan-400/40 animate-ping opacity-75"></span>
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
          </div>
        </div>

        {/* Big Depth Display */}
        <div className="mb-3">
          <div className="text-[10px] font-mono text-slate-400 flex justify-between">
            <span>CURRENT DEPTH</span>
            <span className="text-cyan-400 font-semibold">{currentZone.name.split(' ')[0]}</span>
          </div>
          <div className="flex items-baseline space-x-1 mt-0.5">
            <span className="text-3xl font-extrabold font-mono text-cyan-300 tracking-tight glow-text-cyan">
              {currentDepth.toLocaleString()}
            </span>
            <span className="text-sm font-mono text-slate-400">METERS</span>
          </div>
          {/* Visual Vertical Depth Meter Bar */}
          <div className="w-full bg-slate-900/80 h-1.5 rounded-full mt-2 overflow-hidden border border-cyan-900/50">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 transition-all duration-150 rounded-full"
              style={{ width: `${Math.min(100, Math.max(1, (currentDepth / 10994) * 100))}%` }}
            />
          </div>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          
          {/* Pressure */}
          <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
            <div className="text-[9px] text-slate-400 flex items-center gap-1">
              <ShieldAlert className="w-3 h-3 text-cyan-400" />
              <span>PRESSURE</span>
            </div>
            <div className="text-sm font-bold text-slate-200 mt-0.5">
              {pressureAtm} <span className="text-[10px] font-normal text-slate-400">atm</span>
            </div>
          </div>

          {/* Temperature */}
          <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
            <div className="text-[9px] text-slate-400 flex items-center gap-1">
              <Thermometer className="w-3 h-3 text-blue-400" />
              <span>WATER TEMP</span>
            </div>
            <div className="text-sm font-bold text-slate-200 mt-0.5">
              {tempC}°C
            </div>
          </div>

          {/* Oxygen */}
          <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
            <div className="text-[9px] text-slate-400 flex items-center gap-1">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span>O2 SAT</span>
            </div>
            <div className="text-sm font-bold text-emerald-300 mt-0.5">
              {oxygenPct}%
            </div>
          </div>

          {/* Visibility */}
          <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
            <div className="text-[9px] text-slate-400 flex items-center gap-1">
              <Compass className="w-3 h-3 text-purple-400" />
              <span>VISIBILITY</span>
            </div>
            <div className="text-xs font-bold text-purple-300 mt-0.5">
              {currentDepth < 200 ? '100m Clear' : currentDepth < 1000 ? '15m Faint' : '0m Pitch Black'}
            </div>
          </div>

        </div>

        {/* Current Zone Tag */}
        <div className="mt-3 pt-2 border-t border-cyan-900/40 text-[10px] font-mono text-cyan-400/80 flex items-center justify-between">
          <span>ZONE STATUS</span>
          <span className="px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300 uppercase">
            {currentZone.id}
          </span>
        </div>

      </div>
    </div>
  );
}
