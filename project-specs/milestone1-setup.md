# NetLearnHub — Milestone 1 Specification

## Objective
Establish the correct two-tier lessons UI from docs/buildingLesson.md so theory, simulations, practice labs, flash cards, and lesson quizzes plug into a coherent, theme-correct UX.

## Depends on
Milestone 0 (complete). The app already has: React + TypeScript + Vite, Zustand stores with persist, route placeholders, design system primitives (Button, Card, Badge, Modal, Tooltip, ProgressRing), PageShell + Sidebar + TopNav, and lesson preview content in src/content/domains.ts.

## Critical Reference Files
- docs/tasks.md — Milestone 1 task list (source of truth for scope)
- docs/PRD.md — Product requirements (lesson anatomy, content structure, design system)
- src/content/domains.ts — Existing domain definitions and lesson previews
- src/store/progressStore.ts — Existing progress state with LessonProgress type
- src/styles.css — Existing CSS design tokens and component styles
- src/pages/LessonPage.tsx — Current placeholder lesson page (to be replaced)
- src/pages/DomainPage.tsx — Current domain page (course-map style, to be enhanced)

## Architecture Requirements
- Two-tier pattern: Domains Directory → Lesson Detail View
- Lesson Detail View has: module sidebar + tab navigation (Theory, Simulation, Practice Lab, Flash cards, Lesson Quiz)
- Centered content framing with max-width constraints so sidebar doesn't collide with content
- All components use existing CSS tokens from src/styles.css
- Zustand stores for state, NO direct localStorage reads in components
- TypeScript throughout with explicit types

## Deliverables
1. Domains Directory grid page (replaces/augments current DomainPage)
2. Lesson Detail View shell with module sidebar and tabs
3. Theory tab surface with callout blocks, CLI spotlights, visual blocks, checkpoints, summary cards
4. Tab switching logic with Motion transitions
5. Lesson progress tracking (started, resumed, viewed states)
6. Dashboard widgets wired to real lesson progress
7. Accessibility coverage for keyboard navigation and reading flow
8. Theme fidelity validation across all new surfaces
