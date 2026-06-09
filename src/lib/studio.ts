// Naxsha Studio — multi-floor plan model, furniture catalog, cost model,
// onboarding script and tool definitions. Coordinates are in feet,
// origin top-left, +x = east, +y = south (same convention as floorplan.ts).

export type RoomKind =
  | "living"
  | "kitchen"
  | "dining"
  | "pooja"
  | "powder"
  | "master"
  | "bath"
  | "closet"
  | "bedroom"
  | "balcony"
  | "stair"
  | "utility"
  | "store"
  | "garage";

export type Wall = "N" | "S" | "E" | "W";

export type Room = {
  id: string;
  name: string;
  kind: RoomKind;
  x: number;
  y: number;
  w: number;
  h: number;
  door?: { wall: Wall; offset: number; width?: number };
  windows?: { wall: Wall; offset: number; width: number }[];
};

export type Floor = {
  id: string;
  name: string;
  level: number; // 0 = ground
  rooms: Room[];
};

export type Plot = { w: number; h: number; facing: Wall };

// ---------------------------------------------------------------------------
// Furniture catalog — sizes in feet, ₹ cost, drawn as architectural glyphs.
// ---------------------------------------------------------------------------

export type FurnitureKind =
  | "bed-queen"
  | "bed-single"
  | "sofa"
  | "dining"
  | "wardrobe"
  | "table"
  | "toilet"
  | "car"
  | "plant"
  | "tv";

export type FurnitureSpec = {
  kind: FurnitureKind;
  label: string;
  w: number;
  h: number;
  cost: number;
  group: "Bedroom" | "Living" | "Dining" | "Utility" | "Outdoor";
};

export const FURNITURE: FurnitureSpec[] = [
  { kind: "bed-queen", label: "Queen bed", w: 6, h: 6.5, cost: 42000, group: "Bedroom" },
  { kind: "bed-single", label: "Single bed", w: 3.5, h: 6.5, cost: 24000, group: "Bedroom" },
  { kind: "wardrobe", label: "Wardrobe", w: 6, h: 2, cost: 58000, group: "Bedroom" },
  { kind: "sofa", label: "3-seat sofa", w: 7, h: 3, cost: 64000, group: "Living" },
  { kind: "tv", label: "TV unit", w: 6, h: 1.4, cost: 38000, group: "Living" },
  { kind: "table", label: "Centre table", w: 3.5, h: 2, cost: 14000, group: "Living" },
  { kind: "dining", label: "Dining 6-seat", w: 6, h: 3.5, cost: 72000, group: "Dining" },
  { kind: "toilet", label: "WC", w: 1.6, h: 2.4, cost: 12000, group: "Utility" },
  { kind: "plant", label: "Planter", w: 1.6, h: 1.6, cost: 4500, group: "Outdoor" },
  { kind: "car", label: "Car", w: 6, h: 12, cost: 0, group: "Outdoor" },
];

export const furnitureSpec = (k: FurnitureKind) =>
  FURNITURE.find((f) => f.kind === k)!;

export type PlacedItem = {
  id: string;
  kind: FurnitureKind;
  floorId: string;
  x: number; // centre, in feet
  y: number;
  rot: number; // degrees, 0 / 90 / 180 / 270
};

// ---------------------------------------------------------------------------
// Default project — a 30×40 G+1 home.
// ---------------------------------------------------------------------------

export const DEFAULT_PLOT: Plot = { w: 30, h: 40, facing: "S" };

// Recent projects — shared by the home screen grid and the nav project switcher.
export type RecentProject = {
  id: string;
  name: string;
  files: number;
  updated: string;
  glyph: "plan" | "render" | "blank";
};

export const RECENT_PROJECTS: RecentProject[] = [
  { id: "p1", name: "Rao Residence", files: 3, updated: "just now", glyph: "plan" },
  { id: "p2", name: "Sharma Villa", files: 4, updated: "2 months ago", glyph: "render" },
  { id: "p3", name: "Untitled home", files: 0, updated: "2 months ago", glyph: "blank" },
  { id: "p4", name: "Iyer Bungalow", files: 6, updated: "5 months ago", glyph: "plan" },
  { id: "p5", name: "Mehta Apartment", files: 2, updated: "6 months ago", glyph: "render" },
  { id: "p6", name: "Reddy Farmhouse", files: 5, updated: "8 months ago", glyph: "plan" },
];

export const FLOORS: Floor[] = [
  {
    id: "ground",
    name: "Ground Floor",
    level: 0,
    rooms: [
      {
        id: "g-living",
        name: "Living + Dining",
        kind: "living",
        x: 0, y: 0, w: 18, h: 18,
        door: { wall: "S", offset: 8, width: 3 },
        windows: [
          { wall: "N", offset: 3, width: 5 },
          { wall: "W", offset: 5, width: 5 },
        ],
      },
      {
        id: "g-kitchen",
        name: "Kitchen",
        kind: "kitchen",
        x: 18, y: 0, w: 12, h: 12,
        door: { wall: "S", offset: 5, width: 3 },
        windows: [{ wall: "N", offset: 3, width: 5 }],
      },
      { id: "g-pooja", name: "Pooja", kind: "pooja", x: 18, y: 12, w: 6, h: 6, door: { wall: "W", offset: 2, width: 2.5 } },
      { id: "g-powder", name: "Powder", kind: "powder", x: 24, y: 12, w: 6, h: 6, door: { wall: "W", offset: 2, width: 2.5 } },
      {
        id: "g-guest",
        name: "Guest Bedroom",
        kind: "bedroom",
        x: 0, y: 18, w: 18, h: 12,
        door: { wall: "N", offset: 8, width: 3 },
        windows: [{ wall: "W", offset: 4, width: 5 }],
      },
      { id: "g-stair", name: "Staircase", kind: "stair", x: 0, y: 30, w: 10, h: 10, door: { wall: "N", offset: 5, width: 2.5 } },
      { id: "g-store", name: "Store", kind: "store", x: 10, y: 30, w: 8, h: 10, door: { wall: "N", offset: 3, width: 2.5 } },
      {
        id: "g-utility",
        name: "Utility",
        kind: "utility",
        x: 18, y: 18, w: 12, h: 14,
        door: { wall: "W", offset: 6, width: 3 },
        windows: [{ wall: "E", offset: 4, width: 5 }],
      },
      { id: "g-bath", name: "Bath", kind: "bath", x: 18, y: 32, w: 6, h: 8, door: { wall: "N", offset: 2, width: 2.5 } },
      { id: "g-balcony", name: "Balcony", kind: "balcony", x: 24, y: 32, w: 6, h: 8, windows: [{ wall: "S", offset: 1, width: 4 }] },
    ],
  },
  {
    id: "first",
    name: "First Floor",
    level: 1,
    rooms: [
      {
        id: "f-master",
        name: "Master Bedroom",
        kind: "master",
        x: 0, y: 0, w: 18, h: 16,
        door: { wall: "S", offset: 8, width: 3 },
        windows: [
          { wall: "N", offset: 3, width: 6 },
          { wall: "W", offset: 5, width: 5 },
        ],
      },
      {
        id: "f-bed2",
        name: "Bedroom 2",
        kind: "bedroom",
        x: 18, y: 0, w: 12, h: 14,
        door: { wall: "S", offset: 5, width: 3 },
        windows: [{ wall: "E", offset: 4, width: 5 }],
      },
      { id: "f-mbath", name: "Master Bath", kind: "bath", x: 0, y: 16, w: 8, h: 8, door: { wall: "N", offset: 3, width: 2.5 } },
      { id: "f-closet", name: "Walk-in", kind: "closet", x: 8, y: 16, w: 6, h: 8, door: { wall: "N", offset: 2, width: 2.5 } },
      { id: "f-bath2", name: "Bath 2", kind: "bath", x: 18, y: 14, w: 6, h: 8, door: { wall: "W", offset: 2, width: 2.5 } },
      { id: "f-stair", name: "Staircase", kind: "stair", x: 14, y: 16, w: 4, h: 8, door: { wall: "S", offset: 0.75, width: 2.5 } },
      {
        id: "f-bed3",
        name: "Bedroom 3",
        kind: "bedroom",
        x: 0, y: 24, w: 18, h: 12,
        door: { wall: "N", offset: 8, width: 3 },
        windows: [{ wall: "W", offset: 4, width: 5 }],
      },
      {
        id: "f-family",
        name: "Family Lounge",
        kind: "living",
        x: 18, y: 22, w: 12, h: 10,
        door: { wall: "W", offset: 4, width: 3 },
        windows: [{ wall: "E", offset: 3, width: 5 }],
      },
      { id: "f-terrace", name: "Terrace", kind: "balcony", x: 18, y: 32, w: 12, h: 8, windows: [{ wall: "S", offset: 2, width: 8 }] },
      { id: "f-utility2", name: "Utility", kind: "utility", x: 0, y: 36, w: 18, h: 4, windows: [{ wall: "S", offset: 6, width: 6 }] },
    ],
  },
];

// ---------------------------------------------------------------------------
// Geometry helpers
// ---------------------------------------------------------------------------

export const roomArea = (r: Room) => r.w * r.h;
export const floorArea = (f: Floor) => f.rooms.reduce((s, r) => s + roomArea(r), 0);
export const builtUp = (floors: Floor[]) => floors.reduce((s, f) => s + floorArea(f), 0);

export const ftIn = (val: number) => {
  const ft = Math.floor(val);
  const inches = Math.round((val - ft) * 12);
  if (inches === 0) return `${ft}'-0"`;
  return `${ft}'-${inches}"`;
};

export const formatINR = (n: number) => {
  const s = Math.round(n).toString();
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const grouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `₹${rest ? grouped + "," : ""}${last3}`;
};

// Compact ₹ in lakhs / crores for headline figures
export const formatINRShort = (n: number) => {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
  return formatINR(n);
};

// ---------------------------------------------------------------------------
// Cost model — derived from built-up area + placed furniture.
// ---------------------------------------------------------------------------

export const RATE_PER_SQFT = 1850; // ₹ turnkey civil + finishing

export type CostLine = { label: string; pct: number; amount: number };

export type CostBreakdown = {
  area: number;
  construction: number;
  furniture: number;
  total: number;
  perSqft: number;
  lines: CostLine[];
};

const SPLIT: { label: string; pct: number }[] = [
  { label: "Structure & RCC", pct: 0.34 },
  { label: "Masonry & plaster", pct: 0.16 },
  { label: "Flooring & finishes", pct: 0.18 },
  { label: "Doors & windows", pct: 0.09 },
  { label: "Plumbing & sanitary", pct: 0.11 },
  { label: "Electrical", pct: 0.08 },
  { label: "Painting", pct: 0.04 },
];

export function computeCost(floors: Floor[], items: PlacedItem[]): CostBreakdown {
  const area = builtUp(floors);
  const construction = area * RATE_PER_SQFT;
  const furniture = items.reduce((s, it) => s + furnitureSpec(it.kind).cost, 0);
  const total = construction + furniture;
  const lines = SPLIT.map((l) => ({
    label: l.label,
    pct: l.pct,
    amount: Math.round(construction * l.pct),
  }));
  return {
    area,
    construction,
    furniture,
    total,
    perSqft: total / area,
    lines,
  };
}

// Rough per-room build cost for the properties panel
export const roomCost = (r: Room) => Math.round(roomArea(r) * RATE_PER_SQFT);

export const KIND_LABEL: Record<RoomKind, string> = {
  living: "Living space",
  kitchen: "Kitchen",
  dining: "Dining",
  pooja: "Pooja room",
  powder: "Powder room",
  master: "Master suite",
  bath: "Bathroom",
  closet: "Storage",
  bedroom: "Bedroom",
  balcony: "Open / balcony",
  stair: "Circulation",
  utility: "Utility",
  store: "Store",
  garage: "Garage",
};

// Vastu compliance verdict per room kind + plot facing (lightweight, illustrative)
export function vastuVerdict(r: Room, plot: Plot): { ok: boolean; note: string } {
  const cx = r.x + r.w / 2;
  const cy = r.y + r.h / 2;
  const north = cy < plot.h / 2;
  const east = cx < plot.w / 2;
  switch (r.kind) {
    case "kitchen":
      return east && north
        ? { ok: true, note: "South-east is ideal for the kitchen." }
        : { ok: true, note: "Acceptable — gas point faces south-east." };
    case "pooja":
      return north && east
        ? { ok: true, note: "North-east placement is auspicious." }
        : { ok: false, note: "North-east is preferred for the pooja room." };
    case "master":
      return !north && !east
        ? { ok: true, note: "South-west anchors the master suite." }
        : { ok: true, note: "Compliant — head faces south while sleeping." };
    case "bath":
      return { ok: true, note: "Drainage routed to the north-west." };
    default:
      return { ok: true, note: "No Vastu conflict detected." };
  }
}

// ---------------------------------------------------------------------------
// Tools
// ---------------------------------------------------------------------------

export type ToolId =
  | "select"
  | "pan"
  | "furniture"
  | "wall"
  | "window"
  | "door"
  | "measure"
  | "text";

export type ToolDef = {
  id: ToolId;
  label: string;
  hint: string;
  shortcut: string;
  functional: boolean;
};

export const TOOLS: ToolDef[] = [
  { id: "select", label: "Select", hint: "Click an element to edit its properties", shortcut: "V", functional: true },
  { id: "pan", label: "Pan", hint: "Drag to move the drawing", shortcut: "H", functional: true },
  { id: "furniture", label: "Furniture", hint: "Pick a piece, then click to place it", shortcut: "F", functional: true },
  { id: "measure", label: "Measure", hint: "Click two points to measure a distance", shortcut: "M", functional: true },
  { id: "wall", label: "Wall", hint: "Drag along the grid to draw a wall", shortcut: "W", functional: false },
  { id: "window", label: "Window", hint: "Click a wall to insert a window", shortcut: "N", functional: false },
  { id: "door", label: "Door", hint: "Click a wall to hang a door", shortcut: "D", functional: false },
  { id: "text", label: "Note", hint: "Click to drop an annotation", shortcut: "T", functional: false },
];

// ---------------------------------------------------------------------------
// Onboarding script
// ---------------------------------------------------------------------------

export type OnbVariant = "chips" | "layouts";

export type OnbStep = {
  id: string;
  prompt: string;
  options: string[];
  allowCustom?: boolean;
  variant?: OnbVariant;
};

export const ONBOARDING: OnbStep[] = [
  {
    id: "plot",
    prompt: "Let's draft your home. What's your plot size?",
    options: ["20 × 30 ft", "30 × 40 ft", "30 × 50 ft", "40 × 60 ft"],
    allowCustom: true,
  },
  {
    id: "layout",
    prompt: "How should I organise the plan? Pick a layout to start from.",
    options: ["Open Plan", "Courtyard", "Compact", "Vastu Grid"],
    variant: "layouts",
  },
  {
    id: "facing",
    prompt: "Which direction does the plot face? This drives the Vastu layout.",
    options: ["North", "East", "West", "South"],
  },
  {
    id: "floors",
    prompt: "How many floors should I plan for?",
    options: ["Ground only", "G + 1", "G + 2"],
  },
  {
    id: "bhk",
    prompt: "How many bedrooms do you need?",
    options: ["2 BHK", "3 BHK", "4 BHK", "5 BHK"],
  },
  {
    id: "style",
    prompt: "Pick the style direction you're after.",
    options: ["Modern", "Traditional", "Minimal", "Vastu-first"],
  },
  {
    id: "budget",
    prompt: "And a rough budget? I'll keep the design inside it.",
    options: ["₹15–25 L", "₹25–40 L", "₹40–60 L", "₹60 L +"],
    allowCustom: true,
  },
];
