"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import DeckScroll from "@/components/DeckScroll";
import Manifesto from "@/components/Manifesto";
import Stats from "@/components/Stats";
import Program from "@/components/Program";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import VinylDivider from "@/components/VinylDivider";
import { useIntroComplete } from "@/components/VideoIntro";

const sections = [
  { id: "navbar",      Component: Navbar },
  { id: "hero",        Component: DeckScroll },
  { id: "manifesto",   Component: Manifesto },
  { id: "stats",       Component: Stats },
  { id: "divider1",    Component: () => <VinylDivider label="SIDE A · TRACK 02 · THE PROGRAM" /> },
  { id: "program",     Component: Program },
  { id: "about",       Component: About },
  { id: "divider2",    Component: () => <VinylDivider label="SIDE B · TRACK 04 · VOICES" /> },
  { id: "testimonials",Component: Testimonials },
  { id: "contact",     Component: Contact },
  { id: "footer",      Component: Footer },
];

export default function Home() {
  const introComplete = useIntroComplete();

  return (
    <main className="relative bg-black">
      {sections.map(({ id, Component }, i) => (
        <motion.div
          key={id}
          initial={{ opacity: 0, y: 22 }}
          animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{
            duration: 0.65,
            delay: introComplete ? i * 0.06 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Component />
        </motion.div>
      ))}
    </main>
  );
}
