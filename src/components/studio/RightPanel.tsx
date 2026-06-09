"use client";

import { motion } from "motion/react";
import { RotateCw, Trash2, Check, X, DoorOpen, RectangleHorizontal, ScanLine, Compass } from "lucide-react";
import {
  type Floor, type PlacedItem, type Plot, type CostBreakdown,
  furnitureSpec, roomArea, roomCost, ftIn, formatINR, formatINRShort, KIND_LABEL, vastuVerdict, glassBlur,
} from "@/lib/studio";

type Sel = { type: "room" | "item"; id: string } | null;

export function RightPanel({
  tab, onTab, selected, floors, activeFloor, items, plot, cost, onRotate, onDelete, onClear,
}: {
  tab: "properties" | "costs";
  onTab: (t: "properties" | "costs") => void;
  selected: Sel;
  floors: Floor[];
  activeFloor: Floor;
  items: PlacedItem[];
  plot: Plot;
  cost: CostBreakdown;
  onRotate: (id: string) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}) {
  return (
    <div className="st-glass absolute right-4 top-4 bottom-4 w-[316px] z-20 flex flex-col rounded-[22px] overflow-hidden" style={glassBlur()}>
      {/* tabs */}
      <div className="flex items-center gap-1 p-1.5 m-3 rounded-xl" style={{ background: "var(--st-input)" }}>
        {(["properties", "costs"] as const).map((t) => (
          <button
            key={t}
            onClick={() => onTab(t)}
            className="flex-1 h-8 rounded-lg text-[12.5px] font-medium capitalize transition-colors"
            style={{ background: tab === t ? "var(--st-active)" : "transparent", color: tab === t ? "var(--st-active-text)" : "var(--st-text-2)" }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {tab === "properties"
          ? <Properties selected={selected} activeFloor={activeFloor} items={items} plot={plot} onRotate={onRotate} onDelete={onDelete} onClear={onClear} />
          : <Costs floors={floors} cost={cost} plot={plot} itemCount={items.length} />}
      </div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--st-text-3)" }}>{children}</p>;
}

/* Stacked metric tile — label above value, mono numerals. Distinct from the
   left-label / right-value row pattern. */
function Metric({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="rounded-xl px-2.5 py-2" style={{ background: "var(--st-input)", border: "0.5px solid var(--st-border)" }}>
      <p style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 8.5, letterSpacing: "0.1em", color: "var(--st-text-3)" }}>{label}</p>
      <p className="mt-0.5" style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 13.5, fontWeight: 600, color: accent ?? "var(--st-text)" }}>{value}</p>
    </div>
  );
}

/* Proportional footprint with architectural dimension callouts. */
function FootprintDiagram({ w, h, tone }: { w: number; h: number; tone: "room" | "item" }) {
  const maxW = 176, maxH = 88;
  const s = Math.min(maxW / w, maxH / h);
  const rw = Math.max(26, w * s), rh = Math.max(18, h * s);
  const padX = 38, padY = 30;
  const W = rw + padX * 2, H = rh + padY * 2;
  const x = padX, y = padY;
  const fill = tone === "room" ? "rgba(31,90,158,0.12)" : "rgba(184,85,43,0.14)";
  const stroke = tone === "room" ? "#1F5A9E" : "#B8552B";
  const dim = { fill: "var(--st-text-2)", fontFamily: "var(--font-naxsha-mono)", fontSize: 9 } as const;
  return (
    <div className="rounded-xl mt-3 flex items-center justify-center" style={{ background: "var(--st-input)", border: "0.5px solid var(--st-border)", padding: "8px 6px" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxHeight: 150, color: "var(--st-text-3)" }}>
        <rect x={x} y={y} width={rw} height={rh} rx={2.5} fill={fill} stroke={stroke} strokeWidth={1.5} />
        {/* width dimension (top) */}
        <line x1={x} y1={y - 13} x2={x + rw} y2={y - 13} stroke="currentColor" strokeWidth={0.75} />
        <line x1={x} y1={y - 16} x2={x} y2={y - 10} stroke="currentColor" strokeWidth={0.75} />
        <line x1={x + rw} y1={y - 16} x2={x + rw} y2={y - 10} stroke="currentColor" strokeWidth={0.75} />
        <text x={x + rw / 2} y={y - 17} textAnchor="middle" style={dim}>{ftIn(w)}</text>
        {/* depth dimension (left) */}
        <line x1={x - 13} y1={y} x2={x - 13} y2={y + rh} stroke="currentColor" strokeWidth={0.75} />
        <line x1={x - 16} y1={y} x2={x - 10} y2={y} stroke="currentColor" strokeWidth={0.75} />
        <line x1={x - 16} y1={y + rh} x2={x - 10} y2={y + rh} stroke="currentColor" strokeWidth={0.75} />
        <text x={x - 17} y={y + rh / 2} textAnchor="middle" transform={`rotate(-90 ${x - 17} ${y + rh / 2})`} style={dim}>{ftIn(h)}</text>
      </svg>
    </div>
  );
}

function OpeningPill({ icon: Icon, label }: { icon: typeof DoorOpen; label: string }) {
  return (
    <div className="flex-1 flex items-center gap-1.5 px-2.5 h-8 rounded-lg" style={{ background: "var(--st-input)", border: "0.5px solid var(--st-border)" }}>
      <Icon size={13} style={{ color: "var(--st-text-3)" }} />
      <span className="text-[12px]" style={{ color: "var(--st-text-2)" }}>{label}</span>
    </div>
  );
}

function Properties({ selected, activeFloor, items, plot, onRotate, onDelete, onClear }: {
  selected: Sel; activeFloor: Floor; items: PlacedItem[]; plot: Plot;
  onRotate: (id: string) => void; onDelete: (id: string) => void; onClear: () => void;
}) {
  if (!selected) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-6">
        <span className="h-14 w-14 rounded-2xl inline-flex items-center justify-center mb-4" style={{ background: "var(--st-input)", border: "0.5px solid var(--st-border)" }}>
          <ScanLine size={22} style={{ color: "var(--st-text-3)" }} />
        </span>
        <p style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 10, letterSpacing: "0.14em", color: "var(--st-text-3)" }}>NO SELECTION</p>
        <p className="text-[13px] mt-2 leading-relaxed" style={{ color: "var(--st-text-2)" }}>
          Pick a room or a furniture piece on the plan to open its spec sheet.
        </p>
      </div>
    );
  }

  if (selected.type === "item") {
    const it = items.find((i) => i.id === selected.id);
    if (!it) return null;
    const spec = furnitureSpec(it.kind);
    return (
      <motion.div key={it.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <div className="flex items-start justify-between">
          <div>
            <Eyebrow>FURNITURE · SPEC</Eyebrow>
            <h3 className="text-[18px] font-semibold mt-1.5" style={{ color: "var(--st-text)" }}>{spec.label}</h3>
          </div>
          <button onClick={onClear} className="h-7 w-7 rounded-lg inline-flex items-center justify-center" style={{ color: "var(--st-text-3)" }}><X size={15} /></button>
        </div>

        <FootprintDiagram w={spec.w} h={spec.h} tone="item" />

        <div className="grid grid-cols-2 gap-2 mt-3">
          <Metric label="WIDTH" value={`${spec.w}′`} />
          <Metric label="DEPTH" value={`${spec.h}′`} />
          <Metric label="ROTATION" value={`${it.rot}°`} />
          <Metric label="UNIT COST" value={spec.cost ? formatINR(spec.cost) : "—"} accent="#B8552B" />
        </div>

        <div className="rounded-xl px-2.5 py-2 mt-2" style={{ background: "var(--st-input)", border: "0.5px solid var(--st-border)" }}>
          <p style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 8.5, letterSpacing: "0.1em", color: "var(--st-text-3)" }}>POSITION · X / Y</p>
          <p className="mt-0.5" style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 13.5, fontWeight: 600, color: "var(--st-text)" }}>{ftIn(it.x)} · {ftIn(it.y)}</p>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <button onClick={() => onRotate(it.id)} className="flex-1 h-9 rounded-lg inline-flex items-center justify-center gap-1.5 text-[12.5px] font-medium transition-colors" style={{ background: "var(--st-input)", border: "0.5px solid var(--st-chip-border)", color: "var(--st-text)" }}>
            <RotateCw size={13} /> Rotate
          </button>
          <button onClick={() => onDelete(it.id)} className="flex-1 h-9 rounded-lg inline-flex items-center justify-center gap-1.5 text-[12.5px] font-medium transition-colors" style={{ background: "rgba(184,85,43,0.16)", border: "0.5px solid rgba(184,85,43,0.4)", color: "#B8552B" }}>
            <Trash2 size={13} /> Delete
          </button>
        </div>
      </motion.div>
    );
  }

  const r = activeFloor.rooms.find((x) => x.id === selected.id)!;
  const vastu = vastuVerdict(r, plot);
  const winCount = r.windows?.length ?? 0;
  return (
    <motion.div key={r.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <div className="flex items-start justify-between">
        <div>
          <Eyebrow>{KIND_LABEL[r.kind].toUpperCase()} · SPEC</Eyebrow>
          <h3 className="text-[18px] font-semibold mt-1.5" style={{ color: "var(--st-text)" }}>{r.name}</h3>
        </div>
        <button onClick={onClear} className="h-7 w-7 rounded-lg inline-flex items-center justify-center" style={{ color: "var(--st-text-3)" }}><X size={15} /></button>
      </div>

      <FootprintDiagram w={r.w} h={r.h} tone="room" />

      <div className="grid grid-cols-2 gap-2 mt-3">
        <Metric label="WIDTH" value={ftIn(r.w)} />
        <Metric label="DEPTH" value={ftIn(r.h)} />
        <Metric label="CARPET AREA" value={`${roomArea(r)} ft²`} />
        <Metric label="BUILD COST" value={formatINR(roomCost(r))} accent="#B8552B" />
      </div>

      <div className="flex items-center gap-2 mt-2">
        <OpeningPill icon={RectangleHorizontal} label={`${winCount} window${winCount === 1 ? "" : "s"}`} />
        <OpeningPill icon={DoorOpen} label={`${r.door ? 1 : 0} door`} />
      </div>

      {/* vastu seal */}
      <div className="mt-3 p-3 rounded-xl flex items-start gap-2.5" style={{ background: vastu.ok ? "rgba(77,124,15,0.12)" : "rgba(184,85,43,0.12)", border: `0.5px solid ${vastu.ok ? "rgba(77,124,15,0.3)" : "rgba(184,85,43,0.35)"}` }}>
        <span className="h-8 w-8 rounded-full inline-flex items-center justify-center shrink-0 mt-0.5" style={{ background: vastu.ok ? "rgba(77,124,15,0.18)" : "rgba(184,85,43,0.18)", border: `0.5px solid ${vastu.ok ? "rgba(77,124,15,0.4)" : "rgba(184,85,43,0.45)"}` }}>
          <Compass size={15} style={{ color: vastu.ok ? "#6B9C2E" : "#B8552B" }} />
        </span>
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            {vastu.ok && <Check size={11} strokeWidth={3} style={{ color: "#6B9C2E" }} />}
            <span style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 9.5, letterSpacing: "0.1em", color: vastu.ok ? "#6B9C2E" : "#B8552B" }}>
              {vastu.ok ? "VASTU COMPLIANT" : "VASTU NOTE"}
            </span>
          </div>
          <p className="text-[12px] leading-relaxed" style={{ color: "var(--st-text-2)" }}>{vastu.note}</p>
        </div>
      </div>
    </motion.div>
  );
}

function Bar({ pct }: { pct: number }) {
  return (
    <div className="h-1 rounded-full mt-1.5" style={{ background: "var(--st-input)" }}>
      <div className="h-full rounded-full" style={{ width: `${pct * 100}%`, background: "#1F5A9E" }} />
    </div>
  );
}

function Costs({ floors, cost, plot, itemCount }: { floors: Floor[]; cost: CostBreakdown; plot: Plot; itemCount: number }) {
  return (
    <div>
      {/* hero total */}
      <div className="rounded-2xl p-4" style={{ background: "#003D7A", border: "0.5px solid #002952" }}>
        <Eyebrow>ESTIMATED BUILD COST</Eyebrow>
        <div className="mono mt-1.5" style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 30, fontWeight: 600, color: "#fff", letterSpacing: "-0.01em" }}>
          {formatINRShort(cost.total)}
        </div>
        <div className="flex items-center gap-2 mt-2.5">
          <span className="px-2 py-0.5 rounded" style={{ background: "rgba(244,168,122,0.18)", fontFamily: "var(--font-naxsha-mono)", fontSize: 11, color: "#F4A87A" }}>
            {formatINR(Math.round(cost.perSqft))}/sq ft
          </span>
          <span style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
            {cost.area.toLocaleString("en-IN")} sq ft
          </span>
        </div>
      </div>

      {/* split */}
      <div className="grid grid-cols-2 gap-2 mt-3">
        <div className="p-3 rounded-xl" style={{ background: "var(--st-input)", border: "0.5px solid var(--st-border)" }}>
          <Eyebrow>CIVIL + FINISH</Eyebrow>
          <p className="mono mt-1" style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 14, color: "var(--st-text)", fontWeight: 500 }}>{formatINRShort(cost.construction)}</p>
        </div>
        <div className="p-3 rounded-xl" style={{ background: "var(--st-input)", border: "0.5px solid var(--st-border)" }}>
          <Eyebrow>FURNITURE ({itemCount})</Eyebrow>
          <p className="mono mt-1" style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 14, color: "var(--st-text)", fontWeight: 500 }}>{formatINRShort(cost.furniture)}</p>
        </div>
      </div>

      {/* breakdown */}
      <p className="mt-5 mb-2" style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--st-text-3)" }}>CIVIL BREAKDOWN</p>
      {cost.lines.map((l) => (
        <div key={l.label} className="py-2">
          <div className="flex items-center justify-between">
            <span className="text-[12.5px]" style={{ color: "var(--st-text-2)" }}>{l.label}</span>
            <span style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 12, color: "var(--st-text-3)" }}>{formatINR(l.amount)}</span>
          </div>
          <Bar pct={l.pct} />
        </div>
      ))}

      {/* per-floor */}
      <p className="mt-5 mb-2" style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--st-text-3)" }}>AREA BY FLOOR</p>
      {floors.map((f) => {
        const a = f.rooms.reduce((s, r) => s + roomArea(r), 0);
        return (
          <div key={f.id} className="flex items-center justify-between py-2" style={{ borderBottom: "0.5px solid var(--st-border)" }}>
            <span className="text-[12.5px]" style={{ color: "var(--st-text-2)" }}>{f.name}</span>
            <span style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 12, color: "var(--st-text-3)" }}>{a.toLocaleString("en-IN")} sq ft</span>
          </div>
        );
      })}

      <div className="flex items-center justify-between py-2 mt-1">
        <span className="text-[12.5px] font-medium" style={{ color: "var(--st-text)" }}>Plot</span>
        <span style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 12, color: "var(--st-text-2)" }}>{plot.w}′ × {plot.h}′ · {plot.facing}-facing</span>
      </div>
    </div>
  );
}
