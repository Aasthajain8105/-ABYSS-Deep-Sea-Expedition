import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Sliders, Dna, RefreshCw, Send, CheckCircle, Volume2, Activity, Play } from 'lucide-react';
import { oceanAudio } from '../utils/soundEngine';

export default function BioluminescentLab({ onReleaseToOcean }) {
  const canvasRef = useRef(null);
  
  // Custom Jellyfish Parameters
  const [jellyColor, setJellyColor] = useState('#00f3ff');
  const [tentacleCount, setTentacleCount] = useState(10);
  const [glowIntensity, setGlowIntensity] = useState(25);
  const [swimSpeed, setSwimSpeed] = useState(2);
  const [bellSize, setBellSize] = useState(55);
  const [released, setReleased] = useState(false);

  const colors = [
    { name: 'Neon Cyan', hex: '#00f3ff' },
    { name: 'Bio Pink', hex: '#ff007f' },
    { name: 'Emerald Green', hex: '#00ff88' },
    { name: 'Electric Violet', hex: '#9d00ff' },
    { name: 'Solar Gold', hex: '#ffd700' },
    { name: 'Coral Amber', hex: '#ff6b00' }
  ];

  // Canvas Animation Render Loop for Custom Jellyfish Specimen
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 360;
      }
    };
    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 0.01 * swimSpeed;
      ctx.clearRect(0, 0, width, height);

      // Dark Glass Specimen Tank Background
      const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, width / 2);
      bgGrad.addColorStop(0, '#061326');
      bgGrad.addColorStop(1, '#020712');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Specimen Center Position
      const centerX = width / 2;
      const centerY = height / 2 + Math.sin(time * 1.5) * 18;

      const pulse = Math.sin(time * 3) * 0.15 + 0.85;

      ctx.save();
      ctx.translate(centerX, centerY);

      // 1. Bioluminescent Glow Aura
      const glowGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, bellSize * 2.2);
      glowGrad.addColorStop(0, jellyColor);
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.globalAlpha = Math.min(0.8, glowIntensity / 30);
      ctx.beginPath();
      ctx.arc(0, 0, bellSize * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // 2. Bell Dome
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.ellipse(0, -10, bellSize * pulse, bellSize * 0.7 * pulse, 0, Math.PI, 0);
      ctx.fillStyle = jellyColor;
      ctx.shadowColor = jellyColor;
      ctx.shadowBlur = glowIntensity;
      ctx.fill();

      // Inner Bell Organs Glow
      ctx.beginPath();
      ctx.ellipse(
  0,
  -15,
  bellSize * 0.4 * pulse,
  bellSize * 0.3 * pulse,
  0,          // rotation
  0,          // start angle
  Math.PI * 2 // end angle
);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 15;
      ctx.fill();

      // 3. Tentacles Physics
      ctx.lineWidth = 2;
      ctx.strokeStyle = jellyColor;
      ctx.shadowBlur = glowIntensity * 0.6;

      for (let t = 0; t < tentacleCount; t++) {
        const offsetX = (t / Math.max(1, tentacleCount - 1) - 0.5) * bellSize * 1.5;
        ctx.beginPath();
        ctx.moveTo(offsetX, -10);

        const cp1x = offsetX + Math.sin(time * 4 + t) * 14;
        const cp1y = bellSize * 0.8;
        const cp2x = offsetX - Math.sin(time * 4 + t) * 14;
        const cp2y = bellSize * 1.6;
        const endX = offsetX + Math.sin(time * 3 + t) * 10;
        const endY = bellSize * 2.4;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
        ctx.stroke();
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [jellyColor, tentacleCount, glowIntensity, swimSpeed, bellSize]);

  const handleRelease = () => {
    setReleased(true);
    oceanAudio.playSonarPing();
    if (onReleaseToOcean) {
      onReleaseToOcean(jellyColor);
    }
    setTimeout(() => {
      setReleased(false);
    }, 4000);
  };

  return (
    <section 
      id="biolab"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 py-24 z-10"
    >
      <div className="max-w-6xl mx-auto w-full space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-xs font-mono text-cyan-300 shadow-[0_0_30px_rgba(0,243,255,0.25)] animate-pulse">
            <Dna className="w-4 h-4 text-cyan-400" />
            <span>PHASE 3 • BIOLUMINESCENT SYNTHESIS LAB</span>
          </div>

          <h2 className="text-4xl sm:text-7xl font-extrabold text-white font-display uppercase tracking-tight">
            CREATE YOUR GLOWING JELLYFISH
          </h2>

          <p className="text-slate-200 max-w-2xl mx-auto font-light text-base sm:text-lg">
            Synthesize a custom deep-sea organism live. Modify bioluminescent spectra, tentacle count, glow intensity, and pulsing wave physics.
          </p>
        </div>

        {/* Main Lab Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Canvas Specimen Tank Stage */}
          <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-cyan-400/50 relative overflow-hidden flex flex-col justify-between shadow-[0_0_50px_rgba(0,243,255,0.2)]">
            
            <div className="flex items-center justify-between border-b border-cyan-900/60 pb-3 font-mono text-xs text-cyan-300">
              <span className="flex items-center gap-1.5 font-bold">
                <Activity className="w-4 h-4 text-cyan-400 animate-pulse" /> LIVE SPECIMEN TANK #01
              </span>
              <span className="text-slate-400 uppercase">
                GENE CODE: BIO-{bellSize}-{tentacleCount}-{jellyColor.replace('#', '')}
              </span>
            </div>

            {/* Specimen Tank Canvas */}
            <div className="w-full relative rounded-2xl overflow-hidden my-4 border border-cyan-500/20">
              <canvas ref={canvasRef} className="w-full h-[360px] block" />
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  setJellyColor('#00f3ff');
                  setTentacleCount(10);
                  setGlowIntensity(25);
                  setSwimSpeed(2);
                  setBellSize(55);
                  oceanAudio.playBubblePop();
                }}
                className="px-4 py-2 rounded-xl glass-card text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> RESET GENES
              </button>

              <button
                onClick={handleRelease}
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 font-bold text-xs text-slate-950 font-display hover:brightness-110 transition-all flex items-center space-x-2 shadow-[0_0_25px_#00f3ff]"
              >
                <Send className="w-4 h-4" />
                <span>{released ? 'RELEASED TO OCEAN!' : 'RELEASE INTO OCEAN CANVAS'}</span>
              </button>
            </div>

          </div>

          {/* Right Live Controls Panel */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 space-y-6 text-left font-mono text-xs">
            
            <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" /> GENETIC CONTROL MATRIX
            </h3>

            {/* 1. Bioluminescent Color Selection */}
            <div className="space-y-2">
              <label className="text-slate-400 block uppercase">1. BIOLUMINESCENT SPECTRA COLOR</label>
              <div className="grid grid-cols-3 gap-2">
                {colors.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => {
                      setJellyColor(c.hex);
                      oceanAudio.playBubblePop();
                    }}
                    className={`p-2.5 rounded-xl border flex items-center space-x-2 transition-all ${
                      jellyColor === c.hex 
                        ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,243,255,0.3)] scale-105' 
                        : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span 
                      className="w-3.5 h-3.5 rounded-full inline-block shrink-0" 
                      style={{ backgroundColor: c.hex, boxShadow: `0 0 10px ${c.hex}` }} 
                    />
                    <span className="text-[10px] truncate">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Tentacle Count Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>2. TENTACLE COUNT</span>
                <span className="text-cyan-400 font-bold">{tentacleCount} TENTACLES</span>
              </div>
              <input
                type="range"
                min="4"
                max="20"
                value={tentacleCount}
                onChange={(e) => setTentacleCount(parseInt(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-950 rounded-lg cursor-pointer"
              />
            </div>

            {/* 3. Glow Intensity Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>3. GLOW INTENSITY & STROBE</span>
                <span className="text-cyan-400 font-bold">{glowIntensity} LUMENS</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={glowIntensity}
                onChange={(e) => setGlowIntensity(parseInt(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-950 rounded-lg cursor-pointer"
              />
            </div>

            {/* 4. Swim Speed Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>4. SWIM SPEED & PROPULSION</span>
                <span className="text-cyan-400 font-bold">{swimSpeed}x PULSE</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="0.5"
                value={swimSpeed}
                onChange={(e) => setSwimSpeed(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-950 rounded-lg cursor-pointer"
              />
            </div>

            {/* 5. Bell Size Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>5. BELL DOME SIZE</span>
                <span className="text-cyan-400 font-bold">{bellSize}mm RADIUS</span>
              </div>
              <input
                type="range"
                min="35"
                max="75"
                value={bellSize}
                onChange={(e) => setBellSize(parseInt(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-950 rounded-lg cursor-pointer"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
