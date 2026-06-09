"use client";

import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";

const PLANS = [
  {
    name: "Homeowner",
    blurb: "One plot, one home, one weekend.",
    price: "₹2,400",
    suffix: "one-time",
    cta: "Draft my plan",
    features: [
      "1 plot · unlimited iterations",
      "PDF + DWG export",
      "BoQ + city cost basis",
      "Vastu & climate checks",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Builder",
    blurb: "For practices drafting 5–20 plans a month.",
    price: "₹14,800",
    suffix: "per month",
    cta: "Start the studio",
    features: [
      "20 plots / month",
      "PDF + DWG + CSV exports",
      "Branded plan covers",
      "Multi-floor + granny floor",
      "Priority support · 1 day",
      "Client share links",
    ],
    popular: true,
  },
  {
    name: "Studio",
    blurb: "Architecture firms running pipelines.",
    price: "Talk to us",
    suffix: "annual",
    cta: "Book a call",
    features: [
      "Unlimited plots + projects",
      "DWG layer customization",
      "Team seats · roles",
      "API access for ERP / CRM",
      "Dedicated success lead",
      "On-site onboarding",
    ],
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" style={{ background: "var(--color-card)", borderTop: "0.5px solid var(--color-mist)" }}>
      <div className="wrap gutter py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-[640px] mb-12"
        >
          <div className="label mb-3">Pricing</div>
          <h2 className="h-section" style={{ color: "var(--color-ink)" }}>
            Three ways to draft. Each one ends with a plan you can build.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 min-w-0">
          {PLANS.map((p, i) => {
            const dark = p.popular;
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="price-card relative min-w-0 flex flex-col"
                style={{
                  background: dark ? "var(--color-naxsha)" : "#FFFFFF",
                  border: dark
                    ? "0.5px solid var(--color-naxsha-deep)"
                    : "0.5px solid var(--color-mist)",
                  borderRadius: 12,
                  padding: 28,
                  color: dark ? "#FFFFFF" : "var(--color-ink)",
                }}
              >
                {p.popular && (
                  <span
                    className="absolute"
                    style={{
                      top: -10,
                      right: 20,
                      padding: "4px 10px",
                      borderRadius: 999,
                      background: "var(--color-terracotta)",
                      color: "#FFFFFF",
                      fontFamily: "var(--font-naxsha-mono)",
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    Popular
                  </span>
                )}

                <div className="flex items-baseline justify-between mb-1">
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                      color: dark ? "#FFFFFF" : "var(--color-ink)",
                    }}
                  >
                    {p.name}
                  </h3>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: dark ? "rgba(255,255,255,0.7)" : "var(--color-graphite)",
                    marginBottom: 22,
                    lineHeight: 1.5,
                  }}
                >
                  {p.blurb}
                </p>

                <div className="flex items-baseline gap-2 mb-1">
                  <span
                    className="tnum"
                    style={{
                      fontFamily: "var(--font-naxsha-mono)",
                      fontVariantNumeric: "tabular-nums",
                      fontSize: "clamp(28px, 3vw, 36px)",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      color: dark ? "#FFFFFF" : "var(--color-naxsha-deep)",
                    }}
                  >
                    {p.price}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-naxsha-mono)",
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: dark ? "rgba(255,255,255,0.6)" : "var(--color-graphite)",
                    marginBottom: 24,
                  }}
                >
                  {p.suffix}
                </div>

                <a
                  href="#cta"
                  className={dark ? "btn-primary w-full" : "btn-ghost w-full"}
                  style={dark ? {} : { borderColor: "var(--color-mist)" }}
                >
                  {p.cta}
                  <ArrowRight size={14} strokeWidth={2} />
                </a>

                <div
                  style={{
                    height: 0.5,
                    background: dark ? "rgba(255,255,255,0.16)" : "var(--color-mist)",
                    margin: "24px 0 18px",
                  }}
                />

                <ul className="space-y-3 flex-1">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5"
                      style={{
                        fontSize: 13.5,
                        lineHeight: 1.55,
                        color: dark ? "rgba(255,255,255,0.9)" : "var(--color-ink)",
                      }}
                    >
                      <Check
                        size={14}
                        strokeWidth={2.2}
                        style={{
                          color: dark ? "#FFFFFF" : "var(--color-verandah)",
                          marginTop: 3,
                          flexShrink: 0,
                          opacity: dark ? 0.8 : 1,
                        }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
