import { Link } from 'react-router-dom';

import { flashcardDecks } from '../../content/flashcards';
import type { FlashcardDeck } from '../../content/flashcards/types';
import { getDueCardCount } from '../../store/flashcardStore';

export function FlashcardDeckPicker() {
  return (
    <section className="page page--centered" aria-label="Flashcard decks">
      <header className="page-header page-header--centered">
        <p className="page-header__eyebrow">Spaced Repetition Review</p>
        <h1>Flashcards</h1>
        <p className="page-header__description">
          Study cards scheduled using a simplified SM-2 algorithm. Due cards appear first; rate your recall to set the next review interval.
        </p>
      </header>

      <div className="flashcard-deck-grid">
        {flashcardDecks.map((deck: FlashcardDeck) => {
          const dueCount = getDueCardCount(deck.domainId);

          return (
            <Link
              key={deck.id}
              to={`/flashcards/${deck.id}`}
              className="flashcard-deck-card"
            >
              <div className="flashcard-deck-card__header">
                <span className="flashcard-deck-card__domain">{deck.id.replace('domain-', 'D')}</span>
                <span className="flashcard-deck-card__count">{deck.cardCount} cards</span>
              </div>
              <h2 className="flashcard-deck-card__title">{deck.title}</h2>
              <p className="flashcard-deck-card__description">{deck.description}</p>
              <div className="flashcard-deck-card__footer">
                {dueCount > 0 ? (
                  <span className="flashcard-deck-card__due">{dueCount} due</span>
                ) : (
                  <span className="flashcard-deck-card__due flashcard-deck-card__due--none">All caught up</span>
                )}
                <span className="flashcard-deck-card__arrow">Study →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
