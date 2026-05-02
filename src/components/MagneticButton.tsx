"use client";
import { useRef, ReactNode } from "react";
import Link from "next/link";

interface Props {
  children: ReactNode;
  href: string;
  variant: "primary" | "outline";
}

export default function MagneticButton({ children, href, variant }: Props) {
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };

  const handleMouseLeave = () => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.transform = "translate(0, 0)";
  };

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "14px 32px",
    borderRadius: "4px",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 700,
    fontSize: "13px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    textDecoration: "none",
    transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease",
    cursor: "none",
  };

  const primaryStyle: React.CSSProperties = {
    ...baseStyle,
    background: "var(--cobalt)",
    color: "#fff",
    boxShadow: "0 4px 24px rgba(0,51,102,0.25)",
  };

  const outlineStyle: React.CSSProperties = {
    ...baseStyle,
    background: "transparent",
    color: "var(--cobalt)",
    border: "1.5px solid var(--cobalt)",
  };

  return (
    <Link
      ref={btnRef}
      href={href}
      style={variant === "primary" ? primaryStyle : outlineStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
    >
      {children}
      {variant === "primary" && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M1 7H13M7 1L13 7L7 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </Link>
  );
}
