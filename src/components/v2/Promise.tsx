"use client";

import { motion } from "motion/react";
import { Compass, IndianRupee, Hammer, ArrowUpRight } from "lucide-react";
import { Container } from "./Container";

type Promise = {
  id: string;
  num: string;
  eyebrow: string;
  title: string;
  body: string;
  metric: { label: string; value: string };
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
};

const PROMISES: Promise[] = [
  {
    id: "vastu",
    num: "01",
    eyebrow: "VASTU, BY DEFAULT",
    title: "12 traditions. Every plan.",
    body:
      "Pooja in the north-east. Kitchen south-east. Master south-west. Naxsha checks twelve Vastu principles on every layout — and tells you the tradeoff when geometry can't comply.",
    metric: { label: "PRINCIPLES", value: "12 / 12" },
    icon: Compass,
  },
  {
    id: "cost",
    num: "02",
    eyebrow: "LIVE COST IN ₹",
    title: "Every wall has a price.",
    body:
      "Move a partition. Switch a finish tier. Add a floor. The bill of quantities updates live — within ±4% of what your contractor will quote on site.",
    metric: { label: "ACCURACY", value: "±4%" },
    icon: IndianRupee,
  },
  {
    id: "boq",
    num: "03",
    eyebrow: "BoQ YOUR CONTRACTOR READS",
    title: "Cement. Steel. Brick.",
    body:
      "Measured the way Indian sites actually order. Cement in bags. Steel in tonnes. Brick in pieces. M-sand in cubic meters. Hand it over and work starts the same day.",
    metric: { label: "LINE ITEMS", value: "18 / plan" },
    icon: Hammer,
  },
];

function PromiseCard({ p, index }: { p: Promise; index: number }) {
  const Icon = p.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: 0.05 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="glass-dark relative rounded-[22px] p-7 lg:p-8 flex flex-col"
      style={{
        minHeight: 360,
      }}
    >
      {/* Big mono number — graphic moment */}
      <div className="flex items-start justify-between">
        <span
          className="mono font-semibold leading-none tracking-[-0.04em]"
          style={{
            color: "rgba(244,168,122,0.95)",
            fontSize: "clamp(48px, 5vw, 76px)",
          }}
        >
          {p.num}
        </span>
        <span
          className="h-10 w-10 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(244,168,122,0.14)",
          }}
        >
          <Icon size={16} strokeWidth={1.75} color="#F4A87A" />
        </span>
      </div>

      <span
        className="label mt-5"
        style={{
          color: "rgba(255,255,255,0.55)",
          letterSpacing: "0.14em",
        }}
      >
        {p.eyebrow}
      </span>

      <h3
        className="mt-3 font-semibold leading-[1.05] tracking-[-0.02em]"
        style={{
          fontSize: "clamp(22px, 2.2vw, 30px)",
          color: "#FFFFFF",
          maxWidth: "14ch",
        }}
      >
        {p.title}
      </h3>

      <p
        className="mt-4 text-[14px] leading-[1.6]"
        style={{
          color: "rgba(255,255,255,0.72)",
          maxWidth: "44ch",
        }}
      >
        {p.body}
      </p>

      {/* Bottom metric chip */}
      <div
        className="glass-pill mt-auto pt-6 inline-flex items-center gap-2 self-start"
      >
        <span
          className="glass-pill rounded-full px-3 h-9 inline-flex items-center gap-2"
          style={{
            background: "rgba(255,255,255,0.10)",
            border: "0.5px solid rgba(255,255,255,0.20)",
          }}
        >
          <span
            className="label"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {p.metric.label}
          </span>
          <span
            className="mono text-[13px] font-semibold"
            style={{ color: "#FFFFFF" }}
          >
            {p.metric.value}
          </span>
        </span>
      </div>
    </motion.article>
  );
}

export function Promise() {
  return (
    <section
      id="how"
      className="section-deep relative overflow-hidden"
      style={{
        paddingTop: "clamp(96px, 11vw, 160px)",
        paddingBottom: "clamp(96px, 11vw, 160px)",
      }}
    >
      {/* Drafted grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 draft-grid-dark pointer-events-none"
        style={{ opacity: 0.6 }}
      />
      {/* Terracotta accent halo */}
      <div
        aria-hidden
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 480,
          height: 480,
          background: "var(--color-terracotta)",
          opacity: 0.10,
          top: "-160px",
          right: "-120px",
          mixBlendMode: "screen",
        }}
      />
      <div
        aria-hidden
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 380,
          height: 380,
          background: "var(--color-naxsha-lift)",
          opacity: 0.18,
          bottom: "-120px",
          left: "-100px",
          mixBlendMode: "screen",
        }}
      />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-end mb-14"
        >
          <div>
            <span
              className="glass-pill inline-flex items-center gap-2 px-2.5 py-1 rounded-full label"
              style={{
                background: "rgba(255,255,255,0.10)",
                border: "0.5px solid rgba(255,255,255,0.20)",
                color: "rgba(244,168,122,0.95)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--color-terracotta)" }}
              />
              WHAT EVERY PLAN SHIPS WITH
            </span>
            <h2
              className="mt-5 font-semibold leading-[1.02] tracking-[-0.028em]"
              style={{
                fontSize: "clamp(40px, 5.4vw, 76px)",
                color: "#FFFFFF",
                maxWidth: "16ch",
              }}
            >
              Three promises,
              <br />
              <span style={{ color: "var(--color-terracotta-soft)" }}>
                non-negotiable.
              </span>
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            <p
              className="text-[15px] lg:text-[17px] leading-[1.6]"
              style={{
                color: "rgba(255,255,255,0.75)",
                maxWidth: "44ch",
              }}
            >
              Vastu compliance, live INR cost, and a BoQ your contractor can
              read. Built into every Naxsha plan, by default — not as a paid
              add-on.
            </p>
            <a
              href="#how"
              className="self-start inline-flex items-center gap-1.5 text-[13.5px]"
              style={{ color: "var(--color-terracotta-soft)" }}
            >
              See the studio in action
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {PROMISES.map((p, i) => (
            <PromiseCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
