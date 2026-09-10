# Portfolio "Cinematic Depth" Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the presentation layer of Renato Cardoso's portfolio around a layered, animated "cinematic depth" visual language, while replacing the theme architecture, motion system and asset pipeline underneath it.

**Architecture:** A four-layer depth stack (aurora → spotlight/grid → glass content → grain) renders behind a single scrolling page. All motion runs through one shared vocabulary module built on Framer Motion's `MotionValue` primitives, so animation never triggers React re-renders. Theme moves from ~200 inline `darkMode ?` ternaries to Tailwind `dark:` variants driven by a class stamped on `<html>` before first paint.

**Tech Stack:** Create React App 5, React 18, Tailwind CSS 3 (`darkMode: 'class'`), `motion` v13 (imported from `motion/react`), `@emailjs/browser` v4, Jest + React Testing Library (bundled with CRA), Playwright (via MCP) for screenshots.

**Spec:** `docs/superpowers/specs/2026-09-10-portfolio-cinematic-redesign-design.md`

## Global Constraints

These apply to **every** task. They are copied verbatim from the spec and from
`modern-web-guidance` guides retrieved during planning.

- **Palette tokens are fixed.** Dark: canvas `#04060E`, aurora-1 `#1B4D8F`, aurora-2 `#0FB5A0`, accent `#E2714C`, text `#E8ECF4`, muted `#8A97AD`. Light: canvas `#F4F1EC`, accent `#C4522C`, text `#0B1220`, muted `#5A6478`. Never introduce a colour outside this set.
- **Only `transform`, `opacity` and `filter` may be animated.** Never animate `width`, `height`, `top`, `left`, or `background-position`.
- **No CSS scroll-driven animations** (`animation-timeline`, `view()`, `scroll()`). Firefox has zero support. All scroll-linked motion uses Framer Motion `useScroll`/`useTransform`, which works in every target browser. This is a deliberate deviation from the retrieved guides' preferred technique, made because we already ship a JS motion library.
- **The aurora is CSS radial-gradients on a blurred composited layer.** Never canvas, never WebGL.
- **Every decorative layer** (aurora, grain, spotlight, scroll rail) carries `aria-hidden="true"` and `pointer-events: none`.
- **`content-visibility: auto` MUST be paired with `contain-intrinsic-size`** and MUST NOT be applied to any element in the initial viewport.
- **Public asset paths MUST use `process.env.PUBLIC_URL`.** The `homepage` field means the app is served from `/Profile`, so a bare `/foo.jpg` breaks in production.
- **Node 24.13.0, npm 11.6.2** are what is installed. `cwebp` is available at `/opt/homebrew/bin/cwebp`.
- **Never run `npm run deploy`.** Deployment is the user's decision, made explicitly, after review.
- **Commit after every task.** End every commit message with:
  `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`

## A note on TDD in this plan

Real tests are written first for everything with logic: theme persistence, the
reduced-motion hook, the GitHub data hook, the contact form state machine, and
smoke-level rendering of every section. Visual styling is **not** unit-tested —
asserting on Tailwind class strings tests the test, not the design. Visual work
is verified by Playwright screenshots in Task 21, which is why that task is a
hard gate rather than a formality.

---

## File structure

**Created**

| Path | Responsibility |
|---|---|
| `src/lib/motion.js` | Springs, variants, easings. Single source of animation timing. |
| `src/hooks/usePrefersReducedMotion.js` | Live-updating reduced-motion boolean. |
| `src/hooks/useActiveSection.js` | Which section is in view (replaces `react-scroll` spy). |
| `src/hooks/useGitHubRepos.js` | Fetch + cache + fall back to static repo metadata. |
| `src/components/ui/AuroraBackground.jsx` | z0 animated mesh. |
| `src/components/ui/Spotlight.jsx` | z1 pointer-tracked dot grid. |
| `src/components/ui/Grain.jsx` | z3 film-grain overlay. |
| `src/components/ui/GlassPanel.jsx` | Glass surface + gradient hairline border. |
| `src/components/ui/TiltCard.jsx` | 3D tilt + specular highlight. |
| `src/components/ui/Reveal.jsx` | Scroll-triggered entrance wrapper. |
| `src/components/ui/ScrollRail.jsx` | Right-edge progress rail. |
| `src/data/*.js` | Profile, skills, projects, experience, interests content. |
| `scripts/optimize-images.sh` | One-shot `cwebp` conversion. |

**Deleted**

`src/App.css`, `src/logo.svg`, `src/reportWebVitals.js`, `src/hooks/useBodyBackground.js`, `public/profile.png`.

**Dependencies removed:** `aos`, `styled-components`, `react-vertical-timeline-component`, `react-scroll`, `emailjs-com`.
**Dependencies added:** `motion`, `@emailjs/browser`.

---

# Phase 1 — Foundation

At the end of this phase the site still looks essentially as it does today, but
the theme system and tokens underneath it are sound. This is deliberate: it
gives a reviewable checkpoint before any visual change lands.

### Task 1: Dependency swap

**Files:**
- Modify: `package.json`
- Delete: `src/App.css`, `src/logo.svg`, `src/reportWebVitals.js`, `src/hooks/useBodyBackground.js`
- Modify: `src/App.js:2-3` (remove AOS import and init)

**Interfaces:**
- Consumes: nothing.
- Produces: `motion/react` and `@emailjs/browser` available to all later tasks.

- [ ] **Step 1: Confirm the current build is green before changing anything**

```bash
cd "/Users/icaal/Local Sites/Profile"
npm run build
```

Expected: build succeeds. If it already fails, **stop and report** — do not
layer changes on a broken baseline.

- [ ] **Step 2: Remove dead and replaced dependencies**

```bash
npm uninstall aos styled-components react-scroll emailjs-com
```

**`react-vertical-timeline-component` is deliberately NOT uninstalled here.**
`src/components/Experience.js` still imports it, and that import is not removed
until Task 16. Uninstalling it now is a hard "Module not found" build failure,
not a warning. Task 16 removes the import and the package together.

Rationale, so a fresh reader does not re-add them: `styled-components` is
imported nowhere. `aos` is replaced by the motion system in Phase 2.
`react-vertical-timeline-component` cannot do scroll-linked line drawing and its
bundled CSS fights the redesign. `react-scroll` is replaced by native smooth
scrolling plus `useActiveSection`. `emailjs-com` is deprecated in favour of
`@emailjs/browser`.

Because `emailjs-com` is uninstalled in this step and `@emailjs/browser` is
installed in the next one, you must also update the single import in
`src/components/ContactInfo.js` from `emailjs-com` to `@emailjs/browser`. The
send API is identical, so no other change is needed there; Task 18 rebuilds the
rest of that component.

- [ ] **Step 3: Add the replacements**

```bash
npm install motion @emailjs/browser
```

- [ ] **Step 4: Delete dead files**

```bash
git rm src/App.css src/logo.svg src/reportWebVitals.js src/hooks/useBodyBackground.js
```

- [ ] **Step 5: Strip AOS from the app entry**

Replace the entire contents of `src/App.js` with:

```jsx
import React from 'react';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import BackToTopButton from './components/BackToTopButton';
import ThemeToggleButton from './components/ThemeToggleButton';
import Footer from './components/Footer';
import { ThemeProvider } from './contexts/ThemeContext';

const App = () => (
  <ThemeProvider>
    <LandingPage />
    <Profile />
    <BackToTopButton />
    <ThemeToggleButton />
    <Footer />
  </ThemeProvider>
);

export default App;
```

- [ ] **Step 6: Remove every remaining `data-aos` attribute**

Two passes. The first deletes lines that contain *only* a `data-aos`
attribute; the second strips inline occurrences that share a line with other
JSX. **Do not** use a single line-deleting pass: `src/components/SectionHeading.js:5`
is `<div className="text-center mb-12" data-aos="fade-up">`, and deleting that
line removes the opening tag of a component every section renders.

```bash
FILES=$(grep -rln "data-aos" src/)

# Pass 1: lines that are nothing but a data-aos attribute
echo "$FILES" | xargs sed -i '' -E '/^[[:space:]]*data-aos(-[a-z]+)?=("[^"]*"|\{[^}]*\})[[:space:]]*$/d'

# Pass 2: attributes sharing a line with other JSX
echo "$FILES" | xargs sed -i '' -E 's/[[:space:]]+data-aos(-[a-z]+)?=("[^"]*"|\{[^}]*\})//g'

grep -rn "data-aos" src/ || echo "clean"
```

Then confirm the JSX survived:

```bash
grep -n "text-center mb-12" src/components/SectionHeading.js
```

Expected: the `<div className="text-center mb-12">` line is still present, now
without the attribute.

Expected: `clean`. Reveal animations return in Task 6.

- [ ] **Step 7: Remove `react-scroll` usage so the build compiles**

In `src/components/Header.js`, `src/components/LandingPage.js` and
`src/components/BackToTopButton.js`, replace `react-scroll` imports and `<Link>`
usage with plain anchors and native scrolling. In `Header.js` the nav item
becomes:

```jsx
<a
  href={`#${to}`}
  className="cursor-pointer rounded-full px-3 py-2 text-sm font-medium transition-colors duration-300"
>
  {label}
</a>
```

In `BackToTopButton.js`, replace the `scroll.scrollToTop(...)` body with:

```js
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
```

`html { scroll-behavior: smooth }` is already set in `src/index.css` and the
section wrappers already carry `scroll-mt-20`, so anchors scroll smoothly with
correct offset. The animated active indicator arrives in Task 19.

- [ ] **Step 8: Verify the build is still green**

```bash
npm run build
```

Expected: compiles successfully with **no warnings**. If webpack fails to
resolve `motion/react`, fall back to `npm install framer-motion@11` and import
from `framer-motion` instead — the API used in this plan is identical across
both. Record which one was used, because every later task imports from it.

- [ ] **Step 8b: Replace the broken CRA smoke test**

`src/App.test.js` asserts the page renders a "learn react" link. It is CRA
boilerplate and it **fails right now**, before any redesign work. Leaving it red
for the rest of the plan would make every later task's "tests pass" evidence
ambiguous, so it is replaced here rather than at the end.

```jsx
import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
  window.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  }));
  jest.spyOn(global, 'fetch').mockRejectedValue(new Error('offline'));
});

test('renders the name in the page heading', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { level: 1, name: /renato cardoso/i })
  ).toBeInTheDocument();
});

test('renders every section landmark', () => {
  render(<App />);
  ['about', 'skills', 'projects', 'experience', 'interests', 'contact-info'].forEach((id) => {
    expect(document.getElementById(id)).toBeInTheDocument();
  });
});
```

Both assertions are written to hold against the **current** markup as well as the
redesigned markup, so this test guards the whole plan rather than only its end
state. Run it:

```bash
CI=true npx react-scripts test --watchAll=false
```

Expected: PASS, 2 tests, and the whole suite green. If the heading assertion
fails because the current `<h1>` reads "Hi, I'm Renato Cardoso", that still
matches `/renato cardoso/i` — investigate rather than weakening the assertion.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
chore: swap dependencies for redesign foundation

Remove aos, styled-components, react-vertical-timeline-component,
react-scroll and the deprecated emailjs-com. Add motion and
@emailjs/browser. Delete dead CRA boilerplate and the unused
useBodyBackground hook.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

### Task 2: Design tokens

**Files:**
- Modify: `src/index.css`
- Modify: `tailwind.config.js`

**Interfaces:**
- Consumes: nothing.
- Produces: Tailwind utilities `bg-canvas`, `bg-surface`, `border-hairline`, `text-ink`, `text-muted`, `text-accent`, `bg-accent`, `from-aurora1`, `to-aurora2`. Every later task styles with these and never with raw hex or `slate-*`.

- [ ] **Step 1: Replace `src/index.css` with the token layer**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --canvas: 4 6 14;
    --surface: 255 255 255;
    --surface-alpha: 0.04;
    --hairline: 255 255 255;
    --hairline-alpha: 0.12;
    --aurora-1: 27 77 143;
    --aurora-2: 15 181 160;
    --accent: 226 113 76;
    --ink: 232 236 244;
    --muted: 138 151 173;
  }

  :root:not(.dark) {
    --canvas: 244 241 236;
    --surface: 255 255 255;
    --surface-alpha: 0.70;
    --hairline: 11 18 32;
    --hairline-alpha: 0.10;
    --accent: 196 82 44;
    --ink: 11 18 32;
    --muted: 90 100 120;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: rgb(var(--canvas));
    color: rgb(var(--ink));
    font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
  }

  ::selection {
    background-color: rgb(var(--accent));
    color: rgb(var(--canvas));
  }

  :focus-visible {
    outline: 2px solid rgb(var(--accent));
    outline-offset: 3px;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgb(var(--muted) / 0.5);
  border-radius: 9999px;
}

@layer components {
  .gradient-text {
    @apply bg-gradient-to-r from-aurora2 via-accent to-accent bg-clip-text text-transparent;
  }
}
```

Note the sense of the light-mode selector: dark is the **default** on `:root`,
and `:root:not(.dark)` overrides it for light. This is intentional — the design
is dark-first, so an unstyled first paint lands on the dark canvas.

- [ ] **Step 2: Wire the tokens into Tailwind**

Replace `tailwind.config.js` with:

```js
/** @type {import('tailwindcss').Config} */
const withAlpha = (variable) => ({ opacityValue }) =>
  opacityValue === undefined
    ? `rgb(var(${variable}))`
    : `rgb(var(${variable}) / ${opacityValue})`;

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: withAlpha('--canvas'),
        surface: 'rgb(var(--surface) / var(--surface-alpha))',
        hairline: 'rgb(var(--hairline) / var(--hairline-alpha))',
        aurora1: withAlpha('--aurora-1'),
        aurora2: withAlpha('--aurora-2'),
        accent: withAlpha('--accent'),
        ink: withAlpha('--ink'),
        muted: withAlpha('--muted'),
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'ui-sans-serif', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(2.75rem, 11vw, 8.5rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        section: ['clamp(1.85rem, 4.5vw, 3.25rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 3: Verify tokens compile and resolve**

```bash
npm run build
grep -o "rgb(var(--accent)[^)]*)" build/static/css/*.css | head -3
```

Expected: build succeeds and the grep prints at least one match, proving the
custom-property colours survived into the compiled CSS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
feat: add Azulejo design tokens

Define the palette as CSS custom properties with a dark-first default
and a light override, exposed through Tailwind as canvas/surface/
hairline/aurora/accent/ink/muted utilities. Add fluid hero and section
type scales.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

### Task 3: Theme architecture

**Files:**
- Modify: `src/contexts/ThemeContext.js`
- Modify: `public/index.html`
- Test: `src/contexts/ThemeContext.test.js`

**Interfaces:**
- Consumes: nothing.
- Produces: `useTheme()` returning `{ theme: 'dark' | 'light', toggleTheme: () => void }`. **The `darkMode` boolean and `setDarkMode` setter are gone.** Every component that currently destructures `darkMode` must stop doing so in Task 4.

- [ ] **Step 1: Write the failing test**

Create `src/contexts/ThemeContext.test.js`:

```jsx
import { render, screen, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

const Probe = () => {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>{theme}</button>;
};

const renderProbe = () =>
  render(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>
  );

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.classList.remove('dark');
});

test('defaults to dark when the system prefers dark', () => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches: true,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
  renderProbe();
  expect(screen.getByRole('button')).toHaveTextContent('dark');
  expect(document.documentElement).toHaveClass('dark');
});

test('defaults to light when the system prefers light', () => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
  renderProbe();
  expect(screen.getByRole('button')).toHaveTextContent('light');
  expect(document.documentElement).not.toHaveClass('dark');
});

test('a stored preference beats the system preference', () => {
  window.localStorage.setItem('theme', 'light');
  window.matchMedia = jest.fn().mockReturnValue({
    matches: true,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
  renderProbe();
  expect(screen.getByRole('button')).toHaveTextContent('light');
});

test('toggling flips the theme, the class and the stored value', () => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
  renderProbe();
  act(() => {
    screen.getByRole('button').click();
  });
  expect(screen.getByRole('button')).toHaveTextContent('dark');
  expect(document.documentElement).toHaveClass('dark');
  expect(window.localStorage.getItem('theme')).toBe('dark');
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
CI=true npx react-scripts test --testPathPattern ThemeContext
```

Expected: FAIL — the provider currently exposes `darkMode`, not `theme`, so
`toHaveTextContent('dark')` cannot match.

- [ ] **Step 3: Rewrite the context**

Replace `src/contexts/ThemeContext.js` with:

```jsx
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

const readInitialTheme = () => {
  try {
    const stored = window.localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    // Private browsing can throw on localStorage access. Fall through.
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(readInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      window.localStorage.setItem('theme', theme);
    } catch {
      // Storage unavailable; the theme still applies for this session.
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside a ThemeProvider');
  return context;
};
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
CI=true npx react-scripts test --testPathPattern ThemeContext
```

Expected: PASS, 4 tests.

- [ ] **Step 5: Add the anti-flash script**

In `public/index.html`, immediately after `<div id="root"></div>`, insert:

```html
<script>
  (function () {
    try {
      var stored = localStorage.getItem('theme');
      var dark = stored
        ? stored === 'dark'
        : window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (dark) document.documentElement.classList.add('dark');
    } catch (e) {}
  })();
</script>
```

This runs before React mounts, so the correct canvas colour is painted on the
first frame. Without it the page flashes light before hydrating.

Also update the theme-colour meta tag in `<head>` from `#000000` to match the
dark canvas:

```html
<meta name="theme-color" content="#04060E" />
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
feat: persist theme and eliminate the flash of wrong theme

Replace the darkMode boolean with a theme string, default from
prefers-color-scheme, persist to localStorage, and stamp the class on
<html> from a blocking script before React mounts.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

### Task 4: Retire the `darkMode` ternaries

**Files:**
- Modify: every file in `src/components/` that imports `useTheme`

**Interfaces:**
- Consumes: `useTheme()` from Task 3.
- Produces: components that no longer read theme state at all. This is what removes the AOS class-wipe hack permanently.

- [ ] **Step 1: Confirm the scale of the change**

```bash
grep -rc "darkMode" src/components/*.js | grep -v ":0"
```

Record the output. Every one of these must reach zero by the end of this task.

- [ ] **Step 2: Convert each component**

Work through them one file at a time. The mechanical transformation is: every
`darkMode ? "A" : "B"` becomes `"B dark:A"`, with the dark-mode classes prefixed.
Then delete the now-unused `useTheme` import and the `const { darkMode } = useTheme();` line.

Worked example — `src/components/Footer.js` currently opens:

```jsx
const { darkMode } = useTheme();
return (
  <footer className={darkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-800'}>
```

becomes, in token terms:

```jsx
return (
  <footer className="bg-canvas text-ink">
```

and the social-link class:

```jsx
className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-1 hover:text-blue-500 ${
  darkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50'
}`}
```

becomes:

```jsx
className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface transition-all duration-300 hover:-translate-y-1 hover:text-accent"
```

Because the tokens are theme-aware custom properties, most pairs collapse to a
**single** token class with no `dark:` variant needed at all. Reach for `dark:`
only where the two themes genuinely need different treatment, such as image
overlay opacity.

Replace every remaining `slate-*`, `blue-*` and `cyan-*` utility with the token
equivalents: surfaces → `bg-surface`, borders → `border-hairline`, body text →
`text-ink`, secondary text → `text-muted`, accents → `text-accent` / `bg-accent`.

- [ ] **Step 3: Verify no component reads theme state**

```bash
grep -rn "darkMode" src/ || echo "no darkMode references"
grep -rn "useTheme" src/components/ || echo "no component reads theme"
```

Expected: both print their "no ..." message. `useTheme` should now be imported
**only** by `src/components/ThemeToggleButton.js`, which legitimately needs it
to render the correct icon — so if that one file appears, that is correct and
expected; every other component must be clean.

- [ ] **Step 4: Delete the AOS workaround**

In `src/components/ThemeToggleButton.js`, remove the `setTimeout` that dispatches
a synthetic scroll event, and its comment. The hack existed only because the
ternaries rewrote `className` and wiped AOS's `aos-animate` class; both causes
are now gone. Update it to the new context shape:

```jsx
import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="fixed top-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface text-ink shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-110"
    >
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggleButton;
```

- [ ] **Step 5: Verify the build and eyeball both themes**

```bash
npm run build
```

Expected: no warnings. Then run `npm start`, toggle the theme, and confirm both
themes render coherently and the toggle no longer causes any flicker.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
refactor: replace darkMode ternaries with theme tokens

Components no longer read theme state; theme-aware custom properties
handle both modes. Removes the synthetic-scroll workaround, which only
existed because className rewrites wiped AOS animation classes.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

# Phase 2 — Motion primitives

### Task 5: Motion vocabulary and the reduced-motion hook

**Files:**
- Create: `src/lib/motion.js`
- Create: `src/hooks/usePrefersReducedMotion.js`
- Test: `src/hooks/usePrefersReducedMotion.test.js`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `springs.snappy`, `springs.soft`, `springs.weighty` — Framer Motion transition objects.
  - `revealUp`, `revealStagger`, `fadeScale` — variant objects.
  - `usePrefersReducedMotion(): boolean` — default export, live-updating.

- [ ] **Step 1: Write the failing test**

Create `src/hooks/usePrefersReducedMotion.test.js`:

```jsx
import { render, screen, act } from '@testing-library/react';
import usePrefersReducedMotion from './usePrefersReducedMotion';

const Probe = () => <span>{usePrefersReducedMotion() ? 'reduced' : 'full'}</span>;

const mockMatchMedia = (matches) => {
  const listeners = new Set();
  const mql = {
    matches,
    addEventListener: (_, fn) => listeners.add(fn),
    removeEventListener: (_, fn) => listeners.delete(fn),
    dispatch(next) {
      mql.matches = next;
      listeners.forEach((fn) => fn({ matches: next }));
    },
  };
  window.matchMedia = jest.fn().mockReturnValue(mql);
  return mql;
};

test('reports false when the user has expressed no preference', () => {
  mockMatchMedia(false);
  render(<Probe />);
  expect(screen.getByText('full')).toBeInTheDocument();
});

test('reports true when the user prefers reduced motion', () => {
  mockMatchMedia(true);
  render(<Probe />);
  expect(screen.getByText('reduced')).toBeInTheDocument();
});

test('reacts when the preference changes while the page is open', () => {
  const mql = mockMatchMedia(false);
  render(<Probe />);
  act(() => mql.dispatch(true));
  expect(screen.getByText('reduced')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
CI=true npx react-scripts test --testPathPattern usePrefersReducedMotion
```

Expected: FAIL — "Cannot find module './usePrefersReducedMotion'".

- [ ] **Step 3: Implement the hook**

Create `src/hooks/usePrefersReducedMotion.js`:

```js
import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

const usePrefersReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(
    () => window.matchMedia(QUERY).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const onChange = (event) => setPrefersReduced(event.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return prefersReduced;
};

export default usePrefersReducedMotion;
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
CI=true npx react-scripts test --testPathPattern usePrefersReducedMotion
```

Expected: PASS, 3 tests.

- [ ] **Step 5: Create the shared motion vocabulary**

Create `src/lib/motion.js`:

```js
export const springs = {
  snappy: { type: 'spring', stiffness: 400, damping: 30, mass: 0.8 },
  soft: { type: 'spring', stiffness: 200, damping: 26, mass: 1 },
  weighty: { type: 'spring', stiffness: 120, damping: 24, mass: 1.4 },
};

export const revealUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: springs.soft },
};

export const fadeScale = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: springs.snappy },
};

export const revealStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

// Viewport config shared by every scroll-triggered reveal, so entrance
// thresholds stay consistent across sections.
export const viewport = { once: true, amount: 0.25, margin: '0px 0px -10% 0px' };
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
feat: add shared motion vocabulary and reduced-motion hook

Three named springs and three variants give every animation on the site
consistent timing. The hook tracks prefers-reduced-motion live so effects
can be gated without a reload.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

### Task 6: Reveal wrapper

**Files:**
- Create: `src/components/ui/Reveal.jsx`
- Test: `src/components/ui/Reveal.test.jsx`

**Interfaces:**
- Consumes: `springs`, `revealUp`, `revealStagger`, `viewport` from `src/lib/motion.js`; `usePrefersReducedMotion`.
- Produces: `<Reveal as="div" stagger={false} className="">{children}</Reveal>` — the single entrance primitive used by every section. Replaces all former `data-aos` usage.

- [ ] **Step 1: Write the failing test**

Create `src/components/ui/Reveal.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import Reveal from './Reveal';

beforeEach(() => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
});

test('renders its children', () => {
  render(<Reveal>hello</Reveal>);
  expect(screen.getByText('hello')).toBeInTheDocument();
});

test('renders children even when the user prefers reduced motion', () => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches: true,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
  render(<Reveal>still here</Reveal>);
  expect(screen.getByText('still here')).toBeInTheDocument();
});

test('honours the requested element type', () => {
  render(<Reveal as="section" aria-label="wrapped">content</Reveal>);
  expect(screen.getByLabelText('wrapped').tagName).toBe('SECTION');
});
```

The second test is the important one: reduced motion must never mean missing
content.

- [ ] **Step 2: Run the test to verify it fails**

```bash
CI=true npx react-scripts test --testPathPattern Reveal
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement Reveal**

Create `src/components/ui/Reveal.jsx`:

```jsx
import React from 'react';
import * as motionReact from 'motion/react';
import { revealStagger, revealUp, viewport } from '../../lib/motion';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const { motion } = motionReact;

const Reveal = ({ as = 'div', stagger = false, children, ...rest }) => {
  const prefersReduced = usePrefersReducedMotion();
  const Component = motion[as] ?? motion.div;

  if (prefersReduced) {
    const Plain = as;
    return <Plain {...rest}>{children}</Plain>;
  }

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={stagger ? revealStagger : revealUp}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Reveal;
```

When `stagger` is set, direct children should themselves be `motion` elements
carrying `variants={revealUp}` so the container's `staggerChildren` drives them.

- [ ] **Step 4: Run the test to verify it passes**

```bash
CI=true npx react-scripts test --testPathPattern Reveal
```

Expected: PASS, 3 tests.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
feat: add Reveal entrance primitive

Single scroll-triggered entrance wrapper replacing AOS. Renders plain
markup when the user prefers reduced motion, so content is never gated
behind an animation that will not run.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

### Task 7: Depth layers — Aurora, Spotlight, Grain

**Files:**
- Create: `src/components/ui/AuroraBackground.jsx`
- Create: `src/components/ui/Spotlight.jsx`
- Create: `src/components/ui/Grain.jsx`
- Test: `src/components/ui/AuroraBackground.test.jsx`

**Interfaces:**
- Consumes: `usePrefersReducedMotion`.
- Produces: three decorative layer components, each accepting `className`. All three render `aria-hidden="true"` and `pointer-events: none`.

- [ ] **Step 1: Write the failing test**

Create `src/components/ui/AuroraBackground.test.jsx`:

```jsx
import { render } from '@testing-library/react';
import AuroraBackground from './AuroraBackground';

beforeEach(() => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
  window.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  }));
});

test('is hidden from assistive technology', () => {
  const { container } = render(<AuroraBackground />);
  expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
});

test('does not capture pointer events', () => {
  const { container } = render(<AuroraBackground />);
  expect(container.firstChild.className).toMatch(/pointer-events-none/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
CI=true npx react-scripts test --testPathPattern AuroraBackground
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement AuroraBackground**

Create `src/components/ui/AuroraBackground.jsx`. Three radial gradient blobs on
one blurred, composited layer, animated by CSS `transform` only, paused when
off-screen:

```jsx
import React, { useEffect, useRef, useState } from 'react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const AuroraBackground = ({ className = '' }) => {
  const prefersReduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '10%' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const animating = visible && !prefersReduced;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="absolute -left-[15%] -top-[20%] h-[70vmax] w-[70vmax] rounded-full opacity-60 blur-[90px] will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgb(var(--aurora-1)) 0%, transparent 65%)',
          animation: animating ? 'aurora-drift-a 28s ease-in-out infinite' : 'none',
        }}
      />
      <div
        className="absolute -right-[10%] top-[10%] h-[60vmax] w-[60vmax] rounded-full opacity-50 blur-[100px] will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgb(var(--aurora-2)) 0%, transparent 65%)',
          animation: animating ? 'aurora-drift-b 34s ease-in-out infinite' : 'none',
        }}
      />
      <div
        className="absolute bottom-[-25%] left-[25%] h-[55vmax] w-[55vmax] rounded-full opacity-30 blur-[110px] will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgb(var(--accent)) 0%, transparent 70%)',
          animation: animating ? 'aurora-drift-c 41s ease-in-out infinite' : 'none',
        }}
      />
    </div>
  );
};

export default AuroraBackground;
```

Add the keyframes to `src/index.css`, outside any `@layer`:

```css
@keyframes aurora-drift-a {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50%      { transform: translate3d(6vw, 4vh, 0) scale(1.12); }
}
@keyframes aurora-drift-b {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1.05); }
  50%      { transform: translate3d(-7vw, 5vh, 0) scale(0.92); }
}
@keyframes aurora-drift-c {
  0%, 100% { transform: translate3d(0, 0, 0) scale(0.95); }
  50%      { transform: translate3d(4vw, -6vh, 0) scale(1.15); }
}
```

Light mode needs the aurora dialled right down, per the spec. Add to `index.css`:

```css
:root:not(.dark) .aurora-layer {
  opacity: 0.35;
}
```

and add `aurora-layer` to the root `className` of the component.

- [ ] **Step 4: Run the test to verify it passes**

```bash
CI=true npx react-scripts test --testPathPattern AuroraBackground
```

Expected: PASS, 2 tests.

- [ ] **Step 5: Implement Grain**

Create `src/components/ui/Grain.jsx`. An inline SVG `feTurbulence` as a data URI
means no network request and no extra asset:

```jsx
import React from 'react';

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.42'/%3E%3C/svg%3E\")";

const Grain = ({ className = '' }) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none fixed inset-0 z-[3] opacity-[0.05] mix-blend-overlay ${className}`}
    style={{ backgroundImage: NOISE, backgroundRepeat: 'repeat' }}
  />
);

export default Grain;
```

- [ ] **Step 6: Implement Spotlight**

Create `src/components/ui/Spotlight.jsx`. A fine dot grid revealed by a radial
mask that follows the pointer. It writes to `MotionValue`s, so pointer movement
never re-renders React:

```jsx
import React from 'react';
import * as motionReact from 'motion/react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const { motion, useMotionValue, useMotionTemplate, useSpring } = motionReact;

const Spotlight = ({ className = '' }) => {
  const prefersReduced = usePrefersReducedMotion();
  const rawX = useMotionValue(-500);
  const rawY = useMotionValue(-500);
  const x = useSpring(rawX, { stiffness: 120, damping: 25, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 120, damping: 25, mass: 0.6 });

  const mask = useMotionTemplate`radial-gradient(280px circle at ${x}px ${y}px, #000 0%, transparent 70%)`;

  if (prefersReduced) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      onPointerMove={undefined}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(rgb(var(--ink) / 0.35) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
    </div>
  );
};

export const useSpotlightTracking = (rawX, rawY) => (event) => {
  const bounds = event.currentTarget.getBoundingClientRect();
  rawX.set(event.clientX - bounds.left);
  rawY.set(event.clientY - bounds.top);
};

export default Spotlight;
```

The parent section attaches the pointer handler, because the spotlight layer
itself must stay `pointer-events: none`. Task 11 wires this up in the hero.

- [ ] **Step 7: Verify the build**

```bash
npm run build
```

Expected: no warnings.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
feat: add aurora, spotlight and grain depth layers

Three decorative layers forming the z0/z1/z3 stack. The aurora is CSS
radial gradients on a blurred composited layer that pauses when
off-screen; the spotlight writes to MotionValues so pointer movement
never re-renders React. All three are aria-hidden and non-interactive.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

### Task 8: GlassPanel and TiltCard

**Files:**
- Create: `src/components/ui/GlassPanel.jsx`
- Create: `src/components/ui/TiltCard.jsx`
- Test: `src/components/ui/TiltCard.test.jsx`

**Interfaces:**
- Consumes: `usePrefersReducedMotion`. (TiltCard declares its own stiffer spring inline rather than reusing `springs`, because tilt needs to settle faster than page entrances.)
- Produces:
  - `<GlassPanel as="div" className="">{children}</GlassPanel>`
  - `<TiltCard className="" maxTilt={9}>{children}</TiltCard>`

- [ ] **Step 1: Write the failing test**

Create `src/components/ui/TiltCard.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import TiltCard from './TiltCard';

const setReducedMotion = (matches) => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
};

test('renders its children', () => {
  setReducedMotion(false);
  render(<TiltCard>card body</TiltCard>);
  expect(screen.getByText('card body')).toBeInTheDocument();
});

test('still renders content when the user prefers reduced motion', () => {
  setReducedMotion(true);
  render(<TiltCard>card body</TiltCard>);
  expect(screen.getByText('card body')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
CI=true npx react-scripts test --testPathPattern TiltCard
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement GlassPanel**

Create `src/components/ui/GlassPanel.jsx`:

```jsx
import React from 'react';

const GlassPanel = ({ as: Component = 'div', className = '', children, ...rest }) => (
  <Component
    className={`relative rounded-3xl border border-hairline bg-surface shadow-[0_20px_60px_-20px_rgb(0_0_0/0.45)] backdrop-blur-xl backdrop-saturate-150 ${className}`}
    {...rest}
  >
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-3xl opacity-60"
      style={{
        background:
          'linear-gradient(140deg, rgb(var(--ink) / 0.14), transparent 40%, transparent 60%, rgb(var(--ink) / 0.06))',
        maskImage: 'linear-gradient(#000, #000)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        padding: '1px',
      }}
    />
    {children}
  </Component>
);

export default GlassPanel;
```

- [ ] **Step 4: Implement TiltCard**

Create `src/components/ui/TiltCard.jsx`. Pointer-driven rotation on springs,
plus a specular highlight tracking the cursor:

```jsx
import React from 'react';
import * as motionReact from 'motion/react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const { motion, useMotionValue, useMotionTemplate, useSpring, useTransform } = motionReact;

const TiltCard = ({ className = '', maxTilt = 9, children }) => {
  const prefersReduced = usePrefersReducedMotion();

  // Normalised pointer position within the card, -0.5 .. 0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [maxTilt, -maxTilt]), {
    stiffness: 260,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-maxTilt, maxTilt]), {
    stiffness: 260,
    damping: 24,
  });

  const glare = useMotionTemplate`radial-gradient(500px circle at ${glareX}% ${glareY}%, rgb(var(--ink) / 0.16), transparent 55%)`;

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - bounds.left) / bounds.width;
    const relY = (event.clientY - bounds.top) / bounds.height;
    px.set(relX - 0.5);
    py.set(relY - 0.5);
    glareX.set(relX * 100);
    glareY.set(relY * 100);
  };

  const handlePointerLeave = () => {
    px.set(0);
    py.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`relative ${className}`}
    >
      {children}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{ backgroundImage: glare }}
      />
    </motion.div>
  );
};

export default TiltCard;
```

- [ ] **Step 5: Run the test to verify it passes**

```bash
CI=true npx react-scripts test --testPathPattern TiltCard
```

Expected: PASS, 2 tests.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
feat: add GlassPanel and TiltCard surface primitives

GlassPanel provides the blurred surface with a gradient hairline border.
TiltCard adds pointer-driven 3D rotation on springs with a specular
highlight, driven entirely by MotionValues.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

# Phase 3 — Content and assets

### Task 9: Extract content to `src/data/`

**Files:**
- Create: `src/data/profile.js`, `src/data/skills.js`, `src/data/projects.js`, `src/data/experience.js`, `src/data/interests.js`
- Modify: the corresponding components to import from these modules

**Interfaces:**
- Consumes: nothing.
- Produces: named exports `profile`, `facts`, `socials`, `skillGroups`, `projects`, `experiences`, `interestGroups`. Task 14 relies on each `projects[]` entry having a `repo` field.

- [ ] **Step 1: Move the existing arrays verbatim**

Move each array to a named export, keeping the icon imports alongside the data:

| From | To | Export |
|---|---|---|
| `About.js` → `facts` | `src/data/profile.js` | `facts` |
| `LandingPage.js` → `socials` | `src/data/profile.js` | `socials` |
| `Skills.js` → `skillGroups` | `src/data/skills.js` | `skillGroups` |
| `Projects.js` → `projects` | `src/data/projects.js` | `projects` |
| `Experience.js` → `experiences` | `src/data/experience.js` | `experiences` |
| `Interests.js` → `interestGroups` | `src/data/interests.js` | `interestGroups` |

**Do not change any copy** — this is a move, not a rewrite.

- [ ] **Step 2: Add repo slugs to the project data**

In `src/data/projects.js`, extend each project with the fields Task 14 needs:

```js
export const projects = [
  {
    title: 'Matching Project Allocation System',
    repo: 'Guildb/AI_Based_Project_Allocation',
    demo: null,
    description:
      'This was my final year project, where I developed an application to automate a manual process at my university. The web application allowed students to add their idea for the final year project and automatically be assigned a tutor, and the tutor could suggest projects for students.',
    tech: [
      /* ...unchanged icon entries... */
    ],
  },
  {
    title: '3DPrinting',
    repo: 'Guildb/COM519_3dprintings',
    demo: null,
    description:
      'Managing 3D printing orders as part of a university project that gives you access to each order and the file that needs to be printed.',
    tech: [
      /* ...unchanged icon entries... */
    ],
  },
];
```

Both repo slugs were confirmed against the GitHub API during planning.

- [ ] **Step 3: Create `src/data/profile.js`**

```js
export const profile = {
  name: 'Renato Cardoso',
  role: 'Web Support Engineer at ICAAL',
  discipline: 'Software Engineer',
  location: 'Southampton, UK',
  email: 'renatoscardoso@outlook.com',
  phone: '+44 7576623476',
  github: 'https://github.com/Guildb',
  linkedin: 'https://www.linkedin.com/in/renato-cardoso-1b94ba152/',
};
```

- [ ] **Step 4: Verify nothing was lost in the move**

```bash
npm run build
CI=true npx react-scripts test --watchAll=false
```

Expected: build clean, tests pass. Then run `npm start` and confirm every
section still shows the same content it did before.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
refactor: extract content into src/data modules

Section components become presentational. Adds repo slugs to project
entries for the GitHub metadata fetch.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

### Task 10: Image pipeline

**Files:**
- Create: `scripts/optimize-images.sh`
- Delete: `public/profile.png`
- Add: `public/dark-background.webp`, `public/light-background.webp`, `public/profile-web.webp`
- Modify: `src/components/ProfilePicture.js`

**Interfaces:**
- Consumes: nothing.
- Produces: WebP variants alongside the existing JPEGs, so components can use `<picture>` with a JPEG fallback.

- [ ] **Step 1: Record the current payload, so the improvement is measurable**

```bash
du -ch public/*.jpg public/*.png | tail -1
```

Expected: roughly 17MB. Write the exact number down.

- [ ] **Step 2: Write the conversion script**

Create `scripts/optimize-images.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

# Backgrounds are used as full-bleed CSS layers; 1920px wide is ample.
# The originals are 4000x3000 and 3577x2370, which is print resolution.
cwebp -q 72 -resize 1920 0 public/dark-background.jpg  -o public/dark-background.webp
cwebp -q 72 -resize 1920 0 public/light-background.jpg -o public/light-background.webp

# The portrait is displayed at ~240px wide; 640px covers 2x displays.
cwebp -q 82 public/profile-web.jpg -o public/profile-web.webp

echo "--- resulting sizes ---"
ls -lh public/*.webp
```

- [ ] **Step 3: Run it**

```bash
chmod +x scripts/optimize-images.sh
./scripts/optimize-images.sh
```

Expected: each background WebP is comfortably under 200KB.
**If either exceeds 200KB, lower `-q` to 65 and re-run** before continuing.

- [ ] **Step 4: Shrink the JPEG fallbacks too**

The oversized JPEGs are still shipped as `<picture>` fallbacks, so they must
shrink as well:

```bash
sips --resampleWidth 1920 public/dark-background.jpg  --out public/dark-background.jpg
sips --resampleWidth 1920 public/light-background.jpg --out public/light-background.jpg
```

- [ ] **Step 5: Delete the unused 11MB original**

```bash
git rm public/profile.png
```

It is referenced nowhere in `src/` — the site uses `profile-web.jpg`. It remains
recoverable from git history.

- [ ] **Step 6: Serve the portrait as `<picture>` with explicit dimensions**

Replace `src/components/ProfilePicture.js` with:

```jsx
import React from 'react';

const ProfilePicture = () => (
  <div className="relative">
    <div
      aria-hidden="true"
      className="absolute -inset-3 rounded-full bg-gradient-to-tr from-aurora1 via-aurora2 to-accent opacity-60 blur-2xl"
    />
    <picture>
      <source srcSet={`${process.env.PUBLIC_URL}/profile-web.webp`} type="image/webp" />
      <img
        className="relative w-60 rounded-full border-4 border-hairline object-cover object-top shadow-2xl"
        src={`${process.env.PUBLIC_URL}/profile-web.jpg`}
        alt="Renato Cardoso"
        width="640"
        height="1336"
        loading="lazy"
        decoding="async"
      />
    </picture>
  </div>
);

export default ProfilePicture;
```

`width`/`height` are the intrinsic pixel dimensions; CSS still sizes it to
`w-60`. Supplying them prevents layout shift. The portrait is below the fold, so
`loading="lazy"` is correct here — the hero image in Task 11 must **not** be
lazy-loaded, as it is the LCP candidate.

- [ ] **Step 7: Verify the payload dropped**

```bash
du -ch public/*.jpg public/*.webp | tail -1
npm run build
```

Expected: total well under 600KB, versus the ~17MB recorded in Step 1. Build
clean.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
perf: compress images and drop the unused 11MB original

Backgrounds were shipping at 4000x3000 print resolution. Resize to 1920w
and add WebP variants with JPEG fallbacks; delete the unreferenced
profile.png. Adds explicit dimensions to prevent layout shift.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

# Phase 4 — Sections

From here the redesign becomes visible. Each task restyles one section using the
primitives from Phase 2 and the data from Task 9.

### Task 11: Hero

**Files:**
- Modify: `src/components/LandingPage.js`
- Test: `src/components/LandingPage.test.jsx`

**Interfaces:**
- Consumes: `AuroraBackground`, `Spotlight`, `GlassPanel`, `springs`, `usePrefersReducedMotion`, `profile`, `socials`.
- Produces: the `#hero` landmark that `useActiveSection` (Task 19) observes.

- [ ] **Step 1: Write the failing test**

Create `src/components/LandingPage.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import LandingPage from './LandingPage';

beforeEach(() => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
  window.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  }));
});

test('renders the name as the page heading', () => {
  render(<LandingPage />);
  expect(
    screen.getByRole('heading', { level: 1, name: /renato cardoso/i })
  ).toBeInTheDocument();
});

test('offers the CV download and both social links', () => {
  render(<LandingPage />);
  expect(screen.getByLabelText(/download cv/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/github/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/linkedin/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
CI=true npx react-scripts test --testPathPattern LandingPage
```

Expected: FAIL — the current hero renders the name inside a `<h1>` split across
a `<span>`, and `getByRole` with the full accessible name will not match until
the markup is rebuilt in Step 3.

- [ ] **Step 3: Rebuild the hero**

Structure, from back to front:

1. `<AuroraBackground />` fixed to the section.
2. The background photo as a `<picture>` at low opacity — this is the "earn it"
   treatment from the spec: a textured layer *beneath* the aurora, not a
   full-bleed wash. It is the LCP candidate, so it takes `fetchpriority="high"`
   and must **not** be lazy-loaded.
3. `<Spotlight />`, with the pointer handler attached to the **section**, not the
   spotlight itself.
4. A `<GlassPanel>` holding the eyebrow, `<h1>`, role line, intro copy, the two
   CTAs and the social row.

The `<h1>` animates per word. Split on spaces and map each word to a
`motion.span` with `variants={revealUp}`, inside a container carrying
`variants={revealStagger}`. **Keep the whole name in a single `<h1>`** so the
accessible name stays "Renato Cardoso" — wrap each word in an `aria-hidden`
span and provide the plain text via a visually-hidden sibling if the split
markup interferes with the accessible name.

Scroll response, using JS rather than CSS scroll timelines:

```jsx
const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
const panelY = useTransform(scrollYProgress, [0, 1], [0, -80]);
const panelOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
const panelBlur = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(8px)']);
```

Apply these to the `GlassPanel` wrapper via `style={{ y: panelY, opacity: panelOpacity, filter: panelBlur }}`.
Gate all of it behind `usePrefersReducedMotion()` — when reduced, pass no
`style` at all.

The section root gets `id="hero"` and `className="relative min-h-screen overflow-hidden"`.

- [ ] **Step 4: Run the test to verify it passes**

```bash
CI=true npx react-scripts test --testPathPattern LandingPage
```

Expected: PASS, 2 tests.

- [ ] **Step 5: Look at it**

Run `npm start`, and check: the aurora drifts, the spotlight tracks the pointer,
the name staggers in on load, and scrolling lifts and blurs the panel. Toggle to
light mode and confirm the aurora is subdued rather than garish.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
feat: rebuild the hero with the layered depth stack

Aurora, background photo, spotlight and glass panel now form four
distinct layers. The name reveals per word on a spring stagger and the
panel lifts and blurs against scroll progress.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

### Task 11b: Retire the pattern-SVG page background

**Files:**
- Modify: `src/components/Profile.js`
- Delete: `public/dark-pattern.svg`, `public/light-pattern.svg`, `public/wave.svg`

**Interfaces:**
- Consumes: `AuroraBackground`, `Grain` from Task 7.
- Produces: the shared page shell that wraps all six content sections.

`Profile.js` currently sets an inline `backgroundImage` pointing at
`dark-pattern.svg` / `light-pattern.svg` (38KB each). The aurora replaces them;
without this task they would sit underneath it, muddying the depth stack.

- [ ] **Step 1: Replace the patterned shell with the depth stack**

Rewrite `src/components/Profile.js` so the wrapper carries no `backgroundImage`
and instead hosts one fixed aurora plus the grain overlay behind all sections:

```jsx
import React from 'react';
import About from './About';
import ContactInfo from './ContactInfo';
import Interests from './Interests';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import AuroraBackground from './ui/AuroraBackground';
import Grain from './ui/Grain';

const sections = [
  { id: 'about', Component: About, deferred: false },
  { id: 'skills', Component: Skills, deferred: true },
  { id: 'projects', Component: Projects, deferred: true },
  { id: 'experience', Component: Experience, deferred: true },
  { id: 'interests', Component: Interests, deferred: true },
  { id: 'contact-info', Component: ContactInfo, deferred: true },
];

const Profile = () => (
  <div className="relative bg-canvas">
    <AuroraBackground className="fixed" />
    <Grain />
    <div className="relative z-[2] container mx-auto px-4">
      {sections.map(({ id, Component, deferred }) => (
        <section
          key={id}
          id={id}
          aria-labelledby={`${id}-heading`}
          className={`scroll-mt-20 ${deferred ? 'deferred-section' : ''}`}
        >
          <Component />
        </section>
      ))}
    </div>
  </div>
);

export default Profile;
```

- [ ] **Step 1b: Give `SectionHeading` an `id` prop**

`aria-labelledby` above points at `${id}-heading`, so that element must exist.
No other task adds it. Update `src/components/SectionHeading.js` to accept and
forward `id` onto its `<h2>`:

```jsx
const SectionHeading = ({ id, eyebrow, title }) => (
  <div className="text-center mb-12">
    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
      {eyebrow}
    </span>
    <h2 id={id} className="font-display text-section font-bold mt-2">
      {title}
    </h2>
    <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-aurora1 to-aurora2" />
  </div>
);
```

Then update each of the six section components to pass it —
`<SectionHeading id="about-heading" ... />`, `id="skills-heading"`, and so on,
matching the ids in the `sections` array above exactly.

Verify every landmark resolves:

```bash
for s in about skills projects experience interests contact-info; do
  grep -q "${s}-heading" src/components/*.js && echo "OK: $s" || echo "MISSING: $s";
done
```

Expected: six `OK` lines.

Note that `deferred` here is what Task 20 Step 2 relies on — `about` is
excluded because it can be partly visible on tall screens.

- [ ] **Step 2: Delete the now-unused pattern assets**

```bash
git rm public/dark-pattern.svg public/light-pattern.svg public/wave.svg
grep -rn "pattern.svg\|wave.svg" src/ public/ || echo "OK: no references remain"
```

`wave.svg` is referenced nowhere in the codebase and was already dead.

- [ ] **Step 3: Verify**

```bash
npm run build
CI=true npx react-scripts test --watchAll=false
```

Expected: clean build, tests pass. Then load the page and confirm one continuous
aurora sits behind all sections rather than a repeating tile pattern.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
feat: replace the tiled pattern background with the aurora shell

Profile now hosts a single fixed aurora and grain layer behind every
section, and wraps each in a labelled landmark. Deletes the unused
pattern and wave SVGs.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

### Task 12: About

**Files:**
- Modify: `src/components/About.js`

**Interfaces:**
- Consumes: `Reveal`, `GlassPanel`, `ProfilePicture`, `SectionHeading`, `facts` from `src/data/profile.js`.
- Produces: the `#about` landmark.

- [ ] **Step 1: Restyle the section**

Replace the `data-aos` wrappers (already stripped in Task 1) with `<Reveal>`.
The facts list becomes a `<Reveal stagger>` container whose `<li>` children are
`motion.li` with `variants={revealUp}`, so they cascade in. Wrap the long bio in
`<GlassPanel className="p-8">`. Swap every remaining `slate-*` utility for the
tokens from Task 2.

Change the bio paragraph from `text-justify` to `text-pretty` — justified text
on the web produces uneven inter-word rivers with no hyphenation, which
undermines the editorial quality the design is aiming for.

- [ ] **Step 2: Verify**

```bash
npm run build
CI=true npx react-scripts test --watchAll=false
```

Expected: clean build, all tests pass.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
feat: restyle About with glass surfaces and staggered facts

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

### Task 13: Skills

**Files:**
- Modify: `src/components/Skills.js`

**Interfaces:**
- Consumes: `Reveal`, `GlassPanel`, `SectionHeading`, `skillGroups`.
- Produces: the `#skills` landmark.

- [ ] **Step 1: Build the asymmetric grid**

Per the spec, four glass tiles on an asymmetric grid: at `lg`, two wide and two
narrow; single column below `md`. Use `lg:grid-cols-5` with the first and fourth
tiles spanning 3 and the second and third spanning 2, which produces the
asymmetry without a fixed-height masonry.

Each tile is a `<GlassPanel>` with a hover glow (`hover:shadow-[0_0_40px_-8px_rgb(var(--accent)/0.35)]`)
and an accent underline beneath the heading that wipes in from the left on hover
using `transform: scaleX()` with `transform-origin: left`.

Wrap the grid in `<Reveal stagger>` and make each tile a `motion.div` with
`variants={revealUp}`.

- [ ] **Step 2: Verify and commit**

```bash
npm run build
git add -A
git commit -m "$(cat <<'MSG'
feat: restyle Skills as an asymmetric glass grid

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

### Task 14: GitHub repository metadata

**Files:**
- Create: `src/hooks/useGitHubRepos.js`
- Test: `src/hooks/useGitHubRepos.test.js`

**Interfaces:**
- Consumes: `projects` from `src/data/projects.js`.
- Produces: `useGitHubRepos(repoSlugs: string[])` returning
  `{ data: Record<string, { languages: Array<{name: string, percent: number}>, updatedAt: string | null }>, status: 'idle' | 'loading' | 'ready' | 'failed' }`.
  Task 15 consumes this. **Star counts are deliberately absent** — both repos
  have zero stars, and rendering "0" is worse than rendering nothing.

- [ ] **Step 1: Write the failing test**

Create `src/hooks/useGitHubRepos.test.js`:

```jsx
import { render, screen, waitFor } from '@testing-library/react';
import useGitHubRepos from './useGitHubRepos';

const Probe = ({ slugs }) => {
  const { data, status } = useGitHubRepos(slugs);
  return (
    <div>
      <span data-testid="status">{status}</span>
      <span data-testid="langs">
        {(data['owner/repo']?.languages ?? []).map((l) => l.name).join(',')}
      </span>
    </div>
  );
};

beforeEach(() => {
  window.sessionStorage.clear();
  jest.restoreAllMocks();
});

test('reports failed and empty data when the API is unreachable', async () => {
  jest.spyOn(global, 'fetch').mockRejectedValue(new Error('offline'));
  render(<Probe slugs={['owner/repo']} />);
  await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('failed'));
  expect(screen.getByTestId('langs')).toHaveTextContent('');
});

test('reports failed when the API returns a rate-limit error', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({ ok: false, status: 403 });
  render(<Probe slugs={['owner/repo']} />);
  await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('failed'));
});

test('converts language byte counts into descending percentages', async () => {
  jest.spyOn(global, 'fetch').mockImplementation((url) => {
    if (String(url).endsWith('/languages')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ Python: 7500, CSS: 2500 }) });
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve({ pushed_at: '2025-01-01T00:00:00Z' }) });
  });

  render(<Probe slugs={['owner/repo']} />);
  await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('ready'));
  expect(screen.getByTestId('langs')).toHaveTextContent('Python,CSS');
});

test('serves a second render from sessionStorage without refetching', async () => {
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation((url) => {
    if (String(url).endsWith('/languages')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ Python: 100 }) });
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve({ pushed_at: '2025-01-01T00:00:00Z' }) });
  });

  const { unmount } = render(<Probe slugs={['owner/repo']} />);
  await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('ready'));
  const callsAfterFirst = fetchSpy.mock.calls.length;

  unmount();
  render(<Probe slugs={['owner/repo']} />);
  await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('ready'));
  expect(fetchSpy.mock.calls.length).toBe(callsAfterFirst);
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
CI=true npx react-scripts test --testPathPattern useGitHubRepos
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement the hook**

Create `src/hooks/useGitHubRepos.js`:

```js
import { useEffect, useState } from 'react';

const CACHE_KEY = 'github-repo-meta';
const CACHE_TTL_MS = 1000 * 60 * 60 * 6;

const readCache = () => {
  try {
    const raw = window.sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.storedAt > CACHE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
};

const writeCache = (data) => {
  try {
    window.sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ storedAt: Date.now(), data })
    );
  } catch {
    // Storage full or unavailable. The data is still usable this session.
  }
};

const toPercentages = (languageBytes) => {
  const total = Object.values(languageBytes).reduce((sum, n) => sum + n, 0);
  if (!total) return [];
  return Object.entries(languageBytes)
    .map(([name, bytes]) => ({ name, percent: Math.round((bytes / total) * 100) }))
    .sort((a, b) => b.percent - a.percent);
};

const fetchRepo = async (slug) => {
  const [meta, languages] = await Promise.all([
    fetch(`https://api.github.com/repos/${slug}`),
    fetch(`https://api.github.com/repos/${slug}/languages`),
  ]);
  if (!meta.ok || !languages.ok) throw new Error(`GitHub returned ${meta.status}`);
  const [metaJson, languagesJson] = await Promise.all([meta.json(), languages.json()]);
  return {
    languages: toPercentages(languagesJson),
    updatedAt: metaJson.pushed_at ?? null,
  };
};

const useGitHubRepos = (slugs) => {
  const [data, setData] = useState(() => readCache() ?? {});
  const [status, setStatus] = useState(() => (readCache() ? 'ready' : 'idle'));
  const key = slugs.join(',');

  useEffect(() => {
    if (readCache()) {
      setStatus('ready');
      return undefined;
    }

    let cancelled = false;
    setStatus('loading');

    Promise.all(slugs.map((slug) => fetchRepo(slug).then((value) => [slug, value])))
      .then((entries) => {
        if (cancelled) return;
        const next = Object.fromEntries(entries);
        writeCache(next);
        setData(next);
        setStatus('ready');
      })
      .catch(() => {
        if (cancelled) return;
        // Rate limit, network failure or a renamed repo. The cards render
        // from static data; this enrichment is strictly additive.
        setData({});
        setStatus('failed');
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { data, status };
};

export default useGitHubRepos;
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
CI=true npx react-scripts test --testPathPattern useGitHubRepos
```

Expected: PASS, 4 tests.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
feat: fetch GitHub language and recency metadata

Caches in sessionStorage for six hours and falls back silently to static
project data on rate limits or network failure. Star counts are
deliberately not fetched.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

### Task 15: Projects

**Files:**
- Modify: `src/components/Projects.js`
- Test: `src/components/Projects.test.jsx`

**Interfaces:**
- Consumes: `TiltCard`, `GlassPanel`, `Reveal`, `SectionHeading`, `projects`, `useGitHubRepos`.
- Produces: the `#projects` landmark.

- [ ] **Step 1: Write the failing test**

Create `src/components/Projects.test.jsx`:

```jsx
import { render, screen, waitFor } from '@testing-library/react';
import Projects from './Projects';

beforeEach(() => {
  window.sessionStorage.clear();
  window.matchMedia = jest.fn().mockReturnValue({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
});

test('renders every project even when GitHub is unreachable', async () => {
  jest.spyOn(global, 'fetch').mockRejectedValue(new Error('offline'));
  render(<Projects />);

  expect(screen.getByText(/Matching Project Allocation System/i)).toBeInTheDocument();
  expect(screen.getByText(/3DPrinting/i)).toBeInTheDocument();

  await waitFor(() =>
    expect(screen.getAllByRole('link', { name: /view .* on github/i })).toHaveLength(2)
  );
});

test('never renders a star count', async () => {
  jest.spyOn(global, 'fetch').mockRejectedValue(new Error('offline'));
  render(<Projects />);
  await waitFor(() => expect(screen.queryByText('★')).not.toBeInTheDocument());
});
```

The first test is the critical one: it proves the offline fallback path works,
which is a requirement from the spec.

- [ ] **Step 2: Run the test to verify it fails**

```bash
CI=true npx react-scripts test --testPathPattern Projects
```

Expected: FAIL — no repo links exist in the current markup.

- [ ] **Step 3: Rebuild the cards**

Each project becomes a `<TiltCard>` wrapping a `<GlassPanel>`. Inside:

- Title, description, tech chips (as now, restyled to tokens).
- A repo link: `aria-label={`View ${project.title} on GitHub`}`, always
  rendered, since the slug is static and does not depend on the fetch.
- A demo link, rendered only when `project.demo` is non-null.
- When `status === 'ready'` and language data exists, a segmented language bar:
  one `<span>` per language, width set to its percentage, coloured with accent
  and aurora tokens at varying opacity. Add a text equivalent for screen readers
  (`Python 75%, CSS 25%`) rather than relying on colour alone.
- When `status === 'ready'` and `updatedAt` is set, a recency line rendered with
  `Intl.RelativeTimeFormat`.
- When `status` is `failed` or `loading`, render **nothing** in place of these —
  no error message, no skeleton that never resolves. The enrichment is additive.

- [ ] **Step 4: Run the test to verify it passes**

```bash
CI=true npx react-scripts test --testPathPattern Projects
```

Expected: PASS, 2 tests.

- [ ] **Step 5: Verify the offline path in a real browser**

Run `npm start`, open DevTools, set the network to offline, and reload. The
project cards must render completely, with links, and no visible error.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
feat: rebuild project cards with 3D tilt and live language data

Cards tilt toward the pointer with a tracking specular highlight. GitHub
language breakdown and recency are additive enrichment; cards render
fully with no network at all.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

### Task 16: Experience timeline

**Files:**
- Modify: `src/components/Experience.js`
- Test: `src/components/Experience.test.jsx`

**Interfaces:**
- Consumes: `GlassPanel`, `Reveal`, `springs`, `experiences`, `usePrefersReducedMotion`.
- Produces: the `#experience` landmark. `react-vertical-timeline-component` is gone.

- [ ] **Step 1: Write the failing test**

Create `src/components/Experience.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import Experience from './Experience';

beforeEach(() => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
});

test('renders every role in reverse-chronological order', () => {
  render(<Experience />);
  const headings = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
  expect(headings).toEqual([
    'Web Support Engineer',
    'Front-End/Vue.js',
    'Undergraduate Degree',
    'DevOps/React',
  ]);
});

test('marks the current role', () => {
  render(<Experience />);
  expect(screen.getByText(/present/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
CI=true npx react-scripts test --testPathPattern Experience
```

Expected: FAIL — the library renders headings differently, and its CSS import
will already have been removed.

- [ ] **Step 3: Build the custom timeline**

Remove the `react-vertical-timeline-component` import and its
`style.min.css` import entirely. Structure:

- An outer `<div ref={timelineRef} className="relative">`.
- A track: a 2px absolutely-positioned line, centred at `lg` and left-aligned
  below it.
- A fill: a `motion.div` over the track whose `scaleY` is bound to scroll:

```jsx
const { scrollYProgress } = useScroll({
  target: timelineRef,
  offset: ['start 0.8', 'end 0.4'],
});
const fillScale = useSpring(scrollYProgress, springs.soft);
// style={{ scaleY: fillScale, transformOrigin: 'top' }}
```

Gradient the fill from `aurora1` to `aurora2`.

- Each entry is a `<Reveal>`-wrapped `<GlassPanel>` with an icon node positioned
  on the track. The current role's node uses the accent gradient and carries the
  "Present" pill.
- When reduced motion is active, render the fill at `scaleY: 1` statically.

Each role title must be an `<h3>` for the test above to pass.

- [ ] **Step 4: Run the test to verify it passes**

```bash
CI=true npx react-scripts test --testPathPattern Experience
```

Expected: PASS, 2 tests.

- [ ] **Step 4b: Uninstall the timeline library**

Task 1 deliberately left this installed because `Experience.js` still imported
it. Step 3 removed that import, so the package can go now:

```bash
npm uninstall react-vertical-timeline-component
grep -rn "react-vertical-timeline" src/ || echo "OK: no references remain"
npm run build
```

Expected: `OK: no references remain`, and a clean build.

- [ ] **Step 5: Remove the now-dead timeline CSS override**

Delete the `.vertical-timeline::before` rule from `src/index.css` — it targeted
the removed library.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
feat: replace the timeline library with a scroll-drawn timeline

The connecting line now draws itself against scroll progress, which the
previous library could not do. Removes react-vertical-timeline-component
and its bundled stylesheet.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

### Task 17: Interests

**Files:**
- Modify: `src/components/Interests.js`

**Interfaces:**
- Consumes: `Reveal`, `GlassPanel`, `SectionHeading`, `interestGroups`.
- Produces: the `#interests` landmark.

- [ ] **Step 1: Restyle**

Two `<GlassPanel>` tiles inside a `<Reveal stagger>`. Each list item's icon badge
gets a playful micro-animation on hover — `whileHover={{ rotate: -8, scale: 1.12 }}`
with `springs.snappy`. Keep it to the icon only; the row itself should not move.

- [ ] **Step 2: Verify and commit**

```bash
npm run build
git add -A
git commit -m "$(cat <<'MSG'
feat: restyle Interests with playful icon micro-interactions

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

### Task 18: Contact form

**Files:**
- Modify: `src/components/ContactInfo.js`
- Test: `src/components/ContactInfo.test.jsx`

**Interfaces:**
- Consumes: `GlassPanel`, `Reveal`, `SectionHeading`, `@emailjs/browser`, `profile`.
- Produces: the `#contact-info` landmark.

- [ ] **Step 1: Write the failing test**

Create `src/components/ContactInfo.test.jsx`:

```jsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import emailjs from '@emailjs/browser';
import ContactInfo from './ContactInfo';

jest.mock('@emailjs/browser', () => ({ __esModule: true, default: { send: jest.fn() } }));

beforeEach(() => {
  jest.clearAllMocks();
  window.matchMedia = jest.fn().mockReturnValue({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
});

const fillForm = async (user) => {
  await user.type(screen.getByLabelText(/name/i), 'Ada');
  await user.type(screen.getByLabelText(/email/i), 'ada@example.com');
  await user.type(screen.getByLabelText(/message/i), 'Hello there');
};

test('confirms success without reloading the page and clears the form', async () => {
  emailjs.send.mockResolvedValue({ status: 200 });
  const user = userEvent.setup();
  render(<ContactInfo />);

  await fillForm(user);
  await user.click(screen.getByRole('button', { name: /send message/i }));

  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/sent/i));
  expect(screen.getByLabelText(/name/i)).toHaveValue('');
});

test('keeps the entered values when sending fails', async () => {
  emailjs.send.mockRejectedValue(new Error('nope'));
  const user = userEvent.setup();
  render(<ContactInfo />);

  await fillForm(user);
  await user.click(screen.getByRole('button', { name: /send message/i }));

  await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
  expect(screen.getByLabelText(/name/i)).toHaveValue('Ada');
});

test('disables the submit button only while a request is in flight', async () => {
  let resolveSend;
  emailjs.send.mockReturnValue(new Promise((resolve) => { resolveSend = resolve; }));
  const user = userEvent.setup();
  render(<ContactInfo />);

  const button = screen.getByRole('button', { name: /send message/i });
  expect(button).toBeEnabled();

  await fillForm(user);
  await user.click(button);
  await waitFor(() => expect(button).toBeDisabled());

  resolveSend({ status: 200 });
  await waitFor(() => expect(screen.getByRole('status')).toBeInTheDocument());
});
```

The third test encodes guidance from `modern-web-guidance`: the button stays
**enabled** at rest, so clicking it lets the browser trigger `:user-invalid` and
focus the first invalid field. It is disabled only during flight, to prevent
double-submission.

- [ ] **Step 2: Run the test to verify it fails**

```bash
CI=true npx react-scripts test --testPathPattern ContactInfo
```

Expected: FAIL — the component currently imports `emailjs-com` and calls
`window.location.reload()`.

- [ ] **Step 3: Rebuild the component**

- Import from `@emailjs/browser` and call `emailjs.send(serviceId, templateId, params, publicKey)` — the existing IDs are unchanged.
- Replace the three notification `useState`s with one: `const [status, setStatus] = useState('idle')`, where status is `'idle' | 'sending' | 'sent' | 'error'`.
- Fix `phone: null` to `phone: ''`, which removes the controlled/uncontrolled React warning.
- Fix `stroke-linecap`, `stroke-linejoin` and `stroke-width` to `strokeLinecap`, `strokeLinejoin` and `strokeWidth` on both status SVGs.
- **Delete both `window.location.reload()` calls.** On success, call `setFormData` back to empty strings and set status to `'sent'`. On failure, leave `formData` untouched and set `'error'`.
- Render the success confirmation in a container with `role="status"`, and the error in one with `role="alert"`.
- Add `required` to name, email and message; leave phone optional.
- Style validity with `:user-invalid`, which is Baseline widely available:

```css
/* in src/index.css */
@layer components {
  .field-input:user-invalid {
    border-color: rgb(var(--accent));
  }
  .field-input:user-invalid ~ .field-error {
    display: block;
  }
  .field-error {
    display: none;
  }
}
```

- **Bridge the visual state to assistive technology.** `:user-invalid` does not
  set ARIA. Add an `onBlur` handler on each input:

```jsx
const syncAriaInvalid = (event) => {
  const input = event.target;
  input.setAttribute('aria-invalid', input.matches(':user-invalid') ? 'true' : 'false');
};
```

  and clear it on `onInput` once the field becomes valid. Point each input at its
  message with `aria-errormessage`, and pair the message with a non-colour
  indicator (an icon plus text), never colour alone.

- [ ] **Step 4: Run the test to verify it passes**

```bash
CI=true npx react-scripts test --testPathPattern ContactInfo
```

Expected: PASS, 3 tests.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
feat: rebuild the contact form around an explicit state machine

Replaces the page reload on submit with in-place success and error
states. Adds :user-invalid validation with an aria-invalid bridge, fixes
the uncontrolled phone input and the invalid SVG attribute casing.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

# Phase 5 — Chrome and polish

### Task 19: Navigation and scroll rail

**Files:**
- Create: `src/hooks/useActiveSection.js`
- Create: `src/components/ui/ScrollRail.jsx`
- Modify: `src/components/Header.js`, `src/components/BackToTopButton.js`
- Test: `src/hooks/useActiveSection.test.js`

**Interfaces:**
- Consumes: section ids `hero`, `about`, `skills`, `projects`, `experience`, `interests`, `contact-info` from Tasks 11–18.
- Produces: `useActiveSection(ids: string[]): string` — the id currently in view.

- [ ] **Step 1: Write the failing test**

Create `src/hooks/useActiveSection.test.js`:

```jsx
import { render, screen, act } from '@testing-library/react';
import useActiveSection from './useActiveSection';

const Probe = ({ ids }) => <span data-testid="active">{useActiveSection(ids)}</span>;

let observerCallback;

beforeEach(() => {
  window.IntersectionObserver = jest.fn().mockImplementation((cb) => {
    observerCallback = cb;
    return { observe: jest.fn(), disconnect: jest.fn(), unobserve: jest.fn() };
  });
  document.body.innerHTML = '<div id="one"></div><div id="two"></div>';
});

test('starts on the first id', () => {
  render(<Probe ids={['one', 'two']} />);
  expect(screen.getByTestId('active')).toHaveTextContent('one');
});

test('follows the most visible section', () => {
  render(<Probe ids={['one', 'two']} />);
  act(() => {
    observerCallback([
      { target: document.getElementById('one'), isIntersecting: false, intersectionRatio: 0 },
      { target: document.getElementById('two'), isIntersecting: true, intersectionRatio: 0.9 },
    ]);
  });
  expect(screen.getByTestId('active')).toHaveTextContent('two');
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
CI=true npx react-scripts test --testPathPattern useActiveSection
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement the hook**

Create `src/hooks/useActiveSection.js`:

```js
import { useEffect, useState } from 'react';

const useActiveSection = (ids) => {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join(',');

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!elements.length) return undefined;

    const ratios = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        let best = null;
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        if (best) setActive(best);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
};

export default useActiveSection;
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
CI=true npx react-scripts test --testPathPattern useActiveSection
```

Expected: PASS, 2 tests.

- [ ] **Step 5: Add the sliding nav indicator**

In `Header.js`, wrap the nav items and render a `motion.span` with
`layoutId="nav-indicator"` **inside the active item only**. Framer Motion then
animates it physically between items as the active section changes. Give it
`transition={springs.snappy}`.

Add `aria-current="true"` to the active anchor — the indicator is visual, and
screen readers need the state communicated separately.

- [ ] **Step 6: Build the scroll rail**

Create `src/components/ui/ScrollRail.jsx`: a fixed right-edge track with one dot
per section, plus a fill whose `scaleY` is bound to `useScroll().scrollYProgress`
through `useSpring`. It is decorative, so it takes `aria-hidden="true"` and
`pointer-events-none`; navigation remains the job of the header. Hide it below
`lg` where there is no room.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
feat: add active-section tracking, sliding nav indicator and scroll rail

Replaces react-scroll's spy with an IntersectionObserver hook. The nav
indicator animates between items via a shared layoutId.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

### Task 20: Theme transition, deferred rendering and accessibility pass

**Files:**
- Modify: `src/components/ThemeToggleButton.js`, `src/index.css`, `src/components/Profile.js`

**Interfaces:**
- Consumes: everything above.
- Produces: no new interfaces.

- [ ] **Step 1: Animate the theme change with View Transitions**

In `ThemeToggleButton.js`, add the two imports and the hook call this needs —
`import { flushSync } from 'react-dom';` and
`import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';`, then
`const prefersReduced = usePrefersReducedMotion();` inside the component. Wire
the button's `onClick` to `handleToggle` instead of `toggleTheme`, so supporting
browsers get a crossfade and others switch instantly:

```jsx
const handleToggle = () => {
  if (!document.startViewTransition || prefersReduced) {
    toggleTheme();
    return;
  }
  document.startViewTransition(() => {
    flushSync(() => toggleTheme());
  });
};
```

`flushSync` is imported from `react-dom`; without it React's async rendering
means the DOM has not changed by the time the transition snapshots it.

Add to `src/index.css`:

```css
@media (prefers-reduced-motion: no-preference) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 320ms;
  }
}
```

- [ ] **Step 2: Defer below-the-fold rendering**

Task 11b already tags the right sections with `deferred-section`; this step
defines what that class does. `about` is deliberately excluded because it sits
immediately below the hero and can be partly visible on tall screens — the
guidance is explicit that applying this above the fold hurts rather than helps.

```css
@layer components {
  .deferred-section {
    content-visibility: auto;
    contain-intrinsic-size: auto none auto 900px;
  }
}
```

Confirm the class lands on `skills`, `projects`, `experience`, `interests` and
`contact-info` only:

```bash
grep -n "deferred: true" src/components/Profile.js | wc -l
```

Expected: `5`.

- [ ] **Step 3: Verify keyboard reachability across the deferred boundaries**

This is mandatory, not optional: `content-visibility: auto` can drop off-screen
nodes out of sequential navigation in some configurations. Load the page and
press Tab repeatedly from the top, confirming focus reaches every link, the
whole contact form and the submit button, without skipping a section.

If any section is skipped, remove `deferred-section` from it and note why. A
working tab order beats a rendering optimisation.

- [ ] **Step 4: Check contrast in both themes**

Glass surfaces reduce effective contrast, so this must be measured rather than
assumed. Using DevTools, sample body text, muted text and accent-on-surface in
both themes. Every one must reach **4.5:1**. If `--muted` fails in light mode,
darken it until it passes and update the token.

- [ ] **Step 5: Confirm decorative layers are hidden**

```bash
grep -rn "aria-hidden" src/components/ui/
```

Expected: `AuroraBackground`, `Spotlight`, `Grain`, `ScrollRail` and the
`TiltCard` glare all appear.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "$(cat <<'MSG'
feat: add view-transition theme change and defer offscreen sections

Theme toggling crossfades where supported and switches instantly
elsewhere. Below-fold sections defer rendering with an intrinsic size to
avoid scroll jumping.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```

---

### Task 21: Final verification

**Files:** none modified unless a defect is found.

This task is a gate, not a formality. Do not report the work complete until
every check below has been run and its output seen.

- [ ] **Step 1: Confirm the smoke test still guards the redesigned markup**

`src/App.test.js` was replaced back in Task 1 (the boilerplate version failed at
baseline). Confirm it still passes against the finished redesign, and that its
assertions are still the ones below — if a later task weakened them, restore
them:

```jsx
import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
  window.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  }));
  jest.spyOn(global, 'fetch').mockRejectedValue(new Error('offline'));
});

test('renders the page heading', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { level: 1, name: /renato cardoso/i })
  ).toBeInTheDocument();
});

test('renders every section landmark', () => {
  render(<App />);
  ['about', 'skills', 'projects', 'experience', 'interests', 'contact-info'].forEach((id) => {
    expect(document.getElementById(id)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Full test suite**

```bash
CI=true npx react-scripts test --watchAll=false
```

Expected: every suite passes. Record the counts.

- [ ] **Step 3: Clean production build**

```bash
npm run build
```

Expected: "Compiled successfully" with **no warnings**. A warning is a failure
here — fix it rather than noting it.

- [ ] **Step 4: Confirm the asset budget**

```bash
du -ch public/*.jpg public/*.webp | tail -1
ls -la public/profile.png 2>/dev/null && echo "FAIL: profile.png still present" || echo "OK: profile.png removed"
```

Expected: total under 600KB, and `profile.png` gone.

- [ ] **Step 5: Confirm the removed dependencies are actually gone**

```bash
grep -E '"(aos|styled-components|react-vertical-timeline-component|react-scroll|emailjs-com)"' package.json && echo "FAIL: stale dependency" || echo "OK: dependencies clean"
grep -rn "data-aos\|darkMode" src/ && echo "FAIL: stale references" || echo "OK: source clean"
```

Expected: both print their OK line.

- [ ] **Step 6: Screenshots**

Start the dev server, then capture with Playwright at **1440×900** and
**390×844**, in **both themes** — eight shots, since the hero and the projects
section are both worth seeing:

- hero, light, desktop
- hero, dark, desktop
- projects, dark, desktop
- experience, dark, desktop
- hero, dark, mobile
- hero, light, mobile
- projects, dark, mobile
- contact, dark, mobile

Look at every one. Check specifically: no horizontal scrollbar at 390px, the
aurora is not banding, glass panels have readable contrast over the aurora, and
nothing overlaps at mobile width.

- [ ] **Step 7: Reduced-motion pass**

In DevTools, enable "Emulate prefers-reduced-motion: reduce" and reload. Confirm:
the aurora is static, the spotlight is absent, cards do not tilt, the timeline
line is fully drawn, and **every piece of content is still present and legible**.

- [ ] **Step 8: Theme persistence**

Toggle to light, reload, and confirm the page comes back light with **no flash
of dark** on first paint. Repeat in the opposite direction.

- [ ] **Step 9: Report, and stop**

Present the screenshots and the verification output to the user. **Do not run
`npm run deploy`.** Deploying is the user's explicit decision.

- [ ] **Step 10: Commit any fixes**

If Steps 1-8 required no changes, there is nothing to commit and the task ends
here. Otherwise:

```bash
git add -A
git commit -m "$(cat <<'MSG'
fix: address defects found in final verification

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
)"
```
