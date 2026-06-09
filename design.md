# Naxsha Design System

A practical reference for building new UIs in the same visual language as `/v2`.
Personality: **architectural, precise, warm, guided — a drafting studio, not a tech tool.**

---

## 1. Color System

### Primary — Naxsha Blue (≈80% of all UI)

| Token         | Hex      | Use                                                                   |
| ------------- | -------- | --------------------------------------------------------------------- |
| `naxsha`      | #003D7A  | Primary brand color. Headings, logo, plot walls, primary buttons.     |
| `naxsha-deep` | #002952  | Hover / pressed states. Dark sections, deepest cards.                 |
| `naxsha-lift` | #1F5A9E  | Links, focused inputs, supporting accents.                            |
| `naxsha-tint` | #D8E4F1  | Selected rooms, info pills, soft tinted card backgrounds.             |
| `naxsha-wash` | #F2F6FB  | Hover rows, subtle backgrounds, edge fills.                           |

### Accent — Terracotta (used sparingly)

| Token              | Hex      | Use                                                          |
| ------------------ | -------- | ------------------------------------------------------------ |
| `terracotta`       | #B8552B  | **Only** for primary CTAs, selected room, "POPULAR" pill, compass-N pointer, single graphic accent shapes. |
| `terracotta-soft`  | #F4A87A  | Delta indicators on dark hero cards. Highlighted phrase color on dark backgrounds. |

### Success — Verandah Green (success states only)

| Token      | Hex      | Use                                                       |
| ---------- | -------- | --------------------------------------------------------- |
| `verandah` | #4D7C0F  | Success: "Vastu compliant", "Autosaved", "free to draft" dots. |

### Surfaces

| Token   | Hex      | Use                                              |
| ------- | -------- | ------------------------------------------------ |
| `plot`  | #FAFAF7  | App + page background ("Plot Paper").            |
| `card`  | #FFFFFF  | Card surfaces.                                   |
| `grid`  | #E8E5DC  | 14px drafting grid lines on canvas.              |

### Text

| Token            | Hex      | Use                                       |
| ---------------- | -------- | ----------------------------------------- |
| `ink`            | #1A1A1A  | Headings. **Never use pure #000.**        |
| `graphite`       | #495057  | Body text.                                |
| `graphite-soft`  | #6C757D  | Secondary meta, captions, hints.          |

### Borders / dividers

| Token  | Hex      | Use                                                    |
| ------ | -------- | ------------------------------------------------------ |
| `mist` | #DEE2E6  | **All** borders at **0.5px** — never 1px, never 2px.   |

---

## 2. Typography

| Family          | Use                                                                                  |
| --------------- | ------------------------------------------------------------------------------------ |
| Inter           | All UI (body, headings, buttons, labels)                                              |
| JetBrains Mono  | Numbers, dimensions, costs, uppercase labels, code-like data. Tabular nums enabled.   |

### Scale (fluid clamp)

| Class / style       | Spec                                            | Use                          |
| ------------------- | ----------------------------------------------- | ---------------------------- |
| Hero display        | `clamp(48px, 7.6vw, 128px) / 600 / -0.035em`    | Page hero H1                 |
| Section display     | `clamp(36px, 4.8vw, 64px) / 600 / -0.028em`     | Major section H2             |
| `.h-section`        | `clamp(26px, 3vw, 40px) / 600 / -0.02em`        | Section H2                   |
| `.h-card`           | `clamp(18px, 1.4vw, 22px) / 600 / -0.012em`     | Card titles                  |
| `.t-lead`           | `clamp(16px, 1.2vw, 19px) / 1.55`               | Lead paragraph               |
| `.t-body`           | `clamp(14px, 1vw, 16px) / 1.65`                 | Body                         |
| `.label`            | `10px / 500 / 0.12em uppercase`                 | Eyebrows, micro-labels       |
| `.mono`             | JetBrains Mono, tabular-nums                    | Anything numeric             |

**Rule:** never mix proportional and mono digits in the same number. `₹21,60,000` stays mono end-to-end.

---

## 3. Spacing & Layout

- **Container:** `.wrap` caps at 1440px, expands to 1680px ≥1920px viewport.
- **Gutter:** `.gutter` = `clamp(24px, 4vw, 96px)` horizontal padding.
- **Section padding:** `clamp(80px, 10vw, 160px)` top + bottom typical. Heroes: `clamp(48px, 6vw, 96px)` top.
- **Card padding:** 18–28px.
- **Grid:** asymmetric multi-col is preferred (e.g. 6-col grids with `span 2/3/4/6`).

### Radii (strict cap)

| Element          | Radius     |
| ---------------- | ---------- |
| Cards            | 12–24px    |
| Buttons          | 8px / pill |
| Floor-plan rooms | 2px        |
| Pills / chips    | 999px      |

**Never exceed 24px on cards.** (12px on tight cards, 20–24px on showcase cards.)

---

## 4. Component Primitives

### Buttons

```html
<!-- Primary (Terracotta) -->
<a class="h-11 px-5 rounded-full text-white font-medium text-[14px] inline-flex items-center gap-2"
   style="background: var(--color-terracotta)">
  Try the studio →
</a>

<!-- Ghost glass -->
<a class="glass h-11 px-5 rounded-full font-medium text-[13.5px] inline-flex items-center gap-2"
   style="color: var(--color-naxsha-deep)">
  See how it works
</a>
```

**Hover:** `whileHover={{ scale: 1.02, y: -1 }}` via Framer Motion.
**Press:** `whileTap={{ scale: 0.98 }}`.

### Cards

Base card:

```html
<div class="rounded-[20px] p-7"
     style="background: var(--color-card); border: 0.5px solid var(--color-mist)">
  ...
</div>
```

Dark card (Naxsha Blue or Naxsha Deep) — for budget heroes, BoQ panels, CTA bands.
Color-tinted card variants (Naxsha-Tint, Terracotta-soft, Verandah-tint) — for rhythm in feature grids.

### Pills

```html
<span class="label inline-flex items-center gap-2 px-2.5 h-7 rounded-full"
      style="background: var(--color-naxsha-tint); color: var(--color-naxsha-deep)">
  <span class="h-1.5 w-1.5 rounded-full" style="background: var(--color-terracotta)"></span>
  TRUSTED BY 4,247 INDIAN HOMEOWNERS
</span>
```

### Mono number with INR formatting

Format Indian-locale (lakhs / crores grouping):

```ts
const fmtINR = (n: number) => {
  const s = Math.round(n).toString();
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const grouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `₹${rest ? grouped + "," : ""}${last3}`;
};
```

---

## 5. Glassmorphism

Three glass surfaces, all backdrop-blurred + hairline borders. No drop shadows.

| Class          | Spec                                                                  |
| -------------- | --------------------------------------------------------------------- |
| `.glass`       | `rgba(255,255,255,0.55)` + `backdrop-blur(20px) saturate(140%)` + `0.5px rgba(255,255,255,0.6)` border. |
| `.glass-tint`  | `rgba(216,228,241,0.55)` over Naxsha-tint backdrops.                  |
| `.glass-dark`  | `rgba(0,41,82,0.45)` + blur. White text. For dark sections.           |
| `.glass-pill`  | Smaller blur for pills (16px).                                        |

Use cases:
- Floating top nav
- Floating "AI-GENERATED · 58s" chip over the studio preview
- Quote cards over duotone photos
- Metric chips inside dark hero sections

---

## 6. Colored Section Blocks

Use the `.section-*` utilities for visual rhythm. Alternate light → dark → tint → light to break long Plot Paper rivers.

| Class             | Background           | Use                                                  |
| ----------------- | -------------------- | ---------------------------------------------------- |
| `.section-plot`   | Plot Paper #FAFAF7   | Default sections.                                    |
| `.section-card`   | White #FFFFFF        | Quiet sections (TrustBar).                          |
| `.section-tint`   | Naxsha-Tint #D8E4F1  | Softly highlighted moments (testimonials, quotes).   |
| `.section-dark`   | Naxsha #003D7A       | Bold reversals (sticky scroll story).               |
| `.section-deep`   | Naxsha-Deep #002952  | Deepest reversal (final CTA, dramatic moments).     |

Inside `.section-dark` / `.section-deep`, headings + body + labels auto-switch to white / muted-white via CSS — just use normal h2/p tags.

### Drafted grid overlays

For texture on solid sections:
- `.draft-grid-light` — Naxsha Blue at 5% on light bg
- `.draft-grid-dark` — White at 5% on dark bg

Apply as an `aria-hidden absolute inset-0` div with `opacity: 0.4–0.6`.

---

## 7. Motion & Animation (Framer Motion)

All motion via `motion/react` (the new Framer Motion package). Respect `prefers-reduced-motion`.

### Entry choreography

```tsx
// Section header pattern
<motion.h2
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.5 }}>
```

### Card stagger

```tsx
{cards.map((c, i) => (
  <motion.div key={c.id}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay: 0.05 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -4 }}>
))}
```

### Headline mask reveal

```tsx
<span className="mask-line">
  <motion.span
    initial={{ y: "108%" }}
    animate={{ y: 0 }}
    transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}>
    {text}
  </motion.span>
</span>
```

`.mask-line { overflow: hidden; display: block }` — used per line of large display headlines.

### Number counters

```tsx
useEffect(() => {
  if (!inView) return;
  const c = animate(0, target, {
    duration: 1.6,
    ease: [0.22, 1, 0.36, 1],
    onUpdate: (n) => setVal(Math.round(n)),
  });
  return () => c.stop();
}, [inView, target]);
```

### Scroll progress rail

Pinned 2px Terracotta rail at the top of the page. Driven by `useScroll` + `useSpring`.

### Cadence cheat-sheet

| Move                 | Duration | Easing                |
| -------------------- | -------- | --------------------- |
| Section fade-up      | 0.5s     | default               |
| Headline mask-reveal | 0.85s    | `[0.22, 1, 0.36, 1]`  |
| Card stagger         | 0.6s + 80ms/i | `[0.22, 1, 0.36, 1]` |
| Counter ticker       | 1.4–1.8s | `[0.22, 1, 0.36, 1]`  |
| Hover lift           | 0.2s     | spring (stiff: 240, damping: 22) |
| Pulse / live dot     | 1.8s loop | `easeInOut`          |

---

## 8. Photography

### Sourcing
- Use real Indian-context photos (homes, families, construction sites, drafting tables).
- Pexels India-tagged collections for portraits.
- Unsplash for architecture / atmospheric shots.

### Treatment options

1. **Natural** — for "real homes" trust-pillar grids. Just a soft bottom shade for caption legibility (`linear-gradient transparent → rgba(0,0,0,0.78)`).
2. **Duotone Naxsha** — for emotional / hero sections:
   ```css
   filter: saturate(0.5) contrast(1.05);
   /* + overlay */
   background: rgba(0,41,82,0.65);
   mix-blend-mode: multiply;
   /* + lift */
   background: rgba(0,61,122,0.40);
   mix-blend-mode: screen;
   ```
3. **Avatar luminance-wash** — for testimonial avatars on white cards: `filter: saturate(0.12)`, blend `luminosity`.

**Never** apply a duotone to product/UI screenshots or floor-plan SVGs. Keep those crisp.

---

## 9. Strict Rules — never break

1. **No drop shadows.** Glass + hairline borders only.  
   _Exception:_ a single, intentional shadow on the primary CTA when it floats over imagery / the studio preview. Use a layered Terracotta shadow:  
   `0 30px 60px -20px rgba(184,85,43,0.55), 0 12px 24px -8px rgba(184,85,43,0.35)`.
2. **No gradients** as color fills. The `linear-gradient` to fade photo overlays (`transparent → rgba(0,0,0,X)`) for legibility is fine — but never a brand-color gradient like Naxsha → Terracotta.
3. **No pure #000.** Use `#1A1A1A` (Ink) or `#003D7A` (Naxsha) for the darkest text.
4. **No radii > 24px** on cards. Pills at 999 are the only exception.
5. **All borders 0.5px** Mist. Not 1px. Not 2px. (1.5px Naxsha Blue on floor-plan walls is a deliberate exception to the 0.5px rule, in keeping with architectural drafting convention.)
6. **Mono numbers always.** Never mix proportional + mono digits.
7. **Terracotta only on:** primary CTAs, the selected room/element, the POPULAR pill, the compass-N pointer, and intentional graphic accent dots/halos. Nowhere else.
8. **Verandah Green only on:** success states ("Vastu compliant", "Autosaved", "free to draft" dot).

---

## 10. Section Blueprints

Patterns you can compose. Each is a recognizable building block.

### 1. Cinematic hero with product preview

- White nav bar above
- Centered eyebrow pill
- Bold black + Naxsha Blue + Terracotta-period headline (max 2 lines)
- Subhead under (max 56ch)
- Single primary CTA + microcopy pill below
- **Product mockup** below CTA with shadow + 1px border, optionally masked at top so CTA floats on it

### 2. Visual trust pillar grid

- Section eyebrow + huge H2 + sub-paragraph
- 6-cell photo grid: one 2×2 hero card + five 2×1 cards
- Photos: natural color, soft bottom gradient, glass meta pill (city, cost, year)

### 3. Asymmetric features wall

- 6-col grid
- Row 1: 1 wide dark hero card (span 4) + 1 light card (span 2)
- Row 2: 3-card row (span 2 each)
- Mix variants: tint / terracotta / verandah / deep / glass
- Each card: eyebrow → big-mono number → title → body → metric chip

### 4. Dark colored section (rhythm break)

- Use `.section-deep` or `.section-dark` for a single moment in the page
- Drafted grid overlay at low opacity
- Optional Terracotta + Naxsha-lift accent halos (large soft circles, `mix-blend-mode: screen`)
- Glass-dark cards within

### 5. Sticky scroll story

- Tall section (`height: ${N * 100}vh`)
- Pinned sticky visual on right
- Scrollable chapter copy on left
- `useScroll` + `useMotionValueEvent` to drive active chapter index
- Pinned visual swaps overlay/highlight per active chapter

### 6. Horizontal testimonial reel

- `.section-tint` background
- Heading row + small "★ 4.9 from N stories" pill
- Full-bleed CSS-marquee track with portrait cards (9:14 ratio, 340–400px wide)
- Edge mask: `mask-image: linear-gradient(to right, transparent 0%, #000 5%, #000 95%, transparent 100%)`
- Pause on hover: `.marquee:hover .marquee-track { animation-play-state: paused }`

### 7. FAQ accordion

- Sticky left column (heading + email link)
- Right column: glass-cards with rotating +→× icon
- AnimatePresence + height auto-animate on open

### 8. Final CTA band

- `.section-deep` or `.section-dark` with masked photo backdrop
- Small accent halo top-right
- Centered eyebrow pill → 2-line headline (second line in terracotta-soft) → short subhead → terracotta CTA with strong shadow → microcopy pill

---

## 11. File Structure (recommended)

```
src/
  app/
    globals.css           # design tokens, glass utilities, motion classes
    layout.tsx            # font wiring (Inter + JetBrains Mono)
    [route]/page.tsx      # composes top-level sections
  components/
    [route]/              # one folder per route
      Container.tsx       # .wrap + .gutter primitives
      TopNav.tsx
      Hero.tsx
      Section1.tsx
      ...
      Footer.tsx
  lib/                    # data, formatters
```

The Container primitive is the foundation — every section uses it:

```tsx
export function Container({ children, className = "" }) {
  return <div className={`wrap gutter ${className}`}>{children}</div>;
}

export function Section({ children, id, className = "" }) {
  return (
    <section id={id} className={className}
      style={{
        paddingTop: "clamp(80px, 10vw, 160px)",
        paddingBottom: "clamp(80px, 10vw, 160px)",
      }}>
      <Container>{children}</Container>
    </section>
  );
}
```

---

## 12. Quick Component Recipes

### Section header pattern

```tsx
<motion.div
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.5 }}
  className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-end mb-12"
>
  <div>
    <span className="glass inline-flex items-center gap-2 px-3 h-8 rounded-full label"
          style={{ color: "var(--color-naxsha-deep)" }}>
      <Sparkles size={11} className="text-terracotta" />
      SECTION LABEL
    </span>
    <h2 className="mt-5 font-bold leading-[1.02] tracking-[-0.028em]"
        style={{ fontSize: "clamp(40px, 5.4vw, 76px)", color: "var(--color-ink)", maxWidth: "18ch" }}>
      Headline,{" "}
      <span style={{ color: "var(--color-naxsha)" }}>highlight phrase.</span>
    </h2>
  </div>
  <p className="t-lead" style={{ maxWidth: "44ch" }}>
    Supporting paragraph...
  </p>
</motion.div>
```

### Dark hero card with delta

```tsx
<div className="rounded-[20px] p-7 text-white"
     style={{ background: "var(--color-naxsha)", border: "0.5px solid var(--color-naxsha-deep)" }}>
  <span className="label" style={{ color: "rgba(255,255,255,0.65)" }}>ESTIMATED BUDGET</span>
  <div className="mt-2 mono text-[28px] font-semibold">{fmtINR(2160000)}</div>
  <span className="mono inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-[3px] mt-3"
        style={{ background: "rgba(244,168,122,0.18)", color: "#F4A87A" }}>
    ↓ ₹1.4 L
  </span>
</div>
```

### Marquee track (CSS)

```css
@keyframes naxsha-marquee {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }
}
.marquee-track { animation: naxsha-marquee 55s linear infinite; will-change: transform; }
.marquee:hover .marquee-track { animation-play-state: paused; }
```

---

## 13. PDF Export

The page can be exported as a single-page PDF via `scripts/export-pdf.mjs`:

```bash
node scripts/export-pdf.mjs   # → naxsha-v2.pdf
```

The script uses Puppeteer's `fullPage` screenshot (avoiding the `min-h-screen flex flex-col` stretching bug that affects `page.pdf()` with tall `paperHeight`), then converts PNG → PDF via ImageMagick.

---

## 14. Pre-flight Checklist (before shipping any new screen)

- [ ] All text is Ink (#1A1A1A), Graphite (#495057), or White — never #000.
- [ ] All borders are 0.5px Mist (#DEE2E6).
- [ ] All radii ≤ 24px (cards), 8px (buttons), pills are 999.
- [ ] Numbers are tabular mono; no proportional/mono digit mixing.
- [ ] Terracotta is used **only** on the allowed elements.
- [ ] Verandah Green is on success states only.
- [ ] No drop shadows except the explicit Terracotta CTA shadow.
- [ ] No gradient color fills.
- [ ] Section heading + body + cards all have `whileInView` reveals with `once: true`.
- [ ] Hover lifts (`y: -2` to `-4`) on interactive cards.
- [ ] Glass surfaces use backdrop-blur, not opacity-only.
- [ ] Photos are duotone (for emotional sections) or natural (for trust-grids).
- [ ] Container uses `.wrap .gutter`; sections use fluid `clamp()` padding.
- [ ] Type uses `clamp()` so it scales 360 → 2560.

---

## Reference

Live example: `/v2` (sections: Hero → BuiltHomes → Features → TestimonialReel → TheStudio → FAQ → FinalCTA → Footer).

Source: `src/components/v2/`, tokens in `src/app/globals.css`, page composition in `src/app/v2/page.tsx`.
