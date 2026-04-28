# AGENTS.md
## Purpose
- This repository is `netlearnhub-v2`, a frontend-first CCNA study app.
- The current repo stack is React 19, TypeScript, Vite 6, React Router 7, Zustand, Motion, Vitest, and ESLint 9.
- Tailwind v4 is installed, but the current UI mostly uses authored CSS from `src/styles.css` and shared UI primitives.
- Preserve deterministic learning flows and avoid speculative platform changes.
## Instruction Sources
- No repository-specific Cursor rules were found in `.cursor/rules/`.
- No `.cursorrules` file was found in this repository.
- No Copilot instructions file was found at `.github/copilot-instructions.md`.
- Follow this file first, then `README.md`, `docs/PRD.md`, `docs/buildingLesson.md` for lesson UI work, and the touched feature files.
- When milestone or task status meaningfully changes, keep `docs/tasks.md` aligned.
## Product Constraints
- Frontend-only architecture: do not add backend services, auth, SSR, or server-side persistence.
- Persist learner and lab-session state with local storage backed client stores.
- The lesson flow is Lesson -> Simulation -> Hands-On Lab -> Lesson Quiz -> Unlock next lesson.
- Labs are deterministic browser-native emulations, not full Cisco device virtualization.
- Only one active terminal/device should be interactive at a time.
- Command coverage should stay scoped to CCNA 200-301 requirements.
- Topologies are fixed and authored; do not add freeform topology editing.
- Lab completion is objective-based, not score-based.
- Lessons may contain one or more labs, including mini-labs.
- Reset behavior must restore a deterministic initial state.
- Guided mode should be strict and sequential.
- Validate resulting state, not only raw command strings.
- Keep content authoring separate from engine logic.
- Do not have React components read from `localStorage` directly.
## Setup And Core Commands
- Install dependencies: `npm install`
- Start local dev server: `npm run dev`
- Dev server URL: `http://localhost:3000`
- Build production bundle: `npm run build`
- Build GitHub Pages bundle: `npm run build:pages`
- Preview production build: `npm run preview`
- Remove build and coverage output: `npm run clean`
- Run TypeScript checks only: `npm run typecheck`
- Run ESLint: `npm run lint`
- Run all tests once: `npm test`
- Run tests in watch mode: `npm run test:watch`
## Single-Test Commands
- Run one Vitest file: `npm test -- src/test/labEngine.test.ts`
- Run one page test file: `npm test -- src/test/labPage.test.tsx`
- Run one test file with a name filter: `npm test -- src/test/labEngine.test.ts -t "supports contextual help"`
- Direct Vitest equivalent: `npx vitest run src/test/labEngine.test.ts`
- For final cross-cutting verification, prefer `npm run build`.
## Environment Notes
- `vite.config.ts` defines Vitest config directly; there is no separate `vitest.config.*` file.
- Tests run in `jsdom` with `globals: true` and `src/test/setup.ts` loaded automatically.
- `server.js` exists, but `README.md` says it is a legacy artifact and not the main local workflow.
- `.env.example` documents `GEMINI_API_KEY` and `APP_URL`, but the current shell does not require the key to run.
- `src/router.tsx` switches to `createHashRouter` on the GitHub Pages host.
## Repository Map
- `src/main.tsx`: Vite entry point and router bootstrap.
- `src/router.tsx`: route definitions and deployment-aware router selection.
- `src/pages/`: route-level pages.
- `src/components/`: reusable UI and feature components.
- `src/components/lab/`: lab shell, topology, objectives, terminal, and guard components.
- `src/components/simulation/`: simulation-specific UI and desktop guards.
- `src/components/ui/`: shared primitives such as cards, buttons, badges, modals, and tooltips.
- `src/content/`: authored lesson, lab, simulation, and quiz content.
- `src/lib/`: application logic such as lab, quiz, formatting, and unlock engines.
- `src/store/`: Zustand persisted stores.
- `src/hooks/`: shared React hooks.
- `src/test/`: Vitest and Testing Library coverage.
## Imports And Modules
- Use named exports across `src/`; the app code does not use default exports.
- Group imports as external packages first, then a blank line, then relative internal imports.
- Use `import type` for type-only imports.
- Keep imports relative; no path aliases are configured.
- Prefer one import per module path rather than duplicating the same path.
- Preserve ESM syntax in config and source files.
## Formatting
- Match the existing style: semicolons, single quotes, and trailing commas in multiline literals.
- Use 2-space indentation.
- Favor early returns for guard cases in components and hooks.
- Keep functions compact when possible; extract helpers only when they clarify logic.
- Keep JSX props vertically aligned when wrapping.
- There is no Prettier config in this repo, so avoid broad unrelated reformatting.
## TypeScript Guidelines
- `strict` mode is enabled; keep all new code type-safe.
- Prefer `type` aliases over `interface`; the repository uses `type` almost everywhere.
- Avoid `any`.
- Use unions for app modes, statuses, device kinds, and other finite state.
- Type component props explicitly with `type SomeComponentProps = { ... }`.
- Keep persisted state serializable.
- Use non-null assertions only when a DOM or routing contract makes them guaranteed.
## React Guidelines
- Use plain function components, not `React.FC`.
- Keep page state local with `useState`, `useEffect`, and `useMemo` only where it provides clear value.
- Do not add memoization by default; current usage is restrained.
- Keep event handlers close to the component that owns the state they mutate.
- Prefer controlled form inputs.
- Use existing guard components for locked and desktop-only flows instead of duplicating logic.
- Respect reduced motion behavior when changing animated UI.
## Zustand And Persistence
- Use Zustand stores with `persist` and `createJSONStorage(() => localStorage)`.
- Do not read or write `localStorage` directly inside React components.
- Keep default-state builders pure where possible, such as `createDefaultProfileState()`.
- Expose store actions for mutations rather than mutating store shape ad hoc from components.
- Be careful when changing persisted shape or storage keys; compatibility matters once data is stored.
## Naming Conventions
- Component, page, hook, and store file names use PascalCase except content files, which often use kebab-case IDs.
- Hooks must start with `use`, for example `useMediaQuery`.
- Store hooks follow `useXStore` naming.
- Helper functions use camelCase.
- Types use PascalCase.
- Stable constants may use `UPPER_SNAKE_CASE`.
- Test files live under `src/test/` and use the `*.test.ts` or `*.test.tsx` suffix.
## Error Handling And Control Flow
- Throw `Error` only for impossible internal states or missing invariants inside engine code.
- In route and component code, prefer explicit fallback UI for missing data rather than crashing.
- Check for missing lesson, lab, and preview data before rendering feature surfaces.
- Keep invalid command feedback deterministic and user-visible.
- Do not swallow failures silently.
- Preserve deterministic behavior in lab engines, quizzes, and progression logic.
## Testing Guidelines
- Use Vitest with Testing Library and `jsdom`.
- Test setup lives in `src/test/setup.ts` and resets stores plus `localStorage` before each test.
- Prefer assertions on rendered behavior and persisted store outcomes.
- Use `MemoryRouter` or route wrappers for page tests.
- Set up store state explicitly in tests when a scenario depends on progress or profile data.
- When changing engine logic, add deterministic tests similar to `src/test/labEngine.test.ts`.
- When changing page behavior, add or update route-level UI tests.
## Styling And UI
- Follow the existing CSS class system in `src/styles.css`.
- Current naming is descriptive and BEM-like, for example `lab-terminal__entry` and `page-header__description`.
- Reuse `src/components/ui/` primitives before creating new one-off controls.
- Do not introduce Tailwind-only styling patterns into established areas without a clear reason.
- Preserve the dark neon NetLearnHub visual language.
- Labs and simulations must remain desktop-only below `1024px` using the existing guard pattern.
## Content And Engine Boundaries
- Keep authored lesson, lab, quiz, and simulation content under `src/content/`.
- Keep engines and validators under `src/lib/`.
- Keep routing concerns in pages and route config, not in content files.
- Keep UI rendering separate from parsing, execution, and validation logic.
- If you add new authored content, wire it through the relevant `index.ts` module.
## Agent Workflow
- Read `package.json`, `README.md`, `vite.config.ts`, and the directly affected feature files before editing.
- For lesson-surface work, inspect `docs/buildingLesson.md`, the relevant page/component, and its tests together.
- For lab work, inspect `src/content/labs/`, `src/lib/labEngine.ts`, relevant pages, and tests together.
- Make the smallest correct change that fits the existing architecture.
- Avoid renaming or moving files unless the task clearly requires it.
- Avoid new dependencies unless there is a concrete need.
- Do not treat `server.js` as the default app entry unless the task is specifically about the legacy server.
- Verify changes with the narrowest useful command first, then broaden as needed.
- Typical verification commands are `npm run typecheck`, `npm run lint`, `npm test -- src/test/<target>.test.tsx`, and `npm run build`.
