import React, { useState } from "react";
import HorseFrameBackdrop from "./HorseFrameBackdrop";
import FortuneWheel from "./FortuneWheel";
import Confetti from "./Confetti";

export default function CNYWheelHero() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSpinRequest = () => {
    if (isLimitReached || isSpinning) return;
    setIsSpinning(true);
  };

  const handleSpinComplete = (prize: string) => {
    setIsSpinning(false);
    setIsLimitReached(true);
    setShowConfetti(true);
    console.log("Won:", prize);
  };

  return (
    <section className="relative w-full overflow-hidden flex flex-col items-center justify-center py-10">
      <div
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(255,215,120,0.10), transparent 55%), radial-gradient(circle at 50% 80%, rgba(185,28,28,0.18), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-5 text-center mb-10 md:mb-14">
        <div className="text-[10px] md:text-xs tracking-[0.45em] uppercase text-[#f9df9d]/70 font-bold">
          VIP i88 • LUNAR FORTUNE
        </div>

        <h2 className="mt-4 cinzel text-3xl md:text-5xl font-black tracking-[0.08em] text-[#f9df9d] drop-shadow-[0_10px_40px_rgba(0,0,0,0.75)]">
          RM50 UNLOCKS INSTANT CNY REWARDS
        </h2>

        <p className="mt-4 text-white/75 tracking-wide max-w-2xl mx-auto montserrat text-sm md:text-base">
          Deposit RM50 / SGD50 and spin immediately to claim your luxury CNY reward. 🧧✨
        </p>
      </div>

      <div className="relative w-full flex items-center justify-center min-h-[500px] sm:min-h-[600px]">
        {/* Horse + Frame (behind) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-[650px] aspect-square opacity-90">
          <HorseFrameBackdrop src="/assets/horse-frame.png" shimmerOpacity={0.25} />
        </div>

        {/* Wheel (front) */}
        <div className="relative z-10 w-full flex justify-center">
          <FortuneWheel 
            isSpinning={isSpinning}
            onSpinRequest={handleSpinRequest}
            onComplete={handleSpinComplete}
            isLimitReached={isLimitReached}
          />
        </div>

        <Confetti active={showConfetti} />
      </div>
    </section>
  );
}