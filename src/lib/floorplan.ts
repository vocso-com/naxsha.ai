// Naxsha demo floor plan — 30ft × 40ft south-facing plot, 1200 sq ft.
// All coordinates are in feet, origin top-left, +x = east, +y = south.

export type RoomKind =
  | "living"
  | "kitchen"
  | "pooja"
  | "powder"
  | "master"
  | "bath"
  | "closet"
  | "bedroom"
  | "balcony";

export type Room = {
  id: string;
  name: string;
  kind: RoomKind;
  x: number;
  y: number;
  w: number;
  h: number;
  // Door anchor: which wall, and offset (in feet) along that wall from the room's NW corner.
  door?: { wall: "N" | "S" | "E" | "W"; offset: number; width?: number };
  // Optional window on a wall (decorative for canvas)
  windows?: { wall: "N" | "S" | "E" | "W"; offset: number; width: number }[];
};

export const PLOT = { w: 30, h: 40 };

export const ROOMS: Room[] = [
  {
    id: "living",
    name: "Living + Dining",
    kind: "living",
    x: 0,
    y: 0,
    w: 18,
    h: 18,
    door: { wall: "S", offset: 8, width: 3 },
    windows: [
      { wall: "N", offset: 3, width: 5 },
      { wall: "W", offset: 5, width: 5 },
    ],
  },
  {
    id: "kitchen",
    name: "Kitchen",
    kind: "kitchen",
    x: 18,
    y: 0,
    w: 12,
    h: 12,
    door: { wall: "S", offset: 5, width: 3 },
    windows: [{ wall: "N", offset: 3, width: 5 }],
  },
  {
    id: "pooja",
    name: "Pooja",
    kind: "pooja",
    x: 18,
    y: 12,
    w: 6,
    h: 6,
    door: { wall: "W", offset: 2, width: 2.5 },
  },
  {
    id: "powder",
    name: "Powder",
    kind: "powder",
    x: 24,
    y: 12,
    w: 6,
    h: 6,
    door: { wall: "W", offset: 2, width: 2.5 },
  },
  {
    id: "master",
    name: "Master Bedroom",
    kind: "master",
    x: 0,
    y: 18,
    w: 18,
    h: 12,
    door: { wall: "N", offset: 8, width: 3 },
    windows: [{ wall: "W", offset: 4, width: 5 }],
  },
  {
    id: "mbath",
    name: "Master Bath",
    kind: "bath",
    x: 0,
    y: 30,
    w: 10,
    h: 10,
    door: { wall: "N", offset: 5, width: 2.5 },
  },
  {
    id: "closet",
    name: "Walk-in",
    kind: "closet",
    x: 10,
    y: 30,
    w: 8,
    h: 10,
    door: { wall: "N", offset: 3, width: 2.5 },
  },
  {
    id: "bed2",
    name: "Bedroom 2",
    kind: "bedroom",
    x: 18,
    y: 18,
    w: 12,
    h: 14,
    door: { wall: "W", offset: 6, width: 3 },
    windows: [{ wall: "E", offset: 4, width: 5 }],
  },
  {
    id: "bath2",
    name: "Bath 2",
    kind: "bath",
    x: 18,
    y: 32,
    w: 6,
    h: 8,
    door: { wall: "N", offset: 2, width: 2.5 },
  },
  {
    id: "balcony",
    name: "Balcony",
    kind: "balcony",
    x: 24,
    y: 32,
    w: 6,
    h: 8,
    windows: [{ wall: "S", offset: 1, width: 4 }],
  },
];

export const roomArea = (r: Room) => r.w * r.h;
export const totalBuiltUp = () => ROOMS.reduce((s, r) => s + roomArea(r), 0);

// Format feet as architect notation: 18'-6"
export const ftIn = (val: number) => {
  const ft = Math.floor(val);
  const inches = Math.round((val - ft) * 12);
  if (inches === 0) return `${ft}'-0"`;
  return `${ft}'-${inches}"`;
};

export const formatINR = (n: number) => {
  // Indian number format with lakhs/crores grouping
  const s = Math.round(n).toString();
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const grouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `₹${rest ? grouped + "," : ""}${last3}`;
};
