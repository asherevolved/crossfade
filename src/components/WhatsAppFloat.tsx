"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false);

  const href = "https://wa.link/mn9r2u";

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3">
      {/* Tooltip label */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            key="tooltip"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.18 }}
            className="whitespace-nowrap text-xs font-mono uppercase tracking-widest bg-white text-black px-3 py-1.5 rounded-full shadow-lg select-none"
          >
            Chat on WhatsApp
          </motion.span>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Crossfade on WhatsApp"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-white text-black shadow-[0_0_0_1px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-shadow duration-300"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full border border-white/40 animate-wa-pulse" />

        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="26"
          height="26"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16 1C7.716 1 1 7.716 1 16c0 2.628.68 5.1 1.872 7.25L1 31l7.963-1.845A14.93 14.93 0 0 0 16 31c8.284 0 15-6.716 15-15S24.284 1 16 1zm0 27.4a12.33 12.33 0 0 1-6.29-1.722l-.45-.268-4.728 1.096 1.127-4.607-.296-.474A12.36 12.36 0 0 1 3.6 16C3.6 9.148 9.148 3.6 16 3.6S28.4 9.148 28.4 16 22.852 28.4 16 28.4zm6.77-9.27c-.37-.185-2.19-1.08-2.53-1.203-.34-.123-.587-.185-.834.185s-.956 1.203-1.173 1.45c-.216.247-.432.278-.802.093-.37-.185-1.562-.575-2.977-1.836-1.1-.98-1.843-2.19-2.06-2.56-.216-.37-.023-.57.163-.754.167-.165.37-.432.555-.648.185-.216.247-.37.37-.617.123-.247.062-.463-.03-.648-.093-.185-.835-2.01-1.143-2.752-.301-.722-.607-.624-.834-.635l-.71-.012a1.363 1.363 0 0 0-.988.463c-.34.37-1.296 1.265-1.296 3.086s1.327 3.58 1.512 3.826c.185.247 2.61 3.986 6.326 5.59.884.382 1.573.61 2.11.78.886.282 1.693.242 2.33.147.711-.106 2.19-.895 2.5-1.76.308-.864.308-1.605.216-1.76-.092-.154-.34-.247-.71-.432z" />
        </svg>
      </motion.a>
    </div>
  );
}
