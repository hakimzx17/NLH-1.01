import type { DomainId } from '../domains';

// ---------------------------------------------------------------------------
// Flashcard content model
// ---------------------------------------------------------------------------

export type FlashcardDifficulty = 'again' | 'hard' | 'good' | 'easy';

export type Flashcard = {
  id: string;
  domainId: DomainId;
  lessonId?: string;
  front: string;
  back: string;
  diagramSvg?: string;
  cliBlock?: string[];
};

export type FlashcardDeck = {
  id: DomainId;
  domainId: DomainId;
  title: string;
  description: string;
  cardCount: number;
};

// ---------------------------------------------------------------------------
// SM-2 scheduling state (persisted per card)
// ---------------------------------------------------------------------------

export type CardScheduleState = {
  cardId: string;
  interval: number;       // days until next review
  easeFactor: number;     // 1.3 - 2.5 (default 2.5)
  dueDate: string;        // ISO date string
  repetitions: number;
  lastRating: FlashcardDifficulty | null;
};

// ---------------------------------------------------------------------------
// SM-2 algorithm helpers
// ---------------------------------------------------------------------------

export function createInitialCardState(cardId: string): CardScheduleState {
  const today = new Date();

  return {
    cardId,
    interval: 0,
    easeFactor: 2.5,
    dueDate: today.toISOString(),
    repetitions: 0,
    lastRating: null,
  };
}

export function applySm2Rating(
  state: CardScheduleState,
  rating: FlashcardDifficulty,
): CardScheduleState {
  let { interval, easeFactor, repetitions } = state;

  switch (rating) {
    case 'again': {
      interval = 1;
      easeFactor = Math.max(1.3, easeFactor - 0.2);
      repetitions = 0;
      break;
    }
    case 'hard': {
      interval = Math.max(1, Math.round(interval * 1.2));
      easeFactor = Math.max(1.3, easeFactor - 0.15);
      repetitions += 1;
      break;
    }
    case 'good': {
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 3;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetitions += 1;
      break;
    }
    case 'easy': {
      if (repetitions === 0) {
        interval = 2;
      } else if (repetitions === 1) {
        interval = 4;
      } else {
        interval = Math.round(interval * easeFactor * 1.3);
      }
      easeFactor = Math.min(2.5, easeFactor + 0.15);
      repetitions += 1;
      break;
    }
  }

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + interval);

  return {
    cardId: state.cardId,
    interval,
    easeFactor,
    dueDate: dueDate.toISOString(),
    repetitions,
    lastRating: rating,
  };
}

export function isCardDue(state: CardScheduleState): boolean {
  const now = new Date();
  const due = new Date(state.dueDate);
  now.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  return now >= due;
}

export function getDueDateLabel(dueDate: string): string {
  const now = new Date();
  const due = new Date(dueDate);
  now.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const diffMs = due.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return `${Math.abs(diffDays)}d overdue`;
  if (diffDays === 0) return 'Due today';
  if (diffDays === 1) return 'Due tomorrow';
  return `Due in ${diffDays}d`;
}
