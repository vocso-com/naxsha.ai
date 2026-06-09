"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "./Container";
import { StudioPreview } from "./StudioPreview";

function HeadlineLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <span className="mask-line">
      <motion.span
        className="block"
        initial={{ y: "108%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Hero — CTA absolutely overlays the top of the studio preview.
 * Preview is masked top+bottom so the CTA visibly sits on top of it.
 */
export function Hero() {
  return (
    <section
      className="section-plot relative overflow-hidden"
      style={{
        paddingTop: "clamp(48px, 6vw, 96px)",
        paddingBottom: 0,
      }}
    >
      <Container className="relative">
        {/* Trust eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center"
        >
          <span
            className="glass inline-flex items-center gap-2 px-3 h-8 rounded-full label"
            style={{ color: "var(--color-naxsha-deep)" }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--color-terracotta)" }}
            />
            <Sparkles size={11} strokeWidth={2.25} />
            TRUSTED BY 4,247 INDIAN HOMEOWNERS
          </span>
        </motion.div>

        {/* Bold heading */}
        <h1
          className="mt-7 font-bold tracking-[-0.035em] text-center"
          style={{
            fontSize: "clamp(48px, 7.6vw, 128px)",
            lineHeight: 0.96,
            color: "#000000",
          }}
        >
          <HeadlineLine delay={0.2}>
            <span>AI floor plans</span>
          </HeadlineLine>
          <HeadlineLine delay={0.32}>
            <span style={{ color: "var(--color-naxsha)" }}>
              for Indian homes
            </span>
            <span style={{ color: "var(--color-terracotta)" }}>.</span>
          </HeadlineLine>
        </h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 mx-auto text-center"
          style={{
            color: "var(--color-graphite)",
            maxWidth: "min(640px, 60ch)",
            fontSize: "clamp(15px, 1.2vw, 19px)",
            lineHeight: 1.55,
          }}
        >
          The drafting studio that turns &ldquo;we want a 3-BHK&rdquo; into{" "}
          <strong style={{ color: "#000000" }}>
            three build-ready floor plans
          </strong>{" "}
          — with live INR cost, contractor BoQ, and Vastu checks. In under a
          minute.
        </motion.p>

        {/* Studio preview with CTA literally floating on top */}
        <div
          className="mt-12 lg:mt-16 relative"
          style={{
            paddingLeft: "clamp(0px, 1vw, 16px)",
            paddingRight: "clamp(0px, 1vw, 16px)",
          }}
        >
          {/* The studio — fully visible at top so CTA sits literally on it.
              Only the bottom is masked so it teases the next section. */}
          <div
            className="relative"
            style={{
              maskImage:
                "linear-gradient(to bottom, #000 0%, #000 62%, rgba(0,0,0,0.6) 82%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 0%, #000 62%, rgba(0,0,0,0.6) 82%, transparent 100%)",
              paddingBottom: "clamp(80px, 12vw, 200px)",
            }}
          >
            <StudioPreview />
          </div>

          {/* CTA — absolutely positioned literally ON the studio preview,
              sitting over the canvas area, just below the window chrome */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
            style={{
              top: "clamp(96px, 14vw, 240px)",
            }}
          >
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              href="#cta"
              className="h-16 px-9 inline-flex items-center gap-2.5 rounded-full text-[17px] font-semibold text-white"
              style={{
                background: "var(--color-terracotta)",
                boxShadow:
                  "0 30px 60px -20px rgba(184,85,43,0.65), 0 12px 24px -8px rgba(184,85,43,0.45), 0 0 0 8px rgba(184,85,43,0.06)",
              }}
            >
              <Sparkles size={17} strokeWidth={2.25} />
              Try the studio
              <ArrowRight size={17} strokeWidth={2.5} />
            </motion.a>
            <span
              className="glass-pill inline-flex items-center gap-2 px-3 h-7 rounded-full text-[12.5px]"
              style={{
                background: "rgba(255,255,255,0.85)",
                border: "0.5px solid rgba(255,255,255,0.6)",
                color: "var(--color-graphite)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--color-verandah)" }}
              />
              Free to draft · No card · ~58s
            </span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
