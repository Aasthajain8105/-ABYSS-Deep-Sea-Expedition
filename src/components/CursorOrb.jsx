import React, { useEffect, useState, useRef } from 'react';

export default function CursorOrb({ activeColor = '#00f3ff' }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });
  const [ripples, setRipples] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const posRef = useRef(pos);
  posRef.current = pos;

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleClick = (e) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      };
      setRipples((prev) => [...prev.slice(-4), newRipple]);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('button, a, input, .interactive, select, label')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Smooth trail effect using continuous requestAnimationFrame without state loop dependency
  useEffect(() => {
    let animId;
    const follow = () => {
      setTrailPos((prev) => {
        const dx = posRef.current.x - prev.x;
        const dy = posRef.current.y - prev.y;
        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) return prev;
        return {
          x: prev.x + dx * 0.18,
          y: prev.y + dy * 0.18,
        };
      });
      animId = requestAnimationFrame(follow);
    };
    animId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Click Ripples */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="absolute rounded-full border border-cyan-400/80 animate-ping pointer-events-none"
          style={{
            left: `${r.x - 30}px`,
            top: `${r.y - 30}px`,
            width: '60px',
            height: '60px',
            borderColor: activeColor,
            animationDuration: '0.8s'
          }}
        />
      ))}

      {/* Trailing Glow Halo */}
      <div
        className="absolute rounded-full transition-transform duration-75 blur-md opacity-40 pointer-events-none"
        style={{
          transform: `translate3d(${trailPos.x - 20}px, ${trailPos.y - 20}px, 0) scale(${isHovered ? 1.8 : 1})`,
          width: '40px',
          height: '40px',
          backgroundColor: activeColor,
          boxShadow: `0 0 40px 15px ${activeColor}`
        }}
      />

      {/* Core Glowing Orb */}
      <div
        className="absolute rounded-full transition-transform duration-75 pointer-events-none"
        style={{
          transform: `translate3d(${pos.x - 5}px, ${pos.y - 5}px, 0) scale(${isHovered ? 1.5 : 1})`,
          width: '10px',
          height: '10px',
          backgroundColor: '#ffffff',
          boxShadow: `0 0 15px 4px ${activeColor}, 0 0 30px 8px ${activeColor}`
        }}
      />
    </div>
  );
}

