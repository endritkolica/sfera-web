"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Zap, Globe } from "lucide-react";

interface PricingContent { label?: string; heading?: string; description?: string; ctaHeading?: string; ctaButton?: string; }

export default function PricingSection({ content }: { content?: PricingContent }) {
  const c = { label: "Solo Agility", heading: "The Model.", description: "The efficiency of a solo operator wielding enterprise-grade tooling. No fiscal hardware overhead—pure digital integration and cloud-based solutions.", ctaHeading: "Let's build something that endures.", ctaButton: "Start a Conversation", ...content };
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" ref={ref} className="section-pad" style={{ padding: "140px 24px", maxWidth: "1400px", margin: "0 auto" }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ marginBottom: "64px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <span style={{ width: "32px", height: "1px", background: "var(--circuit-blue)" }} />
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--circuit-blue)" }}>{c.label}</span>
        </div>
        <h2 style={{ fontSize: "clamp(36px,5vw,72px)", fontWeight: 900, color: "var(--cobalt)", lineHeight: 1, marginBottom: "20px" }}>{c.heading}</h2>
        <p style={{ fontSize: "clamp(14px,2vw,16px)", fontWeight: 300, color: "var(--slate)", maxWidth: "560px", lineHeight: 1.75 }}>{c.description}</p>
      </motion.div>

      <div className="grid-3" style={{ marginBottom: "48px" }}>
        {[{ icon: Zap, title: "Zero Overhead", desc: "No hardware costs, no office overhead. Every euro goes into pure craft and execution." },
          { icon: Globe, title: "Cloud-Native", desc: "Fully cloud-based fiscal solutions with automated pipelines—scalable from day one." },
          { icon: CheckCircle2, title: "AI-Augmented", desc: "Vibe-coding methodology combines human architectural thinking with AI velocity." }
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.12 + 0.2, duration: 0.7 }}
              style={{ background: "var(--arctic-dim)", border: "1px solid rgba(0,51,102,0.08)", borderRadius: "8px", padding: "clamp(28px,4vw,40px)" }}>
              <div style={{ width: "48px", height: "48px", border: "1px solid rgba(0,51,102,0.15)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}><Icon size={22} color="var(--circuit-blue)" /></div>
              <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "clamp(16px,2vw,18px)", color: "var(--cobalt)", letterSpacing: "-0.03em", marginBottom: "12px" }}>{item.title}</h3>
              <p style={{ fontSize: "clamp(13px,1.5vw,14px)", fontWeight: 300, color: "var(--slate)", lineHeight: 1.7 }}>{item.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5, duration: 0.7 }}
        className="pricing-cta" style={{ background: "var(--cobalt)", borderRadius: "12px", padding: "64px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(0,85,164,0.5) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)", marginBottom: "12px" }}>Ready to architect?</div>
          <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "clamp(26px,3vw,44px)", color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.1 }}>{c.ctaHeading}</h3>
        </div>
        <a href="#contact" style={{ background: "#fff", color: "var(--cobalt)", padding: "16px 40px", borderRadius: "4px", fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase" as const, textDecoration: "none", whiteSpace: "nowrap" as const, position: "relative", zIndex: 1, flexShrink: 0, cursor: "none" }} data-cursor-hover>{c.ctaButton}</a>
      </motion.div>
    </section>
  );
}
