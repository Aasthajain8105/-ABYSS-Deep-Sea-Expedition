import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid 
} from 'recharts';
import { Activity, Compass, Radio, Sparkles, Navigation } from 'lucide-react';
import { oceanAudio } from '../utils/soundEngine';

export default function OceanDashboard({ currentDepth = 0 }) {
  const [activeMetric, setActiveMetric] = useState('pressure'); // 'pressure' | 'oxygen' | 'temp' | 'whale'
  const [liveTelemetry, setLiveTelemetry] = useState([]);

  // Generate live dynamic hydrographic stream data based on current scroll depth
  useEffect(() => {
    const baseDepth = currentDepth || 1000;

    const generateStream = () => {
      const data = [];
      for (let i = 0; i < 15; i++) {
        const stepDepth = Math.min(10994, Math.max(0, baseDepth + (i - 7) * 200));
        
        // Pressure equation: P = 1 + depth / 10
        const pressure = Math.round(1 + stepDepth / 10);

        // Oxygen decay curve: 98% -> 28%
        const oxygen = Math.max(28, Math.round(98 - (stepDepth / 10994) * 70));

        // Temperature drop curve: 24.5°C -> 1.1°C
        let temp = (24.5 - (stepDepth / 10994) * 23.4).toFixed(1);
        if (stepDepth > 3000) temp = (1.1 + Math.sin(i) * 0.2).toFixed(1);

        // Whale migration coordinate trajectory
        const whaleLat = (11.35 + Math.sin(i * 0.4) * 0.08).toFixed(3);
        const whaleLon = (142.20 + Math.cos(i * 0.4) * 0.12).toFixed(3);

        data.push({
          time: `T+${i}m`,
          depth: stepDepth,
          pressure,
          oxygen,
          temp: parseFloat(temp),
          lat: parseFloat(whaleLat),
          lon: parseFloat(whaleLon)
        });
      }
      setLiveTelemetry(data);
    };

    generateStream();
    const interval = setInterval(generateStream, 2000);
    return () => clearInterval(interval);
  }, [currentDepth]);

  return (
    <section 
      id="dashboard"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 py-24 z-10"
    >
      <div className="max-w-6xl mx-auto w-full space-y-12">
        
        {/* Cinematic Header with High Breathing Space */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-xs font-mono text-cyan-300 shadow-[0_0_30px_rgba(0,243,255,0.25)] animate-pulse">
            <Radio className="w-4 h-4 text-cyan-400" />
            <span>PHASE 7 • OCEAN INTELLIGENCE & TELEMETRY STREAM</span>
          </div>

          <h2 className="text-4xl sm:text-7xl font-extrabold text-white font-display uppercase tracking-tight">
            OCEAN INTELLIGENCE
          </h2>

          <p className="text-slate-200 max-w-2xl mx-auto font-light text-base sm:text-lg">
            Live stream telemetry captured by autonomous hydro-sensors. Pressure increases continuously, oxygen decays into abyssal voids, and whale acoustic migration trajectories are tracked in real time.
          </p>
        </div>

        {/* Minimalist Metric Mode Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-3 font-mono text-xs">
          <button
            onClick={() => {
              setActiveMetric('pressure');
              oceanAudio.playBubblePop();
            }}
            className={`px-6 py-3 rounded-2xl transition-all border ${
              activeMetric === 'pressure'
                ? 'glass-panel-glow border-cyan-400 text-cyan-300 shadow-[0_0_25px_rgba(0,243,255,0.3)]'
                : 'glass-panel text-slate-400 hover:text-white border-white/5'
            }`}
          >
            HYDROSTATIC PRESSURE (atm)
          </button>

          <button
            onClick={() => {
              setActiveMetric('oxygen');
              oceanAudio.playBubblePop();
            }}
            className={`px-6 py-3 rounded-2xl transition-all border ${
              activeMetric === 'oxygen'
                ? 'glass-panel-glow border-emerald-400 text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.3)]'
                : 'glass-panel text-slate-400 hover:text-white border-white/5'
            }`}
          >
            OXYGEN SATURATION (%)
          </button>

          <button
            onClick={() => {
              setActiveMetric('temp');
              oceanAudio.playBubblePop();
            }}
            className={`px-6 py-3 rounded-2xl transition-all border ${
              activeMetric === 'temp'
                ? 'glass-panel-glow border-blue-400 text-blue-300 shadow-[0_0_25px_rgba(59,130,246,0.3)]'
                : 'glass-panel text-slate-400 hover:text-white border-white/5'
            }`}
          >
            WATER THERMOCLINE (°C)
          </button>

          <button
            onClick={() => {
              setActiveMetric('whale');
              oceanAudio.playWhaleSong();
            }}
            className={`px-6 py-3 rounded-2xl transition-all border ${
              activeMetric === 'whale'
                ? 'glass-panel-glow border-purple-400 text-purple-300 shadow-[0_0_25px_rgba(168,85,247,0.3)]'
                : 'glass-panel text-slate-400 hover:text-white border-white/5'
            }`}
          >
            WHALE MIGRATION PATH
          </button>
        </div>

        {/* Cinematic Recharts Visualizer Stage */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-400/40 relative overflow-hidden shadow-[0_0_60px_rgba(0,243,255,0.2)] space-y-6">
          
          <div className="flex items-center justify-between border-b border-cyan-900/60 pb-3 font-mono text-xs text-cyan-300">
            <span className="flex items-center gap-1.5 font-bold uppercase">
              <Activity className="w-4 h-4 text-cyan-400 animate-pulse" /> LIVE STREAM READOUT • MODE: {activeMetric.toUpperCase()}
            </span>
            <span className="text-slate-400">DEPTH: {currentDepth.toLocaleString()}M</span>
          </div>

          {/* Recharts Live Stream Chart */}
          <div className="w-full h-80 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              {activeMetric === 'pressure' ? (
                <AreaChart data={liveTelemetry}>
                  <defs>
                    <linearGradient id="pressGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#00f3ff" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis stroke="#64748b" unit=" atm" />
                  <Tooltip contentStyle={{ backgroundColor: '#091426', borderColor: '#00f3ff', borderRadius: '12px', color: '#fff' }} />
                  <Area type="monotone" dataKey="pressure" stroke="#00f3ff" strokeWidth={3} fillOpacity={1} fill="url(#pressGrad)" />
                </AreaChart>
              ) : activeMetric === 'oxygen' ? (
                <LineChart data={liveTelemetry}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis stroke="#64748b" unit=" %" />
                  <Tooltip contentStyle={{ backgroundColor: '#091426', borderColor: '#10b981', borderRadius: '12px', color: '#fff' }} />
                  <Line type="monotone" dataKey="oxygen" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 5 }} />
                </LineChart>
              ) : activeMetric === 'temp' ? (
                <AreaChart data={liveTelemetry}>
                  <defs>
                    <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis stroke="#64748b" unit="°C" />
                  <Tooltip contentStyle={{ backgroundColor: '#091426', borderColor: '#3b82f6', borderRadius: '12px', color: '#fff' }} />
                  <Area type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#tempGrad)" />
                </AreaChart>
              ) : (
                <LineChart data={liveTelemetry}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="lon" stroke="#64748b" tickFormatter={(v) => `${v}°E`} />
                  <YAxis stroke="#64748b" tickFormatter={(v) => `${v}°N`} />
                  <Tooltip contentStyle={{ backgroundColor: '#091426', borderColor: '#a855f7', borderRadius: '12px', color: '#fff' }} />
                  <Line type="monotone" dataKey="lat" stroke="#a855f7" strokeWidth={3} dot={{ fill: '#a855f7', r: 6 }} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>

        </div>

      </div>
    </section>
  );
}
