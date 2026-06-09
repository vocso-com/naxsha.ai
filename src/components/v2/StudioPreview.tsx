"use client";

import { motion } from "motion/react";
import {
  Check,
  Compass,
  ClipboardList,
  LayoutGrid,
  Receipt,
  FileText,
  Sparkles,
  ArrowDownRight,
  Layers,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { HeroFloorplan } from "./HeroFloorplan";
import { formatINR } from "@/lib/floorplan";

const STEPS = [
  { num: "01", label: "Plot details", icon: Compass, status: "done" as const, hint: "30 × 40 · south" },
  { num: "02", label: "Requirements", icon: ClipboardList, status: "done" as const, hint: "3 BHK · 4 people" },
  { num: "03", label: "Layout", icon: LayoutGrid, status: "active" as const, hint: "3 variants" },
  { num: "04", label: "Cost & BoQ", icon: Receipt, status: "todo" as const, hint: "estimate, vendors" },
  { num: "05", label: "Export", icon: FileText, status: "todo" as const, hint: "PDF · DWG · CSV" },
];

const MATERIALS = [
  { name: "Cement (OPC 53)", qty: "480", unit: "bags" },
  { name: "TMT Steel", qty: "4.2", unit: "t" },
  { name: "Red brick", qty: "32,400", unit: "nos" },
  { name: "Vitrified tile", qty: "1,080", unit: "sf" },
];

function StepRow({ s, last }: { s: (typeof STEPS)[number]; last: boolean }) {
  const active = s.status === "active";
  const done = s.status === "done";
  return (
    <div className="relative flex gap-3">
      {!last && (
        <span
          aria-hidden
          className="absolute left-[15px] top-9 bottom-[-12px] w-px"
          style={{
            background: done || active
              ? "var(--color-naxsha-tint)"
              : "var(--color-mist)",
          }}
        />
      )}
      <div className="shrink-0">
        <div
          className="h-8 w-8 rounded-full flex items-center justify-center"
          style={{
            background: active
              ? "var(--color-naxsha)"
              : done
              ? "var(--color-naxsha-tint)"
              : "var(--color-card)",
            border: done ? "0.5px solid var(--color-naxsha-tint)" : "0.5px solid var(--color-mist)",
          }}
        >
          {done ? (
            <Check size={13} strokeWidth={2.5} className="text-naxsha" />
          ) : (
            <span
              className="mono text-[10px] font-semibold"
              style={{
                color: active ? "#FFFFFF" : "var(--color-graphite-soft)",
                letterSpacing: "0.06em",
              }}
            >
              {s.num}
            </span>
          )}
        </div>
      </div>
      <div className="flex-1 pb-4">
        <div
          className="text-[13px] font-semibold leading-tight"
          style={{
            color: active
              ? "var(--color-naxsha)"
              : done
              ? "var(--color-ink)"
              : "var(--color-graphite-soft)",
          }}
        >
          {s.label}
        </div>
        <div
          className="mt-0.5 text-[11px]"
          style={{
            color: active ? "var(--color-naxsha-lift)" : "var(--color-graphite-soft)",
          }}
        >
          {s.hint}
        </div>
      </div>
    </div>
  );
}

/**
 * StudioPreview — a polished, static product mockup of the Naxsha AI
 * floor-plan studio app. Used as the centerpiece of the hero.
 */
export function StudioPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[1240px] mx-auto"
    >
      {/* Outer app frame — bold shadow + stronger border for emphasis */}
      <div
        className="rounded-[20px] overflow-hidden bg-card"
        style={{
          border: "1px solid rgba(0,41,82,0.18)",
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.7) inset, 0 24px 60px -20px rgba(0,41,82,0.28), 0 8px 24px -12px rgba(0,41,82,0.16), 0 2px 6px -2px rgba(0,41,82,0.10)",
        }}
      >
        {/* Window chrome / app title bar */}
        <div
          className="h-11 px-4 flex items-center gap-3"
          style={{
            background: "#FFFFFF",
            borderBottom: "0.5px solid var(--color-mist)",
          }}
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FF5F57" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28C840" }} />
          </div>
          <div className="ml-4 flex items-center gap-2 text-[12.5px]">
            <span
              className="mono font-semibold"
              style={{
                color: "var(--color-naxsha)",
                letterSpacing: "0.16em",
              }}
            >
              NAXSHA
            </span>
            <span style={{ color: "var(--color-mist)" }}>/</span>
            <span style={{ color: "var(--color-graphite-soft)" }}>
              Bandra West, Mumbai
            </span>
            <span style={{ color: "var(--color-mist)" }}>/</span>
            <span style={{ color: "var(--color-ink)", fontWeight: 500 }}>
              Plot 47 · 30 × 40
            </span>
            <span
              className="ml-2 label px-1.5 py-0.5 rounded-[3px]"
              style={{
                background: "var(--color-naxsha-tint)",
                color: "var(--color-naxsha-deep)",
              }}
            >
              DRAFT v3
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              className="label inline-flex items-center gap-1.5"
              style={{ color: "var(--color-verandah)" }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--color-verandah)" }}
              />
              AUTOSAVED
            </motion.span>
          </div>
        </div>

        {/* App body: 3-column workspace */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: "200px minmax(0, 1fr) 280px",
            minHeight: 460,
          }}
        >
          {/* Left: step rail */}
          <aside
            className="p-5"
            style={{ borderRight: "0.5px solid var(--color-mist)" }}
          >
            <div className="label mb-4">GUIDED FLOW</div>
            <div>
              {STEPS.map((s, i) => (
                <StepRow key={s.num} s={s} last={i === STEPS.length - 1} />
              ))}
            </div>

            <div
              className="mt-2 pt-4 label flex items-center gap-1.5"
              style={{
                borderTop: "0.5px solid var(--color-mist)",
                color: "var(--color-graphite-soft)",
              }}
            >
              <Sparkles size={11} className="text-terracotta" />
              v3 GENERATED · 58s
            </div>
          </aside>

          {/* Middle: canvas */}
          <main className="relative bg-plot">
            {/* Mini toolbar */}
            <div
              className="h-9 px-3 flex items-center gap-2 bg-card"
              style={{ borderBottom: "0.5px solid var(--color-mist)" }}
            >
              <div
                className="flex items-center rounded-[6px] p-0.5"
                style={{ border: "0.5px solid var(--color-mist)" }}
              >
                {["A", "B", "C"].map((v) => (
                  <span
                    key={v}
                    className="h-6 px-2 inline-flex items-center text-[11px] rounded-[4px]"
                    style={{
                      background: v === "A" ? "var(--color-card)" : "transparent",
                      color: v === "A" ? "var(--color-naxsha)" : "var(--color-graphite-soft)",
                      fontWeight: v === "A" ? 600 : 400,
                    }}
                  >
                    Option {v}
                  </span>
                ))}
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span
                  className="h-6 px-2 inline-flex items-center gap-1 rounded-[6px] text-[11px]"
                  style={{
                    border: "0.5px solid var(--color-mist)",
                    color: "var(--color-graphite)",
                  }}
                >
                  <Layers size={11} />
                  Layers · 5/7
                </span>
                <div
                  className="flex items-center rounded-[6px]"
                  style={{ border: "0.5px solid var(--color-mist)" }}
                >
                  <span className="h-6 w-6 inline-flex items-center justify-center">
                    <ZoomOut size={12} />
                  </span>
                  <span className="mono text-[10.5px] px-1.5 text-ink">
                    100%
                  </span>
                  <span className="h-6 w-6 inline-flex items-center justify-center">
                    <ZoomIn size={12} />
                  </span>
                </div>
              </div>
            </div>

            {/* Canvas */}
            <div className="relative flex items-center justify-center p-3">
              <div className="w-full max-w-[480px]">
                <HeroFloorplan />
              </div>

              {/* AI suggestion banner */}
              <div
                className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 h-8 rounded-[8px] bg-card"
                style={{ border: "0.5px solid var(--color-mist)" }}
              >
                <Sparkles size={12} className="text-terracotta" />
                <span className="text-[11.5px] text-ink">
                  Master swap → +18 sf usable
                </span>
                <span className="label ml-1 text-naxsha-lift">APPLY</span>
              </div>
            </div>
          </main>

          {/* Right: cost + BoQ */}
          <aside
            className="p-5 bg-plot"
            style={{ borderLeft: "0.5px solid var(--color-mist)" }}
          >
            {/* Budget hero card */}
            <div
              className="rounded-[12px] p-4 text-white"
              style={{
                background: "var(--color-naxsha)",
                border: "0.5px solid var(--color-naxsha-deep)",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="label"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  ESTIMATED BUDGET
                </span>
                <span
                  className="mono text-[9px] px-1 py-0.5 rounded-[3px]"
                  style={{
                    background: "rgba(244,168,122,0.18)",
                    color: "#F4A87A",
                    letterSpacing: "0.12em",
                  }}
                >
                  LIVE
                </span>
              </div>
              <div className="mt-2 mono text-[22px] font-semibold leading-none">
                {formatINR(2160000)}
              </div>
              <div
                className="mt-2 flex items-center gap-1.5 text-[11px]"
                style={{ color: "rgba(255,255,255,0.78)" }}
              >
                <span
                  className="mono inline-flex items-center gap-0.5 px-1 py-0.5 rounded-[2px]"
                  style={{
                    background: "rgba(244,168,122,0.18)",
                    color: "#F4A87A",
                  }}
                >
                  <ArrowDownRight size={9} strokeWidth={2.5} />
                  ₹1.4 L
                </span>
                <span>vs Bandra avg</span>
              </div>
              <div
                className="mt-3 pt-3 grid grid-cols-3 gap-2"
                style={{ borderTop: "0.5px solid rgba(255,255,255,0.14)" }}
              >
                <div>
                  <div
                    className="label"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    SF
                  </div>
                  <div className="mt-0.5 mono text-[12px] font-semibold">
                    1,200
                  </div>
                </div>
                <div>
                  <div
                    className="label"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    ₹/SF
                  </div>
                  <div className="mt-0.5 mono text-[12px] font-semibold">
                    1,800
                  </div>
                </div>
                <div>
                  <div
                    className="label"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    ETA
                  </div>
                  <div className="mt-0.5 mono text-[12px] font-semibold">
                    8 mo
                  </div>
                </div>
              </div>
            </div>

            {/* BoQ */}
            <div className="mt-4">
              <div className="label mb-2">BILL OF QUANTITIES</div>
              <ul className="space-y-1.5">
                {MATERIALS.map((m) => (
                  <li
                    key={m.name}
                    className="flex items-center text-[12px]"
                  >
                    <span
                      className="flex-1"
                      style={{ color: "var(--color-graphite)" }}
                    >
                      {m.name}
                    </span>
                    <span className="mono" style={{ color: "var(--color-ink)" }}>
                      {m.qty}
                      <span
                        className="text-[9px] ml-0.5"
                        style={{ color: "var(--color-graphite-soft)" }}
                      >
                        {" "}
                        {m.unit}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vastu pill */}
            <div
              className="mt-4 rounded-[8px] p-3 flex items-center gap-2"
              style={{
                background: "rgba(77,124,15,0.08)",
                border: "0.5px solid rgba(77,124,15,0.16)",
              }}
            >
              <span
                className="h-5 w-5 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: "var(--color-verandah)",
                  color: "#FFFFFF",
                }}
              >
                <Check size={11} strokeWidth={3} />
              </span>
              <div>
                <div
                  className="text-[12px] font-semibold"
                  style={{ color: "var(--color-verandah)" }}
                >
                  Vastu compliant
                </div>
                <div
                  className="text-[10.5px]"
                  style={{ color: "var(--color-graphite-soft)" }}
                >
                  Pooja NE · Kitchen SE · Master SW
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Floating glass pill at top-right corner — "AI generated" */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 22, delay: 1.4 }}
        className="absolute -top-4 right-6 hidden md:flex items-center gap-2 px-3 h-10 rounded-full"
        style={{
          background: "#FFFFFF",
          border: "1px solid rgba(0,41,82,0.16)",
          boxShadow: "0 10px 24px -10px rgba(0,41,82,0.28)",
        }}
      >
        <Sparkles size={12} className="text-terracotta" strokeWidth={2.5} />
        <span
          className="mono text-[11px] font-semibold"
          style={{ color: "var(--color-ink)", letterSpacing: "0.08em" }}
        >
          AI-GENERATED
        </span>
        <span style={{ color: "var(--color-mist)" }}>·</span>
        <span
          className="mono text-[11px]"
          style={{ color: "var(--color-graphite)" }}
        >
          58s
        </span>
      </motion.div>
    </motion.div>
  );
}
