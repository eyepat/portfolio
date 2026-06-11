# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Vite dev server at http://localhost:5173
npm run build    # production build to dist/
npm run lint     # ESLint (must pass; CI-less repo, run before pushing)
npm run preview  # serve the production build
```

No test suite. Deployed on Vercel (framework preset: Vite, output `dist/`); pushing to `master` is the release.

## Architecture

React 19 + Vite portfolio. No router, no state library, no UI framework — sections stack in `src/App.jsx` and anchor links (`#home`, `#about`, `#journey`, `#projects`, `#skills`, `#contact`) drive navigation. Extra pages are Vite MPA entries, not routes: `archivon.html` → `src/case-study/` is the Archivon case study, registered in `vite.config.js` `rollupOptions.input` (`vercel.json` `cleanUrls` makes it `/archivon` in production). Live at https://portfolio-mu-weld-72.vercel.app (also referenced by the OG tags in `index.html` — update those if the domain changes).

### Render gating (App.jsx)

`App` shows a `Preloader` intro and mounts the Nav/sections only after it lifts (`ready` state, ~1.9s). Consequences:

- The intro is skipped when `sessionStorage.introShown === '1'` or `prefers-reduced-motion` matches (see `SKIP_INTRO`).
- `useScrollReveal(ready)` and `useActiveSection(ids, ready)` take a `ready` flag because their IntersectionObservers must re-run after the sections actually mount. If you add a hook that queries the DOM at startup, give it the same flag.

### Styling: CSS Modules + three global sheets

Component styles are CSS Modules (`X.module.css` next to `X.jsx`). Global sheets in `src/styles/` are imported once in `main.jsx`:

- `fonts.css` — self-hosted `@font-face` (woff2 in `public/fonts/`; Inter is a single variable file covering weights 300–600). No font/icon CDNs.
- `base.css` — design tokens as CSS variables, scrollbar/selection. Accents are RGB triplets (`--accent-rgb`, `--accent2-rgb`) so any alpha derives via `rgba(var(--accent-rgb), X)` — never hardcode the teal; the theme switcher rewrites these triplets.
- `components.css` — global utility classes used as plain strings in JSX: `sec`, `sec-dark`, `wrap`, `chip`, `split*`, `btn-fill`, `btn-line`, `btn-arrow`, `teal`, `ghost`, and the scroll-reveal classes `reveal` / `rd1`–`rd3` (delays).
- `animations.css` — shared keyframes and the global `prefers-reduced-motion` kill-switch (zeroes all animation/transition durations — but NOT animation-delays, so JS-driven effects must check the media query themselves).

Scroll reveal protocol: put `reveal` (plus optional `rd1`–`rd3`) on an element; `useScrollReveal` adds the global `visible` class on intersection. Module CSS can hook this via `:global`, e.g. `.row:global(.visible) .tag` in `Projects.module.css` for staggered child reveals.

Icons are inline SVGs via `src/components/Icon/Icon.jsx` (path data from Font Awesome Free, sized by prop, colored by `currentColor`). Add new icons to its `ICONS` map rather than reintroducing an icon font.

Theming: `src/components/ThemeSwitcher/themes.js` holds the accent palettes and `applyTheme()`; `main.jsx` applies the saved theme before render (localStorage `accent-theme`). `applyTheme` dispatches a `themechange` window event — canvas/JS effects that cache a color (e.g. Particles) must listen for it.

### Effect components conventions

Interactive effects live in `src/components/` (Ambience, Particles, Cursor, TiltCard, Magnetic, Scramble, CountUp, Preloader). Conventions they all follow — keep these for new effects:

- Pointer-driven effects bail out on touch: `'ontouchstart' in window || navigator.maxTouchPoints > 0`.
- JS animations (rAF loops, scramble, count-up) bail out on `matchMedia('(prefers-reduced-motion: reduce)')`.
- rAF loops write `style.transform` directly with lerp smoothing instead of React state; continuous loops pause via IntersectionObserver when off-screen (see `Particles`).
- React 19: function-component `defaultProps` is NOT supported — use default parameters. This has bitten before (rendered `NaN`).

`Ambience` (mounted once in App) owns the fixed background layers (aurora/grid/spotlight at `z-index: -1`), the noise overlay (z 9990) and the scroll progress bar (z 10001). Cursor is z 9999, Preloader z 10002. Negative z-index means solid-background sections (`sec-dark`) intentionally cover the ambience.

### Content lives in data files, not JSX

- Projects: `src/sections/Projects/projects.data.js` (images under `public/projects/` and `public/assets/img/`).
- Skills: `src/sections/Skills/skills.data.js`.
- Stats numbers are inline in `Stats.jsx` / `About.jsx` as `{ value, suffix }` fed to `CountUp`.
- CV PDF is `public/Bahaa_Hamed_CV_EN.pdf`, linked from `Contact.jsx`.

### Terminal easter egg

`src/components/Terminal/Terminal.jsx` is a Quake-style drop-down console on the main page, toggled by the `` ` ``/`~` key or a `terminal-toggle` window event (dispatched by the footer `>_` button). Commands live in its `runCommand` switch; it imports `PROJECTS` and the theme helpers, so new projects/themes show up automatically.

### Custom cursor

`body { cursor: none }` globally; `Cursor` renders a dot + lerped ring. Hover targets are detected via `closest('a, button, [data-tilt]')` toggling `body.ch` — `TiltCard` sets `data-tilt`, so anything wrapped in it gets the enlarged cursor for free.
