import React, { useEffect, useRef, useCallback } from 'react';

// ─── Creature Definitions by Zone ────────────────────────────────────────────
const CREATURE_CATALOG = {
  // ZONE A: Sunlit / Epipelagic (0–200m)
  epipelagic: [
    {
      id: 'spinner_dolphin', name: 'Spinner Dolphin', depth: '0–200m',
      color: '#7dd3fc',
      fact: 'Performs up to 14 aerial rotations. Echolocates prey in the mesopelagic at dawn and dusk.',
    },
    {
      id: 'sea_turtle', name: 'Green Sea Turtle', depth: '0–150m',
      color: '#86efac',
      fact: 'Navigates 2,300km using Earth\'s geomagnetic field. Surfaces every 4–7 minutes to breathe.',
    },
    {
      id: 'mola_mola', name: 'Ocean Sunfish (Mola mola)', depth: '0–480m',
      color: '#fde68a',
      fact: 'The heaviest bony fish on Earth — up to 2.3 tonnes. Basks at the surface to thermoregulate after deep dives.',
    },
  ],

  // ZONE B: Twilight / Mesopelagic (200–1000m)
  mesopelagic: [
    {
      id: 'atolla_jellyfish', name: 'Crystal Atolla Jellyfish', depth: '200–600m',
      color: '#00f3ff',
      fact: 'Produces a circular alarm strobe — a "burglar alarm" bioluminescence that attracts predators of its attacker.',
    },
    {
      id: 'comb_jelly', name: 'Comb Jelly (Ctenophore)', depth: '300–800m',
      color: '#ff007f',
      fact: 'Diffracts ambient ocean light along 8 ciliated comb rows, producing rainbow iridescence — the oldest extant animal lineage.',
    },
    {
      id: 'manta_ray', name: 'Giant Oceanic Manta Ray', depth: '0–1000m',
      color: '#818cf8',
      fact: 'Brain-to-body ratio exceeds all other fish. Passes the mirror self-recognition test — indicating self-awareness.',
    },
    {
      id: 'hatchetfish', name: 'Marine Hatchetfish', depth: '200–600m',
      color: '#a78bfa',
      fact: 'Uses counter-illumination — photophores on its belly match downwelling light exactly, making it invisible from below.',
    },
  ],

  // ZONE C: Midnight / Bathypelagic (1000–4000m)
  bathypelagic: [
    {
      id: 'blue_whale', name: 'Blue Whale', depth: '0–500m diving',
      color: '#38bdf8',
      fact: 'Heart slows to 2 BPM during deep dives. Produces 188-decibel calls audible across entire ocean basins.',
    },
    {
      id: 'vampire_squid', name: 'Vampire Squid (Vampyroteuthis)', depth: '600–2500m',
      color: '#7c3aed',
      fact: 'Not a true squid or octopus — its own ancient order. Inverts its cape of spines to form a defensive "pineapple" posture.',
    },
    {
      id: 'siphonophore', name: 'Deepwater Siphonophore', depth: '400–1000m',
      color: '#00ff88',
      fact: 'A colonial organism up to 40m long — the longest animal on Earth. Each "individual" is a specialized zooid clone.',
    },
    {
      id: 'deep_shark', name: 'Bluntnose Sixgill Shark', depth: '90–2500m',
      color: '#64748b',
      fact: 'A living fossil unchanged for 200 million years. Six gill slits — most sharks have five. Detects the Earth\'s electric field.',
    },
  ],

  // ZONE D: Abyss / Abyssopelagic (4000–6000m)
  abyssopelagic: [
    {
      id: 'anglerfish', name: 'Deep-Sea Anglerfish', depth: '200–2000m',
      color: '#f59e0b',
      fact: 'The esca lure hosts symbiotic bioluminescent bacteria. Males fuse permanently to the female — sharing bloodstream and organs.',
    },
    {
      id: 'dumbo_octopus', name: 'Dumbo Octopus (Grimpoteuthis)', depth: '1000–7000m',
      color: '#fb923c',
      fact: 'Flaps ear-like fins to hover and steer at 3,900m depth. The deepest-living of all known octopus species.',
    },
    {
      id: 'giant_isopod', name: 'Giant Isopod (Bathynomus)', depth: '170–2140m',
      color: '#94a3b8',
      fact: 'Can survive 5+ years without food. Rolls into a perfect sphere when threatened. Grows to 76cm — deep-sea gigantism.',
    },
  ],

  // ZONE E: Hadal Trench (6000–11000m)
  hadal: [
    {
      id: 'snailfish', name: 'Mariana Snailfish', depth: '6000–8336m',
      color: '#c4b5fd',
      fact: 'The deepest-living fish ever recorded — found at 8,336m. Body translucent under pressure. Skull is unfused to absorb crushing force.',
    },
    {
      id: 'leviathan', name: 'Ancient Leviathan Shadow', depth: '10,994m',
      color: '#312e81',
      fact: 'The deepest shadow ever recorded by ABYSS sonar systems. Identity unknown. Estimated length: 240 meters.',
    },
  ],
};

// ─── Boid Flocking for sardine/fish schools ────────────────────────────────
function createFishSchool(count, width, height, zone) {
  return Array.from({ length: count }, (_, i) => ({
    x: Math.random() * width,
    y: zone === 'surface'
      ? Math.random() * height * 0.5
      : Math.random() * height,
    vx: (Math.random() - 0.5) * 1.2,
    vy: (Math.random() - 0.5) * 0.4,
    size: Math.random() * 4 + 3,
    phase: Math.random() * Math.PI * 2,
  }));
}

// ─── Main OceanCanvas Component ───────────────────────────────────────────────
export default function OceanCanvas({ depthRatio = 0, bioColor = '#8ce8ff', onCreatureClick }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 500 });
  const depthRatioRef = useRef(depthRatio);
  const bioColorRef = useRef(bioColor);
  const onCreatureClickRef = useRef(onCreatureClick);

  // Creature positions for hit-testing
  const activeCreaturePositionsRef = useRef([]);

  useEffect(() => { depthRatioRef.current = depthRatio; }, [depthRatio]);
  useEffect(() => { bioColorRef.current = bioColor; }, [bioColor]);
  useEffect(() => { onCreatureClickRef.current = onCreatureClick; }, [onCreatureClick]);

  const handleCanvasClick = useCallback((e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const creatures = activeCreaturePositionsRef.current;
    let nearest = null;
    let nearestDist = Infinity;

    creatures.forEach(c => {
      const dist = Math.hypot(c.x - clickX, c.y - clickY);
      if (dist < c.radius + 20 && dist < nearestDist) {
        nearestDist = dist;
        nearest = c;
      }
    });

    if (nearest && onCreatureClickRef.current) {
      onCreatureClickRef.current(nearest.creature, { x: e.clientX, y: e.clientY });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ── Marine Snow ──────────────────────────────────────────────────────────
    const snowParticles = Array.from({ length: 120 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.3,
      speedY: Math.random() * 0.35 + 0.08,
      driftX: Math.random() * 0.3 - 0.15,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    // ── Micro Bubbles ────────────────────────────────────────────────────────
    const bubbles = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height + height,
      radius: Math.random() * 2.5 + 1,
      speedY: Math.random() * 0.7 + 0.3,
      wobble: Math.random() * Math.PI * 2,
    }));

    // ── Fish Boid Schools ────────────────────────────────────────────────────
    const sardineSchool = createFishSchool(80, width, height, 'surface');
    const hatchetSchool = createFishSchool(40, width, height, 'deep');

    // ── Persistent creature state (x, y, direction, phase) ──────────────────
    const state = {
      // Epipelagic
      dolphin1X: -300, dolphin1Y: 0,
      dolphin2X: -430,
      turtleX: -200,
      molaX: width + 250,

      // Mesopelagic
      mantaX: -450,
      atolla1X: width * 0.3, atolla1Y: height * 0.45,
      atolla2X: width * 0.65, atolla2Y: height * 0.6,
      combJellyX: width * 0.5, combJellyY: height * 0.52,

      // Bathypelagic
      sharkX: width + 400,
      whaleX: -700,
      vampireSquidX: -200,
      siphonophoreX: width + 600,

      // Abyssopelagic
      anglerX: -200,
      dumboX: width + 300,
      isopodX: -150,

      // Hadal
      snailfishX: width * 0.4,
      leviathanX: -900,

      time: 0,
    };

    // ─── Drawing helpers ───────────────────────────────────────────────────
    function drawCreature(x, y, radius, creatureDef) {
      activeCreaturePositionsRef.current.push({ x, y, radius, creature: creatureDef });
    }

    function drawGlowCircle(x, y, r, color, alpha = 0.4, blur = 20) {
      ctx.save();
      ctx.shadowColor = color;
      ctx.shadowBlur = blur;
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // ─── Lightweight wave-motion fish school update (O(N) vs O(N^2)) ──────
    function updateBoids(boids, maxSpeed, targetY, targetYStrength) {
      for (let i = 0; i < boids.length; i++) {
        const b = boids[i];
        b.vx += 0.03 + Math.sin(state.time + i * 0.4) * 0.01;
        b.vy += (targetY - b.y) * targetYStrength + Math.cos(state.time * 1.2 + i * 0.3) * 0.04;

        const speed = Math.hypot(b.vx, b.vy);
        if (speed > maxSpeed) {
          b.vx = (b.vx / speed) * maxSpeed;
          b.vy = (b.vy / speed) * maxSpeed;
        }

        b.x += b.vx;
        b.y += b.vy;

        if (b.x > width + 80) b.x = -60;
        if (b.x < -80) b.x = width + 60;
        if (b.y < 20) b.y = 20;
        if (b.y > height - 20) b.y = height - 20;
      }
    }

    const render = () => {
      const { time } = state;
      state.time += 0.012;
      const t = state.time;

      ctx.clearRect(0, 0, width, height);
      activeCreaturePositionsRef.current = [];

      const dRatio = depthRatioRef.current;
      const curBio = bioColorRef.current;

      // ── 1. CONTINUOUS OCEAN GRADIENT (Smooth 5-Zone Interpolation) ─────────
      const stops = [
        { r: 0.00, top: [10, 88, 128], mid: [5, 56, 88], bot: [2, 36, 64] },   // Surface: Turquoise blue
        { r: 0.18, top: [4, 28, 56],  mid: [3, 20, 40], bot: [2, 13, 28] },   // Twilight: Deep blue
        { r: 0.45, top: [2, 10, 22],  mid: [1, 6, 16],  bot: [1, 4, 10] },    // Midnight: Navy
        { r: 0.72, top: [1, 4, 9],    mid: [1, 3, 6],   bot: [0, 1, 3] },     // Abyss: Blue-black
        { r: 1.00, top: [0, 1, 3],    mid: [0, 0, 1],   bot: [0, 0, 0] },     // Hadal: Almost black
      ];

      let s1 = stops[0], s2 = stops[stops.length - 1], localFactor = 0;
      for (let i = 0; i < stops.length - 1; i++) {
        if (dRatio >= stops[i].r && dRatio <= stops[i + 1].r) {
          s1 = stops[i];
          s2 = stops[i + 1];
          localFactor = (dRatio - s1.r) / (s2.r - s1.r);
          break;
        }
      }

      const lerpVal = (a, b, f) => Math.round(a + (b - a) * f);
      const lerpC = (c1, c2, f) => `rgb(${lerpVal(c1[0], c2[0], f)}, ${lerpVal(c1[1], c2[1], f)}, ${lerpVal(c1[2], c2[2], f)})`;

      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, lerpC(s1.top, s2.top, localFactor));
      grad.addColorStop(0.5, lerpC(s1.mid, s2.mid, localFactor));
      grad.addColorStop(1, lerpC(s1.bot, s2.bot, localFactor));
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // ── 2. VOLUMETRIC SUNLIGHT (Surface only) ────────────────────────────
      if (dRatio < 0.3) {
        const rayAlpha = (1 - dRatio / 0.3) * 0.12;
        ctx.save();
        ctx.globalCompositeOperation = 'screen';

        // Caustic light grid on ocean floor ripple
        if (dRatio < 0.1) {
          ctx.globalAlpha = (1 - dRatio / 0.1) * 0.04;
          for (let cx = 0; cx < width; cx += 120) {
            for (let cy = 0; cy < height; cy += 120) {
              const ripple = Math.sin(t * 2 + cx * 0.05) * Math.cos(t * 1.5 + cy * 0.04);
              if (ripple > 0.3) {
                ctx.beginPath();
                ctx.arc(cx + ripple * 10, cy + ripple * 8, 25 * ripple, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(200, 240, 255, 0.6)';
                ctx.fill();
              }
            }
          }
        }

        ctx.globalAlpha = 1;

        // God rays
        for (let r = 0; r < 5; r++) {
          const startX = width * (0.1 + r * 0.22) + Math.sin(t * 0.8 + r) * 35;
          const rayGrad = ctx.createLinearGradient(startX, 0, startX + 150, height);
          rayGrad.addColorStop(0, `rgba(255, 240, 210, ${rayAlpha * 1.8})`);
          rayGrad.addColorStop(0.3, `rgba(160, 220, 255, ${rayAlpha * 1.2})`);
          rayGrad.addColorStop(0.7, `rgba(80, 180, 255, ${rayAlpha * 0.5})`);
          rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = rayGrad;
          ctx.beginPath();
          ctx.moveTo(startX - 25, 0);
          ctx.lineTo(startX + 100, 0);
          ctx.lineTo(startX + 320, height);
          ctx.lineTo(startX - 90, height);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }

      // ── 3. ZONE-BASED CREATURE RENDERING ─────────────────────────────────
      ctx.save();

      // ════════════════════════════════════════════════════════════════════════
      // ZONE A — EPIPELAGIC (0–200m | dRatio < 0.18)
      // ════════════════════════════════════════════════════════════════════════
      if (dRatio < 0.22) {
        const fadeIn = Math.min(1, (0.22 - dRatio) / 0.1);

        // Sardine school boids
        updateBoids(sardineSchool, 1.4, height * 0.35, 0.002);
        ctx.globalAlpha = 0.28 * fadeIn;
        sardineSchool.forEach(f => {
          const angle = Math.atan2(f.vy, f.vx);
          ctx.save();
          ctx.translate(f.x, f.y);
          ctx.rotate(angle);
          ctx.fillStyle = 'rgba(180, 235, 255, 0.9)';
          ctx.beginPath();
          ctx.ellipse(0, 0, f.size, f.size * 0.3, 0, 0, Math.PI * 2);
          ctx.fill();
          // Tail flick
          ctx.beginPath();
          ctx.moveTo(-f.size, 0);
          ctx.lineTo(-f.size - 4, -f.size * 0.4);
          ctx.lineTo(-f.size - 4, f.size * 0.4);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        });
        ctx.globalAlpha = 1;

        // Spinner Dolphins (2)
        state.dolphin1X += 0.9;
        if (state.dolphin1X > width + 350) state.dolphin1X = -380;
        const dY1 = height * 0.18 + Math.sin(t * 1.3) * 20;
        const dY2 = height * 0.26 + Math.sin(t * 1.3 + 0.6) * 20;

        ctx.globalAlpha = 0.65 * fadeIn;
        ctx.shadowColor = '#7dd3fc';
        ctx.shadowBlur = 6;

        // Dolphin 1 body
        ctx.fillStyle = '#0c263e';
        ctx.beginPath();
        ctx.ellipse(state.dolphin1X, dY1, 52, 14, 0.1, 0, Math.PI * 2);
        ctx.fill();
        // Rostrum (beak)
        ctx.beginPath();
        ctx.moveTo(state.dolphin1X + 52, dY1);
        ctx.lineTo(state.dolphin1X + 74, dY1 - 3);
        ctx.lineTo(state.dolphin1X + 74, dY1 + 3);
        ctx.closePath();
        ctx.fill();
        // Dorsal fin
        ctx.beginPath();
        ctx.moveTo(state.dolphin1X + 5, dY1 - 12);
        ctx.lineTo(state.dolphin1X - 10, dY1 - 30);
        ctx.lineTo(state.dolphin1X - 20, dY1 - 10);
        ctx.closePath();
        ctx.fill();
        // Tail flukes
        ctx.beginPath();
        ctx.moveTo(state.dolphin1X - 48, dY1);
        ctx.lineTo(state.dolphin1X - 70, dY1 - 12 + Math.sin(t * 3) * 5);
        ctx.lineTo(state.dolphin1X - 62, dY1);
        ctx.lineTo(state.dolphin1X - 70, dY1 + 12 - Math.sin(t * 3) * 5);
        ctx.closePath();
        ctx.fill();
        drawCreature(state.dolphin1X, dY1, 52, CREATURE_CATALOG.epipelagic[0]);

        // Dolphin 2 body (slightly behind)
        ctx.beginPath();
        ctx.ellipse(state.dolphin1X - 100, dY2, 44, 12, 0.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(state.dolphin1X - 100 + 44, dY2);
        ctx.lineTo(state.dolphin1X - 100 + 62, dY2 - 2);
        ctx.lineTo(state.dolphin1X - 100 + 62, dY2 + 2);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Sea Turtle
        state.turtleX += 0.42;
        if (state.turtleX > width + 220) state.turtleX = -260;
        const tY = height * 0.5 + Math.sin(t * 0.45) * 18;

        ctx.globalAlpha = 0.55 * fadeIn;
        ctx.fillStyle = '#082010';
        ctx.shadowColor = '#86efac';
        ctx.shadowBlur = 8;
        // Shell
        ctx.beginPath();
        ctx.ellipse(state.turtleX, tY, 38, 26, 0.05, 0, Math.PI * 2);
        ctx.fill();
        // Front flippers
        ctx.beginPath();
        ctx.ellipse(state.turtleX + 22, tY - 12 + Math.sin(t * 1.8) * 8, 28, 9, -0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(state.turtleX + 22, tY + 12 - Math.sin(t * 1.8) * 8, 28, 9, 0.4, 0, Math.PI * 2);
        ctx.fill();
        // Head
        ctx.beginPath();
        ctx.ellipse(state.turtleX + 44, tY, 12, 9, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        drawCreature(state.turtleX, tY, 38, CREATURE_CATALOG.epipelagic[1]);
        ctx.globalAlpha = 1;

        // Ocean Sunfish (Mola mola) - weird boxy silhouette
        state.molaX -= 0.32;
        if (state.molaX < -200) state.molaX = width + 280;
        const molaY = height * 0.38 + Math.sin(t * 0.3) * 12;

        ctx.globalAlpha = 0.5 * fadeIn;
        ctx.fillStyle = '#0a1a28';
        ctx.shadowColor = '#fde68a';
        ctx.shadowBlur = 6;
        // Boxy body
        ctx.beginPath();
        ctx.ellipse(state.molaX, molaY, 45, 50, 0, 0, Math.PI * 2);
        ctx.fill();
        // Top fin (tall)
        ctx.beginPath();
        ctx.moveTo(state.molaX - 5, molaY - 48);
        ctx.lineTo(state.molaX + 5, molaY - 48);
        ctx.lineTo(state.molaX + 3, molaY - 20);
        ctx.lineTo(state.molaX - 3, molaY - 20);
        ctx.closePath();
        ctx.fill();
        // Bottom fin
        ctx.beginPath();
        ctx.moveTo(state.molaX - 5, molaY + 48);
        ctx.lineTo(state.molaX + 5, molaY + 48);
        ctx.lineTo(state.molaX + 3, molaY + 20);
        ctx.lineTo(state.molaX - 3, molaY + 20);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        drawCreature(state.molaX, molaY, 50, CREATURE_CATALOG.epipelagic[2]);
        ctx.globalAlpha = 1;
      }

      // ════════════════════════════════════════════════════════════════════════
      // ZONE B — MESOPELAGIC (200–1000m | 0.14–0.48)
      // ════════════════════════════════════════════════════════════════════════
      if (dRatio >= 0.12 && dRatio < 0.52) {
        const fadeIn = Math.min(1, Math.min((dRatio - 0.12) / 0.08, (0.52 - dRatio) / 0.06));

        // Hatchetfish school (smaller, deeper)
        updateBoids(hatchetSchool, 1.0, height * 0.55, 0.003);
        ctx.globalAlpha = 0.22 * fadeIn;
        hatchetSchool.forEach(f => {
          const angle = Math.atan2(f.vy, f.vx);
          ctx.save();
          ctx.translate(f.x, f.y);
          ctx.rotate(angle);
          // Hatchet body shape (compressed, wedge)
          ctx.fillStyle = 'rgba(140, 180, 255, 0.9)';
          ctx.shadowColor = '#a78bfa';
          ctx.shadowBlur = 4;
          ctx.beginPath();
          ctx.moveTo(f.size, 0);
          ctx.lineTo(-f.size * 0.3, -f.size * 0.7);
          ctx.lineTo(-f.size, 0);
          ctx.lineTo(-f.size * 0.3, f.size * 0.3);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        });
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Giant Oceanic Manta Ray
        state.mantaX += 0.52;
        if (state.mantaX > width + 450) state.mantaX = -500;
        const mantaY = height * 0.42 + Math.cos(t * 0.28) * 28;
        const wingFlap = Math.sin(t * 1.1) * 18;

        ctx.globalAlpha = 0.72 * fadeIn;
        ctx.fillStyle = 'rgba(5, 14, 32, 0.82)';
        ctx.shadowColor = '#818cf8';
        ctx.shadowBlur = 14;
        // Wing body
        ctx.beginPath();
        ctx.moveTo(state.mantaX + 90, mantaY);
        ctx.quadraticCurveTo(state.mantaX, mantaY - 70 + wingFlap, state.mantaX - 120, mantaY);
        ctx.quadraticCurveTo(state.mantaX, mantaY + 68 - wingFlap, state.mantaX + 90, mantaY);
        ctx.fill();
        // Central body disc
        ctx.beginPath();
        ctx.ellipse(state.mantaX, mantaY, 28, 16, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(3, 10, 24, 0.9)';
        ctx.fill();
        // Tail
        ctx.strokeStyle = 'rgba(5, 14, 32, 0.8)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(state.mantaX - 120, mantaY);
        ctx.quadraticCurveTo(state.mantaX - 180, mantaY + Math.sin(t) * 10, state.mantaX - 250, mantaY + 5);
        ctx.stroke();
        // Cephalic fins (horns)
        ctx.fillStyle = 'rgba(5, 14, 32, 0.8)';
        ctx.beginPath();
        ctx.moveTo(state.mantaX + 85, mantaY - 5);
        ctx.lineTo(state.mantaX + 100, mantaY - 18);
        ctx.lineTo(state.mantaX + 75, mantaY + 5);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        drawCreature(state.mantaX, mantaY, 90, CREATURE_CATALOG.mesopelagic[2]);
        ctx.globalAlpha = 1;

        // Atolla Jellyfish 1 — pulsing alarm ring
        const atollaPulse = 0.8 + Math.sin(t * 4) * 0.2;
        const atolla1Y = height * 0.45 + Math.sin(t * 0.6) * 22;

        ctx.globalAlpha = 0.55 * fadeIn;
        ctx.shadowColor = '#00f3ff';
        ctx.shadowBlur = 20 + Math.sin(t * 8) * 10; // strobe!
        ctx.fillStyle = 'rgba(0, 243, 255, 0.45)';
        ctx.beginPath();
        ctx.ellipse(state.atolla1X, atolla1Y, 32 * atollaPulse, 24 * atollaPulse, 0, Math.PI, 0);
        ctx.fill();
        // Bell interior
        ctx.fillStyle = 'rgba(0, 243, 255, 0.15)';
        ctx.beginPath();
        ctx.ellipse(state.atolla1X, atolla1Y, 22 * atollaPulse, 16 * atollaPulse, 0, Math.PI, 0);
        ctx.fill();
        // Tentacles
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.35)';
        ctx.lineWidth = 1;
        for (let t2 = 0; t2 < 8; t2++) {
          const tx = state.atolla1X + (t2 / 7 - 0.5) * 55;
          ctx.beginPath();
          ctx.moveTo(tx, atolla1Y);
          ctx.quadraticCurveTo(tx + Math.sin(t * 3 + t2) * 6, atolla1Y + 20, tx + Math.sin(t * 2 + t2) * 8, atolla1Y + 38);
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
        drawCreature(state.atolla1X, atolla1Y, 32, CREATURE_CATALOG.mesopelagic[0]);
        ctx.globalAlpha = 1;

        // Comb Jelly — iridescent rainbow rows
        const combY = height * 0.52 + Math.sin(t * 0.5 + 1.2) * 18;
        ctx.globalAlpha = 0.45 * fadeIn;
        // Body
        const combGrad = ctx.createLinearGradient(state.combJellyX - 14, combY - 28, state.combJellyX + 14, combY + 28);
        combGrad.addColorStop(0, 'rgba(255, 0, 127, 0.5)');
        combGrad.addColorStop(0.25, 'rgba(255, 150, 0, 0.4)');
        combGrad.addColorStop(0.5, 'rgba(0, 255, 100, 0.4)');
        combGrad.addColorStop(0.75, 'rgba(0, 150, 255, 0.4)');
        combGrad.addColorStop(1, 'rgba(180, 0, 255, 0.5)');
        ctx.shadowColor = '#ff007f';
        ctx.shadowBlur = 12;
        ctx.fillStyle = combGrad;
        ctx.beginPath();
        ctx.ellipse(state.combJellyX, combY, 14, 28, 0, 0, Math.PI * 2);
        ctx.fill();
        // 8 comb rows
        ctx.lineWidth = 1.5;
        for (let row = 0; row < 8; row++) {
          const rowY = combY - 24 + row * 7;
          const hue = (row * 45 + t * 30) % 360;
          ctx.strokeStyle = `hsla(${hue}, 100%, 70%, ${0.6 + Math.sin(t * 6 + row) * 0.3})`;
          ctx.shadowColor = `hsla(${hue}, 100%, 70%, 1)`;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.moveTo(state.combJellyX - 12, rowY);
          ctx.lineTo(state.combJellyX + 12, rowY);
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
        drawCreature(state.combJellyX, combY, 28, CREATURE_CATALOG.mesopelagic[1]);
        ctx.globalAlpha = 1;
      }

      // ════════════════════════════════════════════════════════════════════════
      // ZONE C — BATHYPELAGIC (1000–4000m | 0.42–0.74)
      // ════════════════════════════════════════════════════════════════════════
      if (dRatio >= 0.40 && dRatio < 0.78) {
        const fadeIn = Math.min(1, Math.min((dRatio - 0.40) / 0.08, (0.78 - dRatio) / 0.07));

        // Blue Whale — massive, slow, majestic
        state.whaleX += 0.35;
        if (state.whaleX > width + 850) state.whaleX = -950;
        const whaleY = height * 0.46 + Math.sin(t * 0.18) * 16;

        ctx.globalAlpha = 0.85 * fadeIn;
        ctx.fillStyle = 'rgba(2, 7, 18, 0.92)';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 22;
        // Main body
        ctx.beginPath();
        ctx.moveTo(state.whaleX - 380, whaleY + 10);
        ctx.bezierCurveTo(state.whaleX - 250, whaleY - 75, state.whaleX + 100, whaleY - 78, state.whaleX + 340, whaleY - 18);
        ctx.bezierCurveTo(state.whaleX + 400, whaleY + 5, state.whaleX + 340, whaleY + 50, state.whaleX + 200, whaleY + 55);
        ctx.bezierCurveTo(state.whaleX, whaleY + 68, state.whaleX - 250, whaleY + 55, state.whaleX - 380, whaleY + 10);
        ctx.fill();
        // Tail flukes (animated)
        const tailFluke = Math.sin(t * 0.8) * 14;
        ctx.beginPath();
        ctx.moveTo(state.whaleX - 340, whaleY + 10);
        ctx.lineTo(state.whaleX - 420, whaleY - 20 + tailFluke);
        ctx.lineTo(state.whaleX - 390, whaleY + 10);
        ctx.lineTo(state.whaleX - 420, whaleY + 40 - tailFluke);
        ctx.closePath();
        ctx.fill();
        // Dorsal fin
        ctx.beginPath();
        ctx.moveTo(state.whaleX + 30, whaleY - 70);
        ctx.lineTo(state.whaleX + 10, whaleY - 95);
        ctx.lineTo(state.whaleX - 20, whaleY - 68);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        drawCreature(state.whaleX, whaleY, 380, CREATURE_CATALOG.bathypelagic[0]);
        ctx.globalAlpha = 1;

        // Bluntnose Sixgill Shark
        state.sharkX -= 0.65;
        if (state.sharkX < -400) state.sharkX = width + 450;
        const sharkY = height * 0.32 + Math.sin(t * 0.38) * 14;

        ctx.globalAlpha = 0.75 * fadeIn;
        ctx.fillStyle = 'rgba(3, 10, 24, 0.88)';
        ctx.shadowColor = '#64748b';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.ellipse(state.sharkX, sharkY, 72, 20, -0.04, 0, Math.PI * 2);
        ctx.fill();
        // Caudal fin
        ctx.beginPath();
        ctx.moveTo(state.sharkX + 68, sharkY);
        ctx.lineTo(state.sharkX + 100, sharkY - 18 + Math.sin(t * 2.5) * 4);
        ctx.lineTo(state.sharkX + 88, sharkY);
        ctx.lineTo(state.sharkX + 100, sharkY + 14 - Math.sin(t * 2.5) * 4);
        ctx.closePath();
        ctx.fill();
        // Dorsal
        ctx.beginPath();
        ctx.moveTo(state.sharkX + 15, sharkY - 18);
        ctx.lineTo(state.sharkX - 8, sharkY - 44);
        ctx.lineTo(state.sharkX - 20, sharkY - 16);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        drawCreature(state.sharkX, sharkY, 72, CREATURE_CATALOG.bathypelagic[3]);
        ctx.globalAlpha = 1;

        // Vampire Squid — dark, webbed, dramatic
        state.vampireSquidX += 0.46;
        if (state.vampireSquidX > width + 280) state.vampireSquidX = -320;
        const vampY = height * 0.62 + Math.sin(t * 0.52) * 20;

        ctx.globalAlpha = 0.68 * fadeIn;
        ctx.fillStyle = 'rgba(60, 10, 80, 0.88)';
        ctx.shadowColor = '#7c3aed';
        ctx.shadowBlur = 20;
        // Mantle
        ctx.beginPath();
        ctx.ellipse(state.vampireSquidX, vampY, 38, 28, 0, 0, Math.PI * 2);
        ctx.fill();
        // Cape/webbing (8 arms with web)
        ctx.fillStyle = 'rgba(90, 15, 110, 0.7)';
        for (let arm = 0; arm < 8; arm++) {
          const armAngle = (arm / 8) * Math.PI * 2;
          const nextAngle = ((arm + 1) / 8) * Math.PI * 2;
          const waveFactor = 1 + Math.sin(t * 2 + arm) * 0.12;
          ctx.beginPath();
          ctx.moveTo(state.vampireSquidX, vampY);
          ctx.lineTo(
            state.vampireSquidX + Math.cos(armAngle) * 55 * waveFactor,
            vampY + Math.sin(armAngle) * 55 * waveFactor
          );
          ctx.lineTo(
            state.vampireSquidX + Math.cos(nextAngle) * 55 * waveFactor,
            vampY + Math.sin(nextAngle) * 55 * waveFactor
          );
          ctx.closePath();
          ctx.fill();
        }
        ctx.shadowBlur = 0;
        drawCreature(state.vampireSquidX, vampY, 55, CREATURE_CATALOG.bathypelagic[1]);
        ctx.globalAlpha = 1;

        // Siphonophore — long chain, emerald glow
        state.siphonophoreX -= 0.38;
        if (state.siphonophoreX < -650) state.siphonophoreX = width + 700;
        const siphY = height * 0.72 + Math.sin(t * 0.2) * 18;

        ctx.globalAlpha = 0.5 * fadeIn;
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.6)';
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 16;
        ctx.lineWidth = 2;
        // Sinuous chain body
        ctx.beginPath();
        for (let seg = 0; seg < 45; seg++) {
          const segX = state.siphonophoreX + seg * 14;
          const segY = siphY + Math.sin(t * 2 + seg * 0.6) * 12;
          if (seg === 0) ctx.moveTo(segX, segY);
          else ctx.lineTo(segX, segY);
        }
        ctx.stroke();
        // Zooid nodes along chain
        for (let seg = 0; seg < 45; seg += 3) {
          const segX = state.siphonophoreX + seg * 14;
          const segY = siphY + Math.sin(t * 2 + seg * 0.6) * 12;
          ctx.fillStyle = `rgba(0, 255, 136, ${0.3 + Math.sin(t * 4 + seg) * 0.2})`;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(segX, segY, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
        drawCreature(state.siphonophoreX + 300, siphY, 40, CREATURE_CATALOG.bathypelagic[2]);
        ctx.globalAlpha = 1;
      }

      // ════════════════════════════════════════════════════════════════════════
      // ZONE D — ABYSSOPELAGIC (4000–6000m | 0.70–0.92)
      // ════════════════════════════════════════════════════════════════════════
      if (dRatio >= 0.68 && dRatio < 0.95) {
        const fadeIn = Math.min(1, Math.min((dRatio - 0.68) / 0.07, (0.95 - dRatio) / 0.05));

        // Anglerfish — iconic with glowing esca
        state.anglerX += 0.48;
        if (state.anglerX > width + 220) state.anglerX = -270;
        const anglerY = height * 0.4 + Math.sin(t * 0.55) * 14;

        ctx.globalAlpha = 0.88 * fadeIn;
        ctx.fillStyle = 'rgba(2, 5, 14, 0.96)';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 5;
        // Body
        ctx.beginPath();
        ctx.ellipse(state.anglerX, anglerY, 34, 26, 0.1, 0, Math.PI * 2);
        ctx.fill();
        // Big mouth with jagged teeth
        ctx.fillStyle = 'rgba(1, 3, 10, 0.98)';
        ctx.beginPath();
        ctx.moveTo(state.anglerX + 30, anglerY - 5);
        ctx.lineTo(state.anglerX + 56, anglerY + 8);
        ctx.lineTo(state.anglerX + 50, anglerY + 14);
        ctx.lineTo(state.anglerX + 42, anglerY + 6);
        ctx.lineTo(state.anglerX + 36, anglerY + 12);
        ctx.lineTo(state.anglerX + 28, anglerY + 4);
        ctx.closePath();
        ctx.fill();
        // Esca filament + lure
        const lureX = state.anglerX + 30;
        const lureY = anglerY - 38 + Math.sin(t * 2.2) * 6;
        ctx.strokeStyle = 'rgba(200, 230, 255, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.moveTo(state.anglerX + 6, anglerY - 24);
        ctx.bezierCurveTo(state.anglerX + 22, anglerY - 42, lureX - 5, lureY + 10, lureX, lureY);
        ctx.stroke();
        // Glowing lure orb
        ctx.fillStyle = '#f59e0b';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 25 + Math.sin(t * 5) * 10;
        ctx.globalAlpha = (0.8 + Math.sin(t * 5) * 0.2) * fadeIn;
        ctx.beginPath();
        ctx.arc(lureX, lureY, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        drawCreature(state.anglerX, anglerY, 34, CREATURE_CATALOG.abyssopelagic[0]);
        ctx.globalAlpha = 1;

        // Dumbo Octopus — ear fins, translucent
        state.dumboX -= 0.38;
        if (state.dumboX < -220) state.dumboX = width + 270;
        const dumboY = height * 0.6 + Math.sin(t * 0.42) * 18;

        ctx.globalAlpha = 0.6 * fadeIn;
        ctx.fillStyle = 'rgba(180, 60, 20, 0.4)';
        ctx.shadowColor = '#fb923c';
        ctx.shadowBlur = 15;
        // Body
        ctx.beginPath();
        ctx.ellipse(state.dumboX, dumboY, 30, 24, 0, 0, Math.PI * 2);
        ctx.fill();
        // Ear fins (flapping)
        const earFlap = Math.sin(t * 2.5) * 10;
        ctx.fillStyle = 'rgba(200, 80, 30, 0.3)';
        ctx.beginPath();
        ctx.ellipse(state.dumboX - 28, dumboY - 8 + earFlap, 20, 12, -0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(state.dumboX + 28, dumboY - 8 - earFlap, 20, 12, 0.4, 0, Math.PI * 2);
        ctx.fill();
        // Arms (8 short tentacles below)
        ctx.strokeStyle = 'rgba(200, 80, 30, 0.35)';
        ctx.lineWidth = 2;
        for (let arm = 0; arm < 8; arm++) {
          const armAngle = ((arm / 8) * Math.PI) + 0.1;
          ctx.beginPath();
          ctx.moveTo(state.dumboX + Math.cos(armAngle + Math.PI) * 24, dumboY + Math.sin(armAngle + Math.PI) * 18);
          ctx.quadraticCurveTo(
            state.dumboX + Math.cos(armAngle + Math.PI) * 36,
            dumboY + 28 + Math.sin(t * 3 + arm) * 5,
            state.dumboX + (arm / 7 - 0.5) * 50,
            dumboY + 44 + Math.sin(t * 2 + arm) * 6
          );
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
        drawCreature(state.dumboX, dumboY, 30, CREATURE_CATALOG.abyssopelagic[1]);
        ctx.globalAlpha = 1;

        // Giant Isopod — armored, segmented
        state.isopodX += 0.25;
        if (state.isopodX > width + 160) state.isopodX = -200;
        const isopodY = height * 0.78 + Math.sin(t * 0.25) * 8;

        ctx.globalAlpha = 0.55 * fadeIn;
        ctx.fillStyle = 'rgba(40, 50, 65, 0.9)';
        ctx.shadowColor = '#94a3b8';
        ctx.shadowBlur = 8;
        // Segmented body (7 segments)
        for (let seg = 0; seg < 7; seg++) {
          const segX = state.isopodX - 28 + seg * 9;
          ctx.beginPath();
          ctx.ellipse(segX, isopodY, 5.5, 14, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        // Antennae
        ctx.strokeStyle = 'rgba(100, 120, 140, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(state.isopodX + 30, isopodY - 10);
        ctx.lineTo(state.isopodX + 52, isopodY - 22);
        ctx.moveTo(state.isopodX + 30, isopodY + 10);
        ctx.lineTo(state.isopodX + 52, isopodY + 22);
        ctx.stroke();
        ctx.shadowBlur = 0;
        drawCreature(state.isopodX, isopodY, 32, CREATURE_CATALOG.abyssopelagic[2]);
        ctx.globalAlpha = 1;
      }

      // ════════════════════════════════════════════════════════════════════════
      // ZONE E — HADAL (6000–11000m | > 0.90)
      // ════════════════════════════════════════════════════════════════════════
      if (dRatio >= 0.88) {
        const fadeIn = Math.min(1, (dRatio - 0.88) / 0.07);

        // Snailfish — translucent, tadpole-shaped
        state.snailfishX += 0.22 + Math.sin(t * 0.7) * 0.08;
        if (state.snailfishX > width + 120) state.snailfishX = -150;
        const snailY = height * 0.38 + Math.sin(t * 0.8) * 16;

        ctx.globalAlpha = 0.5 * fadeIn;
        ctx.fillStyle = 'rgba(140, 100, 200, 0.35)';
        ctx.shadowColor = '#c4b5fd';
        ctx.shadowBlur = 20;
        // Body
        ctx.beginPath();
        ctx.ellipse(state.snailfishX, snailY, 38, 14, 0.15, 0, Math.PI * 2);
        ctx.fill();
        // Long tapering tail
        ctx.fillStyle = 'rgba(140, 100, 200, 0.2)';
        ctx.beginPath();
        ctx.moveTo(state.snailfishX - 35, snailY);
        ctx.bezierCurveTo(state.snailfishX - 80, snailY + Math.sin(t * 3) * 6, state.snailfishX - 110, snailY, state.snailfishX - 130, snailY + 3);
        ctx.bezierCurveTo(state.snailfishX - 110, snailY + 6, state.snailfishX - 80, snailY + Math.sin(t * 3) * 3 + 5, state.snailfishX - 35, snailY + 4);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        drawCreature(state.snailfishX, snailY, 38, CREATURE_CATALOG.hadal[0]);
        ctx.globalAlpha = 1;

        // Amphipod cloud — many tiny particles drifting
        ctx.globalAlpha = 0.35 * fadeIn;
        for (let a = 0; a < 30; a++) {
          const ax = ((state.snailfishX * 0.3 + a * 97.3) % width + width) % width;
          const ay = height * 0.5 + Math.sin(t * 1.5 + a * 0.8) * 30 + Math.cos(t * 0.8 + a) * 20;
          ctx.fillStyle = `rgba(196, 181, 253, ${0.3 + Math.sin(t * 2 + a) * 0.2})`;
          ctx.shadowColor = '#c4b5fd';
          ctx.shadowBlur = 4;
          ctx.beginPath();
          ctx.ellipse(ax, ay, 3, 1.5, Math.sin(t + a) * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Ancient Leviathan Shadow
        state.leviathanX += 0.26;
        if (state.leviathanX > width + 1050) state.leviathanX = -1150;
        const levY = height * 0.5 + Math.sin(t * 0.1) * 10;

        ctx.globalAlpha = 0.92 * fadeIn;
        ctx.fillStyle = 'rgba(1, 1, 5, 0.98)';
        ctx.shadowColor = '#312e81';
        ctx.shadowBlur = 35;
        ctx.beginPath();
        ctx.ellipse(state.leviathanX, levY, 500, 100, 0, 0, Math.PI * 2);
        ctx.fill();
        // Mystery appendages
        ctx.strokeStyle = 'rgba(1, 1, 8, 0.97)';
        ctx.lineWidth = 8;
        for (let app = 0; app < 5; app++) {
          ctx.beginPath();
          ctx.moveTo(state.leviathanX - 200 + app * 100, levY + 96);
          ctx.lineTo(state.leviathanX - 180 + app * 100 + Math.sin(t * 0.5 + app) * 20, levY + 180);
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
        drawCreature(state.leviathanX, levY, 500, CREATURE_CATALOG.hadal[1]);
        ctx.globalAlpha = 1;
      }

      ctx.restore();

      // ── 4. SUBMARINE SEARCHLIGHT ─────────────────────────────────────────
      if (dRatio > 0.38) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        const spotAlpha = Math.min(0.5, (dRatio - 0.38) * 0.45);
        const spotRadius = 280 + Math.sin(t * 0.5) * 15;
        const spotGrad = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 10,
          mouseRef.current.x, mouseRef.current.y, spotRadius
        );
        spotGrad.addColorStop(0, `rgba(230, 248, 255, ${spotAlpha * 1.5})`);
        spotGrad.addColorStop(0.35, `rgba(140, 220, 255, ${spotAlpha * 0.9})`);
        spotGrad.addColorStop(0.7, `rgba(80, 160, 255, ${spotAlpha * 0.3})`);
        spotGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = spotGrad;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, spotRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ── 5. MARINE SNOW ───────────────────────────────────────────────────
      ctx.save();
      snowParticles.forEach(p => {
        p.y += p.speedY;
        p.x += p.driftX + Math.sin(t + p.y * 0.005) * 0.25;
        if (p.y > height + 10) { p.y = -10; p.x = Math.random() * width; }
        ctx.fillStyle = `rgba(200, 235, 255, ${p.opacity * (0.9 - dRatio * 0.5)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Rising micro-bubbles (surface only)
      if (dRatio < 0.45) {
        const bubbleAlpha = 1 - dRatio / 0.45;
        bubbles.forEach(b => {
          b.y -= b.speedY;
          b.x += Math.sin(t * 2 + b.wobble) * 0.35;
          if (b.y < -20) { b.y = height + 20; b.x = Math.random() * width; }
          ctx.strokeStyle = `rgba(180, 230, 255, ${0.22 * bubbleAlpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
          ctx.stroke();
        });
      }

      // ── 6. HYDROTHERMAL VENT SMOKE PLUMES (Abyss & Hadal) ────────────────
      if (dRatio > 0.65) {
        ctx.save();
        const ventAlpha = Math.min(0.6, (dRatio - 0.65) * 2);
        for (let v = 0; v < 18; v++) {
          const vx = (width * 0.88) + Math.sin(t * 1.5 + v) * (v * 2.2);
          const vy = height - (v * 16) - ((t * 45 + v * 20) % 300);
          const vSize = 10 + v * 3.2;
          ctx.fillStyle = `rgba(249, 115, 22, ${Math.max(0, ventAlpha * (0.3 - v * 0.015))})`;
          ctx.shadowColor = '#f97316';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(vx, vy, Math.max(2, vSize), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [handleCanvasClick]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 cursor-crosshair"
      title="Click on creatures to identify them"
    />
  );
}
