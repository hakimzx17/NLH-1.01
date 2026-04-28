import { createDefaultProgressState } from '../store/progressStore';
import { computePostQuizUnlocks, computeUnlockState } from '../lib/unlockEngine';

describe('unlockEngine', () => {
  it('keeps the first lesson of the next domain locked until the current domain is complete', () => {
    const progress = createDefaultProgressState();

    expect(progress.lessons['d3-routing-concepts'].status).toBe('locked');
    expect(computeUnlockState(progress.lessons, 0, 'domain-3')).toBe(false);
  });

  it('unlocks the next domain entry lesson after the final lesson in a domain is passed', () => {
    const progress = createDefaultProgressState();
    const lessons = {
      ...progress.lessons,
      'd2-stp': {
        ...progress.lessons['d2-stp'],
        status: 'passed' as const,
        progressPercent: 100,
        quizScore: 88,
      },
      'd2-etherchannel': {
        ...progress.lessons['d2-etherchannel'],
        status: 'in-progress' as const,
        progressPercent: 65,
      },
    };

    const unlocks = computePostQuizUnlocks(lessons, 'd2-etherchannel', 'domain-2', true, 92);

    expect(unlocks.domainUpdates['domain-2']).toEqual({
      status: 'complete',
      completionPercent: 100,
      completedLessons: 4,
    });
    expect(unlocks.lessonUpdates['d3-routing-concepts']).toEqual({
      status: 'available',
      progressPercent: 0,
    });
  });
});
