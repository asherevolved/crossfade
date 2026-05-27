"use client";

const ITEM = " CROSSFADE · YOU'RE EITHER A DJ OR YOU'RE NOT · ";

export default function Manifesto() {
  const line = ITEM.repeat(6);
  return (
    <section className="relative w-full bg-black border-y border-white/10 overflow-hidden py-6 md:py-8">
      <div className="flex w-max" style={{ animation: "marquee 38s linear infinite" }}>
        <span className="display text-white/90 text-[10vw] md:text-[6vw] leading-none whitespace-nowrap pr-8 select-none">
          {line}
        </span>
        <span className="display text-white/90 text-[10vw] md:text-[6vw] leading-none whitespace-nowrap pr-8 select-none" aria-hidden>
          {line}
        </span>
      </div>
    </section>
  );
}
