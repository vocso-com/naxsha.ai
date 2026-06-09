"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  MousePointer2, Hand, Sofa, Ruler, Frame, RectangleHorizontal, DoorOpen, Type,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TOOLS, FURNITURE, type ToolId, type FurnitureKind, formatINR } from "@/lib/studio";

const ICONS: Record<ToolId, LucideIcon> = {
  select: MousePointer2,
  pan: Hand,
  furniture: Sofa,
  measure: Ruler,
  wall: Frame,
  window: RectangleHorizontal,
  door: DoorOpen,
  text: Type,
};

export function Toolbar({
  tool, onTool, placingKind, onPlacing,
}: {
  tool: ToolId;
  onTool: (t: ToolId) => void;
  placingKind: FurnitureKind | null;
  onPlacing: (k: FurnitureKind | null) => void;
}) {
  const groups = Array.from(new Set(FURNITURE.map((f) => f.group)));

  return (
    <div className="relative flex flex-col items-center">
      {/* furniture flyout — opens upward, anchored to the left of the rail */}
      <AnimatePresence>
        {tool === "furniture" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="st-glass-float w-60 rounded-2xl overflow-hidden absolute bottom-full mb-2 left-1/2 -translate-x-1/2"
          >
            <div className="px-3.5 py-3" style={{ borderBottom: "0.5px solid var(--st-border)" }}>
              <p style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--st-text-2)" }}>FURNITURE LIBRARY</p>
              <p className="text-[12px] mt-1" style={{ color: placingKind ? "#F4A87A" : "var(--st-text-2)" }}>
                {placingKind ? "Click on the plan to place it" : "Select a piece below"}
              </p>
            </div>
            <div className="max-h-[46vh] overflow-y-auto p-2">
              {groups.map((g) => (
                <div key={g} className="mb-2">
                  <p className="px-1.5 py-1" style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 9.5, letterSpacing: "0.1em", color: "var(--st-text-3)" }}>{g.toUpperCase()}</p>
                  {FURNITURE.filter((f) => f.group === g).map((f) => {
                    const sel = placingKind === f.kind;
                    return (
                      <button
                        key={f.kind}
                        onClick={() => onPlacing(sel ? null : f.kind)}
                        className="w-full flex items-center justify-between px-2 h-9 rounded-lg transition-colors text-left"
                        style={{ background: sel ? "rgba(184,85,43,0.2)" : "transparent", border: sel ? "0.5px solid rgba(184,85,43,0.5)" : "0.5px solid transparent" }}
                        onMouseEnter={(e) => { if (!sel) e.currentTarget.style.background = "var(--st-hover)"; }}
                        onMouseLeave={(e) => { if (!sel) e.currentTarget.style.background = "transparent"; }}
                      >
                        <span className="text-[13px]" style={{ color: "var(--st-text)" }}>{f.label}</span>
                        <span style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 10.5, color: "var(--st-text-3)" }}>
                          {f.cost ? formatINR(f.cost) : `${f.w}×${f.h}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* horizontal tool rail */}
      <div className="st-glass-float flex items-center gap-0.5 p-1 rounded-2xl">
        {TOOLS.map((t, i) => {
          const Icon = ICONS[t.id];
          const active = tool === t.id;
          return (
            <div key={t.id} className="flex items-center">
              {i > 0 && <div className="w-px self-stretch my-1.5 mx-1" style={{ background: "var(--st-border)" }} />}
              <button
                onClick={() => { onTool(t.id); if (t.id !== "furniture") onPlacing(null); }}
                title={t.functional ? `${t.label} · ${t.shortcut}` : `${t.label} · preview · ${t.shortcut}`}
                className="relative h-9 pl-2 pr-2.5 rounded-xl inline-flex items-center gap-1 transition-colors"
                style={{ background: active ? "#B8552B" : "transparent", color: active ? "#fff" : "var(--st-text-2)", opacity: active || t.functional ? 1 : 0.5 }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--st-hover)"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                <Icon size={15} />
                <span className="text-[12px] font-medium whitespace-nowrap">{t.label}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
