"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";
import GsapHeadline from "./GsapHeadline";

type Pillar = { n: string; title: string; body: string; icon: ReactNode };

const Icon = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 64 64" className="w-10 h-10 stroke-white" fill="none" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const pillars: Pillar[] = [
  {
    n: "01",
    title: "1:1 Sessions",
    body: "Every student gets the founder's full attention. No batches. No background noise. Just you and the decks.",
    icon: (
      <Icon>
        <path d="M10 36 a22 22 0 0 1 44 0" />
        <rect x="8" y="34" width="10" height="18" rx="3" />
        <rect x="46" y="34" width="10" height="18" rx="3" />
        <line x1="13" y1="52" x2="13" y2="56" />
        <line x1="51" y1="52" x2="51" y2="56" />
      </Icon>
    ),
  },
  {
    n: "02",
    title: "Industry-Level Tech",
    body: "Pioneer CDJs, club-grade mixers, studio monitors — train on the exact gear you'll find in every serious venue.",
    icon: (
      <Icon>
        <rect x="6" y="14" width="52" height="36" rx="3" />
        <circle cx="32" cy="32" r="12" />
        <circle cx="32" cy="32" r="2.5" />
        <line x1="14" y1="22" x2="20" y2="22" />
        <line x1="44" y1="22" x2="50" y2="22" />
        <line x1="14" y1="46" x2="50" y2="46" />
      </Icon>
    ),
  },
  {
    n: "03",
    title: "Beginner to Advanced",
    body: "One complete program. No tiers, no shortcuts. You walk in curious and walk out a working DJ.",
    icon: (
      <Icon>
        <rect x="6" y="26" width="52" height="12" rx="2" />
        <rect x="28" y="20" width="8" height="24" rx="1.5" fill="currentColor" stroke="none" />
        <line x1="10" y1="32" x2="22" y2="32" />
        <line x1="42" y1="32" x2="54" y2="32" />
      </Icon>
    ),
  },
  {
    n: "04",
    title: "Real Gig Opportunities",
    body: "Practice ends when the crowd shows up. Our students play real events — that's how confidence is built.",
    icon: (
      <Icon>
        <circle cx="32" cy="30" r="16" />
        <circle cx="32" cy="30" r="3" />
        <circle cx="32" cy="30" r="9" opacity="0.4" />
        <path d="M8 54 L56 54" />
        <path d="M14 50 L50 50" opacity="0.5" />
      </Icon>
    ),
  },
];

function PillarCard({ p, i }: { p: Pillar; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 28 });
  const sy = useSpring(my, { stiffness: 180, damping: 28 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-5, 5]);
  const glowX = useTransform(sx, [-0.5, 0.5], [20, 80]);
  const glowY = useTransform(sy, [-0.5, 0.5], [20, 80]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 900 }}
    >
      <motion.article
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={() => { mx.set(0); my.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative bg-black p-8 md:p-12 lg:p-14 transition-colors hover:bg-[#0a0a0a] overflow-hidden"
      >
        {/* border */}
        <div className="absolute inset-0 ring-1 ring-white/[0.07] group-hover:ring-white/[0.18] transition-all duration-500 pointer-events-none" />

        {/* moving glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(320px circle at ${x}% ${y}%, rgba(255,255,255,0.04) 0%, transparent 70%)`
            ),
          }}
        />

        {/* top shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="flex items-start justify-between mb-12 relative z-10">
          <motion.span
            className="mono-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
          >
            {p.n}
          </motion.span>
          <motion.div
            className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            {p.icon}
          </motion.div>
        </div>

        <motion.h3
          className="display text-3xl md:text-4xl text-white mb-4 relative z-10"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.1 + 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {p.title}
        </motion.h3>

        <motion.p
          className="text-white/55 leading-relaxed max-w-md relative z-10 group-hover:text-white/75 transition-colors duration-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.1 + 0.25 }}
        >
          {p.body}
        </motion.p>

        {/* animated bottom line */}
        <motion.span
          className="absolute left-8 right-8 md:left-12 md:right-12 bottom-8 h-px bg-white/0 group-hover:bg-white/35 transition-colors duration-500"
          layoutId={undefined}
        />
      </motion.article>
    </motion.div>
  );
}

export default function Program() {
  return (
    <section id="program" className="relative bg-black py-28 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
          <motion.div
            className="col-span-12 md:col-span-4 flex items-start gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mono-label mt-2">02 / The Program</span>
          </motion.div>
          <div className="col-span-12 md:col-span-8">
            <GsapHeadline className="display text-5xl md:text-7xl lg:text-8xl text-white">
              <span className="block">What we teach.</span>
              <span className="block text-white/40">How we teach.</span>
            </GsapHeadline>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="serif-it text-xl md:text-2xl text-white/60 mt-8 max-w-2xl"
            >
              Four foundations. Built into one uncompromising program.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 hairline">
          {pillars.map((p, i) => (
            <PillarCard key={p.n} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
