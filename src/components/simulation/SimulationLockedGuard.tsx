import { LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Card } from '../ui/Card';

type SimulationLockedGuardProps = {
  domainId: string;
  lessonId: string;
  lessonTitle: string;
  moduleLabel: string;
};

export function SimulationLockedGuard({ domainId, lessonId, lessonTitle, moduleLabel }: SimulationLockedGuardProps) {
  return (
    <section className="page page--narrow simulation-page">
      <header className="page-header simulation-page__header">
        <Link className="page-header__back" to={`/domains/${domainId}`}>
          Back to domain
        </Link>
        <p className="page-header__eyebrow">{moduleLabel} · Simulation</p>
        <h1>Simulation locked</h1>
        <p className="page-header__description">
          {lessonTitle} is still locked. Complete the previous lesson quiz before launching this simulation so lesson progress stays consistent.
        </p>
      </header>

      <Card className="simulation-guard" accent>
        <div className="simulation-guard__icon" aria-hidden="true">
          <LockKeyhole size={36} />
        </div>
        <div className="simulation-guard__content">
          <h2 className="simulation-guard__title">Progression guard is active</h2>
          <p className="simulation-guard__description">
            Direct simulation routes should not bypass lesson unlock rules. Return to the lesson sequence, complete the required quiz, and then come back for the simulation step.
          </p>
          <div className="simulation-guard__actions">
            <Link className="button button--primary" to={`/domains/${domainId}`}>
              Open domain overview
            </Link>
            <Link className="button button--ghost" to={`/lesson/${lessonId}`}>
              Open lesson detail
            </Link>
          </div>
        </div>
      </Card>
    </section>
  );
}
