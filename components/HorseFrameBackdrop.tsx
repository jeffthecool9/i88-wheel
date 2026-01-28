import React from "react";

type Props = {
  src: string; // required now
  className?: string;
  shimmerOpacity?: number;
};

export default function HorseFrameBackdrop({
  src,
  className = "",
  shimmerOpacity = 0.22,
}: Props) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <div
        className="pointer-events-none absolute -inset-16 rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(255,215,120,0.25), transparent 62%)",
        }}
      />

      <img
        src={src}
        alt="Golden Horse Emblem"
        className="relative z-10 w-full h-full object-contain select-none pointer-events-none"
        draggable={false}
        style={{
          filter:
            "drop-shadow(0px 30px 80px rgba(0,0,0,0.75)) brightness(1.02) contrast(1.05)",
          animation: "horseFloat 7.5s ease-in-out infinite",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          WebkitMaskImage: `url(${src})`,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          WebkitMaskPosition: "center",
          maskImage: `url(${src})`,
          maskRepeat: "no-repeat",
          maskSize: "contain",
          maskPosition: "center",
          background:
            "linear-gradient(110deg, rgba(255,255,255,0) 42%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0) 58%)",
          backgroundSize: "240% 100%",
          animation: "goldSweep 4.2s ease-in-out infinite",
          opacity: shimmerOpacity,
          mixBlendMode: "screen",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-30"
        style={{
          WebkitMaskImage: `url(${src})`,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          WebkitMaskPosition: "center",
          maskImage: `url(${src})`,
          maskRepeat: "no-repeat",
          maskSize: "contain",
          maskPosition: "center",
          background:
            "radial-gradient(circle at 50% 45%, rgba(255,244,199,0.25), rgba(0,0,0,0) 55%)",
          opacity: 0.5,
          filter: "blur(0.5px)",
        }}
      />

      <style>{`
        @keyframes goldSweep {
          0%   { background-position: -160% 0; }
          100% { background-position: 260% 0; }
        }
        @keyframes horseFloat {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
