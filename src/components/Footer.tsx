"use client";
import { motion } from "framer-motion";

const navs = [
  { title: "Program", links: ["The Program", "Sessions", "Equipment", "Gigs"] },
  { title: "About", links: ["Founder", "Studio", "Press"] },
  { title: "Connect", links: ["Instagram", "YouTube", "SoundCloud", "Contact"] },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-20 pb-10">

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-12 gap-10 mb-20"
        >
          {/* brand */}
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <motion.span
                className="block w-2 h-2 rounded-full bg-white"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="font-sans font-bold tracking-tight text-lg">CROSSFADE</span>
              <span className="mono-label ml-2">/ MYSURU</span>
            </div>
            <p className="serif-it text-2xl text-white/70 max-w-sm leading-snug">
              A DJing academy built on the only philosophy that ever mattered — you&apos;re either a DJ, or
              you&apos;re not.
            </p>
          </motion.div>

          {/* nav columns */}
          {navs.map((g) => (
            <motion.div key={g.title} variants={fadeUp} className="col-span-6 md:col-span-2">
              <p className="mono-label mb-5">{g.title}</p>
              <ul className="space-y-3">
                {g.links.map((l) => (
                  <motion.li
                    key={l}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <a href="#" className="text-sm text-white/50 hover:text-white transition-colors duration-200">
                      {l}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div variants={fadeUp} className="col-span-12 md:col-span-1 flex md:justify-end">
            <motion.a
              href="#enroll"
              whileHover={{ scale: 1.06, borderColor: "rgba(255,255,255,0.6)" }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-2 border border-white/20 text-white px-4 py-2 rounded-full text-xs transition-colors"
            >
              Enroll ↗
            </motion.a>
          </motion.div>
        </motion.div>

        {/* big wordmark — clips up from below */}
        <div className="overflow-hidden -mb-10">
          <motion.div
            initial={{ y: "60%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="select-none pointer-events-none"
          >
            <h3 className="display text-white text-[19vw] md:text-[16vw] leading-[0.85] tracking-tight text-center whitespace-nowrap">
              CROSSFADE
            </h3>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/40"
        >
          <span>© {new Date().getFullYear()} Crossfade DJing Academy. All rights reserved.</span>
          <div className="flex gap-6">
            {["Privacy", "Terms"].map((l) => (
              <motion.a
                key={l}
                href="#"
                whileHover={{ color: "#fff" }}
                className="transition-colors"
              >
                {l}
              </motion.a>
            ))}
            <span>Mysuru, IN</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
