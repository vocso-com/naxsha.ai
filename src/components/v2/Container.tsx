import { type ReactNode } from "react";

/**
 * Container — uses globals.css .wrap + .gutter primitives.
 * • .wrap caps at 1440px (1680px on ≥1920) and centers
 * • .gutter applies clamp(24px, 4vw, 96px) horizontal padding
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`wrap gutter ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={className}
      style={{
        paddingTop: "clamp(64px, 7vw, 128px)",
        paddingBottom: "clamp(64px, 7vw, 128px)",
      }}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionEyebrow({
  num,
  label,
}: {
  num: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <span
        className="mono text-[10px] font-semibold px-1.5 py-0.5 rounded-[3px]"
        style={{
          color: "var(--color-naxsha)",
          background: "var(--color-naxsha-tint)",
          letterSpacing: "0.12em",
        }}
      >
        {num}
      </span>
      <span className="label" style={{ color: "var(--color-naxsha-lift)" }}>
        {label}
      </span>
    </div>
  );
}

export function NaxshaMark({ size = 28 }: { size?: number }) {
  return (
    <div
      className="rounded-[3px] flex items-center justify-center"
      style={{
        background: "var(--color-naxsha)",
        width: size,
        height: size,
      }}
    >
      <svg
        width={size * 0.5}
        height={size * 0.5}
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden
      >
        <path
          d="M2 12V2L12 12V2"
          stroke="#FAFAF7"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>
    </div>
  );
}

export function NaxshaWordmark({ size = 28 }: { size?: number }) {
  return (
    <a href="#top" className="flex items-center gap-2.5">
      <NaxshaMark size={size} />
      <span
        className="mono font-semibold"
        style={{
          color: "var(--color-naxsha)",
          fontSize: 13,
          letterSpacing: "0.18em",
        }}
      >
        NAXSHA
      </span>
    </a>
  );
}
