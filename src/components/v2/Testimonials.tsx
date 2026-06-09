"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Section, SectionEyebrow } from "./Container";

const QUOTES = [
  {
    name: "Rohit Sharma",
    role: "Homeowner · Pune",
    initials: "RS",
    avatar:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=facearea&facepad=2.4&w=160&h=160&q=80",
    quote:
      "We started with a 30 × 40 plot and a fight in the family WhatsApp group. Naxsha gave us three plans in a minute. We picked one, tweaked the kitchen, and showed it to our contractor the same evening.",
    metric: { label: "BUILT FOR", value: "₹24.8 L" },
  },
  {
    name: "Ar. Meera Iyer",
    role: "Architect · Bengaluru",
    initials: "MI",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2.4&w=160&h=160&q=80",
    quote:
      "The drafting hygiene is what surprised me. Wall thicknesses are right. Stair widths meet code. Door swings don't crash. It's a real plan, not a render.",
    metric: { label: "PLANS / MONTH", value: "32" },
  },
  {
    name: "Bharat Patel",
    role: "Site contractor · Ahmedabad",
    initials: "BP",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=facearea&facepad=2.4&w=160&h=160&q=80",
    quote:
      "The BoQ is the part I care about. Cement in bags, steel in tonnes, brick in pieces — exactly the way I order. Estimates came within 6% of what we actually spent.",
    metric: { label: "BoQ ERROR", value: "±5%" },
  },
];

export function Testimonials() {
  return (
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <SectionEyebrow num="04" label="WHAT PEOPLE SAY" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="h-section mb-12"
        style={{ maxWidth: "28ch" }}
      >
        Used by homeowners, architects, and the people who actually pour the
        concrete.
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {QUOTES.map((q, i) => (
          <motion.figure
            key={q.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            whileHover={{ y: -2 }}
            className="rounded-[12px] p-6 flex flex-col"
            style={{
              background: "var(--color-card)",
              border: "0.5px solid var(--color-mist)",
            }}
          >
            <div
              className="mono text-[34px] leading-none font-semibold"
              style={{
                color:
                  i === 1 ? "var(--color-terracotta)" : "var(--color-naxsha)",
              }}
              aria-hidden
            >
              &ldquo;
            </div>
            <blockquote
              className="mt-3 text-[14px] leading-[1.65]"
              style={{ color: "var(--color-ink)" }}
            >
              {q.quote}
            </blockquote>
            <figcaption
              className="mt-6 pt-4 flex items-center gap-3"
              style={{ borderTop: "0.5px solid var(--color-mist)" }}
            >
              <div
                className="relative h-9 w-9 rounded-full overflow-hidden flex items-center justify-center text-white text-[11px] font-semibold shrink-0"
                style={{
                  background:
                    i === 1
                      ? "var(--color-terracotta)"
                      : "var(--color-naxsha-deep)",
                }}
              >
                <Image
                  src={q.avatar}
                  alt={`${q.name} avatar`}
                  width={36}
                  height={36}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    filter:
                      "saturate(0.12) contrast(1.05) brightness(1.02)",
                    mixBlendMode: "luminosity",
                    opacity: 0.95,
                  }}
                  unoptimized
                />
                <span className="relative">{q.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-[13px] font-medium"
                  style={{ color: "var(--color-ink)" }}
                >
                  {q.name}
                </div>
                <div
                  className="text-[12px]"
                  style={{ color: "var(--color-graphite-soft)" }}
                >
                  {q.role}
                </div>
              </div>
              <div className="text-right">
                <div className="label">{q.metric.label}</div>
                <div className="mono text-[13px] text-ink font-semibold">
                  {q.metric.value}
                </div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}
