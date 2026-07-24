import React, { useState } from 'react';
import { SUBMARINES, EXPEDITION_DESTINATIONS } from '../utils/oceanData';
import { Calendar, Users, ShieldCheck, CheckCircle, Sparkles, X, ChevronRight } from 'lucide-react';
import { oceanAudio } from '../utils/soundEngine';

export default function BookingModal({ isOpen, onClose, initialSub, initialDest }) {
  const [selectedSub, setSelectedSub] = useState(initialSub || SUBMARINES[0]);
  const [selectedDest, setSelectedDest] = useState(initialDest || EXPEDITION_DESTINATIONS[0]);
  const [passengers, setPassengers] = useState(2);
  const [diveDate, setDiveDate] = useState('2026-11-14');
  const [addons, setAddons] = useState(['biologist', 'stream']);
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!isOpen) return null;

  const toggleAddon = (id) => {
    setAddons((prev) => 
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  // Price calculations
  const basePriceNum = parseInt(selectedSub.pricePerSeat.replace(/[^0-9]/g, '')) || 125000;
  const addonsTotal = addons.length * 15000;
  const totalPrice = (basePriceNum * passengers + addonsTotal).toLocaleString();

  const handleConfirm = (e) => {
    e.preventDefault();
    oceanAudio.playSonarPing();
    setIsConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-panel-glow max-w-2xl w-full p-6 sm:p-8 rounded-3xl border border-cyan-400 my-8 space-y-6 relative animate-fade-in text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isConfirmed ? (
          <>
            {/* Header */}
            <div className="space-y-1">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> ABYSS RESERVATION PROTOCOL
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                BOOK YOUR EXPEDITION
              </h2>
            </div>

            <form onSubmit={handleConfirm} className="space-y-5 text-xs font-mono">
              
              {/* Select Submersible Vessel */}
              <div className="space-y-2">
                <label className="text-slate-400 uppercase block">1. SELECT SUBMERSIBLE VESSEL</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {SUBMARINES.map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => {
                        setSelectedSub(sub);
                        oceanAudio.playBubblePop();
                      }}
                      className={`p-3 rounded-2xl cursor-pointer border transition-all ${
                        selectedSub.id === sub.id
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,243,255,0.2)]'
                          : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold font-display text-sm text-white">{sub.name}</div>
                      <div className="text-[10px] text-cyan-400/80">{sub.maxDepth}</div>
                      <div className="text-[10px] text-slate-400 mt-1">{sub.pricePerSeat} / seat</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Select Target Expedition Destination */}
              <div className="space-y-2">
                <label className="text-slate-400 uppercase block">2. TARGET DESTINATION</label>
                <select
                  value={selectedDest.id}
                  onChange={(e) => {
                    const dest = EXPEDITION_DESTINATIONS.find((d) => d.id === e.target.value);
                    if (dest) setSelectedDest(dest);
                  }}
                  className="w-full bg-slate-950/90 border border-slate-800 rounded-xl p-3 text-cyan-300 font-mono focus:border-cyan-400 focus:outline-none"
                >
                  {EXPEDITION_DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.id} className="bg-slate-950 text-white">
                      {d.name} ({d.depth}) — {d.duration}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Passengers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-slate-400 uppercase flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" /> EXPEDITION LAUNCH DATE
                  </label>
                  <input
                    type="date"
                    value={diveDate}
                    onChange={(e) => setDiveDate(e.target.value)}
                    className="w-full bg-slate-950/90 border border-slate-800 rounded-xl p-3 text-cyan-300 font-mono focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-slate-400 uppercase flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-cyan-400" /> PASSENGERS (MAX 4)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="4"
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-950/90 border border-slate-800 rounded-xl p-3 text-cyan-300 font-mono focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Luxury Addons Checkboxes */}
              <div className="space-y-2">
                <label className="text-slate-400 uppercase block">3. VIP LUXURY ADDONS</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div
                    onClick={() => toggleAddon('biologist')}
                    className={`p-3 rounded-xl cursor-pointer border flex items-center justify-between ${
                      addons.includes('biologist') ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span>Personal Marine Biologist Guide</span>
                    <span>+$15,000</span>
                  </div>
                  <div
                    onClick={() => toggleAddon('stream')}
                    className={`p-3 rounded-xl cursor-pointer border flex items-center justify-between ${
                      addons.includes('stream') ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span>4K Satellite Live Stream Stream</span>
                    <span>+$15,000</span>
                  </div>
                </div>
              </div>

              {/* Price Summary & Submit */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">ESTIMATED TOTAL INVEST</span>
                  <span className="text-2xl font-extrabold text-white font-mono glow-text-cyan">
                    ${totalPrice}
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 font-bold text-xs text-slate-950 font-display hover:brightness-110 transition-all shadow-[0_0_25px_rgba(0,243,255,0.4)] flex items-center space-x-2"
                >
                  <span>CONFIRM RESERVATION</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </>
        ) : (
          /* Booking Confirmation Ticket Pass */
          <div className="text-center space-y-6 py-6">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center mx-auto text-cyan-400 animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
                RESERVATION VERIFIED & SECURED
              </span>
              <h2 className="text-3xl font-extrabold text-white font-display">
                WELCOME ABOARD ABYSS
              </h2>
            </div>

            {/* Boarding Pass Glass Card */}
            <div className="glass-panel p-6 rounded-2xl border border-cyan-400/60 text-left font-mono text-xs space-y-3 relative overflow-hidden">
              <div className="flex justify-between border-b border-cyan-900/60 pb-2">
                <span>PASSENGER PASS: #{Math.floor(100000 + Math.random() * 900000)}</span>
                <span className="text-cyan-400">CONFIRMED</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div>VESSEL: <span className="text-white font-bold">{selectedSub.name}</span></div>
                <div>DESTINATION: <span className="text-white font-bold">{selectedDest.name}</span></div>
                <div>LAUNCH DATE: <span className="text-cyan-300">{diveDate}</span></div>
                <div>PASSENGERS: <span className="text-cyan-300">{passengers} GUESTS</span></div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsConfirmed(false);
                onClose();
              }}
              className="px-8 py-3 rounded-xl glass-card text-xs font-mono text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20"
            >
              RETURN TO DESCENT EXPERIENCE
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
