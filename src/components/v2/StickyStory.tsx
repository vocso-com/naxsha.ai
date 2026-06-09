"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
} from "motion/react";
import { Compass, IndianRupee, Hammer, FileDown } from "lucide-react";
import { Container } from "./Container";
import { MiniPlan } from "./MiniPlan";
import { formatINR } from "@/lib/floorplan";

type Chapter = {
  id: string;
  num: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
  accent: "master" | "kitchen" | "bed2" | "living" | null;
  stat: { label: string; value: string };
};

const CHAPTERS: Chapter[] = [
  {
    id: "vastu",
    num: "01",
    eyebrow: "VASTU",
    title: "Plans that respect tradition.",
    body:
      "Pooja, kitchen direction, master orientation — Naxsha checks twelve Vastu principles for every layout and explains the tradeoff when geometry can't comply.",
    icon: Compass,
    accent: "master",
    stat: { label: "ON BY DEFAULT", value: "12 principles" },
  },
  {
    id: "cost",
    num: "02",
    eyebrow: "BUDGET",
    title: "Live cost. In rupees.",
    body:
      "Every wall has a price tag. Move a partition, switch the finish tier, change a floor — the budget breathes with you.",
    icon: IndianRupee,
    accent: "kitchen",
    stat: { label: "BUDGET", value: formatINR(2160000) },
  },
  {
    id: "boq",
    num: "03",
    eyebrow: "MATERIALS",
    title: "A BoQ your contractor reads.",
    body:
      "Cement in bags. Steel in tonnes. Brick in numbers. M-sand in cubic meters. Materials the way Indian sites actually order them.",
    icon: Hammer,
    accent: "bed2",
    stat: { label: "ACCURACY", value: "±4%" },
  },
  {
    id: "export",
    num: "04",
    eyebrow: "EXPORT",
    title: "Ship the file your team needs.",
    body:
      "PDF for the family group. DWG for the architect. CSV BoQ for the contractor. A measured set, not a sales render.",
    icon: FileDown,
    accent: "living",
    stat: { label: "FORMATS", value: "PDF · DWG · CSV" },
  },
];

export function StickyStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const chapterT = useTransform(
    scrollYProgress,
    [0, 1],
    [0, CHAPTERS.length]
  );

  const [active, setActive] = useState(0);
  useMotionValueEvent(chapterT, "change", (v) => {
    const idx = Math.min(CHAPTERS.length - 1, Math.max(0, Math.floor(v)));
    if (idx !== active) setActive(idx);
  });

  const chapter = CHAPTERS[active];

  return (
    <section
      id="how"
      ref={containerRef}
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
      />

      {/* Decorative Terracotta accent */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.5, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute rounded-full hidden md:block"
        style={{
          width: 280,
          height: 280,
          background: "var(--color-terracotta)",
          top: "-80px",
          right: "-80px",
          mixBlendMode: "screen",
          opacity: 0.12,
        }}
      />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="inline-flex items-center gap-2 label px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "0.5px solid rgba(255,255,255,0.18)",
              color: "rgba(244,168,122,0.95)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--color-terracotta)" }}
            />
            INSIDE NAXSHA
          </span>
          <h2
            className="mt-5 font-semibold leading-[1.04]"
            style={{
              fontSize: "clamp(36px, 4.8vw, 64px)",
              letterSpacing: "-0.025em",
              color: "#FFFFFF",
              maxWidth: "20ch",
            }}
          >
            Four moves from a brief to a buildable AI floor plan.
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">
          {/* Scrolling chapter copy */}
          <div>
            {CHAPTERS.map((c, i) => {
              const Icon = c.icon;
              const isActive = i === active;
              return (
                <motion.div
                  key={c.id}
                  animate={{
                    opacity: isActive ? 1 : 0.35,
                    x: isActive ? 0 : -8,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="py-14 lg:py-20 first:pt-0"
                >
                  <div className="flex items-center gap-2.5 mb-5">
                    <span
                      className="mono text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{
                        background: isActive
                          ? "var(--color-terracotta)"
                          : "rgba(255,255,255,0.10)",
                        color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.65)",
                        letterSpacing: "0.12em",
                      }}
                    >
                      {c.num}
                    </span>
                    <span
                      className="label"
                      style={{
                        color: isActive
                          ? "rgba(244,168,122,0.95)"
                          : "rgba(255,255,255,0.55)",
                      }}
                    >
                      {c.eyebrow}
                    </span>
                    <Icon
                      size={14}
                      strokeWidth={1.75}
                      color={
                        isActive
                          ? "var(--color-terracotta)"
                          : "rgba(255,255,255,0.55)"
                      }
                    />
                  </div>
                  <h3
                    className="font-semibold leading-[1.05]"
                    style={{
                      fontSize: "clamp(28px, 3.2vw, 42px)",
                      letterSpacing: "-0.02em",
                      color: "#FFFFFF",
                      maxWidth: "18ch",
                    }}
                  >
                    {c.title}
                  </h3>
                  <p
                    className="mt-4"
                    style={{
                      color: "rgba(255,255,255,0.78)",
                      maxWidth: "44ch",
                      fontSize: "clamp(15px, 1.1vw, 17px)",
                      lineHeight: 1.65,
                    }}
                  >
                    {c.body}
                  </p>

                  <div
                    className="glass-pill mt-7 inline-flex items-center gap-3 rounded-full pl-4 pr-5 h-10"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      borderColor: "rgba(255,255,255,0.18)",
                    }}
                  >
                    <span
                      className="label"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {c.stat.label}
                    </span>
                    <span
                      className="mono text-[13px] font-semibold"
                      style={{ color: "#FFFFFF" }}
                    >
                      {c.stat.value}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Pinned glass visual */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div
                className="glass-dark relative rounded-[22px] overflow-hidden"
                style={{ padding: 20 }}
              >
                <div
                  className="rounded-[14px] overflow-hidden relative"
                  style={{ background: "rgba(255,255,255,0.95)" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={chapter.id}
                      initial={{ opacity: 0, scale: 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.985 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-center py-3"
                    >
                      <MiniPlan
                        accent={chapter.accent}
                        scale={1.95}
                        showCompass
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Overlay chips */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={chapter.id + "-pill"}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.25 }}
                        className="inline-flex items-center px-2.5 py-1 rounded-full label"
                        style={{
                          background: "var(--color-naxsha-deep)",
                          color: "#FFFFFF",
                        }}
                      >
                        {chapter.eyebrow}
                      </motion.span>
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={chapter.id + "-stat"}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.25 }}
                        className="glass-pill inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: "var(--color-terracotta)" }}
                        />
                        <span
                          className="mono text-[11px]"
                          style={{ color: "var(--color-ink)" }}
                        >
                          {chapter.stat.value}
                        </span>
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Chapter progress */}
                <div className="mt-5 px-1 flex items-center gap-2">
                  {CHAPTERS.map((c, i) => (
                    <div
                      key={c.id}
                      className="h-1 flex-1 rounded-full overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.14)" }}
                    >
                      <motion.div
                        className="h-full"
                        animate={{
                          width: i < active ? "100%" : i === active ? "65%" : "0%",
                          background:
                            i <= active ? "var(--color-terracotta)" : "transparent",
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-3 px-1 flex items-center justify-between">
                  <span
                    className="text-[12.5px]"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    Live preview · Plot 47, Bandra
                  </span>
                  <span
                    className="mono text-[11px]"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {chapter.num}/04
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
