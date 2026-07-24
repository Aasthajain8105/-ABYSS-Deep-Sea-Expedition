import React, { useState } from 'react';
import { EXPEDITION_DESTINATIONS, SUBMARINES } from '../utils/oceanData';
import { 
  Compass, Anchor, Flame, Waves, ArrowRight, ShieldCheck, Clock, Users, UserCheck, Sparkles, Navigation, MapPin 
} from 'lucide-react';
import { oceanAudio } from '../utils/soundEngine';

export default function ExpeditionExplorer({ onOpenBooking }) {
  const [selectedDest, setSelectedDest] = useState(EXPEDITION_DESTINATIONS[0]);
  const [activeWayPoint, setActiveWayPoint] = useState('mariana-trench');

  const crewMembers = [
    { name: 'Dr. Elena Rostova', role: 'Chief Deep-Sea Oceanographer', experience: '142 Trench Dives', avatar: '👩‍🔬' },
    { name: 'Capt. Marcus Vance', role: 'Master Submersible Pilot', experience: 'Titanium Hadal Certified', avatar: '👨‍✈️' },
    { name: 'Kai Tanaka', role: 'Acoustic Sonar Engineer', experience: 'Bio-Acoustics Specialist', avatar: '👨‍💻' }
  ];

  const luxuryPackages = [
    {
      title: 'Hadal Vanguard Tier',
      depth: '11,000m Challenger Deep',
      vessel: 'Titan IX Hadal Vanguard',
      price: '$250,000',
      tag: 'ULTIMATE EXPLORATION',
      floatDelay: '0s'
    },
    {
      title: 'Abyssal Odyssey Tier',
      depth: '6,000m Abyssal Plain',
      vessel: 'ABYSS Nautilus-X',
      price: '$125,000',
      tag: 'MOST POPULAR',
      floatDelay: '1.5s'
    },
    {
      title: 'Twilight Coral Wall',
      depth: '450m Coral Wall',
      vessel: 'Abyssal Odyssey Lounge',
      price: '$85,000',
      tag: 'GENTLE DIVE',
      floatDelay: '3s'
    }
  ];

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Compass': return <Compass className="w-5 h-5 text-cyan-400" />;
      case 'Anchor': return <Anchor className="w-5 h-5 text-blue-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-amber-400" />;
      default: return <Waves className="w-5 h-5 text-teal-400" />;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-16 py-8">
      
      {/* Floating Header Tag */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-xs font-mono text-cyan-300 shadow-[0_0_30px_rgba(0,243,255,0.25)] animate-pulse">
          <Navigation className="w-4 h-4 text-cyan-400" />
          <span>PHASE 4 • FLOATING EXPEDITION CONTROL ROOM</span>
        </div>
        <h2 className="text-4xl sm:text-7xl font-extrabold text-white font-display uppercase tracking-tight">
          EXPEDITION CONTROL
        </h2>
        <p className="text-slate-200 max-w-2xl mx-auto font-light text-base sm:text-lg">
          Weightless, floating telemetry mapping your submersibles, expert crew, abyssal trajectories, and luxury packages.
        </p>
      </div>

      {/* 1. FLOATING INTERACTIVE OCEAN JOURNEY MAP */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2 text-xs font-mono text-cyan-300">
          <span className="flex items-center gap-1.5 font-bold uppercase">
            <MapPin className="w-4 h-4 text-cyan-400" /> SPATIAL JOURNEY WAYPOINTS (CLICK TO ENGAGE)
          </span>
          <span className="text-slate-400">DEPTH TRAJECTORY LOG</span>
        </div>

        {/* Floating Spatial Map Stage */}
        <div className="glass-panel p-8 rounded-3xl border border-cyan-500/30 relative min-h-[380px] flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.15)]">
          {/* Background Ambient Grid & Waves */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/40 via-blue-950/20 to-transparent pointer-events-none" />

          {/* Floating Waypoint Node Pods */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {EXPEDITION_DESTINATIONS.map((dest, idx) => (
              <div
                key={dest.id}
                onClick={() => {
                  setActiveWayPoint(dest.id);
                  setSelectedDest(dest);
                  oceanAudio.playSonarPing();
                }}
                className={`p-5 rounded-2xl cursor-pointer transition-all border transform hover:-translate-y-2 ${
                  activeWayPoint === dest.id
                    ? 'glass-panel-glow border-cyan-400 shadow-[0_0_30px_rgba(0,243,255,0.4)] scale-105'
                    : 'glass-card hover:border-cyan-500/40'
                }`}
                style={{ animation: `floatSlow 6s ease-in-out infinite ${idx * 1.2}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-700 flex items-center justify-center">
                    {getIcon(dest.icon)}
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    {dest.depth}
                  </span>
                </div>

                <div className="mt-3">
                  <span className="text-[9px] font-mono text-slate-400 uppercase">{dest.zone}</span>
                  <h4 className="font-bold text-white font-display text-sm mt-0.5">{dest.name.split('—')[0]}</h4>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-cyan-400 flex items-center justify-between">
                  <span>VESSEL:</span>
                  <span className="text-slate-200 font-bold">{dest.vessel.split(' ')[0]}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Active Waypoint Trajectory Information floating panel */}
          <div className="mt-6 p-6 rounded-2xl glass-panel-glow border border-cyan-400 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10 animate-fade-in">
            <div className="space-y-1 text-left">
              <span className="text-xs font-mono text-cyan-300 font-bold uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> ACTIVE TRAJECTORY: {selectedDest.name}
              </span>
              <p className="text-xs text-slate-200 font-light max-w-2xl">
                {selectedDest.highlights}
              </p>
            </div>

            <button
              onClick={() => {
                oceanAudio.playSonarPing();
                onOpenBooking(null, selectedDest);
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 font-bold text-xs text-slate-950 font-display hover:brightness-110 transition-all shrink-0 shadow-[0_0_20px_#00f3ff]"
            >
              BOOK THIS TRAJECTORY
            </button>
          </div>

        </div>
      </div>

      {/* 2. FLOATING CREW DOSSIERS */}
      <div className="space-y-4">
        <div className="text-xs font-mono text-cyan-300 flex items-center gap-1.5 uppercase font-bold px-2">
          <UserCheck className="w-4 h-4 text-cyan-400" /> MASTER EXPEDITION CREW DOSSIERS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {crewMembers.map((crew, idx) => (
            <div
              key={crew.name}
              className="glass-panel p-6 rounded-3xl border border-cyan-500/20 backdrop-blur-xl relative overflow-hidden group hover:border-cyan-400 transition-all text-left"
              style={{ animation: `floatSlow 7s ease-in-out infinite ${idx * 1.8}s` }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/60 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(0,243,255,0.2)] group-hover:scale-110 transition-transform">
                  {crew.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-white font-display text-base">{crew.name}</h4>
                  <span className="text-xs font-mono text-cyan-300 block">{crew.role}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-slate-300 flex justify-between">
                <span>CERTIFICATION:</span>
                <span className="text-emerald-400 font-bold">{crew.experience}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. FLOATING LUXURY TIER PACKAGES (NOT CARDS — WEIGHTLESS SPATIAL PODS) */}
      <div className="space-y-4 pt-4">
        <div className="text-xs font-mono text-cyan-300 flex items-center gap-1.5 uppercase font-bold px-2">
          <Sparkles className="w-4 h-4 text-amber-400" /> WEIGHTLESS LUXURY EXPEDITION TIERS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {luxuryPackages.map((pkg, idx) => (
            <div
              key={pkg.title}
              onClick={() => {
                oceanAudio.playSonarPing();
                onOpenBooking();
              }}
              className="glass-panel-glow p-8 rounded-3xl border border-cyan-400/50 cursor-pointer space-y-5 relative overflow-hidden group hover:scale-105 transition-all text-left shadow-[0_0_35px_rgba(0,243,255,0.2)]"
              style={{ animation: `floatSlow 8s ease-in-out infinite ${pkg.floatDelay}` }}
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 uppercase font-bold">
                  {pkg.tag}
                </span>
                <span className="text-xs font-mono text-slate-400">{pkg.depth}</span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white font-display group-hover:text-cyan-300 transition-colors">
                  {pkg.title}
                </h3>
                <span className="text-xs font-mono text-cyan-400 block mt-1">
                  VESSEL: {pkg.vessel}
                </span>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">INVESTMENT</span>
                  <span className="text-xl font-bold text-white font-mono">{pkg.price}</span>
                </div>

                <div className="w-10 h-10 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_#00f3ff]">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
