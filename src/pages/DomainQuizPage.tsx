import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { getDomainById, getDomainLessonPreviews } from '../content/domains';
import type { DomainId } from '../content/domains';
import { getDomainQuiz } from '../content/quizzes';
import { QuizShell } from '../components/quiz/QuizShell';
import { useProgressStore } from '../store/progressStore';
import type { LessonProgress } from '../store/progressStore';
import { canAttemptDomainQuiz } from '../lib/unlockEngine';

export function DomainQuizPage() {
  const { id = '' } = useParams<{ id: string }>();
  const domainId = id as DomainId;
  const domain = getDomainById(domainId);
  const domainLessons = getDomainLessonPreviews(domainId);
  const quizQuestions = getDomainQuiz(domainId);

  const lessons = useProgressStore((state: { lessons: Record<string, LessonProgress> }) => state.lessons);
  const isUnlocked = canAttemptDomainQuiz(lessons, domainId);

  if (!domain) {
    return (
      <section className="page page--narrow">
        <header className="page-header">
          <p className="page-header__eyebrow">Domain not found</p>
          <h1>Domain Not Found</h1>
          <Link className="button button--primary" to="/domains">Back to Domains</Link>
        </header>
      </section>
    );
  }

  if (!isUnlocked) {
    return (
      <section className="page page--narrow">
        <header className="page-header">
          <p className="page-header__eyebrow">{domain.title} &middot; Domain Quiz</p>
          <h1>Quiz Locked</h1>
          <p className="page-header__description">
            Complete all lessons in this domain before attempting the domain quiz. You need to pass each lesson quiz at 80% or higher.
          </p>
          <Link className="button button--primary" to={`/domains/${domainId}`}>
            <ArrowLeft size={16} />
            Back to {domain.title}
          </Link>
        </header>
      </section>
    );
  }

  return (
    <section className="page page--narrow">
      <header className="page-header">
        <Link className="page-header__back" to={`/domains/${domainId}`}>
          <ArrowLeft size={16} />
          Back to {domain.title}
        </Link>
        <p className="page-header__eyebrow">{domain.title} &middot; Domain Quiz</p>
        <h1>Domain Quiz: {domain.title}</h1>
        <p className="page-header__description">
          {quizQuestions.length} questions drawn from all {domainLessons.length} lessons &middot; 80% to pass &middot; Passing marks this domain complete
        </p>
      </header>

      <div style={{ maxWidth: '48rem', marginInline: 'auto' }}>
        <QuizShell
          lessonId={`domain-quiz-${domainId}`}
          domainId={domainId}
          questions={quizQuestions}
          onComplete={() => {}}
          isDomainQuiz
        />
      </div>
    </section>
  );
}
