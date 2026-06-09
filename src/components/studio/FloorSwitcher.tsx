"use client";

import { Plus, Minus, Maximize } from "lucide-react";
import { glassBlur } from "@/lib/studio";

export function ZoomControls({
  zoom, onZoom, onFit,
}: {
  zoom: number;
  onZoom: (z: number) => void;
  onFit: () => void;
}) {
  const btn = "h-8 w-8 inline-flex items-center justify-center rounded-lg transition-colors";
  return (
    <div className="st-glass-float flex items-center gap-0.5 p-1 rounded-full" style={glassBlur()}>
      <button className={btn} style={{ color: "var(--st-text-2)" }} onClick={() => onZoom(Math.max(0.4, zoom / 1.15))} title="Zoom out"><Minus size={15} /></button>
      <span className="w-11 text-center" style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 11, color: "var(--st-text)" }}>{Math.round(zoom * 100)}%</span>
      <button className={btn} style={{ color: "var(--st-text-2)" }} onClick={() => onZoom(Math.min(3, zoom * 1.15))} title="Zoom in"><Plus size={15} /></button>
      <button className={btn} style={{ color: "var(--st-text-2)" }} onClick={onFit} title="Fit to screen"><Maximize size={14} /></button>
    </div>
  );
}
