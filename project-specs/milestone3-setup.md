# NetLearnHub — Milestone 3 Specification

## Objective
Build the shared simulation platform that lesson-specific simulations will use inside the lesson-detail experience.

## Depends on
Milestones 0 through 2 (complete). The app already has: React + TypeScript + Vite, Zustand stores with persist, `LessonDetailPage` with 5-tab navigation, quiz and unlock flow, `lesson/:id/simulation` route placeholder, and progress state with `simViewed` on lesson records.

## Critical Reference Files
- `docs/tasks.md` — Milestone 3 task list (source of truth for scope)
- `docs/PRD.md` — Product requirements for simulations and lesson progression
- `docs/buildingLesson.md` — Lesson-detail flow, centered composition, tab expectations, and sidebar-safe spacing
- `src/router.tsx` — Existing simulation route wiring at `lesson/:id/simulation`
- `src/pages/LessonDetailPage.tsx` — Existing lesson tab flow that simulation entry must preserve
- `src/pages/RoutePlaceholderPages.tsx` — Current `SimulationPage` placeholder to replace
- `src/components/lesson/LessonTabContent.tsx` — Existing simulation-tab placeholder surface
- `src/store/progressStore.ts` — Existing persisted lesson progress shape with `simViewed`
- `src/styles.css` — Existing theme tokens, layout rules, and component styling system

## Architecture Requirements
- Shared simulation contract: define the typed interface that lesson-specific simulation components must satisfy.
- Lesson-detail compatibility: the simulation experience must plug into the existing `Theory -> Simulation -> Practice Lab -> Flash cards -> Lesson Quiz` flow without breaking current tab behavior.
- Shared simulation shell: provide common controls for play, pause, step-through, speed control, and caption panel.
- Progress integration: simulation viewing/completion must update persisted lesson progress through the Zustand store rather than direct `localStorage` access in components.
- Desktop-only behavior: simulation routes must enforce the task requirement to "Build desktop-only guard behavior for simulation routes."
- Reduced motion: implement the task requirement to "Implement reduced-motion behavior where motion is minimized but content remains understandable."
- Theme fidelity: all simulation surfaces must use existing tokens and patterns from `src/styles.css`, keeping the dark UI, emerald accents, glass surfaces, and centered content framing intact.
- TypeScript throughout: use explicit types for the simulation contract, shell props, and progression hooks.

## In-Scope Tasks
1. Define the shared simulation contract for lesson-specific simulation components.
2. Build the `Simulation` tab surface or entry state used by the Lesson Detail View.
3. Build the shared simulation shell with play, pause, step-through, speed control, and caption panel.
4. Add simulation state tracking so progress can reflect whether the sim was viewed.
5. Build desktop-only guard behavior for simulation routes.
6. Implement reduced-motion behavior where motion is minimized but content remains understandable.
7. Build one reference simulation that proves the shell, labels, caption updates, and progression hooks.
8. Ensure the shared simulation patterns support clear visual state mapping and instructional captions.
9. Connect lesson flow into simulation routes and back out to lab or quiz progression.
10. Validate layout stability and theme fidelity so simulations do not break page structure.
11. Run content and UX review to confirm the simulation platform teaches concepts rather than acting as decoration.

## Out Of Scope
- Bespoke simulations for every lesson. This milestone proves the platform with one reference simulation only.
- Practice lab platform work. That belongs to Milestone 4.
- Flashcards, vault, exam mode, or broader curriculum authoring.
- New persistence mechanisms outside the existing Zustand persist setup.
- Mobile-first simulation support. The scope explicitly requires desktop-only guard behavior.

## Done When
- Shared simulation infrastructure can support bespoke lesson-specific simulations.
- Simulation routes respect desktop-only constraints.
- Simulation completion fits into the lesson-detail progression experience.

## Implementation Constraints
- Keep the implementation in the existing React + TypeScript + Vite app architecture.
- Use the current persisted Zustand progress store and stable persistence path already configured in `src/store/progressStore.ts`.
- Do not read or write `localStorage` directly from simulation components; update progress through store actions/selectors.
- Keep styling in the existing CSS system centered on `src/styles.css`; do not introduce a separate styling framework for this milestone.
- Preserve the existing lesson tab flow and route structure. The simulation experience must feel like a continuation of the current lesson-detail UX, not a detached mini-app.
- Preserve theme fidelity with the existing dark background, emerald accent, glass surfaces, `Outfit` UI typography, and centered composition.
- Keep content clear of the sidebar with max-width and spacing choices that match the lesson-detail layout conventions from `docs/buildingLesson.md`.
- Build the shared shell and contract first, then prove them with a single reference simulation rather than over-generalizing early.

## Validation Notes
- Verify the simulation route works from the existing lesson flow and returns cleanly into the next study step.
- Verify `simViewed` progress updates persist across refreshes through the Zustand store.
- Verify desktop-only guard behavior on smaller/mobile viewports and confirm the fallback messaging remains usable.
- Verify reduced-motion behavior with OS/browser reduced-motion preference enabled.
- Verify the simulation shell remains readable and structurally stable with the sidebar collapsed and expanded.
- Verify captions, labels, controls, and progression cues are instructional and not purely decorative.
- Run the standard repo checks that apply to frontend changes: `npm run typecheck`, `npm run lint`, and relevant tests if simulation-specific coverage is added.
