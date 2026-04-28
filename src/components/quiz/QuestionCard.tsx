import type { QuizQuestion } from '../../content/types';
import { SingleChoiceQuestion } from './SingleChoiceQuestion';
import { MultiSelectQuestion } from './MultiSelectQuestion';
import { TrueFalseQuestion } from './TrueFalseQuestion';
import { FillBlankQuestion } from './FillBlankQuestion';

type QuestionCardProps = {
  question: QuizQuestion;
  answer?: string | string[];
  onAnswer: (answer: string | string[]) => void;
};

export function QuestionCard({ question, answer, onAnswer }: QuestionCardProps) {
  switch (question.type) {
    case 'single-mcq':
      return (
        <SingleChoiceQuestion
          question={question}
          selected={typeof answer === 'string' ? answer : undefined}
          onSelect={(id: string) => onAnswer(id)}
        />
      );
    case 'multi-mcq':
      return (
        <MultiSelectQuestion
          question={question}
          selected={Array.isArray(answer) ? answer : []}
          onSelect={(ids: string[]) => onAnswer(ids)}
        />
      );
    case 'true-false':
      return (
        <TrueFalseQuestion
          question={question}
          selected={typeof answer === 'string' ? answer : undefined}
          onSelect={(value: string) => onAnswer(value)}
        />
      );
    case 'fill-blank':
      return (
        <FillBlankQuestion
          question={question}
          value={typeof answer === 'string' ? answer : ''}
          onChange={(value: string) => onAnswer(value)}
        />
      );
    default:
      return <p>Unknown question type: {question.type}</p>;
  }
}
