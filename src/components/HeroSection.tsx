"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import CircuitSphere from "./CircuitSphere";

interface HeroContent { badge?: string; h1?: string; h1accent?: string; subtitle?: string; }

export default function HeroSection({ content }: { content?: HeroContent }) {
  const c = { badge: "Software Agency · Est. 2024", h1: "Architects", h1accent: "of Identity.", subtitle: "Merging graphic design precision with network-grade engineering to build digital ecosystems that endure.", ...content };
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const h = (e: MouseEvent) => setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  return (
    <section id="hero" className="blueprint-grid noise" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: "100px", background: "var(--arctic)" }}>
      <div style={{ position: "absolute", top: "20%", left: 0, width: "40vw", height: "1px", background: "linear-gradient(90deg, transparent, var(--circuit-blue) 60%, transparent)", opacity: 0.3 }} />
      <div style={{ position: "absolute", bottom: "30%", right: 0, width: "30vw", height: "1px", background: "linear-gradient(270deg, transparent, var(--circuit-blue) 60%, transparent)", opacity: 0.2 }} />
      <svg style={{ position: "absolute", top: 100, left: 40, opacity: 0.15 }} width="60" height="60" viewBox="0 0 60 60" fill="none"><path d="M0 60 L0 0 L60 0" stroke="#003366" strokeWidth="1.5" /></svg>
      <svg style={{ position: "absolute", bottom: 40, right: 40, opacity: 0.15 }} width="60" height="60" viewBox="0 0 60 60" fill="none"><path d="M60 0 L60 60 L0 60" stroke="#003366" strokeWidth="1.5" /></svg>

      <div className="hero-grid" style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        <div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }} style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "32px" }}>
            <span style={{ width: "32px", height: "1px", background: "var(--circuit-blue)" }} />
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--circuit-blue)" }}>{c.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8, ease: [0.23, 1, 0.32, 1] }} style={{ fontSize: "clamp(44px, 7vw, 96px)", fontWeight: 900, lineHeight: 0.95, color: "var(--cobalt)", marginBottom: "28px" }}>
            {c.h1}<br /><span style={{ color: "var(--circuit-blue)" }}>{c.h1accent}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7 }} style={{ fontSize: "clamp(15px, 2vw, 17px)", fontWeight: 300, color: "var(--slate)", lineHeight: 1.75, maxWidth: "480px", marginBottom: "48px" }}>
            {c.subtitle}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} style={{ display: "flex", gap: "16px", flexWrap: "wrap" as const }}>
            <MagneticButton href="#portfolio" variant="primary">View Portfolio</MagneticButton>
            <MagneticButton href="#contact" variant="outline">Start a Project</MagneticButton>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }} style={{ display: "flex", gap: "clamp(24px, 4vw, 48px)", marginTop: "64px", paddingTop: "32px", borderTop: "1px solid rgba(0,51,102,0.1)", flexWrap: "wrap" as const }}>
            {[{ val: "2+", label: "Projects Delivered" }, { val: "100%", label: "Lighthouse Score" }, { val: "∞", label: "Scalable Systems" }].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: "clamp(22px, 3vw, 28px)", color: "var(--cobalt)", letterSpacing: "-0.04em" }}>{stat.val}</div>
                <div style={{ fontSize: "11px", fontWeight: 400, color: "var(--slate)", letterSpacing: "0.05em", textTransform: "uppercase" as const, marginTop: "4px" }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 1 }} style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }} className="hero-sphere">
          <CircuitSphere mouseX={mousePos.x} mouseY={mousePos.y} />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", color: "var(--slate)", textTransform: "uppercase" as const }}>Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--circuit-blue), transparent)" }} />
      </motion.div>
    </section>
  );
}
