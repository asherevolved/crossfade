"use client";

export default function Marquee({
  text = "CROSSFADE",
  separator = "·",
  speed = 40,
}: {
  text?: string;
  separator?: string;
  speed?: number;
}) {
  const item = ` ${text} ${separator} `;
  // 8 reps per half so the seamless loop is wide on big screens
  const line = item.repeat(8);
  return (
    <section
      aria-hidden
      className="relative w-full bg-black border-y border-white/10 overflow-hidden"
    >
      <div className="flex w-max marquee-track" style={{ animationDuration: `${speed}s` }}>
        <span className="display text-white/90 text-[14vw] md:text-[10vw] leading-none whitespace-nowrap pr-12">
          {line}
        </span>
        <span className="display text-white/90 text-[14vw] md:text-[10vw] leading-none whitespace-nowrap pr-12">
          {line}
        </span>
      </div>
    </section>
  );
}
