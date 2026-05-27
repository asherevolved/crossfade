"use client";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => `${Math.round(v)}${suffix}`);
  useEffect(() => {
    if (inView) {
      const c = animate(mv, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1] });
      return c.stop;
    }
  }, [inView, mv, to]);
  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const stats = [
  { value: 200, suffix: "+", label: "Students Trained" },
  { value: 5, suffix: "+ yrs", label: "Of Teaching" },
  { value: 100, suffix: "%", label: "1:1 Sessions" },
  { value: 1, suffix: "", label: "Studio · Mysuru" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

export default function Stats() {
  return (
    <section className="relative border-y border-white/10 bg-black overflow-hidden">
      {/* ambient scan line */}
      <motion.div
        className="absolute inset-x-0 h-px bg-white/5 pointer-events-none"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 md:py-14 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={item}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col gap-1 md:border-l md:border-white/10 md:pl-6 first:border-l-0 first:pl-0 cursor-default"
          >
            <span className="display text-4xl md:text-5xl text-white">
              <Counter to={s.value} suffix={s.suffix} />
            </span>
            <motion.span
              className="mono-label"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {s.label}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
