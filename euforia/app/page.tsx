"use client";

import dynamic from "next/dynamic";
import ScrollReveal from "./components/ScrollReveal";
import FireflyOverlay from "./components/FireflyOverlay";

const ForestScene = dynamic(() => import("./components/ForestScene"), {
  ssr: false,
});

const events = [
  { icon: "🎭", title: "Dramatics", desc: "Theater performances that transcend reality" },
  { icon: "🎵", title: "Battle of Bands", desc: "Electrifying musical showdowns under the canopy" },
  { icon: "🎨", title: "Art Exhibition", desc: "Visual masterpieces inspired by enchanted realms" },
  { icon: "💃", title: "Dance Wars", desc: "Rhythmic battles beneath the moonlit forest" },
  { icon: "🎤", title: "Open Mic", desc: "Voices echoing through the mystical woods" },
  { icon: "🧩", title: "Hackathon", desc: "Code magic in the heart of the enchanted grove" },
];

const sectionStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 2,
  pointerEvents: "auto",
};

const glassCard: React.CSSProperties = {
  background: "rgba(10, 38, 21, 0.55)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(0, 255, 136, 0.15)",
  borderRadius: "20px",
  padding: "2.5rem",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 60px rgba(0, 255, 136, 0.03)",
};

export default function Home() {
  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      <ForestScene />
      <FireflyOverlay />

      {/* ── HERO ── */}
      <section
        id="hero"
        style={{
          ...sectionStyle,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(0.8rem, 1.5vw, 1.1rem)",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#66bb6a",
            marginBottom: "1rem",
            animation: "fadeInUp 1s ease 0.2s both",
          }}
        >
          Pillai HOC College Presents
        </p>

        <h1
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "clamp(3rem, 10vw, 8rem)",
            fontWeight: 900,
            background: "linear-gradient(135deg, #00ff88 0%, #ffd700 40%, #00ff88 70%, #3ad8c8 100%)",
            backgroundSize: "300% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmer 4s ease infinite, fadeInUp 1s ease 0.4s both",
            textShadow: "none",
            lineHeight: 1.1,
            marginBottom: "1.5rem",
          }}
        >
          EUFORIA
        </h1>

        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
            color: "#a5d6a7",
            letterSpacing: "0.15em",
            animation: "fadeInUp 1s ease 0.6s both",
            marginBottom: "0.5rem",
          }}
        >
          ✦ The Enchanted Forest Awaits ✦
        </p>

        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
            color: "#66bb6a",
            letterSpacing: "0.1em",
            animation: "fadeInUp 1s ease 0.8s both",
            marginBottom: "3rem",
          }}
        >
          October 15 — 17, 2026
        </p>

        <a
          href="#events"
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "1rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "1rem 3rem",
            borderRadius: "50px",
            background: "linear-gradient(135deg, rgba(0,255,136,0.2), rgba(0,255,136,0.05))",
            border: "1px solid rgba(0,255,136,0.4)",
            color: "#00ff88",
            textDecoration: "none",
            cursor: "pointer",
            transition: "all 0.4s ease",
            animation: "fadeInUp 1s ease 1s both",
            boxShadow: "0 0 30px rgba(0,255,136,0.15)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(0,255,136,0.35), rgba(0,255,136,0.15))";
            e.currentTarget.style.boxShadow = "0 0 50px rgba(0,255,136,0.3)";
            e.currentTarget.style.transform = "translateY(-3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(0,255,136,0.2), rgba(0,255,136,0.05))";
            e.currentTarget.style.boxShadow = "0 0 30px rgba(0,255,136,0.15)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Enter the Forest
        </a>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            animation: "floatSlow 3s ease-in-out infinite",
          }}
        >
          <span style={{ fontSize: "0.75rem", color: "#66bb6a", letterSpacing: "0.2em" }}>SCROLL</span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, #00ff88, transparent)",
            }}
          />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ ...sectionStyle, padding: "6rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
        <ScrollReveal>
          <div style={glassCard}>
            <h2
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                textAlign: "center",
                marginBottom: "1.5rem",
                background: "linear-gradient(135deg, #00ff88, #3ad8c8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ✦ Welcome to the Grove ✦
            </h2>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1.1rem",
                lineHeight: 1.8,
                color: "#a5d6a7",
                textAlign: "center",
              }}
            >
              Deep within the enchanted corridors of Pillai HOC College, an ancient magic stirs
              once more. <strong style={{ color: "#00ff88" }}>Euforia 2026</strong> beckons you into
              a realm where creativity intertwines with wonder, where every corner holds a new
              adventure, and where the forest itself comes alive with the energy of a thousand voices.
              Three days of music, art, drama, dance, and innovation — all wrapped in the ethereal
              beauty of our magical forest theme.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ── EVENTS ── */}
      <section id="events" style={{ ...sectionStyle, padding: "4rem 2rem 8rem", maxWidth: "1200px", margin: "0 auto" }}>
        <ScrollReveal>
          <h2
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              textAlign: "center",
              marginBottom: "3rem",
              background: "linear-gradient(135deg, #ffd700, #00ff88)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ✦ Enchanted Events ✦
          </h2>
        </ScrollReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {events.map((ev, i) => (
            <ScrollReveal key={ev.title} delay={i * 0.1}>
              <div
                style={{
                  ...glassCard,
                  padding: "2rem",
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                  e.currentTarget.style.borderColor = "rgba(0,255,136,0.4)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,255,136,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.borderColor = "rgba(0,255,136,0.15)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.4)";
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{ev.icon}</div>
                <h3
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "1.3rem",
                    color: "#00ff88",
                    marginBottom: "0.5rem",
                  }}
                >
                  {ev.title}
                </h3>
                <p style={{ fontFamily: "'Outfit', sans-serif", color: "#a5d6a7", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  {ev.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── CTA / REGISTER ── */}
      <section id="register" style={{ ...sectionStyle, padding: "4rem 2rem 10rem", maxWidth: "700px", margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ ...glassCard, textAlign: "center" }}>
            <h2
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                marginBottom: "1rem",
                background: "linear-gradient(135deg, #00ff88, #ffd700)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Answer the Call
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: "#a5d6a7", marginBottom: "2rem", lineHeight: 1.7 }}>
              The forest whispers your name. Register now and claim your place among the chosen.
            </p>
            <button
              id="register-btn"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "1rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "1rem 3rem",
                borderRadius: "50px",
                background: "linear-gradient(135deg, #00ff88, #0ecc6e)",
                border: "none",
                color: "#030a06",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.4s ease",
                boxShadow: "0 0 30px rgba(0,255,136,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
                e.currentTarget.style.boxShadow = "0 0 60px rgba(0,255,136,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(0,255,136,0.3)";
              }}
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
          padding: "3rem 2rem",
          borderTop: "1px solid rgba(0,255,136,0.1)",
          background: "rgba(3,10,6,0.8)",
        }}
      >
        <p style={{ fontFamily: "'Cinzel', serif", color: "#66bb6a", fontSize: "0.9rem", letterSpacing: "0.1em" }}>
          © 2026 Euforia — Pillai HOC College. All Rights Reserved.
        </p>
        <p style={{ fontFamily: "'Outfit', sans-serif", color: "#3e6e4a", fontSize: "0.75rem", marginTop: "0.5rem" }}>
          Crafted with ✦ magic and code ✦
        </p>
      </footer>
    </main>
  );
}
