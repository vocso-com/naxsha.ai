"use client";

import { motion } from "motion/react";
import { Layout, IndianRupee, Hammer, ArrowUpRight } from "lucide-react";
import { StudioMockup } from "./StudioMockup";

const PANELS = [
  {
    icon: Layout,
    eyebrow: "Plan view",
    title: "Drag rooms, watch walls re-stitch.",
    body:
      "Click any room and resize it from the canvas — the layout solver keeps the rest of the plan livable.",
  },
  {
    icon: IndianRupee,
    eyebrow: "Cost view",
    title: "Live ₹ as you move walls.",
    body:
      "Switch finish tier or change a partition — the cost recomputes against your city's mandi rates, this quarter.",
  },
  {
    icon: Hammer,
    eyebrow: "BoQ view",
    title: "Quote-ready bill of quantities.",
    body:
      "Cement in bags, steel in tonnes, sand in cu·m. Hand the CSV to your mistry — no decoding required.",
  },
];

export function StudioTour() {
  return (
    <section id="tour" className="relative" style={{ background: "var(--color-plot)" }}>
      <div className="wrap gutter py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        >
          <div className="max-w-[680px]">
            <div className="label mb-3">A tour of the studio</div>
            <h2
              className="font-semibold"
              style={{
                fontSize: "clamp(32px, 4.5vw, 60px)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "var(--color-ink)",
                maxWidth: "20ch",
              }}
            >
              An AI floor plan tool that looks like a real drafting tool.
            </h2>
          </div>
          <p
            className="t-lead"
            style={{ maxWidth: 360, color: "var(--color-graphite)" }}
          >
            Three panels working together — the canvas you draw on, the price tag that breathes,
            and the BoQ your contractor will quote against.
          </p>
        </motion.div>

        {/* Mockup centerpiece */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <StudioMockup />

          {/* Floating glass annotation, top-right of mockup */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="hidden xl:flex absolute items-center gap-2 px-3 h-9 rounded-full glass-pill"
            style={{ top: -14, right: 28 }}
          >
            <motion.span
              animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 7, height: 7, borderRadius: 999, background: "var(--color-verandah)" }}
            />
            <span
              className="tnum"
              style={{
                fontFamily: "var(--font-naxsha-mono)",
                fontVariantNumeric: "tabular-nums",
                fontSize: 11,
                color: "var(--color-ink)",
                letterSpacing: "0.04em",
              }}
            >
              live · auto-saved 2s ago
            </span>
          </motion.div>
        </motion.div>

        {/* Three panel callouts under the mockup */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-6">
          {PANELS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.eyebrow}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="min-w-0 group"
                style={{
                  background: "var(--color-card)",
                  border: "0.5px solid var(--color-mist)",
                  borderRadius: 12,
                  padding: 24,
                  transition: "border-color 220ms ease",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="inline-flex items-center justify-center"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "var(--color-naxsha-wash)",
                      color: "var(--color-naxsha)",
                    }}
                  >
                    <Icon size={16} strokeWidth={1.7} />
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-naxsha-mono)",
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--color-graphite-soft)",
                    }}
                  >
                    0{i + 1}
                  </span>
                </div>
                <div className="label mb-2" style={{ color: "var(--color-naxsha)" }}>
                  {p.eyebrow}
                </div>
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 600,
                    color: "var(--color-ink)",
                    lineHeight: 1.3,
                    letterSpacing: "-0.012em",
                    marginBottom: 8,
                  }}
                >
                  {p.title}
                </h3>
                <p className="t-body" style={{ fontSize: 13.5 }}>
                  {p.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Trailing CTA line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex items-center justify-end"
        >
          <a
            href="#cta"
            className="inline-flex items-center gap-2"
            style={{
              fontFamily: "var(--font-naxsha-mono)",
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-naxsha)",
            }}
          >
            Open the studio
            <ArrowUpRight size={13} strokeWidth={2} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
