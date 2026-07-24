import React, { useEffect, useRef } from 'react';

export default function OceanCanvas({ depthRatio = 0, bioColor = '#8ce8ff' }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 500 });
  const depthRatioRef = useRef(depthRatio);
  const bioColorRef = useRef(bioColor);

  useEffect(() => {
    depthRatioRef.current = depthRatio;
  }, [depthRatio]);

  useEffect(() => {
    bioColorRef.current = bioColor;
  }, [bioColor]);

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

    // Marine Snow & Floating Particles
    const snowParticles = Array.from({ length: 110 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.4,
      speedY: Math.random() * 0.4 + 0.1,
      driftX: Math.random() * 0.4 - 0.2,
      opacity: Math.random() * 0.5 + 0.1
    }));

    // Rising Micro-Bubbles
    const bubbles = Array.from({ length: 25 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height + height,
      radius: Math.random() * 2.5 + 1.2,
      speedY: Math.random() * 0.8 + 0.3,
      wobble: Math.random() * Math.PI * 2
    }));

    // Surface Fish School
    const fishSchool = Array.from({ length: 22 }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.4),
      speedX: Math.random() * 1.2 + 0.7,
      size: Math.random() * 6 + 8,
      phase: Math.random() * Math.PI * 2
    }));

    // Dynamic Trajectories (Randomized Off-Screen Resets)
    let dolphinX = -300;
    let turtleX = -200;
    let stingrayX = width + 250;
    let mantaX = -350;
    let sharkX = width + 300;
    let whaleX = -700;
    let anglerX = -150;
    let squidX = width + 400;
    let leviathanX = -900;

    let time = 0;

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      const dRatio = depthRatioRef.current; // 0.0 (surface) -> 1.0 (hadal)
      const curBio = bioColorRef.current;

      // 1. DYNAMIC WATER GRADIENT (Surface Azure -> Mesopelagic Navy -> Hadal Black)
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      if (dRatio < 0.15) {
        grad.addColorStop(0, '#042238');
        grad.addColorStop(0.5, '#021524');
        grad.addColorStop(1, '#010c17');
      } else if (dRatio < 0.45) {
        grad.addColorStop(0, '#031021');
        grad.addColorStop(0.6, '#020814');
        grad.addColorStop(1, '#01040a');
      } else {
        grad.addColorStop(0, '#02060f');
        grad.addColorStop(0.6, '#010307');
        grad.addColorStop(1, '#000103');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. VOLUMETRIC SUNLIGHT GOD RAYS & CAUSTICS (Surface < 0.28)
      if (dRatio < 0.28) {
        const rayAlpha = (1 - dRatio / 0.28) * 0.14;
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        for (let r = 0; r < 3; r++) {
          const startX = width * (0.2 + r * 0.3) + Math.sin(time + r) * 40;
          const rayGrad = ctx.createLinearGradient(startX, 0, startX + 180, height);
          rayGrad.addColorStop(0, `rgba(255, 240, 210, ${rayAlpha * 1.5})`);
          rayGrad.addColorStop(0.4, `rgba(180, 230, 255, ${rayAlpha})`);
          rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = rayGrad;
          ctx.beginPath();
          ctx.moveTo(startX - 30, 0);
          ctx.lineTo(startX + 120, 0);
          ctx.lineTo(startX + 350, height);
          ctx.lineTo(startX - 100, height);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }

      // 3. DEPTH-GATED REALISTIC MARINE LIFE (PASSING BEHIND CONTENT)
      ctx.save();

      // [ZONE A] SURFACE REALM (0m - 200m): Fish School, Dolphins & Sea Turtle
      if (dRatio < 0.18) {
        // Bright semi-translucent Fish School
        fishSchool.forEach((f) => {
          f.x += f.speedX;
          if (f.x > width + 60) f.x = -80;
          const fishY = f.y + Math.sin(time * 2 + f.phase) * 10;

          ctx.fillStyle = 'rgba(180, 235, 255, 0.3)';
          ctx.beginPath();
          ctx.ellipse(f.x, fishY, f.size, f.size * 0.32, Math.sin(time * 3 + f.phase) * 0.1, 0, Math.PI * 2);
          ctx.fill();
        });

        // Dolphin Pod (2 Dolphins swimming smoothly across)
        dolphinX += 0.85;
        if (dolphinX > width + 300) dolphinX = -350;
        const dY1 = height * 0.22 + Math.sin(time * 1.2) * 22;
        const dY2 = height * 0.28 + Math.sin(time * 1.2 + 0.4) * 22;

        ctx.fillStyle = 'rgba(12, 38, 62, 0.55)';
        // Dolphin 1
        ctx.beginPath();
        ctx.ellipse(dolphinX, dY1, 48, 16, 0.15, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath(); // Dorsal fin
        ctx.moveTo(dolphinX - 5, dY1 - 14);
        ctx.lineTo(dolphinX - 22, dY1 - 28);
        ctx.lineTo(dolphinX - 18, dY1 - 10);
        ctx.fill();

        // Dolphin 2
        ctx.beginPath();
        ctx.ellipse(dolphinX - 90, dY2, 42, 14, 0.15, 0, Math.PI * 2);
        ctx.fill();

        // Sea Turtle silhouette lower in surface zone
        turtleX += 0.38;
        if (turtleX > width + 200) turtleX = -250;
        const tY = height * 0.45 + Math.sin(time * 0.4) * 18;

        ctx.fillStyle = 'rgba(8, 28, 48, 0.5)';
        ctx.beginPath();
        ctx.ellipse(turtleX, tY, 40, 28, 0.08, 0, Math.PI * 2); // Shell
        ctx.fill();
        ctx.beginPath(); // Flipper
        ctx.ellipse(turtleX + 22, tY - 18 + Math.sin(time * 1.4) * 10, 32, 10, -0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // [ZONE B] TWILIGHT ZONE (200m - 1,000m): Stingrays, Manta Rays & Bioluminescent Jellyfish
      else if (dRatio >= 0.18 && dRatio < 0.45) {
        // Manta Ray with slow wing flap
        mantaX += 0.48;
        if (mantaX > width + 400) mantaX = -450;
        const mantaY = height * 0.42 + Math.cos(time * 0.3) * 25;
        const wingFlap = Math.sin(time * 1.2) * 16;

        ctx.fillStyle = 'rgba(5, 18, 35, 0.72)';
        ctx.shadowColor = curBio;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(mantaX + 85, mantaY);
        ctx.quadraticCurveTo(mantaX, mantaY - 65 + wingFlap, mantaX - 110, mantaY);
        ctx.quadraticCurveTo(mantaX, mantaY + 65 - wingFlap, mantaX + 85, mantaY);
        ctx.fill();

        // Manta Tail
        ctx.strokeStyle = 'rgba(5, 18, 35, 0.75)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(mantaX - 110, mantaY);
        ctx.lineTo(mantaX - 230, mantaY + Math.sin(time) * 8);
        ctx.stroke();

        // Stingray gliding lower down in twilight
        stingrayX -= 0.55;
        if (stingrayX < -300) stingrayX = width + 350;
        const stingY = height * 0.65 + Math.sin(time * 0.5) * 15;

        ctx.fillStyle = 'rgba(4, 15, 30, 0.75)';
        ctx.beginPath();
        ctx.ellipse(stingrayX, stingY, 50, 22, -0.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath(); // Whip tail
        ctx.moveTo(stingrayX + 48, stingY);
        ctx.lineTo(stingrayX + 160, stingY - Math.sin(time * 0.8) * 6);
        ctx.stroke();

        // Bioluminescent Jellyfish
        const jellyY = height * 0.55 + Math.sin(time * 0.7) * 22;
        ctx.fillStyle = curBio;
        ctx.globalAlpha = 0.35;
        ctx.shadowColor = curBio;
        ctx.shadowBlur = 22;
        ctx.beginPath();
        ctx.ellipse(width * 0.78, jellyY, 34, 24, 0, Math.PI, 0);
        ctx.fill();
      }

      // [ZONE C] MIDNIGHT ZONE (1,000m - 4,000m): Deep Shark Silhouette & Blue Whale
      else if (dRatio >= 0.45 && dRatio < 0.72) {
        // Deep Shark Silhouette passing in background
        sharkX -= 0.6;
        if (sharkX < -350) sharkX = width + 400;
        const sharkY = height * 0.38 + Math.sin(time * 0.4) * 16;

        ctx.fillStyle = 'rgba(3, 12, 25, 0.85)';
        ctx.beginPath();
        ctx.ellipse(sharkX, sharkY, 70, 22, -0.05, 0, Math.PI * 2); // Body
        ctx.fill();
        ctx.beginPath(); // Shark Dorsal Fin
        ctx.moveTo(sharkX + 10, sharkY - 18);
        ctx.lineTo(sharkX - 15, sharkY - 45);
        ctx.lineTo(sharkX - 25, sharkY - 16);
        ctx.fill();

        // Massive 30-Meter Blue Whale Silhouette passing slowly
        whaleX += 0.38;
        if (whaleX > width + 800) whaleX = -900;
        const whaleY = height * 0.54 + Math.sin(time * 0.2) * 15;

        ctx.fillStyle = 'rgba(2, 8, 18, 0.9)';
        ctx.beginPath();
        ctx.moveTo(whaleX - 380, whaleY);
        ctx.quadraticCurveTo(whaleX, whaleY - 80, whaleX + 320, whaleY - 20);
        ctx.quadraticCurveTo(whaleX + 400, whaleY, whaleX + 320, whaleY + 45);
        ctx.quadraticCurveTo(whaleX, whaleY + 70, whaleX - 380, whaleY);
        ctx.fill();
      }

      // [ZONE D] ABYSS VOID (4,000m - 10,000m): Deep Anglerfish & Giant Squid
      else if (dRatio >= 0.72 && dRatio < 0.90) {
        // Deep Anglerfish with Glowing Lure Esca
        anglerX += 0.5;
        if (anglerX > width + 200) anglerX = -250;
        const anglerY = height * 0.42 + Math.sin(time * 0.6) * 14;

        ctx.fillStyle = 'rgba(2, 6, 14, 0.94)';
        ctx.beginPath();
        ctx.ellipse(anglerX, anglerY, 32, 24, 0, 0, Math.PI * 2); // Body
        ctx.fill();

        // Esca Lure Filament & Bioluminescent Glow Orb
        const lureX = anglerX + 35;
        const lureY = anglerY - 25 + Math.sin(time * 2) * 5;
        ctx.strokeStyle = 'rgba(200, 240, 255, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(anglerX + 10, anglerY - 20);
        ctx.quadraticCurveTo(anglerX + 30, anglerY - 40, lureX, lureY);
        ctx.stroke();

        ctx.fillStyle = curBio;
        ctx.shadowColor = curBio;
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.arc(lureX, lureY, 4, 0, Math.PI * 2);
        ctx.fill();

        // Giant Squid Silhouette & Trailing Tentacles
        squidX -= 0.42;
        if (squidX < -500) squidX = width + 550;
        const squidY = height * 0.52 + Math.sin(time * 0.3) * 22;

        ctx.fillStyle = 'rgba(1, 4, 11, 0.95)';
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.ellipse(squidX, squidY, 75, 32, 0, 0, Math.PI * 2);
        ctx.fill();

        // Tentacles
        ctx.strokeStyle = 'rgba(1, 4, 11, 0.95)';
        ctx.lineWidth = 3.5;
        for (let t = 0; t < 6; t++) {
          ctx.beginPath();
          ctx.moveTo(squidX + 65, squidY + (t - 3) * 9);
          ctx.quadraticCurveTo(squidX + 170, squidY + Math.sin(time * 2 + t) * 22, squidX + 280, squidY + (t - 3) * 14);
          ctx.stroke();
        }
      }

      // [ZONE E] HADAL TRENCH (11,000m): Rare Ancient Leviathan Shadow
      else {
        leviathanX += 0.28;
        if (leviathanX > width + 1000) leviathanX = -1100;
        const levY = height * 0.5 + Math.sin(time * 0.12) * 12;

        ctx.fillStyle = 'rgba(1, 2, 6, 0.98)';
        ctx.beginPath();
        ctx.ellipse(leviathanX, levY, 480, 95, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      // 4. SUBMARINE SEARCHLIGHT SPOTLIGHT (PITCH-BLACK DEPTHS > 0.4)
      if (dRatio > 0.4) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';

        const spotGrad = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 10,
          mouseRef.current.x, mouseRef.current.y, 300
        );
        const spotAlpha = (dRatio - 0.4) * 0.4;
        spotGrad.addColorStop(0, `rgba(220, 245, 255, ${spotAlpha * 1.4})`);
        spotGrad.addColorStop(0.4, `rgba(140, 232, 255, ${spotAlpha})`);
        spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = spotGrad;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 300, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 5. MARINE SNOW & RISING MICRO-BUBBLES
      ctx.save();
      snowParticles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.driftX + Math.sin(time + p.y * 0.005) * 0.3;
        if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(200, 235, 255, ${p.opacity * (1 - dRatio * 0.5)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Micro-bubbles
      bubbles.forEach((b) => {
        b.y -= b.speedY;
        b.x += Math.sin(time * 2 + b.wobble) * 0.4;
        if (b.y < -20) {
          b.y = height + 20;
          b.x = Math.random() * width;
        }

        ctx.strokeStyle = `rgba(180, 230, 255, ${0.25 * (1 - dRatio * 0.7)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
}



