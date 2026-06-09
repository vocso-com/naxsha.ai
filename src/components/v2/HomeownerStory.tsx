"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import { Container } from "./Container";

export function HomeownerStory() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ paddingTop: "clamp(80px, 9vw, 140px)", paddingBottom: "clamp(80px, 9vw, 140px)" }}
    >
      {/* Full-bleed photo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2400&q=82"
          alt="Indian family in their home"
          fill
          className="object-cover"
          style={{ filter: "saturate(0.55) contrast(1.05)" }}
          unoptimized
        />
      </div>
      {/* Duotone wash */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "rgba(0,41,82,0.72)",
          mixBlendMode: "multiply",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "rgba(0,61,122,0.22)",
          mixBlendMode: "screen",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 draft-grid-dark"
        style={{ opacity: 0.30 }}
      />

      <Container className="relative">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10"
        >
          <span
            className="glass-pill inline-flex items-center gap-2 px-3 h-8 rounded-full label"
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "0.5px solid rgba(255,255,255,0.22)",
              color: "rgba(255,255,255,0.95)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--color-terracotta)" }}
            />
            A HOMEOWNER&apos;S STORY · 01 / 4,247
          </span>
        </motion.div>

        {/* Glass quote card */}
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-dark relative rounded-[28px] mx-auto"
          style={{
            maxWidth: 1080,
            padding: "clamp(32px, 5vw, 64px)",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.1) inset, 0 24px 60px -20px rgba(0,0,0,0.5)",
          }}
        >
          {/* 5-star row */}
          <div className="flex items-center gap-1.5 mb-6">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                size={16}
                strokeWidth={1.5}
                fill="#F4A87A"
                color="#F4A87A"
              />
            ))}
            <span
              className="ml-2 mono text-[13px] font-semibold"
              style={{ color: "rgba(255,255,255,0.95)" }}
            >
              4.9
            </span>
            <span
              className="ml-1 text-[12.5px]"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              avg from 1,840 homeowners
            </span>
          </div>

          <span
            aria-hidden
            className="mono font-semibold leading-none block"
            style={{
              color: "var(--color-terracotta-soft)",
              fontSize: "clamp(48px, 6vw, 88px)",
            }}
          >
            &ldquo;
          </span>

          <blockquote
            className="mt-2 font-semibold leading-[1.16] tracking-[-0.02em]"
            style={{
              color: "#FFFFFF",
              fontSize: "clamp(28px, 3.8vw, 56px)",
              maxWidth: "min(880px, 22ch)",
            }}
          >
            We started with a 30 × 40 plot and a fight in the family WhatsApp
            group.{" "}
            <span style={{ color: "var(--color-terracotta-soft)" }}>
              Naxsha gave us three plans in 58 seconds.
            </span>{" "}
            We picked one, tweaked the kitchen, and showed it to our contractor
            the same evening.
          </blockquote>

          {/* Footer: avatar + name + metric row */}
          <figcaption
            className="mt-12 pt-8 flex flex-wrap items-end gap-6"
            style={{ borderTop: "0.5px solid rgba(255,255,255,0.18)" }}
          >
            <div className="flex items-center gap-4">
              <div
                className="relative h-14 w-14 rounded-full overflow-hidden shrink-0"
                style={{ border: "1px solid rgba(255,255,255,0.4)" }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=facearea&facepad=2.4&w=200&h=200&q=80"
                  alt="Rohit Sharma"
                  width={56}
                  height={56}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: "saturate(0.4) contrast(1.05)" }}
                  unoptimized
                />
              </div>
              <div>
                <div
                  className="text-[15px] font-semibold"
                  style={{ color: "#FFFFFF" }}
                >
                  Rohit &amp; Pooja Sharma
                </div>
                <div
                  className="mt-0.5 text-[13px]"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  Homeowners · Aundh, Pune
                </div>
              </div>
            </div>

            {/* Mini glass stats — built for / time / accuracy */}
            <div className="flex flex-wrap items-center gap-2 ml-auto">
              {[
                { l: "BUILT FOR", v: "₹24.8 L" },
                { l: "TIMELINE", v: "8 mo" },
                { l: "VS BUDGET", v: "+2%", soft: true },
              ].map((s) => (
                <div
                  key={s.l}
                  className="glass-pill rounded-full px-3.5 h-10 inline-flex items-center gap-2"
                  style={{
                    background: "rgba(255,255,255,0.10)",
                    border: "0.5px solid rgba(255,255,255,0.18)",
                  }}
                >
                  <span
                    className="label"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {s.l}
                  </span>
                  <span
                    className="mono text-[13px] font-semibold"
                    style={{
                      color: s.soft
                        ? "var(--color-terracotta-soft)"
                        : "#FFFFFF",
                    }}
                  >
                    {s.v}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="#stories"
              className="inline-flex items-center gap-1.5 text-[13.5px] ml-auto md:ml-0"
              style={{ color: "var(--color-terracotta-soft)" }}
            >
              Read full story
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </a>
          </figcaption>
        </motion.figure>
      </Container>
    </section>
  );
}
