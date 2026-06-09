"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Container } from "./Container";

const CITY_CHIPS = [
  "Mumbai",
  "Bengaluru",
  "Pune",
  "Hyderabad",
  "Chennai",
  "Ahmedabad",
  "Kochi",
  "Indore",
  "Jaipur",
];

export function BigQuote() {
  return (
    <section
      className="section-tint relative overflow-hidden"
      style={{
        paddingTop: "clamp(96px, 11vw, 160px)",
        paddingBottom: "clamp(96px, 11vw, 160px)",
      }}
    >
      <div aria-hidden className="absolute inset-0 draft-grid-light opacity-50" />

      <Container className="relative">
        <div className="relative grid grid-cols-1 lg:grid-cols-[1.4fr_auto] gap-12 lg:gap-20 items-center">
          {/* Soft floating chips behind quote */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block"
          >
            {CITY_CHIPS.map((c, i) => {
              const angle = (i / CITY_CHIPS.length) * Math.PI * 2;
              const radius = 36 + (i % 3) * 6;
              const left = Math.round((50 + Math.cos(angle) * radius) * 10) / 10;
              const top = Math.round((50 + Math.sin(angle) * radius) * 10) / 10;
              return (
                <motion.span
                  key={c}
                  initial={{ opacity: 0, scale: 0.85, y: 0 }}
                  whileInView={{
                    opacity: 0.7,
                    scale: 1,
                    y: [0, -6, 0],
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    opacity: { duration: 0.5, delay: i * 0.05 },
                    scale: { duration: 0.5, delay: i * 0.05 },
                    y: {
                      duration: 4 + (i % 3),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.15,
                    },
                  }}
                  className="glass-pill absolute text-[11px] px-2.5 py-1 rounded-full"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    color: "var(--color-naxsha-deep)",
                  }}
                >
                  {c}
                </motion.span>
              );
            })}
          </div>

          <motion.figure
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass relative max-w-[780px] rounded-[24px] p-9 lg:p-12"
            style={{ background: "rgba(255,255,255,0.65)" }}
          >
            <div
              className="mono font-semibold leading-none"
              style={{
                fontSize: "clamp(48px, 6vw, 84px)",
                color: "var(--color-terracotta)",
              }}
              aria-hidden
            >
              &ldquo;
            </div>
            <blockquote
              className="mt-2 font-semibold leading-[1.18]"
              style={{
                fontSize: "clamp(24px, 2.8vw, 40px)",
                letterSpacing: "-0.015em",
                color: "var(--color-ink)",
              }}
            >
              We started with a 30 × 40 plot and a family WhatsApp fight.
              Naxsha gave us three plans in a minute. We picked one, tweaked
              the kitchen, and showed it to our contractor the same evening.
            </blockquote>

            <figcaption className="mt-10 flex items-center gap-4">
              <div
                className="relative h-12 w-12 rounded-full overflow-hidden shrink-0"
                style={{
                  background: "var(--color-naxsha-deep)",
                  border: "0.5px solid var(--color-mist)",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=facearea&facepad=2.4&w=200&h=200&q=80"
                  alt="Rohit Sharma"
                  width={48}
                  height={48}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: "saturate(0.12) contrast(1.05)" }}
                  unoptimized
                />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-[14px] font-medium"
                  style={{ color: "var(--color-ink)" }}
                >
                  Rohit Sharma
                </div>
                <div
                  className="text-[12.5px]"
                  style={{ color: "var(--color-graphite)" }}
                >
                  Homeowner · Built for{" "}
                  <span className="mono">₹24.8 L</span>
                </div>
              </div>
            </figcaption>
          </motion.figure>

          {/* Side metrics — glass cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="relative grid grid-cols-1 gap-3 min-w-[220px]"
          >
            {[
              { label: "RATING", value: "4.9 ★", note: "from homeowners" },
              { label: "AVG DRAFT TIME", value: "58s", note: "first 3 plans" },
              { label: "BoQ ERROR", value: "±4%", note: "vs built cost", green: true },
            ].map((s) => (
              <div
                key={s.label}
                className="glass rounded-[16px] px-5 py-4"
              >
                <div className="label">{s.label}</div>
                <div
                  className="mt-1.5 mono text-[24px] font-semibold leading-none"
                  style={{
                    color: s.green
                      ? "var(--color-verandah)"
                      : "var(--color-ink)",
                  }}
                >
                  {s.value}
                </div>
                <div
                  className="mt-1 text-[12px]"
                  style={{ color: "var(--color-graphite)" }}
                >
                  {s.note}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
