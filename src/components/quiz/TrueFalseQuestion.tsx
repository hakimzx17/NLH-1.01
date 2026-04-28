import { AnimatePresence, motion } from 'motion/react';
import type { QuizQuestion } from '../../content/types';

type TrueFalseQuestionProps = {
  question: QuizQuestion;
  selected?: string;
  onSelect: (value: string) => void;
};

export function TrueFalseQuestion({ question, selected, onSelect }: TrueFalseQuestionProps) {
  const options = [
    { id: 'true', label: 'True', icon: '\u2713' },
    { id: 'false', label: 'False', icon: '\u2717' },
  ];

  return (
    <div className="quiz-question">
      <h3 className="quiz-question__stem">{question.stem}</h3>
      <div className="quiz-question__tf-options" role="radiogroup" aria-label={question.stem}>
        {options.map((option) => {
          const isSelected = selected === option.id;

          return (
            <AnimatePresence key={option.id}>
              <motion.button
                className={`quiz-tf-option ${isSelected ? 'quiz-tf-option--selected' : ''}`}
                key={option.id}
                onClick={() => onSelect(option.id)}
                type="button"
                role="radio"
                aria-checked={isSelected}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                <span className="quiz-tf-option__icon">{option.icon}</span>
                <span className="quiz-tf-option__label">{option.label}</span>
              </motion.button>
            </AnimatePresence>
          );
        })}
      </div>
    </div>
  );
}
