import type { QuizQuestion } from '../../content/types';

type FillBlankQuestionProps = {
  question: QuizQuestion;
  value: string;
  onChange: (value: string) => void;
};

export function FillBlankQuestion({ question, value, onChange }: FillBlankQuestionProps) {
  return (
    <div className="quiz-question">
      <h3 className="quiz-question__stem">{question.stem}</h3>
      <div className="quiz-question__fill">
        <input
          type="text"
          className="quiz-question__fill-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your answer..."
          aria-label="Fill in the blank answer"
          autoComplete="off"
        />
      </div>
    </div>
  );
}
