"use client";
import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

interface FooterContent { tagline?: string; }

const LinkedinIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>);
const GithubIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>);

export default function Footer({ content }: { content?: FooterContent }) {
  const tagline = content?.tagline ?? "Swiss minimalism meets high-end engineering. Building digital ecosystems that endure.";

  return (
    <footer style={{ background: "var(--cobalt-dark)", padding: "64px 24px 40px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, var(--circuit-blue), transparent)", opacity: 0.5 }} />
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div className="footer-grid">
          <div>
            <Image src="/logo.png" alt="Sfera Digital" width={140} height={44} style={{ objectFit: "contain", filter: "brightness(0) invert(1)", marginBottom: "20px" }} />
            <p style={{ fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, maxWidth: "320px" }}>{tagline}</p>
          </div>
          <div>
            <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)", marginBottom: "20px" }}>Navigation</div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {["Portfolio", "Services", "Pricing", "Contact"].map(item => (
                <li key={item}><Link href={`#${item.toLowerCase()}`} style={{ fontSize: "14px", fontWeight: 300, color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)", marginBottom: "20px" }}>Connect</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[{ Icon: Mail, label: "Email", href: "mailto:hello@sferadigital.com", isLucide: true },
                { Icon: LinkedinIcon, label: "LinkedIn", href: "#", isLucide: false },
                { Icon: GithubIcon, label: "GitHub", href: "#", isLucide: false }
              ].map(({ Icon, label, href, isLucide }) => (
                <a key={label} href={href} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", fontWeight: 300, color: "rgba(255,255,255,0.55)", textDecoration: "none", cursor: "none" }} data-cursor-hover>
                  {isLucide ? <Icon size={14} /> : <Icon />} {label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" as const }}>
          <span style={{ fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.25)", fontFamily: "'Inter',sans-serif" }}>© {new Date().getFullYear()} Sfera Digital. All rights reserved.</span>
          <span style={{ fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.25)", fontFamily: "'Inter',sans-serif" }}>Swiss Minimalism · High-End Engineering</span>
        </div>
      </div>
    </footer>
  );
}
