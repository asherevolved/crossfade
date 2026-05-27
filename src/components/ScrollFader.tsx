"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ScrollFader() {
  const { scrollYProgress } = useScroll();
  // Fader UP = top of page, DOWN = bottom.
  // Cap travel so cap doesn't overflow track.
  const sp = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const knobTop = useTransform(sp, [0, 1], ["2%", "92%"]);
  const fillHeight = useTransform(sp, [0, 1], ["0%", "100%"]);

  // 21 tick marks along the track
  const ticks = Array.from({ length: 21 });

  return (
    <div
      aria-hidden
      className="hidden md:flex fixed top-1/2 -translate-y-1/2 right-4 lg:right-6 z-40 select-none pointer-events-none"
    >
      <div className="relative flex flex-col items-center gap-2">
        <span className="mono-label !text-[10px] text-white/60">−∞</span>

        {/* Fader body */}
        <div className="relative w-7 h-[60vh] max-h-[520px] rounded-full bg-[#0a0a0a] hairline-strong shadow-[inset_0_2px_6px_rgba(0,0,0,0.8),0_8px_24px_-8px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Center groove track */}
          <div className="absolute left-1/2 top-2 bottom-2 -translate-x-1/2 w-[2px] bg-white/15 rounded-full" />

          {/* Filled travel from top */}
          <motion.div
            style={{ height: fillHeight }}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[3px] bg-gradient-to-b from-white via-white/70 to-white/0 rounded-full"
          />

          {/* Tick marks */}
          <div className="absolute inset-y-3 left-0 right-0 flex flex-col justify-between px-1.5">
            {ticks.map((_, i) => {
              const major = i % 5 === 0;
              return (
                <div key={i} className="flex items-center justify-between">
                  <span className={`block h-px ${major ? "w-2.5 bg-white/40" : "w-1.5 bg-white/15"}`} />
                  <span className={`block h-px ${major ? "w-2.5 bg-white/40" : "w-1.5 bg-white/15"}`} />
                </div>
              );
            })}
          </div>

          {/* Knob */}
          <motion.div
            style={{ top: knobTop }}
            className="absolute left-1/2 -translate-x-1/2 w-[40px] h-[34px] -mt-[17px]"
          >
            <div className="relative w-full h-full rounded-[6px] bg-gradient-to-b from-[#2a2a2a] via-[#161616] to-[#0a0a0a] hairline-strong shadow-[0_6px_14px_-4px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.18)]">
              {/* Grip lines */}
              <div className="absolute inset-x-2 top-1.5 bottom-1.5 flex flex-col justify-between">
                {Array.from({ length: 7 }).map((_, i) => (
                  <span key={i} className="block h-px bg-white/25" />
                ))}
              </div>
              {/* Indicator stripe */}
              <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-7 h-[2px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
            </div>
          </motion.div>
        </div>

        <span className="mono-label !text-[10px] text-white/60">+10</span>
      </div>
    </div>
  );
}
