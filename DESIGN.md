# Design

## Theme

Dark industrial monochrome, drenched charcoal. The scene: a site engineer checking a supplier's site at dusk from a portacabin — ambient light is low, the screen is the brightest thing around, and sodium lamps outside tint everything amber. Dark is the register, not a style choice.

Color strategy: **Committed** — near-black carries the whole surface; one amber accent ≤10%.

## Palette (OKLCH)

- `--bg-0: oklch(0.16 0 0)` (#0e0e0e) — page background
- `--bg-1: oklch(0.19 0 0)` (#141414) — alternating sections
- `--surface: oklch(0.23 0.004 260)` (#1c1d1f) — panels, form fields (cool steel tint)
- `--line: oklch(0.32 0.004 260)` (#333537) — hairline borders
- `--ink: oklch(0.95 0.004 85)` (#f1efe9) — headings / primary text
- `--ink-2: oklch(0.76 0.004 85)` (#b3b1ab) — secondary text (≥6:1 on bg-0)
- `--amber: oklch(0.78 0.16 70)` (#ffa227) — the single accent: CTAs, hovers, dividers, placeholder flags
- `--amber-deep: oklch(0.66 0.15 60)` (#d97e0e) — hover/pressed
- On-amber text: `--bg-0` (near-black), never white.

## Typography

Single family, committed weight contrast: **Noto Sans Georgian** (variable 100–900, Google Fonts). Chosen because it fully covers Georgian Mkhedruli + Mtavruli; Space Grotesk / Inter do not support Georgian script.

- Display / H1–H2: weight 800, `text-transform: uppercase` (renders Mtavruli — Georgian structural-signage voice), letter-spacing 0 to +0.01em, `clamp()` fluid, ratio ≥1.3.
- Body: weight 400, 16–18px, line-height 1.7 (light-on-dark needs extra leading), max 70ch.
- Technical labels / spec values: weight 600, tabular numbers (`font-variant-numeric: tabular-nums`).

## Motifs

- **Hazard stripe**: 45° amber/transparent repeating-linear-gradient, 3px tall, as the single section-divider motif. This is the brand's one named kicker system.
- Spec rows: hairline-ruled key/value rows, like a crane load chart.
- Placeholder flags: `.todo` — amber text on translucent amber bg, monospace-free, bracketed, impossible to miss.

## Layout

- Full-bleed video hero, overlaid logotype + tagline.
- Scroll-scrub section: 300vh scroll runway, sticky viewport, step captions synced to progress.
- Services: alternating image/spec-sheet rows (not identical card grid).
- Gallery: horizontal-scroll strip of video tiles.
- Fluid spacing via `clamp()`; sections breathe 96–160px.

## Motion

- Scroll-scrub video (desktop, fine pointers) → looping autoplay video on ≤768px or `prefers-reduced-motion`.
- Scroll reveals: content visible by default, enhanced via IntersectionObserver adding a class; ease-out-quart, 500–700ms, small 16–24px translate. Never gate visibility on JS.
- Hover: amber underline slide / border-color shifts, 200ms.
