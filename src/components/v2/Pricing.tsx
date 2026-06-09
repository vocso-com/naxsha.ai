"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Container, SectionEyebrow } from "./Container";

type Plan = {
  name: string;
  tagline: string;
  price: string;
  per: string;
  cta: string;
  features: string[];
  highlight?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Homeowner",
    tagline: "One home, every export you need.",
    price: "₹2,499",
    per: "one-time per plot",
    cta: "Draft my plan",
    features: [
      "3 AI-generated floor plans",
      "Live BoQ + INR estimates",
      "Vastu check + 12 layer toggles",
      "PDF + DWG + CSV export",
      "WhatsApp share with family",
    ],
  },
  {
    name: "Builder",
    tagline: "For builders running 4–20 sites a year.",
    price: "₹14,999",
    per: "per year",
    cta: "Open the studio",
    features: [
      "Unlimited plans & versions",
      "Multi-floor + stilt parking",
      "Labour calibrated to your taluka",
      "Branded PDF + client share links",
      "Bulk export, vendor connect",
      "Priority queue · ~10s drafts",
    ],
    highlight: true,
  },
  {
    name: "Studio",
    tagline: "For architecture practices that bill on output.",
    price: "Custom",
    per: "annual contract",
    cta: "Book a walkthrough",
    features: [
      "Team seats with role-based access",
      "Custom city rate-cards & rules",
      "API access + Revit export",
      "Dedicated drafting library",
      "Single sign-on, audit log, SLA",
    ],
  },
];

function PlanCard({ p, index }: { p: Plan; index: number }) {
  const dark = !!p.highlight;
  const titleColor = dark ? "#FFFFFF" : "var(--color-ink)";
  const muted = dark ? "rgba(255,255,255,0.78)" : "var(--color-graphite)";
  const subtle = dark
    ? "rgba(255,255,255,0.55)"
    : "var(--color-graphite-soft)";
  const divider = dark ? "rgba(255,255,255,0.16)" : "var(--color-mist)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: 0.08 + index * 0.08 }}
      whileHover={{ y: -3 }}
      className={`rounded-[20px] p-7 flex flex-col relative overflow-hidden ${dark ? "" : "glass"}`}
      style={
        dark
          ? {
              background: "var(--color-naxsha)",
              border: "0.5px solid var(--color-naxsha-deep)",
              transform: "translateY(-12px)",
            }
          : undefined
      }
    >
      {dark && (
        <div
          aria-hidden
          className="absolute inset-0 draft-grid-dark opacity-50"
        />
      )}
      {dark && (
        <div
          aria-hidden
          className="absolute rounded-full"
          style={{
            width: 220,
            height: 220,
            background: "var(--color-terracotta)",
            top: -90,
            right: -70,
            opacity: 0.22,
            mixBlendMode: "screen",
          }}
        />
      )}

      <div className="relative flex items-center justify-between">
        <h3
          className="text-[16px] font-semibold"
          style={{ color: titleColor }}
        >
          {p.name}
        </h3>
        {dark && (
          <span
            className="mono text-[10px] px-2 py-0.5 rounded-full font-semibold"
            style={{
              background: "var(--color-terracotta)",
              color: "#FFFFFF",
              letterSpacing: "0.12em",
            }}
          >
            POPULAR
          </span>
        )}
      </div>
      <p
        className="relative mt-2 text-[13px] leading-[1.55]"
        style={{ color: muted }}
      >
        {p.tagline}
      </p>

      <div className="relative mt-6">
        <div className="flex items-baseline gap-1.5">
          <span
            className="mono text-[32px] font-semibold leading-none tracking-tight"
            style={{ color: titleColor }}
          >
            {p.price}
          </span>
        </div>
        <div className="mt-1.5 label" style={{ color: subtle }}>
          {p.per}
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        whileHover={{ y: -1 }}
        className="relative mt-6 h-11 rounded-full text-[13.5px] font-medium inline-flex items-center justify-center"
        style={
          dark
            ? {
                background: "var(--color-terracotta)",
                color: "#FFFFFF",
              }
            : {
                color: "var(--color-naxsha)",
                border: "0.5px solid var(--color-mist)",
                background: "rgba(255,255,255,0.6)",
              }
        }
      >
        {p.cta}
      </motion.button>

      <ul
        className="relative mt-6 pt-6 space-y-3"
        style={{ borderTop: `0.5px solid ${divider}` }}
      >
        {p.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 text-[13.5px] leading-[1.55]"
            style={{
              color: dark ? "rgba(255,255,255,0.92)" : "var(--color-ink)",
            }}
          >
            <Check
              size={13}
              strokeWidth={2.5}
              className="mt-1 shrink-0"
              color={dark ? "#F4A87A" : "var(--color-verandah)"}
            />
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Pricing() {
  return (
    <section
      id="pricing"
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
          <SectionEyebrow num="·" label="PLANS" />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-end mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-semibold leading-[1.05]"
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              letterSpacing: "-0.025em",
              color: "var(--color-ink)",
              maxWidth: "20ch",
            }}
          >
            Priced per plan,{" "}
            <span style={{ color: "var(--color-naxsha)" }}>
              not per export.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="t-lead"
          >
            Pick a plan, draft your home, export everything. No drip-fed PDFs,
            no watermarked DWGs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {PLANS.map((p, i) => (
            <PlanCard key={p.name} p={p} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
