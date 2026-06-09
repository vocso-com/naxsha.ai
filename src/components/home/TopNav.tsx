"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Studio", href: "#hero" },
  { label: "How it works", href: "#how" },
  { label: "Studio tour", href: "#tour" },
  { label: "Features", href: "#features" },
  { label: "Cost", href: "#cost" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function TopNav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 60));

  const height = useTransform(scrollY, [0, 80], [72, 60]);
  const padX = useTransform(scrollY, [0, 120], [0, 16]);
  const radius = useTransform(scrollY, [0, 120], [0, 999]);
  const maxW = useTransform(scrollY, [0, 120], [1440, 1100]);
  const marginTop = useTransform(scrollY, [0, 120], [0, 14]);

  return (
    <div className="sticky top-0 z-40 w-full" style={{ paddingTop: 0 }}>
      <motion.header
        className="mx-auto"
        style={{
          height,
          marginTop,
          maxWidth: maxW,
          width: "calc(100% - 24px)",
          borderRadius: radius,
        }}
      >
        <motion.div
          className="glass h-full flex items-center justify-between"
          style={{
            paddingLeft: padX,
            paddingRight: padX,
            borderRadius: radius,
            // override the default glass paddings — they come from utility
          }}
        >
          <div
            className="h-full flex items-center justify-between"
            style={{
              width: "100%",
              paddingLeft: scrolled ? 18 : "clamp(24px, 4vw, 96px)",
              paddingRight: scrolled ? 8 : "clamp(24px, 4vw, 96px)",
              transition: "padding 220ms ease",
            }}
          >
            <a href="#top" className="flex items-center gap-2 group" aria-label="Naxsha home">
              <span
                className="inline-block"
                style={{
                  width: 22,
                  height: 22,
                  border: "1.5px solid var(--color-naxsha)",
                  borderRadius: 4,
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    inset: 3,
                    border: "1px solid var(--color-naxsha)",
                    borderRadius: 2,
                    opacity: 0.4,
                  }}
                />
              </span>
              <span
                style={{
                  fontFamily: "var(--font-naxsha-mono)",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  color: "var(--color-naxsha-deep)",
                }}
              >
                NAXSHA
              </span>
            </a>

            <nav className="hidden lg:flex items-center gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="relative px-3 py-2 text-[13px] transition-colors"
                  style={{ color: "var(--color-graphite)" }}
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="#login"
                className="hidden sm:inline-flex text-[13px] px-3 py-2"
                style={{ color: "var(--color-graphite)" }}
              >
                Sign in
              </a>
              <a href="#cta" className="btn-primary" style={{ height: 40 }}>
                Open the studio
                <ArrowUpRight size={14} strokeWidth={2} />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.header>
    </div>
  );
}
