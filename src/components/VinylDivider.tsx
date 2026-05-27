"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function VinylDivider({ label = "MIX · CUT · LOOP · CROSSFADE" }: { label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  return (
    <div ref={ref} className="relative w-full bg-black overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5 md:py-6 flex items-center gap-6">
        <motion.div style={{ rotate }} className="relative shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, #0a0a0a 0 18%, #fff 18% 22%, #0a0a0a 22% 100%)",
            }}
          />
          <div
            className="absolute inset-0 rounded-full opacity-70"
            style={{
              background:
                "repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0 1px, transparent 1px 4px)",
            }}
          />
        </motion.div>
        <div className="flex-1 h-px bg-white/10" />
        <span className="mono-label whitespace-nowrap">{label}</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>
    </div>
  );
}
