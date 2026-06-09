import { ROOMS, PLOT } from "@/lib/floorplan";

const S = 6;
const M = 8;
const W = PLOT.w * S + M * 2;
const H = PLOT.h * S + M * 2;

/**
 * Minimal floor-plan thumbnail — no labels, no dimensions, just walls.
 * Used in the hero plan-card stack and bento previews.
 *
 * `accent` = which room gets the Terracotta highlight.
 */
export function MiniPlan({
  accent = "master",
  showCompass = false,
  scale = 1,
}: {
  accent?: string | null;
  showCompass?: boolean;
  scale?: number;
}) {
  return (
    <svg
      width={W * scale}
      height={H * scale}
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
      aria-hidden
    >
      <rect width={W} height={H} fill="#FAFAF7" />

      {/* Faint grid */}
      <defs>
        <pattern
          id={`mp-grid-${accent ?? "x"}`}
          width={S}
          height={S}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${S} 0 L 0 0 0 ${S}`}
            fill="none"
            stroke="#E8E5DC"
            strokeWidth={0.25}
          />
        </pattern>
      </defs>
      <rect width={W} height={H} fill={`url(#mp-grid-${accent ?? "x"})`} />

      {/* Outer wall */}
      <rect
        x={M}
        y={M}
        width={PLOT.w * S}
        height={PLOT.h * S}
        fill="none"
        stroke="#003D7A"
        strokeWidth={1.25}
      />

      {/* Rooms */}
      {ROOMS.map((r) => {
        const sel = r.id === accent;
        return (
          <rect
            key={r.id}
            x={r.x * S + M}
            y={r.y * S + M}
            width={r.w * S}
            height={r.h * S}
            fill={sel ? "rgba(216,228,241,0.65)" : "#FFFFFF"}
            stroke={sel ? "#B8552B" : "#003D7A"}
            strokeWidth={sel ? 1.2 : 0.75}
            rx={1}
          />
        );
      })}

      {/* Tiny compass */}
      {showCompass && (
        <g transform={`translate(${W - 22}, 10)`}>
          <circle cx={6} cy={6} r={5} fill="#FFFFFF" stroke="#003D7A" strokeWidth={0.5} />
          <polygon points="6,2 4.5,6.5 6,5.5 7.5,6.5" fill="#B8552B" />
        </g>
      )}
    </svg>
  );
}
