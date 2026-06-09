"use client";

import { motion } from "motion/react";

const QUOTES = [
  {
    quote:
      "We were three months into hunting an architect when my wife showed me Naxsha. By Sunday evening we had a plan for our 30×40 in Whitefield that both of us actually liked.",
    name: "Rohit & Anjali Iyer",
    role: "Homeowners · Bangalore",
    initials: "RI",
    metric: "Plan in",
    metricVal: "1 weekend",
  },
  {
    quote:
      "I use Naxsha as my first-pass massing tool now. Clients can react to a real plan in the meeting, and I get a DWG I can refine instead of starting from a wishlist.",
    name: "Meera Krishnan",
    role: "Architect · Chennai",
    initials: "MK",
    metric: "Saves",
    metricVal: "~12 hrs/proj",
  },
  {
    quote:
      "The BoQ is the part I actually care about. Cement bags, steel tonnes, sand in cu·m — no decoding required. I quoted off the CSV without redrawing a single thing.",
    name: "Suresh Patil",
    role: "Contractor · Pune",
    initials: "SP",
    metric: "Quoted in",
    metricVal: "1 evening",
  },
];

export function Testimonials() {
  return (
    <section
      style={{
        background: "var(--color-naxsha-tint)",
        borderTop: "0.5px solid var(--color-mist)",
        borderBottom: "0.5px solid var(--color-mist)",
      }}
    >
      <div className="wrap gutter py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-[640px] mb-12"
        >
          <div className="label mb-3">In the words of the people building</div>
          <h2 className="h-section" style={{ color: "var(--color-ink)" }}>
            A homeowner, an architect, and a contractor walk into a plan.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {QUOTES.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -2 }}
              className="card relative min-w-0 flex flex-col"
              style={{ padding: 24, background: "#FFFFFF", transition: "border-color 220ms ease" }}
            >
              <svg
                aria-hidden
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill="none"
                style={{ marginBottom: 14 }}
              >
                <path
                  d="M0 18V11.5C0 6 3 1.5 9 0L10 3C6.5 4 4.5 6.5 4.5 9.5H8V18H0ZM12 18V11.5C12 6 15 1.5 21 0L22 3C18.5 4 16.5 6.5 16.5 9.5H20V18H12Z"
                  fill="var(--color-naxsha)"
                  opacity="0.18"
                />
              </svg>

              <blockquote
                style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "var(--color-ink)",
                  marginBottom: 22,
                  flex: 1,
                }}
              >
                {q.quote}
              </blockquote>

              <figcaption
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  borderTop: "0.5px solid var(--color-mist)",
                  paddingTop: 16,
                }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 999,
                      background: "var(--color-naxsha-wash)",
                      border: "0.5px solid var(--color-naxsha-tint)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-naxsha-mono)",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--color-naxsha-deep)",
                      letterSpacing: "0.05em",
                      flexShrink: 0,
                    }}
                  >
                    {q.initials}
                  </span>
                  <div className="min-w-0">
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--color-ink)",
                        lineHeight: 1.3,
                      }}
                    >
                      {q.name}
                    </div>
                    <div
                      style={{
                        fontSize: 11.5,
                        color: "var(--color-graphite)",
                        marginTop: 2,
                      }}
                    >
                      {q.role}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div
                    style={{
                      fontFamily: "var(--font-naxsha-mono)",
                      fontSize: 9.5,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--color-graphite)",
                    }}
                  >
                    {q.metric}
                  </div>
                  <div
                    className="tnum"
                    style={{
                      fontFamily: "var(--font-naxsha-mono)",
                      fontVariantNumeric: "tabular-nums",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--color-naxsha-deep)",
                      marginTop: 2,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {q.metricVal}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
