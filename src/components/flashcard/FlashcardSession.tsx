import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { getDeckByDomainId, getFlashcardById } from '../../content/flashcards';
import type { FlashcardDifficulty } from '../../content/flashcards/types';
import { getDueDateLabel } from '../../content/flashcards/types';
import { useFlashcardStore } from '../../store/flashcardStore';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const DIFFICULTY_CONFIG: Record<FlashcardDifficulty, { label: string; shortcut: string; className: string }> = {
  again: { label: 'Again', shortcut: '1', className: 'flashcard-rate__btn--again' },
  hard: { label: 'Hard', shortcut: '2', className: 'flashcard-rate__btn--hard' },
  good: { label: 'Good', shortcut: '3', className: 'flashcard-rate__btn--good' },
  easy: { label: 'Easy', shortcut: '4', className: 'flashcard-rate__btn--easy' },
};

export function FlashcardSession() {
  const { domainId = '' } = useParams<{ domainId: string }>();
  const prefersReducedMotion = usePrefersReducedMotion();

  const session = useFlashcardStore((state) => state.session);
  const cardStates = useFlashcardStore((state) => state.cardStates);
  const rateCard = useFlashcardStore((state) => state.rateCard);
  const nextCard = useFlashcardStore((state) => state.nextCard);
  const startSession = useFlashcardStore((state) => state.startSession);
  const endSession = useFlashcardStore((state) => state.endSession);

  const [isFlipped, setIsFlipped] = useState(false);

  const deck = getDeckByDomainId(domainId);

  // Auto-start session if none exists for this domain
  useEffect(() => {
    if (!session || session.domainId !== domainId) {
      startSession(domainId);
    }
  }, [domainId, session, startSession]);

  const currentCardId = session?.cardIds[session.currentIndex] ?? null;
  const currentCard = currentCardId ? getFlashcardById(currentCardId) : null;
  const currentSchedule = currentCardId ? cardStates[currentCardId] : null;

  const handleRate = useCallback((rating: FlashcardDifficulty) => {
    if (!currentCardId || !session?.cardIds) return;
    rateCard(currentCardId, rating);
    setIsFlipped(false);
    nextCard();
  }, [currentCardId, session?.cardIds, rateCard, nextCard]);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!session || session.isComplete) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (!isFlipped) {
          setIsFlipped(true);
        }
        return;
      }

      if (isFlipped) {
        const keyMap: Record<string, FlashcardDifficulty> = {
          'Digit1': 'again',
          'Digit2': 'hard',
          'Digit3': 'good',
          'Digit4': 'easy',
        };
        const rating = keyMap[e.code];
        if (rating) {
          e.preventDefault();
          handleRate(rating);
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [session, isFlipped, handleRate]);

  const handleRestart = () => {
    endSession();
    setIsFlipped(false);
    setTimeout(() => startSession(domainId), 50);
  };

  if (!deck) {
    return (
      <section className="page page--narrow">
        <header className="page-header">
          <p className="page-header__eyebrow">Deck not found</p>
          <h1>Deck Not Found</h1>
          <p className="page-header__description">
            The flashcard deck you are looking for does not exist.
          </p>
          <Link className="button button--primary" to="/flashcards">Back to Decks</Link>
        </header>
      </section>
    );
  }

  if (!session || session.domainId !== domainId) {
    return (
      <section className="page page--narrow">
        <header className="page-header">
          <p className="page-header__eyebrow">Loading session</p>
          <h1>Preparing your flashcards...</h1>
        </header>
      </section>
    );
  }

  if (session.isComplete) {
    const retentionRate = session.cardsReviewed > 0
      ? Math.round((session.cardsCorrect / session.cardsReviewed) * 100)
      : 0;

    return (
      <section className="page page--centered" aria-label="Flashcard session complete">
        <header className="page-header page-header--centered">
          <p className="page-header__eyebrow">Session Complete</p>
          <h1>{deck.title}</h1>
          <p className="page-header__description">
            You reviewed {session.cardsReviewed} cards with {retentionRate}% retention.
          </p>
        </header>

        <div className="flashcard-session-stats">
          <div className="flashcard-session-stats__block">
            <span className="flashcard-session-stats__value">{session.cardsReviewed}</span>
            <span className="flashcard-session-stats__label">Cards Reviewed</span>
          </div>
          <div className="flashcard-session-stats__block">
            <span className="flashcard-session-stats__value">{session.cardsCorrect}</span>
            <span className="flashcard-session-stats__label">Recalled Well</span>
          </div>
          <div className="flashcard-session-stats__block">
            <span className="flashcard-session-stats__value">{retentionRate}%</span>
            <span className="flashcard-session-stats__label">Retention Rate</span>
          </div>
        </div>

        <div className="flashcard-session__actions">
          <button
            type="button"
            className="button button--primary button--lg"
            onClick={handleRestart}
          >
            <RotateCcw size={18} />
            Study Again
          </button>
          <Link className="button button--ghost button--lg" to="/flashcards">
            <ArrowLeft size={18} />
            Back to Decks
          </Link>
        </div>
      </section>
    );
  }

  const progressPercent = session.cardIds.length > 0
    ? Math.round(((session.currentIndex) / session.cardIds.length) * 100)
    : 0;

  return (
    <section className="page page--centered" aria-label="Flashcard session">
      <div className="flashcard-session__header">
        <Link to="/flashcards" className="flashcard-session__back">
          <ArrowLeft size={16} />
          Back to Decks
        </Link>
        <div className="flashcard-session__progress">
          <span>{session.currentIndex + 1} / {session.cardIds.length}</span>
          <div className="flashcard-session__progress-bar">
            <span style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentCardId}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          initial={{ opacity: 0, y: 12 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          className="flashcard-session__stage"
        >
          {currentCard ? (
            <>
              <button
                type="button"
                className={`flashcard ${isFlipped ? 'flashcard--flipped' : ''}`}
                onClick={() => !isFlipped && setIsFlipped(true)}
                aria-label={isFlipped ? 'Answer shown. Press 1-4 to rate your recall.' : 'Click or press Space or Enter to reveal answer.'}
                onKeyDown={(e) => {
                  if ((e.code === 'Space' || e.code === 'Enter') && !isFlipped) {
                    e.preventDefault();
                    setIsFlipped(true);
                  }
                }}
              >
                <div className="flashcard__inner">
                  <div className="flashcard__face flashcard__face--front">
                    <span className="flashcard__label">Question</span>
                    <p className="flashcard__text">{currentCard.front}</p>
                    <span className="flashcard__hint">Press Space or click to reveal</span>
                  </div>
                  <div className="flashcard__face flashcard__face--back">
                    <span className="flashcard__label">Answer</span>
                    <p className="flashcard__text flashcard__text--back">{currentCard.back}</p>
                    {currentCard.diagramSvg && (
                      <div
                        className="flashcard__diagram"
                        dangerouslySetInnerHTML={{ __html: currentCard.diagramSvg }}
                        role="img"
                        aria-label="Flashcard diagram"
                      />
                    )}
                    {currentCard.cliBlock && currentCard.cliBlock.length > 0 && (
                      <pre className="flashcard__cli">{currentCard.cliBlock.join('\n')}</pre>
                    )}
                    {currentSchedule && (
                      <span className="flashcard__schedule">
                        {getDueDateLabel(currentSchedule.dueDate)}
                      </span>
                    )}
                  </div>
                </div>
              </button>

              {isFlipped && (
                <div className="flashcard-rate">
                  {(Object.entries(DIFFICULTY_CONFIG) as [FlashcardDifficulty, typeof DIFFICULTY_CONFIG[FlashcardDifficulty]][]).map(
                    ([rating, config]) => (
                      <button
                        key={rating}
                        type="button"
                        className={`flashcard-rate__btn ${config.className}`}
                        onClick={() => handleRate(rating)}
                      >
                        <span className="flashcard-rate__btn-label">{config.label}</span>
                        <span className="flashcard-rate__btn-key">{config.shortcut}</span>
                      </button>
                    ),
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="tab-placeholder">
              <h2 className="tab-placeholder__title">No cards available</h2>
              <p className="tab-placeholder__description">
                This deck does not have any cards yet. Check back later.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
