"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, MessageCircle } from "lucide-react";
import { Container } from "./Container";

const QA = [
  {
    q: "Will Naxsha follow my city's building bye-laws?",
    a: "Naxsha enforces FAR, setbacks, height limits, and stair widths for 62 Indian cities — including BBMP, MCGM, PMC, GHMC, and CMDA. For cities not yet on the list, Naxsha falls back to NBC defaults and flags rules you should verify with your local authority.",
  },
  {
    q: "How accurate are the cost estimates?",
    a: "Median accuracy on built-up cost is ±4%, benchmarked against 4,200+ completed homes. Material rates are refreshed weekly and indexed to your taluka. Labour quotes are calibrated to your city.",
  },
  {
    q: "What if I don't know my plot's exact dimensions?",
    a: "Drop your survey number. Naxsha pulls dimensions from local records for most Indian municipalities. You can also sketch the plot outline by hand on the canvas and Naxsha will square it up.",
  },
  {
    q: "Can I share the plan with my architect or contractor?",
    a: "Yes. Every plan exports a clean PDF, a DWG that opens in AutoCAD and BricsCAD, and a CSV BoQ that opens in Tally or Excel. You can also share a live link — your team sees the latest version with comments.",
  },
  {
    q: "Is Vastu compliance optional?",
    a: "Vastu is on by default. Naxsha checks twelve principles for every layout — pooja placement, kitchen direction, master orientation, and more. When geometry has to break tradition, you see the tradeoff in plain language and decide.",
  },
  {
    q: "Do my drawings stay private?",
    a: "Yes. Plans are private by default. You choose whether to make them shareable, public, or visible only to seats on your team. Naxsha never trains on your drawings.",
  },
];

function FAQItem({
  item,
  open,
  onToggle,
}: {
  item: { q: string; a: string };
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      className="glass relative rounded-[16px] overflow-hidden"
      whileHover={{ y: open ? 0 : -1 }}
      transition={{ duration: 0.2 }}
      style={{
        background: open ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)",
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
      >
        <span
          className="text-[15px] lg:text-[16px] font-semibold"
          style={{ color: "var(--color-ink)" }}
        >
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 h-9 w-9 rounded-full flex items-center justify-center"
          style={{
            background: open
              ? "var(--color-terracotta)"
              : "var(--color-naxsha-tint)",
            color: open ? "#FFFFFF" : "var(--color-naxsha)",
          }}
        >
          <Plus size={15} strokeWidth={2.5} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.2 },
            }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="px-6 pb-6 text-[14.5px] leading-[1.65]"
              style={{
                color: "var(--color-graphite)",
                maxWidth: "70ch",
              }}
            >
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="section-plot relative"
      style={{
        paddingTop: "clamp(96px, 11vw, 160px)",
        paddingBottom: "clamp(96px, 11vw, 160px)",
      }}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-28 self-start"
          >
            <span
              className="glass inline-flex items-center gap-2 px-3 h-8 rounded-full label"
              style={{ color: "var(--color-naxsha-deep)" }}
            >
              <MessageCircle size={11} strokeWidth={2.5} className="text-terracotta" />
              QUESTIONS
            </span>
            <h2
              className="mt-5 font-bold leading-[1.02] tracking-[-0.028em]"
              style={{
                fontSize: "clamp(36px, 4.8vw, 64px)",
                color: "var(--color-ink)",
                maxWidth: "16ch",
              }}
            >
              Asked &{" "}
              <span style={{ color: "var(--color-naxsha)" }}>
                answered.
              </span>
            </h2>
            <p
              className="mt-5 text-[14.5px] leading-[1.65]"
              style={{
                color: "var(--color-graphite)",
                maxWidth: "38ch",
              }}
            >
              If we missed yours, write to{" "}
              <a
                href="mailto:hello@naxsha.ai"
                className="font-semibold"
                style={{ color: "var(--color-naxsha-lift)" }}
              >
                hello@naxsha.ai
              </a>
              . We reply in IST hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            {QA.map((item, i) => (
              <FAQItem
                key={item.q}
                item={item}
                open={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
