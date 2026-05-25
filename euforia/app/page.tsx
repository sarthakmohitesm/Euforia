"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import ScrollReveal from "./components/ScrollReveal";
import FireflyOverlay from "./components/FireflyOverlay";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const ForestScene = dynamic(() => import("./components/ForestScene"), {
  ssr: false,
});

const timelineEvents = [
  { year: "2016", title: "The Sprout", desc: "The initial seed was planted. A humble gathering of creative engineering students celebrating technology and design." },
  { year: "2019", title: "The Canopy", desc: "Euforia grew into a massive inter-collegiate marvel, spreading its green branches to welcome over 8,000 attendees." },
  { year: "2023", title: "Bioluminescence", desc: "We fused fantasy and WebGL tech, introducing interactive 3D arts, night spectacles, and digital wizardry." },
  { year: "2026", title: "Roots of Decades", desc: "Celebrating 10 years of magic. Reconnecting with our ancient origins, historical legacy, and future green innovations." },
];

const events = [
  { icon: "🏺", title: "Ancient Dramatics", desc: "Epic, classical, and modern theater performances under the stone temple gateway" },
  { icon: "🥁", title: "Relic Soundclash", desc: "Tribal rhythms and sunny rock bands battling under the wild moss canopy" },
  { icon: "📜", title: "Chamber of Art", desc: "Visual masterpieces and carvings inspired by Mayan, Indian, and ancient fantasy runes" },
  { icon: "🧚‍♀️", title: "Nymph Dance", desc: "Dynamic, modern and classical choreography channeling the ancient forest spirits" },
  { icon: "🎙️", title: "Gorge Open Mic", desc: "Acoustic poetry, tribal stories, and stand-up comedy amidst the golden sunbeams" },
  { icon: "💻", title: "Seed Hackathon", desc: "Planting tech innovations in agricultural and sustainable engineering solutions" },
];

const sectionStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 2,
  pointerEvents: "auto",
};

// Sunlit Ancient Stone Glassmorphic Card
const glassCard: React.CSSProperties = {
  background: "rgba(245, 250, 247, 0.75)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(27, 94, 32, 0.18)",
  borderRadius: "28px",
  padding: "3rem",
  boxShadow: "0 15px 45px rgba(30, 41, 59, 0.06), inset 0 0 30px rgba(255, 255, 255, 0.5)",
};

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#dfe5de] overflow-x-hidden selection:bg-orange-200 selection:text-orange-900">
      
      {/* ── CINEMATIC PHOTOREALISTIC BACKGROUND IMAGE OVERLAY ── */}
      <div className="absolute top-0 left-0 right-0 h-screen z-0 overflow-hidden select-none pointer-events-none">
        <Image
          src="/forest-ruins-bg.png"
          alt="Cinematic Forest Temple Ruins Landscape Background"
          fill
          priority
          className="object-cover object-center scale-[1.01] brightness-[0.97] contrast-[1.01] saturate-[1.05]"
        />
        {/* Apple-level smooth gradient vignettes for premium blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#dfe5de]/20 via-transparent to-[#dfe5de] opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#dfe5de] via-transparent to-[#dfe5de]/10 opacity-90" />
      </div>

      {/* ── DYNAMIC 3D WEBGL ENGINE & DRIFTING PARTICLES ── */}
      <ForestScene />
      <FireflyOverlay />

      {/* ── PREMIUM INTERACTIVE NAVBAR ── */}
      <Navbar />

      {/* ── STAGGERED ELEVATED HERO SECTION ── */}
      <Hero />

      {/* ── DECADES TIMELINE SECTION ── */}
      <section id="about" style={{ ...sectionStyle, padding: "8rem 2rem 5rem", maxWidth: "1000px", margin: "0 auto" }}>
        <ScrollReveal>
          <div style={glassCard}>
            <h2
              className="font-['Cinzel_Decorative'] text-[clamp(28px,4vw,45px)] text-center font-black mb-[3.5rem] bg-gradient-to-r from-[#3e2723] to-[#e65100] bg-clip-text text-transparent"
            >
              ✦ Decade of Magic (2016-2026) ✦
            </h2>

            {/* Timeline path container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {timelineEvents.map((t, idx) => (
                <div
                  key={t.year}
                  className="relative bg-white/40 border border-emerald-950/10 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-500/40 hover:bg-white/60 hover:shadow-lg"
                >
                  <h3 className="font-['Cinzel'] text-3xl font-black text-orange-600 mb-2">
                    {t.year}
                  </h3>
                  <h4 className="font-['Cinzel'] text-[17px] text-emerald-800 font-bold mb-3">
                    {t.title}
                  </h4>
                  <p className="font-['Outfit'] text-[14px] text-stone-700 leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── WONDERLAND GATHERINGS EVENTS ── */}
      <section id="events" style={{ ...sectionStyle, padding: "6rem 2rem 8rem", maxWidth: "1200px", margin: "0 auto" }}>
        <ScrollReveal>
          <h2
            className="font-['Cinzel_Decorative'] text-[clamp(28px,4vw,45px)] text-center font-black mb-[3.5rem] bg-gradient-to-r from-emerald-800 to-orange-600 bg-clip-text text-transparent"
          >
            ✦ Ruins Gatherings ✦
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {events.map((ev, i) => (
            <ScrollReveal key={ev.title} delay={i * 0.08}>
              <div
                style={{
                  ...glassCard,
                  padding: "2.8rem 2.2rem",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
                className="transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:border-orange-500/40 hover:shadow-[0_15px_40px_rgba(230,81,0,0.06)]"
              >
                <div className="text-[44px] mb-5 filter drop-shadow-[0_4px_10px_rgba(27,94,32,0.12)]">
                  {ev.icon}
                </div>
                <h3 className="font-['Cinzel'] text-[21px] text-stone-850 font-extrabold mb-3">
                  {ev.title}
                </h3>
                <p className="font-['Outfit'] text-stone-650 text-[15px] leading-relaxed">
                  {ev.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── REGISTER / CALL TO ACTION ── */}
      <section id="register" style={{ ...sectionStyle, padding: "4rem 2rem 10rem", maxWidth: "700px", margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ ...glassCard, textAlign: "center" }} className="flex flex-col items-center">
            <h2
              className="font-['Cinzel_Decorative'] text-[clamp(24px,3.5vw,36px)] font-black mb-5 bg-gradient-to-r from-[#3e2723] to-[#e65100] bg-clip-text text-transparent"
            >
              Enter the Decades Gate
            </h2>
            <p className="font-['Outfit'] text-stone-700 mb-9 leading-relaxed text-[16.5px] max-w-[550px]">
              Honor the history, unlock the future. Claim your digital ruins gatepass today and take part in legendary history.
            </p>
            <button
              id="register-btn"
              className="font-['Outfit'] text-base font-extrabold tracking-[0.16em] uppercase px-12 py-[1.1rem] rounded-full text-white bg-gradient-to-r from-orange-600 to-orange-800 border-none cursor-pointer transition-all duration-500 shadow-[0_10px_25px_rgba(230,81,0,0.3)] hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(230,81,0,0.45)] hover:from-orange-500 hover:to-orange-700"
            >
              Register Now
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          ...sectionStyle,
          textAlign: "center",
          padding: "4rem 2rem",
          borderTop: "1px solid rgba(27, 94, 32, 0.18)",
          background: "rgba(223, 229, 222, 0.95)",
        }}
      >
        <p className="font-['Cinzel'] text-stone-850 text-[15px] tracking-[0.15em] font-extrabold">
          © 2016 - 2026 Euforia — Pillai HOC College. A Decade of Excellence.
        </p>
        <p className="font-['Outfit'] text-emerald-800 text-[13px] mt-2 tracking-wider font-semibold">
          Crafted with ✦ moss, stones, and beautiful code ✦
        </p>
      </footer>
    </main>
  );
}
