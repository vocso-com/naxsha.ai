"use client";

import { motion } from "motion/react";
import { ROOMS, PLOT, ftIn, roomArea, type Room } from "@/lib/floorplan";

const S = 14;
const M = 40;
const W = PLOT.w * S + M * 2;
const H = PLOT.h * S + M * 2;

const SELECTED = "master";

function doorGeometry(r: Room) {
  if (!r.door) return null;
  const { wall, offset, width = 3 } = r.door;
  const x = r.x * S + M;
  const y = r.y * S + M;
  const w = r.w * S;
  const h = r.h * S;
  const o = offset * S;
  const len = width * S;
  let p1: [number, number],
    p2: [number, number],
    hinge: [number, number],
    leafEnd: [number, number],
    sweepFlag: 0 | 1;
  if (wall === "N") {
    p1 = [x + o, y]; p2 = [x + o + len, y]; hinge = p1; leafEnd = [x + o, y + len]; sweepFlag = 1;
  } else if (wall === "S") {
    p1 = [x + o, y + h]; p2 = [x + o + len, y + h]; hinge = p1; leafEnd = [x + o, y + h - len]; sweepFlag = 0;
  } else if (wall === "W") {
    p1 = [x, y + o]; p2 = [x, y + o + len]; hinge = p1; leafEnd = [x + len, y + o]; sweepFlag = 0;
  } else {
    p1 = [x + w, y + o]; p2 = [x + w, y + o + len]; hinge = p1; leafEnd = [x + w - len, y + o]; sweepFlag = 1;
  }
  return { p1, p2, hinge, leafEnd, sweepFlag, len };
}

function windowSegments(r: Room) {
  if (!r.windows) return [];
  return r.windows.map((w) => {
    const x = r.x * S + M;
    const y = r.y * S + M;
    const rw = r.w * S;
    const rh = r.h * S;
    const o = w.offset * S;
    const ln = w.width * S;
    if (w.wall === "N") return { x1: x + o, y1: y, x2: x + o + ln, y2: y };
    if (w.wall === "S") return { x1: x + o, y1: y + rh, x2: x + o + ln, y2: y + rh };
    if (w.wall === "W") return { x1: x, y1: y + o, x2: x, y2: y + o + ln };
    return { x1: x + rw, y1: y + o, x2: x + rw, y2: y + o + ln };
  });
}

function Furniture({ r }: { r: Room }) {
  const x = r.x * S + M;
  const y = r.y * S + M;
  const w = r.w * S;
  const h = r.h * S;
  const stroke = "rgba(0,61,122,0.32)";
  const sw = 0.75;
  switch (r.kind) {
    case "master":
    case "bedroom": {
      const bedW = Math.min(w * 0.6, 6 * S);
      const bedH = 5 * S;
      const bx = x + (w - bedW) / 2;
      const by = y + 1 * S;
      return (
        <g>
          <rect x={bx} y={by} width={bedW} height={bedH} fill="none" stroke={stroke} strokeWidth={sw} rx={2} />
          <line x1={bx} y1={by + 1 * S} x2={bx + bedW} y2={by + 1 * S} stroke={stroke} strokeWidth={sw} />
          <rect x={bx - 1.5 * S} y={by} width={1.2 * S} height={1.2 * S} fill="none" stroke={stroke} strokeWidth={sw} />
          <rect x={bx + bedW + 0.3 * S} y={by} width={1.2 * S} height={1.2 * S} fill="none" stroke={stroke} strokeWidth={sw} />
        </g>
      );
    }
    case "living": {
      const sx = x + 1 * S;
      const sy = y + 1 * S;
      return (
        <g stroke={stroke} strokeWidth={sw} fill="none">
          <rect x={sx} y={sy + 4 * S} width={6 * S} height={2 * S} rx={2} />
          <rect x={sx} y={sy + 4 * S} width={2 * S} height={6 * S} rx={2} />
          <rect x={sx + 3 * S} y={sy + 7.5 * S} width={3 * S} height={1.5 * S} rx={1} />
          <rect x={x + w - 6 * S} y={y + h - 7 * S} width={5 * S} height={3 * S} rx={1} />
        </g>
      );
    }
    case "kitchen":
      return (
        <g stroke={stroke} strokeWidth={sw} fill="none">
          <rect x={x + 0.6 * S} y={y + 0.6 * S} width={w - 1.2 * S} height={1.8 * S} />
          <rect x={x + w - 2.4 * S} y={y + 0.6 * S} width={1.8 * S} height={h - 1.2 * S} />
        </g>
      );
    case "bath":
      return (
        <g stroke={stroke} strokeWidth={sw} fill="none">
          <rect x={x + 0.5 * S} y={y + 0.5 * S} width={2 * S} height={1.4 * S} />
          <rect x={x + w - 2 * S} y={y + 0.5 * S} width={1.5 * S} height={2 * S} />
          <circle cx={x + w - 1.25 * S} cy={y + 1.4 * S} r={0.55 * S} />
        </g>
      );
    case "closet":
      return <rect x={x + 0.4 * S} y={y + 0.4 * S} width={w - 0.8 * S} height={1.4 * S} fill="none" stroke={stroke} strokeWidth={sw} />;
    case "pooja":
      return <rect x={x + w / 2 - 1.2 * S} y={y + 0.4 * S} width={2.4 * S} height={1.4 * S} fill="none" stroke={stroke} strokeWidth={sw} />;
    default:
      return null;
  }
}

function CompassRose() {
  return (
    <motion.g
      transform={`translate(${W - 78}, 26)`}
      // Subtle ambient float
      animate={{ y: [0, -1.5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <circle cx={20} cy={20} r={18} fill="#FFFFFF" stroke="#003D7A" strokeWidth={0.75} />
      <line x1={20} y1={4} x2={20} y2={36} stroke="#DEE2E6" strokeWidth={0.5} />
      <line x1={4} y1={20} x2={36} y2={20} stroke="#DEE2E6" strokeWidth={0.5} />
      <polygon points="20,6 16,22 20,18 24,22" fill="#B8552B" />
      <polygon points="20,34 16,18 20,22 24,18" fill="#003D7A" opacity={0.7} />
      <text x={20} y={3} textAnchor="middle" fontFamily="var(--font-naxsha-mono)" fontSize={7} fontWeight={600} fill="#003D7A">N</text>
    </motion.g>
  );
}

/**
 * Static, animated-on-entry floor plan.
 * Not interactive — the master bedroom is permanently highlighted.
 */
export function HeroFloorplan() {
  const plotX = M;
  const plotY = M;
  const plotW = PLOT.w * S;
  const plotH = PLOT.h * S;

  // Rooms that get full dimension labels — the big ones only
  const showFullLabel = (r: Room) => r.w * r.h >= 200;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", maxWidth: "100%" }}
      role="img"
      aria-label="Naxsha-generated floor plan, 30 by 40 foot plot"
    >
      <defs>
        <pattern id="hero-grid-minor" width={S} height={S} patternUnits="userSpaceOnUse">
          <path d={`M ${S} 0 L 0 0 0 ${S}`} fill="none" stroke="#E8E5DC" strokeWidth={0.5} />
        </pattern>
        <pattern id="hero-grid-major" width={S * 5} height={S * 5} patternUnits="userSpaceOnUse">
          <path d={`M ${S * 5} 0 L 0 0 0 ${S * 5}`} fill="none" stroke="rgba(0,61,122,0.10)" strokeWidth={0.5} />
        </pattern>
      </defs>

      <rect width={W} height={H} fill="#FAFAF7" />
      <motion.rect
        width={W}
        height={H}
        fill="url(#hero-grid-minor)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
      <motion.rect
        width={W}
        height={H}
        fill="url(#hero-grid-major)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
      />

      {/* Dimension lines — only the plot total, not every room */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.6 }}
        fontFamily="var(--font-naxsha-mono)"
        fontSize={9.5}
        fill="#495057"
        stroke="#003D7A"
        strokeWidth={0.5}
      >
        <line x1={plotX} y1={plotY - 20} x2={plotX + plotW} y2={plotY - 20} />
        <line x1={plotX} y1={plotY - 24} x2={plotX} y2={plotY - 16} />
        <line x1={plotX + plotW} y1={plotY - 24} x2={plotX + plotW} y2={plotY - 16} />
        <rect x={plotX + plotW / 2 - 18} y={plotY - 28} width={36} height={14} fill="#FAFAF7" stroke="none" />
        <text x={plotX + plotW / 2} y={plotY - 18} textAnchor="middle" stroke="none" fill="#1A1A1A" fontWeight={500}>
          30&apos;-0&quot;
        </text>
        <line x1={plotX - 20} y1={plotY} x2={plotX - 20} y2={plotY + plotH} />
        <line x1={plotX - 24} y1={plotY} x2={plotX - 16} y2={plotY} />
        <line x1={plotX - 24} y1={plotY + plotH} x2={plotX - 16} y2={plotY + plotH} />
        <rect x={plotX - 34} y={plotY + plotH / 2 - 8} width={28} height={16} fill="#FAFAF7" stroke="none" />
        <text
          x={plotX - 20}
          y={plotY + plotH / 2 + 3}
          textAnchor="middle"
          stroke="none"
          fill="#1A1A1A"
          fontWeight={500}
          transform={`rotate(-90 ${plotX - 20} ${plotY + plotH / 2 + 3})`}
        >
          40&apos;-0&quot;
        </text>
      </motion.g>

      {/* Plot outer wall — draws in */}
      <motion.rect
        x={plotX}
        y={plotY}
        width={plotW}
        height={plotH}
        fill="none"
        stroke="#003D7A"
        strokeWidth={2.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
      />

      {/* Rooms — static, no interactivity */}
      {ROOMS.map((r, i) => {
        const sel = r.id === SELECTED;
        return (
          <motion.rect
            key={`r-${r.id}`}
            x={r.x * S + M}
            y={r.y * S + M}
            width={r.w * S}
            height={r.h * S}
            rx={2}
            fill={sel ? "rgba(216,228,241,0.55)" : "#FFFFFF"}
            stroke={sel ? "#B8552B" : "#003D7A"}
            strokeWidth={sel ? 2 : 1.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 0.7, ease: "easeOut", delay: 0.6 + i * 0.05 },
              opacity: { duration: 0.3, delay: 0.6 + i * 0.05 },
            }}
          />
        );
      })}

      {/* Furniture */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.4 }}
      >
        {ROOMS.map((r) => (
          <Furniture key={`f-${r.id}`} r={r} />
        ))}
      </motion.g>

      {/* Doors */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        {ROOMS.map((r) => {
          const d = doorGeometry(r);
          if (!d) return null;
          return (
            <g key={`d-${r.id}`}>
              <line x1={d.p1[0]} y1={d.p1[1]} x2={d.p2[0]} y2={d.p2[1]} stroke="#FAFAF7" strokeWidth={2.5} />
              <line x1={d.hinge[0]} y1={d.hinge[1]} x2={d.leafEnd[0]} y2={d.leafEnd[1]} stroke="#003D7A" strokeWidth={1} />
              <path
                d={`M ${d.p2[0]} ${d.p2[1]} A ${d.len} ${d.len} 0 0 ${d.sweepFlag} ${d.leafEnd[0]} ${d.leafEnd[1]}`}
                fill="none"
                stroke="#003D7A"
                strokeWidth={0.6}
                strokeDasharray="2 2"
                opacity={0.6}
              />
            </g>
          );
        })}
      </motion.g>

      {/* Windows */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.3 }}
      >
        {ROOMS.flatMap((r) =>
          windowSegments(r).map((w, i) => (
            <g key={`w-${r.id}-${i}`}>
              <line x1={w.x1} y1={w.y1} x2={w.x2} y2={w.y2} stroke="#FAFAF7" strokeWidth={3} />
              <line x1={w.x1} y1={w.y1} x2={w.x2} y2={w.y2} stroke="#003D7A" strokeWidth={0.6} />
            </g>
          ))
        )}
      </motion.g>

      {/* Labels — softer: only big rooms get dimensions */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        {ROOMS.map((r) => {
          const sel = r.id === SELECTED;
          const cx = r.x * S + M + (r.w * S) / 2;
          const cy = r.y * S + M + (r.h * S) / 2;
          const full = showFullLabel(r);
          const big = r.w * r.h >= 80;
          return (
            <g key={`l-${r.id}`}>
              <text
                x={cx}
                y={full ? cy - 4 : cy + 3}
                textAnchor="middle"
                fontSize={big ? 11 : 9.5}
                fontWeight={600}
                fill={sel ? "#B8552B" : "#1A1A1A"}
                fontFamily="var(--font-naxsha-sans)"
              >
                {r.name}
              </text>
              {full && (
                <text
                  x={cx}
                  y={cy + 10}
                  textAnchor="middle"
                  fontSize={9}
                  fontFamily="var(--font-naxsha-mono)"
                  fill={sel ? "#B8552B" : "#6C757D"}
                  letterSpacing={0.4}
                >
                  {ftIn(r.w)} × {ftIn(r.h)} · {roomArea(r)} SF
                </text>
              )}
            </g>
          );
        })}
      </motion.g>

      <motion.g
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.7 }}
        style={{ transformOrigin: `${W - 58}px 46px` }}
      >
        <CompassRose />
      </motion.g>

      {/* Scale bar */}
      <motion.g
        transform={`translate(${M}, ${H - 22})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.7 }}
      >
        <line x1={0} y1={6} x2={5 * S} y2={6} stroke="#003D7A" strokeWidth={0.8} />
        <line x1={0} y1={3} x2={0} y2={9} stroke="#003D7A" strokeWidth={0.8} />
        <line x1={5 * S} y1={3} x2={5 * S} y2={9} stroke="#003D7A" strokeWidth={0.8} />
        <line x1={2.5 * S} y1={3} x2={2.5 * S} y2={9} stroke="#003D7A" strokeWidth={0.5} />
        <text x={0} y={-2} fontFamily="var(--font-naxsha-mono)" fontSize={8.5} fill="#495057" letterSpacing={0.6}>
          SCALE 1:50
        </text>
        <text x={5 * S + 6} y={9} fontFamily="var(--font-naxsha-mono)" fontSize={9} fill="#1A1A1A">
          5&apos;-0&quot;
        </text>
      </motion.g>
    </svg>
  );
}
