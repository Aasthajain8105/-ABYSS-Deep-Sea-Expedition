import React, { useEffect, useState, useRef } from 'react';

/**
 * CreatureTooltip — appears at the creature's canvas position.
 * Organic blob shape, phosphorescent glow matching the creature's bioluminescence.
 * Auto-dismisses after 7 seconds.
 */
export default function CreatureTooltip({ creature, position, onDismiss }) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!creature) return;
    setMounted(true);
    requestAnimationFrame(() => setVisible(true));

    timerRef.current = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setMounted(false);
        onDismiss?.();
      }, 600);
    }, 7000);

    return () => clearTimeout(timerRef.current);
  }, [creature]);

  if (!mounted || !creature || !position) return null;

  const glow = creature.color || '#00f3ff';
  const glowRGB = hexToRgb(glow);

  // Smart repositioning — keep tooltip on screen
  const tooltipW = 320;
  const tooltipH = 260;
  let x = position.x - tooltipW / 2;
  let y = position.y - tooltipH - 30;
  if (x < 12) x = 12;
  if (x + tooltipW > window.innerWidth - 12) x = window.innerWidth - tooltipW - 12;
  if (y < 80) y = position.y + 30;

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: x,
        top: y,
        width: tooltipW,
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(8px)',
        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
      aria-hidden="true"
    >
      {/* Blob shape background using SVG filter */}
      <div
        className="relative rounded-[40%_60%_55%_45%/45%_55%_60%_40%] p-px overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${glow}40, ${glow}10, transparent)`,
          boxShadow: `0 0 40px ${glow}50, 0 0 80px ${glow}20, inset 0 0 20px ${glow}15`,
          animation: 'blobMorph 8s ease-in-out infinite',
        }}
      >
        {/* Inner content */}
        <div
          className="rounded-[38%_62%_53%_47%/43%_53%_58%_42%] px-5 py-4 relative overflow-hidden"
          style={{
            background: `radial-gradient(ellipse at 30% 30%, rgba(${glowRGB},0.12) 0%, rgba(1,4,15,0.92) 70%)`,
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Etched scan line decoration */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.15) 3px, rgba(255,255,255,0.15) 4px)',
            }}
          />

          {/* Bio-classification header */}
          <div
            className="text-[8px] font-mono tracking-[0.35em] uppercase mb-1.5 flex items-center justify-between"
            style={{ color: `${glow}90` }}
          >
            <span className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full inline-block animate-pulse"
                style={{ backgroundColor: glow, boxShadow: `0 0 8px ${glow}` }}
              />
              SPECIMEN ANALYSIS
            </span>
            <span className="text-[7px] text-slate-500 uppercase tracking-widest">
              {creature.type || 'MARINE SPECIES'}
            </span>
          </div>

          {/* Creature name & Scientific Name */}
          <div className="mb-2">
            <div
              className="text-base font-extrabold tracking-wide leading-tight"
              style={{
                color: '#f0fdff',
                textShadow: `0 0 20px ${glow}80`,
                fontFamily: "'Cinzel', serif",
              }}
            >
              {creature.name}
            </div>
            <div
              className="text-[9px] font-mono italic"
              style={{ color: `${glow}cc` }}
            >
              {creature.scientificName || `${creature.name.replace(/\s+/g, '')} oceanus`}
            </div>
          </div>

          {/* Depth & Status Badges */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <div
              className="inline-flex items-center gap-1 text-[8px] font-mono px-2 py-0.5 rounded-full"
              style={{
                background: `${glow}18`,
                border: `1px solid ${glow}40`,
                color: glow,
              }}
            >
              ▼ {creature.depth || `${creature.depthM}m`}
            </div>
            <div
              className="inline-flex items-center gap-1 text-[8px] font-mono px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300"
            >
              STATUS: {creature.status || 'PROTECTED'}
            </div>
            <div
              className="inline-flex items-center gap-1 text-[8px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300"
            >
              DANGER: {creature.dangerLevel || 'MINIMAL'}
            </div>
          </div>

          {/* Scientific Specs Grid */}
          <div className="grid grid-cols-2 gap-1.5 p-2 rounded-xl bg-slate-950/60 border border-white/[0.05] text-[8px] font-mono mb-2">
            <div>
              <span className="text-slate-500 block">HABITAT</span>
              <span className="text-slate-200 font-semibold">{creature.habitat || 'Open Ocean / Abyssal'}</span>
            </div>
            <div>
              <span className="text-slate-500 block">DIET</span>
              <span className="text-slate-200 font-semibold">{creature.diet || 'Zooplankton / Carnivore'}</span>
            </div>
            <div>
              <span className="text-slate-500 block">SIZE / WEIGHT</span>
              <span className="text-slate-200 font-semibold">{creature.size ? `${creature.size} cm` : 'Variable'} • {creature.weight || '120 kg'}</span>
            </div>
            <div>
              <span className="text-slate-500 block">LIFESPAN</span>
              <span className="text-slate-200 font-semibold">{creature.lifespan || '25–80 Years'}</span>
            </div>
          </div>

          {/* Species fact */}
          <p
            className="text-[9px] leading-relaxed text-slate-300 font-light"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {creature.fact}
          </p>

          {/* Bio-spectra footer */}
          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-white/[0.06]">
            <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">BIOLUMINESCENCE</span>
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: glow, boxShadow: `0 0 10px ${glow}` }}
            />
            <span
              className="text-[8px] font-mono uppercase"
              style={{ color: `${glow}aa` }}
            >
              {glow.toUpperCase()}
            </span>
          </div>

          {/* Dismiss hint */}
          <div
            className="absolute top-2 right-3 text-[7px] font-mono text-slate-700 tracking-widest"
            style={{ color: `${glow}40` }}
          >
            AUTO-DISMISS
          </div>
        </div>
      </div>

      {/* Connector dot to creature */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-1.5 h-6 flex flex-col items-center gap-0.5"
        style={{ bottom: y < position.y - tooltipH - 30 ? '-24px' : 'auto', top: y >= position.y + 30 ? '-24px' : 'auto' }}
      >
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-0.5 h-1.5 rounded-full"
            style={{
              backgroundColor: glow,
              opacity: 0.6 - i * 0.15,
              boxShadow: `0 0 4px ${glow}`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0,243,255';
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`;
}
