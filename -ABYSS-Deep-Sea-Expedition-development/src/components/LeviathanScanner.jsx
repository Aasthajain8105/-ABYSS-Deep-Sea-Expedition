import React, { useState, useEffect } from 'react';
import { 
  Activity, Heart, Bone, ShieldAlert, Sparkles, Radio, Volume2, X, ChevronRight, Eye, Cpu, Zap 
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { oceanAudio } from '../utils/soundEngine';

export default function LeviathanScanner({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('heart'); // 'heart' | 'skeleton' | 'muscles' | 'telemetry'
  const [bpm, setBpm] = useState(6);
  const [ecgData, setEcgData] = useState([]);

  // Generate realistic low-BPM deep ocean whale ECG heart wave
  useEffect(() => {
    const generateECG = () => {
      const data = [];
      for (let i = 0; i < 40; i++) {
        let val = 20 + Math.sin(i * 0.3) * 5;
        // Periodic QRS peak pulse
        if (i % 10 === 4) val = 95;
        if (i % 10 === 5) val = 5;
        data.push({ time: i, signal: val });
      }
      setEcgData(data);
    };
    generateECG();

    const interval = setInterval(() => {
      setBpm((prev) => (prev === 6 ? 7 : prev === 7 ? 5 : 6));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-panel-glow max-w-4xl w-full p-6 sm:p-8 rounded-3xl border border-cyan-400 my-6 relative animate-fade-in text-slate-100 shadow-[0_0_60px_rgba(0,243,255,0.3)]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900/60 transition-colors font-mono text-xs flex items-center gap-1"
        >
          <X className="w-5 h-5 text-cyan-400" />
          <span>[ESC]</span>
        </button>

        {/* Top Header */}
        <div className="flex items-center space-x-3 border-b border-cyan-900/60 pb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> LEVIATHAN OS v4.8 • BIOMETRIC SCAN ENGINE
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              BALEEN LEVIATHAN (BALAENOPTERA MUSCULUS)
            </h2>
          </div>
        </div>

        {/* Anatomical Layer Selection Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-4 font-mono text-xs">
          <button
            onClick={() => {
              setActiveTab('heart');
              oceanAudio.playSonarPing();
            }}
            className={`px-5 py-2.5 rounded-xl transition-all flex items-center space-x-2 ${
              activeTab === 'heart'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-400/60 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-400 animate-bounce" />
            <span>HEARTBEAT & CARDIO</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('skeleton');
              oceanAudio.playSonarPing();
            }}
            className={`px-5 py-2.5 rounded-xl transition-all flex items-center space-x-2 ${
              activeTab === 'skeleton'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <Bone className="w-4 h-4 text-cyan-400" />
            <span>SKELETON & PRESSURE</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('muscles');
              oceanAudio.playSonarPing();
            }}
            className={`px-5 py-2.5 rounded-xl transition-all flex items-center space-x-2 ${
              activeTab === 'muscles'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>MYOGLOBIN & MUSCLE</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('telemetry');
              oceanAudio.playWhaleSong();
            }}
            className={`px-5 py-2.5 rounded-xl transition-all flex items-center space-x-2 ${
              activeTab === 'telemetry'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-400/60 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <Radio className="w-4 h-4 text-purple-400" />
            <span>HYDRO-TELEMETRY</span>
          </button>
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
          
          {/* Left Visual Wireframe Graphic */}
          <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-cyan-500/30 relative min-h-[300px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-cyan-500/5 rounded-2xl pointer-events-none" />

            {/* Glowing Whale Hologram SVG */}
            <div className="relative w-full h-56 flex items-center justify-center">
              <svg className="w-full h-full drop-shadow-[0_0_25px_rgba(0,243,255,0.6)]" viewBox="0 0 600 240">
                <defs>
                  <linearGradient id="whaleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#006699" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#9d00ff" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Whale Silhouette */}
                <path
                  d="M 50 120 C 120 40, 320 30, 480 90 C 520 105, 560 90, 580 80 C 570 110, 560 130, 580 160 C 530 145, 480 140, 420 160 C 300 190, 150 180, 50 120 Z"
                  fill="url(#whaleGrad)"
                  stroke="#00f3ff"
                  strokeWidth="2"
                />

                {/* Heartbeat Pulse Node */}
                {activeTab === 'heart' && (
                  <g className="animate-ping origin-center" style={{ transformOrigin: '180px 115px' }}>
                    <circle cx="180" cy="115" r="18" fill="rgba(244,63,94,0.4)" stroke="#f43f5e" strokeWidth="2" />
                    <circle cx="180" cy="115" r="6" fill="#f43f5e" />
                  </g>
                )}

                {/* Skeleton Spine Grid */}
                {activeTab === 'skeleton' && (
                  <path
                    d="M 90 115 Q 260 95 480 110"
                    stroke="#00f3ff"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                  />
                )}

                {/* Muscle Thermal Glow */}
                {activeTab === 'muscles' && (
                  <ellipse cx="260" cy="120" rx="120" ry="35" fill="rgba(16,185,129,0.3)" stroke="#10b981" strokeWidth="2" />
                )}

                {/* Hydro-Telemetry Sonar Rings */}
                {activeTab === 'telemetry' && (
                  <circle cx="120" cy="110" r="45" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 4" className="animate-spin" />
                )}
              </svg>
            </div>

            {/* Bottom Status Tag */}
            <div className="absolute bottom-3 left-4 text-[10px] font-mono text-cyan-300/80 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>LIVE BIOMETRIC NODE: {activeTab.toUpperCase()}</span>
            </div>
          </div>

          {/* Right Metrics Panel */}
          <div className="lg:col-span-5 space-y-4 font-mono text-xs">
            
            {activeTab === 'heart' && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-slate-950/80 p-4 rounded-xl border border-rose-500/40">
                  <div className="text-[10px] text-slate-400 flex justify-between">
                    <span>EXTREME DIVE BRADYVARDIA</span>
                    <span className="text-rose-400 font-bold">LIVE ECG</span>
                  </div>
                  <div className="text-3xl font-extrabold text-rose-300 mt-1 flex items-baseline gap-2">
                    {bpm} <span className="text-sm text-slate-400 font-normal">BPM</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Heart rate slows 90% during 1,000m dives to conserve oxygen.
                  </div>
                </div>

                <div className="w-full h-32 bg-slate-950/90 rounded-xl p-2 border border-rose-900/40">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={ecgData}>
                      <Area type="monotone" dataKey="signal" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'skeleton' && (
              <div className="space-y-3 animate-fade-in">
                <div className="bg-slate-950/80 p-4 rounded-xl border border-cyan-500/40">
                  <span className="text-[10px] text-slate-400 block">FLEXIBLE RIBCAGE DEFLECTION</span>
                  <div className="text-2xl font-bold text-cyan-300 mt-1">400 ATM PROOF</div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                    Lungs collapse completely without snapping ribs. Air voids are safely expelled into upper airways.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="glass-card p-3 rounded-lg">
                    <span className="text-slate-400 block">BONE DENSITY</span>
                    <span className="text-cyan-300 font-bold">HIGH SPONGY POROSITY</span>
                  </div>
                  <div className="glass-card p-3 rounded-lg">
                    <span className="text-slate-400 block">ACOUSTIC BULLA</span>
                    <span className="text-cyan-300 font-bold">ISOLATED SKULL BONE</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'muscles' && (
              <div className="space-y-3 animate-fade-in">
                <div className="bg-slate-950/80 p-4 rounded-xl border border-emerald-500/40">
                  <span className="text-[10px] text-slate-400 block">MYOGLOBIN OXYGEN STORAGE</span>
                  <div className="text-2xl font-bold text-emerald-300 mt-1">10x HUMAN DENSITY</div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                    Muscle tissue is nearly black from dense myoglobin proteins, holding 35% of total body oxygen.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'telemetry' && (
              <div className="space-y-3 animate-fade-in">
                <div className="bg-slate-950/80 p-4 rounded-xl border border-purple-500/40">
                  <span className="text-[10px] text-slate-400 block">HYDROPHONE SONAR PULSE</span>
                  <div className="text-2xl font-bold text-purple-300 mt-1">188 DECIBELS</div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                    Low-frequency whale songs travel over 1,000 miles across the ocean's deep acoustic channel.
                  </p>
                </div>
                <button
                  onClick={() => oceanAudio.playWhaleSong()}
                  className="w-full py-2.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/40 font-bold text-xs flex items-center justify-center gap-2 hover:bg-purple-500/30"
                >
                  <Volume2 className="w-4 h-4 text-purple-400" />
                  <span>PLAY HYDROPHONE AUDIO BROADCAST</span>
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
