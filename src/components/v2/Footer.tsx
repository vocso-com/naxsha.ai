import { Container, NaxshaWordmark } from "./Container";

const COLS: { heading: string; links: string[] }[] = [
  {
    heading: "PRODUCT",
    links: ["The studio", "Vastu engine", "BoQ engine", "Exports", "Changelog"],
  },
  {
    heading: "FOR",
    links: ["Homeowners", "Independent builders", "Architects", "Site contractors"],
  },
  {
    heading: "RESOURCES",
    links: [
      "Plot-size guide",
      "Indian cost benchmarks",
      "Vastu glossary",
      "Bye-laws by city",
      "API docs",
    ],
  },
  {
    heading: "COMPANY",
    links: ["About", "Careers", "Press kit", "Contact"],
  },
];

export function Footer() {
  return (
    <footer
      className="pt-10 pb-8"
      style={{
        background: "var(--color-card)",
        borderTop: "0.5px solid var(--color-mist)",
      }}
    >
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-10">
          <div className="col-span-2">
            <NaxshaWordmark />
            <p
              className="mt-5 text-[13.5px] leading-[1.65] max-w-[300px]"
              style={{ color: "var(--color-graphite)" }}
            >
              The drafting studio for Indian homes. Made in Bengaluru and Pune,
              with city-rate cards from Mumbai to Kochi.
            </p>
            <div
              className="mt-6 flex items-center gap-1.5"
              style={{ color: "var(--color-graphite-soft)" }}
            >
              <span className="label">SYSTEM</span>
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--color-verandah)" }}
              />
              <span className="mono text-[11px]" style={{ color: "var(--color-verandah)" }}>
                all good
              </span>
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.heading}>
              <div className="label">{col.heading}</div>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[13px] hover:text-naxsha transition-colors"
                      style={{ color: "var(--color-graphite)" }}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-14 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[12px]"
          style={{
            borderTop: "0.5px solid var(--color-mist)",
            color: "var(--color-graphite-soft)",
          }}
        >
          <div>
            © 2026 Naxsha Drafting Pvt. Ltd. · Drafted in feet & inches.
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Security</a>
            <a href="#" className="hover:underline">DPDP compliance</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
