"use client";

import { motion } from "motion/react";
import { HeroFloorplan } from "./HeroFloorplan";
import { Compass, Layers, Ruler, Layout, IndianRupee, Download } from "lucide-react";

/**
 * A wide bento-style screenshot of the Naxsha studio:
 *   ┌──────────────────────────────────────────────────────┐
 *   │ [tabs · toolbar]                                     │
 *   ├──────────┬───────────────────────────┬───────────────┤
 *   │ rooms    │ canvas (floor plan)       │ properties    │
 *   │          │                           │  · estimate   │
 *   │          │                           │  · materials  │
 *   └──────────┴───────────────────────────┴───────────────┘
 */
export function StudioMockup() {
  return (
    <div
      className="relative mx-auto"
      style={{
        background: "#FFFFFF",
        border: "0.5px solid var(--color-mist)",
        borderRadius: 12,
        overflow: "hidden",
        width: "100%",
        maxWidth: 1200,
      }}
    >
      {/* Top toolbar */}
      <div
        className="flex items-center justify-between"
        style={{
          padding: "10px 14px",
          borderBottom: "0.5px solid var(--color-mist)",
          background: "var(--color-plot)",
        }}
      >
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{ width: 9, height: 9, borderRadius: 999, background: "var(--color-mist)" }}
              />
            ))}
          </div>
          <span
            className="hidden sm:inline"
            style={{
              fontFamily: "var(--font-naxsha-mono)",
              fontSize: 11,
              letterSpacing: "0.04em",
              color: "var(--color-graphite)",
            }}
          >
            naxsha.ai/studio/draft-248
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {["Plan", "Cost", "BoQ", "Export"].map((tab, i) => (
            <span
              key={tab}
              style={{
                padding: "5px 10px",
                borderRadius: 6,
                fontFamily: "var(--font-naxsha-mono)",
                fontSize: 10.5,
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: i === 0 ? "var(--color-naxsha)" : "var(--color-graphite)",
                background: i === 0 ? "var(--color-naxsha-tint)" : "transparent",
                border: i === 0 ? "0.5px solid var(--color-naxsha-tint)" : "0.5px solid transparent",
              }}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>

      {/* Body: 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-[200px,1fr] lg:grid-cols-[220px,1fr,260px] min-h-0">
        {/* Sidebar — rooms list */}
        <aside
          className="hidden md:block"
          style={{
            borderRight: "0.5px solid var(--color-mist)",
            padding: "16px 14px",
            background: "#FCFCFB",
          }}
        >
          <div className="label mb-3">Rooms · 10</div>
          <ul className="space-y-1">
            {[
              { name: "Living + Dining", area: "324 sf", active: false },
              { name: "Kitchen", area: "144 sf", active: false },
              { name: "Master Bedroom", area: "216 sf", active: true },
              { name: "Master Bath", area: "100 sf", active: false },
              { name: "Walk-in", area: "80 sf", active: false },
              { name: "Bedroom 2", area: "168 sf", active: false },
              { name: "Bath 2", area: "48 sf", active: false },
              { name: "Pooja", area: "36 sf", active: false },
              { name: "Powder", area: "36 sf", active: false },
              { name: "Balcony", area: "48 sf", active: false },
            ].map((r) => (
              <li
                key={r.name}
                className="flex items-center justify-between gap-2"
                style={{
                  padding: "7px 9px",
                  borderRadius: 6,
                  background: r.active ? "var(--color-naxsha-wash)" : "transparent",
                  border: r.active ? "0.5px solid var(--color-naxsha-tint)" : "0.5px solid transparent",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: r.active ? 600 : 500,
                    color: r.active ? "var(--color-naxsha-deep)" : "var(--color-ink)",
                  }}
                >
                  {r.name}
                </span>
                <span
                  className="tnum"
                  style={{
                    fontFamily: "var(--font-naxsha-mono)",
                    fontVariantNumeric: "tabular-nums",
                    fontSize: 10,
                    color: r.active ? "var(--color-naxsha)" : "var(--color-graphite)",
                  }}
                >
                  {r.area}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Canvas */}
        <div style={{ padding: 12, background: "var(--color-plot)", minWidth: 0 }}>
          <div
            style={{
              background: "#FFFFFF",
              border: "0.5px solid var(--color-mist)",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <HeroFloorplan />
          </div>
        </div>

        {/* Properties — desktop only */}
        <aside
          className="hidden lg:block"
          style={{
            borderLeft: "0.5px solid var(--color-mist)",
            padding: "16px 16px",
            background: "#FCFCFB",
          }}
        >
          <div className="space-y-5">
            <PropertyBlock
              label="Selected"
              title="Master Bedroom"
              value={`18'-0" × 12'-0" · 216 sf`}
              tone="naxsha"
            />
            <Divider />
            <PropertyBlock
              label="Estimate"
              title="₹21,60,000"
              value="standard · ₹1,800/sf"
              tone="ink"
              mono
            />
            <Divider />
            <div>
              <div className="label mb-2.5">Materials</div>
              <ul className="space-y-2">
                {[
                  { k: "Cement", v: "720 bags" },
                  { k: "TMT steel", v: "4.8 t" },
                  { k: "M-sand", v: "38 cu·m" },
                  { k: "Brick", v: "36,500" },
                ].map((m) => (
                  <li key={m.k} className="flex items-baseline justify-between">
                    <span style={{ fontSize: 12, color: "var(--color-ink)" }}>{m.k}</span>
                    <span
                      className="tnum"
                      style={{
                        fontFamily: "var(--font-naxsha-mono)",
                        fontVariantNumeric: "tabular-nums",
                        fontSize: 11.5,
                        color: "var(--color-naxsha-deep)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {m.v}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom status bar */}
      <div
        className="flex items-center justify-between"
        style={{
          padding: "8px 14px",
          borderTop: "0.5px solid var(--color-mist)",
          background: "#FCFCFB",
        }}
      >
        <div className="flex items-center gap-4">
          <Status icon={<Compass size={11} strokeWidth={2} />} text="South-facing" />
          <Status icon={<Layers size={11} strokeWidth={2} />} text="G+0" />
          <Status icon={<Ruler size={11} strokeWidth={2} />} text="1:50" />
          <Status icon={<Layout size={11} strokeWidth={2} />} text="3 BHK · 1,200 sf" />
        </div>
        <div className="hidden md:flex items-center gap-3">
          <span
            className="flex items-center gap-1.5"
            style={{
              fontFamily: "var(--font-naxsha-mono)",
              fontSize: 10.5,
              letterSpacing: "0.06em",
              color: "var(--color-verandah)",
              textTransform: "uppercase",
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: "var(--color-verandah)",
              }}
            />
            auto-saved
          </span>
        </div>
      </div>
    </div>
  );
}

function PropertyBlock({
  label,
  title,
  value,
  tone,
  mono = false,
}: {
  label: string;
  title: string;
  value: string;
  tone: "naxsha" | "ink";
  mono?: boolean;
}) {
  return (
    <div>
      <div className="label mb-1.5">{label}</div>
      <div
        className={mono ? "tnum" : ""}
        style={{
          fontSize: mono ? 22 : 14,
          fontWeight: 600,
          color: tone === "naxsha" ? "var(--color-naxsha-deep)" : "var(--color-ink)",
          fontFamily: mono ? "var(--font-naxsha-mono)" : undefined,
          fontVariantNumeric: mono ? "tabular-nums" : undefined,
          letterSpacing: mono ? "-0.015em" : "-0.005em",
          lineHeight: 1.2,
          marginBottom: 4,
        }}
      >
        {title}
      </div>
      <div
        className="tnum"
        style={{
          fontFamily: "var(--font-naxsha-mono)",
          fontVariantNumeric: "tabular-nums",
          fontSize: 11,
          color: "var(--color-graphite)",
          letterSpacing: "0.02em",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function Divider() {
  return <div style={{ height: 0.5, background: "var(--color-mist)" }} />;
}

function Status({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span
      className="flex items-center gap-1.5"
      style={{
        fontFamily: "var(--font-naxsha-mono)",
        fontSize: 10.5,
        letterSpacing: "0.04em",
        color: "var(--color-graphite)",
      }}
    >
      <span style={{ color: "var(--color-naxsha)" }}>{icon}</span>
      {text}
    </span>
  );
}
