import { ArrowLeft, CheckCircle, RotateCcw, XCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import type { QuizQuestion } from '../../content/types';
import type { submitQuiz } from '../../lib/quizEngine';
import { ProgressRing } from '../ui/ProgressRing';

type ResultsScreenProps = {
  results: ReturnType<typeof submitQuiz>;
  questions: QuizQuestion[];
  lessonId: string;
  domainId: string;
  onReviewLesson: (lessonId: string, sectionId?: string) => void;
  onRetake: () => void;
  onDone: () => void;
};

export function ResultsScreen({ results, questions, onReviewLesson, onRetake, onDone }: ResultsScreenProps) {

  return (
    <div className="quiz-results">
      <div className="quiz-results__header">
        <ProgressRing
          percent={results.score}
          size={180}
          strokeWidth={10}
          label="Quiz score"
          valueLabel={`${results.score}%`}
        />
        <div className="quiz-results__summary">
          <h2 className="quiz-results__title">
            {results.passed ? 'Quiz passed' : 'Quiz not passed'}
          </h2>
          <p className="quiz-results__subtitle">
            {results.passed
              ? `You scored ${results.score}% — the next lesson is now unlocked.`
              : `You scored ${results.score}%. You need ${results.passThreshold}% to pass. Review the lesson and try again.`}
          </p>
          <div className="quiz-results__stats">
            <span className="quiz-results__stat quiz-results__stat--correct">
              <CheckCircle size={16} />
              {results.total - results.missedQuestionIds.length} correct
            </span>
            <span className="quiz-results__stat quiz-results__stat--incorrect">
              <XCircle size={16} />
              {results.missedQuestionIds.length} incorrect
            </span>
          </div>
        </div>
      </div>

      <div className="quiz-results__breakdown">
        <h3 className="quiz-results__breakdown-title">Question breakdown</h3>
        {questions.map((question, index) => {
          const result = results.results[index];
          const isCorrect = result?.isCorrect ?? false;

          return (
            <AnimatePresence key={question.id}>
              <motion.details
                className={`quiz-results__question ${isCorrect ? 'quiz-results__question--correct' : 'quiz-results__question--incorrect'}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, delay: index * 0.03 }}
              >
                <summary className="quiz-results__question-summary">
                  <span className="quiz-results__question-icon">
                    {isCorrect ? (
                      <CheckCircle size={18} className="quiz-results__question-icon--correct" />
                    ) : (
                      <XCircle size={18} className="quiz-results__question-icon--incorrect" />
                    )}
                  </span>
                  <span className="quiz-results__question-stem">
                    Q{index + 1}: {question.stem}
                  </span>
                </summary>
                <div className="quiz-results__question-detail">
                  <p className="quiz-results__explanation">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                  {!isCorrect && question.lessonId && (
                    <button
                      type="button"
                      className="button button--ghost button--sm"
                      onClick={() => onReviewLesson(question.lessonId)}
                    >
                      <ArrowLeft size={14} />
                      Review lesson
                    </button>
                  )}
                </div>
              </motion.details>
            </AnimatePresence>
          );
        })}
      </div>

      <div className="quiz-results__actions">
        {!results.passed && (
          <button type="button" className="button button--primary button--lg" onClick={onRetake}>
            <RotateCcw size={18} />
            Retake quiz
          </button>
        )}
        <button type="button" className="button button--ghost button--lg" onClick={onDone}>
          Back to lesson
        </button>
      </div>
    </div>
  );
}
