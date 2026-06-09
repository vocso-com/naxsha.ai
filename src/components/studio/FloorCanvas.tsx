"use client";

import { useEffect, useRef, useState } from "react";
import {
  type Floor,
  type Room,
  type PlacedItem,
  type FurnitureKind,
  type ToolId,
  type Plot,
  furnitureSpec,
  ftIn,
  roomArea,
} from "@/lib/studio";

const S = 16; // px per foot at zoom 1
const M = 48; // margin

export type View = { zoom: number; tx: number; ty: number };

type Props = {
  floor: Floor;
  plot: Plot;
  items: PlacedItem[];
  selected: { type: "room" | "item"; id: string } | null;
  tool: ToolId;
  placingKind: FurnitureKind | null;
  view: View;
  width: number;
  height: number;
  onView: (v: View) => void;
  onSelect: (sel: { type: "room" | "item"; id: string } | null) => void;
  onPlace: (kind: FurnitureKind, x: number, y: number) => void;
  onMoveItem: (id: string, x: number, y: number) => void;
};

// content (sheet) size in design px
export const contentSize = (plot: Plot) => ({ CW: plot.w * S + M * 2, CH: plot.h * S + M * 2 });

// ----- geometry -----------------------------------------------------------

function doorGeometry(r: Room) {
  if (!r.door) return null;
  const { wall, offset, width = 3 } = r.door;
  const x = r.x * S + M;
  const y = r.y * S + M;
  const w = r.w * S;
  const h = r.h * S;
  const o = offset * S;
  const len = width * S;
  let p1: [number, number], p2: [number, number], hinge: [number, number], leafEnd: [number, number], sweep: 0 | 1;
  if (wall === "N") { p1 = [x + o, y]; p2 = [x + o + len, y]; hinge = p1; leafEnd = [x + o, y + len]; sweep = 1; }
  else if (wall === "S") { p1 = [x + o, y + h]; p2 = [x + o + len, y + h]; hinge = p1; leafEnd = [x + o, y + h - len]; sweep = 0; }
  else if (wall === "W") { p1 = [x, y + o]; p2 = [x, y + o + len]; hinge = p1; leafEnd = [x + len, y + o]; sweep = 0; }
  else { p1 = [x + w, y + o]; p2 = [x + w, y + o + len]; hinge = p1; leafEnd = [x + w - len, y + o]; sweep = 1; }
  return { p1, p2, hinge, leafEnd, sweep, len };
}

function windowSegments(r: Room) {
  if (!r.windows) return [];
  return r.windows.map((w) => {
    const x = r.x * S + M, y = r.y * S + M, rw = r.w * S, rh = r.h * S, o = w.offset * S, ln = w.width * S;
    if (w.wall === "N") return { x1: x + o, y1: y, x2: x + o + ln, y2: y };
    if (w.wall === "S") return { x1: x + o, y1: y + rh, x2: x + o + ln, y2: y + rh };
    if (w.wall === "W") return { x1: x, y1: y + o, x2: x, y2: y + o + ln };
    return { x1: x + rw, y1: y + o, x2: x + rw, y2: y + o + ln };
  });
}

const FILL = "rgba(255,255,255,1)";
const STROKE = "#003D7A";
const FURN = "rgba(0,61,122,0.34)";

function RoomFurniture({ r }: { r: Room }) {
  const x = r.x * S + M, y = r.y * S + M, w = r.w * S, h = r.h * S;
  const sw = 0.9;
  switch (r.kind) {
    case "master":
    case "bedroom": {
      const bw = Math.min(w * 0.55, 6 * S), bh = 5 * S;
      const bx = x + (w - bw) / 2, by = y + 1 * S;
      return (
        <g stroke={FURN} strokeWidth={sw} fill="none">
          <rect x={bx} y={by} width={bw} height={bh} rx={2} />
          <line x1={bx} y1={by + S} x2={bx + bw} y2={by + S} />
          <rect x={bx - 1.4 * S} y={by} width={1.1 * S} height={1.1 * S} />
          <rect x={bx + bw + 0.3 * S} y={by} width={1.1 * S} height={1.1 * S} />
        </g>
      );
    }
    case "living": {
      const sx = x + S, sy = y + S;
      return (
        <g stroke={FURN} strokeWidth={sw} fill="none">
          <rect x={sx} y={sy + 4 * S} width={6 * S} height={2 * S} rx={2} />
          <rect x={sx} y={sy + 4 * S} width={2 * S} height={5 * S} rx={2} />
          <rect x={sx + 2.5 * S} y={sy + 7 * S} width={3 * S} height={1.5 * S} rx={1} />
          <rect x={x + w - 6 * S} y={y + h - 6.5 * S} width={5 * S} height={1.2 * S} rx={1} />
        </g>
      );
    }
    case "kitchen":
    case "utility":
      return (
        <g stroke={FURN} strokeWidth={sw} fill="none">
          <rect x={x + 0.6 * S} y={y + 0.6 * S} width={w - 1.2 * S} height={1.8 * S} />
          <rect x={x + w - 2.4 * S} y={y + 0.6 * S} width={1.8 * S} height={h - 1.2 * S} />
        </g>
      );
    case "bath":
    case "powder":
      return (
        <g stroke={FURN} strokeWidth={sw} fill="none">
          <rect x={x + 0.5 * S} y={y + 0.5 * S} width={1.8 * S} height={1.3 * S} rx={1} />
          <rect x={x + w - 2 * S} y={y + 0.5 * S} width={1.4 * S} height={2 * S} rx={4} />
          <circle cx={x + w - 1.3 * S} cy={y + 1.5 * S} r={0.5 * S} />
        </g>
      );
    case "closet":
    case "store":
      return <rect x={x + 0.4 * S} y={y + 0.4 * S} width={w - 0.8 * S} height={1.3 * S} fill="none" stroke={FURN} strokeWidth={sw} />;
    case "pooja":
      return <rect x={x + w / 2 - 1.2 * S} y={y + 0.4 * S} width={2.4 * S} height={1.3 * S} fill="none" stroke={FURN} strokeWidth={sw} />;
    case "stair": {
      const steps = 7;
      const stepH = (h - 1 * S) / steps;
      return (
        <g stroke={FURN} strokeWidth={sw} fill="none">
          <rect x={x + 0.5 * S} y={y + 0.5 * S} width={w - S} height={h - S} />
          {Array.from({ length: steps }).map((_, i) => (
            <line key={i} x1={x + 0.5 * S} y1={y + 0.5 * S + i * stepH} x2={x + w - 0.5 * S} y2={y + 0.5 * S + i * stepH} />
          ))}
          <line x1={x + w / 2} y1={y + 0.5 * S} x2={x + w / 2} y2={y + h - 0.5 * S} strokeWidth={sw * 1.4} />
        </g>
      );
    }
    default:
      return null;
  }
}

// Placed furniture glyph, drawn centered at origin in S-scaled feet.
function ItemGlyph({ kind }: { kind: FurnitureKind }) {
  const s = furnitureSpec(kind);
  const w = s.w * S, h = s.h * S;
  const x = -w / 2, y = -h / 2;
  const st = "#003D7A", sw = 1;
  const common = { stroke: st, strokeWidth: sw, fill: "none" as const };
  switch (kind) {
    case "bed-queen":
    case "bed-single":
      return (
        <g {...common}>
          <rect x={x} y={y} width={w} height={h} rx={3} fill="rgba(216,228,241,0.4)" />
          <line x1={x} y1={y + h * 0.22} x2={x + w} y2={y + h * 0.22} />
          <rect x={x + w * 0.12} y={y + h * 0.04} width={w * 0.76} height={h * 0.14} rx={2} />
        </g>
      );
    case "sofa":
      return (
        <g {...common} fill="rgba(216,228,241,0.4)">
          <rect x={x} y={y} width={w} height={h} rx={4} />
          <rect x={x} y={y} width={w} height={h * 0.32} rx={3} />
          <rect x={x} y={y} width={w * 0.14} height={h} rx={3} />
          <rect x={x + w * 0.86} y={y} width={w * 0.14} height={h} rx={3} />
        </g>
      );
    case "wardrobe":
      return (
        <g {...common} fill="rgba(216,228,241,0.4)">
          <rect x={x} y={y} width={w} height={h} />
          <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} />
          <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} />
        </g>
      );
    case "table":
      return <rect x={x} y={y} width={w} height={h} rx={3} {...common} fill="rgba(216,228,241,0.4)" />;
    case "dining":
      return (
        <g {...common} fill="rgba(216,228,241,0.4)">
          <rect x={x + w * 0.12} y={y + h * 0.2} width={w * 0.76} height={h * 0.6} rx={3} />
          {[0.28, 0.5, 0.72].map((p) => (
            <circle key={"t" + p} cx={x + w * p} cy={y + h * 0.08} r={S * 0.55} />
          ))}
          {[0.28, 0.5, 0.72].map((p) => (
            <circle key={"b" + p} cx={x + w * p} cy={y + h * 0.92} r={S * 0.55} />
          ))}
        </g>
      );
    case "toilet":
      return (
        <g {...common} fill="rgba(216,228,241,0.4)">
          <rect x={x} y={y} width={w} height={h * 0.3} rx={2} />
          <ellipse cx={0} cy={y + h * 0.62} rx={w * 0.42} ry={h * 0.3} />
        </g>
      );
    case "plant":
      return (
        <g {...common} fill="rgba(77,124,15,0.18)">
          <circle cx={0} cy={0} r={Math.min(w, h) / 2} />
          <circle cx={0} cy={0} r={Math.min(w, h) / 4} fill="none" />
        </g>
      );
    case "tv":
      return <rect x={x} y={y} width={w} height={h} rx={1.5} fill="#003D7A" stroke="#003D7A" />;
    case "car":
      return (
        <g {...common} fill="rgba(216,228,241,0.4)">
          <rect x={x} y={y} width={w} height={h} rx={8} />
          <rect x={x + w * 0.15} y={y + h * 0.12} width={w * 0.7} height={h * 0.3} rx={5} />
          <rect x={x + w * 0.15} y={y + h * 0.55} width={w * 0.7} height={h * 0.3} rx={5} />
        </g>
      );
    default:
      return null;
  }
}

export function FloorCanvas({
  floor, plot, items, selected, tool, placingKind, view, width, height, onView, onSelect, onPlace, onMoveItem,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);
  const { CW: W, CH: H } = contentSize(plot);

  const [measure, setMeasure] = useState<{ a: [number, number] | null; b: [number, number] | null }>({ a: null, b: null });
  const drag = useRef<{ id: string; dx: number; dy: number } | null>(null);
  const pan = useRef<{ sx: number; sy: number; tx: number; ty: number } | null>(null);

  useEffect(() => {
    setMeasure({ a: null, b: null });
  }, [tool, floor.id]);

  // client coords → feet in plan space
  const toFt = (clientX: number, clientY: number): [number, number] => {
    const g = gRef.current!;
    const ctm = g.getScreenCTM();
    if (!ctm) return [0, 0];
    const pt = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse());
    return [(pt.x - M) / S, (pt.y - M) / S];
  };
  const snap = (v: number) => Math.round(v * 2) / 2;

  const onBackgroundClick = (e: React.MouseEvent) => {
    if (tool === "furniture" && placingKind) {
      const [fx, fy] = toFt(e.clientX, e.clientY);
      onPlace(placingKind, snap(fx), snap(fy));
      return;
    }
    if (tool === "measure") {
      const [fx, fy] = toFt(e.clientX, e.clientY);
      setMeasure((m) => (!m.a || m.b ? { a: [snap(fx), snap(fy)], b: null } : { a: m.a, b: [snap(fx), snap(fy)] }));
      return;
    }
    if (tool === "select") onSelect(null);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (tool === "pan") {
      pan.current = { sx: e.clientX, sy: e.clientY, tx: view.tx, ty: view.ty };
      (e.target as Element).setPointerCapture?.(e.pointerId);
    }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (pan.current) {
      onView({ ...view, tx: pan.current.tx + (e.clientX - pan.current.sx), ty: pan.current.ty + (e.clientY - pan.current.sy) });
      return;
    }
    if (drag.current) {
      const [fx, fy] = toFt(e.clientX, e.clientY);
      onMoveItem(drag.current.id, snap(fx - drag.current.dx), snap(fy - drag.current.dy));
    }
  };
  const onPointerUp = () => { pan.current = null; drag.current = null; };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
    const next = Math.min(3, Math.max(0.4, view.zoom * factor));
    const rect = svgRef.current!.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    // keep cursor anchored
    const k = next / view.zoom;
    onView({ zoom: next, tx: cx - k * (cx - view.tx), ty: cy - k * (cy - view.ty) });
  };

  const startItemDrag = (it: PlacedItem, e: React.PointerEvent) => {
    if (tool !== "select") return;
    e.stopPropagation();
    onSelect({ type: "item", id: it.id });
    const [fx, fy] = toFt(e.clientX, e.clientY);
    drag.current = { id: it.id, dx: fx - it.x, dy: fy - it.y };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const cursor = tool === "pan" ? "grab" : tool === "furniture" && placingKind ? "crosshair" : tool === "measure" ? "crosshair" : "default";

  const showFull = (r: Room) => roomArea(r) >= 140;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      style={{ display: "block", touchAction: "none", cursor }}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onClick={onBackgroundClick}
    >
      <g ref={gRef} transform={`translate(${view.tx} ${view.ty}) scale(${view.zoom})`}>
        {/* sheet */}
        <rect x={M * 0.4} y={M * 0.4} width={W - M * 0.8} height={H - M * 0.8} style={{ fill: "var(--st-sheet)", stroke: "var(--st-sheet-edge)" }} strokeWidth={0.5} rx={6} />
        <defs>
          <pattern id="fc-grid" width={S} height={S} patternUnits="userSpaceOnUse">
            <path d={`M ${S} 0 L 0 0 0 ${S}`} fill="none" style={{ stroke: "var(--st-sheet-grid)" }} strokeWidth={0.5} />
          </pattern>
          <pattern id="fc-grid-5" width={S * 5} height={S * 5} patternUnits="userSpaceOnUse">
            <path d={`M ${S * 5} 0 L 0 0 0 ${S * 5}`} fill="none" stroke="rgba(0,61,122,0.10)" strokeWidth={0.5} />
          </pattern>
        </defs>
        <rect x={M} y={M} width={plot.w * S} height={plot.h * S} fill="url(#fc-grid)" />
        <rect x={M} y={M} width={plot.w * S} height={plot.h * S} fill="url(#fc-grid-5)" />

        {/* plot outer wall */}
        <rect x={M} y={M} width={plot.w * S} height={plot.h * S} fill="none" stroke={STROKE} strokeWidth={3} />

        {/* rooms */}
        {floor.rooms.map((r) => {
          const sel = selected?.type === "room" && selected.id === r.id;
          return (
            <rect
              key={r.id}
              x={r.x * S + M}
              y={r.y * S + M}
              width={r.w * S}
              height={r.h * S}
              rx={2}
              fill={sel ? "rgba(216,228,241,0.6)" : FILL}
              stroke={sel ? "#B8552B" : STROKE}
              strokeWidth={sel ? 2.5 : 1.5}
              style={{ cursor: tool === "select" ? "pointer" : cursor }}
              onClick={(e) => { if (tool === "select") { e.stopPropagation(); onSelect({ type: "room", id: r.id }); } }}
            />
          );
        })}

        {/* built-in furniture */}
        <g>{floor.rooms.map((r) => <RoomFurniture key={"rf-" + r.id} r={r} />)}</g>

        {/* doors */}
        <g>
          {floor.rooms.map((r) => {
            const d = doorGeometry(r);
            if (!d) return null;
            return (
              <g key={"d-" + r.id}>
                <line x1={d.p1[0]} y1={d.p1[1]} x2={d.p2[0]} y2={d.p2[1]} style={{ stroke: "var(--st-sheet)" }} strokeWidth={3} />
                <line x1={d.hinge[0]} y1={d.hinge[1]} x2={d.leafEnd[0]} y2={d.leafEnd[1]} stroke={STROKE} strokeWidth={1.2} />
                <path d={`M ${d.p2[0]} ${d.p2[1]} A ${d.len} ${d.len} 0 0 ${d.sweep} ${d.leafEnd[0]} ${d.leafEnd[1]}`} fill="none" stroke={STROKE} strokeWidth={0.7} strokeDasharray="2 2" opacity={0.55} />
              </g>
            );
          })}
        </g>

        {/* windows */}
        <g>
          {floor.rooms.flatMap((r) =>
            windowSegments(r).map((w, i) => (
              <g key={`w-${r.id}-${i}`}>
                <line x1={w.x1} y1={w.y1} x2={w.x2} y2={w.y2} style={{ stroke: "var(--st-sheet)" }} strokeWidth={3.5} />
                <line x1={w.x1} y1={w.y1} x2={w.x2} y2={w.y2} stroke={STROKE} strokeWidth={0.7} />
              </g>
            ))
          )}
        </g>

        {/* placed items */}
        {items.map((it) => {
          const sel = selected?.type === "item" && selected.id === it.id;
          const spec = furnitureSpec(it.kind);
          const cx = it.x * S + M, cy = it.y * S + M;
          return (
            <g key={it.id} transform={`translate(${cx} ${cy}) rotate(${it.rot})`} style={{ cursor: tool === "select" ? "move" : cursor }} onPointerDown={(e) => startItemDrag(it, e)} onClick={(e) => e.stopPropagation()}>
              {sel && <rect x={-spec.w * S / 2 - 4} y={-spec.h * S / 2 - 4} width={spec.w * S + 8} height={spec.h * S + 8} fill="none" stroke="#B8552B" strokeWidth={1.5} strokeDasharray="4 3" rx={3} />}
              <ItemGlyph kind={it.kind} />
            </g>
          );
        })}

        {/* labels */}
        <g fontFamily="var(--font-naxsha-sans)">
          {floor.rooms.map((r) => {
            const sel = selected?.type === "room" && selected.id === r.id;
            const cx = r.x * S + M + (r.w * S) / 2;
            const cy = r.y * S + M + (r.h * S) / 2;
            const full = showFull(r);
            const big = roomArea(r) >= 70;
            return (
              <g key={"l-" + r.id} pointerEvents="none">
                <text x={cx} y={full ? cy - 3 : cy + 3} textAnchor="middle" fontSize={big ? 11 : 9} fontWeight={600} fill={sel ? "#B8552B" : "#1A1A1A"}>
                  {r.name}
                </text>
                {full && (
                  <text x={cx} y={cy + 11} textAnchor="middle" fontSize={8.5} fontFamily="var(--font-naxsha-mono)" fill={sel ? "#B8552B" : "#6C757D"} letterSpacing={0.3}>
                    {ftIn(r.w)} × {ftIn(r.h)} · {roomArea(r)} SF
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* measure overlay */}
        {measure.a && (
          <g pointerEvents="none">
            <circle cx={measure.a[0] * S + M} cy={measure.a[1] * S + M} r={3} fill="#B8552B" />
            {measure.b && (() => {
              const ax = measure.a![0] * S + M, ay = measure.a![1] * S + M;
              const bx = measure.b[0] * S + M, by = measure.b[1] * S + M;
              const dist = Math.hypot(measure.b[0] - measure.a![0], measure.b[1] - measure.a![1]);
              return (
                <g>
                  <line x1={ax} y1={ay} x2={bx} y2={by} stroke="#B8552B" strokeWidth={1.2} strokeDasharray="4 3" />
                  <circle cx={bx} cy={by} r={3} fill="#B8552B" />
                  <rect x={(ax + bx) / 2 - 26} y={(ay + by) / 2 - 9} width={52} height={16} rx={3} fill="#B8552B" />
                  <text x={(ax + bx) / 2} y={(ay + by) / 2 + 3} textAnchor="middle" fontSize={9} fontFamily="var(--font-naxsha-mono)" fill="#fff" fontWeight={600}>{ftIn(dist)}</text>
                </g>
              );
            })()}
          </g>
        )}

        {/* compass */}
        <g transform={`translate(${W - M - 10}, ${M + 22})`} pointerEvents="none">
          <circle cx={0} cy={0} r={18} fill="#fff" stroke={STROKE} strokeWidth={0.75} />
          <polygon points="0,-14 -4,2 0,-2 4,2" fill="#B8552B" />
          <polygon points="0,14 -4,-2 0,2 4,-2" fill="#003D7A" opacity={0.6} />
          <text x={0} y={-19} textAnchor="middle" fontFamily="var(--font-naxsha-mono)" fontSize={7} fontWeight={600} fill="#003D7A">N</text>
        </g>

        {/* scale bar */}
        <g transform={`translate(${M}, ${H - 26})`} pointerEvents="none">
          <line x1={0} y1={6} x2={5 * S} y2={6} stroke={STROKE} strokeWidth={0.8} />
          <line x1={0} y1={3} x2={0} y2={9} stroke={STROKE} strokeWidth={0.8} />
          <line x1={5 * S} y1={3} x2={5 * S} y2={9} stroke={STROKE} strokeWidth={0.8} />
          <text x={0} y={-2} fontFamily="var(--font-naxsha-mono)" fontSize={8} fill="#495057" letterSpacing={0.5}>SCALE 1:50</text>
          <text x={5 * S + 6} y={9} fontFamily="var(--font-naxsha-mono)" fontSize={8.5} fill="#1A1A1A">5&apos;-0&quot;</text>
        </g>
      </g>
    </svg>
  );
}
