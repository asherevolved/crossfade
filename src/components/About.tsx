"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
});

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const vinylY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const vinylScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.96]);

  return (
    <section ref={sectionRef} id="about" className="relative bg-black py-28 md:py-40 border-t border-white/10 overflow-hidden">

      {/* subtle background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.span
          className="display text-white/[0.02] text-[25vw] leading-none whitespace-nowrap"
          style={{ y: useTransform(scrollYProgress, [0, 1], [20, -20]) }}
        >
          CROSSFADE
        </motion.span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-8 md:gap-12 items-center relative">

        {/* vinyl portrait */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-12 md:col-span-5 relative"
          style={{ y: vinylY, scale: vinylScale }}
        >
          <div className="relative aspect-square w-full max-w-[520px] mx-auto">
            {/* spinning vinyl */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, ease: "linear", repeat: Infinity }}
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle at 50% 50%, #0a0a0a 0 36%, #1a1a1a 36% 37%, #0a0a0a 37% 100%)",
              }}
            >
              <div
                className="absolute inset-0 rounded-full opacity-60"
                style={{ background: "repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0 1px, transparent 1px 5px)" }}
              />
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ background: "conic-gradient(from 200deg, transparent 0deg, rgba(255,255,255,0.08) 30deg, transparent 90deg)" }}
              />
            </motion.div>

            {/* portrait */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[58%] h-[58%] rounded-full overflow-hidden hairline-strong"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src="/hemanth.jpg"
                alt="Founder Hemanth Rakki — Crossfade DJing Academy"
                className="w-full h-full object-cover grayscale"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>

            {/* spindle */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_0_2px_#000] z-10"
              animate={{ boxShadow: ["0 0 0 2px #000, 0 0 0 0px rgba(255,255,255,0)", "0 0 0 2px #000, 0 0 12px 4px rgba(255,255,255,0.15)", "0 0 0 2px #000, 0 0 0 0px rgba(255,255,255,0)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* caption */}
            <motion.div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black px-4 py-2 hairline-strong"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <span className="mono-label">Founder</span>
              <span className="display text-base text-white">Hemanth Rakki</span>
              <span className="mono-label">· EST. 2019</span>
            </motion.div>
          </div>
        </motion.div>

        {/* text */}
        <motion.div
          className="col-span-12 md:col-span-7"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span variants={fadeUp(0)} className="mono-label block mb-6">03 / About</motion.span>

          <motion.h2
            variants={fadeUp(0.05)}
            className="display text-5xl md:text-6xl lg:text-7xl text-white"
          >
            Built behind the decks.<br />
            <span className="text-white/40">Taught the same way.</span>
          </motion.h2>

          <motion.div
            variants={stagger}
            className="mt-10 space-y-6 text-white/70 leading-relaxed max-w-xl"
          >
            <motion.p variants={fadeUp(0.1)}>
              Hemanth Rakki has spent over a decade behind club decks across India — from intimate Mysuru
              lounges to festival mainstages. Crossfade was founded in 2019 to answer one question: where do
              serious aspiring DJs in South India actually go to learn the craft?
            </motion.p>
            <motion.p variants={fadeUp(0.15)}>
              The answer is one studio, one mentor, and one uncompromising philosophy. Every student trains
              one-on-one. Every session happens on the same Pioneer setup you&apos;ll find in working clubs.
              Every graduate leaves with the only thing that matters — the ability to read a room and own it.
            </motion.p>
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="serif-it text-2xl md:text-3xl text-white mt-12 border-l border-white/30 pl-6 max-w-xl"
          >
            <motion.span
              animate={{ borderLeftColor: ["rgba(255,255,255,0.3)", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.3)"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            &ldquo;Either you&apos;re a DJ, or you&apos;re not. My job is to make sure, when you leave this
            studio, you are.&rdquo;
            <footer className="not-italic mono-label mt-4 not-prose">— Hemanth Rakki, Founder</footer>
          </motion.blockquote>
        </motion.div>
      </div>
    </section>
  );
}
