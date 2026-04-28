<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# NetLearnHub

NetLearnHub is a frontend-only CCNA 200-301 study platform. The current repo now includes the Milestone 0 foundation: a React + TypeScript + Vite app shell, persisted guest profile and progress stores, a React dashboard migrated from the original prototype, and placeholder routes for all major PRD flows.

## Local Development

**Prerequisites:** Node.js 20+

1. Install dependencies:
   `npm install`
2. Start the Vite dev server:
   `npm run dev`
3. Open the local app:
   `http://localhost:3000`

## Scripts

- `npm run dev` - start the Vite dev server
- `npm run build` - run `tsc --noEmit` and build the production bundle
- `npm run preview` - preview the production build locally
- `npm run clean` - remove `dist/` and `coverage/`
- `npm run typecheck` - run TypeScript checks
- `npm run lint` - run ESLint on `src/` and `vite.config.ts`
- `npm test` - run the Vitest suite once
- `npm run test:watch` - run Vitest in watch mode

## Current Architecture

- `src/main.tsx` - Vite entry point
- `src/router.tsx` - app routes matching the PRD information architecture
- `src/components/layout/` - sidebar, top nav, and page shell
- `src/components/ui/` - reusable Milestone 0 primitives
- `src/store/` - persisted profile and progress Zustand stores
- `src/pages/` - dashboard, domain overview, lesson shell, and placeholder feature routes
- `src/styles.css` - global design tokens and shared component styling

## Notes

- `server.js` remains in the repo from the original prototype but is not the main dev workflow anymore.
- `GEMINI_API_KEY` is still documented in `.env.example`, but the Milestone 0 shell does not require it to run.
- Product direction and milestone scope live in `docs/PRD.md` and `docs/tasks.md`.
