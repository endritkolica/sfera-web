"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface Project { id: string; number: string; title: string; location: string; category: string; description: string; tags: string[]; }
interface PortfolioContent { label?: string; heading?: string; projects?: Project[]; }

const DEFAULT_PROJECTS: Project[] = [
  { id: "hl-ekonomi", number: "01", title: "HL Ekonomi", location: "Stockholm, Sweden", category: "Financial Consultancy", description: "A full-service digital transformation for a Swedish financial consultancy.", tags: ["Next.js", "TypeScript", "Framer Motion", "Brand Identity"] },
  { id: "kulla-web", number: "02", title: "KullaWeb", location: "Digital Agency", category: "Web Architecture", description: "High-fidelity web architecture and branding for a digital agency.", tags: ["React", "GSAP", "CSS Architecture", "Scalable Design"] },
];

export default function PortfolioSection({ content }: { content?: PortfolioContent }) {
  const c = { label: "Selected Work", heading: "The Showcase.", projects: DEFAULT_PROJECTS, ...content };
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" ref={ref} className="section-pad" style={{ padding: "140px 24px", maxWidth: "1400px", margin: "0 auto" }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ marginBottom: "64px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <span style={{ width: "32px", height: "1px", background: "var(--circuit-blue)" }} />
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--circuit-blue)" }}>{c.label}</span>
        </div>
        <h2 style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 900, color: "var(--cobalt)", lineHeight: 1 }}>{c.heading}</h2>
      </motion.div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {c.projects.map((project, i) => (
          <motion.div key={project.id} initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.15 + 0.2, duration: 0.7 }}
            style={{ background: "rgba(0,51,102,0.04)", border: "1px solid rgba(0,51,102,0.08)", borderRadius: "8px", padding: "clamp(24px, 4vw, 48px) clamp(20px, 4vw, 56px)" }}
            whileHover={{ background: "rgba(0,85,164,0.07)", borderColor: "rgba(0,85,164,0.2)", y: -4 }}>
            <div className="portfolio-card-inner">
              <div className="portfolio-card-number" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: "80px", color: "rgba(0,51,102,0.07)", lineHeight: 1, letterSpacing: "-0.05em", userSelect: "none" as const }}>{project.number}</div>
              <div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "0.15em", color: "var(--circuit-blue)", textTransform: "uppercase" as const, marginBottom: "12px" }}>{project.location} · {project.category}</div>
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: "clamp(22px, 3vw, 32px)", color: "var(--cobalt)", letterSpacing: "-0.04em", marginBottom: "16px" }}>{project.title}</h3>
                <p style={{ fontSize: "clamp(13px, 1.5vw, 15px)", fontWeight: 300, color: "var(--slate)", lineHeight: 1.75, maxWidth: "560px", marginBottom: "24px" }}>{project.description}</p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" as const }}>
                  {project.tags.map((tag) => (
                    <span key={tag} style={{ padding: "4px 12px", border: "1px solid rgba(0,51,102,0.2)", borderRadius: "2px", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--cobalt)" }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="portfolio-card-arrow" style={{ width: "48px", height: "48px", border: "1px solid rgba(0,51,102,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cobalt)", flexShrink: 0 }}>
                <ExternalLink size={18} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
