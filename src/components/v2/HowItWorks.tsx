"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Section, SectionEyebrow } from "./Container";
import { Compass, Sparkles, FileDown } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: Compass,
    title: "Tell Naxsha about your plot",
    body:
      "Plot size, facing direction, setback rules, family count, lifestyle, and an honest budget. Two minutes, plain language.",
    note: "Or paste a survey number — we pull dimensions from local records.",
  },
  {
    num: "02",
    icon: Sparkles,
    title: "Generate Vastu-aware layouts",
    body:
      "Naxsha drafts 3 working plans on the canvas. Move walls, swap rooms, ask “make Bedroom 2 bigger” — every change updates BoQ and budget live.",
    note: "All dimensions in feet and inches. All money in INR.",
  },
  {
    num: "03",
    icon: FileDown,
    title: "Refine and export",
    body:
      "Lock the version you love. Export PDF, DWG, and a labour-priced BoQ your contractor can act on tomorrow.",
    note: "Optionally share with vetted architects in your city.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <SectionEyebrow num="01" label="HOW IT WORKS" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-end mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="h-section"
          style={{ maxWidth: "22ch" }}
        >
          Three steps from a vacant plot to a buildable plan.
        </motion.h2>

        {/* Atmosphere image — drafting table, top-down */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-[12px] overflow-hidden aspect-[16/9] hidden md:block"
          style={{ border: "0.5px solid var(--color-mist)" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
            alt="Drafting table with floor plan, chai, and ruler — top-down"
            width={1200}
            height={675}
            className="object-cover w-full h-full"
            style={{
              filter: "saturate(0.18) contrast(1.02)",
            }}
            unoptimized
          />
          {/* Duotone wash: Naxsha Blue multiply + Plot Paper screen */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, rgba(0,61,122,0.14), rgba(0,61,122,0.14)), linear-gradient(0deg, rgba(250,250,247,0.08), rgba(250,250,247,0.08))",
              mixBlendMode: "multiply",
            }}
          />
          {/* Hairline frame caption */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span className="label" style={{ color: "rgba(255,255,255,0.92)" }}>
              STUDIO · DRAFT IN PROGRESS
            </span>
            <span className="mono text-[10px]" style={{ color: "rgba(255,255,255,0.78)" }}>
              30&apos;-0&quot; × 40&apos;-0&quot;
            </span>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -2 }}
              className="rounded-[12px] p-6 flex flex-col"
              style={{
                background: "var(--color-card)",
                border: "0.5px solid var(--color-mist)",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="mono text-[10px] font-semibold px-1.5 py-0.5 rounded-[3px]"
                  style={{
                    background: "var(--color-naxsha-tint)",
                    color: "var(--color-naxsha-deep)",
                    letterSpacing: "0.12em",
                  }}
                >
                  STEP {s.num}
                </span>
                <Icon
                  size={18}
                  strokeWidth={1.5}
                  color={
                    i === 1 ? "var(--color-terracotta)" : "var(--color-naxsha)"
                  }
                />
              </div>
              <h3 className="mt-5 h-card">{s.title}</h3>
              <p className="mt-2 t-body">{s.body}</p>
              <div
                className="mt-6 pt-4 label"
                style={{
                  borderTop: "0.5px solid var(--color-mist)",
                  color: "var(--color-graphite-soft)",
                }}
              >
                {s.note}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
