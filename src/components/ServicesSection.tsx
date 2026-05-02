"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Code2, Shield } from "lucide-react";

interface ServiceItem { id: string; title: string; subtitle: string; description: string; features: string[]; }
interface ServicesContent { label?: string; heading?: string; items?: ServiceItem[]; }

const ICONS: Record<string, React.ElementType> = { identity: Cpu, webdev: Code2, network: Shield };
const DEFAULT_ITEMS: ServiceItem[] = [
  { id: "identity", title: "Identity Engineering", subtitle: "Beyond Logos", description: "We architect technical design systems—living, scalable frameworks that encode brand DNA into every pixel.", features: ["Brand DNA System", "Component Libraries", "Design Token Architecture", "Cross-Platform Consistency"] },
  { id: "webdev", title: "Next-Gen Web Dev", subtitle: "Vibe-Coding Methodology", description: "Rapid, AI-assisted development without sacrificing architectural integrity. 100/100 Lighthouse scores.", features: ["Next.js App Router", "TypeScript-First", "AI-Assisted Workflows", "Performance Obsession"] },
  { id: "network", title: "Network & Security", subtitle: "CCNA-Level Infrastructure", description: "Enterprise-grade security protocols and network architecture for data-sensitive environments.", features: ["CCNA Infrastructure", "Zero-Trust Architecture", "Cloud Security", "Compliance Frameworks"] },
];

export default function ServicesSection({ content }: { content?: ServicesContent }) {
  const c = { label: "The Hybrid Approach", heading: "Services.", items: DEFAULT_ITEMS, ...content };
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={ref} className="section-pad-dark" style={{ background: "var(--cobalt)", padding: "140px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "80px 80px", pointerEvents: "none" }} />
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ marginBottom: "64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <span style={{ width: "32px", height: "1px", background: "rgba(255,255,255,0.4)" }} />
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.5)" }}>{c.label}</span>
          </div>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{c.heading}</h2>
        </motion.div>
        <div className="grid-3">
          {c.items.map((item, i) => {
            const Icon = ICONS[item.id] ?? Cpu;
            return (
              <motion.div key={item.id} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15 + 0.2, duration: 0.7 }}
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "clamp(28px,4vw,48px) clamp(24px,4vw,40px)" }}
                whileHover={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(0,85,164,0.5)", y: -6 }}>
                <div style={{ width: "56px", height: "56px", border: "1px solid rgba(0,85,164,0.4)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "32px", background: "rgba(0,85,164,0.12)" }}>
                  <Icon size={24} color="rgba(0,180,255,0.9)" />
                </div>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(0,180,255,0.7)", marginBottom: "10px" }}>{item.subtitle}</div>
                <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "clamp(18px,2.5vw,22px)", color: "#fff", letterSpacing: "-0.03em", marginBottom: "16px", lineHeight: 1.2 }}>{item.title}</h3>
                <p style={{ fontSize: "clamp(13px,1.5vw,14px)", fontWeight: 300, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "32px" }}>{item.description}</p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {item.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
                      <span style={{ width: "16px", height: "1px", background: "rgba(0,85,164,0.8)", flexShrink: 0 }} />{f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
