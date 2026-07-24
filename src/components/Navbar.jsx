import React, { useState } from 'react';
import { Volume2, VolumeX, Anchor, Compass, Calendar } from 'lucide-react';
import { oceanAudio } from '../utils/soundEngine';

export default function Navbar({ currentZone, onOpenBooking, currentDepth }) {
  const [isAudioActive, setIsAudioActive] = useState(false);

  const handleAudioToggle = () => {
    const active = oceanAudio.toggleSound();
    setIsAudioActive(active);
    if (active) oceanAudio.playSonarPing();
  };

  const scrollToSection = (id) => {
    oceanAudio.playBubblePop();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-4 md:px-8 py-4 transition-all duration-500">
      <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-5 py-3 flex items-center justify-between border border-cyan-500/20 shadow-2xl">
        
        {/* Brand Logo */}
        <div 
          onClick={() => scrollToSection('hero')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center p-[1px] group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Anchor className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            </div>
            <div className="absolute inset-0 bg-cyan-400/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-wider text-white font-display flex items-center gap-1.5">
              ABYSS <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-normal">DEEP LUXURY</span>
            </span>
          </div>
        </div>

        {/* Desktop Depth Quick Nav */}
        <nav className="hidden lg:flex items-center space-x-1 font-mono text-xs text-slate-300">
          <button 
            onClick={() => scrollToSection('hero')} 
            className="px-3 py-1.5 rounded-lg hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors"
          >
            0m Surface
          </button>
          <span className="text-slate-700">/</span>
          <button 
            onClick={() => scrollToSection('twilight')} 
            className="px-3 py-1.5 rounded-lg hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors"
          >
            200m Twilight
          </button>
          <span className="text-slate-700">/</span>
          <button 
            onClick={() => scrollToSection('biolab')} 
            className="px-3 py-1.5 rounded-lg hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors text-cyan-400 font-semibold"
          >
            Bio Lab
          </button>
          <span className="text-slate-700">/</span>
          <button 
            onClick={() => scrollToSection('midnight')} 
            className="px-3 py-1.5 rounded-lg hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors"
          >
            1,000m Submersibles
          </button>
          <span className="text-slate-700">/</span>
          <button 
            onClick={() => scrollToSection('abyss')} 
            className="px-3 py-1.5 rounded-lg hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors"
          >
            4,000m Abyss
          </button>
          <span className="text-slate-700">/</span>
          <button 
            onClick={() => scrollToSection('dashboard')} 
            className="px-3 py-1.5 rounded-lg hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors"
          >
            11,000m Hadal
          </button>
        </nav>

        {/* Right Actions: Sound + Booking Button */}
        <div className="flex items-center space-x-3">
          
          {/* Sound Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`px-3 py-2 rounded-xl flex items-center space-x-2 text-xs font-mono transition-all border ${
              isAudioActive 
                ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300 shadow-[0_0_15px_rgba(0,243,255,0.3)]' 
                : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:text-white'
            }`}
            title="Toggle Spatial Hydrophone Sound"
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                <div className="flex items-end space-x-0.5 h-3.5 mb-0.5">
                  <span className="w-0.5 h-3 bg-cyan-400 animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-0.5 h-2 bg-cyan-400 animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                  <span className="w-0.5 h-3.5 bg-cyan-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="hidden sm:inline">AUDIO OFF</span>
              </>
            )}
          </button>

          {/* Booking CTA */}
          <button
            onClick={() => {
              oceanAudio.playSonarPing();
              onOpenBooking();
            }}
            className="relative group overflow-hidden px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-xs text-black tracking-wide font-display hover:brightness-110 transition-all shadow-[0_0_20px_rgba(0,243,255,0.4)] flex items-center space-x-2"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-950 group-hover:rotate-12 transition-transform" />
            <span>BOOK EXPEDITION</span>
          </button>
        </div>

      </div>
    </header>
  );
}
