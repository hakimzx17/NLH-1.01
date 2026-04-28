import { AnimatePresence, motion } from 'motion/react';
import type { QuizQuestion } from '../../content/types';

type MultiSelectQuestionProps = {
  question: QuizQuestion;
  selected: string[];
  onSelect: (optionIds: string[]) => void;
};

export function MultiSelectQuestion({ question, selected, onSelect }: MultiSelectQuestionProps) {
  if (!question.options) return null;

  function toggleOption(optionId: string) {
    const isSelected = selected.includes(optionId);
    const next = isSelected ? selected.filter((id) => id !== optionId) : [...selected, optionId];
    onSelect(next);
  }

  return (
    <div className="quiz-question">
      <h3 className="quiz-question__stem">{question.stem}</h3>
      <p className="quiz-question__hint">Select all that apply</p>
      <div className="quiz-question__options" role="group" aria-label={question.stem}>
        {question.options.map((option) => {
          const isSelected = selected.includes(option.id);

          return (
            <AnimatePresence key={option.id}>
              <motion.button
                className={`quiz-option ${isSelected ? 'quiz-option--selected' : ''}`}
                key={option.id}
                onClick={() => toggleOption(option.id)}
                type="button"
                role="checkbox"
                aria-checked={isSelected}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
              >
                <span className="quiz-option__checkbox">
                  {isSelected && <span className="quiz-option__checkmark">&#10003;</span>}
                </span>
                <span className="quiz-option__text">{option.text}</span>
              </motion.button>
            </AnimatePresence>
          );
        })}
      </div>
    </div>
  );
}
