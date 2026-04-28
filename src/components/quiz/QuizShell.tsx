import { useEffect, useState } from 'react';
import { ClipboardList } from 'lucide-react';

import type { QuizQuestion, QuizState } from '../../content/types';
import { formatElapsedTime, getElapsedSeconds, recordAnswer, submitQuiz } from '../../lib/quizEngine';
import { useProgressStore } from '../../store/progressStore';
import type { DomainId } from '../../content/domains';
import type { QuizAttempt } from '../../content/types';
import { computePostQuizUnlocks } from '../../lib/unlockEngine';
import { QuestionCard } from './QuestionCard';
import { QuizProgressBar } from './QuizProgressBar';
import { ResultsScreen } from './ResultsScreen';

type QuizPhase = 'start' | 'active' | 'results';

type QuizShellProps = {
  lessonId: string;
  domainId: string;
  questions: QuizQuestion[];
  onComplete: () => void;
  isDomainQuiz?: boolean;
};

export function QuizShell({ lessonId, domainId, questions, onComplete, isDomainQuiz }: QuizShellProps) {
  const [phase, setPhase] = useState<QuizPhase>('start');
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [results, setResults] = useState<ReturnType<typeof submitQuiz> | null>(null);
  const [, setTick] = useState(0);

  const recordQuizAttempt = useProgressStore((s) => s.recordQuizAttempt);
  const applyLessonUpdates = useProgressStore((s) => s.applyLessonUpdates);
  const applyDomainUpdates = useProgressStore((s) => s.applyDomainUpdates);

  function handleStart() {
    const shuffled = questions.map((q) => ({ ...q }));
    const state: QuizState = {
      questions: shuffled,
      currentIndex: 0,
      answers: {},
      startTime: Date.now(),
      elapsedSeconds: 0,
      isSubmitted: false,
      isComplete: false,
    };
    setQuizState(state);
    setPhase('active');
  }

  function handleAnswer(questionId: string, answer: string | string[]) {
    if (!quizState || quizState.isSubmitted) return;
    setQuizState(recordAnswer(quizState, questionId, answer));
  }

  function handleNext() {
    if (!quizState) return;

    const isLast = quizState.currentIndex >= quizState.questions.length - 1;

    if (isLast) {
      const quizResults = submitQuiz(quizState);
      setResults(quizResults);
      setPhase('results');

      const attempt: QuizAttempt = {
        quizId: lessonId,
        score: quizResults.score,
        attemptDate: new Date().toISOString(),
        missedQuestionIds: quizResults.missedQuestionIds,
      };
      recordQuizAttempt(lessonId, attempt);

      if (isDomainQuiz) {
        // Domain quiz: mark domain complete if passed
        if (quizResults.passed) {
          applyDomainUpdates({
            [domainId]: {
              status: 'complete',
              completionPercent: 100,
            },
          });
        }
      } else {
        // Lesson quiz: apply unlock logic
        const unlocks = computePostQuizUnlocks(
          useProgressStore.getState().lessons,
          lessonId,
          domainId as DomainId,
          quizResults.passed,
          quizResults.score,
        );

        applyLessonUpdates(unlocks.lessonUpdates);
        applyDomainUpdates(unlocks.domainUpdates);
      }
    } else {
      setQuizState({
        ...quizState,
        currentIndex: quizState.currentIndex + 1,
      });
    }
  }

  function handleReviewLesson(lessonIdToReview: string, sectionId?: string) {
    const hash = sectionId ? `#${sectionId}` : '';
    window.location.href = `/lesson/${lessonIdToReview}${hash}`;
  }

  useEffect(() => {
    if (phase !== 'active') return;

    const interval = setInterval(() => {
      setTick((t: number) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [phase]);

  if (phase === 'start') {
    return (
      <div className="quiz-start">
        <div className="quiz-start__icon">
          <ClipboardList size={48} />
        </div>
        <h2 className="quiz-start__title">Lesson Quiz</h2>
        <p className="quiz-start__description">
          {questions.length} questions &middot; 80% to pass &middot; Questions and options are randomized each attempt
        </p>
        <ul className="quiz-start__rules">
          <li>No back-navigation during the quiz</li>
          <li>Explanations are shown after submission</li>
          <li>You can retake the quiz if you do not pass</li>
        </ul>
        <button type="button" className="button button--primary button--lg" onClick={handleStart}>
          Start quiz
        </button>
      </div>
    );
  }

  if (phase === 'results' && results && quizState) {
    return (
      <ResultsScreen
        results={results}
        questions={quizState.questions}
        lessonId={lessonId}
        domainId={domainId}
        onReviewLesson={handleReviewLesson}
        onRetake={handleStart}
        onDone={onComplete}
      />
    );
  }

  if (phase === 'active' && quizState) {
    const currentQuestion = quizState.questions[quizState.currentIndex];
    const elapsed = getElapsedSeconds(quizState.startTime);
    const currentAnswer = quizState.answers[currentQuestion.id];

    return (
      <div className="quiz-active">
        <QuizProgressBar
          current={quizState.currentIndex + 1}
          total={quizState.questions.length}
          elapsed={formatElapsedTime(elapsed)}
        />
        <QuestionCard
          question={currentQuestion}
          answer={currentAnswer}
          onAnswer={(answer: string | string[]) => handleAnswer(currentQuestion.id, answer)}
        />
        <div className="quiz-active__actions">
          <button
            type="button"
            className="button button--primary button--lg"
            onClick={handleNext}
            disabled={currentAnswer === undefined}
          >
            {quizState.currentIndex >= quizState.questions.length - 1 ? 'Submit quiz' : 'Next question'}
          </button>
        </div>
      </div>
    );
  }

  return null;
}
