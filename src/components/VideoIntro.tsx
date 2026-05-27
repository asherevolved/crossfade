"use client";

import { useEffect, useRef, useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const IntroContext = createContext(false);
export const useIntroComplete = () => useContext(IntroContext);

export default function VideoIntro({ children }: { children?: React.ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // null = not yet decided (SSR safe), true = show intro, false = skip
  const [visible, setVisible] = useState<boolean | null>(null);
  const [exiting, setExiting] = useState(false);
  const dismissed = useRef(false);

  // Client-only: decide whether to show
  useEffect(() => {
    if (sessionStorage.getItem("cf_intro_seen")) {
      setVisible(false);
      return;
    }
    setVisible(true);
    document.documentElement.style.overflow = "hidden";
  }, []);

  // Wire up video events once visible is confirmed
  useEffect(() => {
    if (!visible) return;
    const video = videoRef.current;
    if (!video) return;

    function dismiss() {
      if (dismissed.current) return;
      dismissed.current = true;
      sessionStorage.setItem("cf_intro_seen", "1");
      document.documentElement.style.overflow = "";
      setExiting(true);
      // remove overlay after curtain animation finishes
      setTimeout(() => setVisible(false), 900);
    }

    // Try to play immediately
    video.play().catch(() => {
      // Autoplay blocked — show skip button fallback, also start dismiss
      dismiss();
    });

    video.addEventListener("ended", dismiss);

    // Hard cap: 12 s max regardless
    const cap = setTimeout(dismiss, 12000);

    return () => {
      video.removeEventListener("ended", dismiss);
      clearTimeout(cap);
    };
  }, [visible]);

  // While SSR or not yet decided, render children with intro "not complete"
  const introComplete = visible === false;

  return (
    <IntroContext.Provider value={introComplete}>
      {children}

      <AnimatePresence>
        {visible && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[99999] bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* video */}
            <video
              ref={videoRef}
              src="/intro.mp4"
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* vignette */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)" }}
            />

            {/* curtain wipe panels — only render during exit */}
            {exiting && (
              <>
                {/* left panel */}
                <motion.div
                  className="absolute inset-y-0 left-0 w-1/2 bg-black z-10"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                  style={{ transformOrigin: "left" }}
                />
                {/* right panel */}
                <motion.div
                  className="absolute inset-y-0 right-0 w-1/2 bg-black z-10"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                  style={{ transformOrigin: "right" }}
                />
                {/* full cover lifts up */}
                <motion.div
                  className="absolute inset-0 bg-black z-20"
                  initial={{ y: 0 }}
                  animate={{ y: "-100%" }}
                  transition={{ duration: 0.5, delay: 0.28, ease: [0.76, 0, 0.24, 1] }}
                />
              </>
            )}

            {/* skip button */}
            {!exiting && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                onClick={() => {
                  if (dismissed.current) return;
                  dismissed.current = true;
                  sessionStorage.setItem("cf_intro_seen", "1");
                  document.documentElement.style.overflow = "";
                  setExiting(true);
                  setTimeout(() => setVisible(false), 900);
                }}
                className="absolute bottom-8 right-8 font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 hover:text-white/90 border border-white/15 hover:border-white/50 px-4 py-2 rounded-full transition-all duration-200 z-30"
              >
                Skip ↓
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </IntroContext.Provider>
  );
}
