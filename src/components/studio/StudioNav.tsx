"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Download, Share2, Undo2, Redo2, ChevronDown, Sun, Moon, Plus, Sparkles } from "lucide-react";
import type { Floor, RecentProject } from "@/lib/studio";

function ProjectSwitcher({
  projectName, projects, onSwitchProject, onNewProject,
}: {
  projectName: string;
  projects: RecentProject[];
  onSwitchProject?: (id: string) => void;
  onNewProject?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("mousedown", onDown); window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-2 h-8 rounded-lg text-[13px] font-medium transition-colors"
        style={{ color: "var(--st-text)", background: open ? "var(--st-hover)" : "transparent" }}
        onMouseEnter={(e) => { if (!open) e.currentTarget.style.background = "var(--st-hover)"; }}
        onMouseLeave={(e) => { if (!open) e.currentTarget.style.background = "transparent"; }}
      >
        {projectName}
        <ChevronDown size={13} style={{ color: "var(--st-text-3)", transform: open ? "rotate(180deg)" : "none", transition: "transform 160ms" }} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="st-glass-float st-lift absolute top-full left-0 mt-2 w-64 rounded-2xl overflow-hidden z-40"
            style={{ background: "var(--st-menu)" }}
          >
            <div className="px-3.5 py-2.5" style={{ borderBottom: "0.5px solid var(--st-border)" }}>
              <p style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--st-text-3)" }}>YOUR PROJECTS</p>
            </div>
            <div className="max-h-[52vh] overflow-y-auto p-1.5">
              {projects.map((p) => {
                const active = p.name === projectName;
                return (
                  <button
                    key={p.id}
                    onClick={() => { onSwitchProject?.(p.id); setOpen(false); }}
                    className="w-full flex items-center gap-2 px-2.5 h-10 rounded-xl transition-colors text-left"
                    style={{ background: active ? "var(--st-hover)" : "transparent" }}
                    onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--st-hover)"; }}
                    onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
                  >
                    <span className="flex-1 min-w-0">
                      <span className="block text-[13px] font-medium truncate" style={{ color: "var(--st-text)" }}>{p.name}</span>
                      <span className="block text-[10.5px] truncate" style={{ color: "var(--st-text-3)" }}>
                        {p.files} {p.files === 1 ? "file" : "files"} · {p.updated}
                      </span>
                    </span>
                    {active && <Check size={14} strokeWidth={2.6} style={{ color: "#7BB13C" }} />}
                  </button>
                );
              })}
            </div>
            <div className="p-1.5" style={{ borderTop: "0.5px solid var(--st-border)" }}>
              <button
                onClick={() => { onNewProject?.(); setOpen(false); }}
                className="w-full flex items-center gap-2.5 px-2.5 h-10 rounded-xl transition-colors text-left"
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--st-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <span className="h-6 w-6 rounded-full inline-flex items-center justify-center shrink-0" style={{ background: "rgba(184,85,43,0.16)", border: "0.5px solid rgba(184,85,43,0.32)" }}>
                  <Plus size={13} strokeWidth={2.6} style={{ color: "#F4A87A" }} />
                </span>
                <span className="flex-1">
                  <span className="block text-[13px] font-semibold" style={{ color: "var(--st-text)" }}>New project</span>
                  <span className="block text-[10.5px]" style={{ color: "var(--st-text-3)" }}>Start a fresh design with Naxsha AI</span>
                </span>
                <Sparkles size={13} style={{ color: "var(--st-text-3)" }} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Mark() {
  return (
    <div className="rounded-[3px] flex items-center justify-center" style={{ background: "var(--st-active)", width: 26, height: 26 }}>
      <svg width={13} height={13} viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M2 12V2L12 12V2" stroke="var(--st-active-text)" strokeWidth="1.6" strokeLinecap="square" />
      </svg>
    </div>
  );
}

export function StudioNav({
  projectName, onExport, theme, onToggleTheme, minimal = false,
  floors = [], activeFloorId, onPickFloor, onAddFloor,
  projects = [], onSwitchProject, onNewProject,
}: {
  projectName: string;
  onExport: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
  minimal?: boolean;
  floors?: Floor[];
  activeFloorId?: string;
  onPickFloor?: (id: string) => void;
  onAddFloor?: () => void;
  projects?: RecentProject[];
  onSwitchProject?: (id: string) => void;
  onNewProject?: () => void;
}) {
  return (
    <header
      className="st-glass st-nav-depth h-16 shrink-0 flex items-center px-5 gap-3 z-30"
      style={{ borderRadius: 0, borderLeft: "none", borderRight: "none", borderTop: "none" }}
    >
      <div className="flex items-center gap-2.5">
        <Mark />
        <span className="mono font-bold hidden sm:inline" style={{ color: "var(--st-text)", fontSize: 12, letterSpacing: "0.18em" }}>NAXSHA</span>
      </div>

      {minimal ? (
        <span className="hidden sm:inline-flex items-center gap-1.5 px-2 h-7 rounded-full" style={{ background: "rgba(184,85,43,0.14)", border: "0.5px solid rgba(184,85,43,0.3)" }}>
          <span style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 10, letterSpacing: "0.1em", color: "var(--st-text-2)" }}>GUIDED SETUP</span>
        </span>
      ) : (
        <>
          <div className="h-5 w-px mx-1" style={{ background: "var(--st-border-2)" }} />

          <ProjectSwitcher
            projectName={projectName}
            projects={projects}
            onSwitchProject={onSwitchProject}
            onNewProject={onNewProject}
          />

          <span className="hidden md:inline-flex items-center gap-1.5 px-2 h-7 rounded-full" style={{ background: "rgba(77,124,15,0.16)", border: "0.5px solid rgba(77,124,15,0.3)" }}>
            <Check size={11} style={{ color: "#7BB13C" }} strokeWidth={3} />
            <span style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 10, letterSpacing: "0.1em", color: "var(--st-text-2)" }}>AUTOSAVED</span>
          </span>

          {/* floor selector */}
          {floors.length > 0 && (
            <>
              <div className="h-5 w-px mx-1 hidden lg:block" style={{ background: "var(--st-border-2)" }} />
              <div className="hidden lg:flex items-center gap-0.5 p-0.5 rounded-full" style={{ background: "var(--st-input)", border: "0.5px solid var(--st-chip-border)" }}>
                {floors.map((f) => {
                  const active = f.id === activeFloorId;
                  return (
                    <button
                      key={f.id}
                      onClick={() => onPickFloor?.(f.id)}
                      className="px-3 h-7 rounded-full text-[12px] font-medium transition-colors"
                      style={{ background: active ? "var(--st-active)" : "transparent", color: active ? "var(--st-active-text)" : "var(--st-text-2)" }}
                      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--st-hover)"; }}
                      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
                    >
                      {f.name.replace(" Floor", "")}
                    </button>
                  );
                })}
                <button
                  onClick={onAddFloor}
                  title="Add floor"
                  className="h-7 w-7 rounded-full inline-flex items-center justify-center transition-colors"
                  style={{ color: "var(--st-text-2)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--st-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <Plus size={14} strokeWidth={2.4} />
                </button>
              </div>
            </>
          )}
        </>
      )}

      <div className="ml-auto flex items-center gap-1.5">
        <button
          onClick={onToggleTheme}
          className="h-8 w-8 rounded-lg inline-flex items-center justify-center transition-colors"
          style={{ color: "var(--st-text-2)" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--st-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          title={theme === "dark" ? "Switch to light" : "Switch to dark"}
        >
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>
        {!minimal && (
          <>
            <button className="h-8 w-8 rounded-lg inline-flex items-center justify-center transition-colors" style={{ color: "var(--st-text-2)" }} title="Undo"
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--st-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <Undo2 size={15} />
            </button>
            <button className="h-8 w-8 rounded-lg inline-flex items-center justify-center transition-colors" style={{ color: "var(--st-text-2)" }} title="Redo"
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--st-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <Redo2 size={15} />
            </button>
            <div className="h-5 w-px mx-1" style={{ background: "var(--st-border-2)" }} />
            <button className="hidden sm:inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[13px] font-medium transition-colors" style={{ color: "var(--st-text)", border: "0.5px solid var(--st-border-2)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--st-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <Share2 size={13} />
              Share
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onExport}
              className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-lg text-[13px] font-semibold text-white"
              style={{ background: "#B8552B" }}
            >
              <Download size={13} strokeWidth={2.4} />
              Export
            </motion.button>
          </>
        )}

        <div className="h-5 w-px mx-1" style={{ background: "var(--st-border-2)" }} />

        <button
          title="deepak@vocso.com"
          className="h-8 w-8 rounded-full inline-flex items-center justify-center text-[11px] font-semibold text-white shrink-0 transition-transform hover:scale-105"
          style={{ background: "#003D7A", border: "0.5px solid var(--st-border-2)", letterSpacing: "0.02em" }}
        >
          DC
        </button>
      </div>
    </header>
  );
}
