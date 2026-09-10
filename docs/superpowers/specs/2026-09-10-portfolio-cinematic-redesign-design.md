# Portfolio Redesign — "Cinematic Depth"

**Date:** 2026-09-10
**Status:** Approved, pending implementation plan
**Repo:** `guildb.github.io/Profile` (CRA 5 + Tailwind 3, deployed to GitHub Pages)

## Goal

Rebuild the presentation layer of the portfolio around a layered, animated
"cinematic depth" visual language. Content and copy are preserved. The motion
system, theme architecture, asset pipeline and component boundaries are
replaced.

Success means: the site reads as deliberately designed rather than templated,
animates with real physics rather than canned scroll fades, loads fast on
mobile, and respects `prefers-reduced-motion`.

## Non-goals

- No new content, sections or copywriting beyond project repo links.
- No routing. It stays a single scrolling page.
- No backend. EmailJS stays the contact transport.
- No CRA ejection or migration to Vite.

---

## 1. Visual system

### Palette — "Azulejo"

The default cinematic-portfolio palette is indigo → violet → cyan on near-black.
It is the main reason such sites look interchangeable. This design uses a cool
canvas with a **warm** accent instead, which is the primary anti-templated lever.

| Token | Dark | Light | Use |
|---|---|---|---|
| `canvas` | `#04060E` | `#F4F1EC` | Page background |
| `surface` | `rgba(255,255,255,0.04)` | `rgba(255,255,255,0.70)` | Glass panel fill |
| `hairline` | `rgba(255,255,255,0.12)` | `rgba(11,18,32,0.10)` | Panel border |
| `aurora-1` | `#1B4D8F` | same, low opacity | Aurora stop (azulejo blue) |
| `aurora-2` | `#0FB5A0` | same, low opacity | Aurora stop (teal) |
| `accent` | `#E2714C` | `#C4522C` | CTAs, focus rings, active states, highlights |
| `text` | `#E8ECF4` | `#0B1220` | Body |
| `muted` | `#8A97AD` | `#5A6478` | Secondary text |

Defined as CSS custom properties on `:root` and `.dark`, surfaced to Tailwind
via `theme.extend.colors` so they are usable as `bg-canvas`, `text-accent`, etc.

Light mode is a designed counterpart, not an inversion: warm bone canvas, the
same terracotta accent, and the aurora dialled down to a whisper.

### Depth model

Four stacked layers. Depth comes from the stack, blur falloff and glow — not
from a single `backdrop-filter` over a single gradient.

- `z0` **Aurora mesh** — animated, GPU-composited, fixed to viewport.
- `z1` **Spotlight + dot grid** — a fine dot grid masked by a radial gradient
  that follows the pointer.
- `z2` **Content** — glass panels with gradient hairline borders.
- `z3` **Grain** — a static film-grain overlay at low opacity, `pointer-events: none`.

### Typography

- Display: Outfit. Hero uses a fluid `clamp()` scale reaching a genuinely
  oversized size, with tightened tracking at large sizes.
- Body: Inter.
- Both already loaded in `public/index.html`; no new font requests.

---

## 2. Motion system

### Shared vocabulary — `src/lib/motion.js`

Nothing is hand-tuned per component. The module exports:

- **Springs:** `snappy` (stiffness 400, damping 30), `soft` (stiffness 200,
  damping 26), `weighty` (stiffness 120, damping 24).
- **Variants:** `revealUp`, `revealStagger` (container with `staggerChildren`),
  `fadeScale`.
- All consumers import from here so timing stays coherent across the page.

### Per-section motion

| Section | Motion |
|---|---|
| Hero | Name reveals per-word on a spring stagger. On scroll, the glass panel drifts up and blurs out while the aurora scales — driven by `useScroll`/`useTransform`, never a scroll event listener. |
| About | Portrait in a glass frame with a glow ring; facts list staggers in with an icon pop. |
| Skills | Four glass tiles on an asymmetric grid (2 wide + 2 narrow at `lg`, single column below `md`), each with a hover glow and an accent underline that wipes in from the left. |
| Projects | **Showpiece.** Pointer-driven `rotateX`/`rotateY` tilt on a spring, with a specular highlight tracking the cursor across the glass. |
| Experience | Custom timeline. The connecting line draws itself against `scrollYProgress`; nodes pop as they enter. |
| Interests | Lighter and more playful — glass tiles with icon micro-animations on hover. |
| Contact | Focus glow on inputs; animated state transitions on submit. |

### Global chrome

- **Nav:** shared `layoutId` indicator that physically slides between items as
  the active section changes.
- **Scroll rail:** right-edge progress rail with section markers.
- **Theme toggle:** View Transitions API where supported, with a crossfade
  fallback where not.

### Reduced motion

A `usePrefersReducedMotion` hook gates the aurora animation, tilt, parallax and
grain. Everything still renders and remains fully legible — it simply stops
moving. Framer Motion's `MotionConfig reducedMotion="user"` covers variant-based
motion; the hook covers the bespoke effects.

### Performance guardrails

Direction B is the heavy option, so these are requirements, not suggestions:

- The aurora is CSS radial-gradients on a blurred, composited layer. **Not**
  canvas, **not** WebGL.
- The aurora pauses when off-screen via `IntersectionObserver`.
- Tilt and spotlight write to `MotionValue`s so they never trigger React
  re-renders.
- Below-fold sections get `content-visibility: auto` with
  `contain-intrinsic-size`.
- Only `transform`, `opacity` and `filter` are animated.

---

## 3. Architecture

### Theme

`ThemeContext` shrinks to: toggle, `localStorage` persistence, and a
`prefers-color-scheme` default on first visit. Its only exported value is
`{ theme, toggleTheme }`.

Every `darkMode ? "…" : "…"` ternary — roughly 200 of them across the codebase —
becomes a Tailwind `dark:` variant. `darkMode: 'class'` is already configured
and unused.

An inline blocking script in `public/index.html` reads `localStorage` and stamps
the class on `<html>` before first paint, eliminating the light-mode flash.

**Consequence:** the synthetic-scroll hack in `ThemeToggleButton.js` is deleted.
It existed only because those ternaries rewrote `className` and wiped AOS's
`aos-animate` class. Removing the root cause removes the workaround.

### New modules

```
src/lib/motion.js              springs, variants, easings
src/components/ui/
  AuroraBackground.jsx         z0 animated mesh
  Spotlight.jsx                z1 pointer-tracked grid + mask
  Grain.jsx                    z3 overlay
  GlassPanel.jsx               surface + gradient hairline border
  TiltCard.jsx                 3D tilt + specular highlight
  Reveal.jsx                   scroll-triggered entrance wrapper
  ScrollRail.jsx               progress rail with section markers
  SectionHeading.jsx           restyled from existing
src/hooks/
  usePrefersReducedMotion.js
  useGitHubRepos.js
src/data/
  profile.js  skills.js  projects.js  experience.js  interests.js
```

Extracting content to `src/data/` makes section components presentational and
lets content be edited without touching JSX.

### Dependency changes

**Add:** `framer-motion`, `@emailjs/browser`.

**Remove:** `aos` (replaced by the motion system), `styled-components`
(imported nowhere — dead dependency), `react-vertical-timeline-component`
(cannot do scroll-linked line drawing, and its bundled CSS fights the redesign),
`emailjs-com` (deprecated predecessor of `@emailjs/browser`).

**Delete:** `src/App.css` (unused CRA boilerplate),
`src/hooks/useBodyBackground.js` (dead file, and carries a `PUBLIC_URL` bug that
would break it on GitHub Pages), `src/logo.svg`, `src/reportWebVitals.js`
(never imported by `index.js`).

**Replace:** `src/App.test.js` currently asserts the page renders a "learn
react" link — CRA boilerplate that would fail if anyone ran it. It is replaced
with a smoke test asserting the page renders the name heading and the six
section landmarks.

---

## 4. Assets and performance

Current state is the dominant load cost:

| File | Now | Action |
|---|---|---|
| `dark-background.jpg` | 4000×3000, 3.5MB | Resize to 1920w, WebP q75, JPEG fallback. Target < 200KB |
| `light-background.jpg` | 3577×2370, 2.7MB | Same. Target < 200KB |
| `profile.png` | 1920×4008, 11MB, unused | Delete |
| `profile-web.jpg` | 640×1336, 224KB | Add WebP variant; keep JPEG fallback |

Conversion uses `cwebp`, which is present on this machine. Originals are kept in
git history; the oversized source files are removed from `public/`.

Background photos are retained but used with intent — as a subtle textured layer
beneath the aurora rather than a full-bleed wash behind a floating box. The
portrait remains a real feature in About. All images get explicit `width`/`height`
to prevent layout shift, and below-fold images get `loading="lazy"`.

---

## 5. Projects and GitHub data

The matching repos are `Guildb/AI_Based_Project_Allocation` (Python) and
`Guildb/COM519_3dprintings` (CSS). Both have **0 stars, no description and no
homepage set.**

Therefore **star counts are not displayed.** Rendering "★ 0" on one's own
portfolio is worse than rendering nothing. Instead each project card shows:

- Language breakdown as a segmented bar (from the repo `languages` endpoint)
- Last-commit recency ("updated 3 months ago")
- A repo link, and a demo link when `homepage` is set

**Fetching:** unauthenticated GitHub API, rate-limited to 60 requests/hour per
IP. No token is shipped — a static site cannot hold one secret. Responses are
cached in `sessionStorage` with a timestamp. **Any failure — rate limit, network
error, missing repo — falls back silently to the static data in
`src/data/projects.js`.** The card must render completely and correctly with no
network at all.

**Separate recommendation to the user (not a code task):** add descriptions to
those two repos.

---

## 6. Contact form

Replace the current behaviour, which calls `window.location.reload()` three
seconds after submit.

**State machine:** `idle → sending → sent | error`, with `error → idle` on edit.

- Button disabled and spinner-labelled during `sending` (prevents double-submit).
- On `sent`: form resets in place, animated success confirmation. No reload.
- On `error`: inline message, form values preserved, retry available.
- Inline validation on blur using `:user-invalid` semantics.
- Fix `phone: null` → `phone: ''` (currently causes a controlled/uncontrolled
  React warning).
- Fix `stroke-linecap`/`stroke-width` → `strokeLinecap`/`strokeWidth` on the
  status SVGs.

EmailJS public keys remain client-side. This is inherent to EmailJS on a static
host, was already the case, and is not a regression — but it is documented here
so it is a known property rather than an oversight.

---

## 7. Accessibility

- All interactive elements keyboard-reachable with a visible accent focus ring.
- Decorative layers (aurora, grain, spotlight) are `aria-hidden` and
  `pointer-events: none`.
- Colour contrast meets WCAG AA for body text in both themes — verified, not
  assumed, since glass surfaces reduce effective contrast.
- Form inputs keep their associated `<label>`s.
- Section landmarks use `<section>` with `aria-labelledby`.

---

## 8. Implementation phasing

The work is large enough that it should land in reviewable stages rather than
one change. The implementation plan should follow this order, because each
phase unblocks the next:

1. **Foundation** — dependencies, palette tokens, Tailwind config, `dark:`
   refactor, theme persistence and anti-flash script. The site should still
   look like the current design at the end of this phase, just structurally
   sound.
2. **Motion primitives** — `src/lib/motion.js` and `src/components/ui/`, with
   AOS removed. Sections adopt `Reveal` in place of `data-aos`.
3. **Assets** — image compression, deletions, `width`/`height`, lazy loading.
4. **Sections** — hero, About, Skills, Projects, Experience, Interests, Contact
   restyled and animated, in that order.
5. **Chrome and polish** — scroll rail, nav indicator, theme transition,
   reduced-motion pass, accessibility pass.

Phases 1–3 are safe to verify in isolation. Phase 4 is where the redesign
becomes visible.

## 9. Verification

The work is not complete until:

1. `npm run build` completes with **no warnings**.
2. Dev server renders correctly in both themes, with no console errors or React
   warnings.
3. Playwright screenshots captured at 1440px and 390px, in light and dark —
   four shots minimum — and reviewed.
4. A `prefers-reduced-motion: reduce` pass confirms the page is static and fully
   legible.
5. Theme persists across reload with no flash of the wrong theme.
6. Contact form exercised through `sending`, `sent` and `error` paths.
7. Project cards verified to render correctly with the GitHub API blocked.
8. Total `public/` image payload confirmed under 600KB.

**Nothing is deployed to GitHub Pages without explicit approval.** `npm run
deploy` is not run as part of this work.
