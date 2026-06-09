"use client";

import { Container } from "./Container";

const PLOTS = [
  { dim: "20 × 30", area: "600 sf" },
  { dim: "25 × 40", area: "1,000 sf" },
  { dim: "30 × 40", area: "1,200 sf" },
  { dim: "30 × 50", area: "1,500 sf" },
  { dim: "40 × 60", area: "2,400 sf" },
  { dim: "50 × 80", area: "4,000 sf" },
  { dim: "60 × 90", area: "5,400 sf" },
];

const CITIES = [
  "Mumbai",
  "Bengaluru",
  "Pune",
  "Hyderabad",
  "Chennai",
  "Ahmedabad",
  "Kochi",
  "Jaipur",
  "Lucknow",
  "Indore",
  "Surat",
  "Coimbatore",
  "Visakhapatnam",
  "Chandigarh",
];

export function TrustBar() {
  return (
    <div
      className="py-8"
      style={{
        borderTop: "0.5px solid var(--color-mist)",
        borderBottom: "0.5px solid var(--color-mist)",
        background: "var(--color-card)",
      }}
    >
      <Container>
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div
            className="label shrink-0"
            style={{ color: "var(--color-graphite-soft)" }}
          >
            SUPPORTED PLOT SIZES
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 flex-1">
            {PLOTS.map((p, i) => (
              <span key={p.dim} className="flex items-center gap-2">
                <span className="mono text-[13px] text-ink font-medium">
                  {p.dim}
                </span>
                <span
                  className="label"
                  style={{ color: "var(--color-graphite-soft)" }}
                >
                  {p.area}
                </span>
                {i < PLOTS.length - 1 && (
                  <span
                    className="mx-2 h-[18px] w-px"
                    style={{ background: "var(--color-mist)" }}
                  />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* City marquee — pauses on hover */}
        <div
          className="mt-6 pt-6 flex items-center gap-6"
          style={{ borderTop: "0.5px solid var(--color-mist)" }}
        >
          <div
            className="label shrink-0"
            style={{ color: "var(--color-graphite-soft)" }}
          >
            HOMES PLANNED IN
          </div>
          <div
            className="marquee relative flex-1 overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
            }}
          >
            <div className="marquee-track flex items-center gap-x-7 whitespace-nowrap will-change-transform">
              {[...CITIES, ...CITIES].map((c, i) => (
                <span
                  key={`${c}-${i}`}
                  className="text-[13px] inline-flex items-center gap-7"
                  style={{
                    color:
                      i % 3 === 0
                        ? "var(--color-ink)"
                        : "var(--color-graphite)",
                  }}
                >
                  {c}
                  <span
                    aria-hidden
                    className="h-1 w-1 rounded-full"
                    style={{ background: "var(--color-mist)" }}
                  />
                </span>
              ))}
            </div>
          </div>
          <span
            className="ml-auto mono text-[12px] shrink-0"
            style={{ color: "var(--color-naxsha-lift)" }}
          >
            +53 more
          </span>
        </div>
      </Container>
    </div>
  );
}
