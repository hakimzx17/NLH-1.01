import { CheckCircle2, MonitorUp, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

import { getLessonSimulation } from '../../content/simulations';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useProgressStore } from '../../store/progressStore';
import { Card } from '../ui/Card';

type SimulationTabSurfaceProps = {
  lessonId: string;
  lessonTitle: string;
};

export function SimulationTabSurface({ lessonId, lessonTitle }: SimulationTabSurfaceProps) {
  const definition = getLessonSimulation(lessonId);
  const isDesktop = useMediaQuery('(min-width: 1024px)', true);
  const prefersReducedMotion = usePrefersReducedMotion();
  const simViewed = useProgressStore((state) => state.lessons[lessonId]?.simViewed ?? false);

  if (!definition) {
    return (
      <div className="simulation-entry">
        <Card className="simulation-entry__hero">
          <div className="simulation-entry__header">
            <div>
              <p className="simulation-entry__eyebrow">Simulation</p>
              <h2 className="simulation-entry__title">Lesson-specific simulation is not authored yet</h2>
            </div>
            <span className="simulation-status simulation-status--muted">Coming later</span>
          </div>
          <p className="simulation-entry__description">
            The shared simulation platform is now live, but {lessonTitle} does not have its bespoke animation yet. Continue into the practice lab or lesson quiz without leaving the existing five-tab lesson flow.
          </p>
          <div className="simulation-entry__actions">
            <Link className="button button--ghost" to={`/lesson/${lessonId}/lab`}>
              Open practice lab
            </Link>
            <Link className="button button--primary" to={`/lesson/${lessonId}/quiz`}>
              Take lesson quiz
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="simulation-entry">
      <Card className="simulation-entry__hero" accent>
        <div className="simulation-entry__header">
          <div>
            <p className="simulation-entry__eyebrow">Simulation</p>
            <h2 className="simulation-entry__title">{definition.title}</h2>
          </div>
          <span className={`simulation-status ${simViewed ? 'simulation-status--viewed' : 'simulation-status--pending'}`}>
            {simViewed ? 'Viewed' : 'Ready to launch'}
          </span>
        </div>

        <p className="simulation-entry__description">{definition.summary}</p>

        <div className="simulation-entry__actions">
          <Link className="button button--primary" to={`/lesson/${lessonId}/simulation`}>
            <PlayCircle size={18} />
            {isDesktop ? 'Launch simulation' : 'View desktop requirement'}
          </Link>
          <Link className="button button--ghost" to={`/lesson/${lessonId}/lab`}>
            Open practice lab
          </Link>
        </div>
      </Card>

      <div className="simulation-entry__grid">
        <Card className="simulation-entry__card">
          <h3 className="simulation-entry__card-title">Instructional checkpoints</h3>
          <ul className="simulation-entry__list">
            {definition.learningGoals.map((goal) => (
              <li key={goal}>
                <CheckCircle2 size={16} />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="simulation-entry__card">
          <h3 className="simulation-entry__card-title">Route behavior</h3>
          <ul className="simulation-entry__meta-list">
            <li>
              <MonitorUp size={16} />
              <span>{isDesktop ? 'Desktop viewport detected.' : 'The route will show the desktop-only guard on this viewport.'}</span>
            </li>
            <li>
              <PlayCircle size={16} />
              <span>{prefersReducedMotion ? 'Reduced motion is enabled for static step states.' : 'Standard motion is enabled with caption support.'}</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
