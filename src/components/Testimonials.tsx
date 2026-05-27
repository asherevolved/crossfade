"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import GsapHeadline from "./GsapHeadline";

type T = { quote: string; name: string; role: string; year: string };

const items: T[] = [
  {
    quote:
      "I came in not knowing what a CDJ was. Six months later I was opening at a club in Bangalore. The 1:1 format changes everything.",
    name: "Aarav S.",
    role: "Resident DJ, Bangalore",
    year: "2024",
  },
  {
    quote:
      "Hemanth doesn't teach you presets. He teaches you to hear the room. That's the only thing that matters once you're behind the decks.",
    name: "Sneha K.",
    role: "Wedding & Event DJ",
    year: "2023",
  },
  {
    quote:
      "The honesty at Crossfade is rare. You're either matching the beat or you're not. No participation trophies. That's why it works.",
    name: "Rohan M.",
    role: "Producer & Performer",
    year: "2024",
  },
  {
    quote:
      "The first time I played a real gig was an event Hemanth lined up. Crossfade doesn't end the program at the door — it begins there.",
    name: "Tanya R.",
    role: "Club Resident, Mysuru",
    year: "2025",
  },
];

// duplicate for seamless loop
const looped = [...items, ...items];

function Card({ t }: { t: T }) {
  return (
    <figure className="relative shrink-0 w-[85vw] sm:w-[480px] md:w-[520px] bg-[#0a0a0a] hairline p-8 md:p-10 flex flex-col justify-between min-h-[300px] mx-3 md:mx-4">
      <span className="absolute top-6 right-8 display text-7xl text-white/10 leading-none">&ldquo;</span>
      <blockquote className="serif-it text-xl md:text-2xl text-white/90 leading-snug relative z-10">
        {t.quote}
      </blockquote>
      <figcaption className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
        <div>
          <div className="text-sm text-white font-medium">{t.name}</div>
          <div className="mono-label mt-0.5">{t.role}</div>
        </div>
        <span className="mono-label">{t.year}</span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section id="voices" className="relative bg-black py-28 md:py-36 border-t border-white/10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-14 md:mb-20">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <span className="mono-label block mb-6">04 / Voices</span>
            <GsapHeadline className="display text-5xl md:text-7xl text-white">
              <span className="block">Words from</span>
              <span className="block text-white/40 serif-it font-normal italic">the people who left ready.</span>
            </GsapHeadline>
          </div>
        </div>
      </div>

      {/* marquee track */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => {
          if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
        }}
        onMouseLeave={() => {
          if (trackRef.current) trackRef.current.style.animationPlayState = "running";
        }}
      >
        {/* left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #000, transparent)" }} />
        {/* right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #000, transparent)" }} />

        <div
          ref={trackRef}
          className="flex py-4"
          style={{
            width: "max-content",
            animation: "marquee 40s linear infinite",
          }}
        >
          {looped.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
