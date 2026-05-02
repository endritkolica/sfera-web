"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? "12px 24px" : "20px 24px",
          background: scrolled ? "rgba(249,249,249,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,51,102,0.08)" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <Link href="#hero" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Image src="/logo.png" alt="Sfera Digital" width={140} height={44} priority style={{ objectFit: "contain" }} />
        </Link>

        {/* Desktop links — hidden on mobile via .nav-desktop-links CSS class */}
        <div className="nav-desktop-links">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.08em",
                color: "var(--cobalt)",
                textDecoration: "none",
                textTransform: "uppercase" as const,
                position: "relative",
                padding: "4px 0",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            style={{
              background: "var(--cobalt)",
              color: "#fff",
              padding: "10px 24px",
              borderRadius: "4px",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: "12px",
              letterSpacing: "0.1em",
              textDecoration: "none",
              textTransform: "uppercase" as const,
              transition: "background 0.3s ease",
              whiteSpace: "nowrap" as const,
            }}
          >
            Let&apos;s Build
          </Link>
        </div>

        {/* Mobile hamburger — shown only on mobile via .nav-mobile-toggle CSS class */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </motion.nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "var(--arctic)",
              zIndex: 999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "40px",
              padding: "0 24px",
            }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", color: "var(--cobalt)", cursor: "pointer" }}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            {/* Logo in mobile menu */}
            <Image src="/logo.png" alt="Sfera Digital" width={140} height={44} style={{ objectFit: "contain", position: "absolute", top: 18, left: 24 }} />

            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(32px, 10vw, 52px)",
                    letterSpacing: "-0.04em",
                    color: "var(--cobalt)",
                    textDecoration: "none",
                    display: "block",
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <Link
                href="#contact"
                onClick={() => setMenuOpen(false)}
                style={{
                  background: "var(--cobalt)",
                  color: "#fff",
                  padding: "14px 40px",
                  borderRadius: "4px",
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: "0.1em",
                  textDecoration: "none",
                  textTransform: "uppercase" as const,
                  display: "inline-block",
                }}
              >
                Let&apos;s Build
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
