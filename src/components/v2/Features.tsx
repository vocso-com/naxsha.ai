"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate, useScroll, useTransform } from "motion/react";
import {
  Compass,
  IndianRupee,
  Hammer,
  Layers,
  FileDown,
  Sparkles,
  ArrowUpRight,
  Zap,
  Check,
} from "lucide-react";
import { Container } from "./Container";

// ============ Big hero advantage card ============
function SpeedHero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [val, setVal] = useState(58);

  useEffect(() => {
    if (!inView) return;
    const c = animate(60, 58, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (n) => setVal(Math.round(n)),
    });
    return () => c.stop();
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="glass-dark relative rounded-[24px] p-9 lg:p-12 overflow-hidden flex flex-col justify-between"
      style={{
        gridColumn: "span 6",
        minHeight: 360,
        background: "rgba(0,41,82,0.92)",
      }}
    >
      <div aria-hidden className="absolute inset-0 draft-grid-dark opacity-50" />
      <div
        aria-hidden
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 420,
          height: 420,
          background: "var(--color-terracotta)",
          opacity: 0.18,
          top: -160,
          right: -120,
          mixBlendMode: "screen",
        }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end w-full">
        <div>
          <span
            className="glass-pill inline-flex items-center gap-2 px-2.5 py-1 rounded-full label"
            style={{
              background: "rgba(255,255,255,0.10)",
              border: "0.5px solid rgba(255,255,255,0.20)",
              color: "rgba(244,168,122,0.95)",
            }}
          >
            <Zap size={11} strokeWidth={2.25} />
            ADVANTAGE 01 · SPEED
          </span>
          <h3
            className="mt-5 font-bold leading-[1.02] tracking-[-0.03em]"
            style={{
              fontSize: "clamp(36px, 5vw, 72px)",
              color: "#FFFFFF",
              maxWidth: "16ch",
            }}
          >
            From plot dimensions to{" "}
            <span style={{ color: "var(--color-terracotta-soft)" }}>
              three buildable plans
            </span>{" "}
            in 58 seconds.
          </h3>
          <p
            className="mt-4 text-[15px] leading-[1.6]"
            style={{ color: "rgba(255,255,255,0.78)", maxWidth: 540 }}
          >
            Paste a survey number or type your plot size. Naxsha returns three
            working layouts — each with INR cost, Vastu checks, and a
            contractor BoQ — faster than your morning chai.
          </p>
        </div>

        <div className="text-right">
          <div
            className="mono font-bold leading-none tracking-[-0.04em]"
            style={{
              fontSize: "clamp(72px, 9vw, 160px)",
              color: "#FFFFFF",
            }}
          >
            {val}
            <span style={{ color: "var(--color-terracotta-soft)" }}>s</span>
          </div>
          <div
            className="label mt-3"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            AVG FIRST DRAFT
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============ Smaller advantage cards ============
type Adv = {
  num: string;
  eyebrow: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
  title: string;
  body: string;
  metric: { v: string; l: string };
  variant: "tint" | "terracotta" | "deep" | "verandah" | "glass";
};

const ADVS: Adv[] = [
  {
    num: "02",
    eyebrow: "VASTU",
    icon: Compass,
    title: "Vastu, on by default.",
    body:
      "12 traditional principles checked on every layout. When geometry conflicts with tradition, Naxsha tells you the tradeoff in plain language.",
    metric: { v: "12 / 12", l: "PRINCIPLES" },
    variant: "tint",
  },
  {
    num: "03",
    eyebrow: "ACCURACY",
    icon: IndianRupee,
    title: "±4% on built-up cost.",
    body:
      "Live BoQ keyed to your taluka, refreshed weekly. The price you see drafted is within 4% of what your contractor will quote on site.",
    metric: { v: "±4%", l: "BoQ ERROR" },
    variant: "verandah",
  },
  {
    num: "04",
    eyebrow: "INDIAN SITES",
    icon: Hammer,
    title: "BoQ in bags, tonnes, and pieces.",
    body:
      "Cement in bags. Steel in tonnes. Brick in pieces. M-sand in cubic meters. Measured the way Indian sites actually order materials.",
    metric: { v: "18 / plan", l: "LINE ITEMS" },
    variant: "deep",
  },
  {
    num: "05",
    eyebrow: "STACKS",
    icon: Layers,
    title: "Stilt, ground, first, terrace.",
    body:
      "Multi-floor planning that stacks walls correctly, places staircases that meet code, and shows you the cross-section.",
    metric: { v: "G+4", l: "MAX HEIGHT" },
    variant: "terracotta",
  },
  {
    num: "06",
    eyebrow: "EXPORT",
    icon: FileDown,
    title: "Six exports, no watermark.",
    body:
      "PDF for family. DWG for the architect. CSV BoQ for the contractor. DXF, PNG, Revit — every file your team will ever ask for.",
    metric: { v: "6", l: "FORMATS" },
    variant: "glass",
  },
];

function AdvCard({ a, index, span }: { a: Adv; index: number; span: number }) {
  const Icon = a.icon;

  // Color palettes per variant
  const palette = {
    tint: {
      bg: "rgba(216,228,241,0.7)",
      accent: "var(--color-naxsha)",
      accentSoft: "var(--color-naxsha-tint)",
      eyebrow: "var(--color-naxsha-lift)",
      text: "var(--color-ink)",
      muted: "var(--color-graphite)",
      subtle: "var(--color-naxsha-deep)",
      divider: "var(--color-mist)",
      dark: false,
      gridClass: "draft-grid-light",
      gridOpacity: 0.45,
    },
    terracotta: {
      bg: "rgba(244,168,122,0.16)",
      accent: "var(--color-terracotta)",
      accentSoft: "rgba(184,85,43,0.16)",
      eyebrow: "var(--color-terracotta)",
      text: "var(--color-ink)",
      muted: "var(--color-graphite)",
      subtle: "var(--color-terracotta)",
      divider: "rgba(184,85,43,0.22)",
      dark: false,
      gridClass: "draft-grid-light",
      gridOpacity: 0.4,
    },
    verandah: {
      bg: "rgba(77,124,15,0.10)",
      accent: "var(--color-verandah)",
      accentSoft: "rgba(77,124,15,0.18)",
      eyebrow: "var(--color-verandah)",
      text: "var(--color-ink)",
      muted: "var(--color-graphite)",
      subtle: "var(--color-verandah)",
      divider: "rgba(77,124,15,0.22)",
      dark: false,
      gridClass: "draft-grid-light",
      gridOpacity: 0.4,
    },
    deep: {
      bg: "rgba(0,41,82,0.92)",
      accent: "#F4A87A",
      accentSoft: "rgba(244,168,122,0.18)",
      eyebrow: "rgba(244,168,122,0.95)",
      text: "#FFFFFF",
      muted: "rgba(255,255,255,0.75)",
      subtle: "rgba(255,255,255,0.55)",
      divider: "rgba(255,255,255,0.16)",
      dark: true,
      gridClass: "draft-grid-dark",
      gridOpacity: 0.4,
    },
    glass: {
      bg: "rgba(255,255,255,0.65)",
      accent: "var(--color-naxsha)",
      accentSoft: "var(--color-naxsha-tint)",
      eyebrow: "var(--color-naxsha-lift)",
      text: "var(--color-ink)",
      muted: "var(--color-graphite)",
      subtle: "var(--color-naxsha-deep)",
      divider: "var(--color-mist)",
      dark: false,
      gridClass: "draft-grid-light",
      gridOpacity: 0.4,
    },
  } as const;

  const p = palette[a.variant];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: 0.05 + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className={`${p.dark ? "glass-dark" : "glass"} relative rounded-[22px] p-7 lg:p-8 flex flex-col overflow-hidden`}
      style={{
        background: p.bg,
        gridColumn: `span ${span}`,
        minHeight: 320,
      }}
    >
      <div
        aria-hidden
        className={`absolute inset-0 ${p.gridClass} pointer-events-none`}
        style={{ opacity: p.gridOpacity }}
      />

      <div className="relative flex items-start justify-between">
        <span
          className="mono text-[11px] font-semibold px-2 py-0.5 rounded-full"
          style={{
            background: p.accentSoft,
            color: p.accent,
            letterSpacing: "0.14em",
          }}
        >
          {a.num}
        </span>
        <span
          className="h-9 w-9 rounded-full flex items-center justify-center"
          style={{ background: p.accentSoft }}
        >
          <Icon size={15} strokeWidth={1.75} color={p.accent} />
        </span>
      </div>

      <span
        className="label mt-5"
        style={{ color: p.eyebrow, letterSpacing: "0.14em" }}
      >
        {a.eyebrow}
      </span>

      <h3
        className="mt-2 font-bold leading-[1.08] tracking-[-0.02em]"
        style={{
          fontSize: "clamp(20px, 2vw, 26px)",
          color: p.text,
          maxWidth: "14ch",
        }}
      >
        {a.title}
      </h3>

      <p
        className="mt-3 text-[14px] leading-[1.6]"
        style={{ color: p.muted, maxWidth: "42ch" }}
      >
        {a.body}
      </p>

      <div
        className="mt-auto pt-5 flex items-end justify-between"
        style={{ borderTop: `0.5px solid ${p.divider}` }}
      >
        <div>
          <div
            className="mono font-semibold leading-none"
            style={{
              fontSize: "clamp(22px, 2.2vw, 28px)",
              color: p.text,
            }}
          >
            {a.metric.v}
          </div>
          <div className="label mt-1.5" style={{ color: p.subtle }}>
            {a.metric.l}
          </div>
        </div>
        <Check size={16} strokeWidth={2.25} color={p.accent} />
      </div>
    </motion.article>
  );
}

function FeaturesHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-end mb-12"
    >
      <div>
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="glass inline-flex items-center gap-2 px-3 h-8 rounded-full label"
          style={{ color: "var(--color-naxsha-deep)" }}
        >
          <Sparkles size={11} strokeWidth={2.5} className="text-terracotta" />
          WHY HOMEOWNERS PICK NAXSHA
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-5 font-bold leading-[1.0] tracking-[-0.028em]"
          style={{
            fontSize: "clamp(40px, 5.4vw, 76px)",
            color: "var(--color-ink)",
            maxWidth: "18ch",
          }}
        >
          Six things only Naxsha{" "}
          <span style={{ color: "var(--color-naxsha)" }}>
            does for Indian homes.
          </span>
        </motion.h2>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col gap-3"
      >
        <p
          className="text-[15px] lg:text-[17px] leading-[1.6]"
          style={{ color: "var(--color-graphite)", maxWidth: "44ch" }}
        >
          Built for the way Indian families plan a home and Indian sites build
          one. Not a glossy 3D walkthrough — a measured drafting studio.
        </p>
        <a
          href="#features"
          className="inline-flex items-center gap-1.5 text-[13.5px] self-start font-medium"
          style={{ color: "var(--color-naxsha-lift)" }}
        >
          See every advantage
          <ArrowUpRight size={13} strokeWidth={2.5} />
        </a>
      </motion.div>
    </motion.div>
  );
}

export function Features() {
  return (
    <section
      id="features"
      className="section-plot relative"
      style={{
        paddingTop: "clamp(96px, 11vw, 160px)",
        paddingBottom: "clamp(96px, 11vw, 160px)",
      }}
    >
      <Container>
        <FeaturesHeader />

        <div
          className="grid gap-4 lg:gap-5"
          style={{ gridTemplateColumns: "repeat(6, minmax(0, 1fr))" }}
        >
          <SpeedHero />
          {ADVS.map((a, i) => (
            // Row 2: 3 cards × span 2 (= 6). Row 3: 2 cards × span 3 (= 6).
            <AdvCard
              key={a.num}
              a={a}
              index={i}
              span={i < 3 ? 2 : 3}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
