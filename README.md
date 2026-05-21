# Bahaa Hamed — Portfolio

Personal portfolio website for Bahaa Hamed, Computer Science & Economics graduate from KTH (2026).

## Tech Stack

- **React 19** — component architecture
- **Vite 7** — build tool & dev server
- **CSS Modules** — scoped, zero-conflict styles
- **Custom hooks** — scroll reveal, active section tracking
- **Vanilla JS** — 3D tilt + flashlight effects, cursor animation

## Local Setup

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

## Build

```bash
npm run build
npm run preview
```

## Folder Structure

```
src/
├── styles/          # Global CSS (variables, animations, utilities)
├── hooks/           # Reusable React hooks
├── components/      # Shared UI components (Cursor, Nav, Marquee, TiltCard)
└── sections/        # Page sections (Hero, About, Projects, Skills, Stats, Contact, Footer)
    └── Projects/
        └── projects.data.js   # All project content
    └── Skills/
        └── skills.data.js     # All skills content
```

## Deploy (Vercel)

1. Push to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click **Deploy**

No environment variables required for the base portfolio.
