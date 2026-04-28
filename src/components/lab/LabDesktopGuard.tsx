import { MonitorCog } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Card } from '../ui/Card';

type LabDesktopGuardProps = {
  lessonId: string;
  lessonTitle: string;
  moduleLabel: string;
};

export function LabDesktopGuard({ lessonId, lessonTitle, moduleLabel }: LabDesktopGuardProps) {
  return (
    <section className="page page--narrow lab-page">
      <header className="page-header lab-page__header">
        <Link className="page-header__back" to={`/lesson/${lessonId}?tab=lab`}>
          Back to lesson
        </Link>
        <p className="page-header__eyebrow">{moduleLabel} · Practice Lab</p>
        <h1>Practice lab requires a desktop browser</h1>
        <p className="page-header__description">
          Switch to a screen that is at least 1024px wide to continue with the {lessonTitle} lab. Theory stays available on smaller screens.
        </p>
      </header>

      <Card className="lab-guard" accent>
        <div className="lab-guard__icon" aria-hidden="true">
          <MonitorCog size={36} />
        </div>
        <div className="lab-guard__content">
          <h2 className="lab-guard__title">Desktop-only CLI workspace</h2>
          <p className="lab-guard__description">
            The lab shell keeps the topology, objectives, and terminal visible together so IOS mode changes remain easy to follow. Return on desktop for the full guided workflow.
          </p>
          <div className="lab-guard__actions">
            <Link className="button button--primary" to={`/lesson/${lessonId}?tab=lab`}>
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
