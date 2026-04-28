import type { DomainId } from '../content/domains';
import { domains, getDomainLessonPreviews } from '../content/domains';
import type { LessonProgress } from '../store/progressStore';

export type UnlockResult = {
  lessonUpdates: Record<string, Partial<LessonProgress>>;
  domainUpdates: Record<string, { status?: string; completionPercent?: number; completedLessons?: number }>;
};

function isDomainComplete(lessons: Record<string, LessonProgress>, domainId: DomainId): boolean {
  return getDomainLessonPreviews(domainId).every((lesson) => lessons[lesson.id]?.status === 'passed');
}

function getNextDomainId(domainId: DomainId): DomainId | null {
  const currentIndex = domains.findIndex((domain) => domain.id === domainId);

  if (currentIndex < 0 || currentIndex >= domains.length - 1) {
    return null;
  }

  return domains[currentIndex + 1].id;
}

// ---------------------------------------------------------------------------
// Pure unlock computation
// ---------------------------------------------------------------------------

export function computeUnlockState(
  lessons: Record<string, LessonProgress>,
  lessonIndex: number,
  domainId: DomainId,
): boolean {
  if (lessonIndex === 0) {
    const currentDomainIndex = domains.findIndex((domain) => domain.id === domainId);

    if (currentDomainIndex <= 0) {
      return true;
    }

    return isDomainComplete(lessons, domains[currentDomainIndex - 1].id);
  }

  const domainLessons = getDomainLessonPreviews(domainId);

  if (lessonIndex > domainLessons.length) {
    return false;
  }

  // Lesson N unlocks only when Lesson N-1 quiz is passed at 80%+
  const previousLesson = domainLessons[lessonIndex - 1];
  const previousProgress = lessons[previousLesson.id];

  return previousProgress?.status === 'passed' && (previousProgress.quizScore ?? 0) >= 80;
}

// ---------------------------------------------------------------------------
// Compute unlock state after a quiz result
// ---------------------------------------------------------------------------

export function computePostQuizUnlocks(
  lessons: Record<string, LessonProgress>,
  lessonId: string,
  domainId: DomainId,
  passed: boolean,
  score: number,
): UnlockResult {
  const lessonUpdates: Record<string, Partial<LessonProgress>> = {};
  const domainUpdates: Record<string, { status?: string; completionPercent?: number; completedLessons?: number }> = {};

  // Update the current lesson
  lessonUpdates[lessonId] = {
    quizScore: score,
    quizAttempts: (lessons[lessonId]?.quizAttempts ?? 0) + 1,
    status: passed ? 'passed' : 'in-progress',
    progressPercent: passed ? 100 : lessons[lessonId]?.progressPercent ?? 50,
  };

  if (passed) {
    // Unlock the next lesson in the domain
    const domainLessons = getDomainLessonPreviews(domainId);
    const currentIndex = domainLessons.findIndex((l) => l.id === lessonId);

    if (currentIndex >= 0 && currentIndex < domainLessons.length - 1) {
      const nextLesson = domainLessons[currentIndex + 1];
      lessonUpdates[nextLesson.id] = {
        status: 'available',
        progressPercent: 0,
      };
    }

    // Check if all lessons in domain are now passed
    const allLessonsPassed = domainLessons.every((lesson) => {
      if (lesson.id === lessonId) return true;

      const lp = lessons[lesson.id];
      return lp?.status === 'passed';
    });

    if (allLessonsPassed) {
      domainUpdates[domainId] = {
        status: 'complete',
        completionPercent: 100,
        completedLessons: domainLessons.length,
      };

      const nextDomainId = getNextDomainId(domainId);
      const nextDomainFirstLesson = nextDomainId ? getDomainLessonPreviews(nextDomainId)[0] : undefined;

      if (nextDomainFirstLesson && lessons[nextDomainFirstLesson.id]?.status === 'locked') {
        lessonUpdates[nextDomainFirstLesson.id] = {
          ...lessonUpdates[nextDomainFirstLesson.id],
          status: 'available',
          progressPercent: 0,
        };
      }
    }
  }

  // Update domain completion based on passed lessons
  const domainLessons = getDomainLessonPreviews(domainId);
  const passedCount = domainLessons.filter((lesson) => {
    if (lesson.id === lessonId) return passed;
    return lessons[lesson.id]?.status === 'passed';
  }).length;

  if (!domainUpdates[domainId]) {
    domainUpdates[domainId] = {};
  }

  domainUpdates[domainId].completedLessons = passedCount;
  domainUpdates[domainId].completionPercent = Math.round((passedCount / domainLessons.length) * 100);

  if (domainUpdates[domainId].status !== 'complete' && passedCount > 0) {
    domainUpdates[domainId].status = 'in-progress';
  }

  return { lessonUpdates, domainUpdates };
}

// ---------------------------------------------------------------------------
// Domain quiz unlock check
// ---------------------------------------------------------------------------

export function canAttemptDomainQuiz(lessons: Record<string, LessonProgress>, domainId: DomainId): boolean {
  const domainLessons = getDomainLessonPreviews(domainId);

  return domainLessons.every((lesson) => lessons[lesson.id]?.status === 'passed');
}
