"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { glassBlur } from "@/lib/studio";

export type ChatMsg = { id: string; from: "ai" | "user"; text: string };

function MsgAvatar({ from }: { from: "ai" | "user" }) {
  if (from === "ai") {
    return (
      <span className="h-6 w-6 rounded-full inline-flex items-center justify-center shrink-0" style={{ background: "rgba(184,85,43,0.18)", border: "0.5px solid rgba(184,85,43,0.4)" }}>
        <Sparkles size={12} style={{ color: "#F4A87A" }} />
      </span>
    );
  }
  return (
    <span className="h-6 w-6 rounded-full inline-flex items-center justify-center shrink-0 text-[9.5px] font-semibold text-white" style={{ background: "#003D7A", letterSpacing: "0.02em" }}>
      DC
    </span>
  );
}

export function ChatDock({
  messages, draft, onDraft, onSend, suggestions, onSuggestion, thinking,
  open, onToggle, unread,
}: {
  messages: ChatMsg[];
  draft: string;
  onDraft: (v: string) => void;
  onSend: () => void;
  suggestions: string[];
  onSuggestion: (s: string) => void;
  thinking: boolean;
  open: boolean;
  onToggle: () => void;
  unread: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const last = messages[messages.length - 1];
  useEffect(() => {
    if (open) scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking, open]);

  return (
    <AnimatePresence mode="wait">
      {open ? (
        <motion.div
          key="panel"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="st-glass absolute left-4 top-4 bottom-4 w-[340px] z-20 flex flex-col rounded-[22px] overflow-hidden"
          style={glassBlur()}
        >
          {/* header */}
          <div className="px-4 py-3.5 flex items-center gap-2.5" style={{ borderBottom: "0.5px solid var(--st-border)" }}>
            <span className="h-7 w-7 rounded-full inline-flex items-center justify-center" style={{ background: "rgba(184,85,43,0.18)", border: "0.5px solid rgba(184,85,43,0.4)" }}>
              <Sparkles size={13} style={{ color: "#F4A87A" }} />
            </span>
            <div className="leading-tight">
              <p className="text-[13px] font-semibold" style={{ color: "var(--st-text)" }}>Naxsha AI</p>
              <p style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 9.5, letterSpacing: "0.08em", color: "var(--st-text-3)" }}>YOUR DRAFTING PARTNER</p>
            </div>
            <span className="ml-auto h-1.5 w-1.5 rounded-full" style={{ background: "#4D7C0F", boxShadow: "0 0 0 3px rgba(77,124,15,0.2)" }} />
            <button
              onClick={onToggle}
              title="Collapse"
              className="h-7 w-7 rounded-lg inline-flex items-center justify-center transition-colors"
              style={{ color: "var(--st-text-2)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--st-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <ChevronDown size={16} />
            </button>
          </div>

          {/* messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m) => {
              const isUser = m.from === "user";
              return (
                <motion.div key={m.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                  <MsgAvatar from={m.from} />
                  <div
                    className="px-3.5 py-2.5 text-[13.5px] leading-snug"
                    style={
                      isUser
                        ? { background: "#B8552B", color: "#fff", borderRadius: "16px 16px 4px 16px", maxWidth: "82%" }
                        : { background: "var(--st-ai-bubble)", color: "var(--st-text)", borderRadius: "16px 16px 16px 4px", maxWidth: "86%", border: "0.5px solid var(--st-ai-border)" }
                    }
                  >
                    {m.text}
                  </div>
                </motion.div>
              );
            })}
            {thinking && (
              <div className="flex items-end gap-2">
                <MsgAvatar from="ai" />
                <div className="px-3.5 py-3 rounded-2xl inline-flex items-center gap-1" style={{ background: "var(--st-ai-bubble)" }}>
                  {[0, 1, 2].map((i) => (
                    <motion.span key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--st-text-2)" }} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* suggestions */}
          {suggestions.length > 0 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => onSuggestion(s)}
                  className="px-2.5 h-7 rounded-full text-[12px] transition-colors"
                  style={{ background: "var(--st-chip)", border: "0.5px solid var(--st-chip-border)", color: "var(--st-text-2)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--st-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--st-chip)")}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* composer */}
          <div className="p-3" style={{ borderTop: "0.5px solid var(--st-border)" }}>
            <form
              onSubmit={(e) => { e.preventDefault(); onSend(); }}
              className="flex items-end gap-2 p-1.5 rounded-2xl"
              style={{ background: "var(--st-input)", border: "0.5px solid var(--st-chip-border)" }}
            >
              <textarea
                value={draft}
                onChange={(e) => onDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend(); } }}
                rows={1}
                placeholder="Ask Naxsha to change the plan…"
                className="flex-1 bg-transparent outline-none resize-none px-2 py-1.5 text-[13.5px] max-h-24"
                style={{ color: "var(--st-text)" }}
              />
              <button type="submit" disabled={!draft.trim()} className="h-8 w-8 rounded-xl inline-flex items-center justify-center shrink-0 transition-opacity" style={{ background: draft.trim() ? "#B8552B" : "var(--st-chip-border)", opacity: draft.trim() ? 1 : 0.6 }}>
                <ArrowUp size={16} color="#fff" strokeWidth={2.5} />
              </button>
            </form>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="capsule"
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="st-glass-float absolute left-4 bottom-4 z-20 w-[320px] rounded-[20px] overflow-hidden"
          style={glassBlur()}
        >
          {/* header — click to expand */}
          <button onClick={onToggle} className="w-full px-3 py-2.5 flex items-center gap-2.5 text-left transition-colors"
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--st-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <span className="relative h-8 w-8 rounded-full inline-flex items-center justify-center shrink-0" style={{ background: "rgba(184,85,43,0.18)", border: "0.5px solid rgba(184,85,43,0.4)" }}>
              <Sparkles size={15} style={{ color: "#F4A87A" }} />
              {unread > 0 && (
                <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full inline-flex items-center justify-center text-[10px] font-semibold text-white" style={{ background: "#B8552B" }}>
                  {unread}
                </span>
              )}
            </span>
            <div className="leading-tight min-w-0">
              <p className="text-[13px] font-semibold" style={{ color: "var(--st-text)" }}>Naxsha AI</p>
              <p style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 9, letterSpacing: "0.08em", color: "var(--st-text-3)" }}>TAP TO EXPAND</p>
            </div>
            <span className="ml-auto h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "#4D7C0F", boxShadow: "0 0 0 3px rgba(77,124,15,0.2)" }} />
            <ChevronUp size={16} style={{ color: "var(--st-text-2)" }} className="shrink-0" />
          </button>

          {/* latest message preview */}
          {(thinking || last) && (
            <div className="px-3 pb-2">
              {thinking ? (
                <div className="px-3 py-2.5 rounded-2xl inline-flex items-center gap-1" style={{ background: "var(--st-ai-bubble)" }}>
                  {[0, 1, 2].map((i) => (
                    <motion.span key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--st-text-2)" }} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }} />
                  ))}
                </div>
              ) : (
                <div
                  className="px-3 py-2 text-[12.5px] leading-snug"
                  style={
                    last!.from === "user"
                      ? { background: "#B8552B", color: "#fff", borderRadius: "14px 14px 4px 14px", marginLeft: "auto", maxWidth: "88%", width: "fit-content" }
                      : { background: "var(--st-ai-bubble)", color: "var(--st-text)", borderRadius: "14px 14px 14px 4px", maxWidth: "100%", border: "0.5px solid var(--st-ai-border)" }
                  }
                >
                  <span style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{last!.text}</span>
                </div>
              )}
            </div>
          )}

          {/* quick suggestions */}
          {suggestions.length > 0 && (
            <div className="px-2.5 pb-2.5 flex flex-wrap gap-1.5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => onSuggestion(s)}
                  className="px-2.5 h-7 rounded-full text-[11.5px] transition-colors"
                  style={{ background: "var(--st-chip)", border: "0.5px solid var(--st-chip-border)", color: "var(--st-text-2)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--st-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--st-chip)")}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
