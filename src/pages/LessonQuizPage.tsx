import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { getLessonById } from '../content/lessons';
import { getLessonQuiz } from '../content/quizzes';
import { QuizShell } from '../components/quiz/QuizShell';

export function LessonQuizPage() {
  const { id = '' } = useParams<{ id: string }>();
  const lesson = getLessonById(id);
  const quizQuestions = getLessonQuiz(id);

  if (!lesson || quizQuestions.length === 0) {
    return (
      <section className="page page--narrow">
        <header className="page-header">
          <p className="page-header__eyebrow">Quiz not yet available</p>
          <h1>Quiz Not Available</h1>
          <p className="page-header__description">
            This lesson does not have a quiz yet. Check back later or review the lesson content.
          </p>
          <Link className="button button--primary" to={`/lesson/${id}`}>
            <ArrowLeft size={16} />
            Back to lesson
          </Link>
        </header>
      </section>
    );
  }

  return (
    <section className="page page--narrow">
      <header className="page-header">
        <Link className="page-header__back" to={`/lesson/${id}`}>
          <ArrowLeft size={16} />
          Back to lesson
        </Link>
        <p className="page-header__eyebrow">{lesson.moduleLabel} &middot; Lesson Quiz</p>
        <h1>Lesson Quiz: {lesson.title}</h1>
        <p className="page-header__description">
          {quizQuestions.length} questions &middot; 80% to pass &middot; Questions are randomized each attempt
        </p>
      </header>

      <div style={{ maxWidth: '48rem', marginInline: 'auto' }}>
        <QuizShell
          lessonId={id}
          domainId={lesson.domainId}
          questions={quizQuestions}
          onComplete={() => {}}
        />
      </div>
    </section>
  );
}
