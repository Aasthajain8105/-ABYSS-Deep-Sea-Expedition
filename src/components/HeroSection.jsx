import React, { useState, useEffect } from 'react';
import { Play, Volume2, ArrowDown } from 'lucide-react';
import { oceanAudio } from '../utils/soundEngine';

export default function HeroSection({ onStartDescent, onOpenBooking }) {
  const [step, setStep] = useState(0); // 0: Fade from black -> 1: Quote -> 2: Title reveal -> 3: Full UI
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    // Step 1: Quote reveal after 800ms
    const t1 = setTimeout(() => setStep(1), 800);

    // Step 2: Title reveal after 3.2s
    const t2 = setTimeout(() => setStep(2), 3400);

    // Step 3: Button & UI reveal after 5.5s
    const t3 = setTimeout(() => setStep(3), 5600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleAudioStart = () => {
    const active = oceanAudio.toggleSound();
    setIsAudioPlaying(active);
    if (active) oceanAudio.playSonarPing();
  };

  const handleBeginDescent = () => {
    if (!isAudioPlaying) {
      oceanAudio.toggleSound();
    }
    oceanAudio.playSonarPing();
    onStartDescent();
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex flex-col justify-between items-center text-center px-6 pt-32 pb-16 z-10 overflow-hidden select-none"
    >
      {/* Volumetric Surface Ambient Sunlight Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-cyan-400/10 via-blue-500/5 to-transparent blur-[160px] rounded-full pointer-events-none" />

      {/* Top Breathing Space */}
      <div className="w-full h-12" />

      {/* Main Documentary Title Opening Stage (< 20% Viewport Footprint) */}
      <div className="max-w-4xl mx-auto space-y-8 my-auto transition-all duration-1000">
        
        {/* Step 1: Opening Sentence */}
        <p className={`text-slate-300 font-mono text-xs sm:text-sm tracking-[0.3em] uppercase transition-all duration-1000 ${
          step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          “The ocean hides more than it reveals.”
        </p>

        {/* Step 2: Massive Luxury Documentary Title */}
        <h1 className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-wider text-white font-serif-luxury uppercase leading-[0.95] drop-shadow-2xl transition-all duration-1000 delay-300 ${
          step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          THE UNSEEN <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-cyan-100 to-slate-400 glow-text-subtle">
            REALM
          </span>
        </h1>

        {/* Step 3: Minimal Call To Action Buttons */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 transition-all duration-1000 delay-500 ${
          step >= 3 ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-6 pointer-events-none'
        }`}>
          
          {/* Begin Descent CTA */}
          <button
            onClick={handleBeginDescent}
            className="group relative px-10 py-4.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-2xl border border-white/20 font-mono font-medium text-xs text-white tracking-[0.25em] uppercase transition-all duration-500 hover:scale-105 flex items-center space-x-3 cursor-pointer shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            <Play className="w-3.5 h-3.5 fill-white text-white group-hover:translate-x-1 transition-transform" />
            <span>BEGIN DESCENT</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleAudioStart}
            className="px-8 py-4.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-xl border border-white/10 text-xs font-mono text-slate-300 tracking-widest uppercase transition-all duration-500 flex items-center space-x-2.5"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isAudioPlaying ? 'text-cyan-300 animate-pulse' : 'text-slate-400'}`} />
            <span>{isAudioPlaying ? 'OCEAN AMBIENCE ACTIVE' : 'ENABLE AUDIO'}</span>
          </button>

        </div>

      </div>

      {/* Downward Scroll Prompt */}
      <div 
        onClick={handleBeginDescent}
        className={`flex flex-col items-center space-y-3 cursor-pointer group transition-all duration-1000 delay-700 ${
          step >= 3 ? 'opacity-70 hover:opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-[10px] font-mono tracking-[0.3em] text-slate-400 group-hover:text-cyan-200 transition-colors uppercase">
          CONTINUOUS VERTICAL DIVE (0m → 11,000m)
        </span>
        <div className="w-6 h-10 rounded-full border border-white/20 p-1 flex justify-center items-start group-hover:border-cyan-300 transition-colors">
          <div className="w-1 h-2.5 bg-white/60 rounded-full animate-bounce mt-1" />
        </div>
      </div>

    </section>
  );
}

