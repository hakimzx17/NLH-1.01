import { useState } from 'react';

import type { ConceptCheckpoint as ConceptCheckpointType } from '../../content/types';

type ConceptCheckpointProps = {
  checkpoint: ConceptCheckpointType;
};

export function ConceptCheckpoint({ checkpoint }: ConceptCheckpointProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  const isAnswered = selectedId !== null;
  const selectedOption = checkpoint.options.find((opt) => opt.id === selectedId);
  const isCorrect = selectedOption?.isCorrect ?? false;

  function handleSelect(optionId: string) {
    if (isAnswered) return;
    setSelectedId(optionId);
  }

  return (
    <div className="concept-checkpoint" role="group" aria-label="Concept checkpoint">
      <p className="concept-checkpoint__question">{checkpoint.question}</p>

      <div className="concept-checkpoint__options" role="radiogroup" aria-label="Answer options">
        {checkpoint.options.map((option) => {
          let optionClass = 'concept-checkpoint__option';
          if (isAnswered) {
            if (option.isCorrect) {
              optionClass += ' concept-checkpoint__option--correct';
            } else if (option.id === selectedId) {
              optionClass += ' concept-checkpoint__option--incorrect';
            }
          }

          return (
            <button
              className={optionClass}
              disabled={isAnswered}
              key={option.id}
              onClick={() => handleSelect(option.id)}
              role="radio"
              aria-checked={selectedId === option.id}
              type="button"
            >
              <span className="concept-checkpoint__option-letter">{option.id.toUpperCase()}</span>
              <span>{option.text}</span>
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div
          className={`concept-checkpoint__feedback ${isCorrect ? 'concept-checkpoint__feedback--correct' : 'concept-checkpoint__feedback--incorrect'}`}
          role="status"
        >
          {isCorrect ? 'Correct! Well done.' : 'Not quite. Review the correct answer above and think about why it is right.'}
        </div>
      )}

      {!isAnswered && checkpoint.hint && (
        <div>
          <button
            className="concept-checkpoint__hint-toggle"
            onClick={() => setShowHint(!showHint)}
            type="button"
          >
            {showHint ? 'Hide hint' : 'Show hint'}
          </button>
          {showHint && <p className="concept-checkpoint__hint">{checkpoint.hint}</p>}
        </div>
      )}
    </div>
  );
}
