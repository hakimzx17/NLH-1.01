import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { getAllFlashcards, getFlashcardsByDomainId } from '../content/flashcards';
import type { CardScheduleState, FlashcardDifficulty } from '../content/flashcards/types';
import { applySm2Rating, createInitialCardState, isCardDue } from '../content/flashcards/types';

type FlashcardSessionState = {
  domainId: string | null;
  cardIds: string[];
  currentIndex: number;
  cardsReviewed: number;
  cardsCorrect: number;
  isComplete: boolean;
};

type FlashcardStoreState = {
  cardStates: Record<string, CardScheduleState>;
  session: FlashcardSessionState | null;
  rateCard: (cardId: string, rating: FlashcardDifficulty) => void;
  startSession: (domainId: string, maxCards?: number) => void;
  endSession: () => void;
  nextCard: () => void;
  resetCardState: (cardId: string) => void;
  resetAllCardState: () => void;
};

function buildInitialCardStates(): Record<string, CardScheduleState> {
  const states: Record<string, CardScheduleState> = {};
  const allCards = getAllFlashcards();

  for (const card of allCards) {
    states[card.id] = createInitialCardState(card.id);
  }

  return states;
}

function getDueCardsForDomain(domainId: string): string[] {
  return getFlashcardsByDomainId(domainId)
    .map((card) => card.id)
    .filter((cardId) => {
      const state = useFlashcardStore.getState().cardStates[cardId];
      if (!state) return true;
      return isCardDue(state);
    });
}

export const useFlashcardStore = create<FlashcardStoreState>()(
  persist(
    (set) => ({
      cardStates: buildInitialCardStates(),
      session: null,
      rateCard: (cardId, rating) => {
        set((state) => {
          const currentState = state.cardStates[cardId] ?? createInitialCardState(cardId);
          const newState = applySm2Rating(currentState, rating);

          const session = state.session;
          let updatedSession = session;

          if (session) {
            const isCorrect = rating === 'good' || rating === 'easy';
            updatedSession = {
              ...session,
              cardsReviewed: session.cardsReviewed + 1,
              cardsCorrect: session.cardsCorrect + (isCorrect ? 1 : 0),
            };
          }

          return {
            cardStates: {
              ...state.cardStates,
              [cardId]: newState,
            },
            session: updatedSession,
          };
        });
      },
      startSession: (domainId, maxCards = 20) => {
        const dueCards = getDueCardsForDomain(domainId);
        const sessionCards = dueCards.slice(0, maxCards);

        if (sessionCards.length === 0) {
          const allCards = getFlashcardsByDomainId(domainId).map((card) => card.id);
          const shuffled = [...allCards].sort(() => Math.random() - 0.5);
          set({
            session: {
              domainId,
              cardIds: shuffled.slice(0, maxCards),
              currentIndex: 0,
              cardsReviewed: 0,
              cardsCorrect: 0,
              isComplete: false,
            },
          });
          return;
        }

        set({
          session: {
            domainId,
            cardIds: sessionCards,
            currentIndex: 0,
            cardsReviewed: 0,
            cardsCorrect: 0,
            isComplete: false,
          },
        });
      },
      endSession: () => {
        set({ session: null });
      },
      nextCard: () => {
        set((state) => {
          if (!state.session) return state;
          const nextIndex = state.session.currentIndex + 1;

          if (nextIndex >= state.session.cardIds.length) {
            return {
              session: {
                ...state.session,
                currentIndex: nextIndex,
                isComplete: true,
              },
            };
          }

          return {
            session: {
              ...state.session,
              currentIndex: nextIndex,
            },
          };
        });
      },
      resetCardState: (cardId) => {
        set((state) => ({
          cardStates: {
            ...state.cardStates,
            [cardId]: createInitialCardState(cardId),
          },
        }));
      },
      resetAllCardState: () => {
        set({ cardStates: buildInitialCardStates() });
      },
    }),
    {
      name: 'nlh_flashcards',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cardStates: state.cardStates }),
    },
  ),
);

export function getDueCardCount(domainId: string): number {
  const cards = getFlashcardsByDomainId(domainId);
  let count = 0;

  for (const card of cards) {
    const state = useFlashcardStore.getState().cardStates[card.id];
    if (!state || isCardDue(state)) {
      count++;
    }
  }

  return count;
}
