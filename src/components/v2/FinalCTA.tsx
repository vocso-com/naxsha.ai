"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "./Container";

export function FinalCTA() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden"
      style={{
        paddingTop: "clamp(56px, 6vw, 88px)",
        paddingBottom: "clamp(56px, 6vw, 88px)",
        background: "var(--color-naxsha)",
      }}
    >
      {/* Masked Indian-home photo backdrop */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=82"
          alt=""
          fill
          className="object-cover"
          style={{ filter: "saturate(0.4) contrast(1.05)" }}
          unoptimized
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "rgba(0,41,82,0.84)",
          mixBlendMode: "multiply",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "rgba(0,61,122,0.40)",
          mixBlendMode: "screen",
        }}
      />
      <div aria-hidden className="absolute inset-0 draft-grid-dark opacity-60" />
      <div
        aria-hidden
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 540,
          height: 540,
          background: "var(--color-terracotta)",
          opacity: 0.18,
          top: "-160px",
          right: "-160px",
          mixBlendMode: "screen",
        }}
      />

      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow — plain element, no motion-gated visibility */}
          <span
            className="glass-pill inline-flex items-center gap-2 px-3 h-8 rounded-full label"
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "0.5px solid rgba(255,255,255,0.22)",
              color: "rgba(244,168,122,0.95)",
              letterSpacing: "0.14em",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--color-terracotta)" }}
            />
            READY WHEN YOU ARE
          </span>

          <h2
            className="mt-5 font-bold leading-[1.04] tracking-[-0.03em]"
            style={{
              fontSize: "clamp(30px, 4.4vw, 60px)",
              color: "#FFFFFF",
              maxWidth: "20ch",
            }}
          >
            Drop in your plot dimensions.
            <br />
            <span style={{ color: "var(--color-terracotta-soft)" }}>
              Walk out with a buildable plan.
            </span>
          </h2>

          <p
            className="mt-4 leading-[1.55]"
            style={{
              color: "rgba(255,255,255,0.82)",
              fontSize: "clamp(14px, 1vw, 16px)",
              maxWidth: "min(560px, 56ch)",
            }}
          >
            Three working layouts. Live BoQ in INR. PDF, DWG, and CSV exports.
            Free to draft, only pay when you export.
          </p>

          {/* Buttons — plain, always rendered (no whileInView gating) */}
          <div className="mt-7 flex flex-col items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              href="#cta"
              className="h-14 px-8 inline-flex items-center gap-2.5 rounded-full text-[16px] font-semibold text-white"
              style={{
                background: "var(--color-terracotta)",
                boxShadow:
                  "0 30px 60px -20px rgba(184,85,43,0.55), 0 12px 24px -8px rgba(184,85,43,0.35)",
              }}
            >
              <Sparkles size={16} strokeWidth={2.25} />
              Draft my plan
              <ArrowRight size={16} strokeWidth={2.5} />
            </motion.a>
            <span
              className="glass-pill inline-flex items-center gap-2 px-3 h-7 rounded-full text-[12.5px]"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "0.5px solid rgba(255,255,255,0.22)",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "#F4A87A" }}
              />
              Free to draft · No card · ~58s
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
