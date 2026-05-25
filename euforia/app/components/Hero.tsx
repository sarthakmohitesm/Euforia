"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.35,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 35, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1], // Premium cinematic ease
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-height-[100vh] flex items-center px-[8%] py-[130px] z-10 pointer-events-none"
      style={{ minHeight: "100vh" }}
    >
      {/* Editorial typography container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[850px] text-left pointer-events-auto"
      >
        {/* Presenter Capsule Tag */}
        <motion.p
          variants={itemVariants}
          className="font-['Outfit'] text-[clamp(13px,1.6vw,17.5px)] tracking-[0.38em] uppercase text-emerald-800 font-extrabold mb-5"
        >
          Pillai HOC College Presents
        </motion.p>

        {/* Masterpiece Cinematic Title */}
        <motion.h1
          variants={itemVariants}
          className="font-['Cinzel_Decorative'] text-[clamp(62px,8vw,118px)] font-black leading-[0.9] tracking-tight bg-gradient-to-br from-[#3e2723] via-[#2e5d38] to-[#e65100] bg-clip-text text-transparent select-none filter drop-shadow-[0_2px_15px_rgba(27,94,32,0.03)]"
        >
          EUFORIAX
        </motion.h1>

        {/* Cinematic Subheading */}
        <motion.p
          variants={itemVariants}
          className="font-['Outfit'] text-[clamp(21px,3.2vw,35px)] italic font-medium text-orange-700 tracking-wide mt-4"
        >
          Roots of Decades – A 10-Year Legacy
        </motion.p>

        {/* Premium Gold-Orange Gradient Decorative Bar */}
        <motion.div
          variants={itemVariants}
          className="h-[3px] w-48 mt-8 rounded-full bg-gradient-to-r from-orange-600 via-orange-400 to-transparent shadow-[0_2px_8px_rgba(230,81,0,0.25)]"
        />
      </motion.div>
    </section>
  );
}
