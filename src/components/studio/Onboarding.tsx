"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { ONBOARDING } from "@/lib/studio";

type Msg = { from: "ai" | "user"; text: string };

const GEN_STEPS = [
  "Reading plot constraints…",
  "Placing Vastu zones…",
  "Laying out rooms…",
  "Routing doors & windows…",
  "Estimating built cost…",
];

// --- visual plot-layout thumbnails -----------------------------------------
type LayoutKind = "Open Plan" | "Courtyard" | "Compact" | "Vastu Grid";

const LAYOUT_BLURB: Record<string, string> = {
  "Open Plan": "Living, dining & kitchen flow as one bright volume.",
  Courtyard: "Rooms wrap a central open-to-sky aangan.",
  Compact: "Tight room grouping — maximises usable carpet area.",
  "Vastu Grid": "Nine-zone padavinyasa with directional placement.",
};

function LayoutGlyph({ kind }: { kind: string }) {
  const stroke = "var(--st-text-2)";
  const fill = "var(--st-active)";
  const soft = "var(--st-hover)";
  return (
    <svg viewBox="0 0 64 48" width="100%" height="100%" fill="none" aria-hidden>
      <rect x="1" y="1" width="62" height="46" rx="4" stroke="var(--st-border-2)" />
      {kind === "Open Plan" && (
        <>
          <rect x="6" y="6" width="36" height="36" rx="2" fill={fill} opacity="0.16" stroke={stroke} />
          <rect x="46" y="6" width="12" height="16" rx="2" stroke={stroke} />
          <rect x="46" y="26" width="12" height="16" rx="2" stroke={stroke} />
        </>
      )}
      {kind === "Courtyard" && (
        <>
          <rect x="6" y="6" width="52" height="36" rx="2" stroke={stroke} />
          <rect x="24" y="17" width="16" height="14" rx="1.5" fill={fill} opacity="0.18" stroke={stroke} />
          <line x1="24" y1="6" x2="24" y2="17" stroke={stroke} />
          <line x1="40" y1="6" x2="40" y2="17" stroke={stroke} />
        </>
      )}
      {kind === "Compact" && (
        <>
          <rect x="6" y="6" width="24" height="22" rx="2" fill={fill} opacity="0.14" stroke={stroke} />
          <rect x="34" y="6" width="24" height="22" rx="2" stroke={stroke} />
          <rect x="6" y="32" width="24" height="10" rx="2" stroke={stroke} />
          <rect x="34" y="32" width="24" height="10" rx="2" stroke={stroke} />
        </>
      )}
      {kind === "Vastu Grid" && (
        <>
          <rect x="6" y="6" width="52" height="36" rx="2" stroke={stroke} fill={soft} />
          <line x1="23.3" y1="6" x2="23.3" y2="42" stroke={stroke} />
          <line x1="40.6" y1="6" x2="40.6" y2="42" stroke={stroke} />
          <line x1="6" y1="18" x2="58" y2="18" stroke={stroke} />
          <line x1="6" y1="30" x2="58" y2="30" stroke={stroke} />
          <rect x="6" y="6" width="17.3" height="12" fill={fill} opacity="0.2" />
        </>
      )}
    </svg>
  );
}

function Avatar({ from }: { from: "ai" | "user" }) {
  if (from === "ai") {
    return (
      <span
        className="shrink-0 h-7 w-7 rounded-full inline-flex items-center justify-center"
        style={{ background: "rgba(184,85,43,0.18)", border: "0.5px solid rgba(184,85,43,0.4)" }}
        title="Naxsha AI"
      >
        <Sparkles size={13} style={{ color: "#F4A87A" }} />
      </span>
    );
  }
  return (
    <span
      className="shrink-0 h-7 w-7 rounded-full inline-flex items-center justify-center text-[10px] font-semibold text-white"
      style={{ background: "#003D7A", border: "0.5px solid var(--st-border-2)", letterSpacing: "0.02em" }}
      title="deepak@vocso.com"
    >
      DC
    </span>
  );
}

export function Onboarding({ onComplete }: { onComplete: (answers: Record<string, string>) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [messages, setMessages] = useState<Msg[]>([{ from: "ai", text: ONBOARDING[0].prompt }]);
  const [custom, setCustom] = useState("");
  const [generating, setGenerating] = useState(false);
  const [genIdx, setGenIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const current = ONBOARDING[step];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, generating]);

  const answer = (value: string) => {
    const next = { ...answers, [current.id]: value };
    setAnswers(next);
    setCustom("");
    const isLast = step === ONBOARDING.length - 1;
    setMessages((m) => [...m, { from: "user", text: value }]);

    if (isLast) {
      setTimeout(() => runGenerate(next), 350);
    } else {
      const nextStep = step + 1;
      setStep(nextStep);
      setTimeout(() => setMessages((m) => [...m, { from: "ai", text: ONBOARDING[nextStep].prompt }]), 420);
    }
  };

  const runGenerate = (finalAnswers: Record<string, string>) => {
    setGenerating(true);
    let i = 0;
    const tick = () => {
      i += 1;
      if (i < GEN_STEPS.length) {
        setGenIdx(i);
        setTimeout(tick, 620);
      } else {
        setTimeout(() => onComplete(finalAnswers), 700);
      }
    };
    setTimeout(tick, 620);
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 z-20">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
        style={{ maxWidth: 720 }}
      >
        {/* eyebrow */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span
            className="inline-flex items-center gap-2 px-3 h-8 rounded-full"
            style={{
              background: "var(--st-chip)",
              border: "0.5px solid var(--st-chip-border)",
              fontFamily: "var(--font-naxsha-mono)",
              fontSize: 10,
              letterSpacing: "0.14em",
              color: "var(--st-text-2)",
            }}
          >
            <Sparkles size={11} style={{ color: "#F4A87A" }} />
            NAXSHA STUDIO · GUIDED SETUP
          </span>
        </div>

        {/* conversation card */}
        <div className="st-glass rounded-[24px] overflow-hidden">
          <div ref={scrollRef} className="px-6 pt-6 pb-2 space-y-3 max-h-[42vh] overflow-y-auto">
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className={`flex items-end gap-2 ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.from === "ai" && <Avatar from="ai" />}
                <div
                  className="px-3.5 py-2.5 rounded-2xl text-[14px] leading-snug"
                  style={
                    m.from === "user"
                      ? { background: "#B8552B", color: "#fff", borderRadius: "16px 16px 4px 16px", maxWidth: "78%" }
                      : { background: "var(--st-ai-bubble)", color: "var(--st-text)", borderRadius: "16px 16px 16px 4px", maxWidth: "82%", border: "0.5px solid var(--st-ai-border)" }
                  }
                >
                  {m.text}
                </div>
                {m.from === "user" && <Avatar from="user" />}
              </motion.div>
            ))}

            {generating && (
              <div className="flex items-end gap-2 justify-start">
                <Avatar from="ai" />
                <div className="px-3.5 py-3 rounded-2xl flex-1" style={{ background: "var(--st-ai-bubble)", border: "0.5px solid var(--st-ai-border)" }}>
                  {GEN_STEPS.map((g, i) => (
                    <div key={g} className="flex items-center gap-2.5 py-1" style={{ opacity: i <= genIdx ? 1 : 0.35 }}>
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: i < genIdx ? "#4D7C0F" : i === genIdx ? "#F4A87A" : "var(--st-text-3)" }}
                      />
                      <span style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 11, color: "var(--st-text-2)", letterSpacing: "0.02em" }}>{g}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* options */}
          {!generating && (
            <div className="px-6 pb-6 pt-3" style={{ borderTop: "0.5px solid var(--st-border)" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  {current.variant === "layouts" ? (
                    <div className="grid grid-cols-2 gap-2.5">
                      {current.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => answer(opt)}
                          className="group flex items-center gap-3 p-2.5 rounded-2xl text-left transition-colors"
                          style={{ background: "var(--st-chip)", border: "0.5px solid var(--st-chip-border)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--st-hover)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--st-chip)")}
                        >
                          <span
                            className="shrink-0 rounded-lg overflow-hidden"
                            style={{ width: 56, height: 42, background: "var(--st-input)", border: "0.5px solid var(--st-border)" }}
                          >
                            <LayoutGlyph kind={opt} />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[13px] font-semibold truncate" style={{ color: "var(--st-text)" }}>{opt}</span>
                            <span className="block text-[11px] leading-tight mt-0.5" style={{ color: "var(--st-text-3)" }}>
                              {LAYOUT_BLURB[opt as LayoutKind]}
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {current.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => answer(opt)}
                          className="px-3.5 h-9 rounded-full text-[13px] font-medium transition-colors"
                          style={{ background: "var(--st-chip)", border: "0.5px solid var(--st-chip-border)", color: "var(--st-text)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--st-hover)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--st-chip)")}
                        >
                          {opt}
                        </button>
                      ))}
                      {current.allowCustom && (
                        <form
                          className="flex items-center gap-1.5 flex-1 min-w-[160px]"
                          onSubmit={(e) => { e.preventDefault(); if (custom.trim()) answer(custom.trim()); }}
                        >
                          <input
                            value={custom}
                            onChange={(e) => setCustom(e.target.value)}
                            placeholder="Type your own…"
                            className="flex-1 h-9 px-3 rounded-full text-[13px] bg-transparent outline-none"
                            style={{ border: "0.5px solid var(--st-chip-border)", color: "var(--st-text)" }}
                          />
                          <button type="submit" className="h-9 w-9 rounded-full inline-flex items-center justify-center shrink-0" style={{ background: "#B8552B" }}>
                            <ArrowRight size={15} color="#fff" strokeWidth={2.4} />
                          </button>
                        </form>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* progress dots */}
        {!generating && (
          <div className="flex items-center justify-center gap-1.5 mt-5">
            {ONBOARDING.map((_, i) => (
              <span key={i} className="h-1 rounded-full transition-all" style={{ width: i === step ? 20 : 6, background: i <= step ? "#F4A87A" : "var(--st-border-2)" }} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
