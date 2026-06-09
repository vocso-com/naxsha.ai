"use client";

import { motion } from "motion/react";
import { Sparkles, PenLine, ArrowRight, ArrowUpRight, FileStack } from "lucide-react";

type Project = { id: string; name: string; files: number; updated: string; glyph: "plan" | "render" | "blank" };

const RECENTS: Project[] = [
  { id: "p1", name: "Rao Residence", files: 3, updated: "just now", glyph: "plan" },
  { id: "p2", name: "Sharma Villa", files: 4, updated: "2 months ago", glyph: "render" },
  { id: "p3", name: "Untitled home", files: 0, updated: "2 months ago", glyph: "blank" },
  { id: "p4", name: "Iyer Bungalow", files: 6, updated: "5 months ago", glyph: "plan" },
  { id: "p5", name: "Mehta Apartment", files: 2, updated: "6 months ago", glyph: "render" },
  { id: "p6", name: "Reddy Farmhouse", files: 5, updated: "8 months ago", glyph: "plan" },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return "Burning the midnight oil";
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function MiniThumb({ glyph }: { glyph: Project["glyph"] }) {
  const stroke = "var(--st-text-2)";
  const accent = "var(--st-active)";
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: "var(--st-input)" }}>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          opacity: 0.4,
          backgroundImage:
            "linear-gradient(var(--st-grid) 0.5px, transparent 0.5px), linear-gradient(90deg, var(--st-grid) 0.5px, transparent 0.5px)",
          backgroundSize: "8px 8px",
        }}
      />
      {glyph === "plan" && (
        <svg viewBox="0 0 60 48" width="100%" height="100%" fill="none" className="relative" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(10 8)" stroke={stroke} strokeWidth="1.3">
            <rect x="0" y="0" width="40" height="32" rx="1.5" />
            <line x1="23" y1="0" x2="23" y2="32" />
            <line x1="0" y1="18" x2="23" y2="18" />
            <rect x="3" y="3" width="17" height="12" fill={accent} opacity="0.16" stroke="none" />
          </g>
        </svg>
      )}
      {glyph === "render" && (
        <svg viewBox="0 0 60 48" width="100%" height="100%" fill="none" className="relative" preserveAspectRatio="xMidYMid meet">
          <g stroke={stroke} strokeWidth="1.3">
            <rect x="9" y="8" width="18" height="14" rx="1.5" fill={accent} opacity="0.14" />
            <rect x="33" y="8" width="18" height="14" rx="1.5" />
            <rect x="9" y="26" width="18" height="13" rx="1.5" />
            <rect x="33" y="26" width="18" height="13" rx="1.5" fill={accent} opacity="0.14" />
          </g>
        </svg>
      )}
      {glyph === "blank" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <FileStack size={16} style={{ color: "var(--st-text-3)" }} />
        </div>
      )}
    </div>
  );
}

export function HomeScreen({
  onGenerate, onDraw, onOpenProject,
}: {
  onGenerate: () => void;
  onDraw: () => void;
  onOpenProject: (id: string) => void;
}) {
  return (
    <div className="absolute inset-0 overflow-y-auto">
      <div className="min-h-full w-full flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex flex-col items-center"
          style={{ maxWidth: 560 }}
        >
          {/* greeting — centered */}
          <p className="text-center" style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 11, letterSpacing: "0.14em", color: "var(--st-text-3)" }}>
            {greeting().toUpperCase()}, DEEPAK
          </p>
          <h1 className="font-semibold tracking-tight mt-1.5 text-center" style={{ color: "var(--st-text)", fontSize: 30, letterSpacing: "-0.02em" }}>
            Let&apos;s draft your next home.
          </h1>

          {/* CTA box — primary (AI) + secondary (blank) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="st-glass rounded-[24px] p-2.5 w-full mt-8"
          >
            {/* primary CTA */}
            <motion.button
              onClick={onGenerate}
              whileTap={{ scale: 0.992 }}
              className="group relative w-full flex items-center gap-3.5 rounded-[18px] p-4 text-left overflow-hidden"
              style={{ background: "linear-gradient(135deg, #C25E33 0%, #A8491F 100%)" }}
            >
              <span
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 60%)" }}
              />
              <span className="relative shrink-0 h-11 w-11 rounded-2xl inline-flex items-center justify-center" style={{ background: "rgba(255,255,255,0.16)", border: "0.5px solid rgba(255,255,255,0.28)" }}>
                <Sparkles size={19} className="text-white" />
              </span>
              <span className="relative min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-white">Draft with Naxsha AI</span>
                <span className="block text-[12px] mt-0.5" style={{ color: "rgba(255,255,255,0.78)" }}>
                  Describe your home — get a vastu-ready plan in seconds
                </span>
              </span>
              <span className="relative shrink-0 h-8 w-8 rounded-full inline-flex items-center justify-center transition-transform group-hover:translate-x-0.5" style={{ background: "rgba(255,255,255,0.16)" }}>
                <ArrowRight size={16} strokeWidth={2.4} className="text-white" />
              </span>
            </motion.button>

            {/* secondary CTA */}
            <button
              onClick={onDraw}
              className="group w-full flex items-center gap-3.5 rounded-[18px] p-4 mt-1.5 text-left transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--st-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span className="shrink-0 h-11 w-11 rounded-2xl inline-flex items-center justify-center" style={{ background: "var(--st-input)", border: "0.5px solid var(--st-chip-border)" }}>
                <PenLine size={18} style={{ color: "var(--st-text-2)" }} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold" style={{ color: "var(--st-text)" }}>Draw from scratch</span>
                <span className="block text-[12px] mt-0.5" style={{ color: "var(--st-text-3)" }}>
                  Start on a blank canvas and design it yourself
                </span>
              </span>
              <span className="shrink-0 transition-transform group-hover:translate-x-0.5" style={{ color: "var(--st-text-3)" }}>
                <ArrowRight size={16} strokeWidth={2.2} />
              </span>
            </button>
          </motion.div>

          {/* recents — two-column premium strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="w-full mt-9"
          >
            <div className="flex items-center gap-2 mb-3 px-0.5">
              <span style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 10.5, letterSpacing: "0.12em", color: "var(--st-text-3)" }}>
                RECENT
              </span>
              <div className="flex-1 h-px" style={{ background: "var(--st-border)" }} />
            </div>
            <div className="grid grid-cols-2 gap-3.5">
              {RECENTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onOpenProject(p.id)}
                  className="st-glass-float group flex flex-col rounded-2xl overflow-hidden text-left transition-transform hover:-translate-y-0.5"
                >
                  <span className="block w-full relative" style={{ height: 108, borderBottom: "0.5px solid var(--st-border)" }}>
                    <MiniThumb glyph={p.glyph} />
                    <span className="absolute top-2 right-2 h-6 w-6 rounded-full inline-flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "var(--st-glass-bg, rgba(0,0,0,0.35))", backdropFilter: "blur(6px)" }}>
                      <ArrowUpRight size={14} style={{ color: "var(--st-text)" }} />
                    </span>
                  </span>
                  <span className="px-3 py-2.5 min-w-0">
                    <span className="block text-[13px] font-semibold truncate" style={{ color: "var(--st-text)" }}>{p.name}</span>
                    <span className="block text-[10.5px] mt-0.5 truncate" style={{ color: "var(--st-text-3)" }}>
                      {p.files} {p.files === 1 ? "file" : "files"} · {p.updated}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
