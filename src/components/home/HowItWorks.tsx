"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Ruler, Wand2, FileDown } from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: Ruler,
    title: "Tell us about your plot",
    body:
      "Drop your dimensions, facing direction, and rough room wishlist. North-facing 30×40, three bedrooms, ground floor first — that's enough.",
    foot: "≈ 90 seconds",
  },
  {
    n: "02",
    icon: Wand2,
    title: "Watch the studio draft",
    body:
      "Naxsha lays out rooms with Vastu setbacks honoured, real doorways, sensible kitchen-bath stacking, and southern light where it matters.",
    foot: "≈ 8 minutes",
  },
  {
    n: "03",
    icon: FileDown,
    title: "Walk it to your contractor",
    body:
      "Hand over a PDF, the DWG for your architect, and a CSV BoQ in bags-of-cement-and-tonnes-of-steel your contractor can quote against on Monday.",
    foot: "PDF · DWG · CSV",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 30%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="how" style={{ background: "var(--color-plot)" }}>
      <div className="wrap gutter py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-[640px] mb-14"
        >
          <div className="label mb-3">How it works</div>
          <h2 className="h-section" style={{ color: "var(--color-ink)" }}>
            From plot dimensions to a buildable plan — in the time it takes to finish a cup of chai.
          </h2>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Scroll-driven progress line, desktop only */}
          <div
            aria-hidden
            className="hidden lg:block absolute"
            style={{
              top: 36,
              left: "16.66%",
              right: "16.66%",
              height: 0.5,
              background: "var(--color-mist)",
            }}
          />
          <motion.div
            aria-hidden
            className="hidden lg:block absolute origin-left"
            style={{
              top: 36,
              left: "16.66%",
              right: "16.66%",
              height: 1,
              background: "var(--color-naxsha)",
              scaleX: lineScale,
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 relative">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="card min-w-0 group"
                  style={{ padding: 24, position: "relative", background: "#FFFFFF" }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="tnum"
                      style={{
                        fontFamily: "var(--font-naxsha-mono)",
                        fontVariantNumeric: "tabular-nums",
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.18em",
                        color: "var(--color-naxsha)",
                        padding: "5px 9px",
                        border: "0.5px solid var(--color-naxsha-tint)",
                        borderRadius: 999,
                        background: "var(--color-naxsha-wash)",
                      }}
                    >
                      STEP {s.n}
                    </span>
                    <span className="step-icon">
                      <Icon size={18} strokeWidth={1.6} />
                    </span>
                  </div>

                  <h3 className="h-card" style={{ color: "var(--color-ink)", marginBottom: 10 }}>
                    {s.title}
                  </h3>
                  <p className="t-body" style={{ marginBottom: 18 }}>
                    {s.body}
                  </p>
                  <div
                    style={{
                      borderTop: "0.5px solid var(--color-mist)",
                      paddingTop: 12,
                      fontFamily: "var(--font-naxsha-mono)",
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--color-graphite)",
                    }}
                  >
                    {s.foot}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
