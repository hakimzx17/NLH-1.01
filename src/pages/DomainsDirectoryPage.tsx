import { ArrowRight, Check, Lock, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

import { domains, getDomainLessonPreviews } from '../content/domains';
import type { DomainId } from '../content/domains';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useProgressStore } from '../store/progressStore';

function getStatusLabel(status: string, isLocked: boolean): string {
  if (isLocked) return 'Locked';
  if (status === 'complete') return 'Complete';
  if (status === 'in-progress') return 'In Progress';
  return 'Not started';
}

function getProgressBarClass(status: string, isLocked: boolean): string {
  if (isLocked) return 'domain-card__bar-fill domain-card__bar-fill--locked';
  if (status === 'complete') return 'domain-card__bar-fill domain-card__bar-fill--complete';
  if (status === 'in-progress') return 'domain-card__bar-fill domain-card__bar-fill--progress';
  return 'domain-card__bar-fill';
}

function getCardClass(status: string, isLocked: boolean): string {
  const base = 'domain-card';
  if (isLocked) return `${base} domain-card--locked`;
  if (status === 'complete') return `${base} domain-card--complete`;
  if (status === 'in-progress') return `${base} domain-card--active`;
  return base;
}

function getJourneyItemClass(status: string, isLocked: boolean): string {
  const base = 'domains-journey__item';
  if (isLocked) return `${base} domains-journey__item--locked`;
  if (status === 'complete') return `${base} domains-journey__item--complete`;
  if (status === 'in-progress') return `${base} domains-journey__item--progress`;
  return base;
}

function getActionLabel(status: string): string {
  if (status === 'complete') return 'Review';
  if (status === 'in-progress') return 'Resume';
  return 'Start Domain';
}

export function DomainsDirectoryPage() {
  const domainProgress = useProgressStore((state) => state.domains);
  const lessonProgress = useProgressStore((state) => state.lessons);
  const prefersReducedMotion = usePrefersReducedMotion();

  function getFirstAvailableLessonId(domainId: DomainId): string {
    const lessons = getDomainLessonPreviews(domainId);
    const inProgress = lessons.find((l) => lessonProgress[l.id]?.status === 'in-progress');
    if (inProgress) return inProgress.id;
    const available = lessons.find((l) => lessonProgress[l.id]?.status === 'available');
    if (available) return available.id;
    return lessons[0]?.id ?? '';
  }

  return (
    <section className="domains-directory">
      <header className="domains-directory__header">
        <p className="domains-directory__eyebrow">CCNA 200-301 Curriculum</p>
        <h1>Domains Directory</h1>
        <p className="domains-directory__description">
          Choose a domain to begin. Each domain contains deep-dive lessons, simulations, hands-on labs, and quizzes
          designed to take you from zero to exam-ready.
        </p>
      </header>

      <div className="domains-journey" role="list" aria-label="CCNA domains">
        {domains.map((domain, index) => {
          const progress = domainProgress[domain.id] ?? {
            status: 'not-started',
            completionPercent: 0,
            completedLessons: 0,
            totalLessons: domain.lessonsTarget,
          };
          const lessons = getDomainLessonPreviews(domain.id);
          const firstLessonId = getFirstAvailableLessonId(domain.id);
          const entryLessonStatus = lessons[0] ? lessonProgress[lessons[0].id]?.status : 'locked';
          const isLocked = entryLessonStatus === 'locked' && progress.status === 'not-started';
          const previousDomain = index > 0 ? domains[index - 1] : null;
          const barWidth = isLocked
            ? 0
            : Math.max(progress.completionPercent, progress.status === 'complete' ? 100 : progress.status === 'in-progress' ? 4 : 0);
          const unlockNoteId = `domain-unlock-note-${domain.id}`;
          const pulseDuration = progress.status === 'in-progress' ? '2.1s' : '2.8s';

          return (
            <div
              className={getJourneyItemClass(progress.status, isLocked)}
              key={domain.id}
              role="listitem"
            >
              <div aria-hidden="true" className="domains-journey__rail">
                <span className="domains-journey__node" />
                {index < domains.length - 1 ? <span className="domains-journey__spine" /> : null}
                <svg className="domains-journey__connector" viewBox="0 0 140 100">
                  <path className="domains-journey__connector-glow" d="M0 0 V 72 Q 0 86 14 86 H 118" />
                  <path className="domains-journey__connector-line" d="M0 0 V 72 Q 0 86 14 86 H 118" />
                  <path className="domains-journey__connector-arrow" d="M104 76 L118 86 L104 96" />
                  {!prefersReducedMotion && !isLocked ? (
                    <>
                      <circle className="domains-journey__connector-pulse" cx="0" cy="0" r="3.2">
                        <animateMotion dur={pulseDuration} path="M0 0 V 72 Q 0 86 14 86 H 118" repeatCount="indefinite" />
                      </circle>
                      <circle className="domains-journey__connector-pulse domains-journey__connector-pulse--echo" cx="0" cy="0" r="2.2">
                        <animateMotion begin="0.6s" dur={pulseDuration} path="M0 0 V 72 Q 0 86 14 86 H 118" repeatCount="indefinite" />
                      </circle>
                    </>
                  ) : null}
                </svg>
              </div>

              <article
                aria-describedby={isLocked ? unlockNoteId : undefined}
                className={getCardClass(progress.status, isLocked)}
              >
                <div className="domain-card__header">
                  <div className="domain-card__identity">
                    <span className="domain-card__badge">{domain.shortLabel}</span>
                    <div>
                      <p className="domain-card__label">Domain {domain.index}</p>
                      <h2 className="domain-card__title">{domain.title}</h2>
                    </div>
                  </div>
                  <span className="domain-card__weight">{domain.examWeightPercent}%</span>
                </div>

                <p className="domain-card__description">{domain.description}</p>

                <div className="domain-card__meta">
                  <div className="domain-card__meta-row">
                    <span className="domain-card__meta-label">Progress</span>
                    <span className="domain-card__meta-value">{progress.completionPercent}%</span>
                  </div>
                  <div className="domain-card__bar" role="progressbar" aria-valuenow={progress.completionPercent} aria-valuemin={0} aria-valuemax={100}>
                    <span className={getProgressBarClass(progress.status, isLocked)} style={{ width: `${barWidth}%` }} />
                  </div>
                  <div className="domain-card__meta-row">
                    <span className="domain-card__status">
                      <span
                        className={[
                          'domain-card__status-icon',
                          isLocked ? 'domain-card__status-icon--locked' : '',
                          !isLocked && progress.status === 'complete' ? 'domain-card__status-icon--complete' : '',
                          !isLocked && progress.status === 'in-progress' ? 'domain-card__status-icon--progress' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        {isLocked ? <Lock size={12} /> : progress.status === 'complete' ? <Check size={12} /> : progress.status === 'in-progress' ? <Play size={12} /> : <Lock size={12} />}
                      </span>
                      {getStatusLabel(progress.status, isLocked)}
                    </span>
                    <span className="domain-card__lessons">{progress.completedLessons}/{progress.totalLessons} lessons</span>
                  </div>
                </div>

                {isLocked && previousDomain ? (
                  <p className="domain-card__unlock-note" id={unlockNoteId}>
                    Complete {previousDomain.title} to unlock this domain path.
                  </p>
                ) : null}

                <div className="domain-card__focus">
                  {domain.focus.map((item) => (
                    <span className="domain-card__focus-tag" key={item}>{item}</span>
                  ))}
                </div>

                {isLocked ? (
                  <button className="domain-card__action domain-card__action--locked" disabled type="button">
                    Locked until Domain {previousDomain?.index}
                  </button>
                ) : (
                  <Link
                    className="domain-card__action"
                    to={`/lesson/${firstLessonId}`}
                  >
                    {getActionLabel(progress.status)}
                    <ArrowRight size={16} />
                  </Link>
                )}
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
