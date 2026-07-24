import React, { useMemo } from 'react';

/**
 * DepthVignette — fixed overlay that simulates the crushing pressure of depth.
 * At surface (0): transparent, open ocean
 * At twilight (0.18): faint dark ring appears
 * At midnight (0.45): porthole ring tightens noticeably
 * At hadal (1.0): crushing ring, almost opaque edges
 */
export default function DepthVignette({ depthRatio = 0 }) {
  const style = useMemo(() => {
    // Vignette radius shrinks as we dive — simulates porthole pressure crush
    const vignetteSize = Math.max(30, 90 - depthRatio * 60); // 90% → 30% radius
    const vignetteOpacity = Math.min(0.95, depthRatio * 0.85);

    // Color shifts from near-transparent teal-black to total void black
    const edgeR = Math.round(0 + depthRatio * 1);
    const edgeG = Math.round(depthRatio < 0.3 ? 8 * (1 - depthRatio / 0.3) : 0);
    const edgeB = Math.round(depthRatio < 0.3 ? 14 * (1 - depthRatio / 0.3) : 0);

    // Secondary abyssal pressure ring (tighter, darker)
    const innerSize = Math.max(5, 50 - depthRatio * 50);
    const innerOpacity = Math.min(0.7, Math.max(0, (depthRatio - 0.45) * 1.4));

    return {
      background: `
        radial-gradient(
          ellipse ${vignetteSize}% ${vignetteSize}% at 50% 50%,
          transparent 0%,
          transparent 40%,
          rgba(${edgeR},${edgeG},${edgeB},${vignetteOpacity * 0.3}) 70%,
          rgba(${edgeR},${edgeG},${edgeB},${vignetteOpacity}) 100%
        ),
        radial-gradient(
          ellipse ${innerSize}% ${innerSize * 1.2}% at 50% 50%,
          transparent 0%,
          rgba(0,0,0,${innerOpacity}) 100%
        )
      `,
      // Chromatic aberration at extreme depth
      filter: depthRatio > 0.8
        ? `saturate(${Math.max(0.1, 1 - (depthRatio - 0.8) * 3)}) brightness(${Math.max(0.4, 1 - (depthRatio - 0.8) * 2)})`
        : 'none',
      transition: 'filter 0.8s ease-out',
    };
  }, [depthRatio]);

  // Depth zone label that fades as text engraved on the porthole rim
  const zoneLabel = useMemo(() => {
    if (depthRatio < 0.05) return null;
    if (depthRatio < 0.18) return { text: 'EPIPELAGIC ZONE', depth: '0–200m', color: '#7dd3fc' };
    if (depthRatio < 0.45) return { text: 'MESOPELAGIC ZONE', depth: '200–1,000m', color: '#818cf8' };
    if (depthRatio < 0.72) return { text: 'BATHYPELAGIC ZONE', depth: '1,000–4,000m', color: '#6366f1' };
    if (depthRatio < 0.90) return { text: 'ABYSSOPELAGIC ZONE', depth: '4,000–6,000m', color: '#4338ca' };
    return { text: 'HADAL ZONE', depth: '6,000–11,000m', color: '#312e81' };
  }, [depthRatio]);

  // Pressure crack lines at extreme depth (visual stress on porthole)
  const pressureCrackOpacity = Math.max(0, (depthRatio - 0.85) * 6);

  return (
    <>
      {/* Main depth vignette overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-20"
        style={style}
        aria-hidden="true"
      />

      {/* Zone label engraved on porthole rim — bottom center */}
      {zoneLabel && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-25 flex flex-col items-center gap-1"
          style={{
            opacity: Math.min(1, depthRatio * 4),
            transition: 'opacity 1s ease',
          }}
        >
          <div
            className="text-[9px] font-mono tracking-[0.4em] uppercase"
            style={{
              color: zoneLabel.color,
              textShadow: `0 0 20px ${zoneLabel.color}60, 0 0 40px ${zoneLabel.color}30`,
              letterSpacing: '0.4em',
            }}
          >
            {zoneLabel.text}
          </div>
          <div
            className="text-[8px] font-mono text-slate-600 tracking-widest"
          >
            {zoneLabel.depth}
          </div>
        </div>
      )}

      {/* Pressure crack overlay at hadal depths */}
      {pressureCrackOpacity > 0 && (
        <div
          className="fixed inset-0 pointer-events-none z-21"
          style={{
            opacity: pressureCrackOpacity,
            background: `
              linear-gradient(23deg, transparent 48%, rgba(99,102,241,0.06) 49%, transparent 50%),
              linear-gradient(157deg, transparent 47%, rgba(99,102,241,0.04) 48%, transparent 49%),
              linear-gradient(82deg, transparent 51%, rgba(139,92,246,0.05) 52%, transparent 53%)
            `,
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
}
