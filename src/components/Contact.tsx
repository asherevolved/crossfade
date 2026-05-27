"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import GsapHeadline from "./GsapHeadline";
import Magnetic from "./Magnetic";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
});

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <section id="enroll" className="relative bg-black py-28 md:py-40 border-t border-white/10 overflow-hidden">

      {/* background glow */}
      <motion.div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.03) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-10">

        {/* left */}
        <motion.div
          className="col-span-12 md:col-span-5"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span variants={fadeUp(0)} className="mono-label block mb-6">05 / Enroll</motion.span>

          <GsapHeadline className="display text-6xl md:text-7xl lg:text-[6.5rem] text-white">
            <span className="block">Ready to</span>
            <span className="block text-white/40">begin?</span>
          </GsapHeadline>

          <motion.p variants={fadeUp(0.1)} className="serif-it text-xl md:text-2xl text-white/60 mt-8 max-w-md">
            Tell us a bit about yourself. We&apos;ll set up a no-pressure conversation.
          </motion.p>

          <motion.div variants={stagger} className="mt-12 space-y-6 text-sm">
            {[
              { label: "Studio", value: "Crossfade DJing Academy\nMysuru, Karnataka, India" },
              { label: "Hours", value: "Mon — Sat · 11:00 AM — 9:00 PM IST" },
              { label: "Reach", value: "hello@crossfade.academy · +91 00000 00000" },
            ].map((item, i) => (
              <motion.div key={item.label} variants={fadeUp(0.15 + i * 0.06)}>
                <p className="mono-label mb-1">{item.label}</p>
                <p className="text-white/80 leading-relaxed whitespace-pre-line">{item.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* form */}
        <motion.div
          className="col-span-12 md:col-span-7"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <form
            onSubmit={onSubmit}
            className="bg-[#0a0a0a] hairline p-8 md:p-10 lg:p-12 space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field label="Full Name" name="name" required placeholder="Your name" delay={0.2} />
              <Field label="Email" name="email" type="email" required placeholder="you@email.com" delay={0.25} />
              <Field label="Phone" name="phone" type="tel" required placeholder="+91 …" delay={0.3} />
              <Field label="Experience" name="experience" placeholder="None / Some / Lots" delay={0.35} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <label className="mono-label block mb-3">Why DJing?</label>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Tell us what draws you to the craft."
                className="w-full bg-transparent border border-white/15 focus:border-white/60 outline-none text-white placeholder:text-white/30 px-4 py-3 transition-colors resize-none"
              />
            </motion.div>

            <motion.div
              className="flex items-center justify-between flex-wrap gap-4 pt-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-xs text-white/40 max-w-sm">
                By submitting, you agree to be contacted about enrollment. We never share your details.
              </p>
              <Magnetic strength={0.35}>
              <motion.button
                type="submit"
                disabled={sent}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full text-sm font-medium hover:bg-white/90 transition disabled:opacity-50"
              >
                {sent ? "Sent ✓" : "Submit Application"}
                {!sent && (
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                )}
              </motion.button>
              </Magnetic>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  label, name, type = "text", required, placeholder, delay = 0,
}: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <label className="mono-label block mb-3">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-white/15 focus:border-white/70 outline-none text-white placeholder:text-white/30 py-2 transition-colors"
      />
    </motion.div>
  );
}
