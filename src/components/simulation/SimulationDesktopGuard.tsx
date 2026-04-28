import { MonitorCog } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Card } from '../ui/Card';

type SimulationDesktopGuardProps = {
  lessonId: string;
  moduleLabel: string;
  lessonTitle: string;
};

export function SimulationDesktopGuard({ lessonId, moduleLabel, lessonTitle }: SimulationDesktopGuardProps) {
  return (
    <section className="page page--narrow simulation-page">
      <header className="page-header simulation-page__header">
        <Link className="page-header__back" to={`/lesson/${lessonId}`}>
          Back to lesson
        </Link>
        <p className="page-header__eyebrow">{moduleLabel} · Simulation</p>
        <h1>Simulation requires a desktop browser</h1>
        <p className="page-header__description">
          Switch to a screen that is at least 1024px wide to continue with the {lessonTitle} simulation. Theory remains available on smaller screens.
        </p>
      </header>

      <Card className="simulation-guard" accent>
        <div className="simulation-guard__icon" aria-hidden="true">
          <MonitorCog size={36} />
        </div>
        <div className="simulation-guard__content">
          <h2 className="simulation-guard__title">Desktop-only learning surface</h2>
          <p className="simulation-guard__description">
            This route uses a fixed simulation viewport so labels, captions, and device roles stay readable. Continue with theory now and return on desktop for the full visual walkthrough.
          </p>
          <div className="simulation-guard__actions">
            <Link className="button button--primary" to={`/lesson/${lessonId}`}>
              Return to lesson
            </Link>
            <Link className="button button--ghost" to={`/lesson/${lessonId}/quiz`}>
              Open lesson quiz
            </Link>
          </div>
        </div>
      </Card>
    </section>
  );
}
