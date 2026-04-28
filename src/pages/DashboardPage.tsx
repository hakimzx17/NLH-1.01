import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { domains } from '../content/domains';
import type { DomainId } from '../content/domains';
import { GlassWidget } from '../components/dashboard/GlassWidget';
import { OrbitRing } from '../components/dashboard/OrbitRing';
import { getLessonPreviewById } from '../content/domains';
import { formatStudyTime } from '../lib/format';
import { getOverallProgressPercent, useProgressStore } from '../store/progressStore';
import type { DomainProgress } from '../store/progressStore';

function getDashboardTrackNodeClass(status: DomainProgress['status']): string {
  if (status === 'complete') {
    return 'dashboard-domain-track__node dashboard-domain-track__node--complete';
  }

  if (status === 'in-progress') {
    return 'dashboard-domain-track__node dashboard-domain-track__node--active';
  }

  return 'dashboard-domain-track__node';
}

export function DashboardPage() {
  const domainProgress = useProgressStore((state) => state.domains);
  const lastLessonId = useProgressStore((state) => state.lastLessonId);
  const lessonProgress = useProgressStore((state) => state.lessons);
  const nextExamLabel = useProgressStore((state) => state.nextExamLabel);
  const studyMinutes = useProgressStore((state) => state.studyMinutes);

  const overallPercent = getOverallProgressPercent(domainProgress);
  const lastLessonPreview = getLessonPreviewById(lastLessonId);
  const lastLessonState = lessonProgress[lastLessonId];

  // Derive track data from real store instead of hardcoded values
  const dashboardTrack = domains.map((domain) => ({
    label: domain.shortLabel,
    status: domainProgress[domain.id as DomainId]?.status ?? 'not-started',
  }));

  const activeTrackIndex = dashboardTrack.findIndex((item) => item.status === 'in-progress');
  const completeTrackCount = dashboardTrack.filter((item) => item.status === 'complete').length;
  const filledSegments = activeTrackIndex >= 0 ? activeTrackIndex : Math.max(completeTrackCount - 1, 0);
  const trackFillPercent = dashboardTrack.length > 1 ? (filledSegments / (dashboardTrack.length - 1)) * 100 : 0;
  const nextExamDisplay = nextExamLabel.replace('days', 'Days');

  return (
    <section aria-label="Dashboard" className="dashboard-screen">
      <div className="dashboard-stage">
        <GlassWidget className="dashboard-panel dashboard-panel--study" title="Study Time">
          <p className="dashboard-panel__headline">{formatStudyTime(studyMinutes)}</p>
          <p className="dashboard-panel__accent">+2h this week</p>
        </GlassWidget>

        <GlassWidget className="dashboard-panel dashboard-panel--progress" title="Domain Progression">
          <div className="dashboard-domain-track">
            <span className="dashboard-domain-track__line" />
            <span className="dashboard-domain-track__fill" style={{ width: `${trackFillPercent}%` }} />

            {dashboardTrack.map((item) => (
              <div className="dashboard-domain-track__item" key={item.label}>
                <span className={getDashboardTrackNodeClass(item.status)} />
                <span
                  className={[
                    'dashboard-domain-track__label',
                    item.status === 'in-progress' ? 'dashboard-domain-track__label--active' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </GlassWidget>

        <div className="dashboard-stage__orbit">
          <OrbitRing percent={overallPercent} />
        </div>

        <GlassWidget className="dashboard-panel dashboard-panel--exam" title="Next Mock Exam">
          <p className="dashboard-panel__subheadline">{nextExamDisplay}</p>
          <div className="dashboard-panel__meta-row">
            <span>Topic:</span>
            <strong>Domains 1 & 2</strong>
          </div>
          <div className="dashboard-panel__meta-row">
            <span>Questions:</span>
            <strong>50</strong>
          </div>
        </GlassWidget>

        <GlassWidget accent className="dashboard-panel dashboard-panel--session" title="Last Session">
          <p className="dashboard-panel__session-title">{lastLessonPreview?.title ?? 'No lesson started'}</p>
          <p className="dashboard-panel__session-meta">
            Domain {lastLessonPreview?.moduleLabel ?? '0.0'} · {lastLessonState?.progressPercent ?? 0}% Complete
          </p>
          <div aria-hidden="true" className="dashboard-panel__progress-bar">
            <span style={{ width: `${lastLessonState?.progressPercent ?? 0}%` }} />
          </div>
          <div className="dashboard-panel__session-actions">
            <Link className="dashboard-panel__action" to={`/lesson/${lastLessonId}`}>
              Resume Lesson <ArrowRight size={16} />
            </Link>
          </div>
        </GlassWidget>
      </div>
    </section>
  );
}
