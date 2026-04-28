import { LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Card } from '../ui/Card';

type LabLockedGuardProps = {
  domainId: string;
  lessonId: string;
  lessonTitle: string;
  moduleLabel: string;
};

export function LabLockedGuard({ domainId, lessonId, lessonTitle, moduleLabel }: LabLockedGuardProps) {
  return (
    <section className="page page--narrow lab-page">
      <header className="page-header lab-page__header">
        <Link className="page-header__back" to={`/domains/${domainId}`}>
          Back to domain
        </Link>
        <p className="page-header__eyebrow">{moduleLabel} · Practice Lab</p>
        <h1>Practice lab locked</h1>
        <p className="page-header__description">
          {lessonTitle} is still locked. Complete the previous lesson quiz before launching the lab so the lesson sequence stays consistent.
        </p>
      </header>

      <Card className="lab-guard" accent>
        <div className="lab-guard__icon" aria-hidden="true">
          <LockKeyhole size={36} />
        </div>
        <div className="lab-guard__content">
          <h2 className="lab-guard__title">Progression guard is active</h2>
          <p className="lab-guard__description">
            Direct lab routes should not bypass unlock rules. Return to the lesson sequence, pass the required quiz, and then come back for the hands-on step.
          </p>
          <div className="lab-guard__actions">
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
