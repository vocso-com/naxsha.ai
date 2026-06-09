"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Play, ArrowUpRight, Quote } from "lucide-react";
import { Container } from "./Container";

type Person = {
  id: string;
  name: string;
  role: string;
  city: string;
  portrait: string;
  quote: string;
  metric: { label: string; value: string };
  isVideo?: boolean;
};

// Clean Indian homeowner/architect headshots — Pexels India tags
const PEOPLE: Person[] = [
  {
    id: "rohit",
    name: "Rohit Sharma",
    role: "Homeowner",
    city: "Pune",
    portrait:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=900",
    quote:
      "Three plans in 58 seconds. Picked one, tweaked the kitchen, showed our contractor the same evening.",
    metric: { label: "BUILT FOR", value: "₹24.8 L" },
    isVideo: true,
  },
  {
    id: "meera",
    name: "Ar. Meera Iyer",
    role: "Architect",
    city: "Bengaluru",
    portrait:
      "https://images.pexels.com/photos/4307884/pexels-photo-4307884.jpeg?auto=compress&cs=tinysrgb&w=900",
    quote:
      "Wall thicknesses are right. Stair widths meet code. Door swings don't crash. A real plan, not a render.",
    metric: { label: "PLANS / MONTH", value: "32" },
  },
  {
    id: "bharat",
    name: "Bharat Patel",
    role: "Site contractor",
    city: "Ahmedabad",
    portrait:
      "https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg?auto=compress&cs=tinysrgb&w=900",
    quote:
      "Cement in bags. Steel in tonnes. Brick in pieces — the way I order. Estimates within 6% of actual spend.",
    metric: { label: "BoQ ERROR", value: "±5%" },
    isVideo: true,
  },
  {
    id: "kavya",
    name: "Kavya Reddy",
    role: "Homeowner",
    city: "Hyderabad",
    portrait:
      "https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=900",
    quote:
      "First time my parents and I agreed on something architectural. Naxsha respected Vastu and our budget.",
    metric: { label: "BUILT FOR", value: "₹74 L" },
  },
  {
    id: "arjun",
    name: "Arjun Mehta",
    role: "Architect",
    city: "Bengaluru",
    portrait:
      "https://images.pexels.com/photos/7148380/pexels-photo-7148380.jpeg?auto=compress&cs=tinysrgb&w=900",
    quote:
      "Three working plans before my second cup of chai. The studio I wish I had during architecture school.",
    metric: { label: "AVG DRAFT", value: "58s" },
    isVideo: true,
  },
  {
    id: "priya",
    name: "Priya Nair",
    role: "Homeowner",
    city: "Kochi",
    portrait:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=900",
    quote:
      "We saved three months of back-and-forth with an architect. Naxsha drafted what we asked for, the first time.",
    metric: { label: "TIME SAVED", value: "3 mo" },
  },
];

function ReelCard({ p }: { p: Person }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="relative shrink-0 rounded-[22px] overflow-hidden cursor-pointer group"
      style={{
        width: 340,
        aspectRatio: "9 / 14",
        border: "0.5px solid var(--color-mist)",
        background: "var(--color-card)",
      }}
    >
      {/* Portrait — natural color, no blue duotone */}
      <Image
        src={p.portrait}
        alt={p.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        unoptimized
      />

      {/* Soft bottom shade only — for legibility */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Top-right metric chip */}
      <div className="absolute top-3 right-3">
        <span
          className="px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 mono text-[11px] backdrop-blur-md"
          style={{
            background: "rgba(255,255,255,0.78)",
            border: "0.5px solid rgba(255,255,255,0.65)",
            color: "var(--color-ink)",
          }}
        >
          <span
            className="label"
            style={{ color: "var(--color-graphite-soft)" }}
          >
            {p.metric.label}
          </span>
          <span className="font-semibold">{p.metric.value}</span>
        </span>
      </div>

      {/* Video play button */}
      {p.isVideo && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.span
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-14 w-14 rounded-full flex items-center justify-center backdrop-blur-md"
            style={{
              background: "rgba(255,255,255,0.28)",
              border: "1px solid rgba(255,255,255,0.55)",
            }}
          >
            <Play
              size={20}
              strokeWidth={1.5}
              fill="#FFFFFF"
              color="#FFFFFF"
              style={{ marginLeft: 2 }}
            />
          </motion.span>
        </div>
      )}

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <div className="flex items-start gap-2 mb-3">
          <Quote
            size={14}
            strokeWidth={2}
            color="var(--color-terracotta-soft)"
            className="shrink-0 mt-0.5"
          />
          <blockquote
            className="text-[13.5px] leading-[1.5] font-medium"
            style={{
              color: "rgba(255,255,255,0.96)",
              textShadow: "0 1px 2px rgba(0,0,0,0.4)",
            }}
          >
            {p.quote}
          </blockquote>
        </div>
        <div
          className="pt-3"
          style={{ borderTop: "0.5px solid rgba(255,255,255,0.22)" }}
        >
          <div
            className="text-[14px] font-semibold"
            style={{
              color: "#FFFFFF",
              textShadow: "0 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            {p.name}
          </div>
          <div
            className="mt-0.5 text-[11.5px]"
            style={{
              color: "rgba(255,255,255,0.85)",
              textShadow: "0 1px 2px rgba(0,0,0,0.4)",
            }}
          >
            {p.role} · {p.city}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function TestimonialReel() {
  const reel = [...PEOPLE, ...PEOPLE];

  return (
    <section
      className="section-tint relative overflow-hidden"
      style={{
        paddingTop: "clamp(96px, 11vw, 160px)",
        paddingBottom: "clamp(96px, 11vw, 160px)",
      }}
    >
      <div aria-hidden className="absolute inset-0 draft-grid-light opacity-50" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-end mb-12"
        >
          <div>
            <span
              className="glass inline-flex items-center gap-2 px-3 h-8 rounded-full label"
              style={{ color: "var(--color-naxsha-deep)" }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--color-terracotta)" }}
              />
              1,840 STORIES · ★ 4.9 AVERAGE
            </span>
            <h2
              className="mt-5 font-bold leading-[1.02] tracking-[-0.028em]"
              style={{
                fontSize: "clamp(40px, 5.4vw, 76px)",
                color: "var(--color-ink)",
                maxWidth: "18ch",
              }}
            >
              The people who picked{" "}
              <span style={{ color: "var(--color-naxsha)" }}>
                Naxsha first.
              </span>
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            <p
              className="text-[15px] lg:text-[17px] leading-[1.6]"
              style={{ color: "var(--color-graphite)", maxWidth: "44ch" }}
            >
              Homeowners. Architects. Site contractors. Real faces, real
              builds, real numbers. Tap any reel to hear their story.
            </p>
            <a
              href="#stories"
              className="inline-flex items-center gap-1.5 text-[13.5px] font-medium self-start"
              style={{ color: "var(--color-naxsha-lift)" }}
            >
              Browse all 1,840 stories
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </a>
          </div>
        </motion.div>
      </Container>

      <div
        className="marquee relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, #000 5%, #000 95%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, #000 5%, #000 95%, transparent 100%)",
        }}
      >
        <div
          className="marquee-track flex items-stretch gap-4 whitespace-nowrap will-change-transform"
          style={{ animationDuration: "55s" }}
        >
          {reel.map((p, i) => (
            <ReelCard key={`${p.id}-${i}`} p={p} />
          ))}
        </div>
      </div>

      <Container className="relative mt-8">
        <div
          className="flex items-center justify-center gap-2 text-[12.5px]"
          style={{ color: "var(--color-graphite-soft)" }}
        >
          <Play
            size={11}
            strokeWidth={2}
            fill="var(--color-terracotta)"
            color="var(--color-terracotta)"
          />
          <span style={{ color: "var(--color-graphite)" }}>
            Video reels available
          </span>
          <span
            className="h-1 w-1 rounded-full"
            style={{ background: "var(--color-mist)" }}
          />
          <span>Auto-scrolls · hover to pause</span>
        </div>
      </Container>
    </section>
  );
}
