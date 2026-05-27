"use client";
import { motion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useIntroComplete } from "@/components/VideoIntro";

const TOTAL_FRAMES = 120;
const frameSrc = (i: number) =>
  `/sequence/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;

type Stage = 0 | 1 | 2 | 3 | 4; // 0 = loading

export default function DeckScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);
  const [stage, setStage] = useState<Stage>(0);
  const introComplete = useIntroComplete();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // ── Preload ────────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let done = 0;
    const finish = () => {
      if (cancelled) return;
      done++;
      setLoaded(done);
      if (done === TOTAL_FRAMES) setReady(true);
    };
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = frameSrc(i);
      img.onload = () => {
        img.decode?.().then(finish).catch(finish);
      };
      img.onerror = finish;
      imgs[i - 1] = img;
    }
    imagesRef.current = imgs;
    return () => { cancelled = true; };
  }, []);

  // ── Canvas resize ──────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  // ── Draw ───────────────────────────────────────────────────────────────────
  const drawFrame = (i: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!ctxRef.current) {
      const c = canvas.getContext("2d", { alpha: false, desynchronized: true });
      if (!c) return;
      c.imageSmoothingEnabled = true;
      c.imageSmoothingQuality = "low";
      ctxRef.current = c;
    }
    const ctx = ctxRef.current;
    const img = imagesRef.current[Math.max(0, Math.min(TOTAL_FRAMES - 1, i))];
    if (!img?.complete || !img.naturalWidth) return;
    const { width: cw, height: ch } = canvas;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
    let dw = cw, dh = ch, dx = 0, dy = 0;
    if (cr > ir) { dh = cw / ir; dy = (ch - dh) / 2; }
    else { dw = ch * ir; dx = (cw - dw) / 2; }
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  // ── rAF scrub loop ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!ready) return;
    let target = 0;
    let cur = 0;
    let lastIdx = -1;
    let raf = 0;
    let live = true;

    const unsub = scrollYProgress.on("change", (p) => {
      target = Math.max(0, Math.min(0.9999, p)) * (TOTAL_FRAMES - 1);
      if (!raf && live) raf = requestAnimationFrame(tick);

      // Stage transitions: pure React state, only when crossing thresholds.
      // Not on every scroll event — avoids re-render spam.
      const s: Stage =
        p < 0.22 ? 1
        : p < 0.48 ? 2
        : p < 0.74 ? 3
        : 4;
      setStage(s);
    });

    const tick = () => {
      if (!live) return;
      cur += (target - cur) * 0.15;
      const idx = Math.round(cur);
      if (idx !== lastIdx) { drawFrame(idx); lastIdx = idx; }
      if (Math.abs(target - cur) < 0.05) { raf = 0; return; }
      raf = requestAnimationFrame(tick);
    };

    if (introComplete) setStage(1);
    drawFrame(0);
    raf = requestAnimationFrame(tick);
    return () => {
      live = false;
      if (raf) cancelAnimationFrame(raf);
      unsub();
    };
  }, [ready, scrollYProgress, introComplete]);

  // When intro completes and frames are ready, kick stage 1
  useEffect(() => {
    if (introComplete && ready && stage === 0) setStage(1);
  }, [introComplete, ready, stage]);

  const pct = Math.round((loaded / TOTAL_FRAMES) * 100);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full bg-[#050505]"
      style={{ height: "400vh" }}
    >
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]"
        initial={{ opacity: 0 }}
        animate={introComplete ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Canvas */}
        <motion.canvas
          ref={canvasRef}
          aria-hidden
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 1.06, filter: "blur(12px)" }}
          animate={introComplete ? { scale: 1, filter: "blur(0px)" } : { scale: 1.06, filter: "blur(12px)" }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Vignette — blends frame edges into #050505 */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center,transparent 50%,#050505 100%)" }} />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-[#050505]" />

        {/* Loader */}
        {!ready && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#050505]">
            <div className="relative w-14 h-14">
              <span className="absolute inset-0 rounded-full border border-white/15" />
              <span className="absolute inset-0 rounded-full border border-transparent border-t-white animate-spin"
                style={{ animationDuration: "0.9s" }} />
            </div>
            <p className="mono-label mt-6">Cueing the decks · {pct}%</p>
          </div>
        )}

        {/* ── Text stages ── CSS-only transitions, no Framer on scroll ── */}
        <div className="absolute inset-0 z-10 pointer-events-none">

          {/* Stage 1 — centered intro */}
          <div className={`deck-stage ${stage === 1 ? "deck-stage--in" : "deck-stage--out"} flex flex-col items-center justify-center text-center px-6 h-full`}>
            <div className="deck-glass rounded-2xl px-8 py-10 md:px-12 md:py-14 max-w-2xl">
              <div className="flex items-center gap-3 mb-6 justify-center">
                <span className="block w-8 h-px bg-white/40" />
                <span className="mono-label">Mysuru · Est. 2019 · 33⅓ RPM</span>
                <span className="block w-8 h-px bg-white/40" />
              </div>
              <h1 className="display text-white text-[13vw] md:text-[8vw] lg:text-[7vw] leading-[0.88]">
                CROSSFADE.
              </h1>
              <p className="serif-it text-white/70 text-xl md:text-2xl mt-5">
                The DJing academy for those who refuse to be average.
              </p>
              <p className="mono-label mt-8 animate-pulse">Scroll to disassemble ↓</p>
            </div>
          </div>

          {/* Stage 2 — left */}
          <div className={`deck-stage deck-stage--left ${stage === 2 ? "deck-stage--in" : "deck-stage--out"} flex items-center h-full px-6 md:px-10`}>
            <div className="deck-glass rounded-2xl px-6 py-8 md:px-8 md:py-10 max-w-md md:max-w-lg">
              <span className="mono-label">01 / The Setup</span>
              <h2 className="display text-white text-5xl md:text-6xl lg:text-7xl mt-4 leading-[0.9]">
                Two decks.<br />One mixer.<br />Zero shortcuts.
              </h2>
              <p className="text-white/70 mt-5 text-base md:text-lg leading-relaxed max-w-sm">
                Industry-grade Pioneer gear — the exact rigs found in working clubs.
              </p>
            </div>
          </div>

          {/* Stage 3 — right */}
          <div className={`deck-stage deck-stage--right ${stage === 3 ? "deck-stage--in" : "deck-stage--out"} flex items-center justify-end h-full px-6 md:px-10`}>
            <div className="deck-glass rounded-2xl px-6 py-8 md:px-8 md:py-10 max-w-md md:max-w-lg text-right">
              <span className="mono-label">02 / Inside the Mix</span>
              <h2 className="display text-white text-5xl md:text-6xl lg:text-7xl mt-4 leading-[0.9]">
                Built for speed.<br />Taught for stage.
              </h2>
              <p className="text-white/70 mt-5 text-base md:text-lg leading-relaxed ml-auto max-w-sm">
                Cueing to crossfade — we teach what&apos;s under the hood.
              </p>
            </div>
          </div>

          {/* Stage 4 — centered CTA */}
          <div className={`deck-stage ${stage === 4 ? "deck-stage--in" : "deck-stage--out"} flex flex-col items-center justify-center text-center px-6 h-full`}>
            <div className="deck-glass rounded-2xl px-8 py-10 md:px-12 md:py-14 max-w-3xl">
              <span className="mono-label">03 / Your Turn</span>
              <h2 className="display text-white text-6xl md:text-8xl lg:text-[7.5rem] mt-4 leading-[0.88]">
                Step behind<br />the decks.
              </h2>
              <p className="serif-it text-white/70 text-xl md:text-2xl mt-6">
                One studio. One mentor. One uncompromising program.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-8 pointer-events-auto">
                <a href="#enroll"
                  className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full text-sm font-medium hover:bg-white/90 transition">
                  Enroll Now <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </a>
                <a href="#program"
                  className="inline-flex items-center gap-3 border border-white/25 text-white px-7 py-4 rounded-full text-sm font-medium hover:border-white/60 hover:bg-white/8 transition">
                  ▶ Explore the Program
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll progress hairline */}
        <motion.div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 w-32 h-px bg-white/15 overflow-hidden z-20"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={introComplete ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="h-full bg-white origin-left"
            style={{ transform: "scaleX(var(--scroll-x,0))", transition: "none" }}
            ref={(el) => {
              if (!el) return;
              scrollYProgress.on("change", (v) => el.style.setProperty("transform", `scaleX(${v})`));
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
