"use client";

import { ArrowRight } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Container, NaxshaMark } from "./Container";

const LINKS = [
  { href: "#homes", label: "Homes" },
  { href: "#how", label: "How it works" },
  { href: "#features", label: "Studio" },
  { href: "#pricing", label: "Plans" },
];

export function TopNav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 8;
    if (next !== scrolled) setScrolled(next);
  });

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "#FFFFFF",
        borderBottom: scrolled
          ? "0.5px solid var(--color-mist)"
          : "0.5px solid transparent",
        transition: "border-color 200ms ease",
      }}
    >
      <Container>
        <div className="h-16 flex items-center">
          {/* Brand */}
          <a href="#top" className="flex items-center gap-2.5">
            <NaxshaMark size={28} />
            <span
              className="mono font-bold hidden sm:inline"
              style={{
                color: "#000000",
                fontSize: 13,
                letterSpacing: "0.18em",
              }}
            >
              NAXSHA
            </span>
          </a>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1 ml-10">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 h-9 inline-flex items-center text-[14px] font-semibold rounded-[6px] transition-colors hover:bg-naxsha-wash"
                style={{ color: "#000000" }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-2">
            <a
              href="#login"
              className="hidden sm:inline-flex h-9 px-3 items-center text-[13.5px] font-semibold rounded-[6px]"
              style={{ color: "#000000" }}
            >
              Sign in
            </a>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              href="#cta"
              className="h-9 px-4 inline-flex items-center gap-1.5 text-[13px] font-semibold rounded-[8px] text-white"
              style={{ background: "var(--color-terracotta)" }}
            >
              Try the studio
              <ArrowRight size={13} strokeWidth={2.5} />
            </motion.a>
          </div>
        </div>
      </Container>
    </header>
  );
}
