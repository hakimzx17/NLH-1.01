import { AnimatePresence, motion } from 'motion/react';
import type { QuizQuestion } from '../../content/types';

type SingleChoiceQuestionProps = {
  question: QuizQuestion;
  selected?: string;
  onSelect: (optionId: string) => void;
};

export function SingleChoiceQuestion({ question, selected, onSelect }: SingleChoiceQuestionProps) {
  if (!question.options) return null;

  return (
    <div className="quiz-question">
      <h3 className="quiz-question__stem">{question.stem}</h3>
      <div className="quiz-question__options" role="radiogroup" aria-label={question.stem}>
        {question.options.map((option) => {
          const isSelected = selected === option.id;

          return (
            <AnimatePresence key={option.id}>
              <motion.button
                className={`quiz-option ${isSelected ? 'quiz-option--selected' : ''}`}
                key={option.id}
                onClick={() => onSelect(option.id)}
                type="button"
                role="radio"
                aria-checked={isSelected}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
              >
                <span className="quiz-option__radio">
                  {isSelected && <span className="quiz-option__radio-dot" />}
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
