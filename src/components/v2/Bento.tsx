"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "motion/react";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowDownRight,
  Compass,
  FileText,
  Layers,
  Sparkles,
} from "lucide-react";
import { Container, SectionEyebrow } from "./Container";

function useCountUp(target: number, inView: boolean, duration = 1.4) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (n) => setV(Math.round(n)),
    });
    return () => controls.stop();
  }, [inView, target, duration]);
  return v;
}

// ============ ROW 1 — full-width banner card ============
function LifetimeBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const total = useCountUp(216, inView, 1.6); // crores

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="rounded-[24px] p-8 lg:p-12 relative overflow-hidden flex items-center"
      style={{
        background: "var(--color-naxsha)",
        border: "0.5px solid var(--color-naxsha-deep)",
        gridColumn: "span 6",
        minHeight: 280,
      }}
    >
      {/* Drafted grid backdrop */}
      <div aria-hidden className="absolute inset-0 draft-grid-dark opacity-60" />

      {/* Terracotta accent ball */}
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          width: 320,
          height: 320,
          background: "var(--color-terracotta)",
          top: -120,
          right: -90,
          opacity: 0.25,
          mixBlendMode: "screen",
        }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 w-full items-center">
        <div className="text-white">
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#F4A87A" }}
            />
            <span className="label" style={{ color: "rgba(244,168,122,0.95)" }}>
              LIFETIME DRAFTED VALUE
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-3">
            <span
              className="mono font-semibold tracking-[-0.035em] leading-none"
              style={{ fontSize: "clamp(56px, 8vw, 116px)" }}
            >
              ₹{total}
            </span>
            <span
              className="mono font-semibold leading-none"
              style={{
                fontSize: "clamp(28px, 3.5vw, 48px)",
                color: "#F4A87A",
              }}
            >
              Cr
            </span>
            <span
              className="mono text-[10px] inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full ml-2"
              style={{
                background: "rgba(244,168,122,0.18)",
                color: "#F4A87A",
                letterSpacing: "0.12em",
              }}
            >
              <ArrowUpRight size={10} strokeWidth={2.5} />
              +18%
            </span>
          </div>

          <div
            className="mt-5 text-[15px]"
            style={{ color: "rgba(255,255,255,0.78)", maxWidth: 440 }}
          >
            Drafted across 4,247 homes — from a 600 sf 1-BHK to a 5,400 sf
            farmhouse. One bill of quantities at a time.
          </div>
        </div>

        {/* Glass mini-stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { l: "PLANS", v: "4,247" },
            { l: "AVG TIME", v: "58s" },
            { l: "ERROR", v: "±4%" },
          ].map((s) => (
            <div
              key={s.l}
              className="glass-dark rounded-[14px] p-4 text-white"
            >
              <div className="label" style={{ color: "rgba(255,255,255,0.55)" }}>
                {s.l}
              </div>
              <div className="mt-1 mono text-[20px] font-semibold leading-none">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ============ ROW 2 — Vastu (small dark) + Photo (large) ============
function VastuCard() {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="rounded-[24px] p-7 relative overflow-hidden flex flex-col"
      style={{
        background: "var(--color-naxsha-tint)",
        border: "0.5px solid rgba(0,61,122,0.10)",
        gridColumn: "span 2",
        minHeight: 380,
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Compass size={15} strokeWidth={1.75} color="var(--color-naxsha)" />
        <span className="label" style={{ color: "var(--color-naxsha-deep)" }}>
          VASTU ENGINE
        </span>
      </div>

      <h3
        className="mt-2 font-semibold leading-[1.1]"
        style={{
          fontSize: "clamp(22px, 2.4vw, 28px)",
          color: "var(--color-ink)",
          letterSpacing: "-0.018em",
          maxWidth: "14ch",
        }}
      >
        12 principles, checked.
      </h3>

      {/* Spinning compass */}
      <div className="relative flex-1 flex items-center justify-center">
        <motion.svg
          width={160}
          height={160}
          viewBox="0 0 160 160"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="80" cy="80" r="74" fill="none" stroke="rgba(0,61,122,0.18)" strokeWidth="0.5" />
          <circle cx="80" cy="80" r="56" fill="none" stroke="rgba(0,61,122,0.18)" strokeWidth="0.5" />
          <circle cx="80" cy="80" r="38" fill="none" stroke="rgba(0,61,122,0.18)" strokeWidth="0.5" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * 45 * Math.PI) / 180;
            const x1 = 80 + Math.cos(a) * 56;
            const y1 = 80 + Math.sin(a) * 56;
            const x2 = 80 + Math.cos(a) * 74;
            const y2 = 80 + Math.sin(a) * 74;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#003D7A"
                strokeWidth={i % 2 === 0 ? 1 : 0.5}
              />
            );
          })}
          <polygon points="80,16 73,48 80,42 87,48" fill="#B8552B" />
          <polygon points="80,144 73,112 80,118 87,112" fill="#003D7A" opacity="0.65" />
          <text
            x={80}
            y={12}
            textAnchor="middle"
            fontFamily="var(--font-naxsha-mono)"
            fontSize={9}
            fontWeight={700}
            fill="#003D7A"
          >
            N
          </text>
        </motion.svg>
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {["Pooja NE", "Kitchen SE", "Master SW", "Bath NW"].map((p) => (
          <span
            key={p}
            className="glass-pill text-[11px] px-2 py-1 rounded-full"
            style={{ color: "var(--color-naxsha-deep)" }}
          >
            {p}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function PhotoCard() {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="rounded-[24px] relative overflow-hidden flex flex-col justify-end"
      style={{
        gridColumn: "span 4",
        minHeight: 380,
        border: "0.5px solid var(--color-mist)",
      }}
    >
      <Image
        src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80"
        alt="Drafting table with floor plan"
        width={1600}
        height={1000}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: "saturate(0.08) contrast(1.04) brightness(0.85)",
        }}
        unoptimized
      />
      {/* Duotone wash — Naxsha Blue over the photo */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "rgba(0,41,82,0.65)",
          mixBlendMode: "multiply",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "rgba(0,61,122,0.55)",
          mixBlendMode: "screen",
        }}
      />

      {/* Floating glass info chip */}
      <div className="absolute top-5 left-5">
        <span
          className="glass-pill inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full label"
          style={{ color: "var(--color-ink)" }}
        >
          <Sparkles size={11} strokeWidth={2.25} className="text-terracotta" />
          REAL ARCHITECT&apos;S DESK
        </span>
      </div>

      <div className="relative p-7 text-white">
        <h3
          className="font-semibold leading-[1.1]"
          style={{
            fontSize: "clamp(26px, 3vw, 38px)",
            letterSpacing: "-0.02em",
            maxWidth: "18ch",
          }}
        >
          Drafted like the desk, not a sales deck.
        </h3>
        <p
          className="mt-3 text-[14.5px]"
          style={{ color: "rgba(255,255,255,0.82)", maxWidth: 420 }}
        >
          Wall thicknesses are real. Stair widths meet code. Door swings
          don&apos;t crash. Every output is a measured set.
        </p>
      </div>
    </motion.div>
  );
}

// ============ ROW 3 — BoQ (dark) + Multi-floor (tint) + Export (glass) ============
function BoqCard() {
  const items = [
    { name: "Cement", qty: "480", unit: "bags" },
    { name: "Steel", qty: "4.2", unit: "tonnes" },
    { name: "Brick", qty: "32.4k", unit: "nos" },
    { name: "Tile", qty: "1,080", unit: "sf" },
  ];
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="rounded-[24px] p-7 flex flex-col relative overflow-hidden"
      style={{
        background: "var(--color-naxsha-deep)",
        border: "0.5px solid var(--color-naxsha-deep)",
        color: "#FFFFFF",
        gridColumn: "span 2",
        minHeight: 320,
      }}
    >
      <div aria-hidden className="absolute inset-0 draft-grid-dark opacity-30" />

      <div className="relative flex items-center justify-between">
        <span className="label" style={{ color: "rgba(255,255,255,0.65)" }}>
          LIVE BoQ
        </span>
        <span
          className="mono text-[10px] inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full"
          style={{
            background: "rgba(244,168,122,0.18)",
            color: "#F4A87A",
          }}
        >
          <ArrowDownRight size={10} strokeWidth={2.5} />
          ₹14k
        </span>
      </div>

      <h3
        className="relative mt-2 font-semibold leading-[1.15]"
        style={{
          fontSize: "clamp(20px, 1.9vw, 24px)",
          color: "#FFFFFF",
          letterSpacing: "-0.015em",
          maxWidth: "16ch",
        }}
      >
        Materials your contractor reads.
      </h3>

      <ul className="relative mt-5 space-y-2.5 flex-1">
        {items.map((m, i) => (
          <motion.li
            key={m.name}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
            className="flex items-center text-[13px]"
          >
            <span
              className="flex-1"
              style={{ color: "rgba(255,255,255,0.88)" }}
            >
              {m.name}
            </span>
            <span className="mono">
              {m.qty}
              <span
                className="text-[10px] ml-0.5"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {" "}
                {m.unit}
              </span>
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function MultiFloorCard() {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="rounded-[24px] p-7 relative overflow-hidden flex flex-col justify-between"
      style={{
        background: "var(--color-card)",
        border: "0.5px solid var(--color-mist)",
        gridColumn: "span 2",
        minHeight: 320,
      }}
    >
      <div>
        <div className="flex items-center gap-2">
          <Layers size={14} strokeWidth={1.75} color="var(--color-naxsha)" />
          <span className="label" style={{ color: "var(--color-naxsha-lift)" }}>
            MULTI-FLOOR
          </span>
        </div>
        <h3
          className="mt-2 font-semibold leading-[1.15]"
          style={{
            fontSize: "clamp(20px, 1.9vw, 24px)",
            color: "var(--color-ink)",
            letterSpacing: "-0.015em",
            maxWidth: "16ch",
          }}
        >
          Stilt, ground, first, terrace — one stack.
        </h3>
      </div>

      {/* Stack illustration */}
      <div className="relative mt-4 flex items-end justify-end gap-1.5 h-24">
        {["TERRACE", "FIRST", "GROUND", "STILT"].map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
            className="rounded-[6px] flex items-end px-2 pb-1"
            style={{
              width: 64,
              height: `${36 + i * 16}px`,
              background:
                i === 1
                  ? "var(--color-terracotta)"
                  : "var(--color-naxsha-tint)",
              border: "0.5px solid var(--color-mist)",
            }}
          >
            <span
              className="mono text-[8.5px] font-semibold"
              style={{
                letterSpacing: "0.1em",
                color: i === 1 ? "#FFFFFF" : "var(--color-naxsha-deep)",
              }}
            >
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ExportCard() {
  const formats = ["PDF", "DWG", "DXF", "CSV", "PNG", "REVIT"];
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="rounded-[24px] p-7 relative overflow-hidden flex flex-col justify-between"
      style={{
        background: "var(--color-card)",
        border: "0.5px solid var(--color-mist)",
        gridColumn: "span 2",
        minHeight: 320,
      }}
    >
      <div>
        <div className="flex items-center gap-2">
          <FileText size={14} strokeWidth={1.75} color="var(--color-naxsha)" />
          <span className="label" style={{ color: "var(--color-naxsha-lift)" }}>
            EXPORT
          </span>
        </div>
        <h3
          className="mt-2 font-semibold leading-[1.15]"
          style={{
            fontSize: "clamp(20px, 1.9vw, 24px)",
            color: "var(--color-ink)",
            letterSpacing: "-0.015em",
            maxWidth: "16ch",
          }}
        >
          Every file your team needs.
        </h3>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {formats.map((f, i) => (
          <motion.span
            key={f}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.3, delay: 0.08 + i * 0.05 }}
            className="mono text-[12px] font-semibold px-3 py-1.5 rounded-full"
            style={{
              background: f === "DWG" ? "var(--color-terracotta)" : "var(--color-naxsha-tint)",
              color: f === "DWG" ? "#FFFFFF" : "var(--color-naxsha-deep)",
              letterSpacing: "0.06em",
            }}
          >
            .{f}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export function Bento() {
  return (
    <section
      id="features"
      className="section-plot"
      style={{
        paddingTop: "clamp(80px, 10vw, 160px)",
        paddingBottom: "clamp(80px, 10vw, 160px)",
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <SectionEyebrow num="·" label="THE STUDIO" />
          <h2
            className="font-semibold leading-[1.05]"
            style={{
              fontSize: "clamp(36px, 4.6vw, 60px)",
              letterSpacing: "-0.025em",
              color: "var(--color-ink)",
              maxWidth: "22ch",
            }}
          >
            One studio.{" "}
            <span style={{ color: "var(--color-naxsha)" }}>
              Every floor plan your home will ever need.
            </span>
          </h2>
        </motion.div>

        <div
          className="mt-14 grid gap-5"
          style={{
            gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
          }}
        >
          <LifetimeBanner />
          <VastuCard />
          <PhotoCard />
          <BoqCard />
          <MultiFloorCard />
          <ExportCard />
        </div>
      </Container>
    </section>
  );
}
