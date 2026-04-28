import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { domains, getDomainLessonPreviews, getLessonPreviewById } from '../content/domains';
import type { DomainId } from '../content/domains';
import type { QuizAttempt } from '../content/types';

export type LessonStatus = 'locked' | 'available' | 'in-progress' | 'passed' | 'failed';
export type DomainStatus = 'not-started' | 'in-progress' | 'complete';

export type LessonProgress = {
  id: string;
  domainId: DomainId;
  title: string;
  moduleLabel: string;
  status: LessonStatus;
  progressPercent: number;
  quizScore?: number;
  quizAttempts: number;
  labComplete: boolean;
  simViewed: boolean;
  lastAccessed?: string;
  quizHistory?: QuizAttempt[];
};

export type DomainProgress = {
  status: DomainStatus;
  completionPercent: number;
  completedLessons: number;
  totalLessons: number;
};

type ProgressState = {
  lessons: Record<string, LessonProgress>;
  domains: Record<DomainId, DomainProgress>;
  studyMinutes: number;
  streaks: {
    lastVisit: string;
    currentStreak: number;
  };
  achievements: string[];
  lastLessonId: string;
  nextExamLabel: string;
  quizAttempts: Record<string, QuizAttempt[]>;
  markLessonAccessed: (lessonId: string) => void;
  markSimulationViewed: (lessonId: string) => void;
  markLabComplete: (lessonId: string) => void;
  recordQuizAttempt: (lessonId: string, attempt: QuizAttempt) => void;
  applyLessonUpdates: (updates: Record<string, Partial<LessonProgress>>) => void;
  applyDomainUpdates: (updates: Record<string, { status?: string; completionPercent?: number; completedLessons?: number }>) => void;
  hydrateVisit: () => void;
  resetProgress: () => void;
};

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function getYesterdayKey(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return yesterday.toISOString().slice(0, 10);
}

function buildSeedLessons(): Record<string, LessonProgress> {
  const lessons: Record<string, LessonProgress> = {};

  const seededProgress: Partial<Record<string, Partial<LessonProgress>>> = {
    'd1-network-components': { status: 'passed', progressPercent: 100, quizScore: 90, quizAttempts: 1, labComplete: true, simViewed: true },
    'd1-osi-model': { status: 'passed', progressPercent: 100, quizScore: 100, quizAttempts: 1, labComplete: true, simViewed: true },
    'd1-ip-addressing': { status: 'passed', progressPercent: 100, quizScore: 80, quizAttempts: 2, labComplete: true, simViewed: true },
    'd1-subnetting-basics': { status: 'passed', progressPercent: 100, quizScore: 90, quizAttempts: 1, labComplete: true, simViewed: true },
    'd2-vlans': { status: 'passed', progressPercent: 100, quizScore: 90, quizAttempts: 1, labComplete: true, simViewed: true },
    'd2-inter-vlan-routing': { status: 'passed', progressPercent: 100, quizScore: 80, quizAttempts: 1, labComplete: true, simViewed: true },
    'd2-stp': { status: 'in-progress', progressPercent: 60, quizAttempts: 0, labComplete: false, simViewed: true },
    'd2-etherchannel': { status: 'available', progressPercent: 0, quizAttempts: 0, labComplete: false, simViewed: false },
  };

  let previousDomainComplete = true;

  for (const domain of domains) {
    const previews = getDomainLessonPreviews(domain.id);
    const domainInitiallyUnlocked = previousDomainComplete;

    previews.forEach((lesson, index) => {
      const seed = seededProgress[lesson.id];

      lessons[lesson.id] = {
        id: lesson.id,
        domainId: lesson.domainId,
        title: lesson.title,
        moduleLabel: lesson.moduleLabel,
        status: seed?.status ?? (index === 0 && domainInitiallyUnlocked ? 'available' : 'locked'),
        progressPercent: seed?.progressPercent ?? 0,
        quizScore: seed?.quizScore,
        quizAttempts: seed?.quizAttempts ?? 0,
        labComplete: seed?.labComplete ?? false,
        simViewed: seed?.simViewed ?? false,
        lastAccessed: lesson.id === 'd2-stp' ? new Date().toISOString() : undefined,
      };
    });

    previousDomainComplete = previews.every((lesson) => seededProgress[lesson.id]?.status === 'passed');
  }

  return lessons;
}

function buildSeedDomains(): Record<DomainId, DomainProgress> {
  return {
    'domain-1': { status: 'complete', completionPercent: 100, completedLessons: 12, totalLessons: 12 },
    'domain-2': { status: 'in-progress', completionPercent: 80, completedLessons: 8, totalLessons: 10 },
    'domain-3': { status: 'not-started', completionPercent: 0, completedLessons: 0, totalLessons: 11 },
    'domain-4': { status: 'not-started', completionPercent: 0, completedLessons: 0, totalLessons: 8 },
    'domain-5': { status: 'not-started', completionPercent: 0, completedLessons: 0, totalLessons: 9 },
    'domain-6': { status: 'not-started', completionPercent: 0, completedLessons: 0, totalLessons: 6 },
  };
}

export function createDefaultProgressState(): Omit<
  ProgressState,
  'hydrateVisit' | 'markLessonAccessed' | 'markSimulationViewed' | 'markLabComplete' | 'recordQuizAttempt' | 'applyLessonUpdates' | 'applyDomainUpdates' | 'resetProgress'
> {
  return {
    lessons: buildSeedLessons(),
    domains: buildSeedDomains(),
    studyMinutes: 1455,
    streaks: {
      lastVisit: getTodayKey(),
      currentStreak: 7,
    },
    achievements: ['first-lesson-complete', 'first-domain-complete'],
    lastLessonId: 'd2-stp',
    nextExamLabel: 'In 3 days',
    quizAttempts: {},
  };
}

function buildFallbackLesson(lessonId: string): LessonProgress {
  const inferredPreview = getLessonPreviewById(lessonId);

  if (inferredPreview) {
    return {
      id: inferredPreview.id,
      domainId: inferredPreview.domainId,
      title: inferredPreview.title,
      moduleLabel: inferredPreview.moduleLabel,
      status: 'in-progress',
      progressPercent: 0,
      quizAttempts: 0,
      labComplete: false,
      simViewed: false,
      lastAccessed: new Date().toISOString(),
    };
  }

  return {
    id: lessonId,
    domainId: 'domain-1',
    title: 'Custom lesson placeholder',
    moduleLabel: '0.0',
    status: 'in-progress',
    progressPercent: 0,
    quizAttempts: 0,
    labComplete: false,
    simViewed: false,
    lastAccessed: new Date().toISOString(),
  };
}

export function getOverallProgressPercent(domainProgress: Record<DomainId, DomainProgress>): number {
  const totals = Object.values(domainProgress).reduce((sum, domain) => sum + domain.totalLessons, 0);

  if (totals === 0) {
    return 0;
  }

  const weightedCompletion = Object.values(domainProgress).reduce(
    (sum, domain) => sum + (domain.completionPercent / 100) * domain.totalLessons,
    0,
  );

  return Math.round((weightedCompletion / totals) * 100);
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      ...createDefaultProgressState(),
      hydrateVisit: () =>
        set((state) => {
          const today = getTodayKey();

          if (state.streaks.lastVisit === today) {
            return state;
          }

          const shouldIncrement = state.streaks.lastVisit === getYesterdayKey();

          return {
            streaks: {
              lastVisit: today,
              currentStreak: shouldIncrement ? state.streaks.currentStreak + 1 : 1,
            },
          };
        }),
      markLessonAccessed: (lessonId) =>
        set((state) => {
          const currentLesson = state.lessons[lessonId] ?? buildFallbackLesson(lessonId);
          const nextLesson: LessonProgress = {
            ...currentLesson,
            status: currentLesson.status === 'available' ? 'in-progress' : currentLesson.status,
            lastAccessed: new Date().toISOString(),
          };

          return {
            lastLessonId: lessonId,
            lessons: {
              ...state.lessons,
              [lessonId]: nextLesson,
            },
            domains: {
              ...state.domains,
              [nextLesson.domainId]: {
                ...state.domains[nextLesson.domainId],
                status:
                  state.domains[nextLesson.domainId].status === 'not-started'
                    ? 'in-progress'
                    : state.domains[nextLesson.domainId].status,
              },
            },
          };
        }),
      markSimulationViewed: (lessonId) =>
        set((state) => {
          const currentLesson = state.lessons[lessonId] ?? buildFallbackLesson(lessonId);

          if (currentLesson.status === 'locked') {
            return state;
          }

          const nextProgressPercent =
            currentLesson.status === 'passed'
              ? 100
              : Math.max(currentLesson.progressPercent, currentLesson.labComplete ? 70 : 45);

          const nextLesson: LessonProgress = {
            ...currentLesson,
            simViewed: true,
            progressPercent: nextProgressPercent,
            status: currentLesson.status === 'available' ? 'in-progress' : currentLesson.status,
            lastAccessed: new Date().toISOString(),
          };

          return {
            lastLessonId: lessonId,
            lessons: {
              ...state.lessons,
              [lessonId]: nextLesson,
            },
            domains: {
              ...state.domains,
              [nextLesson.domainId]: {
                ...state.domains[nextLesson.domainId],
                status:
                  state.domains[nextLesson.domainId].status === 'not-started'
                    ? 'in-progress'
                    : state.domains[nextLesson.domainId].status,
              },
            },
          };
        }),
      markLabComplete: (lessonId) =>
        set((state) => {
          const currentLesson = state.lessons[lessonId] ?? buildFallbackLesson(lessonId);

          if (currentLesson.status === 'locked') {
            return state;
          }

          const nextProgressPercent =
            currentLesson.status === 'passed'
              ? 100
              : Math.max(currentLesson.progressPercent, currentLesson.simViewed ? 70 : 60);

          const nextLesson: LessonProgress = {
            ...currentLesson,
            labComplete: true,
            progressPercent: nextProgressPercent,
            status: currentLesson.status === 'available' ? 'in-progress' : currentLesson.status,
            lastAccessed: new Date().toISOString(),
          };

          return {
            lastLessonId: lessonId,
            lessons: {
              ...state.lessons,
              [lessonId]: nextLesson,
            },
            domains: {
              ...state.domains,
              [nextLesson.domainId]: {
                ...state.domains[nextLesson.domainId],
                status:
                  state.domains[nextLesson.domainId].status === 'not-started'
                    ? 'in-progress'
                    : state.domains[nextLesson.domainId].status,
              },
            },
          };
        }),
      recordQuizAttempt: (lessonId, attempt) =>
        set((state) => {
          const currentLesson = state.lessons[lessonId];

          if (!currentLesson) {
            return state;
          }

          const existingHistory = state.quizAttempts[lessonId] ?? [];
          const newHistory = [...existingHistory, attempt];

          return {
            lessons: {
              ...state.lessons,
              [lessonId]: {
                ...currentLesson,
                quizScore: attempt.score,
                quizAttempts: currentLesson.quizAttempts + 1,
                quizHistory: newHistory,
              },
            },
            quizAttempts: {
              ...state.quizAttempts,
              [lessonId]: newHistory,
            },
          };
        }),
      applyLessonUpdates: (updates) =>
        set((state) => {
          const updatedLessons = { ...state.lessons };

          for (const [lessonId, update] of Object.entries(updates)) {
            const current = updatedLessons[lessonId];

            if (current) {
              updatedLessons[lessonId] = { ...current, ...update };
            }
          }

          return { lessons: updatedLessons };
        }),
      applyDomainUpdates: (updates) =>
        set((state) => {
          const updatedDomains = { ...state.domains };

          for (const [domainId, update] of Object.entries(updates)) {
            const current = updatedDomains[domainId as DomainId];

            if (current) {
              updatedDomains[domainId as DomainId] = {
                ...current,
                ...update,
                status: (update.status as DomainStatus) ?? current.status,
                completionPercent: update.completionPercent ?? current.completionPercent,
                completedLessons: update.completedLessons ?? current.completedLessons,
              };
            }
          }

          return { domains: updatedDomains };
        }),
      resetProgress: () => set(createDefaultProgressState()),
    }),
    {
      name: 'nlh_progress',
      version: 1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
