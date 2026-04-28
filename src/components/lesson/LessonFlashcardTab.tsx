import { Layers, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

import { getDeckByDomainId, getFlashcardsByLessonId } from '../../content/flashcards';
import { getDueCardCount } from '../../store/flashcardStore';

type LessonFlashcardTabProps = {
  lessonId: string;
  domainId: string;
};

export function LessonFlashcardTab({ lessonId, domainId }: LessonFlashcardTabProps) {
  const lessonCards = getFlashcardsByLessonId(lessonId);
  const deck = getDeckByDomainId(domainId);
  const dueCount = deck ? getDueCardCount(domainId) : 0;

  if (!deck) {
    return (
      <div className="tab-placeholder">
        <div className="tab-placeholder__icon"><Layers size={32} /></div>
        <h2 className="tab-placeholder__title">No deck available</h2>
        <p className="tab-placeholder__description">
          A flashcard deck for this domain has not been created yet.
        </p>
      </div>
    );
  }

  return (
    <div className="lesson-flashcard-tab">
      <div className="lesson-flashcard-tab__overview">
        <div className="lesson-flashcard-tab__info">
          <h2 className="lesson-flashcard-tab__title">{deck.title} Deck</h2>
          <p className="lesson-flashcard-tab__description">
            {deck.cardCount} cards total in this domain. {dueCount > 0 ? `${dueCount} cards are due for review.` : 'All caught up!'}
          </p>
          {lessonCards.length > 0 && (
            <p className="lesson-flashcard-tab__lesson-count">
              {lessonCards.length} card{lessonCards.length !== 1 ? 's' : ''} linked to this lesson.
            </p>
          )}
        </div>
        <div className="lesson-flashcard-tab__actions">
          <Link
            to={`/flashcards/${domainId}`}
            className="button button--primary button--lg"
          >
            <Play size={18} />
            Start Session
          </Link>
        </div>
      </div>

      {lessonCards.length > 0 && (
        <div className="lesson-flashcard-tab__cards">
          <h3 className="lesson-flashcard-tab__cards-title">Cards from this lesson</h3>
          <ul className="lesson-flashcard-tab__card-list">
            {lessonCards.map((card) => (
              <li key={card.id} className="lesson-flashcard-tab__card-item">
                <span className="lesson-flashcard-tab__card-front">{card.front}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
