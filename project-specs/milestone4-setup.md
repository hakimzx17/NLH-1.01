# NetLearnHub - Milestone 4 Specification

## Objective
Deliver the shared CLI-based lab platform and prove it with a deterministic reference lab launched from the lesson-detail experience.

## Depends on
Milestones 0 through 3 (complete). The app already has: React + TypeScript + Vite, persisted Zustand stores, the `LessonDetailPage` with 5-tab navigation, a `lesson/:id/lab` route placeholder, simulation-route patterns from Milestone 3, and progress state with `labComplete` on lesson records.

## Critical Reference Files
- `docs/tasks.md` - Milestone 4 task list (source of truth for scope)
- `docs/PRD.md` - Product requirements for CLI behavior, abbreviations, and lab expectations
- `docs/buildingLesson.md` - `Practice Lab` tab expectations, lesson-detail flow, centered composition, and sidebar-safe spacing
- `src/router.tsx` - Existing lab route wiring at `lesson/:id/lab`
- `src/pages/LessonDetailPage.tsx` - Existing lesson tab flow that lab entry must preserve
- `src/components/lesson/LessonTabContent.tsx` - Existing `Practice Lab` tab placeholder surface to replace
- `src/pages/RoutePlaceholderPages.tsx` - Current `LabPage` placeholder to replace
- `src/store/progressStore.ts` - Existing persisted lesson progress shape with `labComplete`
- `src/content/types.ts` - Likely home for typed lab content and validation models
- `src/styles.css` - Existing theme tokens, layout rules, and CLI-oriented styling foundation

## Architecture Requirements
- Lab content model: define the typed lab model for "topology, objectives, hints, initial state, and validation."
- Lesson-detail compatibility: the lab experience must plug into the existing `Theory -> Simulation -> Practice Lab -> Flash cards -> Lesson Quiz` flow without breaking current tab behavior.
- `Practice Lab` tab surface: build the in-lesson overview and launch state with lab context, launch CTA, and support actions that match `docs/buildingLesson.md`.
- Shared lab shell: provide a reusable desktop-oriented shell with topology panel, terminal panel, and lab brief/objectives area.
- CLI state machine: implement prompt rendering and mode switching so IOS-style transitions such as `enable`, `configure terminal`, interface config mode, and router config mode are modeled explicitly rather than improvised in component state.
- Deterministic command engine: command parsing, abbreviated-command support, help output, history, tab completion, typo feedback, and formatted `show` output must produce consistent results for the same input sequence.
- Validation integration: objective completion and overall lab validation must derive from expected configuration state, not from one-off UI flags.
- Progress integration: lab completion must update persisted lesson progress through the Zustand store rather than direct `localStorage` access in components.
- Theme fidelity: all lab surfaces must use existing tokens and patterns from `src/styles.css`, keeping the dark UI, emerald accents, glass surfaces, centered framing, and `JetBrains Mono` CLI presentation intact.
- TypeScript throughout: use explicit types for the lab model, CLI modes, command handlers, topology nodes/links, validation rules, and progression hooks.

## In-Scope Tasks
1. Define the lab content model for topology, objectives, hints, initial state, and validation.
2. Build the `Practice Lab` tab surface with lab overview, launch CTA, and supporting actions that match `docs/buildingLesson.md`.
3. Build the lab shell with topology panel, terminal panel, and lab brief/objectives area.
4. Build the CLI prompt and mode-switching state machine.
5. Support IOS-style mode transitions such as `enable`, `configure terminal`, interface config, and router config modes.
6. Add command history navigation.
7. Add tab completion for known commands.
8. Add contextual `?` help support.
9. Add deterministic unknown-command and typo feedback.
10. Support abbreviated command forms defined in the PRD.
11. Build formatted output rendering for key `show` commands.
12. Build the topology renderer for routers, switches, PCs, servers, firewall, cloud nodes, and link types.
13. Build the validation engine against expected configuration state.
14. Build objective completion tracking.
15. Add guided mode with next-command assistance.
16. Add hint toggling that does not penalize progress.
17. Add full lab reset behavior.
18. Build one reference lab scenario to validate the engine end to end.
19. Connect lab completion to lesson progress state.
20. Test lab determinism so repeated command sequences produce consistent outcomes.

## Out Of Scope
- Multiple bespoke labs across the curriculum. This milestone proves the platform with one deterministic reference lab only.
- Simulation platform changes beyond any reuse needed to keep lesson flow consistent.
- Flashcards, vault, exam mode, or domain content authoring.
- Backend services, multiplayer behavior, or remote lab execution.
- Direct browser persistence outside the existing Zustand persist setup.
- Non-deterministic command behavior, fuzzy command interpretation, or luxury terminal realism beyond what the PRD and Milestone 4 tasks require.

## Done When
- A user can complete a guided reference lab and see objectives update correctly.
- CLI, topology, and validation state remain synchronized.
- Labs can be launched from the `Practice Lab` tab and reset safely without corrupting progress.

## Implementation Constraints
- Keep the implementation in the existing React + TypeScript + Vite app architecture.
- Use the current persisted Zustand progress store and stable persistence path already configured in `src/store/progressStore.ts`.
- Do not read or write `localStorage` directly from lab components; update progress through store actions/selectors.
- Keep styling in the existing CSS system centered on `src/styles.css`; do not introduce a separate styling framework for this milestone.
- Preserve the existing lesson tab flow, route structure, and theme fidelity. The lab experience must feel like a continuation of the current lesson-detail UX, not a detached mini-app.
- Follow `docs/buildingLesson.md` for `Practice Lab` tab behavior, centered content framing, and spacing that stays clear of the sidebar.
- Keep CLI behavior deterministic. The same valid command sequence against the same initial lab state must produce the same mode, output, topology/config state, objective state, and completion result.
- Model lab state explicitly in TypeScript and shared logic rather than scattering command parsing, validation, or topology mutations across presentational components.
- Use `JetBrains Mono` for terminal-oriented UI and preserve the existing dark background, emerald accent, and glass-surface system.
- Full reset must restore the authored initial state for the active lab without leaving persisted progress or UI state partially mutated.
- Guided mode and hints must assist completion without replacing the underlying command/validation engine.

## Validation Notes
- Verify the `Practice Lab` tab presents the correct overview and launches the lab route cleanly from the existing lesson flow.
- Verify the active lab route returns cleanly into the next lesson step without breaking the tabbed lesson-detail experience.
- Verify CLI mode transitions for normal, privileged, global configuration, and interface/router configuration paths.
- Verify command history, tab completion, contextual `?` help, abbreviation handling, and unknown-command feedback all behave deterministically.
- Verify topology, terminal output, expected configuration state, and objective completion stay synchronized after each meaningful command.
- Verify guided mode and hint toggling help the learner without blocking normal manual command entry.
- Verify full reset restores the initial authored lab state and does not corrupt persisted lesson progress.
- Verify `labComplete` progress updates persist across refreshes through the Zustand store.
- Verify layout stability, centered composition, and sidebar-safe spacing with the sidebar collapsed and expanded.
- Run the standard repo checks that apply to frontend changes: `npm run typecheck`, `npm run lint`, and relevant tests if lab-specific coverage is added.
