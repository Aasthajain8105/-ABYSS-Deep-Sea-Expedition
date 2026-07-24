import React, { useState } from 'react';
import { SUBMARINES } from '../utils/oceanData';
import { oceanAudio } from '../utils/soundEngine';
import {
  ArrowLeft, ChevronRight, CheckCircle2, Info, Zap, Shield, Eye, Anchor,
  Layers, Clock, Users, Star, Calendar
} from 'lucide-react';

/**
 * SubmarinesPage — a standalone full-page submarine selector.
 * Appears when the user clicks the "FLEET" tab in the Navbar.
 * Does NOT scroll to any section — it IS its own page.
 */
export default function SubmarinesPage({ onBack, onOpenBooking }) {
  const [selectedSubIndex, setSelectedSubIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hoverSub, setHoverSub] = useState(null);

  const currentSub = SUBMARINES[selectedSubIndex];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 14, y: -y * 14 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const specIcons = {
    depth: <Layers className="w-4 h-4 text-cyan-400" />,
    capacity: <Users className="w-4 h-4 text-emerald-400" />,
    speed: <Zap className="w-4 h-4 text-amber-400" />,
    life: <Shield className="w-4 h-4 text-indigo-400" />,
  };

  return (
    <div
      className="min-h-screen w-full text-slate-100"
      style={{
        background: 'radial-gradient(ellipse 120% 100% at 50% 0%, rgba(0,40,80,0.9) 0%, rgba(1,3,8,1) 50%)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Top bar */}
      <div
        className="sticky top-0 z-30 w-full px-6 py-4 flex items-center justify-between"
        style={{
          background: 'rgba(1,4,10,0.92)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,243,255,0.06)',
        }}
      >
        <button
          onClick={() => { oceanAudio.playBubblePop?.(); onBack(); }}
          className="flex items-center gap-2.5 group transition-all duration-300"
          style={{ color: 'rgba(0,243,255,0.6)', background: 'none', border: 'none' }}
        >
          <ArrowLeft
            className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
          />
          <span
            className="text-[10px] font-mono tracking-[0.3em] uppercase group-hover:text-white transition-colors"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            RETURN TO DIVE
          </span>
        </button>

        <div className="flex items-center gap-3">
          <Anchor className="w-4 h-4" style={{ color: '#00f3ff' }} />
          <span
            className="text-sm font-bold tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Cinzel', serif", color: '#e2f8ff' }}
          >
            ABYSS FLEET REGISTRY
          </span>
        </div>

        <button
          onClick={() => { oceanAudio.playSonarPing?.(); onOpenBooking(currentSub); }}
          className="flex items-center gap-2 px-4 py-2 text-[10px] font-mono tracking-widest uppercase transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(0,243,255,0.15) 0%, rgba(0,150,255,0.1) 100%)',
            border: '1px solid rgba(0,243,255,0.3)',
            borderRadius: '8px',
            color: '#00f3ff',
          }}
        >
          <Calendar className="w-3 h-3" />
          BOOK SELECTED
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10 pb-24">

        {/* Page header */}
        <div className="mb-12 max-w-2xl">
          <div
            className="text-[9px] font-mono tracking-[0.45em] uppercase mb-3 flex items-center gap-2"
            style={{
              color: 'rgba(0,243,255,0.5)',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            HADAL-CLASS SUBMERSIBLES — 4 VESSELS IN ACTIVE FLEET
          </div>
          <h1
            className="text-4xl sm:text-6xl font-extrabold leading-none mb-4"
            style={{
              fontFamily: "'Cinzel', serif",
              color: 'transparent',
              backgroundImage: 'linear-gradient(135deg, rgba(200,240,255,0.95) 0%, rgba(0,243,255,0.7) 50%, rgba(0,150,200,0.5) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px rgba(0,243,255,0.2))',
            }}
          >
            SUBMERSIBLE<br />FLEET
          </h1>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'rgba(140,180,200,0.65)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.04em' }}
          >
            Every vessel is Hadal-rated to Challenger Deep certification (11,094m). Select a craft to inspect its specifications.
          </p>
        </div>

        {/* Submarine selector strip */}
        <div className="flex gap-3 mb-10 flex-wrap">
          {SUBMARINES.map((sub, idx) => (
            <button
              key={sub.id}
              onClick={() => {
                setSelectedSubIndex(idx);
                setActiveHotspot(null);
                oceanAudio.playBubblePop?.();
              }}
              onMouseEnter={() => setHoverSub(idx)}
              onMouseLeave={() => setHoverSub(null)}
              className="relative flex flex-col items-start px-5 py-4 rounded-2xl transition-all duration-400 text-left overflow-hidden"
              style={{
                background: selectedSubIndex === idx
                  ? 'rgba(0,243,255,0.08)'
                  : 'rgba(255,255,255,0.02)',
                border: selectedSubIndex === idx
                  ? '1px solid rgba(0,243,255,0.35)'
                  : '1px solid rgba(255,255,255,0.05)',
                boxShadow: selectedSubIndex === idx
                  ? '0 0 30px rgba(0,243,255,0.12), inset 0 0 20px rgba(0,243,255,0.04)'
                  : 'none',
                minWidth: '160px',
              }}
            >
              {selectedSubIndex === idx && (
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(0,243,255,0.5), transparent)' }}
                />
              )}
              <span
                className="text-[8px] font-mono tracking-[0.3em] uppercase mb-1"
                style={{
                  color: selectedSubIndex === idx ? 'rgba(0,243,255,0.6)' : 'rgba(100,120,140,0.5)',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {sub.type}
              </span>
              <span
                className="text-sm font-bold transition-colors duration-200"
                style={{
                  color: selectedSubIndex === idx ? '#e2f8ff' : 'rgba(160,180,200,0.7)',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {sub.name}
              </span>
              <span
                className="text-[9px] font-mono mt-1"
                style={{
                  color: selectedSubIndex === idx ? 'rgba(0,243,255,0.5)' : 'rgba(80,100,120,0.5)',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {sub.maxDepth}
              </span>
            </button>
          ))}
        </div>

        {/* Main layout: 3D submarine display + specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT — 3D Submarine stage */}
          <div className="lg:col-span-7">
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative rounded-3xl overflow-hidden cursor-crosshair"
              style={{
                minHeight: '480px',
                background: 'radial-gradient(ellipse at 50% 50%, rgba(0,40,80,0.5) 0%, rgba(0,5,15,0.95) 100%)',
                border: '1px solid rgba(0,243,255,0.12)',
                boxShadow: '0 0 60px rgba(0,0,0,0.6), 0 0 30px rgba(0,243,255,0.06)',
                transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                transition: 'transform 0.12s ease-out',
              }}
            >
              {/* Ambient spotlight */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  width: '420px',
                  height: '420px',
                  background: 'radial-gradient(circle, rgba(0,243,255,0.08) 0%, transparent 70%)',
                }}
              />

              {/* Submarine SVG */}
              <div className="relative flex items-center justify-center p-10" style={{ minHeight: '420px' }}>
                <svg
                  className="w-full"
                  style={{
                    maxWidth: '500px',
                    filter: 'drop-shadow(0 0 40px rgba(0,243,255,0.35)) drop-shadow(0 0 80px rgba(0,243,255,0.12))',
                  }}
                  viewBox="0 0 500 250"
                >
                  <defs>
                    <linearGradient id="subHull" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0f2b48" />
                      <stop offset="45%" stopColor="#1e3a5f" />
                      <stop offset="100%" stopColor="#091426" />
                    </linearGradient>
                    <linearGradient id="subGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#006699" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="subAccent" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(0,243,255,0)" />
                      <stop offset="30%" stopColor="rgba(0,243,255,0.3)" />
                      <stop offset="70%" stopColor="rgba(0,243,255,0.3)" />
                      <stop offset="100%" stopColor="rgba(0,243,255,0)" />
                    </linearGradient>
                    <radialGradient id="portalGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00f3ff" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Thruster assembly */}
                  <rect x="35" y="100" width="45" height="50" rx="6" fill="#0d1e33" stroke="#00f3ff" strokeWidth="1.5" />
                  <circle cx="18" cy="125" r="20" fill="none" stroke="#00f3ff" strokeWidth="2" strokeDasharray="5 4">
                    <animateTransform attributeName="transform" type="rotate" from="0 18 125" to="360 18 125" dur="4s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="18" cy="125" r="12" fill="none" stroke="rgba(0,243,255,0.4)" strokeWidth="1.5" />

                  {/* Main pressure hull */}
                  <ellipse cx="258" cy="125" rx="175" ry="82" fill="url(#subHull)" stroke="#00f3ff" strokeWidth="2" />

                  {/* Structural ribs */}
                  {[160, 230, 300, 370].map((x, i) => (
                    <path key={i} d={`M ${x} 48 Q ${x + 15} 125 ${x} 202`} stroke="rgba(0,243,255,0.2)" strokeWidth="1.8" fill="none" />
                  ))}

                  {/* Hull accent stripe */}
                  <path d="M 90 125 L 420 125" stroke="url(#subAccent)" strokeWidth="1.5" />

                  {/* Viewport dome */}
                  <path d="M 385 78 Q 465 125 385 172 Z" fill="url(#subGlass)" stroke="#00f3ff" strokeWidth="3" />
                  <circle cx="420" cy="125" r="18" fill="url(#portalGlow)" />

                  {/* Bridge / sail */}
                  <path d="M 208 43 L 238 12 L 278 12 L 298 43 Z" fill="#0f172a" stroke="#00f3ff" strokeWidth="1.5" />
                  <rect x="218" y="12" width="60" height="6" rx="2" fill="#1e293b" />

                  {/* Sonar dome underside */}
                  <ellipse cx="258" cy="205" rx="40" ry="12" fill="#0d1e33" stroke="rgba(0,243,255,0.2)" strokeWidth="1" />

                  {/* Portholes */}
                  {[140, 200, 270, 340].map((x, i) => (
                    <g key={i}>
                      <circle cx={x} cy="115" r="11" fill="#071020" stroke="#00f3ff" strokeWidth="1.2" />
                      <circle cx={x} cy="115" r="7" fill="url(#portalGlow)" opacity="0.5" />
                    </g>
                  ))}

                  {/* Headlamp beam */}
                  <path d="M 430 115 L 495 90 L 498 125 L 495 160 L 430 135 Z" fill="rgba(0,243,255,0.06)" />
                  <circle cx="430" cy="125" r="5" fill="#00f3ff" opacity="0.9">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
                  </circle>

                  {/* Bottom stabilizer */}
                  <path d="M 120 204 L 200 204 L 180 220 L 140 220 Z" fill="#0d1e33" stroke="rgba(0,243,255,0.15)" strokeWidth="1" />
                </svg>

                {/* Interactive hotspots */}
                {currentSub.hotspots?.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => {
                      setActiveHotspot(activeHotspot?.id === spot.id ? null : spot);
                      oceanAudio.playSonarPing?.();
                    }}
                    className={`absolute w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                      activeHotspot?.id === spot.id
                        ? 'bg-cyan-400 text-slate-950 scale-125 shadow-[0_0_20px_#00f3ff]'
                        : 'bg-slate-900/90 text-cyan-400 border border-cyan-400/60 hover:scale-110'
                    }`}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  >
                    <span className="absolute inset-0 rounded-full border border-cyan-400 animate-ping opacity-60" />
                    <span className="text-[11px] font-bold">+</span>
                  </button>
                ))}
              </div>

              {/* Bottom hint */}
              <div
                className="absolute bottom-5 left-6 flex items-center gap-1.5 text-[9px] font-mono tracking-widest"
                style={{ color: 'rgba(0,243,255,0.3)', fontFamily: "'JetBrains Mono', monospace" }}
              >
                <Info className="w-3 h-3" />
                DRAG TO ROTATE · CLICK + TO INSPECT
              </div>
            </div>
          </div>

          {/* RIGHT — specs panel */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Submarine name + type */}
            <div>
              <span
                className="inline-block text-[9px] font-mono tracking-[0.35em] uppercase px-2.5 py-1 rounded mb-3"
                style={{
                  color: '#00f3ff',
                  background: 'rgba(0,243,255,0.08)',
                  border: '1px solid rgba(0,243,255,0.2)',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {currentSub.type}
              </span>
              <h2
                className="text-3xl sm:text-4xl font-extrabold leading-none mb-2"
                style={{
                  fontFamily: "'Cinzel', serif",
                  color: '#e2f8ff',
                  textShadow: '0 0 30px rgba(0,243,255,0.2)',
                }}
              >
                {currentSub.name}
              </h2>
              <p
                className="text-xs leading-relaxed"
                style={{
                  color: 'rgba(160,190,210,0.7)',
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: '0.04em',
                }}
              >
                "{currentSub.tagline}"
              </p>
            </div>

            {/* Hotspot info OR default specs */}
            {activeHotspot ? (
              <div
                className="p-5 rounded-2xl relative overflow-hidden"
                style={{
                  background: 'rgba(0,243,255,0.05)',
                  border: '1px solid rgba(0,243,255,0.3)',
                  boxShadow: '0 0 30px rgba(0,243,255,0.08)',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[8px] font-mono tracking-widest uppercase"
                    style={{ color: 'rgba(0,243,255,0.5)', fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    SYSTEM HOTSPOT
                  </span>
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="text-[9px] font-mono text-slate-500 hover:text-white transition-colors"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    [CLOSE]
                  </button>
                </div>
                <h4 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {activeHotspot.name}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {activeHotspot.desc}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: specIcons.depth, label: 'MAX DEPTH CERTIFIED', value: currentSub.maxDepth, color: '#00f3ff' },
                  { icon: specIcons.capacity, label: 'PASSENGER CAPACITY', value: currentSub.capacity, color: '#34d399' },
                  { icon: specIcons.speed, label: 'CRUISING SPEED', value: currentSub.speed, color: '#fbbf24' },
                  { icon: specIcons.life, label: 'LIFE SUPPORT', value: currentSub.lifeSupport, color: '#818cf8' },
                ].map(({ icon, label, value, color }) => (
                  <div
                    key={label}
                    className="p-4 rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      {icon}
                      <span
                        className="text-[8px] font-mono tracking-[0.25em] uppercase"
                        style={{ color: 'rgba(120,140,160,0.7)', fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {label}
                      </span>
                    </div>
                    <div
                      className="text-base font-bold"
                      style={{ color, textShadow: `0 0 12px ${color}50`, fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Feature checklist */}
            <div>
              <div
                className="text-[8px] font-mono tracking-[0.4em] uppercase mb-3"
                style={{ color: 'rgba(0,243,255,0.35)', fontFamily: "'JetBrains Mono', monospace" }}
              >
                LUXURY SPECIFICATIONS
              </div>
              <div className="space-y-2">
                {currentSub.features?.map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span
                      className="text-[11px]"
                      style={{ color: 'rgba(180,200,220,0.75)', fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price + CTA */}
            <div
              className="flex items-center justify-between pt-4"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div>
                <span
                  className="block text-[8px] font-mono tracking-widest uppercase mb-1"
                  style={{ color: 'rgba(120,140,160,0.5)', fontFamily: "'JetBrains Mono', monospace" }}
                >
                  EXPEDITION SEAT
                </span>
                <span
                  className="text-2xl font-bold"
                  style={{
                    color: '#e2f8ff',
                    fontFamily: "'JetBrains Mono', monospace",
                    textShadow: '0 0 20px rgba(0,243,255,0.2)',
                  }}
                >
                  {currentSub.pricePerSeat}
                </span>
              </div>

              <button
                onClick={() => {
                  oceanAudio.playSonarPing?.();
                  onOpenBooking(currentSub);
                }}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:brightness-110 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #00c8e8 0%, #0080ff 100%)',
                  color: '#00060a',
                  boxShadow: '0 0 25px rgba(0,200,232,0.35)',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                CONFIGURE VESSEL
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* All submarines comparison grid below */}
        <div className="mt-20">
          <div
            className="text-[8px] font-mono tracking-[0.4em] uppercase mb-6 flex items-center gap-2"
            style={{ color: 'rgba(0,243,255,0.35)', fontFamily: "'JetBrains Mono', monospace" }}
          >
            <Star className="w-3.5 h-3.5 text-amber-400" />
            FLEET COMPARISON
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {SUBMARINES.map((sub, idx) => (
              <div
                key={sub.id}
                onClick={() => { setSelectedSubIndex(idx); setActiveHotspot(null); oceanAudio.playBubblePop?.(); }}
                className="p-5 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-102 group"
                style={{
                  background: idx === selectedSubIndex
                    ? 'rgba(0,243,255,0.06)'
                    : 'rgba(255,255,255,0.02)',
                  border: idx === selectedSubIndex
                    ? '1px solid rgba(0,243,255,0.25)'
                    : '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <div
                  className="text-[7px] font-mono tracking-widest uppercase mb-1.5"
                  style={{ color: 'rgba(0,243,255,0.4)', fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {sub.type}
                </div>
                <div
                  className="text-sm font-bold mb-1 group-hover:text-white transition-colors"
                  style={{ color: 'rgba(200,220,240,0.85)', fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {sub.name}
                </div>
                <div
                  className="text-xs font-bold"
                  style={{ color: '#00f3ff', fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {sub.maxDepth}
                </div>
                <div
                  className="mt-3 text-xl font-bold"
                  style={{ color: 'rgba(200,220,240,0.7)', fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {sub.pricePerSeat}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    oceanAudio.playSonarPing?.();
                    onOpenBooking(sub);
                  }}
                  className="mt-4 w-full py-2 rounded-xl text-[10px] font-mono tracking-wider transition-all duration-200 hover:bg-cyan-400 hover:text-slate-950"
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(0,243,255,0.2)',
                    color: 'rgba(0,243,255,0.6)',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  BOOK THIS VESSEL
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
