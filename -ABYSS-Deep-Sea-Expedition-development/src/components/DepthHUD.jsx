import React, { useMemo } from 'react';
import { OCEAN_ZONES } from '../utils/oceanData';

/**
 * DepthHUD — Submarine circular instrument panel.
 * Replaces the rectangular glass card with an SVG sonar ring
 * that looks like a porthole-mounted pressure gauge.
 */
export default function DepthHUD({ currentDepth, scrollProgress }) {
  const currentZone = OCEAN_ZONES.find(
    (z) => currentDepth >= z.depthMin && currentDepth <= z.depthMax
  ) || OCEAN_ZONES[OCEAN_ZONES.length - 1];

  const pressureAtm = Math.round(1 + currentDepth / 10);
  const tempC = currentDepth > 2000
    ? (1.1 + (1 - currentDepth / 10994) * 1.5).toFixed(1)
    : (25 - (currentDepth / 10994) * 23.9).toFixed(1);
  const depthPct = Math.min(100, (currentDepth / 10994) * 100);

  // Zone color for the arc
  const zoneColor = useMemo(() => {
    if (scrollProgress < 0.18) return '#7dd3fc';
    if (scrollProgress < 0.45) return '#818cf8';
    if (scrollProgress < 0.72) return '#6366f1';
    if (scrollProgress < 0.90) return '#00f3ff';
    return '#c4b5fd';
  }, [scrollProgress]);

  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const r = 76;
  const strokeW = 3;

  // SVG arc path helper
  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  const polarToCartesian = (x, y, radius, angle) => {
    const a = ((angle - 90) * Math.PI) / 180;
    return { x: x + radius * Math.cos(a), y: y + radius * Math.sin(a) };
  };

  // Depth arc: goes from -130deg to +130deg (260deg total sweep)
  const arcStart = -130;
  const arcEnd = arcStart + (depthPct / 100) * 260;

  // Tick marks around ring
  const ticks = Array.from({ length: 13 }, (_, i) => {
    const angle = -130 + i * (260 / 12);
    const inner = polarToCartesian(cx, cy, r - 8, angle);
    const outer = polarToCartesian(cx, cy, r - 2, angle);
    return { inner, outer, major: i % 3 === 0 };
  });

  if (scrollProgress < 0.02) return null;

  return (
    <div
      className="fixed right-4 md:right-6 top-24 z-30 pointer-events-none hidden sm:block"
      style={{
        opacity: Math.min(1, scrollProgress * 8),
        transform: `translateX(${Math.max(0, (1 - scrollProgress * 5) * 30)}px)`,
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      {/* Outer rim — submarine viewport mounting ring */}
      <div
        className="relative"
        style={{
          width: size + 24,
          height: size + 24,
        }}
      >
        {/* Mounting bolts (corners) */}
        {[[-2, -2], [size + 18, -2], [-2, size + 18], [size + 18, size + 18]].map(([bx, by], i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: bx,
              top: by,
              background: 'radial-gradient(circle, rgba(60,80,100,0.9) 0%, rgba(20,30,45,0.8) 100%)',
              border: '1px solid rgba(0,243,255,0.15)',
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.05)',
            }}
          />
        ))}

        {/* Main instrument disc */}
        <div
          className="absolute inset-3 rounded-full flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle at 35% 35%, rgba(6,15,30,0.98) 0%, rgba(1,3,8,1) 100%)',
            border: `1px solid rgba(0,243,255,0.12)`,
            boxShadow: `0 0 40px rgba(0,0,0,0.9), inset 0 0 20px rgba(0,0,0,0.8), 0 0 20px ${zoneColor}18`,
          }}
        >
          {/* SVG gauge overlay */}
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="absolute inset-0"
          >
            {/* Background arc (full sweep, dark track) */}
            <path
              d={describeArc(cx, cy, r, -130, 130)}
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth={strokeW + 1}
              strokeLinecap="round"
            />

            {/* Active depth arc */}
            {depthPct > 0 && (
              <path
                d={describeArc(cx, cy, r, arcStart, Math.min(130, arcEnd))}
                fill="none"
                stroke={zoneColor}
                strokeWidth={strokeW}
                strokeLinecap="round"
                style={{
                  filter: `drop-shadow(0 0 6px ${zoneColor}80)`,
                  transition: 'stroke 1s ease',
                }}
              />
            )}

            {/* Tick marks */}
            {ticks.map((tick, i) => (
              <line
                key={i}
                x1={tick.inner.x}
                y1={tick.inner.y}
                x2={tick.outer.x}
                y2={tick.outer.y}
                stroke={tick.major ? 'rgba(0,243,255,0.3)' : 'rgba(255,255,255,0.08)'}
                strokeWidth={tick.major ? 1.5 : 0.8}
                strokeLinecap="round"
              />
            ))}

            {/* Sonar ping ring */}
            <circle
              cx={cx}
              cy={cy}
              r={r + 10}
              fill="none"
              stroke={`${zoneColor}18`}
              strokeWidth="1"
              strokeDasharray="3 8"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 ${cx} ${cy}`}
                to={`360 ${cx} ${cy}`}
                dur="12s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Depth needle */}
            {(() => {
              const needleAngle = arcStart + (depthPct / 100) * 260;
              const needleTip = polarToCartesian(cx, cy, r - 12, needleAngle);
              const needleBase1 = polarToCartesian(cx, cy, 10, needleAngle + 90);
              const needleBase2 = polarToCartesian(cx, cy, 10, needleAngle - 90);
              return (
                <polygon
                  points={`${needleTip.x},${needleTip.y} ${needleBase1.x},${needleBase1.y} ${needleBase2.x},${needleBase2.y}`}
                  fill={zoneColor}
                  style={{ filter: `drop-shadow(0 0 4px ${zoneColor})`, transition: 'all 0.3s ease' }}
                />
              );
            })()}

            {/* Center axle */}
            <circle cx={cx} cy={cy} r={5} fill={zoneColor} opacity={0.8}
              style={{ filter: `drop-shadow(0 0 6px ${zoneColor})` }} />
            <circle cx={cx} cy={cy} r={2.5} fill="rgba(1,3,8,1)" />
          </svg>

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center text-center" style={{ marginTop: '10px' }}>
            {/* Depth readout */}
            <div
              className="text-2xl font-bold tabular-nums leading-none"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: zoneColor,
                textShadow: `0 0 20px ${zoneColor}80`,
                transition: 'color 1s ease, text-shadow 1s ease',
              }}
            >
              {currentDepth > 999
                ? `${(currentDepth / 1000).toFixed(1)}k`
                : currentDepth.toLocaleString()
              }
            </div>
            <div
              className="text-[8px] tracking-widest mt-0.5"
              style={{ color: 'rgba(200,220,240,0.4)', fontFamily: "'JetBrains Mono', monospace" }}
            >
              METERS
            </div>

            {/* Zone tag */}
            <div
              className="mt-2 text-[7px] tracking-[0.25em] uppercase px-1.5 py-0.5 rounded"
              style={{
                color: zoneColor,
                background: `${zoneColor}12`,
                border: `1px solid ${zoneColor}25`,
                fontFamily: "'JetBrains Mono', monospace",
                textShadow: `0 0 8px ${zoneColor}60`,
                transition: 'all 1s ease',
              }}
            >
              {currentZone.id}
            </div>
          </div>

        </div>

        {/* Sub-gauges below the main ring — pressure & temp in tiny inline displays */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3 whitespace-nowrap"
          style={{ opacity: Math.min(1, scrollProgress * 5) }}
        >
          <div className="flex flex-col items-center">
            <span
              className="text-[7px] tracking-widest uppercase"
              style={{ color: 'rgba(0,243,255,0.35)', fontFamily: "'JetBrains Mono', monospace" }}
            >
              ATM
            </span>
            <span
              className="text-[10px] font-bold tabular-nums"
              style={{ color: 'rgba(200,220,240,0.7)', fontFamily: "'JetBrains Mono', monospace" }}
            >
              {pressureAtm}
            </span>
          </div>
          <div className="w-px bg-white/5" />
          <div className="flex flex-col items-center">
            <span
              className="text-[7px] tracking-widest uppercase"
              style={{ color: 'rgba(0,243,255,0.35)', fontFamily: "'JetBrains Mono', monospace" }}
            >
              °C
            </span>
            <span
              className="text-[10px] font-bold tabular-nums"
              style={{ color: 'rgba(200,220,240,0.7)', fontFamily: "'JetBrains Mono', monospace" }}
            >
              {tempC}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
