"use client";

import { motion } from "motion/react";

const COLS = [
  {
    heading: "Studio",
    links: ["Open studio", "Draft a plan", "Cost calculator", "BoQ export"],
  },
  {
    heading: "Plans",
    links: ["20×30", "30×40", "40×60", "60×90", "All sizes"],
  },
  {
    heading: "Build",
    links: ["For homeowners", "For architects", "For builders", "API"],
  },
  {
    heading: "Company",
    links: ["About", "Careers", "Press", "Blog"],
  },
  {
    heading: "Legal",
    links: ["Privacy", "Terms", "Refund policy", "Status"],
  },
];

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-card)",
        borderTop: "0.5px solid var(--color-mist)",
      }}
    >
      <div className="wrap gutter py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-14"
        >
          {COLS.map((c) => (
            <div key={c.heading} className="min-w-0">
              <div className="label mb-4" style={{ color: "var(--color-naxsha-deep)" }}>
                {c.heading}
              </div>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      style={{
                        fontSize: 13,
                        color: "var(--color-graphite)",
                        transition: "color 180ms ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-naxsha)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-graphite)")}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
          style={{ borderTop: "0.5px solid var(--color-mist)", paddingTop: 26 }}
        >
          <div className="flex items-center gap-3">
            <span
              style={{
                width: 22,
                height: 22,
                border: "1.5px solid var(--color-naxsha)",
                borderRadius: 4,
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 3,
                  border: "1px solid var(--color-naxsha)",
                  borderRadius: 2,
                  opacity: 0.4,
                }}
              />
            </span>
            <span
              style={{
                fontFamily: "var(--font-naxsha-mono)",
                fontSize: 12,
                letterSpacing: "0.16em",
                fontWeight: 600,
                color: "var(--color-naxsha-deep)",
              }}
            >
              NAXSHA
            </span>
            <span style={{ fontSize: 12, color: "var(--color-graphite)" }}>
              © 2026 · Drafted in Bangalore
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "var(--color-verandah)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-naxsha-mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-graphite)",
              }}
            >
              All systems drafting
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
