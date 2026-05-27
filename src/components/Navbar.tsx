"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIntroComplete } from "@/components/VideoIntro";
import Magnetic from "./Magnetic";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#program", label: "Courses" },
  { href: "#voices", label: "Testimonials" },
  { href: "#enroll", label: "Contact Us" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const introComplete = useIntroComplete();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={false}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">

        {/* logo */}
        <motion.a
          href="#"
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -16 }}
          animate={introComplete ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-sans font-bold tracking-tight text-base md:text-lg">CROSSFADE</span>
          <span className="mono-label hidden sm:inline ml-2">/ MYSURU</span>
        </motion.a>

        {/* links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l, i) => (
            <motion.li
              key={l.href}
              initial={{ opacity: 0, y: -10 }}
              animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.a
                href={l.href}
                className="text-sm text-white/60 hover:text-white transition-colors relative group"
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.a>
            </motion.li>
          ))}
        </ul>

        {/* cta */}
        <Magnetic strength={0.3}>
        <motion.a
          href="#enroll"
          initial={{ opacity: 0, x: 16 }}
          animate={introComplete ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileTap={{ scale: 0.97 }}
          className="group inline-flex items-center gap-2 bg-white text-black px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm font-medium hover:bg-white/90 transition"
        >
          Enroll Now
          <motion.span
            className="inline-block"
            animate={{ x: [0, 2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </motion.a>
        </Magnetic>
      </nav>
    </motion.header>
  );
}
