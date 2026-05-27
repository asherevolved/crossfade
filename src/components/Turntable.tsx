"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Turntable({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const armRot = useTransform(scrollYProgress, [0, 0.4, 1], [-22, 8, 18]);

  return (
    <div ref={ref} className={`turntable relative ${className}`} aria-hidden>
      {/* Plinth */}
      <div className="absolute inset-0 rounded-[14px] bg-gradient-to-br from-[#161616] to-[#0a0a0a] hairline-strong shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]" />
      {/* Mat + platter */}
      <div className="absolute inset-[8%] rounded-full bg-[#0c0c0c] hairline" />
      {/* Vinyl */}
      <motion.div
        style={{ rotate }}
        className="absolute left-1/2 top-1/2 w-[78%] h-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #0a0a0a 0 18%, #1a1a1a 18.5% 19%, #0a0a0a 19% 22%, #1a1a1a 22.5% 23%, #0a0a0a 23% 100%)",
          }}
        />
        {/* groove rings */}
        <div
          className="absolute inset-0 rounded-full opacity-70"
          style={{
            background:
              "repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04) 0 1px, transparent 1px 4px)",
          }}
        />
        {/* label */}
        <div className="absolute left-1/2 top-1/2 w-[34%] h-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white text-black flex flex-col items-center justify-center hairline-strong">
          <span className="mono-label !text-black/60">Side A</span>
          <span className="display text-base leading-none mt-1">CROSSFADE</span>
          <span className="mono-label !text-black/60 mt-1">Mysuru · 33⅓</span>
          <span className="absolute left-1/2 top-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
        </div>
        {/* highlight sweep */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "conic-gradient(from 200deg, transparent 0deg, rgba(255,255,255,0.07) 30deg, transparent 70deg)",
          }}
        />
      </motion.div>

      {/* Spindle */}
      <div className="absolute left-1/2 top-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 shadow-[0_0_0_2px_#000]" />

      {/* Tonearm */}
      <motion.div
        style={{ rotate: armRot, transformOrigin: "100% 50%" }}
        className="absolute top-[8%] right-[6%] w-[52%] h-[6%] origin-right"
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#1a1a1a] hairline-strong" />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 h-[3px] w-[88%] bg-gradient-to-l from-white/70 to-white/30 rounded-full shadow-[0_1px_0_rgba(0,0,0,0.6)]" />
        <div className="absolute left-1 top-1/2 -translate-y-1/2 w-3 h-3 rounded-sm bg-white hairline-strong" />
      </motion.div>

      {/* Pitch fader */}
      <div className="absolute bottom-[6%] right-[8%] w-[18%] h-[3%] rounded-full bg-[#1a1a1a] hairline overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-[140%] bg-white rounded-sm" />
      </div>

      {/* Brand label */}
      <div className="absolute bottom-[6%] left-[8%] mono-label text-white/40">CDJ · DECK 01</div>
    </div>
  );
}
