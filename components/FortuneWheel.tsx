import React, { useRef, useState, useEffect } from 'react';
import { PRIZES, WHEEL_SIZE, OUTER_BORDER_WIDTH } from '../constants';
import DragonPointer from './DragonPointer';

interface FortuneWheelProps {
  isSpinning: boolean;
  onComplete: (label: string) => void;
  onSpinRequest: () => void;
  forceWinIndex?: number;
  isLimitReached?: boolean;
}

const FortuneWheel: React.FC<FortuneWheelProps> = ({ isSpinning, onComplete, onSpinRequest, forceWinIndex, isLimitReached }) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const [rotation, setRotation] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const hasCompletedRef = useRef(false);
  
  const segments = PRIZES.length;
  const anglePerSegment = 360 / segments;
  const targetIndex = forceWinIndex !== undefined && forceWinIndex >= 0 ? forceWinIndex : 0;

  useEffect(() => {
    if (!isSpinning || !wheelRef.current) {
      if (!isSpinning && !hasCompletedRef.current) {
        setShowCelebration(false);
      }
      return;
    }

    const el = wheelRef.current;
    hasCompletedRef.current = false;
    setShowCelebration(false);

    const extraRotations = 8; 
    const segmentOffset = anglePerSegment / 2;
    const targetAngle = 360 - (targetIndex * anglePerSegment) - segmentOffset;
    const currentRotation = rotationRef.current % 360;
    const delta = (targetAngle - currentRotation + 360) % 360;
    const finalRotation = rotationRef.current + (extraRotations * 360) + delta;

    rotationRef.current = finalRotation;
    setRotation(finalRotation);

    const handleTransitionEnd = (e: TransitionEvent) => {
      if (e.target !== el) return;
      if (e.propertyName !== "transform") return;
      if (hasCompletedRef.current) return;

      hasCompletedRef.current = true;
      setShowCelebration(true);
      el.removeEventListener("transitionend", handleTransitionEnd);
      onComplete(PRIZES[targetIndex].label);
    };

    el.addEventListener("transitionend", handleTransitionEnd);
    return () => el.removeEventListener("transitionend", handleTransitionEnd);
  }, [isSpinning, targetIndex, anglePerSegment, onComplete]);

  return (
    <div className="relative w-full max-w-[min(92vw,550px)] aspect-square flex items-center justify-center mx-auto">
      <div className={`relative w-full h-full transition-transform duration-700 ease-out ${!isSpinning && !isLimitReached ? 'hover:scale-[1.02]' : ''}`}>
        
        {/* Pointer */}
        <div className={`absolute -top-[4%] left-1/2 -translate-x-1/2 z-50 filter drop-shadow-[0_10px_20px_rgba(212,175,55,0.4)] scale-[0.6] xs:scale-[0.8] sm:scale-100 transition-transform duration-500 origin-bottom`}>
          <DragonPointer />
        </div>

        {/* Rotating Wheel Container */}
        <div 
          ref={wheelRef}
          className="w-full h-full relative"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 4s cubic-bezier(0.15, 0, 0.15, 1)' : 'none'
          }}
        >
          {/* Enhanced Gloss Overlay - Complex Reflections */}
          <div className="absolute inset-0 rounded-full shadow-[inset_0_0_100px_rgba(255,255,255,0.25)] z-20 pointer-events-none border-[2px] sm:border-[4px] border-white/20"></div>

          <svg viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`} className="w-full h-full overflow-visible">
            <defs>
              {/* Premium Anisotropic Gold Gradient */}
              <linearGradient id="goldMetallicPremium" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#433010" />
                  <stop offset="15%" stopColor="#f9df9d" />
                  <stop offset="35%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#d4af37" />
                  <stop offset="65%" stopColor="#ffffff" />
                  <stop offset="85%" stopColor="#f9df9d" />
                  <stop offset="100%" stopColor="#433010" />
              </linearGradient>

              {/* Surface Texture Filter for Realistic "Lacquer" Noise */}
              <filter id="lacquerTexture" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="noise" />
                <feColorMatrix in="noise" type="saturate" values="0" result="destatNoise" />
                <feComponentTransfer in="destatNoise" result="dimmedNoise">
                  <feFuncA type="linear" slope="0.08" />
                </feComponentTransfer>
                <feBlend in="SourceGraphic" in2="dimmedNoise" mode="overlay" />
              </filter>

              {/* Specular Light for Metallic Inlays */}
              <filter id="metallicSpecular" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" result="blur" />
                <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1.2" specularExponent="45" lightingColor="#ffffff" result="spec">
                  <fePointLight x="200" y="200" z="300" />
                </feSpecularLighting>
                <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut" />
                <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
              </filter>

              {/* Multi-layered Red Lacquer */}
              <radialGradient id="redLacquerPremium" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff5a5a" />
                <stop offset="65%" stopColor="#ee1c25" />
                <stop offset="90%" stopColor="#9b1111" />
                <stop offset="100%" stopColor="#450a0a" />
              </radialGradient>

              {/* Divider Material - Polished Gold Wire */}
              <linearGradient id="dividerGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8a6d3b" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#8a6d3b" />
              </linearGradient>

              <filter id="ultraBloomPremium" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="12" result="blur" />
                <feFlood floodColor="#f9df9d" floodOpacity="1" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Base Plate with Micro-imperfections */}
            <circle cx={WHEEL_SIZE/2} cy={WHEEL_SIZE/2} r={WHEEL_SIZE/2 - 5} fill="url(#redLacquerPremium)" filter="url(#lacquerTexture)" />

            <g>
              {PRIZES.map((prize, i) => {
                const startAngle = i * anglePerSegment;
                const endAngle = (i + 1) * anglePerSegment;
                const outerR = WHEEL_SIZE/2 - OUTER_BORDER_WIDTH;
                
                const x1 = WHEEL_SIZE/2 + outerR * Math.cos((startAngle - 90) * Math.PI / 180);
                const y1 = WHEEL_SIZE/2 + outerR * Math.sin((startAngle - 90) * Math.PI / 180);
                const x2 = WHEEL_SIZE/2 + outerR * Math.cos((endAngle - 90) * Math.PI / 180);
                const y2 = WHEEL_SIZE/2 + outerR * Math.sin((endAngle - 90) * Math.PI / 180);

                const d = `M ${WHEEL_SIZE/2} ${WHEEL_SIZE/2} L ${x1} ${y1} A ${outerR} ${outerR} 0 0 1 ${x2} ${y2} Z`;
                const isWinner = showCelebration && i === targetIndex;

                return (
                  <g key={prize.id} className={isWinner ? 'animate-prize-highlight' : ''}>
                    {/* Segment Lacquer Finish */}
                    <path 
                      d={d} 
                      fill={prize.color} 
                      className="transition-all duration-300 opacity-100"
                      style={{ filter: isWinner ? 'url(#ultraBloomPremium)' : 'url(#lacquerTexture)' }}
                    />
                    
                    {/* Metallic Inlaid Dividers */}
                    <line 
                      x1={WHEEL_SIZE/2} y1={WHEEL_SIZE/2} 
                      x2={x1} y2={y1} 
                      stroke="url(#dividerGold)" 
                      strokeWidth="2" 
                      filter="url(#metallicSpecular)"
                      strokeLinecap="round"
                    />

                    <g transform={`rotate(${startAngle + anglePerSegment/2}, ${WHEEL_SIZE/2}, ${WHEEL_SIZE/2})`}>
                      <text 
                        x={WHEEL_SIZE/2} 
                        y={105} 
                        textAnchor="middle" 
                        fill={isWinner ? "#fff" : "#fffacd"} 
                        className="cinzel font-bold text-[16px] sm:text-[18px] tracking-wider pointer-events-none transition-all duration-300"
                        style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}
                      >
                        {prize.label}
                      </text>
                      <text 
                        x={WHEEL_SIZE/2} 
                        y={125} 
                        textAnchor="middle" 
                        fill={isWinner ? "#fff" : "rgba(255, 255, 255, 0.85)"} 
                        className="montserrat font-bold text-[8px] sm:text-[9px] tracking-[0.2em] pointer-events-none uppercase"
                        style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
                      >
                        {prize.value}
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>

            {/* Premium Gold Rim with Micro-imperfections */}
            <circle 
              cx={WHEEL_SIZE/2} 
              cy={WHEEL_SIZE/2} 
              r={WHEEL_SIZE/2 - OUTER_BORDER_WIDTH/2} 
              fill="none" 
              stroke="url(#goldMetallicPremium)" 
              strokeWidth={OUTER_BORDER_WIDTH} 
              filter="url(#lacquerTexture)"
            />
            {/* Inner "Lip" for added Depth */}
            <circle 
              cx={WHEEL_SIZE/2} 
              cy={WHEEL_SIZE/2} 
              r={WHEEL_SIZE/2 - OUTER_BORDER_WIDTH} 
              fill="none" 
              stroke="rgba(255,255,255,0.15)" 
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Hub Button: Refined Angpow - Text-Focused Design */}
        <button 
          onClick={onSpinRequest}
          disabled={isSpinning || isLimitReached}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-36 xs:w-28 xs:h-40 sm:w-36 sm:h-52 z-40 focus:outline-none transition-transform duration-500 ${isSpinning ? 'animate-vibrate' : 'hover:scale-105 active:scale-95'}`}
        >
            <div className={`w-full h-full bg-gradient-to-b from-[#ee1c25] via-[#ee1c25] to-[#b91c1c] rounded-lg sm:rounded-xl shadow-[0_0_40px_rgba(249,223,157,0.5),_inset_0_2px_15px_rgba(255,255,255,0.5)] border-2 border-[#f9df9d]/50 relative flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ${isLimitReached && !isSpinning ? 'border-white shadow-[0_0_60px_rgba(249,223,157,0.8)] scale-110' : ''}`}>
                
                <div className="z-30 flex flex-col items-center justify-center px-2 text-center w-full">
                    <span className={`cinzel text-[#f9df9d] text-3xl xs:text-4xl sm:text-5xl font-black mb-2 transition-all duration-700 ${isLimitReached && !isSpinning ? 'scale-110 text-white drop-shadow-[0_0_15px_white]' : 'drop-shadow-[0_2px_5px_rgba(255,255,255,0.3)]'}`}>福</span>
                    
                    <span className={`montserrat text-[#f9df9d] font-black tracking-[0.15em] uppercase transition-all duration-700 leading-tight ${isLimitReached && !isSpinning ? 'text-white' : 'drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]'} text-sm xs:text-base sm:text-xl md:text-2xl`}>
                      {isLimitReached && !isSpinning ? 'You Won' : 'SPIN'}
                    </span>
                </div>
                
                {isLimitReached && !isSpinning && (
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 to-transparent animate-shimmer-fast pointer-events-none"></div>
                )}
            </div>
            
            {!isSpinning && !isLimitReached && (
              <div className="absolute inset-[-15px] sm:inset-[-20px] rounded-2xl border-2 border-[#f9df9d]/50 animate-ping pointer-events-none"></div>
            )}
        </button>
      </div>

      <style>{`
        @keyframes vibrate {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
          25% { transform: translate(calc(-50% + 1px), calc(-50% + 1px)) rotate(0.4deg); }
          75% { transform: translate(calc(-50% - 1px), calc(-50% - 1px)) rotate(-0.4deg); }
        }
        @keyframes prize-highlight {
          0%, 100% { filter: brightness(1.2) saturate(1.2); }
          50% { filter: brightness(1.8) saturate(1.6); }
        }
        @keyframes shimmer-fast {
          0% { transform: translateY(120%); }
          100% { transform: translateY(-120%); }
        }
        @media (max-width: 400px) {
          .xs\:w-28 { width: 7rem; }
          .xs\:h-40 { height: 10rem; }
        }
      `}</style>
    </div>
  );
};

export default FortuneWheel;