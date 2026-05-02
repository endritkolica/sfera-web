"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { LogOut, Save, Eye, Check, AlertCircle, Lock } from "lucide-react";

type Content = Record<string, unknown>;

const SECTIONS = ["hero", "portfolio", "services", "pricing", "contact", "footer"];
const SECTION_LABELS: Record<string, string> = {
  hero: "🏠 Hero", portfolio: "💼 Portfolio", services: "⚙️ Services",
  pricing: "💰 Pricing", contact: "✉️ Contact", footer: "📄 Footer",
};

// ── Reusable field components ──────────────────────────────
function Field({ label, value, onChange, multiline = false }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean;
}) {
  const base: React.CSSProperties = {
    width: "100%", padding: "10px 14px", borderRadius: "6px",
    border: "1.5px solid rgba(0,51,102,0.15)", background: "#fff",
    fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#003366",
    outline: "none", resize: multiline ? "vertical" : undefined,
    minHeight: multiline ? "90px" : undefined, transition: "border-color 0.2s",
  };
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#64748b", marginBottom: "6px" }}>{label}</label>
      {multiline
        ? <textarea style={base} value={value} rows={3} onChange={e => onChange(e.target.value)} onFocus={e => (e.target.style.borderColor = "#0055A4")} onBlur={e => (e.target.style.borderColor = "rgba(0,51,102,0.15)")} />
        : <input style={base} value={value} onChange={e => onChange(e.target.value)} onFocus={e => (e.target.style.borderColor = "#0055A4")} onBlur={e => (e.target.style.borderColor = "rgba(0,51,102,0.15)")} />
      }
    </div>
  );
}

// ── Section editors ────────────────────────────────────────
function HeroEditor({ data, set }: { data: Record<string,string>; set: (d: Record<string,string>) => void }) {
  const u = (k: string) => (v: string) => set({ ...data, [k]: v });
  return (<>
    <Field label="Badge Text" value={data.badge ?? ""} onChange={u("badge")} />
    <Field label="Headline Line 1" value={data.h1 ?? ""} onChange={u("h1")} />
    <Field label="Headline Line 2 (accent)" value={data.h1accent ?? ""} onChange={u("h1accent")} />
    <Field label="Subtitle" value={data.subtitle ?? ""} onChange={u("subtitle")} multiline />
  </>);
}

function PortfolioEditor({ data, set }: { data: Record<string,unknown>; set: (d: Record<string,unknown>) => void }) {
  const projects = (data.projects ?? []) as Record<string,unknown>[];
  const updateProject = (i: number, k: string, v: string) => {
    const p = projects.map((proj, idx) => idx === i ? { ...proj, [k]: v } : proj);
    set({ ...data, projects: p });
  };
  const updateTags = (i: number, v: string) => {
    const tags = v.split(",").map(t => t.trim()).filter(Boolean);
    const p = projects.map((proj, idx) => idx === i ? { ...proj, tags } : proj);
    set({ ...data, projects: p });
  };
  return (<>
    <Field label="Section Label" value={(data.label as string) ?? ""} onChange={v => set({ ...data, label: v })} />
    <Field label="Section Heading" value={(data.heading as string) ?? ""} onChange={v => set({ ...data, heading: v })} />
    {projects.map((proj, i) => (
      <div key={i} style={{ background: "rgba(0,51,102,0.04)", borderRadius: "8px", padding: "16px", marginBottom: "16px", border: "1px solid rgba(0,51,102,0.1)" }}>
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "12px", color: "#0055A4", marginBottom: "12px", letterSpacing: "0.08em" }}>PROJECT {(proj.number as string) ?? String(i+1)}</div>
        <Field label="Title" value={(proj.title as string) ?? ""} onChange={v => updateProject(i, "title", v)} />
        <Field label="Location" value={(proj.location as string) ?? ""} onChange={v => updateProject(i, "location", v)} />
        <Field label="Category" value={(proj.category as string) ?? ""} onChange={v => updateProject(i, "category", v)} />
        <Field label="Description" value={(proj.description as string) ?? ""} onChange={v => updateProject(i, "description", v)} multiline />
        <Field label="Tags (comma-separated)" value={((proj.tags as string[]) ?? []).join(", ")} onChange={v => updateTags(i, v)} />
      </div>
    ))}
  </>);
}

function ServicesEditor({ data, set }: { data: Record<string,unknown>; set: (d: Record<string,unknown>) => void }) {
  const items = (data.items ?? []) as Record<string,unknown>[];
  const updateItem = (i: number, k: string, v: string) => {
    const updated = items.map((item, idx) => idx === i ? { ...item, [k]: v } : item);
    set({ ...data, items: updated });
  };
  const updateFeatures = (i: number, v: string) => {
    const features = v.split(",").map(f => f.trim()).filter(Boolean);
    const updated = items.map((item, idx) => idx === i ? { ...item, features } : item);
    set({ ...data, items: updated });
  };
  return (<>
    <Field label="Section Label" value={(data.label as string) ?? ""} onChange={v => set({ ...data, label: v })} />
    <Field label="Section Heading" value={(data.heading as string) ?? ""} onChange={v => set({ ...data, heading: v })} />
    {items.map((item, i) => (
      <div key={i} style={{ background: "rgba(0,51,102,0.04)", borderRadius: "8px", padding: "16px", marginBottom: "16px", border: "1px solid rgba(0,51,102,0.1)" }}>
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "12px", color: "#0055A4", marginBottom: "12px" }}>SERVICE {i+1}</div>
        <Field label="Title" value={(item.title as string) ?? ""} onChange={v => updateItem(i, "title", v)} />
        <Field label="Subtitle" value={(item.subtitle as string) ?? ""} onChange={v => updateItem(i, "subtitle", v)} />
        <Field label="Description" value={(item.description as string) ?? ""} onChange={v => updateItem(i, "description", v)} multiline />
        <Field label="Features (comma-separated)" value={((item.features as string[]) ?? []).join(", ")} onChange={v => updateFeatures(i, v)} />
      </div>
    ))}
  </>);
}

function PricingEditor({ data, set }: { data: Record<string,string>; set: (d: Record<string,string>) => void }) {
  const u = (k: string) => (v: string) => set({ ...data, [k]: v });
  return (<>
    <Field label="Section Label" value={data.label ?? ""} onChange={u("label")} />
    <Field label="Section Heading" value={data.heading ?? ""} onChange={u("heading")} />
    <Field label="Description" value={data.description ?? ""} onChange={u("description")} multiline />
    <Field label="CTA Heading" value={data.ctaHeading ?? ""} onChange={u("ctaHeading")} />
    <Field label="CTA Button Text" value={data.ctaButton ?? ""} onChange={u("ctaButton")} />
  </>);
}

function ContactEditor({ data, set }: { data: Record<string,string>; set: (d: Record<string,string>) => void }) {
  const u = (k: string) => (v: string) => set({ ...data, [k]: v });
  return (<>
    <Field label="Section Label" value={data.label ?? ""} onChange={u("label")} />
    <Field label="Heading" value={data.heading ?? ""} onChange={u("heading")} />
    <Field label="Description" value={data.description ?? ""} onChange={u("description")} multiline />
    <Field label="Email" value={data.email ?? ""} onChange={u("email")} />
    <Field label="LinkedIn Handle" value={data.linkedin ?? ""} onChange={u("linkedin")} />
    <Field label="GitHub Handle" value={data.github ?? ""} onChange={u("github")} />
  </>);
}

function FooterEditor({ data, set }: { data: Record<string,string>; set: (d: Record<string,string>) => void }) {
  return <Field label="Tagline" value={data.tagline ?? ""} onChange={v => set({ ...data, tagline: v })} multiline />;
}

// ── Login Screen ───────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    const res = await fetch("/api/cms/login", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) onLogin();
    else setError(data.error || "Login failed");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#001f3f", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',sans-serif" }}>
      <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "48px", width: "100%", maxWidth: "420px", backdropFilter: "blur(20px)" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <Image src="/logo.png" alt="Sfera Digital" width={160} height={50} style={{ objectFit: "contain", filter: "brightness(0) invert(1)", marginBottom: "12px" }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", color: "rgba(255,255,255,0.5)", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", fontWeight: 600 }}>
            <Lock size={12} /> Admin Panel
          </div>
        </div>
        <form onSubmit={submit}>
          {[{ id: "cms-user", label: "Username", val: username, set: setUsername, type: "text" },
            { id: "cms-pass", label: "Password", val: password, set: setPassword, type: "password" }
          ].map(f => (
            <div key={f.id} style={{ marginBottom: "16px" }}>
              <label htmlFor={f.id} style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "8px", fontFamily: "'Montserrat',sans-serif" }}>{f.label}</label>
              <input id={f.id} type={f.type} required value={f.val} onChange={e => f.set(e.target.value)}
                style={{ width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.12)", borderRadius: "8px", color: "#fff", fontSize: "14px", outline: "none", fontFamily: "'Inter',sans-serif" }} />
            </div>
          ))}
          {error && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "6px", padding: "10px 14px", marginBottom: "16px", color: "#fca5a5", fontSize: "13px" }}>
              <AlertCircle size={14} /> {error}
            </div>
          )}
          <button type="submit" disabled={loading}
            style={{ width: "100%", padding: "13px", background: "#0055A4", color: "#fff", border: "none", borderRadius: "8px", fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", opacity: loading ? 0.7 : 1, transition: "background 0.2s" }}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Main CMS Dashboard ─────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [content, setContent] = useState<Content | null>(null);
  const [saved, setSaved] = useState<string>("");
  const [activeSection, setActiveSection] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null);

  const showToast = (type: "ok" | "err", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const loadContent = async () => {
    const res = await fetch("/api/cms/content");
    if (res.status === 401) { setAuthed(false); return; }
    const data = await res.json();
    setContent(data); setSaved(JSON.stringify(data)); setAuthed(true);
  };

  useEffect(() => { loadContent(); }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/cms/save", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) { setSaved(JSON.stringify(content)); showToast("ok", "Content saved successfully!"); }
      else showToast("err", "Save failed. Please try again.");
    } catch { showToast("err", "Network error."); }
    setSaving(false);
  };

  const handleLogout = async () => {
    await fetch("/api/cms/logout", { method: "POST" });
    setAuthed(false); setContent(null);
  };

  const setSection = (key: string, val: unknown) => setContent(prev => prev ? { ...prev, [key]: val } : prev);

  if (authed === null) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#001f3f" }}>
      <div style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter',sans-serif", fontSize: "14px" }}>Loading…</div>
    </div>
  );

  if (!authed) return <LoginScreen onLogin={loadContent} />;

  const hasChanges = JSON.stringify(content) !== saved;

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter',sans-serif", background: "#f0f2f5" }}>

      {/* Sidebar */}
      <aside style={{ width: "240px", background: "#003366", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "24px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <Image src="/logo.png" alt="Sfera Digital" width={130} height={40} style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} />
          <div style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", marginTop: "8px" }}>Content Manager</div>
        </div>
        <nav style={{ flex: 1, padding: "12px 0" }}>
          {SECTIONS.map(s => (
            <button key={s} onClick={() => setActiveSection(s)}
              style={{ display: "flex", alignItems: "center", width: "100%", padding: "12px 20px", background: activeSection === s ? "rgba(0,85,164,0.5)" : "transparent", border: "none", borderLeft: activeSection === s ? "3px solid #0055A4" : "3px solid transparent", color: activeSection === s ? "#fff" : "rgba(255,255,255,0.55)", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: "13px", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
              {SECTION_LABELS[s]}
            </button>
          ))}
        </nav>
        <div style={{ padding: "16px" }}>
          <a href="/" target="_blank" rel="noopener"
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", background: "rgba(255,255,255,0.07)", borderRadius: "6px", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "12px", fontWeight: 600, marginBottom: "8px", fontFamily: "'Montserrat',sans-serif", letterSpacing: "0.05em" }}>
            <Eye size={14} /> View Site
          </a>
          <button onClick={handleLogout}
            style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", padding: "10px 14px", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px", color: "#fca5a5", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "'Montserrat',sans-serif", letterSpacing: "0.05em" }}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* Main area */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Top bar */}
        <header style={{ background: "#fff", borderBottom: "1px solid rgba(0,51,102,0.1)", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "18px", color: "#003366", letterSpacing: "-0.03em", margin: 0 }}>{SECTION_LABELS[activeSection]}</h1>
            {hasChanges && <div style={{ fontSize: "11px", color: "#f59e0b", fontWeight: 600, marginTop: "2px" }}>● Unsaved changes</div>}
          </div>
          <button onClick={handleSave} disabled={saving || !hasChanges}
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 24px", background: hasChanges ? "#003366" : "#94a3b8", color: "#fff", border: "none", borderRadius: "6px", fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", cursor: hasChanges ? "pointer" : "default", transition: "background 0.2s" }}>
            {saving ? "Saving…" : <><Save size={14} /> Save Changes</>}
          </button>
        </header>

        {/* Form area */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px" }}>
          <div style={{ maxWidth: "720px", background: "#fff", borderRadius: "12px", padding: "32px", border: "1px solid rgba(0,51,102,0.08)", boxShadow: "0 1px 8px rgba(0,51,102,0.06)" }}>
            {content && activeSection === "hero" && <HeroEditor data={content.hero as Record<string,string>} set={v => setSection("hero", v)} />}
            {content && activeSection === "portfolio" && <PortfolioEditor data={content.portfolio as Record<string,unknown>} set={v => setSection("portfolio", v)} />}
            {content && activeSection === "services" && <ServicesEditor data={content.services as Record<string,unknown>} set={v => setSection("services", v)} />}
            {content && activeSection === "pricing" && <PricingEditor data={content.pricing as Record<string,string>} set={v => setSection("pricing", v)} />}
            {content && activeSection === "contact" && <ContactEditor data={content.contact as Record<string,string>} set={v => setSection("contact", v)} />}
            {content && activeSection === "footer" && <FooterEditor data={content.footer as Record<string,string>} set={v => setSection("footer", v)} />}
          </div>
        </div>
      </main>

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: "32px", right: "32px", display: "flex", alignItems: "center", gap: "10px", padding: "14px 20px", borderRadius: "8px", background: toast.type === "ok" ? "#10b981" : "#ef4444", color: "#fff", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: "13px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", zIndex: 9999 }}>
          {toast.type === "ok" ? <Check size={16} /> : <AlertCircle size={16} />} {toast.msg}
        </div>
      )}
    </div>
  );
}
