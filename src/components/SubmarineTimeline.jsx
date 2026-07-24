import React, { useState } from 'react';
import { Calendar, Layers, Users, Globe, Shield, ExternalLink, Zap } from 'lucide-react';
import { oceanAudio } from '../utils/soundEngine';

const HISTORIC_SUBMARINES = [
  {
    id: 'trieste',
    name: 'Bathyscaphe Trieste',
    year: '1953 / 1960',
    country: 'Italy / Switzerland / USA',
    maxDepth: '10,916m',
    depthM: 10916,
    crew: '2 (Jacques Piccard & Don Walsh)',
    color: '#00f3ff',
    icon: '⚓',
    missions: 'First human descent to Challenger Deep on Jan 23, 1960.',
    facts: 'Utilized gasoline for buoyancy and 9 tons of iron shot ballast dropped via electromagnets. The window was a 17cm thick plexiglas cone.',
  },
  {
    id: 'alvin',
    name: 'DSV Alvin (DSV-2)',
    year: '1964',
    country: 'United States (WHOI)',
    maxDepth: '6,500m',
    depthM: 6500,
    crew: '3 (1 Pilot + 2 Scientists)',
    color: '#38bdf8',
    icon: '🔬',
    missions: 'Discovered hydrothermal vents (1977) & first crewed survey of RMS Titanic (1986).',
    facts: 'Has completed over 5,000 deep sea dives. Rebuilt with titanium pressure sphere allowing 6500m operational rating.',
  },
  {
    id: 'nautile',
    name: 'Nautile',
    year: '1984',
    country: 'France (IFREMER)',
    maxDepth: '6,000m',
    depthM: 6000,
    crew: '3 Crew',
    color: '#818cf8',
    icon: '🇫🇷',
    missions: 'Surveys of mid-ocean ridges & recovery of 1,800+ artifacts from the Titanic wreck.',
    facts: 'Equipped with robotic manipulators, suction samplers, and titanium alloy hull engineered for extreme endurance.',
  },
  {
    id: 'mir',
    name: 'Mir 1 & Mir 2',
    year: '1987',
    country: 'Russia (Shirshov Institute)',
    maxDepth: '6,000m',
    depthM: 6000,
    crew: '3 Crew',
    color: '#c084fc',
    icon: '🎬',
    missions: 'Explored Bismarck, Komsomolets, and filmed 3D IMAX footage of Titanic for James Cameron.',
    facts: 'Built with Nickel-Steel alloy spheres. Planted a rust-proof titanium Russian flag on the seabed beneath the North Pole (2007).',
  },
  {
    id: 'shinkai6500',
    name: 'Shinkai 6500',
    year: '1989',
    country: 'Japan (JAMSTEC)',
    maxDepth: '6,500m',
    depthM: 6500,
    crew: '3 (2 Pilots + 1 Researcher)',
    color: '#f43f5e',
    icon: '🗾',
    missions: 'Explored deep ocean trenches, seismically active faults, and deep hydrothermal ecosystems.',
    facts: 'Holds one of the finest safety records in deep oceanography. Uses titanium-alloy sphere and acoustic image transmission.',
  },
  {
    id: 'deepsea_challenger',
    name: 'Deepsea Challenger',
    year: '2012',
    country: 'United States (National Geographic)',
    maxDepth: '10,908m',
    depthM: 10908,
    crew: '1 (James Cameron - Solo)',
    color: '#00ff88',
    icon: '🎬',
    missions: 'First solo human descent to Challenger Deep (March 26, 2012).',
    facts: 'Vertical ray design that descended at 2.5 m/s. Constructed with ISO-foam synthetic syntactic foam hull and 3D 4K cameras.',
  },
  {
    id: 'limiting_factor',
    name: 'DSV Limiting Factor (Triton 36000/2)',
    year: '2018',
    country: 'United States (Caladan Oceanic)',
    maxDepth: '10,928m',
    depthM: 10928,
    crew: '2 Crew (Victor Vescovo & Guests)',
    color: '#ffd700',
    icon: '👑',
    missions: 'Five Deeps Expedition: Dived to the deepest point of all 5 world oceans.',
    facts: 'First commercial submersible certified for unlimited repeat dives to 11,000m. 90mm thick Grade 5 titanium sphere.',
  },
  {
    id: 'titan_historical',
    name: 'Titan Submersible (Historical Context)',
    year: '2021',
    country: 'United States (OceanGate)',
    maxDepth: '4,000m (Uncertified)',
    depthM: 4000,
    crew: '5 Persons',
    color: '#ef4444',
    icon: '⚠️',
    missions: 'Titanic tourism dives (2021–2023). Educational study of deep sea engineering failures.',
    facts: 'Constructed from experimental 5-inch un-reinforced carbon fiber filament & acrylic dome. Imploded on June 18, 2023 due to cyclic fatigue.',
  },
];

export default function SubmarineTimeline() {
  const [selectedSub, setSelectedSub] = useState(HISTORIC_SUBMARINES[0]);

  return (
    <section className="relative w-full max-w-6xl mx-auto py-16 px-4 z-20">
      {/* Title */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-xs font-mono text-cyan-300 shadow-[0_0_25px_rgba(0,243,255,0.2)]">
          <Globe className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '20s' }} />
          <span>DEEP SEA EXPLORATION CHRONICLES • 1953–2026</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-extrabold text-white font-serif-luxury uppercase tracking-wider">
          HISTORIC SUBMERSIBLE TIMELINE
        </h2>
        <p className="text-slate-300 max-w-xl mx-auto text-xs sm:text-sm font-mono tracking-wide">
          The legendary titanium & steel vessels that unlocked the deepest trenches on Earth.
        </p>
      </div>

      {/* Horizontal timeline selector */}
      <div className="flex items-center gap-3 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-cyan-500/20">
        {HISTORIC_SUBMARINES.map((sub) => {
          const isSelected = selectedSub.id === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => {
                oceanAudio.playBubblePop?.();
                setSelectedSub(sub);
              }}
              className="flex-shrink-0 px-5 py-3 rounded-2xl border transition-all duration-300 flex items-center space-x-3 cursor-pointer"
              style={{
                background: isSelected ? 'rgba(0,243,255,0.12)' : 'rgba(6,14,30,0.6)',
                borderColor: isSelected ? sub.color : 'rgba(255,255,255,0.08)',
                boxShadow: isSelected ? `0 0 25px ${sub.color}40` : 'none',
                transform: isSelected ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <span className="text-lg">{sub.icon}</span>
              <div className="text-left">
                <div className="text-xs font-bold text-white font-mono">{sub.name}</div>
                <div className="text-[9px] font-mono text-slate-400">{sub.year} • {sub.maxDepth}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail card */}
      <div
        className="mt-6 p-8 rounded-3xl backdrop-blur-2xl border relative overflow-hidden transition-all duration-500"
        style={{
          background: 'radial-gradient(ellipse at 20% 20%, rgba(6,20,40,0.85) 0%, rgba(1,4,10,0.95) 100%)',
          borderColor: `${selectedSub.color}40`,
          boxShadow: `0 0 50px ${selectedSub.color}20, inset 0 0 30px ${selectedSub.color}10`,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{selectedSub.icon}</span>
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif-luxury">
                  {selectedSub.name}
                </h3>
                <div className="text-xs font-mono text-cyan-300">
                  {selectedSub.country} • Commissioned {selectedSub.year}
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
              {selectedSub.facts}
            </p>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
              <div className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">HISTORIC MISSIONS</div>
              <div className="text-xs text-slate-200 font-mono">{selectedSub.missions}</div>
            </div>
          </div>

          <div className="md:col-span-4 space-y-3 p-5 rounded-2xl bg-slate-950/80 border border-white/10 font-mono">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">MAX DEPTH</span>
              <span className="font-bold text-cyan-300">{selectedSub.maxDepth}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">CREW</span>
              <span className="font-bold text-slate-200">{selectedSub.crew}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">YEAR</span>
              <span className="font-bold text-slate-200">{selectedSub.year}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
