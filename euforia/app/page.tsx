"use client";

import dynamic from "next/dynamic";
import ScrollReveal from "./components/ScrollReveal";
import FireflyOverlay from "./components/FireflyOverlay";

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
  background: "rgba(245, 250, 247, 0.7)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(27, 94, 32, 0.2)",
  borderRadius: "28px",
  padding: "3rem",
  boxShadow: "0 15px 45px rgba(30, 41, 59, 0.08), inset 0 0 30px rgba(255, 255, 255, 0.5)",
};

export default function Home() {
  return (
    <main style={{ position: "relative", minHeight: "100vh", backgroundColor: "#f5faf7" }}>
      <ForestScene />
      <FireflyOverlay />

      {/* ── ATMOSPHERIC GOLDEN JUNGLE RAY OVERLAY ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "radial-gradient(circle at 75% 20%, rgba(255, 235, 59, 0.25) 0%, rgba(245, 250, 247, 0.1) 60%, rgba(226, 245, 236, 0.5) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── ASYMMETRICAL TOP BAR ── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 6%",
          zIndex: 100,
          pointerEvents: "none",
        }}
      >
        {/* Top Left Organic Badge */}
        <div
          style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            padding: "0.7rem 1.6rem",
            borderRadius: "100px",
            border: "1px solid rgba(27, 94, 32, 0.18)",
            boxShadow: "0 6px 20px rgba(15, 118, 110, 0.05)",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#d81b60",
              boxShadow: "0 0 12px #d81b60",
              animation: "breathe 2.5s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "0.95rem",
              fontWeight: 800,
              letterSpacing: "0.15em",
              color: "#3e2723",
            }}
          >
            EUFORIA X
          </span>
        </div>

        {/* Top Right Capsule Navigation */}
        <nav
          style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            gap: "2.2rem",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            padding: "0.75rem 2.4rem",
            borderRadius: "100px",
            border: "1px solid rgba(27, 94, 32, 0.18)",
            boxShadow: "0 6px 25px rgba(15, 118, 110, 0.06)",
          }}
        >
          <a
            href="#about"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.92rem",
              fontWeight: 700,
              color: "#3e2723",
              textDecoration: "none",
              letterSpacing: "0.05em",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#d81b60")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#3e2723")}
          >
            Decades
          </a>
          <a
            href="#events"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.92rem",
              fontWeight: 700,
              color: "#3e2723",
              textDecoration: "none",
              letterSpacing: "0.05em",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#d81b60")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#3e2723")}
          >
            Gatherings
          </a>
          <a
            href="#register"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.92rem",
              fontWeight: 700,
              color: "#3e2723",
              textDecoration: "none",
              letterSpacing: "0.05em",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#d81b60")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#3e2723")}
          >
            Claim Pass
          </a>
        </nav>
      </header>

      {/* ── ASYMMETRICAL EDITORIAL HERO SECTION ── */}
      <section
        id="hero"
        style={{
          ...sectionStyle,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "130px 8% 60px",
          gap: "4rem",
        }}
      >
        {/* Left Side: Editorial Typography */}
        <div style={{ flex: 1.25, textAlign: "left" }}>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(0.85rem, 1.8vw, 1.15rem)",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#1b5e20",
              fontWeight: 800,
              marginBottom: "1rem",
              animation: "fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both",
            }}
          >
            Pillai HOC College Presents
          </p>

          <h1
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "clamp(3.8rem, 9vw, 8rem)",
              fontWeight: 900,
              backgroundImage: "linear-gradient(135deg, #3e2723 20%, #1b5e20 50%, #d81b60 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              margin: "0 0 1.2rem 0",
              animation: "fadeInScale 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both",
            }}
          >
            EUFORIA X
          </h1>

          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.2rem, 2.5vw, 2.0rem)",
              fontWeight: 700,
              color: "#f57c00",
              letterSpacing: "0.05em",
              marginBottom: "2rem",
              animation: "fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both",
            }}
          >
            Roots of Decades — A 10-Year Legacy
          </p>

          <div
            style={{
              width: "180px",
              height: "4px",
              background: "linear-gradient(to right, #1b5e20, #d81b60, transparent)",
              borderRadius: "2px",
              marginBottom: "2rem",
              animation: "fadeInUp 1s ease 0.8s both",
            }}
          />
        </div>

        {/* Right Side: Ancient Tablet Glass Card */}
        <div
          style={{
            flex: 0.85,
            animation: "fadeInScale 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both",
          }}
        >
          <div style={glassCard}>
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.82rem",
                fontWeight: 800,
                color: "#d81b60",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                display: "block",
                marginBottom: "0.8rem",
              }}
            >
              10th Anniversary Reunion
            </span>
            <h3
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "1.8rem",
                color: "#3e2723",
                fontWeight: 800,
                marginBottom: "1.2rem",
                lineHeight: 1.3,
              }}
            >
              Explore the Origins
            </h3>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.98rem",
                color: "#5d4037",
                lineHeight: 1.65,
                marginBottom: "2rem",
              }}
            >
              We stand upon the shoulders of a decade. Join thousands as we fly deep into the ancient jungle gorge,
              unlocking forgotten tribal rhythms, digital relics, and legendary botanical wonders.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
                marginBottom: "2rem",
                background: "rgba(255, 255, 255, 0.45)",
                padding: "1.2rem",
                borderRadius: "16px",
                border: "1px solid rgba(27, 94, 32, 0.15)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.92rem" }}>
                <span style={{ fontWeight: 700, color: "#1b5e20" }}>📅 Oct 15 - 17, 2026</span>
                <span style={{ color: "#f57c00", fontWeight: 800 }}>📍 Temple Campus</span>
              </div>
            </div>

            <a
              href="#register"
              style={{
                display: "block",
                textAlign: "center",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.95rem",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "1.1rem 2rem",
                borderRadius: "100px",
                background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)",
                color: "#ffffff",
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: "0 10px 25px rgba(27, 94, 32, 0.22)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(27, 94, 32, 0.35)";
                e.currentTarget.style.background = "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(27, 94, 32, 0.22)";
                e.currentTarget.style.background = "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)";
              }}
            >
              Claim Pass
            </a>
          </div>
        </div>
      </section>

      {/* ── DECADES TIMELINE SECTION ── */}
      <section id="about" style={{ ...sectionStyle, padding: "8rem 2rem 5rem", maxWidth: "1000px", margin: "0 auto" }}>
        <ScrollReveal>
          <div style={glassCard}>
            <h2
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                textAlign: "center",
                marginBottom: "3.5rem",
                background: "linear-gradient(135deg, #3e2723, #d81b60)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ✦ Decade of Magic (2016-2026) ✦
            </h2>

            {/* Timeline path container */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "2rem",
                position: "relative",
              }}
            >
              {timelineEvents.map((t, idx) => (
                <div
                  key={t.year}
                  style={{
                    position: "relative",
                    background: "rgba(255, 255, 255, 0.45)",
                    border: "1px solid rgba(27, 94, 32, 0.12)",
                    borderRadius: "18px",
                    padding: "1.8rem",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.borderColor = "rgba(216, 27, 96, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "rgba(27, 94, 32, 0.12)";
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "2rem",
                      fontWeight: 900,
                      color: "#d81b60",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {t.year}
                  </h3>
                  <h4
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "1.1rem",
                      color: "#1b5e20",
                      fontWeight: 700,
                      marginBottom: "0.8rem",
                    }}
                  >
                    {t.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.88rem",
                      color: "#5d4037",
                      lineHeight: 1.6,
                    }}
                  >
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
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              textAlign: "center",
              marginBottom: "3.5rem",
              background: "linear-gradient(135deg, #1b5e20, #f57c00)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ✦ Ruins Gatherings ✦
          </h2>
        </ScrollReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.8rem",
          }}
        >
          {events.map((ev, i) => (
            <ScrollReveal key={ev.title} delay={i * 0.08}>
              <div
                style={{
                  ...glassCard,
                  padding: "2.8rem 2.2rem",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                  e.currentTarget.style.borderColor = "rgba(216, 27, 96, 0.4)";
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(216, 27, 96, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.borderColor = "rgba(27, 94, 32, 0.2)";
                  e.currentTarget.style.boxShadow = "0 15px 45px rgba(30, 41, 59, 0.08)";
                }}
              >
                <div style={{ fontSize: "2.8rem", marginBottom: "1.2rem", filter: "drop-shadow(0 4px 10px rgba(27, 94, 32, 0.15))" }}>
                  {ev.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "1.35rem",
                    color: "#3e2723",
                    fontWeight: 800,
                    marginBottom: "0.6rem",
                  }}
                >
                  {ev.title}
                </h3>
                <p style={{ fontFamily: "'Outfit', sans-serif", color: "#5d4037", fontSize: "0.96rem", lineHeight: 1.65 }}>
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
          <div style={{ ...glassCard, textAlign: "center" }}>
            <h2
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                marginBottom: "1.2rem",
                background: "linear-gradient(135deg, #3e2723, #d81b60)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Enter the Decades Gate
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: "#5d4037", marginBottom: "2.4rem", lineHeight: 1.75, fontSize: "1.05rem" }}>
              Honor the history, unlock the future. Claim your digital ruins gatepass today and take part in legendary history.
            </p>
            <button
              id="register-btn"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1.02rem",
                fontWeight: 800,
                letterSpacing: "0.15rem",
                textTransform: "uppercase",
                padding: "1.2rem 3.6rem",
                borderRadius: "100px",
                background: "linear-gradient(135deg, #d81b60 0%, #ad1457 100%)",
                border: "none",
                color: "#ffffff",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: "0 10px 25px rgba(216, 27, 96, 0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(216, 27, 96, 0.55)";
                e.currentTarget.style.background = "linear-gradient(135deg, #e91e63 0%, #d81b60 100%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(216, 27, 96, 0.35)";
                e.currentTarget.style.background = "linear-gradient(135deg, #d81b60 0%, #ad1457 100%)";
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
          padding: "4rem 2rem",
          borderTop: "1px solid rgba(27, 94, 32, 0.18)",
          background: "rgba(245, 250, 247, 0.95)",
        }}
      >
        <p style={{ fontFamily: "'Cinzel', serif", color: "#3e2723", fontSize: "0.95rem", letterSpacing: "0.15em", fontWeight: 800 }}>
          © 2016 - 2026 Euforia — Pillai HOC College. A Decade of Excellence.
        </p>
        <p style={{ fontFamily: "'Outfit', sans-serif", color: "#1b5e20", fontSize: "0.82rem", marginTop: "0.6rem", letterSpacing: "0.05em", fontWeight: 600 }}>
          Crafted with ✦ moss, stones, and beautiful code ✦
        </p>
      </footer>
    </main>
  );
}
