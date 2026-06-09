"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export function FinalCTA() {
  const [size, setSize] = useState("30×40");
  return (
    <section id="cta" style={{ background: "var(--color-plot)", padding: "24px 0" }}>
      <div className="wrap gutter">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden"
          style={{
            background: "var(--color-naxsha)",
            borderRadius: 12,
            padding: "clamp(40px, 6vw, 80px) clamp(28px, 5vw, 72px)",
            color: "#FFFFFF",
          }}
        >
          <div aria-hidden className="absolute inset-0 cta-grid pointer-events-none" />
          {/* corner crop marks */}
          {[
            { top: 16, left: 16, rotate: 0 },
            { top: 16, right: 16, rotate: 90 },
            { bottom: 16, right: 16, rotate: 180 },
            { bottom: 16, left: 16, rotate: -90 },
          ].map((c, i) => (
            <svg
              key={i}
              aria-hidden
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              style={{
                position: "absolute",
                top: c.top,
                bottom: c.bottom,
                left: c.left,
                right: c.right,
                transform: `rotate(${c.rotate}deg)`,
              }}
            >
              <path d="M0 0 L0 14 M0 0 L14 0" stroke="rgba(255,255,255,0.35)" strokeWidth="0.75" />
            </svg>
          ))}

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
            <div className="min-w-0">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="h-section"
                style={{ color: "#FFFFFF", letterSpacing: "-0.02em" }}
              >
                Start your plan. Finish before chai gets cold.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.12 }}
                style={{
                  color: "rgba(255,255,255,0.8)",
                  marginTop: 14,
                  maxWidth: 540,
                  fontSize: "clamp(15px, 1.1vw, 17px)",
                  lineHeight: 1.6,
                }}
              >
                Drop your plot dimensions. The studio drafts. You walk away with a plan you can
                actually build.
              </motion.p>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.18 }}
              onSubmit={(e) => e.preventDefault()}
              className="min-w-0 flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1 min-w-0">
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontFamily: "var(--font-naxsha-mono)",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  Plot
                </span>
                <input
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="30×40"
                  aria-label="Plot dimensions"
                  style={{
                    width: "100%",
                    minHeight: 52,
                    padding: "10px 16px 10px 60px",
                    background: "rgba(255,255,255,0.08)",
                    border: "0.5px solid rgba(255,255,255,0.28)",
                    borderRadius: 10,
                    color: "#FFFFFF",
                    fontFamily: "var(--font-naxsha-mono)",
                    fontVariantNumeric: "tabular-nums",
                    fontSize: 16,
                    letterSpacing: "0.02em",
                    outline: "none",
                    transition: "border-color 200ms ease, background 200ms ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn-primary"
                style={{ height: 52, minHeight: 52, flexShrink: 0 }}
              >
                Draft plan
                <ArrowRight size={15} strokeWidth={2} />
              </button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
