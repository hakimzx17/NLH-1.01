import { Clock } from 'lucide-react';

type QuizProgressBarProps = {
  current: number;
  total: number;
  elapsed: string;
};

export function QuizProgressBar({ current, total, elapsed }: QuizProgressBarProps) {
  const percent = (current / total) * 100;

  return (
    <div className="quiz-progress">
      <div className="quiz-progress__info">
        <span className="quiz-progress__counter">Question {current} of {total}</span>
        <span className="quiz-progress__timer">
          <Clock size={14} aria-hidden="true" />
          {elapsed}
        </span>
      </div>
      <div className="quiz-progress__bar" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total}>
        <div
          className="quiz-progress__bar-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
