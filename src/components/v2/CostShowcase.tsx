"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Section, SectionEyebrow } from "./Container";
import { formatINR, totalBuiltUp } from "@/lib/floorplan";

const TIERS = [
  { id: "basic", label: "BASIC", mult: 0.65 },
  { id: "standard", label: "STANDARD", mult: 0.85 },
  { id: "premium", label: "PREMIUM", mult: 1.0 },
  { id: "luxury", label: "LUXURY", mult: 1.35 },
] as const;

const BASE_COST = 2160000; // premium baseline

function useCountUp(target: number, inView: boolean, duration = 0.9) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, target, { duration, ease: "easeOut" });
    return controls.stop;
  }, [inView, target, duration, mv]);
  return rounded;
}

function BudgetCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const [tier, setTier] = useState<typeof TIERS[number]["id"]>("premium");
  const tierObj = TIERS.find((t) => t.id === tier)!;
  const cost = Math.round(BASE_COST * tierObj.mult);
  const totalSf = totalBuiltUp();
  const psf = Math.round(cost / totalSf);
  const delta = -140000 + (tierObj.mult - 1) * 800000;

  const animatedCost = useCountUp(cost, inView);
  const animatedPsf = useCountUp(psf, inView);
  const tierIndex = TIERS.findIndex((t) => t.id === tier);
  const sliderPct = (tierIndex / (TIERS.length - 1)) * 100;

  // Convert the motion values to displayed strings (formatted INR / en-IN)
  const [displayCost, setDisplayCost] = useState(0);
  const [displayPsf, setDisplayPsf] = useState(0);
  useEffect(() => animatedCost.on("change", setDisplayCost), [animatedCost]);
  useEffect(() => animatedPsf.on("change", setDisplayPsf), [animatedPsf]);

  return (
    <div
      ref={ref}
      className="rounded-[12px] p-7 text-white relative overflow-hidden"
      style={{
        background: "var(--color-naxsha)",
        border: "0.5px solid var(--color-naxsha-deep)",
      }}
    >
      <div className="flex items-center justify-between">
        <span className="label" style={{ color: "rgba(255,255,255,0.65)" }}>
          ESTIMATED BUDGET
        </span>
        <motion.span
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mono text-[10px] px-1.5 py-0.5 rounded-[3px] inline-flex items-center gap-1"
          style={{
            background: "rgba(255,255,255,0.10)",
            color: "rgba(255,255,255,0.85)",
            letterSpacing: "0.12em",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "#F4A87A" }}
          />
          LIVE
        </motion.span>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="mono text-[clamp(28px,3.5vw,42px)] font-semibold tracking-tight leading-none">
          {formatINR(displayCost)}
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={tier}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="mt-3 flex items-center gap-2 text-[12.5px]"
          style={{ color: "rgba(255,255,255,0.78)" }}
        >
          <span
            className="mono inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-[3px] font-medium"
            style={{
              background:
                delta < 0
                  ? "rgba(244,168,122,0.18)"
                  : "rgba(244,168,122,0.28)",
              color: "#F4A87A",
            }}
          >
            {delta < 0 ? (
              <ArrowDownRight size={11} strokeWidth={2.5} />
            ) : (
              <ArrowUpRight size={11} strokeWidth={2.5} />
            )}
            {formatINR(Math.abs(Math.round(delta)))}
          </span>
          <span>
            {delta < 0 ? "under" : "over"} Bandra average for 3 BHK
          </span>
        </motion.div>
      </AnimatePresence>

      <div
        className="mt-7 pt-5 grid grid-cols-3 gap-4"
        style={{ borderTop: "0.5px solid rgba(255,255,255,0.14)" }}
      >
        <div>
          <div className="label" style={{ color: "rgba(255,255,255,0.55)" }}>
            BUILT-UP
          </div>
          <div className="mt-1 mono text-[17px] font-semibold">
            {totalSf.toLocaleString("en-IN")}
            <span
              className="text-[10px] font-normal ml-0.5"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              {" "}
              sf
            </span>
          </div>
        </div>
        <div>
          <div className="label" style={{ color: "rgba(255,255,255,0.55)" }}>
            ₹ / SF
          </div>
          <div className="mt-1 mono text-[17px] font-semibold">
            {displayPsf.toLocaleString("en-IN")}
          </div>
        </div>
        <div>
          <div className="label" style={{ color: "rgba(255,255,255,0.55)" }}>
            TIMELINE
          </div>
          <div className="mt-1 mono text-[17px] font-semibold">8 mo</div>
        </div>
      </div>

      {/* Finish tier slider — interactive */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-[12px]">
          <span style={{ color: "rgba(255,255,255,0.78)" }}>Finish tier</span>
          <span
            className="mono"
            style={{ color: "rgba(255,255,255,0.92)" }}
          >
            {tierObj.label.charAt(0) + tierObj.label.slice(1).toLowerCase()}
          </span>
        </div>
        <div
          className="mt-2 h-1.5 rounded-full overflow-hidden relative"
          style={{ background: "rgba(255,255,255,0.14)" }}
        >
          <motion.div
            className="h-full"
            style={{ background: "#F4A87A" }}
            animate={{ width: `${sliderPct}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
          />
        </div>
        <div className="mt-2 grid grid-cols-4 gap-1">
          {TIERS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTier(t.id)}
              className="label py-0.5 rounded-[3px] transition-colors"
              style={{
                color:
                  t.id === tier
                    ? "#F4A87A"
                    : "rgba(255,255,255,0.55)",
                fontWeight: t.id === tier ? 600 : 500,
              }}
              aria-pressed={t.id === tier}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MaterialsCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const materials = [
    { name: "Cement", qty: "480", unit: "bags", cost: 235200 },
    { name: "TMT Steel", qty: "4.2", unit: "tonnes", cost: 294000 },
    { name: "Red brick", qty: "32,400", unit: "nos", cost: 178200 },
    { name: "Vitrified tile", qty: "1,080", unit: "sf", cost: 162000 },
  ];

  return (
    <div
      ref={ref}
      className="rounded-[12px] p-7 text-white"
      style={{
        background: "var(--color-naxsha-deep)",
        border: "0.5px solid var(--color-naxsha-deep)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="label" style={{ color: "rgba(255,255,255,0.65)" }}>
          BILL OF QUANTITIES
        </div>
        <span
          className="mono text-[10px] inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[3px]"
          style={{ background: "rgba(244,168,122,0.18)", color: "#F4A87A" }}
        >
          <ArrowUpRight size={10} strokeWidth={2.5} />
          +3.2% MoM
        </span>
      </div>

      <ul className="mt-5 space-y-3">
        {materials.map((m, i) => (
          <motion.li
            key={m.name}
            initial={{ opacity: 0, x: -6 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
            className="flex items-center text-[13px]"
          >
            <span
              className="flex-1"
              style={{ color: "rgba(255,255,255,0.88)" }}
            >
              {m.name}
            </span>
            <span className="mono w-20 text-right">
              {m.qty}
              <span
                className="text-[10px] ml-0.5"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {" "}
                {m.unit}
              </span>
            </span>
            <span className="mono w-28 text-right text-white">
              {formatINR(m.cost)}
            </span>
          </motion.li>
        ))}
      </ul>

      <div
        className="mt-6 pt-4 flex items-center justify-between text-[12px]"
        style={{ borderTop: "0.5px solid rgba(255,255,255,0.14)" }}
      >
        <span style={{ color: "rgba(255,255,255,0.7)" }}>
          4 of 18 line items
        </span>
        <a
          className="inline-flex items-center gap-1 label hover:underline"
          style={{ color: "#F4A87A" }}
        >
          OPEN FULL BOQ
          <ArrowRight size={11} strokeWidth={2.5} />
        </a>
      </div>
    </div>
  );
}

export function CostShowcase() {
  return (
    <Section>
      <SectionEyebrow num="03" label="COSTS, NOT GUESSES" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="xl:sticky xl:top-24"
        >
          <h2 className="h-section">
            Every wall has a price tag.
            <br />
            <span style={{ color: "var(--color-naxsha)" }}>
              Move it — watch the budget breathe.
            </span>
          </h2>
          <p className="mt-5 t-lead">
            Naxsha keeps a live bill of quantities while you draft. Drag a
            partition by 1 foot and the BoQ updates: more cement, fewer
            bricks, a different vitrified tile count. No more
            &ldquo;final-final-v8.xlsx&rdquo;.
          </p>

          <ul className="mt-7 space-y-3 t-body">
            {[
              "City-indexed material rates updated weekly",
              "Labour quotes calibrated to your taluka",
              "Plan-grade accuracy: ±4% on built-up cost",
              "Exports as CSV that opens in Tally and Excel cleanly",
            ].map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: -4 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                className="flex items-start gap-2.5"
              >
                <span
                  className="mt-2 h-1 w-3 shrink-0"
                  style={{ background: "var(--color-terracotta)" }}
                />
                <span style={{ color: "var(--color-ink)" }}>{b}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <div className="space-y-5">
          <BudgetCard />
          <MaterialsCard />
        </div>
      </div>
    </Section>
  );
}
