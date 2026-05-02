"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

interface ContactContent { label?: string; heading?: string; description?: string; email?: string; linkedin?: string; github?: string; }

const LinkedinIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>);
const GithubIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>);

export default function ContactSection({ content }: { content?: ContactContent }) {
  const c = { label: "Get In Touch", heading: "Let's Architect.", description: "Have a project in mind? Let's connect and architect something exceptional together.", email: "hello@sferadigital.com", linkedin: "linkedin.com/in/sferadigital", github: "github.com/sferadigital", ...content };
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const inputStyle: React.CSSProperties = { width: "100%", padding: "16px 20px", background: "var(--arctic)", border: "1px solid rgba(0,51,102,0.12)", borderRadius: "4px", fontSize: "15px", fontWeight: 300, fontFamily: "'Inter',sans-serif", color: "var(--cobalt)", outline: "none", transition: "border-color 0.2s", cursor: "none" };

  return (
    <section id="contact" ref={ref} className="section-pad" style={{ padding: "140px 24px", background: "var(--arctic-dim)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,51,102,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,51,102,0.04) 1px,transparent 1px)", backgroundSize: "80px 80px", pointerEvents: "none" }} />
      <div className="contact-grid" style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <span style={{ width: "32px", height: "1px", background: "var(--circuit-blue)" }} />
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--circuit-blue)" }}>{c.label}</span>
          </div>
          <h2 style={{ fontSize: "clamp(36px,4.5vw,68px)", fontWeight: 900, color: "var(--cobalt)", lineHeight: 1, marginBottom: "28px" }}>{c.heading}</h2>
          <p style={{ fontSize: "clamp(14px,2vw,16px)", fontWeight: 300, color: "var(--slate)", lineHeight: 1.75, maxWidth: "440px", marginBottom: "48px" }}>{c.description}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[{ icon: Mail, label: c.email, href: `mailto:${c.email}`, isLucide: true },
              { icon: LinkedinIcon, label: c.linkedin, href: "#", isLucide: false },
              { icon: GithubIcon, label: c.github, href: "#", isLucide: false }
            ].map((link) => {
              const Icon = link.icon;
              return (
                <a key={link.label} href={link.href} style={{ display: "flex", alignItems: "center", gap: "14px", fontFamily: "'Montserrat',sans-serif", fontWeight: 500, fontSize: "clamp(12px,1.5vw,14px)", color: "var(--cobalt)", textDecoration: "none", cursor: "none" }} data-cursor-hover>
                  <span style={{ width: "40px", height: "40px", border: "1px solid rgba(0,51,102,0.15)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {link.isLucide ? <Icon size={16} /> : <Icon />}
                  </span>
                  {link.label}
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }}>
          {sent ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "300px", gap: "20px", textAlign: "center" }}>
              <div style={{ width: "72px", height: "72px", background: "var(--cobalt)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowRight size={28} color="#fff" /></div>
              <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "28px", color: "var(--cobalt)", letterSpacing: "-0.04em" }}>Message Sent.</h3>
              <p style={{ fontSize: "15px", fontWeight: 300, color: "var(--slate)" }}>We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[{ id: "cn", label: "Your Name", type: "text", ph: "Jane Doe", key: "name" as const },
                { id: "ce", label: "Email Address", type: "email", ph: "jane@company.com", key: "email" as const }].map(f => (
                <div key={f.id}>
                  <label htmlFor={f.id} style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--cobalt)", display: "block", marginBottom: "8px" }}>{f.label}</label>
                  <input id={f.id} type={f.type} required placeholder={f.ph} value={form[f.key]} onChange={e => setForm(s => ({ ...s, [f.key]: e.target.value }))} style={inputStyle} onFocus={e => (e.target.style.borderColor = "var(--circuit-blue)")} onBlur={e => (e.target.style.borderColor = "rgba(0,51,102,0.12)")} />
                </div>
              ))}
              <div>
                <label htmlFor="cm" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--cobalt)", display: "block", marginBottom: "8px" }}>Your Project</label>
                <textarea id="cm" required rows={5} placeholder="Tell us about your project..." value={form.message} onChange={e => setForm(s => ({ ...s, message: e.target.value }))} style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }} onFocus={e => (e.target.style.borderColor = "var(--circuit-blue)")} onBlur={e => (e.target.style.borderColor = "rgba(0,51,102,0.12)")} />
              </div>
              <button type="submit" id="contact-submit" style={{ background: "var(--cobalt)", color: "#fff", padding: "16px 32px", borderRadius: "4px", fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase" as const, border: "none", cursor: "none", display: "flex", alignItems: "center", gap: "8px", transition: "background 0.3s", alignSelf: "flex-start" }} data-cursor-hover>
                Send Message <ArrowRight size={16} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
