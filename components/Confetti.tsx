
import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  velocity: number;
  rotation: number;
  rotationSpeed: number;
}

const COLORS = ['#d4af37', '#f9df9d', '#b91c1c', '#ef4444', '#fffacd'];

const Confetti: React.FC<{ active: boolean }> = ({ active }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (active) {
      const newParticles: Particle[] = Array.from({ length: 80 }).map((_, i) => ({
        id: i,
        x: 50, // center x
        y: 50, // center y
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 8 + 4,
        angle: Math.random() * 360,
        velocity: Math.random() * 15 + 10,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5,
      }));
      setParticles(newParticles);
      
      // Clear particles after animation
      const timer = setTimeout(() => setParticles([]), 4000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-[60] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            boxShadow: `0 0 10px ${p.color}88`,
            animation: `confetti-burst-${p.id} 3s cubic-bezier(0.1, 0.8, 0.3, 1) forwards`,
          }}
        />
      ))}
      <style>{`
        ${particles
          .map(
            (p) => `
          @keyframes confetti-burst-${p.id} {
            0% {
              transform: translate(-50%, -50%) rotate(${p.rotation}deg) scale(0);
              opacity: 1;
            }
            15% {
               transform: translate(calc(-50% + ${Math.cos(p.angle) * p.velocity * 2}vw), calc(-50% + ${Math.sin(p.angle) * p.velocity * 2}vh)) rotate(${p.rotation + 90}deg) scale(1);
               opacity: 1;
            }
            100% {
              transform: translate(calc(-50% + ${Math.cos(p.angle) * p.velocity * 3}vw), calc(-50% + 100vh)) rotate(${p.rotation + 720}deg) scale(0.5);
              opacity: 0;
            }
          }
        `
          )
          .join('')}
      `}</style>
    </div>
  );
};

export default Confetti;
