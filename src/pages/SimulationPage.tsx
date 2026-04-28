import { ArrowLeft, ClipboardList, FlaskConical } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { SimulationDesktopGuard } from '../components/simulation/SimulationDesktopGuard';
import { SimulationLockedGuard } from '../components/simulation/SimulationLockedGuard';
import { SimulationShell } from '../components/simulation/SimulationShell';
import { Card } from '../components/ui/Card';
import { getLessonPreviewById } from '../content/domains';
import { getLessonById } from '../content/lessons';
import { getLessonSimulation } from '../content/simulations';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useProgressStore } from '../store/progressStore';

export function SimulationPage() {
  const { id = '' } = useParams<{ id: string }>();
  const lesson = getLessonById(id);
  const preview = getLessonPreviewById(id);
  const definition = getLessonSimulation(id);
  const isDesktop = useMediaQuery('(min-width: 1024px)', true);

  const lessonProgress = useProgressStore((state) => state.lessons[id]);
  const markSimulationViewed = useProgressStore((state) => state.markSimulationViewed);

  const lessonTitle = lesson?.title ?? preview?.title ?? 'Lesson';
  const moduleLabel = lesson?.moduleLabel ?? preview?.moduleLabel ?? '0.0';
  const isLocked = lessonProgress?.status === 'locked';

  if (!lesson && !preview) {
    return (
      <section className="page page--narrow simulation-page">
        <header className="page-header">
          <p className="page-header__eyebrow">Simulation not found</p>
          <h1>Simulation not found</h1>
          <p className="page-header__description">
            That lesson route does not exist in the current curriculum seed yet.
          </p>
          <div className="page-header__actions">
            <Link className="button button--primary" to="/domains">
              Back to domains
            </Link>
          </div>
        </header>
      </section>
    );
  }

  if (isLocked && preview) {
    return (
      <SimulationLockedGuard
        domainId={preview.domainId}
        lessonId={id}
        lessonTitle={lessonTitle}
        moduleLabel={moduleLabel}
      />
    );
  }

  if (!isDesktop) {
    return <SimulationDesktopGuard lessonId={id} moduleLabel={moduleLabel} lessonTitle={lessonTitle} />;
  }

  if (!definition) {
    return (
      <section className="page page--narrow simulation-page">
        <header className="page-header simulation-page__header">
          <Link className="page-header__back" to={`/lesson/${id}?tab=simulation`}>
            <ArrowLeft size={16} />
            Back to lesson
          </Link>
          <p className="page-header__eyebrow">{moduleLabel} · Simulation</p>
          <h1>Simulation platform ready, lesson animation pending</h1>
          <p className="page-header__description">
            {lessonTitle} does not have a bespoke simulation yet. The shared shell is in place for authored lessons, and you can continue into the lab or quiz from here.
          </p>
        </header>

        <Card className="simulation-page__fallback" accent>
          <h2 className="simulation-page__fallback-title">Next study steps</h2>
          <p className="simulation-page__fallback-copy">
            Keep your momentum by moving straight into hands-on practice or the lesson quiz while this specific simulation is still pending.
          </p>
          <div className="simulation-page__actions">
            <Link className="button button--ghost" to={`/lesson/${id}/lab`}>
              <FlaskConical size={18} />
              Open practice lab
            </Link>
            <Link className="button button--primary" to={`/lesson/${id}/quiz`}>
              <ClipboardList size={18} />
              Take lesson quiz
            </Link>
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section className="page page--narrow simulation-page">
      <header className="page-header simulation-page__header">
        <Link className="page-header__back" to={`/lesson/${id}?tab=simulation`}>
          <ArrowLeft size={16} />
          Back to lesson
        </Link>
        <p className="page-header__eyebrow">{moduleLabel} · Simulation</p>
        <h1>{definition.title}</h1>
        <p className="page-header__description">{definition.summary}</p>
      </header>

      <SimulationShell
        definition={definition}
        isViewed={lessonProgress?.simViewed ?? false}
        onViewed={() => markSimulationViewed(id)}
      />

      <Card className="simulation-page__next" accent={lessonProgress?.simViewed}>
        <div className="simulation-page__next-header">
          <div>
            <p className="simulation-page__next-eyebrow">Progression</p>
            <h2 className="simulation-page__next-title">
              {lessonProgress?.simViewed ? 'Simulation viewed and saved' : 'Next step is ready when you are'}
            </h2>
          </div>
          <span className={`simulation-status ${lessonProgress?.simViewed ? 'simulation-status--viewed' : 'simulation-status--pending'}`}>
            {lessonProgress?.simViewed ? 'Saved to progress' : 'Waiting for interaction'}
          </span>
        </div>
        <p className="simulation-page__next-copy">
          Once the shell starts or you step through the scene, lesson progress records that the simulation was viewed. From here you can continue into the practice lab or move straight into the lesson quiz.
        </p>
        <div className="simulation-page__actions">
          <Link className="button button--ghost" to={`/lesson/${id}/lab`}>
            <FlaskConical size={18} />
            Open practice lab
          </Link>
          <Link className="button button--primary" to={`/lesson/${id}/quiz`}>
            <ClipboardList size={18} />
            Take lesson quiz
          </Link>
        </div>
      </Card>
    </section>
  );
}
