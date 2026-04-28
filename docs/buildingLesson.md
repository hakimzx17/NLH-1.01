# Building Lessons — Two-Tier Pattern

## Overview

Every lesson in NetLearnHub follows a two-tier navigation model:

1. **Domains Directory** — A centered grid of domain cards. The user picks a domain.
2. **Lesson Detail View** — A full lesson reader with a module sidebar and tabbed content area.

This document describes the layout, spacing, tab structure, and interaction model so that every lesson surface feels consistent.

---

## Tier 1: Domains Directory

The Domains Directory page (`/domains`) is a centered container with a grid of large domain cards.

### Layout Rules

- The page content is wrapped in a centered container: `max-width: 72rem`, `margin-inline: auto`, `padding-inline: 2rem`.
- The container leaves safe horizontal spacing so the app sidebar never collides with content.
- Domain cards are large, visually distinct, and show:
  - Domain number and title
  - Exam weight percentage
  - Progress bar (derived from `progressStore`)
  - Hover state with subtle lift and border glow
  - Locked state (if the domain is locked — not yet implemented in Milestone 1)
  - Active emphasis for the domain the user is currently studying

### Interaction

- Clicking a domain card navigates to the Lesson Detail View for the first available lesson in that domain.
- The user can also click a specific lesson from within the domain card's expanded detail (future).

---

## Tier 2: Lesson Detail View

The Lesson Detail View (`/lesson/:id`) is a two-column layout:

```
┌──────────────────────────────────────────────────────┐
│  ← Back to Domains                                   │
│  Domain 1 · Network Fundamentals                     │
│  1.1 Network Components and Roles                    │
├──────────────┬───────────────────────────────────────┤
│ Module       │  [Theory] [Simulation] [Practice Lab] │
│ Sidebar      │  [Flash cards] [Lesson Quiz]          │
│              │                                       │
│ • 1.1 Active │  ┌─────────────────────────────────┐  │
│   1.2 Locked │  │                                 │  │
│   1.3 Locked │  │     Centered main-content       │  │
│   1.4 Locked │  │     framing (max-width 48rem)   │  │
│              │  │                                 │  │
│              │  │     Theory / Sim / Lab /        │  │
│              │  │     Flashcards / Quiz content   │  │
│              │  │                                 │  │
│              │  └─────────────────────────────────┘  │
└──────────────┴───────────────────────────────────────┘
```

### Module Sidebar

The module sidebar lists all lessons in the current domain. Each item has one of three states:

| State | Visual Treatment |
|-------|-----------------|
| **Completed** | Emerald checkmark, muted text, clickable |
| **Active** | Emerald left border glow, bold text, highlighted background |
| **Locked** | Muted text, lock icon, non-interactive (opacity reduced) |

- The sidebar is `16rem` wide, fixed within the lesson view.
- Clicking a lesson navigates to that lesson's detail view.
- The sidebar uses `position: sticky` so it stays visible while scrolling theory content.

### Tab Navigation

Five tabs sit at the top of the main content area:

1. **Theory** — Deep-dive lesson content with callouts, CLI spotlights, checkpoints, and summary cards.
2. **Simulation** — Animated concept reinforcement (desktop only).
3. **Practice Lab** — CLI-based hands-on lab (desktop only).
4. **Flash cards** — Lesson-linked flashcard review entry point.
5. **Lesson Quiz** — 10-question quiz to unlock the next lesson.

Tab switching uses Motion transitions: **fade + subtle Y-translate** over 200ms.

### Centered Main-Content Framing

The content inside each tab is centered with a max-width constraint:

- `max-width: 48rem` for theory text content (optimal reading width).
- `margin-inline: auto` for horizontal centering.
- `padding-inline: 2rem` for safe breathing room from the sidebar.

This ensures the sidebar never collides with lesson text, diagrams, or code blocks.

---

## Theory Tab Structure

The Theory tab renders structured lesson content. Each lesson module exports a typed object with:

```
lesson {
  id, domainId, moduleLabel, title, estimatedMinutes
  sections[]        // Main content sections with heading, body, estimated reading time
  callouts[]        // WHY THIS MATTERS, EXAM TRAP, REMEMBER THIS, REAL WORLD, ANALOGY
  cliSpotlights[]   // CLI command blocks with line-by-line explanations
  checkpoints[]     // Inline concept-check micro-questions with immediate feedback
  summaryPoints[]   // End-of-lesson recall card
}
```

### Content Flow

1. **Hook** — Opening section that frames why the concept matters.
2. **Concept Core** — Numbered sections with headings, paragraphs, and inline emphasis.
3. **Callout Blocks** — Distinct visual treatments for different callout types:
   - `WHY THIS MATTERS` — Blue (`--callout-why: #3b82f6`)
   - `EXAM TRAP` — Red (`--callout-trap: #ff6b6b`)
   - `REMEMBER THIS` — Amber (`--callout-remember: #f59e0b`)
   - `REAL WORLD` — Purple (`--callout-world: #8b5cf6`)
   - `ANALOGY` — Cyan (`--callout-analogy: #06b6d4`)
4. **CLI Spotlights** — JetBrains Mono code blocks with explanations.
5. **Visual Blocks** — SVG-based inline diagrams and topology illustrations.
6. **Concept Checkpoints** — Interactive micro-questions with immediate feedback.
7. **Summary Card** — Condensed recall card, auto-saved to vault review.

### Continuation Actions

At the bottom of the Theory tab, continuation actions guide the user to the next study step:
- "Open Simulation" → Simulation tab
- "Open Practice Lab" → Practice Lab tab
- "Take Lesson Quiz" → Lesson Quiz tab

---

## Sidebar-Safe Spacing

The two-column lesson layout uses CSS Grid:

```css
.lesson-detail {
  display: grid;
  grid-template-columns: 16rem minmax(0, 1fr);
  gap: 2rem;
  max-width: 72rem;
  margin-inline: auto;
  padding-inline: 2rem;
}
```

The main content area has its own max-width for readability:

```css
.lesson-detail__content {
  max-width: 48rem;
  margin-inline: auto;
}
```

This ensures:
- The sidebar is always visible and doesn't overlap content.
- Theory text is at an optimal reading width (~75 characters per line).
- The layout is responsive and collapses gracefully on smaller screens.

---

## Motion / Animation

- **Page transitions**: Fade + Y-translate 12px over 200ms.
- **Tab transitions**: Fade + Y-translate 8px over 200ms.
- **Callout blocks**: Slide-in from left with slight spring on first render.
- **Checkpoint feedback**: Scale + color transition on answer selection.
- **Reduced motion**: All animations disabled when `prefers-reduced-motion: reduce`.
