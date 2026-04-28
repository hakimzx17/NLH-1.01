# NetLearnHub — Milestone 2 Specification

## Objective
Complete the gated progression loop for lesson-quiz tabs and domains.

## Depends on
Milestone 1 (complete). The app already has: Domains Directory, Lesson Detail View with 5-tab navigation, Theory tab with all content components, module sidebar, progress store, and typed content models.

## Critical Reference Files
- docs/tasks.md — Milestone 2 task list (source of truth for scope)
- docs/PRD.md — Quiz system requirements (question types, 80% pass threshold, randomization, no back-navigation)
- src/content/types.ts — Existing TypeScript models (QuizMetadata already defined)
- src/store/progressStore.ts — Existing progress state with quizAttempts, quizScore fields
- src/pages/LessonDetailPage.tsx — Lesson detail with Lesson Quiz tab (placeholder)
- src/components/lesson/LessonTabContent.tsx — Tab panel rendering

## Architecture Requirements
- Pure function unlock engine (no side effects)
- Quiz state engine with typed question models
- All 4 PRD question types: single-mcq, multi-mcq, true-false, fill-blank
- Randomization: question order shuffled per attempt, options shuffled per attempt
- No back-navigation during quiz (mirrors exam conditions)
- Explanations always shown post-answer
- Results screen with score ring, breakdown, missed-question review
- Quiz attempts persisted to localStorage via Zustand store
- 80% pass threshold unlocks next lesson

## Deliverables
1. Typed quiz question model for all PRD-supported question types
2. Quiz state engine (loading, answering, submission, results)
3. UI for all 4 question types with animated selection states
4. Quiz rules enforcement (randomization, no back-nav, explanations)
5. Progress bar, timing display, animated answer states
6. Results screen with score ring, breakdown, missed-question review
7. Quiz attempt persistence (scores, dates, missed question IDs)
8. Quiz mounted into Lesson Detail View Lesson Quiz tab
9. Pure unlock engine for lessons and domains
10. Progress state updates on quiz pass/fail
11. Quiz outcomes wired to next-lesson unlock behavior
12. Domain quiz support and domain completion behavior
13. Review actions fast-tracking to correct lesson sections
14. Full lesson -> quiz -> unlock loop validation with seeded content
