"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 h-24 flex items-center justify-between px-[6%] z-50 pointer-events-none"
    >
      {/* Logo Pill Capsule */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="pointer-events-auto flex items-center gap-3 bg-white/75 backdrop-blur-xl px-6 py-3 rounded-full border border-emerald-950/15 shadow-[0_6px_20px_rgba(15,118,110,0.04)]"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-600 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-600 shadow-[0_0_12px_#e65100]"></span>
        </span>
        <span className="font-['Cinzel_Decorative'] font-extrabold text-sm tracking-[0.16em] text-stone-850">
          EUFORIAX
        </span>
      </motion.div>

      {/* Navigation Capsule Menu */}
      <nav className="pointer-events-auto flex items-center gap-9 bg-white/80 backdrop-blur-xl px-10 py-3.5 rounded-full border border-emerald-950/15 shadow-[0_6px_25px_rgba(15,118,110,0.05)]">
        {["Decades", "Gatherings", "Claim Pass"].map((item, idx) => {
          const href = idx === 0 ? "#about" : idx === 1 ? "#events" : "#register";
          return (
            <motion.a
              key={item}
              href={href}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="font-['Outfit'] text-[14.5px] font-bold text-stone-800 tracking-wide hover:text-orange-600 transition-colors duration-300"
            >
              {item}
            </motion.a>
          );
        })}
      </nav>
    </motion.header>
  );
}
