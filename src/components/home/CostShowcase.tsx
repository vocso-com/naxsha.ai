"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { formatINR } from "@/lib/floorplan";

const TIERS = [
  { name: "Builder", rate: 1500 },
  { name: "Standard", rate: 1800 },
  { name: "Premium", rate: 2400 },
  { name: "Luxury", rate: 3200 },
] as const;

const SF = 1200;

const BOQ = [
  { item: "Cement", qty: 720, unit: "bags", pct: 0.78 },
  { item: "TMT steel", qty: 4.8, unit: "tonnes", pct: 0.62 },
  { item: "Red brick", qty: 36500, unit: "nos", pct: 0.92 },
  { item: "M-sand", qty: 38, unit: "cu·m", pct: 0.54 },
  { item: "Vitrified tile", qty: 1080, unit: "sf", pct: 0.71 },
];

function useCountUp(target: number, active: boolean, ms = 900) {
  const [val, setVal] = useState(0);
  const last = useRef({ from: 0, target: 0, start: 0 });
  useEffect(() => {
    if (!active) return;
    const from = val;
    last.current = { from, target, start: performance.now() };
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - last.current.start) / ms);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(last.current.from + (last.current.target - last.current.from) * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, active]);
  return val;
}

export function CostShowcase() {
  const [tier, setTier] = useState(1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-120px" });

  const budgetTarget = SF * TIERS[tier].rate;
  const budget = useCountUp(budgetTarget, inView);
  const delta = budgetTarget - SF * TIERS[1].rate;

  return (
    <section id="cost" style={{ background: "var(--color-plot)" }}>
      <div className="wrap gutter py-24 md:py-32">
        <div className="grid grid-cols-1 xl:grid-cols-[0.85fr,1.15fr] gap-12 xl:gap-20 items-start">
          {/* LEFT — sticky copy on xl+ */}
          <div className="xl:sticky xl:top-24 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="label mb-3">Costs you can show your father-in-law</div>
              <h2 className="h-section mb-5" style={{ color: "var(--color-ink)" }}>
                The number that actually shows up at the gate.
              </h2>
              <p className="t-lead max-w-[520px] mb-6">
                Naxsha quotes against materials, finishes, and labour for your city this quarter — not
                a thumb-rule from 2018. Slide the finish, watch the plan update, hand it to a
                contractor who&apos;ll honour it.
              </p>
              <ul className="space-y-3 max-w-[480px]">
                {[
                  "Bangalore Q2 2026 mandi rates",
                  "Tier-tagged labour (builder → luxury)",
                  "Live BoQ in bags · tonnes · cubic metres",
                  "Exportable as the CSV your mistry expects",
                ].map((t) => (
                  <li key={t} className="flex gap-3 items-start t-body">
                    <span
                      aria-hidden
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 999,
                        background: "var(--color-verandah)",
                        marginTop: 8,
                        flexShrink: 0,
                      }}
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* RIGHT — stacked dark cards */}
          <div ref={wrapRef} className="min-w-0 space-y-5">
            {/* Budget card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
              className="relative overflow-hidden"
              style={{
                background: "var(--color-naxsha)",
                border: "0.5px solid var(--color-naxsha-deep)",
                borderRadius: 12,
                padding: 28,
                color: "#FFFFFF",
              }}
            >
              {/* hairline grid */}
              <div
                aria-hidden
                className="absolute inset-0 cta-grid pointer-events-none"
              />
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div
                    style={{
                      fontFamily: "var(--font-naxsha-mono)",
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.65)",
                    }}
                  >
                    Estimated build cost
                  </div>
                  {delta !== 0 && (
                    <span
                      className="tnum"
                      style={{
                        fontFamily: "var(--font-naxsha-mono)",
                        fontVariantNumeric: "tabular-nums",
                        fontSize: 11,
                        fontWeight: 500,
                        color: "#FFFFFF",
                        padding: "4px 10px",
                        borderRadius: 999,
                        background: delta > 0 ? "rgba(244,168,122,0.22)" : "rgba(244,168,122,0.18)",
                        border: "0.5px solid var(--color-terracotta-soft)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {delta > 0 ? "+" : "−"} {formatINR(Math.abs(delta))}
                    </span>
                  )}
                </div>

                <div
                  className="tnum"
                  style={{
                    fontFamily: "var(--font-naxsha-mono)",
                    fontVariantNumeric: "tabular-nums",
                    fontSize: "clamp(40px, 5.5vw, 64px)",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.04,
                    color: "#FFFFFF",
                  }}
                >
                  {formatINR(budget)}
                </div>
                <div
                  className="tnum mt-2"
                  style={{
                    fontFamily: "var(--font-naxsha-mono)",
                    fontVariantNumeric: "tabular-nums",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.65)",
                    letterSpacing: "0.04em",
                  }}
                >
                  1,200 sf · {TIERS[tier].name.toLowerCase()} · ₹{TIERS[tier].rate.toLocaleString("en-IN")}/sf
                </div>

                {/* Finish slider */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-3">
                    <div
                      style={{
                        fontFamily: "var(--font-naxsha-mono)",
                        fontSize: 10,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.65)",
                      }}
                    >
                      Finish tier
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-naxsha-mono)",
                        fontSize: 11,
                        color: "#FFFFFF",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {TIERS[tier].name}
                    </div>
                  </div>
                  <div
                    role="group"
                    aria-label="Finish tier"
                    className="grid grid-cols-4 gap-2"
                  >
                    {TIERS.map((t, i) => (
                      <button
                        key={t.name}
                        onClick={() => setTier(i)}
                        aria-pressed={tier === i}
                        className="relative"
                        style={{
                          height: 44,
                          borderRadius: 8,
                          background: tier === i ? "rgba(255,255,255,0.12)" : "transparent",
                          border:
                            tier === i
                              ? "0.5px solid rgba(255,255,255,0.85)"
                              : "0.5px solid rgba(255,255,255,0.22)",
                          color: tier === i ? "#FFFFFF" : "rgba(255,255,255,0.7)",
                          fontSize: 12,
                          fontWeight: 500,
                          letterSpacing: "0.02em",
                          transition: "all 220ms ease",
                          cursor: "pointer",
                        }}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* BoQ card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="relative"
              style={{
                background: "var(--color-naxsha-deep)",
                border: "0.5px solid var(--color-naxsha-deep)",
                borderRadius: 12,
                padding: 28,
                color: "#FFFFFF",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div
                  style={{
                    fontFamily: "var(--font-naxsha-mono)",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  Bill of quantities · 1,200 sf
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-naxsha-mono)",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  CSV · PDF
                </div>
              </div>

              <ul className="space-y-4">
                {BOQ.map((b, i) => (
                  <motion.li
                    key={b.item}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: 0.15 + i * 0.08 }}
                    className="min-w-0"
                  >
                    <div className="flex items-baseline justify-between mb-2">
                      <span style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF" }}>
                        {b.item}
                      </span>
                      <span
                        className="tnum"
                        style={{
                          fontFamily: "var(--font-naxsha-mono)",
                          fontVariantNumeric: "tabular-nums",
                          fontSize: 13,
                          color: "#FFFFFF",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {b.qty.toLocaleString("en-IN")}{" "}
                        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>{b.unit}</span>
                      </span>
                    </div>
                    <div
                      style={{
                        height: 3,
                        background: "rgba(255,255,255,0.08)",
                        borderRadius: 999,
                        overflow: "hidden",
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${b.pct * 100}%` }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.08, ease: "easeOut" }}
                        style={{
                          height: "100%",
                          background: "rgba(255,255,255,0.55)",
                        }}
                      />
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
