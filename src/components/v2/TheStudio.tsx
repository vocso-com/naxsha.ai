"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "./Container";
import { MiniPlan } from "./MiniPlan";

export function TheStudio() {
  return (
    <section
      className="section-plot relative"
      style={{
        paddingTop: "clamp(96px, 11vw, 180px)",
        paddingBottom: "clamp(96px, 11vw, 180px)",
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mx-auto"
          style={{ maxWidth: 880 }}
        >
          <span
            className="label inline-flex items-center gap-2"
            style={{ color: "var(--color-terracotta)" }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--color-terracotta)" }}
            />
            FROM PLAN TO HOME
          </span>
          <h2
            className="mt-5 font-semibold leading-[1.02] tracking-[-0.03em]"
            style={{
              fontSize: "clamp(40px, 5.8vw, 92px)",
              color: "var(--color-ink)",
            }}
          >
            Your home,{" "}
            <span style={{ color: "var(--color-naxsha)" }}>
              before it&apos;s built.
            </span>
          </h2>
          <p
            className="mt-6 mx-auto"
            style={{
              color: "var(--color-graphite)",
              maxWidth: "60ch",
              fontSize: "clamp(15px, 1.15vw, 18px)",
              lineHeight: 1.6,
            }}
          >
            One drafted plan. One real address. One family that walks in 8
            months later. This is what Naxsha ships.
          </p>
        </motion.div>

        {/* Plan ↔ Home pairing */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-10 items-stretch">
          {/* Plan card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[24px] p-6 lg:p-8"
            style={{
              background: "var(--color-card)",
              border: "0.5px solid var(--color-mist)",
              minHeight: 520,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--color-naxsha)" }}
                />
                <span className="label" style={{ color: "var(--color-naxsha-lift)" }}>
                  NAXSHA PLAN
                </span>
              </div>
              <span
                className="mono text-[10px] px-2 py-0.5 rounded-full"
                style={{
                  background: "var(--color-naxsha-tint)",
                  color: "var(--color-naxsha-deep)",
                  letterSpacing: "0.12em",
                }}
              >
                v3 · FINAL
              </span>
            </div>

            <div
              className="mt-5 rounded-[16px] overflow-hidden flex items-center justify-center py-4"
              style={{ background: "var(--color-plot)" }}
            >
              <MiniPlan accent="master" showCompass scale={2.4} />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div>
                <div className="label">PLOT</div>
                <div
                  className="mt-1 mono text-[15px] font-semibold"
                  style={{ color: "var(--color-ink)" }}
                >
                  30 × 40
                </div>
              </div>
              <div>
                <div className="label">BUILT-UP</div>
                <div
                  className="mt-1 mono text-[15px] font-semibold"
                  style={{ color: "var(--color-ink)" }}
                >
                  1,200 sf
                </div>
              </div>
              <div>
                <div className="label">BUDGET</div>
                <div
                  className="mt-1 mono text-[15px] font-semibold"
                  style={{ color: "var(--color-terracotta)" }}
                >
                  ₹24.8 L
                </div>
              </div>
            </div>
          </motion.div>

          {/* Arrow between */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center pointer-events-none"
            style={{ zIndex: 5 }}
          >
            <div
              className="h-14 w-14 rounded-full flex items-center justify-center"
              style={{
                background: "var(--color-terracotta)",
                border: "4px solid var(--color-plot)",
              }}
            >
              <ArrowRight size={20} strokeWidth={2.25} color="#FFFFFF" />
            </div>
          </motion.div>

          {/* Home photo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative rounded-[24px] overflow-hidden"
            style={{
              border: "0.5px solid var(--color-mist)",
              minHeight: 520,
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=82"
              alt="The home built from this plan, Aundh Pune"
              fill
              className="object-cover"
              style={{ filter: "saturate(0.65) contrast(1.05)" }}
              unoptimized
            />
            {/* Soft duotone for cohesion */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: "rgba(0,41,82,0.18)",
                mixBlendMode: "multiply",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/2"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(0,41,82,0.6))",
              }}
            />

            <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div
                    className="label"
                    style={{ color: "rgba(255,255,255,0.78)" }}
                  >
                    BUILT IN AUNDH, PUNE
                  </div>
                  <div
                    className="mt-2 text-[20px] font-semibold leading-tight"
                    style={{ color: "#FFFFFF" }}
                  >
                    The Sharma family moved in,
                    <br />
                    8 months later.
                  </div>
                </div>
                <span
                  className="glass-pill px-3 py-1.5 rounded-full mono text-[12px]"
                  style={{
                    background: "rgba(255,255,255,0.16)",
                    border: "0.5px solid rgba(255,255,255,0.22)",
                    color: "#FFFFFF",
                  }}
                >
                  ₹24.8 L · ON BUDGET
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
