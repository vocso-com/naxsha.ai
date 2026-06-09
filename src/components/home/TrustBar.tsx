"use client";

import { motion } from "motion/react";

const PLOTS = ["20×30", "25×40", "30×40", "30×50", "40×60", "50×80", "60×90"];

const FACTS = [
  { k: "Plan accuracy", v: "1:50 drawings" },
  { k: "Cost basis", v: "city-tagged Q2 rates" },
  { k: "BoQ accuracy", v: "±4% on completed builds" },
  { k: "Exports", v: "PDF · DWG · CSV" },
];

export function TrustBar() {
  return (
    <section
      style={{
        background: "var(--color-naxsha-wash)",
        borderTop: "0.5px solid var(--color-mist)",
        borderBottom: "0.5px solid var(--color-mist)",
      }}
    >
      <div className="wrap gutter py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8 md:gap-14 items-start">
            <div className="min-w-0">
              <div className="label mb-3">Plot sizes supported</div>
              <div className="flex flex-wrap gap-1.5">
                {PLOTS.map((p) => (
                  <span
                    key={p}
                    className="tnum"
                    style={{
                      fontFamily: "var(--font-naxsha-mono)",
                      fontVariantNumeric: "tabular-nums",
                      fontSize: 12,
                      fontWeight: 500,
                      color: "var(--color-naxsha-deep)",
                      padding: "5px 10px",
                      border: "0.5px solid var(--color-mist)",
                      borderRadius: 6,
                      background: "#FFFFFF",
                    }}
                  >
                    {p}
                  </span>
                ))}
                <span
                  className="tnum"
                  style={{
                    fontFamily: "var(--font-naxsha-mono)",
                    fontSize: 11.5,
                    color: "var(--color-graphite)",
                    padding: "5px 10px",
                    letterSpacing: "0.04em",
                  }}
                >
                  + custom · priced for 62 Indian cities
                </span>
              </div>
            </div>

            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 min-w-0">
              {FACTS.map((f) => (
                <div
                  key={f.k}
                  className="min-w-0"
                  style={{
                    borderLeft: "0.5px solid var(--color-mist)",
                    paddingLeft: 12,
                  }}
                >
                  <dt className="label" style={{ marginBottom: 4 }}>{f.k}</dt>
                  <dd
                    style={{
                      fontSize: 13.5,
                      fontWeight: 500,
                      color: "var(--color-naxsha-deep)",
                      lineHeight: 1.35,
                    }}
                  >
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
