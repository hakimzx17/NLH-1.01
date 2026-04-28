# NetLearnHub
> Frontend-Only CCNA 200-301 Study Platform — Product Requirements Document

---

## Summary

NetLearnHub is a premium, desktop-first, frontend-only study platform engineered to take a learner from zero networking knowledge to CCNA 200-301 exam-ready. It combines six deeply integrated learning systems — deep-dive lessons, animated simulations, CLI-based hands-on labs, quizzes, a knowledge vault, and spaced-repetition flashcards — into one cohesive, immersive product. All state lives in localStorage. No backend. No auth. A lightweight guest profile gives it a personal feel. The UI is established: dark neon-emerald aesthetic ("Neon Orbit - Emerald"). This PRD defines everything else.

---

## Problem

Existing CCNA prep resources are fragmented: theory is in books, practice labs require Packet Tracer, flashcards live in Anki, mock exams are on third-party sites, and simulations don't exist at all in most tools. Students must context-switch across 5+ tools, losing momentum, coherence, and motivation. The result: high dropout rates and exam failure from poor recall, not poor intelligence. NetLearnHub collapses all of this into one product with a single progression thread.

---

## User

**Primary**: Zero-to-hero learner. No prior networking knowledge. Self-directed. Motivated but easily demotivated by dry content. Likely studying outside of a classroom. Uses a desktop or laptop. Values momentum, clarity, and visual feedback over academic rigor.

**Secondary**: Mid-study learner who has partial knowledge and wants structured review, targeted domain practice, or exam simulation.

**Not targeted at launch**: Mobile-primary users. Enterprise teams. Instructors creating content.

---

## Product Vision

NetLearnHub should feel like what would happen if a senior network engineer, a game designer, and a UX director built a CCNA course together. Dense knowledge made visceral. Every session should leave the user feeling like they actually understand something, not just that they read something.

The product is opinionated: it has a sequence, a logic, and a personality. It respects the user's intelligence while never assuming prior knowledge. It is the only tool a CCNA student needs.

---

## Core Experience

The learning loop per lesson:

```
Lesson (20-30 min deep dive)
  → Simulation (visual concept reinforcement)
    → Hands-On Lab (CLI + topology interaction)
      → Lesson Quiz (10 questions, 80% to pass)
        → Unlock next lesson
```

Domain completion loop:

```
All lessons in domain complete
  → Domain Quiz (30 questions, domain-scoped)
    → Domain marked complete
      → Available for Exam Mode inclusion
```

Parallel systems (always accessible regardless of progress):
- Flashcard Mode (domain-scoped)
- Vault (reference, no gating)
- Exam Mode (unlocks per completed domain)
- Guest Profile (persistent, localStorage)

---

## Main Feature Systems

### 1. Lesson System

Each lesson is a 20-30 minute comprehensive deep-dive structured as a narrative arc, not a textbook page.

**Lesson anatomy:**
- **Hook**: A real-world scenario or question that frames why this concept matters ("Why can your laptop talk to a server in Tokyo in 40ms?")
- **Concept Core**: Theory explained with storytelling. Named metaphors. Analogies that stick.
- **Visual Blocks**: Inline diagrams, topology visuals, packet flow illustrations. SVG-based, rendered in-component.
- **Callout Types**: `WHY THIS MATTERS`, `EXAM TRAP`, `REMEMBER THIS`, `REAL WORLD`, `ANALOGY` — each with distinct visual treatment.
- **Structured Sections**: Headed, scannable, with estimated reading time per section.
- **CLI Spotlights**: Inline command blocks with syntax highlighting, not just copy-paste snippets — explained line by line.
- **Concept Checkpoint**: 2-3 inline comprehension micro-questions (not graded, immediate feedback, build confidence).
- **Summary Card**: End-of-lesson condensed recall card, auto-saved to the user's Vault review for that lesson.

**Content structure (hardcoded):** Lessons are JS/TS modules exporting a structured lesson object. Each lesson has: `id`, `domainId`, `title`, `estimatedMinutes`, `sections[]`, `callouts[]`, `cliSpotlights[]`, `summaryPoints[]`.

**Lesson count target:**
- Domain 1: ~12 lessons
- Domain 2: ~10 lessons
- Domain 3: ~11 lessons
- Domain 4: ~8 lessons
- Domain 5: ~9 lessons
- Domain 6: ~6 lessons
- Total: ~56 lessons

### 2. Interactive Simulation System

Each lesson ends with a bespoke animated simulation. Not decorative — educational. The simulation makes the abstract concrete.

**Simulation types by concept:**
- **Packet Flow Sim**: Animated packet traveling through OSI layers, with layer labels lighting up
- **Subnetting Visualizer**: Binary breakdown + block allocation, interactive input
- **ARP/MAC Table Sim**: Switch receiving frames, building MAC table, forwarding decisions animated
- **VLAN Segmentation Sim**: Devices grouped, traffic isolation visualized, trunk links highlighted
- **Routing Table Sim**: Router receiving packet, longest-prefix match shown step by step
- **STP Convergence Sim**: Bridge election, port states cycling, topology stabilizing
- **NAT Translation Sim**: Inside/outside IP swap shown mid-flow
- **OSPF Neighbor Sim**: Hello packets, adjacency formation, LSA flooding visualized
- **ACL Filter Sim**: Packet hitting rule list, match/deny logic shown
- **DNS Resolution Sim**: Query chain from stub to root to TLD to authoritative

Each sim has: play/pause, step-through mode, speed control, annotated labels, a brief "What you're seeing" caption.

Simulations are React components receiving a `lessonId` prop and rendering self-contained animation logic. Canvas (via HTML5 Canvas API) or SVG animation depending on complexity.

**Mobile behavior**: On viewport < 1024px, simulation component renders a full-screen overlay: "Simulations require a desktop browser. Switch to a larger screen to continue." Theory remains accessible.

### 3. Hands-On Lab System

Post-simulation, the user enters the Lab. This is the most complex system in the product.

**Lab anatomy:**
- **Topology Panel** (left/top): SVG network diagram showing routers, switches, PCs, cables. Devices are clickable. Topology updates visually as config is applied.
- **CLI Terminal Panel** (right/bottom): A near-real terminal emulator. Prompt mimics IOS: `Router>`, `Router#`, `Router(config)#`, etc.
- **Lab Brief Panel**: Scenario description, objectives checklist, hints toggle.
- **Validation Engine**: On completing a config step, the engine checks entered commands against an expected state object and marks the objective complete.

**CLI Emulator spec:**
- Supports IOS mode switching: `enable`, `configure terminal`, `interface`, `router ospf`, etc.
- Command history (↑/↓ arrows)
- Tab completion for known commands
- `?` help system listing available commands in context
- Typo feedback: "% Unrecognized command"
- Abbreviated commands: `conf t`, `int g0/0`, `sh ip int br` — all resolved
- Output formatting matches real IOS output structure (show commands return formatted tables)
- Commands are validated against a per-lab `expectedConfig` object. Partial credit supported.

**Device types rendered in topology:**
- Router (Cisco-style icon)
- L2 Switch
- L3 Switch
- PC / End Device
- Server
- Firewall
- Cloud/Internet node
- Cable types: copper (solid line), fiber (dashed), serial (dotted)

**Lab data model:**
```
Lab {
  id, lessonId, title, scenario,
  topology: { devices[], links[] },
  objectives: [{ id, description, validationFn }],
  initialState: {},
  hints: string[]
}
```

**Mobile behavior**: Same as simulations — hard error overlay on < 1024px.

### 4. Quiz System

**Lesson Quiz:**
- 10 questions
- Types: MCQ (single), MCQ (multi-select), True/False, Fill-in-the-blank (exact match)
- 80% pass threshold
- Instant feedback per question after submission
- Fail state: "Review the lesson and try again" — re-attempt allowed immediately
- Pass state: lesson marked complete, next lesson unlocked
- Questions hardcoded per lesson, randomized order per attempt

**Domain Quiz:**
- 30 questions drawn from all lessons in the domain
- Randomized from full domain question pool
- Same 80% threshold
- Shows per-lesson performance breakdown on results screen
- Unlocks domain completion badge + Exam Mode availability for that domain

**Quiz UX:**
- Progress bar (question X of Y)
- Timer displayed (not enforced for lesson quiz, enforced in Exam Mode)
- Answer selection feels tactile — animated selection state
- Results screen: score ring, correct/incorrect breakdown, "Review Missed" fast-track to relevant lesson section

### 5. Vault System

The Vault is a permanent reference layer. No gating. Always accessible.

**Categories:**
- **CCNA Must-Know**: Ports & protocols table, subnet mask cheat sheet, wildcard masks, CIDR blocks, binary conversion shortcuts
- **OSI / TCP-IP**: Layer names, PDU names, protocols per layer, encapsulation order
- **CLI Command Reference**: Organized by mode and function. Searchable. Copy-to-clipboard on each command.
- **Protocol Facts**: OSPF, EIGRP, BGP, STP, VTP, CDP, LLDP — key facts, timers, AD values
- **Glossary**: 200+ terms, searchable, linked to source lesson
- **Exam Traps**: Common misconceptions, trick question patterns, things the exam loves to test

**Vault UX:**
- Sidebar category navigation
- Search across all vault content
- Bookmark any item to a personal "My Vault" pinned list (localStorage)
- Each item links back to the relevant lesson for deep review

### 6. Flashcard System

**Structure:**
- 6 decks — one per CCNA domain
- Each deck: ~60-100 cards
- Cards support: front text, back text, optional SVG diagram, optional CLI block
- Card difficulty rating: Again / Hard / Good / Easy (Anki-style)
- Spaced repetition interval logic: simplified SM-2 algorithm, intervals stored in localStorage

**Session flow:**
- User picks a deck (or mixed mode)
- Cards presented one at a time, flip animation on reveal
- User self-rates difficulty
- Session ends after due cards exhausted or user exits
- Stats shown: cards reviewed, retention rate, next review countdown

**State stored per card in localStorage:**
```
{ cardId, interval, easeFactor, dueDate, repetitions, lastRating }
```

**UX:**
- Swipe-gesture support (touch devices — theory only)
- Keyboard shortcuts: Space (flip), 1/2/3/4 (rate)
- "Study before Quiz" nudge: if user attempts a lesson quiz without reviewing flashcards, soft prompt appears

### 7. Progression & Unlock Engine

**Domain access**: All 6 domains visible and accessible from the start. User chooses which domain to study.

**Lesson unlock logic inside a domain**:
- Lesson 1 always unlocked
- Lesson N unlocks only when Lesson N-1 quiz is passed at 80%+
- Locked lessons show title + lock icon + "Complete previous lesson to unlock"

**Completion states:**
```
lesson: locked | available | in-progress | passed | failed
domain: not-started | in-progress | complete
```

**Progress indicators:**
- Dashboard orbit ring: overall % complete across all lessons
- Domain list: per-domain progress dots (existing UI element)
- Lesson list view: per-lesson status chips

**Achievement triggers (visual feedback only, no backend):**
- First lesson complete
- First domain complete
- 7-day streak (localStorage date tracking)
- First exam mode attempt
- All domains complete

---

## Information Architecture

```
/                         → Dashboard (current UI)
/profile                  → Guest profile setup / edit
/domain/:id               → Domain overview + lesson list
/lesson/:id               → Lesson reader
/lesson/:id/simulation    → Post-lesson simulation
/lesson/:id/lab           → Hands-on lab
/lesson/:id/quiz          → Lesson quiz
/domain/:id/quiz          → Domain quiz
/vault                    → Vault home
/vault/:category          → Vault category view
/flashcards               → Flashcard deck picker
/flashcards/:domainId     → Active flashcard session
/exam                     → Exam Mode home
/exam/session             → Active exam session
/exam/results             → Exam results + breakdown
```

---

## User Flow

**First visit:**
1. Dashboard loads → "Welcome" modal → Guest profile creation (name + avatar pick from set)
2. Profile stored to localStorage → Dashboard personalizes (user avatar in sidebar footer)
3. User picks a domain → Domain overview screen
4. Lesson 1 unlocked → User begins

**Returning visit:**
1. Dashboard loads → Progress restored from localStorage
2. Orbit ring shows current % → Last session widget shows resume point
3. User resumes or picks new domain

**Exam Mode entry:**
1. User navigates to Exam Mode
2. Sees which domains are available (completed domains only)
3. Selects domain scope (1 domain, multiple, or full exam)
4. Timer starts → 100 questions → 120 minutes
5. Results screen with domain breakdown

---

## Domain / Lesson Structure

### Domain 1 — Network Fundamentals (~12 lessons)
Network components, topology types, physical layer, OSI model, TCP/IP model, IPv4/IPv6 addressing intro, subnetting fundamentals, wireless concepts, virtualization basics, cloud intro.

### Domain 2 — Network Access (~10 lessons)
VLANs, inter-VLAN routing, STP, EtherChannel, Layer 2 discovery protocols (CDP/LLDP), wireless LAN architecture, AP modes, WLC concepts.

### Domain 3 — IP Connectivity (~11 lessons)
IPv4 routing concepts, static routes, floating static, default routes, OSPFv2 (single area), IPv6 routing intro, first-hop redundancy (HSRP).

### Domain 4 — IP Services (~8 lessons)
NAT/PAT, NTP, DHCP, DNS, SNMP, Syslog, QoS concepts, SSH/Telnet management.

### Domain 5 — Security Fundamentals (~9 lessons)
Security concepts, access control lists (standard + extended), Layer 2 security (port security, DHCP snooping, DAI, storm control), AAA, VPN concepts, wireless security (WPA2/WPA3).

### Domain 6 — Automation & Programmability (~6 lessons)
Traditional vs controller-based networking, Cisco DNA Center, REST APIs, data encoding (JSON/YAML/XML), Ansible/Puppet/Chef concepts, SDN.

---

## Simulation Design Principles

- Every simulation is lesson-specific. No generic "network animation" reused across lessons.
- Simulations run in a defined viewport. They do not break layout.
- Default state = paused. User initiates.
- Step-through mode is always available (not just auto-play).
- Every animated element has a label. No unlabeled motion.
- Color language is consistent with the design system (accent = active/data, muted = inactive, red = drop/deny).
- Simulations do not require user input to complete — they are observational with optional interaction.
- Each sim has a "What am I watching?" caption panel that updates as the animation progresses.

---

## Lab Design Principles

- Labs are scenario-first. The user has a mission before they touch the CLI.
- Objectives are explicit and checkable. No vague "configure the router."
- Hints are available but hidden by default. Accessing hints does not penalize score.
- The topology diagram is live — it reflects configuration state (e.g., link goes green when interface is brought up).
- CLI output is deterministic. The same command always returns the same formatted output for the given lab state.
- Labs are completable without prior CLI experience — guided walkthroughs available via "Guided Mode" toggle.
- Guided Mode shows the next expected command with a brief explanation. The user still types it.
- Every lab has a reset button. No dead ends.

---

## Quiz System Design

- Questions are typed objects: `{ id, type, stem, options[], correct, explanation, lessonId, domainId }`
- `explanation` is shown post-answer — always. Even for correct answers.
- Question types: `single-mcq`, `multi-mcq`, `true-false`, `fill-blank`
- Randomization: question order shuffled per attempt. Options shuffled per attempt.
- No back-navigation during quiz (mirrors exam conditions, builds discipline).
- Results stored to localStorage: `{ quizId, score, attemptDate, missedQuestionIds[] }`

---

## Flashcard System Design

Simplified SM-2 implementation:
- New card: interval = 1 day
- Again: interval resets to 1 day, ease -0.2
- Hard: interval × 1.2
- Good: interval × ease (default ease = 2.5)
- Easy: interval × ease × 1.3, ease +0.15

Cards due today are shown first. New cards introduced at max 20/session. User can override session size.

Card data model:
```ts
type CardState = {
  cardId: string
  interval: number       // days
  easeFactor: number     // 1.3 - 2.5
  dueDate: string        // ISO date
  repetitions: number
  lastRating: 'again' | 'hard' | 'good' | 'easy' | null
}
```

---

## Vault Design

Vault items are typed content objects:
```ts
type VaultItem = {
  id: string
  category: VaultCategory
  title: string
  content: string | TableData | CLIBlock
  tags: string[]
  relatedLessonId?: string
  bookmarked?: boolean   // localStorage flag
}
```

Vault is fully searchable via client-side fuzzy match (Fuse.js). Search indexes title + content + tags.

---

## Progression / Unlock Logic

State shape (localStorage key: `nlh_progress`):
```ts
type Progress = {
  profile: { name: string, avatar: string, joinDate: string }
  lessons: Record<string, LessonProgress>
  domains: Record<string, DomainProgress>
  streaks: { lastVisit: string, currentStreak: number }
  achievements: string[]
}

type LessonProgress = {
  status: 'locked' | 'available' | 'in-progress' | 'passed' | 'failed'
  quizScore?: number
  quizAttempts: number
  labComplete: boolean
  simViewed: boolean
  lastAccessed?: string
}
```

Unlock computation is a pure function: `computeUnlockState(progress, lessonIndex, domainId) → boolean`. No side effects. Derived on render.

---

## Frontend Tech Stack Recommendation

| Concern | Choice | Rationale |
|---|---|---|
| Framework | React 19 | Component model, ecosystem, concurrent features |
| Language | TypeScript | Required for data model safety at this content scale |
| Build Tool | Vite | Already in project, fast HMR, ESM-native |
| Styling | Tailwind CSS v4 + CSS Variables | Already in project. Utility-first + theme tokens |
| Animation | Motion (Framer Motion) | Already in package.json. Best-in-class React animation |
| Routing | React Router v7 | File-based or config-based, nested layouts |
| State | Zustand | Minimal boilerplate, localStorage middleware support |
| Persistence | `zustand/middleware/persist` + localStorage | Zero-config persistence for progress + profile |
| Canvas/SVG | React + SVG for simpler sims, HTML5 Canvas for complex | Case-by-case per simulation |
| Search | Fuse.js | Lightweight fuzzy search for Vault |
| Code highlighting | Shiki | Accurate IOS/CLI syntax highlighting |
| Icons | Lucide React | Already in project |
| Fonts | Keep Outfit (already loaded). Add a monospace for CLI: `JetBrains Mono` |

**Avoid**: Redux (overkill), Next.js (SSR unnecessary for frontend-only), heavy charting libs (custom SVG preferred for network diagrams).

---

## Frontend Architecture

```
src/
  assets/              # Static SVGs, device icons, avatar images
  components/
    ui/                # Design system primitives: Button, Card, Badge, Modal, Tooltip
    layout/            # Sidebar, TopNav, PageShell, MobileGuard
    lesson/            # LessonReader, CalloutBlock, CLISpotlight, ConceptCheckpoint
    simulation/        # SimContainer, sim-specific components (PacketFlowSim, etc.)
    lab/               # LabShell, TopologyCanvas, CLITerminal, ObjectivesPanel
    quiz/              # QuizShell, QuestionCard, ResultsScreen
    flashcard/         # DeckPicker, CardViewer, SessionStats
    vault/             # VaultLayout, VaultSearch, VaultItem
    exam/              # ExamShell, ExamTimer, DragDropQuestion, SimQuestion
    dashboard/         # OrbitRing, GlassWidget, DomainMatrix
    profile/           # ProfileSetup, AvatarPicker
  content/
    lessons/           # One file per lesson: domain1/lesson1.ts, etc.
    quizzes/           # One file per lesson quiz + domain quiz
    flashcards/        # One file per domain deck
    vault/             # Vault items by category
    labs/              # Lab configs per lesson
    simulations/       # Sim data/config per lesson
  hooks/
    useProgress.ts     # Progress read/write abstraction
    useLesson.ts       # Lesson content loader
    useCLI.ts          # CLI state machine
    useFlashcard.ts    # SM-2 logic
    useExam.ts         # Exam session logic
    useVault.ts        # Vault search + bookmarks
  store/
    progressStore.ts   # Zustand store with persist middleware
    profileStore.ts    # Guest profile store
    examStore.ts       # Active exam session state
  lib/
    sm2.ts             # Spaced repetition algorithm
    cliParser.ts       # IOS command parser
    unlockEngine.ts    # Pure unlock computation functions
    fuzzySearch.ts     # Fuse.js wrapper
  pages/               # Route-level components (thin, compose components)
  router.tsx           # Route definitions
  main.tsx
```

---

## State Management Strategy

Two Zustand stores with localStorage persistence:

**`progressStore`** — lesson states, domain states, quiz history, streak, achievements. Persisted under key `nlh_progress`. Hydrated on app load.

**`profileStore`** — guest name, avatar, join date. Persisted under `nlh_profile`.

**`examStore`** — ephemeral. Active exam session only. Not persisted between sessions (exam is single-sitting).

**`flashcardStore`** — card states per deck. Persisted under `nlh_flashcards`.

Rule: **no component reads from localStorage directly**. All reads/writes go through store hooks.

---

## Component System

Design system primitives live in `components/ui/`. All use Tailwind utility classes + CSS variables from the established theme.

Key primitives:
- `<Button variant="primary|ghost|danger" size="sm|md|lg" />`
- `<Card glassy={boolean} accent={boolean} />`
- `<Badge status="locked|available|passed|failed" />`
- `<CalloutBlock type="exam-trap|why-matters|remember|real-world|analogy" />`
- `<CLIBlock commands={string[]} output={string} />`
- `<ProgressRing percent={number} size={number} />`
- `<Modal />`
- `<Tooltip />`
- `<MobileGuard>` — wraps simulation/lab routes, renders error overlay on small screens

Content components are dumb: they receive typed props from content modules and render. No logic in content components.

---

## Design System Direction

Established theme is locked: dark (`#0d1117`), emerald accent (`#00c896`), glass surfaces, `Outfit` font.

Extensions needed:
- `JetBrains Mono` added for all CLI/terminal contexts
- Callout block color tokens: `--callout-trap: #ff6b6b`, `--callout-why: #3b82f6`, `--callout-remember: #f59e0b`, `--callout-world: #8b5cf6`, `--callout-analogy: #06b6d4`
- Status color tokens: `--status-locked: #8b949e`, `--status-available: #3b82f6`, `--status-passed: #00c896`, `--status-failed: #ef4444`
- Difficulty tokens for flashcards: `--card-again: #ef4444`, `--card-hard: #f59e0b`, `--card-good: #00c896`, `--card-easy: #3b82f6`

Typography scale: keep existing body (Outfit). Add `font-mono` class mapping to JetBrains Mono. Display headings use Outfit 700.

---

## Motion / Animation Principles

Using Motion (Framer Motion) throughout.

- **Page transitions**: Fade + subtle Y-translate (200ms). Not dramatic. Purposeful.
- **Lesson sections**: Staggered reveal on scroll-into-view (each section fades up with 80ms delay).
- **Callout blocks**: Slide-in from left with slight spring on first render.
- **Simulation elements**: Motion-driven. Each sim defines its own timeline using `useAnimate` or `motion` components.
- **Flashcard flip**: CSS 3D transform via Motion. Y-axis rotation. 400ms.
- **Quiz answer selection**: Scale + border-color transition on tap/click. 150ms.
- **Orbit ring on dashboard**: SVG stroke-dashoffset animation on value change.
- **Lab topology**: Link state changes (up/down) animate opacity + color. 600ms.
- **Achievement toast**: Slides in from bottom-right, auto-dismisses after 4s.
- **CLI output**: Lines appear one-by-one with 30ms stagger (typewriter effect on show command outputs).

Rule: **no animation without purpose**. Motion communicates state change, reward, or causality — never decoration alone.

---

## Accessibility Considerations

- All interactive elements keyboard-navigable (Tab, Enter, Space, Arrow keys)
- ARIA labels on icon-only buttons
- Color is never the sole differentiator for state (icons + text labels always accompany)
- Focus rings visible (custom emerald focus ring via Tailwind `focus-visible`)
- CLI terminal: screen-reader announces command output (ARIA live region)
- Flashcard flip: keyboard shortcut (Space) with visible hint
- Reduced motion: `@media (prefers-reduced-motion: reduce)` — all Motion animations disabled, instant transitions used
- Contrast: all text on dark background meets WCAG AA minimum (4.5:1)
- Simulation annotations: all animated labels also appear in a static caption panel (not just on canvas)

---

## Build Plan

### Phase 0 — Foundation
- [ ] Set up React + TypeScript + Vite (already scaffolded)
- [ ] Configure React Router v7 with all routes
- [ ] Build Zustand stores with persist middleware
- [ ] Build design system primitives (Button, Card, Badge, Modal)
- [ ] Build PageShell + Sidebar + TopNav (migrate existing HTML to React)
- [ ] Build MobileGuard component
- [ ] Build ProfileSetup flow + AvatarPicker
- [ ] Wire Dashboard to progressStore (dynamic progress data)

### Phase 1 — Lesson System
- [ ] Build LessonReader component + all block types (callouts, CLI, diagrams)
- [ ] Author Domain 1 lessons (all 12) as TypeScript content modules
- [ ] Build ConceptCheckpoint inline quiz component
- [ ] Build lesson progress tracking (started, completed)
- [ ] Build Domain overview page with lesson list + lock states

### Phase 2 — Quiz System
- [ ] Build QuizShell + QuestionCard + ResultsScreen
- [ ] Author Domain 1 lesson quizzes (10 questions each)
- [ ] Author Domain 1 domain quiz (30 questions)
- [ ] Wire unlock engine to quiz pass state
- [ ] Build quiz history + score persistence

### Phase 3 — Simulation System
- [ ] Build SimContainer + play/pause/step controls
- [ ] Build 3 highest-priority sims: PacketFlow, SubnettingVisualizer, VLANSim
- [ ] Wire sims to lesson completion flow
- [ ] Mobile guard integration

### Phase 4 — Lab System
- [ ] Build CLITerminal (most complex component in product)
- [ ] Build IOS command parser + mode state machine
- [ ] Build TopologyCanvas with SVG device/link rendering
- [ ] Build ObjectivesPanel + validation engine
- [ ] Author Domain 1 labs (one per lesson)
- [ ] Build Guided Mode toggle

### Phase 5 — Flashcard + Vault
- [ ] Build DeckPicker + CardViewer + SessionStats
- [ ] Implement SM-2 algorithm in flashcardStore
- [ ] Author all 6 flashcard decks (~60-100 cards each)
- [ ] Build Vault layout + search (Fuse.js)
- [ ] Author all Vault content categories

### Phase 6 — Exam Mode
- [ ] Build ExamShell + ExamTimer
- [ ] Build drag-and-drop question type
- [ ] Build embedded sim question type
- [ ] Build full question bank (100+ questions)
- [ ] Build domain selector for scoped exams
- [ ] Build ResultsScreen with domain breakdown

### Phase 7 — Content Completion
- [ ] Author remaining 5 domains: lessons, quizzes, labs, sims, flashcards
- [ ] QA all unlock logic across all domains
- [ ] Performance audit (lazy loading routes + simulation components)
- [ ] Accessibility audit

---

## Key Screens to Design

1. **Dashboard** — exists. Needs React migration and dynamic data wiring.
2. **Domain Overview** — lesson list with lock states, domain stats, start/resume CTA.
3. **Lesson Reader** — full-width reading view, sticky section nav, callout blocks, CLI spotlights.
4. **Simulation View** — dark modal-style fullscreen, animation canvas, caption panel, controls.
5. **Lab Shell** — split-pane: topology left, CLI right, objectives drawer, guided mode overlay.
6. **Quiz Shell** — focused single-question view, progress bar, no distractions.
7. **Quiz Results** — score ring, breakdown table, missed questions fast-track.
8. **Flashcard Session** — centered card, flip interaction, difficulty rating row, session stats header.
9. **Vault** — sidebar + content area, search bar, bookmarks panel.
10. **Exam Mode Home** — domain scope selector, timer warning, start CTA.
11. **Active Exam** — question view, timer, flag for review, submit button.
12. **Exam Results** — full breakdown: score, time, per-domain performance, weak area callouts.
13. **Profile Setup** — onboarding modal: name input, avatar grid picker.