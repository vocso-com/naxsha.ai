"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Container } from "./Container";

type Home = {
  id: string;
  img: string;
  city: string;
  cost: string;
  sf: string;
  year: string;
  span?: { col: number; row?: number };
};

const HOMES: Home[] = [
  {
    id: "h1",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=82",
    city: "Bandra, Mumbai",
    cost: "₹38 L",
    sf: "1,200 sf",
    year: "2025",
    span: { col: 2, row: 2 },
  },
  {
    id: "h2",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=82",
    city: "Indiranagar, Bengaluru",
    cost: "₹24.8 L",
    sf: "1,000 sf",
    year: "2024",
    span: { col: 2 },
  },
  {
    id: "h3",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=82",
    city: "Bopal, Ahmedabad",
    cost: "₹52 L",
    sf: "1,800 sf",
    year: "2025",
    span: { col: 2 },
  },
  {
    id: "h4",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=82",
    city: "Aundh, Pune",
    cost: "₹21 L",
    sf: "900 sf",
    year: "2024",
    span: { col: 2 },
  },
  {
    id: "h5",
    img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=82",
    city: "Jubilee Hills, Hyderabad",
    cost: "₹74 L",
    sf: "2,400 sf",
    year: "2025",
    span: { col: 2 },
  },
];

function HomeCard({ home, index }: { home: Home; index: number }) {
  const colSpan = home.span?.col ?? 2;
  const rowSpan = home.span?.row ?? 1;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: 0.05 + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="relative overflow-hidden rounded-[20px] group"
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
        minHeight: rowSpan === 2 ? 540 : 260,
        border: "0.5px solid var(--color-mist)",
      }}
    >
      <Image
        src={home.img}
        alt={`Home built in ${home.city}`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        unoptimized
      />
      {/* Soft bottom shade — only for caption legibility, no blue cast */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.78) 100%)",
        }}
      />

      <figcaption className="absolute inset-x-0 bottom-0 p-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <div
              className="text-[14px] font-semibold"
              style={{ color: "#FFFFFF" }}
            >
              {home.city}
            </div>
            <div
              className="mt-1 flex items-center gap-2 text-[12px]"
              style={{ color: "rgba(255,255,255,0.78)" }}
            >
              <span className="mono">{home.sf}</span>
              <span
                className="h-1 w-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.5)" }}
              />
              <span className="mono">{home.year}</span>
            </div>
          </div>
          <span
            className="glass-pill px-2.5 py-1 rounded-full mono text-[12px] font-semibold"
            style={{
              background: "rgba(255,255,255,0.16)",
              border: "0.5px solid rgba(255,255,255,0.22)",
              color: "#FFFFFF",
            }}
          >
            BUILT FOR {home.cost}
          </span>
        </div>
      </figcaption>
    </motion.figure>
  );
}

export function BuiltHomes() {
  return (
    <section
      id="homes"
      className="section-plot relative"
      style={{
        paddingTop: "clamp(96px, 11vw, 180px)",
        paddingBottom: "clamp(96px, 11vw, 180px)",
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14"
        >
          <div>
            <span
              className="label inline-flex items-center gap-2"
              style={{ color: "var(--color-terracotta)" }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--color-terracotta)" }}
              />
              REAL HOMES, REAL PLANS
            </span>
            <h2
              className="mt-4 font-semibold leading-[1.02]"
              style={{
                fontSize: "clamp(40px, 5.4vw, 84px)",
                letterSpacing: "-0.03em",
                color: "var(--color-ink)",
                maxWidth: "20ch",
              }}
            >
              These homes started{" "}
              <span style={{ color: "var(--color-naxsha)" }}>
                on Naxsha.
              </span>
            </h2>
          </div>
          <p
            className="t-lead"
            style={{
              maxWidth: "44ch",
              fontSize: "clamp(15px, 1.15vw, 18px)",
            }}
          >
            From a 30 × 40 row house in Bandra to a 50 × 80 farmhouse in
            Hyderabad — every plot is a Naxsha plan first, a poured-concrete
            home next.
          </p>
        </motion.div>

        {/* Photo grid */}
        <div
          className="grid gap-5"
          style={{
            gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
          }}
        >
          {HOMES.map((h, i) => (
            <HomeCard key={h.id} home={h} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
