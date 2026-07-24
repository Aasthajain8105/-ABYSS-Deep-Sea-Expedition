import React from 'react';
import { Award, Sparkles, X, Gift, Check } from 'lucide-react';
import { oceanAudio } from '../utils/soundEngine';

export default function EasterEggModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4">
      <div className="glass-panel-glow max-w-md w-full p-8 rounded-3xl border border-amber-400/80 text-center space-y-6 relative animate-fade-in text-slate-100 shadow-[0_0_50px_rgba(255,215,0,0.3)]">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Glowing Badge Avatar */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-yellow-600 p-[2px] mx-auto shadow-[0_0_30px_rgba(255,215,0,0.5)] animate-bounce">
          <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-amber-400">
            <Award className="w-10 h-10" />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-amber-400 tracking-widest uppercase flex items-center justify-center gap-1">
            <Sparkles className="w-4 h-4" /> SECRET ACHIEVEMENT UNLOCKED!
          </span>
          <h2 className="text-3xl font-extrabold text-white font-display">
            ABYSSAL MASTER EXPLORER
          </h2>
          <p className="text-xs text-slate-300 font-light leading-relaxed">
            You discovered the secret Hadal Treasure Chest at 10,994 meters depth. Only 0.001% of ocean explorers unlock this perk.
          </p>
        </div>

        {/* VIP Discount Coupon Code */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-amber-400/50 space-y-1 font-mono">
          <span className="text-[10px] text-slate-400 uppercase">EXCLUSIVE VIP EXPEDITION DISCOUNT CODE</span>
          <div className="text-xl font-bold text-amber-300 tracking-wider">
            CHALLENGER-DEEP-2026
          </div>
          <span className="text-[10px] text-emerald-400 block">15% SAVINGS APPLIED ON NEXT RESERVATION</span>
        </div>

        <button
          onClick={() => {
            oceanAudio.playSonarPing();
            onClose();
          }}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 font-bold text-xs text-slate-950 font-display hover:brightness-110 transition-all shadow-lg"
        >
          CLAIM ACHIEVEMENT & CLOSE
        </button>

      </div>
    </div>
  );
}
