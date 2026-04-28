import type { ReactNode } from 'react';

import { Badge } from '../ui/Badge';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

type LessonDetailHeaderProps = {
  domainIndex: number;
  domainTitle: string;
  lessonTitle: string;
  moduleLabel: string;
  estimatedMinutes: number;
  progressStatus?: string;
  children?: ReactNode;
};

export function LessonDetailHeader({
  domainIndex,
  domainTitle,
  lessonTitle,
  moduleLabel,
  estimatedMinutes,
  progressStatus,
  children,
}: LessonDetailHeaderProps) {
  return (
    <header className="lesson-detail__header">
      <Link className="lesson-detail__back" to="/domains" aria-label="Back to domains directory">
        <ArrowLeft size={16} />
        Back to Domains
      </Link>
      <p className="lesson-detail__eyebrow">Domain {domainIndex} · {domainTitle}</p>
      <h1 className="lesson-detail__title">{lessonTitle}</h1>
      <div className="lesson-detail__meta">
        <span>Module {moduleLabel}</span>
        <span>·</span>
        <span>{estimatedMinutes} min</span>
        {progressStatus && (
          <>
            <span>·</span>
            <Badge tone={progressStatus === 'passed' ? 'passed' : 'in-progress'}>
              {progressStatus}
            </Badge>
          </>
        )}
      </div>
      {children}
    </header>
  );
}
