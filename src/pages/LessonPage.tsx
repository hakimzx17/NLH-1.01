import { useEffect } from 'react';
import { ArrowRight, TerminalSquare } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { getButtonClassName } from '../components/ui/buttonClassName';
import { getLessonPreviewById } from '../content/domains';
import { useProgressStore } from '../store/progressStore';

export function LessonPage() {
  const { id = 'lesson' } = useParams();

  const lesson = getLessonPreviewById(id);
  const lessonProgress = useProgressStore((state) => state.lessons[id]);
  const markLessonAccessed = useProgressStore((state) => state.markLessonAccessed);

  useEffect(() => {
    markLessonAccessed(id);
  }, [id, markLessonAccessed]);

  return (
    <section className="page page--narrow">
      <header className="page-header page-header--split">
        <div>
          <p className="page-header__eyebrow">Lesson route</p>
          <h1>{lesson?.title ?? 'Lesson placeholder'}</h1>
          <p className="page-header__description">
            Milestone 0 establishes the lesson reader shell, resume state, and forward navigation. Structured lesson
            content modules arrive in Milestone 1.
          </p>
        </div>
        <div className="page-header__actions">
          <Badge tone={lessonProgress?.status === 'passed' ? 'passed' : 'in-progress'}>
            {lessonProgress?.progressPercent ?? 0}% complete
          </Badge>
          <Link className={getButtonClassName()} to={`/lesson/${id}/simulation`}>
            Continue loop <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      <div className="lesson-shell-grid">
        <Card className="lesson-shell-card" accent>
          <p className="lesson-shell-card__eyebrow">Narrative arc scaffold</p>
          <h2>What already exists</h2>
          <ul className="placeholder-card__list">
            <li>Lesson route is wired into persisted last-session state.</li>
            <li>Simulation, lab, and quiz links continue the intended learning loop.</li>
            <li>The shell is ready for typed lesson data modules in `src/content/lessons/`.</li>
          </ul>
        </Card>

        <Card className="lesson-shell-card">
          <p className="lesson-shell-card__eyebrow">Next blocks</p>
          <h2>Milestone 1 delivery</h2>
          <div className="lesson-shell-card__stack">
            <div>
              <strong>Hook and concept core</strong>
              <p>Real lesson sections, reading estimates, and inline diagrams.</p>
            </div>
            <div>
              <strong>Callouts and checkpoints</strong>
              <p>Why this matters, exam traps, and confidence-building micro-questions.</p>
            </div>
            <div>
              <strong>CLI spotlights</strong>
              <p className="lesson-shell-card__mono">
                <TerminalSquare size={16} /> JetBrains Mono is already available for future command blocks.
              </p>
            </div>
          </div>
        </Card>

        <Card className="lesson-shell-actions">
          <Link className={getButtonClassName()} to={`/lesson/${id}/simulation`}>
            Open simulation route
          </Link>
          <Link className={getButtonClassName({ variant: 'ghost' })} to={`/lesson/${id}/lab`}>
            Open lab route
          </Link>
          <Link className={getButtonClassName({ variant: 'ghost' })} to={`/lesson/${id}/quiz`}>
            Open lesson quiz route
          </Link>
        </Card>
      </div>
    </section>
  );
}
