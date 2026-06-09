"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";

const FAQS = [
  {
    q: "Are these real architect drawings or just illustrations?",
    a: "Real drawings. Walls in ft-in, doors with swings, windows with cuts, dimension lines, a compass, a 1:50 scale bar. Hand the PDF to any contractor in India and they will read it like a plan, not a mood board.",
  },
  {
    q: "Will this replace my architect?",
    a: "No, and we don't try to. Naxsha gets you to a livable first draft in minutes so your architect spends time on the things that need judgment — structure, finishes, the staircase — instead of starting from a wishlist on a paper napkin.",
  },
  {
    q: "How accurate is the cost estimate?",
    a: "Within ~5-8% of the final quote in the cities we list, when you don't change the finish tier mid-build. We track mandi rates by city and quarter, and we update them. The number you see is the number a real contractor will quote against.",
  },
  {
    q: "Is Vastu actually built in or is it cosmetic?",
    a: "It's real. Pooja in NE, kitchen in SE, primary door away from SW, master bedroom in SW — the rules your family will ask about are enforced as setbacks in the layout solver, not patched on afterwards. You can also turn them off.",
  },
  {
    q: "What plot sizes are supported?",
    a: "Anything from 20×30 to 60×90 today. We're rolling out 80×120 and irregular plots through 2026. If your plot is non-rectangular, you can sketch the boundary in the studio and Naxsha will respect it.",
  },
  {
    q: "Can I edit a plan after Naxsha drafts it?",
    a: "Yes — that's the point. Move the kitchen, swap two bedrooms, add a granny floor, change the staircase position. The plan re-stitches, the BoQ updates, and the cost re-quotes. No starting over.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" style={{ background: "var(--color-plot)" }}>
      <div className="wrap gutter py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr,1.15fr] gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-24 self-start"
          >
            <div className="label mb-3">Frequently asked</div>
            <h2 className="h-section" style={{ color: "var(--color-ink)" }}>
              Questions people actually ask before drafting their first plan.
            </h2>
            <p className="t-body mt-5 max-w-[420px]">
              Don&apos;t see yours? Drop us a line at{" "}
              <a
                href="mailto:hello@naxsha.ai"
                style={{ color: "var(--color-naxsha)", textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                hello@naxsha.ai
              </a>{" "}
              — we usually reply same-day.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card min-w-0"
            style={{ background: "#FFFFFF", padding: 0 }}
          >
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={f.q}
                  style={{
                    borderBottom: i < FAQS.length - 1 ? "0.5px solid var(--color-mist)" : "none",
                  }}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-6 text-left"
                    style={{
                      padding: "22px 24px",
                      minHeight: 64,
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 15.5,
                        fontWeight: 500,
                        color: "var(--color-ink)",
                        lineHeight: 1.4,
                      }}
                    >
                      {f.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 999,
                        border: "0.5px solid var(--color-mist)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--color-naxsha)",
                        flexShrink: 0,
                        background: isOpen ? "var(--color-naxsha-wash)" : "transparent",
                      }}
                    >
                      <Plus size={14} strokeWidth={2} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          className="t-body"
                          style={{ padding: "0 24px 22px", maxWidth: 620 }}
                        >
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
