"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Sparkles, MapPin } from "lucide-react";
import { HeroFloorplan } from "./HeroFloorplan";

const stats = [
  { value: "12,400+", label: "homes drafted" },
  { value: "9 min", label: "first draft" },
  { value: "±4%", label: "BoQ accuracy" },
  { value: "62", label: "cities priced" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const planY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const planRotate = useTransform(scrollYProgress, [0, 1], [0, -1.2]);
  const annoY1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const annoY2 = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative"
      style={{ background: "var(--color-plot)", overflow: "hidden" }}
    >
      {/* Ambient color blobs — flat tinted circles, no gradients */}
      <motion.div
        aria-hidden
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "clamp(420px, 50vw, 820px)",
          height: "clamp(420px, 50vw, 820px)",
          background: "var(--color-naxsha-tint)",
          opacity: 0.6,
          top: "-12%",
          left: "-14%",
          y: blobY,
          zIndex: 0,
        }}
      />
      <motion.div
        aria-hidden
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "clamp(260px, 32vw, 540px)",
          height: "clamp(260px, 32vw, 540px)",
          background: "rgba(244,168,122,0.18)",
          top: "48%",
          right: "-8%",
          y: useTransform(scrollYProgress, [0, 1], [0, -90]),
          zIndex: 0,
        }}
      />

      {/* Subtle drafting grid wash behind everything */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-grid) 0.5px, transparent 0.5px), linear-gradient(to bottom, var(--color-grid) 0.5px, transparent 0.5px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at 50% 0%, black 0%, transparent 65%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 0%, black 0%, transparent 65%)",
        }}
      />

      <div className="wrap gutter pt-14 pb-28 md:pt-24 md:pb-36 grid grid-cols-1 lg:grid-cols-[1.1fr,0.9fr] gap-12 lg:gap-20 items-center relative z-10">
        {/* LEFT: copy */}
        <div className="min-w-0">
          {/* Eyebrow — glass pill */}
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-pill inline-flex items-center gap-1.5 px-3 h-7 rounded-full"
            style={{
              fontFamily: "var(--font-naxsha-mono)",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-naxsha-deep)",
            }}
          >
            <Sparkles size={11} strokeWidth={2.25} />
            Naxsha · India&apos;s AI floor plan studio
          </motion.span>

          {/* Headline — bold, oversized, leads with AI floor plans */}
          <h1
            className="mt-8 font-semibold"
            style={{
              fontSize: "clamp(48px, 8vw, 124px)",
              lineHeight: 0.96,
              letterSpacing: "-0.035em",
              color: "var(--color-ink)",
            }}
          >
            <span className="mask-line">
              <motion.span
                style={{ display: "inline-block" }}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              >
                AI floor plans
              </motion.span>
            </span>
            <span className="mask-line">
              <motion.span
                style={{ display: "inline-block" }}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.34 }}
              >
                <span style={{ color: "var(--color-naxsha)" }}>for the home</span>
              </motion.span>
            </span>
            <span className="mask-line">
              <motion.span
                style={{ display: "inline-block" }}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.48 }}
              >
                you&apos;ll actually build
                <span style={{ color: "var(--color-terracotta)" }}>.</span>
              </motion.span>
            </span>
          </h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="t-lead mt-8 max-w-[560px]"
          >
            Type your plot. Naxsha drafts a livable plan in minutes —
            with real ft-in dimensions, an INR cost your contractor will believe, and a BoQ in
            bags, tonnes, and cubic metres.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.95, duration: 0.4 }}
          >
            <a href="#cta" className="btn-primary" style={{ height: 52, padding: "12px 24px", fontSize: 15 }}>
              Draft my floor plan
              <ArrowRight size={15} strokeWidth={2} />
            </a>
            <a href="#how" className="btn-ghost" style={{ height: 52, padding: "12px 22px", fontSize: 14 }}>
              See how it works
            </a>
            <span
              className="hidden sm:inline-flex items-center gap-1.5 ml-2"
              style={{ fontSize: 12.5, color: "var(--color-graphite-soft)" }}
            >
              <MapPin size={12} />
              Priced for your city · no card required
            </span>
          </motion.div>

          {/* Trust strip */}
          <motion.dl
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 max-w-[640px]"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { delayChildren: 1.1, staggerChildren: 0.08 } } }}
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.4 }}
                className="min-w-0"
                style={{ borderLeft: "0.5px solid var(--color-mist)", paddingLeft: 14 }}
              >
                <dt
                  className="tnum"
                  style={{
                    fontFamily: "var(--font-naxsha-mono)",
                    fontVariantNumeric: "tabular-nums",
                    fontSize: 20,
                    fontWeight: 600,
                    color: "var(--color-naxsha-deep)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {s.value}
                </dt>
                <dd
                  style={{
                    fontSize: 12,
                    color: "var(--color-graphite)",
                    marginTop: 4,
                    lineHeight: 1.4,
                  }}
                >
                  {s.label}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        {/* RIGHT: studio frame with floor plan */}
        <motion.div
          className="relative min-w-0"
          style={{ y: planY, rotate: planRotate }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Glass studio frame */}
          <div
            className="glass relative mx-auto"
            style={{
              padding: 14,
              maxWidth: 640,
              borderRadius: 12,
            }}
          >
            <div className="flex items-center justify-between mb-2.5 px-1">
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ width: 8, height: 8, borderRadius: 999, background: "var(--color-verandah)" }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-naxsha-mono)",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-graphite)",
                  }}
                >
                  Studio · Draft #248 · live
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-naxsha-mono)",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-graphite)",
                }}
              >
                30 × 40 · 1,200 sf
              </span>
            </div>

            <div
              style={{
                background: "var(--color-plot)",
                border: "0.5px solid var(--color-mist)",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <HeroFloorplan />
            </div>
          </div>

          {/* Annotation pill 1 — top right, glass */}
          <motion.div
            className="hidden sm:flex absolute items-center gap-3"
            style={{
              top: -10,
              right: -12,
              y: annoY1,
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, type: "spring", stiffness: 220, damping: 22 }}
          >
            <div
              className="glass"
              style={{ padding: "10px 14px", borderRadius: 12, minWidth: 200 }}
            >
              <div className="label" style={{ marginBottom: 4 }}>Selected · NE light</div>
              <div
                style={{
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: "var(--color-ink)",
                  marginBottom: 2,
                }}
              >
                Master Bedroom
              </div>
              <div
                className="tnum"
                style={{
                  fontFamily: "var(--font-naxsha-mono)",
                  fontVariantNumeric: "tabular-nums",
                  fontSize: 11.5,
                  color: "var(--color-graphite)",
                }}
              >
                18&apos;-0&quot; × 12&apos;-0&quot; · 216 sf
              </div>
            </div>
          </motion.div>

          {/* Annotation pill 2 — bottom left, glass */}
          <motion.div
            className="hidden sm:block absolute"
            style={{ bottom: -18, left: -18, y: annoY2 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, type: "spring", stiffness: 220, damping: 22 }}
          >
            <div
              className="glass"
              style={{ padding: "12px 16px", borderRadius: 12, minWidth: 220 }}
            >
              <div className="label" style={{ marginBottom: 4 }}>Live estimate</div>
              <div
                className="tnum"
                style={{
                  fontFamily: "var(--font-naxsha-mono)",
                  fontVariantNumeric: "tabular-nums",
                  fontSize: 24,
                  fontWeight: 600,
                  color: "var(--color-naxsha-deep)",
                  letterSpacing: "-0.012em",
                }}
              >
                ₹21,60,000
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  color: "var(--color-graphite)",
                  marginTop: 4,
                  lineHeight: 1.5,
                }}
              >
                Standard finish · materials + labour · Bangalore Q2
              </div>
            </div>
          </motion.div>

          {/* Floating timer pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 22, delay: 2.2 }}
            className="hidden sm:inline-flex absolute items-center gap-2 px-3 h-9 rounded-full glass-pill"
            style={{ top: "44%", right: -22 }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--color-terracotta)" }}
            />
            <span
              className="tnum"
              style={{
                fontFamily: "var(--font-naxsha-mono)",
                fontVariantNumeric: "tabular-nums",
                fontSize: 11.5,
                color: "var(--color-ink)",
              }}
            >
              drafted in 58s
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
