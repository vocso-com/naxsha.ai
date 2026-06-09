"use client";

import { motion } from "motion/react";
import {
  Compass,
  Ruler,
  IndianRupee,
  Wrench,
  ShieldCheck,
  Layers,
  ArrowUpRight,
} from "lucide-react";

export function Features() {
  return (
    <section
      id="features"
      style={{
        background: "var(--color-plot)",
        borderTop: "0.5px solid var(--color-mist)",
      }}
    >
      <div className="wrap gutter py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-[760px] mb-14"
        >
          <div className="label mb-3">What every plan ships with</div>
          <h2
            className="font-semibold"
            style={{
              fontSize: "clamp(32px, 4.5vw, 64px)",
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
              color: "var(--color-ink)",
              maxWidth: "20ch",
            }}
          >
            Six pieces of a real plan — not six AI-art renders.
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-12 gap-3 md:gap-4 min-w-0">
          {/* Row 1 — large hero cell (Vastu, dark) + small accent (Climate, tint) */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="col-span-12 md:col-span-8 relative overflow-hidden"
            style={{
              background: "var(--color-naxsha-deep)",
              border: "0.5px solid var(--color-naxsha-deep)",
              borderRadius: 12,
              padding: "clamp(28px, 3vw, 48px)",
              color: "#FFFFFF",
              minHeight: 320,
            }}
          >
            <div className="absolute inset-0 cta-grid pointer-events-none" aria-hidden />

            {/* Decorative compass mark */}
            <svg
              aria-hidden
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              style={{ position: "absolute", top: -20, right: -20, opacity: 0.18 }}
            >
              <circle cx="60" cy="60" r="58" stroke="#FFFFFF" strokeWidth="0.5" />
              <circle cx="60" cy="60" r="40" stroke="#FFFFFF" strokeWidth="0.5" />
              <line x1="60" y1="2" x2="60" y2="118" stroke="#FFFFFF" strokeWidth="0.5" />
              <line x1="2" y1="60" x2="118" y2="60" stroke="#FFFFFF" strokeWidth="0.5" />
              <polygon points="60,8 54,60 60,52 66,60" fill="#B8552B" />
            </svg>

            <div className="relative flex flex-col h-full">
              <div className="flex items-center gap-2 mb-6">
                <span
                  className="inline-flex items-center justify-center"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.10)",
                    border: "0.5px solid rgba(255,255,255,0.22)",
                    color: "#FFFFFF",
                  }}
                >
                  <Compass size={18} strokeWidth={1.6} />
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-naxsha-mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  Vastu · enforced as setbacks
                </span>
              </div>

              <h3
                style={{
                  fontSize: "clamp(28px, 3.2vw, 44px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  marginBottom: 14,
                  maxWidth: "16ch",
                }}
              >
                Vastu setbacks, not vibes.
              </h3>
              <p
                style={{
                  fontSize: 15.5,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.78)",
                  maxWidth: 460,
                  marginBottom: 24,
                }}
              >
                Pooja in the north-east, kitchen in the south-east, primary door away from the
                south-west. The rules you&apos;d ask your priest about — baked into the layout solver.
              </p>

              {/* Mini direction chips */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {[
                  { dir: "NE", room: "Pooja" },
                  { dir: "SE", room: "Kitchen" },
                  { dir: "SW", room: "Master" },
                  { dir: "NW", room: "Storage" },
                ].map((c) => (
                  <span
                    key={c.dir}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "5px 10px",
                      borderRadius: 6,
                      background: "rgba(255,255,255,0.08)",
                      border: "0.5px solid rgba(255,255,255,0.16)",
                      fontFamily: "var(--font-naxsha-mono)",
                      fontSize: 11,
                      letterSpacing: "0.06em",
                      color: "#FFFFFF",
                    }}
                  >
                    <span style={{ color: "var(--color-terracotta-soft)", fontWeight: 600 }}>
                      {c.dir}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>{c.room}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.article>

          {/* Climate — small tint cell */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="col-span-12 md:col-span-4 relative"
            style={{
              background: "var(--color-naxsha-tint)",
              border: "0.5px solid var(--color-naxsha-tint)",
              borderRadius: 12,
              padding: "clamp(24px, 2.4vw, 36px)",
              minHeight: 320,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              className="inline-flex items-center justify-center mb-6"
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "#FFFFFF",
                border: "0.5px solid rgba(255,255,255,0.6)",
                color: "var(--color-naxsha)",
              }}
            >
              <ShieldCheck size={18} strokeWidth={1.6} />
            </span>

            <div
              className="label"
              style={{ color: "var(--color-naxsha)", marginBottom: 8 }}
            >
              Climate-checked
            </div>
            <h3
              className="h-card"
              style={{ color: "var(--color-naxsha-deep)", marginBottom: 10 }}
            >
              Built for the city you&apos;re in.
            </h3>
            <p className="t-body" style={{ color: "var(--color-naxsha-deep)", opacity: 0.78 }}>
              Eaves over west windows in Bangalore. Cross-ventilation in Chennai. Sun-shaded
              balconies in Delhi.
            </p>

            <div
              className="mt-auto flex items-center gap-2"
              style={{
                paddingTop: 18,
                borderTop: "0.5px solid rgba(0,61,122,0.16)",
              }}
            >
              <span
                className="tnum"
                style={{
                  fontFamily: "var(--font-naxsha-mono)",
                  fontVariantNumeric: "tabular-nums",
                  fontSize: 11,
                  color: "var(--color-naxsha-deep)",
                  letterSpacing: "0.08em",
                }}
              >
                62 city climate profiles
              </span>
            </div>
          </motion.article>

          {/* Row 2 — three equal cells */}
          {/* Real architect drawings — card */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-12 md:col-span-4 group"
            style={{
              background: "var(--color-card)",
              border: "0.5px solid var(--color-mist)",
              borderRadius: 12,
              padding: 28,
              minHeight: 280,
              display: "flex",
              flexDirection: "column",
              transition: "border-color 220ms ease",
            }}
          >
            <span
              className="inline-flex items-center justify-center mb-5"
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "var(--color-naxsha-wash)",
                color: "var(--color-naxsha)",
              }}
            >
              <Ruler size={18} strokeWidth={1.6} />
            </span>
            <h3 className="h-card" style={{ color: "var(--color-ink)", marginBottom: 8 }}>
              Real architect drawings
            </h3>
            <p className="t-body" style={{ flex: 1 }}>
              Walls in feet-and-inches, door swings, window cuts, dimension lines. Print at 1:50
              and your contractor reads it like a normal plan.
            </p>
            <div
              className="mt-5 pt-4 flex items-center gap-3"
              style={{ borderTop: "0.5px solid var(--color-mist)" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-naxsha-mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-graphite)",
                }}
              >
                1:50 scale · ft-in
              </span>
            </div>
          </motion.article>

          {/* Costs — wash cell */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="col-span-12 md:col-span-4"
            style={{
              background: "var(--color-naxsha-wash)",
              border: "0.5px solid var(--color-mist)",
              borderRadius: 12,
              padding: 28,
              minHeight: 280,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              className="inline-flex items-center justify-center mb-5"
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "#FFFFFF",
                color: "var(--color-naxsha)",
              }}
            >
              <IndianRupee size={18} strokeWidth={1.6} />
            </span>
            <h3 className="h-card" style={{ color: "var(--color-ink)", marginBottom: 8 }}>
              Costs in lakhs, not lorem.
            </h3>
            <p className="t-body" style={{ flex: 1 }}>
              Tagged to your city, your finish tier, this quarter&apos;s mandi rates. ₹21.6L doesn&apos;t
              become ₹38L the day someone breaks ground.
            </p>
            <div
              className="mt-5 pt-4 flex items-baseline justify-between"
              style={{ borderTop: "0.5px solid rgba(0,61,122,0.16)" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-naxsha-mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-graphite)",
                }}
              >
                Bangalore Q2 basis
              </span>
              <span
                className="tnum"
                style={{
                  fontFamily: "var(--font-naxsha-mono)",
                  fontVariantNumeric: "tabular-nums",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--color-naxsha-deep)",
                }}
              >
                ₹1,800/sf
              </span>
            </div>
          </motion.article>

          {/* BoQ — card */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="col-span-12 md:col-span-4"
            style={{
              background: "var(--color-card)",
              border: "0.5px solid var(--color-mist)",
              borderRadius: 12,
              padding: 28,
              minHeight: 280,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              className="inline-flex items-center justify-center mb-5"
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "var(--color-naxsha-wash)",
                color: "var(--color-naxsha)",
              }}
            >
              <Wrench size={18} strokeWidth={1.6} />
            </span>
            <h3 className="h-card" style={{ color: "var(--color-ink)", marginBottom: 8 }}>
              A BoQ your mistry trusts.
            </h3>
            <p className="t-body" style={{ flex: 1 }}>
              Cement in bags. Steel in tonnes. M-sand in cubic metres. Tiles in square feet. Output
              that gets quoted, not redrawn.
            </p>
            <div
              className="mt-5 pt-4 flex flex-wrap gap-x-4 gap-y-1"
              style={{ borderTop: "0.5px solid var(--color-mist)" }}
            >
              {["720 bags", "4.8 t", "38 cu·m"].map((v) => (
                <span
                  key={v}
                  className="tnum"
                  style={{
                    fontFamily: "var(--font-naxsha-mono)",
                    fontVariantNumeric: "tabular-nums",
                    fontSize: 11,
                    color: "var(--color-naxsha-deep)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {v}
                </span>
              ))}
            </div>
          </motion.article>

          {/* Row 3 — full-width dark cell (Iterate) */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="col-span-12 relative overflow-hidden"
            style={{
              background: "var(--color-naxsha)",
              border: "0.5px solid var(--color-naxsha-deep)",
              borderRadius: 12,
              padding: "clamp(28px, 3.6vw, 56px)",
              color: "#FFFFFF",
            }}
          >
            <div className="absolute inset-0 cta-grid pointer-events-none" aria-hidden />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-8 items-center">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-5">
                  <span
                    className="inline-flex items-center justify-center"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.12)",
                      border: "0.5px solid rgba(255,255,255,0.22)",
                      color: "#FFFFFF",
                    }}
                  >
                    <Layers size={18} strokeWidth={1.6} />
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-naxsha-mono)",
                      fontSize: 10.5,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.65)",
                    }}
                  >
                    Edit · re-stitch · re-quote
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "clamp(26px, 3vw, 40px)",
                    lineHeight: 1.06,
                    letterSpacing: "-0.02em",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    marginBottom: 12,
                    maxWidth: "22ch",
                  }}
                >
                  Iterate without starting over.
                </h3>
                <p
                  style={{
                    fontSize: 15.5,
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.78)",
                    maxWidth: 560,
                  }}
                >
                  Move the kitchen. Swap two bedrooms. Add a granny floor. The plan re-stitches in
                  seconds — costs, BoQ, and Vastu update with it. No redrawing.
                </p>
              </div>

              {/* Stat tiles */}
              <div className="flex flex-row lg:flex-col gap-3 lg:min-w-[220px]">
                {[
                  { k: "Re-stitch", v: "~12s" },
                  { k: "Iterations", v: "unlimited" },
                  { k: "Re-export", v: "1 click" },
                ].map((s) => (
                  <div
                    key={s.k}
                    className="flex-1"
                    style={{
                      padding: "12px 14px",
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.08)",
                      border: "0.5px solid rgba(255,255,255,0.16)",
                      minWidth: 0,
                    }}
                  >
                    <div
                      className="label"
                      style={{ color: "rgba(255,255,255,0.55)", marginBottom: 4 }}
                    >
                      {s.k}
                    </div>
                    <div
                      className="tnum"
                      style={{
                        fontFamily: "var(--font-naxsha-mono)",
                        fontVariantNumeric: "tabular-nums",
                        fontSize: 16,
                        fontWeight: 600,
                        color: "#FFFFFF",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom-right arrow callout */}
            <a
              href="#cta"
              className="hidden md:inline-flex items-center gap-2 mt-8"
              style={{
                fontFamily: "var(--font-naxsha-mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                opacity: 0.85,
              }}
            >
              Try it in the studio
              <ArrowUpRight size={13} strokeWidth={2} />
            </a>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
