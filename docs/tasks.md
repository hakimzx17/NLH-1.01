# NetLearnHub Delivery Plan

## How To Use This File
- This plan translates `docs/PRD.md` into milestone-based execution tasks.
- Tasks are ordered by dependency, not just by feature popularity.
- Each milestone should end with a demoable product increment.
- For any lessons-section work, read `docs/buildingLesson.md` first and use it as the reference for the Domains Directory grid, Lesson Detail View, tab flow, centered content framing, and sidebar-safe spacing.
- The current repo starts from a static `index.html` served by `server.js`, so early tasks focus on establishing the real app foundation.
- Check off tasks as they are completed and adjust scope only when repo reality forces a change.
- Update this file in the same working pass whenever tasks or milestone outcomes are completed so the checklist stays aligned with repo reality.

## Milestone 0: Foundation And App Shell
**Objective:** Turn the current static prototype into a maintainable React application foundation.

**Depends on:** Existing repo baseline only.

### Tasks
- [x] Audit the current static dashboard in `index.html` and identify reusable layout sections, styling tokens, and interactions.
- [x] Stand up the real React + TypeScript + Vite application entry point.
- [x] Create the initial `src/` structure for pages, components, content, hooks, stores, and shared utilities.
- [x] Replace placeholder npm workflow with real application scripts for `dev`, `build`, and `preview`.
- [x] Fix the cross-platform clean workflow so it works on Windows as well as Unix-like shells.
- [x] Add core app dependencies required by the PRD architecture, especially routing and persisted state management.
- [x] Add baseline engineering checks: typecheck, linting, and a lightweight test setup appropriate for the frontend stack.
- [x] Build the app shell: sidebar, top navigation, page shell, route container, and not-found state.
- [x] Extract the current visual design into global tokens for dark background, emerald accent, glass surfaces, and typography.
- [x] Add `Outfit` and `JetBrains Mono` typography handling for UI and CLI contexts.
- [x] Build reusable primitives: button, card, badge, modal, tooltip, progress ring.
- [x] Create the persisted profile store and progress store.
- [x] Implement the guest profile setup flow and persist profile data locally.
- [x] Migrate the current dashboard from static HTML into reusable React components.
- [x] Add route placeholders for all major PRD pages so the navigation model exists early.
- [x] Document the resulting scripts, architecture decisions, and repo workflow updates.

### Done When
- [x] The app boots through the React/Vite entry point.
- [x] The dashboard is rendered from React components rather than raw static markup.
- [x] App-level state persists correctly across refreshes.
- [x] Core routes exist and navigation works end to end.

## Milestone 1: Learning Structures, UI/UX, And Theme Fidelity
**Objective:** Establish the correct two-tier lessons UI from `docs/buildingLesson.md` so theory, simulations, practice labs, flash cards, and lesson quizzes plug into a coherent, theme-correct UX.

**Depends on:** Milestone 0.

### Tasks
- [x] Read `docs/buildingLesson.md` first and lock the two-tier lessons structure before implementation starts.
- [x] Define TypeScript models for domain directory cards, module sidebar items, lessons, theory sections, callouts, CLI spotlights, checkpoints, summary cards, simulation metadata, lab metadata, flashcard metadata, and quiz metadata.
- [x] Review the lessons information architecture against `docs/PRD.md` and align the flow to Domains Directory -> Lesson Detail View -> Theory / Simulation / Practice Lab / Flash cards / Lesson Quiz.
- [x] Build the centered `Lessons Directory` container pattern with max-width, horizontal padding, and spacing that keeps content clear of the app sidebar.
- [x] Build the domains grid with large domain cards, progress bars, hover states, active emphasis, and locked-state presentation.
- [x] Build the `Lesson Detail View` shell with back-to-domains navigation, domain eyebrow, lesson title, and centered main-content framing.
- [x] Build the module sidebar with completed, active, and locked lesson/module states.
- [x] Build the tab navigation for Theory, Simulation, Practice Lab, Flash cards, and Lesson Quiz.
- [x] Build tab switching logic and transition behavior that matches the `docs/buildingLesson.md` interaction model.
- [x] Build the Theory tab surface for deep-dive content with clear continuation actions into the next study step.
- [x] Build callout block components for `WHY THIS MATTERS`, `EXAM TRAP`, `REMEMBER THIS`, `REAL WORLD`, and `ANALOGY`.
- [x] Build CLI spotlight rendering with code formatting and explanation support.
- [x] Build visual block support for inline diagrams and topology illustrations.
- [x] Build concept checkpoint interactions with immediate feedback and no grading pressure.
- [x] Build summary card rendering and prepare the hook-in point for vault review storage.
- [x] Add resume/open-lesson entry points from dashboard and domain surfaces into the new lesson detail view.
- [x] Review lesson UI/UX for readability, pacing, scannability, focus states, progress cues, and tab clarity.
- [x] Validate theme fidelity across typography, spacing, glass surfaces, emerald accents, contrast, and centered composition.
- [x] Implement lesson progress updates for started, resumed, and viewed states.
- [x] Connect dashboard widgets to real lesson progress and last-session data.
- [x] Add accessibility coverage for keyboard navigation, heading structure, reading flow, and tab interactions.

### Done When
- [x] A user can open the Domains Directory, choose a domain, open the Lesson Detail View, and move across the five lesson tabs.
- [x] Structured lesson data can drive the Lessons Directory and Lesson Detail View without bespoke per-lesson layouts.
- [x] Lesson surfaces are UI/UX correct, centered, and visually aligned with `docs/buildingLesson.md` and the PRD theme.
- [x] Domain overview and dashboard both reflect real stored lesson progress.

## Milestone 2: Quiz Engine And Unlock Logic
**Objective:** Complete the gated progression loop for lesson-quiz tabs and domains.

**Depends on:** Milestone 1.

### Tasks
- [x] Define the typed quiz question model for all PRD-supported question types.
- [x] Build the quiz state engine for loading questions, tracking answers, and final submission.
- [x] Build UI support for single-choice questions.
- [x] Build UI support for multi-select questions.
- [x] Build UI support for true/false questions.
- [x] Build UI support for fill-in-the-blank questions.
- [x] Enforce PRD quiz rules: randomized questions, randomized options, no back-navigation, explanations always shown.
- [x] Build the quiz progress bar, timing display, and animated answer states.
- [x] Build the results screen with score ring, breakdown, and missed-question review actions.
- [x] Persist quiz attempts, scores, dates, and missed-question IDs.
- [x] Mount the quiz experience into the Lesson Detail View's `Lesson Quiz` tab or its direct launch flow without breaking the tabbed lesson structure.
- [x] Implement the pure unlock engine for lessons and domains.
- [x] Update progress state when lesson quizzes are passed or failed.
- [x] Wire quiz outcomes into next-lesson unlock behavior.
- [x] Build domain quiz support and domain completion behavior.
- [x] Add review actions that fast-track missed questions back to the correct lesson sections.
- [x] Validate the full lesson -> quiz -> unlock loop with representative seeded content.

### Done When
- [x] A user can open the `Lesson Quiz` tab, pass a lesson quiz, and unlock the next lesson.
- [x] Domain completion status updates correctly after the domain quiz.
- [x] Quiz history survives refresh and return visits.

## Milestone 3: Simulation Platform
**Objective:** Build the shared simulation platform that lesson-specific simulations will use inside the lesson-detail experience.

**Depends on:** Milestones 0 through 2.

### Tasks
- [x] Define the shared simulation contract for lesson-specific simulation components.
- [x] Build the `Simulation` tab surface or entry state used by the Lesson Detail View.
- [x] Build the shared simulation shell with play, pause, step-through, speed control, and caption panel.
- [x] Add simulation state tracking so progress can reflect whether the sim was viewed.
- [x] Build desktop-only guard behavior for simulation routes.
- [x] Implement reduced-motion behavior where motion is minimized but content remains understandable.
- [x] Build one reference simulation that proves the shell, labels, caption updates, and progression hooks.
- [x] Ensure the shared simulation patterns support clear visual state mapping and instructional captions.
- [x] Connect lesson flow into simulation routes and back out to lab or quiz progression.
- [x] Validate layout stability and theme fidelity so simulations do not break page structure.
- [x] Run content and UX review to confirm the simulation platform teaches concepts rather than acting as decoration.

### Done When
- [x] Shared simulation infrastructure can support bespoke lesson-specific simulations.
- [x] Simulation routes respect desktop-only constraints.
- [x] Simulation completion fits into the lesson-detail progression experience.

## Milestone 4: Hands-On Lab Platform
**Objective:** Deliver the shared CLI-based lab platform and prove it with a deterministic reference lab launched from the lesson-detail experience.

**Depends on:** Milestones 0 through 3.

### Tasks
- [x] Define the lab content model for topology, objectives, hints, initial state, and validation.
- [x] Build the `Practice Lab` tab surface with lab overview, launch CTA, and supporting actions that match `docs/buildingLesson.md`.
- [x] Build the lab shell with topology panel, terminal panel, and lab brief/objectives area.
- [x] Build the CLI prompt and mode-switching state machine.
- [x] Support IOS-style mode transitions such as `enable`, `configure terminal`, interface config, and router config modes.
- [x] Add command history navigation.
- [x] Add tab completion for known commands.
- [x] Add contextual `?` help support.
- [x] Add deterministic unknown-command and typo feedback.
- [x] Support abbreviated command forms defined in the PRD.
- [x] Build formatted output rendering for key `show` commands.
- [x] Build the topology renderer for routers, switches, PCs, servers, firewall, cloud nodes, and link types.
- [x] Build the validation engine against expected configuration state.
- [x] Build objective completion tracking.
- [x] Add guided mode with next-command assistance.
- [x] Add hint toggling that does not penalize progress.
- [x] Add full lab reset behavior.
- [x] Build one reference lab scenario to validate the engine end to end.
- [x] Connect lab completion to lesson progress state.
- [x] Test lab determinism so repeated command sequences produce consistent outcomes.

### Done When
- [x] A user can complete a guided reference lab and see objectives update correctly.
- [x] CLI, topology, and validation state remain synchronized.
- [x] Labs can be launched from the `Practice Lab` tab and reset safely without corrupting progress.

## Milestone 5: Flashcards And Vault Platform
**Objective:** Deliver the review systems that remain available outside the gated lesson loop while also supporting lesson-linked flashcard entry from the lesson-detail view.

**Depends on:** Milestone 0 for base architecture. Lesson progression integration benefits from Milestones 1 and 2.

### Tasks
- [x] Define the flashcard state model and deck content model.
- [x] Implement the simplified SM-2 scheduling logic from the PRD.
- [x] Build the flashcard store and persist card progress locally.
- [x] Build the flashcard deck picker.
- [x] Build the active flashcard session view.
- [x] Build the lesson-linked `Flash cards` tab entry surface used by the Lesson Detail View.
- [x] Build card flip interaction and difficulty rating controls.
- [x] Add session stats and due-card handling.
- [x] Add keyboard shortcuts for flip and rating.
- [x] Add support for optional diagram and CLI-backed cards.
- [x] Define the vault content model.
- [x] Build the vault layout with category navigation and content area.
- [x] Build client-side search across vault content.
- [x] Add bookmark persistence and a personal saved-items view.
- [x] Build category pages for must-know facts, OSI/TCP-IP, CLI reference, protocol facts, glossary, and exam traps.
- [x] Add links between vault items and related lesson content.
- [ ] Add the soft "study before quiz" nudge where appropriate.
- [x] Seed representative sample content to validate both review systems before full curriculum authoring.

### Done When
- [x] Users can study due cards from flashcard mode and from lesson-linked `Flash cards` entry points.
- [x] Vault content is searchable, bookmarkable, and accessible outside lesson progression.
- [x] Flashcards and vault both use stable local persistence.

## Milestone 6: Domain 1 Content Package - Network Fundamentals
**Objective:** Write and polish the full Domain 1 learning package across theory, simulations, practice labs, flash cards, and lesson quizzes.

**Depends on:** Milestones 1 through 5.

### Tasks
- [ ] Review Domain 1 scope, lesson ordering, and dependency flow against the PRD before authoring starts.
- [ ] Re-read `docs/buildingLesson.md` before implementing Domain 1 lesson surfaces so the layout, tab structure, and centered composition stay aligned.
- [ ] Write all Domain 1 lesson theory modules as deep-dive structured content.
- [ ] Add callouts, CLI spotlights, visual blocks, concept checkpoints, and summary cards for every Domain 1 lesson.
- [ ] Make sure to follow the first theory lesson stracture, fetures, UI/UX, font size, Cards, Colors.
- [ ] Review every Domain 1 lesson for UI/UX correctness, readability, pacing, and theme correctness inside the reader.
- [ ] Build a bespoke simulation for every Domain 1 lesson.
- [ ] Build a dedicated practice lab for every Domain 1 lesson.
- [ ] Prepare lesson-linked flashcard review content or deck entry points for every Domain 1 lesson so the `Flash cards` tab is populated.
- [ ] Author a dedicated lesson quiz for every Domain 1 lesson with the required PRD question mix and explanations.
- [ ] Author the Domain 1 domain quiz.
- [ ] Produce Domain 1 summary-card outputs and review-source content that can feed flashcards and vault references.
- [ ] Validate the full Domain 1 progression from Domains Directory to Lesson Detail View to Theory -> Simulation -> Practice Lab -> Flash cards -> Lesson Quiz -> unlock.

### Done When
- [ ] Domain 1 is fully playable from first lesson through domain completion.
- [ ] Every Domain 1 lesson has complete Theory, Simulation, Practice Lab, Flash cards, and Lesson Quiz tab content.
- [ ] Domain 1 content quality, UI/UX quality, and theme fidelity meet the PRD standard.

## Milestone 7: Domain 2 Content Package - Network Access
**Objective:** Write and polish the full Domain 2 learning package across theory, simulations, practice labs, flash cards, and lesson quizzes.

**Depends on:** Milestones 1 through 5.

### Tasks
- [ ] Review Domain 2 scope, lesson ordering, and dependency flow against the PRD before authoring starts.
- [ ] Re-read `docs/buildingLesson.md` before implementing Domain 2 lesson surfaces so the layout, tab structure, and centered composition stay aligned.
- [ ] Write all Domain 2 lesson theory modules as deep-dive structured content.
- [ ] Add callouts, CLI spotlights, visual blocks, concept checkpoints, and summary cards for every Domain 2 lesson.
- [ ] Review every Domain 2 lesson for UI/UX correctness, readability, pacing, and theme correctness inside the reader.
- [ ] Build a bespoke simulation for every Domain 2 lesson.
- [ ] Build a dedicated practice lab for every Domain 2 lesson.
- [ ] Prepare lesson-linked flashcard review content or deck entry points for every Domain 2 lesson so the `Flash cards` tab is populated.
- [ ] Author a dedicated lesson quiz for every Domain 2 lesson with the required PRD question mix and explanations.
- [ ] Author the Domain 2 domain quiz.
- [ ] Produce Domain 2 summary-card outputs and review-source content that can feed flashcards and vault references.
- [ ] Validate the full Domain 2 progression from Domains Directory to Lesson Detail View to Theory -> Simulation -> Practice Lab -> Flash cards -> Lesson Quiz -> unlock.

### Done When
- [ ] Domain 2 is fully playable from first lesson through domain completion.
- [ ] Every Domain 2 lesson has complete Theory, Simulation, Practice Lab, Flash cards, and Lesson Quiz tab content.
- [ ] Domain 2 content quality, UI/UX quality, and theme fidelity meet the PRD standard.

## Milestone 8: Domain 3 Content Package - IP Connectivity
**Objective:** Write and polish the full Domain 3 learning package across theory, simulations, practice labs, flash cards, and lesson quizzes.

**Depends on:** Milestones 1 through 5.

### Tasks
- [ ] Review Domain 3 scope, lesson ordering, and dependency flow against the PRD before authoring starts.
- [ ] Re-read `docs/buildingLesson.md` before implementing Domain 3 lesson surfaces so the layout, tab structure, and centered composition stay aligned.
- [ ] Write all Domain 3 lesson theory modules as deep-dive structured content.
- [ ] Add callouts, CLI spotlights, visual blocks, concept checkpoints, and summary cards for every Domain 3 lesson.
- [ ] Review every Domain 3 lesson for UI/UX correctness, readability, pacing, and theme correctness inside the reader.
- [ ] Build a bespoke simulation for every Domain 3 lesson.
- [ ] Build a dedicated practice lab for every Domain 3 lesson.
- [ ] Prepare lesson-linked flashcard review content or deck entry points for every Domain 3 lesson so the `Flash cards` tab is populated.
- [ ] Author a dedicated lesson quiz for every Domain 3 lesson with the required PRD question mix and explanations.
- [ ] Author the Domain 3 domain quiz.
- [ ] Produce Domain 3 summary-card outputs and review-source content that can feed flashcards and vault references.
- [ ] Validate the full Domain 3 progression from Domains Directory to Lesson Detail View to Theory -> Simulation -> Practice Lab -> Flash cards -> Lesson Quiz -> unlock.

### Done When
- [ ] Domain 3 is fully playable from first lesson through domain completion.
- [ ] Every Domain 3 lesson has complete Theory, Simulation, Practice Lab, Flash cards, and Lesson Quiz tab content.
- [ ] Domain 3 content quality, UI/UX quality, and theme fidelity meet the PRD standard.

## Milestone 9: Domain 4 Content Package - IP Services
**Objective:** Write and polish the full Domain 4 learning package across theory, simulations, practice labs, flash cards, and lesson quizzes.

**Depends on:** Milestones 1 through 5.

### Tasks
- [ ] Review Domain 4 scope, lesson ordering, and dependency flow against the PRD before authoring starts.
- [ ] Re-read `docs/buildingLesson.md` before implementing Domain 4 lesson surfaces so the layout, tab structure, and centered composition stay aligned.
- [ ] Write all Domain 4 lesson theory modules as deep-dive structured content.
- [ ] Add callouts, CLI spotlights, visual blocks, concept checkpoints, and summary cards for every Domain 4 lesson.
- [ ] Review every Domain 4 lesson for UI/UX correctness, readability, pacing, and theme correctness inside the reader.
- [ ] Build a bespoke simulation for every Domain 4 lesson.
- [ ] Build a dedicated practice lab for every Domain 4 lesson.
- [ ] Prepare lesson-linked flashcard review content or deck entry points for every Domain 4 lesson so the `Flash cards` tab is populated.
- [ ] Author a dedicated lesson quiz for every Domain 4 lesson with the required PRD question mix and explanations.
- [ ] Author the Domain 4 domain quiz.
- [ ] Produce Domain 4 summary-card outputs and review-source content that can feed flashcards and vault references.
- [ ] Validate the full Domain 4 progression from Domains Directory to Lesson Detail View to Theory -> Simulation -> Practice Lab -> Flash cards -> Lesson Quiz -> unlock.

### Done When
- [ ] Domain 4 is fully playable from first lesson through domain completion.
- [ ] Every Domain 4 lesson has complete Theory, Simulation, Practice Lab, Flash cards, and Lesson Quiz tab content.
- [ ] Domain 4 content quality, UI/UX quality, and theme fidelity meet the PRD standard.

## Milestone 10: Domain 5 Content Package - Security Fundamentals
**Objective:** Write and polish the full Domain 5 learning package across theory, simulations, practice labs, flash cards, and lesson quizzes.

**Depends on:** Milestones 1 through 5.

### Tasks
- [ ] Review Domain 5 scope, lesson ordering, and dependency flow against the PRD before authoring starts.
- [ ] Re-read `docs/buildingLesson.md` before implementing Domain 5 lesson surfaces so the layout, tab structure, and centered composition stay aligned.
- [ ] Write all Domain 5 lesson theory modules as deep-dive structured content.
- [ ] Add callouts, CLI spotlights, visual blocks, concept checkpoints, and summary cards for every Domain 5 lesson.
- [ ] Review every Domain 5 lesson for UI/UX correctness, readability, pacing, and theme correctness inside the reader.
- [ ] Build a bespoke simulation for every Domain 5 lesson.
- [ ] Build a dedicated practice lab for every Domain 5 lesson.
- [ ] Prepare lesson-linked flashcard review content or deck entry points for every Domain 5 lesson so the `Flash cards` tab is populated.
- [ ] Author a dedicated lesson quiz for every Domain 5 lesson with the required PRD question mix and explanations.
- [ ] Author the Domain 5 domain quiz.
- [ ] Produce Domain 5 summary-card outputs and review-source content that can feed flashcards and vault references.
- [ ] Validate the full Domain 5 progression from Domains Directory to Lesson Detail View to Theory -> Simulation -> Practice Lab -> Flash cards -> Lesson Quiz -> unlock.

### Done When
- [ ] Domain 5 is fully playable from first lesson through domain completion.
- [ ] Every Domain 5 lesson has complete Theory, Simulation, Practice Lab, Flash cards, and Lesson Quiz tab content.
- [ ] Domain 5 content quality, UI/UX quality, and theme fidelity meet the PRD standard.

## Milestone 11: Domain 6 Content Package - Automation & Programmability
**Objective:** Write and polish the full Domain 6 learning package across theory, simulations, practice labs, flash cards, and lesson quizzes.

**Depends on:** Milestones 1 through 5.

### Tasks
- [ ] Review Domain 6 scope, lesson ordering, and dependency flow against the PRD before authoring starts.
- [ ] Re-read `docs/buildingLesson.md` before implementing Domain 6 lesson surfaces so the layout, tab structure, and centered composition stay aligned.
- [ ] Write all Domain 6 lesson theory modules as deep-dive structured content.
- [ ] Add callouts, CLI spotlights, visual blocks, concept checkpoints, and summary cards for every Domain 6 lesson.
- [ ] Review every Domain 6 lesson for UI/UX correctness, readability, pacing, and theme correctness inside the reader.
- [ ] Build a bespoke simulation for every Domain 6 lesson.
- [ ] Build a dedicated practice lab for every Domain 6 lesson.
- [ ] Prepare lesson-linked flashcard review content or deck entry points for every Domain 6 lesson so the `Flash cards` tab is populated.
- [ ] Author a dedicated lesson quiz for every Domain 6 lesson with the required PRD question mix and explanations.
- [ ] Author the Domain 6 domain quiz.
- [ ] Produce Domain 6 summary-card outputs and review-source content that can feed flashcards and vault references.
- [ ] Validate the full Domain 6 progression from Domains Directory to Lesson Detail View to Theory -> Simulation -> Practice Lab -> Flash cards -> Lesson Quiz -> unlock.

### Done When
- [ ] Domain 6 is fully playable from first lesson through domain completion.
- [ ] Every Domain 6 lesson has complete Theory, Simulation, Practice Lab, Flash cards, and Lesson Quiz tab content.
- [ ] Domain 6 content quality, UI/UX quality, and theme fidelity meet the PRD standard.

## Milestone 12: Exam Mode
**Objective:** Deliver the capstone assessment experience for completed domains.

**Depends on:** Milestones 0 through 11, especially quiz, progression, and completed domain content.

### Tasks
- [ ] Define the exam session model separate from long-lived study progress.
- [ ] Build the exam mode home screen.
- [ ] Build domain-scope selection based on completed domains only.
- [ ] Build the active exam shell with timer, question area, flagging, and submission flow.
- [ ] Implement timed-session behavior aligned to the PRD target.
- [ ] Add support for mixed-domain exam assembly.
- [ ] Build drag-and-drop question interactions.
- [ ] Build embedded simulation question interactions.
- [ ] Build exam results with overall score, timing, and per-domain performance breakdown.
- [ ] Build weak-area callouts and post-exam review guidance.
- [ ] Author the first full exam question bank.
- [ ] Validate availability rules so incomplete domains cannot be used in exam scope selection.
- [ ] Validate timer expiry, submission, and restart/reset flows.

### Done When
- [ ] A user can start and complete a full exam session from eligible domains.
- [ ] Exam results clearly explain performance by domain.
- [ ] Exam session behavior stays separate from persistent study state.

## Milestone 13: Quality, Accessibility, And Launch Readiness
**Objective:** Harden the experience for a reliable launch-quality release.

**Depends on:** All previous milestones.

### Tasks
- [ ] Run a full accessibility audit across lessons, quizzes, simulations, labs, flashcards, vault, and exam mode.
- [ ] Fix keyboard navigation gaps.
- [ ] Fix missing labels, semantics, and screen-reader issues.
- [ ] Validate contrast and reduced-motion compliance.
- [ ] Run performance profiling across dashboard, lesson reader, simulations, labs, and exam flows.
- [ ] Add route-level lazy loading where it materially improves startup cost.
- [ ] Defer or split heavy simulation and lab code where appropriate.
- [ ] Audit local persistence behavior for profile, progress, flashcards, bookmarks, and exam session state.
- [ ] Validate streak logic, achievements, resume flow, and unlock transitions.
- [ ] Run regression testing across first-visit, returning-user, and completion-state scenarios.
- [ ] Review desktop guard behavior for simulations and labs on smaller screens.
- [ ] Tighten copy, error states, and edge-case messaging.
- [ ] Update README, AGENTS guidance, scripts, and setup docs to match final repo behavior.
- [ ] Prepare a launch checklist covering smoke tests, content completeness, and known-risk signoff.

### Done When
- [ ] Accessibility issues are reduced to an acceptable launch threshold.
- [ ] Performance is acceptable on primary desktop flows.
- [ ] Persistence and progression are stable under normal use.
- [ ] Project documentation matches the implemented product.

## Recommended Execution Sequence
1. Milestone 0: Foundation And App Shell
2. Milestone 1: Learning Structures, UI/UX, And Theme Fidelity
3. Milestone 2: Quiz Engine And Unlock Logic
4. Milestone 3: Simulation Platform
5. Milestone 4: Hands-On Lab Platform
6. Milestone 5: Flashcards And Vault Platform
7. Milestone 6: Domain 1 Content Package - Network Fundamentals
8. Milestone 7: Domain 2 Content Package - Network Access
9. Milestone 8: Domain 3 Content Package - IP Connectivity
10. Milestone 9: Domain 4 Content Package - IP Services
11. Milestone 10: Domain 5 Content Package - Security Fundamentals
12. Milestone 11: Domain 6 Content Package - Automation & Programmability
13. Milestone 12: Exam Mode
14. Milestone 13: Quality, Accessibility, And Launch Readiness

## Suggested Release Gates
- **Vertical Slice Release:** Milestones 0 through 6 with Domain 1 fully playable end to end.
- **MVP Release:** Milestones 0 through 11 with all six domains complete and the supporting review systems live.
- **PRD-Complete Release:** Milestones 0 through 13 across all six domains with exam mode and launch hardening complete.
