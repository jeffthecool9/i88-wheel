import React from "react";
import WheelSection from "./components/WheelSection";
import HorseFrameBackdrop from "./components/HorseFrameBackdrop";

const App: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#7f1d1d] relative overflow-x-hidden flex flex-col items-center justify-start py-6 sm:py-10 md:py-20">
      {/* Background CNY Visuals */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Deep Imperial Red Gradient Base */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_#ee1c25_0%,_#b91c1c_70%,_#450a0a_100%)]" />

        {/* Atmospheric Glow */}
        <div className="absolute top-[-5%] left-[-5%] w-[60%] h-[70%] bg-[#ef4444] rounded-full blur-[140px] opacity-20 animate-pulse" />

        {/* HERO MOTIF CONTAINER */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-full max-w-[1350px] aspect-square flex items-center justify-center">
          {/* THE VERSACE ROUNDEL BACKGROUND */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 sm:opacity-50 z-10">
            <svg viewBox="0 0 600 600" className="w-full h-full overflow-visible">
              <defs>
                <pattern
                  id="versacePattern"
                  x="0"
                  y="0"
                  width="30"
                  height="30"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M0 0h30v30H0V0zm2 2v26h26V2H2zm2 2h6v2H6v12h12V6h-4V4h6v14H4V4z"
                    fill="#f9df9d"
                    opacity="0.8"
                  />
                </pattern>
                <linearGradient id="heavyGoldPBR" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2d1d05" />
                  <stop offset="22%" stopColor="#d4af37" />
                  <stop offset="50%" stopColor="#ffffff" />
                  <stop offset="78%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#2d1d05" />
                </linearGradient>
              </defs>
              <circle cx="300" cy="300" r="210" fill="none" stroke="url(#versacePattern)" strokeWidth="44" />
              <circle cx="300" cy="300" r="190" fill="none" stroke="url(#heavyGoldPBR)" strokeWidth="4" />
            </svg>
          </div>

          {/* ✅ REPLACED: YOUR LOCAL HORSE-FRAME PNG LAYER */}
          <div className="relative w-full h-full flex items-center justify-center z-20">
            {/* grounding shadow */}
            <div className="absolute bottom-[22%] md:bottom-[18%] w-[35%] h-[6%] z-10 animate-shadow-breathe opacity-70">
              <div className="absolute inset-0 bg-black/90 blur-[20px] rounded-[100%] scale-x-[1.6] transform-gpu" />
              <div className="absolute inset-[-60px] bg-[#3a0a0a]/50 blur-[60px] rounded-[100%] scale-x-[2] transform-gpu" />
              <div
                className="absolute inset-0 opacity-30 mix-blend-overlay"
                style={{
                  backgroundImage: "radial-gradient(circle, #000 1.5px, transparent 1.5px)",
                  backgroundSize: "6px 6px",
                }}
              />
            </div>

            {/* the actual horse+frame */}
            <div className="relative w-[92%] md:w-[78%] aspect-square z-20 animate-horse-entrance">
              <HorseFrameBackdrop src="/assets/horse-frame.png" shimmerOpacity={0.22} />
            </div>

            {/* Subtle Luxury Dust Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20 z-30">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-[#f9df9d] rounded-full blur-[1px]"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `dust-float ${7 + Math.random() * 7}s infinite linear`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Global Texture Layer */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-linen.png")' }}
        />
      </div>

      {/* Animations */}
      <style>{`
        @keyframes horse-entrance {
          from { opacity: 0; transform: scale(0.97) translateY(15px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes shadow-breathe {
          0%, 100% { transform: scaleX(1) opacity(0.7); filter: blur(20px); }
          50% { transform: scaleX(1.15) opacity(0.4); filter: blur(35px); }
        }
        @keyframes dust-float {
          0% { transform: translateY(0) translateX(0) opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-150px) translateX(40px) opacity: 0; }
        }
        .animate-horse-entrance { animation: horse-entrance 2s cubic-bezier(0.2, 1, 0.3, 1) forwards; }
        .animate-shadow-breathe { animation: shadow-breathe 7s ease-in-out infinite alternate; }
      `}</style>

      {/* Main UI Overlay */}
      <div className="relative z-30 w-full max-w-7xl px-4 flex flex-col items-center">
        <header className="text-center mb-6 sm:mb-10 md:mb-16 space-y-2 sm:space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <div className="h-[1px] w-12 md:w-32 bg-gradient-to-r from-transparent via-[#f9df9d] to-transparent" />
            <h2 className="cinzel text-[#f9df9d] text-[10px] sm:text-xl tracking-[0.7em] font-bold uppercase drop-shadow-[0_0_20px_rgba(249,223,157,0.7)]">
              VIP i88 SUPREME
            </h2>
            <div className="h-[1px] w-12 md:w-32 bg-gradient-to-l from-transparent via-[#f9df9d] to-transparent" />
          </div>

          <h1 className="cinzel text-5xl sm:text-7xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#ffffff] via-[#f9df9d] to-[#d4af37] drop-shadow-[0_20px_60px_rgba(0,0,0,0.85)] leading-tight tracking-tight">
            LUNAR FORTUNE
          </h1>
          <p className="montserrat text-white/95 text-[10px] sm:text-xl tracking-[0.6em] sm:tracking-[1em] uppercase font-black max-w-[280px] sm:max-w-4xl mx-auto leading-relaxed drop-shadow-2xl">
            YEAR OF THE HORSE • CELEBRATING PROSPERITY
          </p>
        </header>

        {/* Wheel stays front */}
        <WheelSection />

        <footer className="mt-12 sm:mt-24 md:mt-32 text-center py-6 sm:py-10">
          <div className="flex flex-col items-center gap-8">
            <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#f9df9d]/60 to-transparent" />
            <p className="cinzel text-[10px] sm:text-[18px] tracking-[0.6em] text-[#f9df9d] uppercase font-bold drop-shadow-lg">
              i88 GLOBAL ENTERTAINMENT • EST 2024
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default App;
