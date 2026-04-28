import { CheckCircle2, Lightbulb, MonitorUp, TerminalSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

import { getLessonLab } from '../../content/labs';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useProgressStore } from '../../store/progressStore';
import { Card } from '../ui/Card';

type LabTabSurfaceProps = {
  lessonId: string;
  lessonTitle: string;
};

export function LabTabSurface({ lessonId, lessonTitle }: LabTabSurfaceProps) {
  const definition = getLessonLab(lessonId);
  const isDesktop = useMediaQuery('(min-width: 1024px)', true);
  const labComplete = useProgressStore((state) => state.lessons[lessonId]?.labComplete ?? false);

  if (!definition) {
    return (
      <div className="lab-entry">
        <Card className="lab-entry__hero">
          <div className="lab-entry__header">
            <div>
              <p className="lab-entry__eyebrow">Practice Lab</p>
              <h2 className="lab-entry__title">Lesson-specific lab is not authored yet</h2>
            </div>
            <span className="simulation-status simulation-status--muted">Coming later</span>
          </div>
          <p className="lab-entry__description">
            The shared CLI lab platform is now live, but {lessonTitle} does not have a bespoke scenario yet. Keep the existing lesson flow moving by continuing into flash cards or the lesson quiz.
          </p>
          <div className="lab-entry__actions">
            <Link className="button button--ghost" to={`/lesson/${lessonId}?tab=flashcards`}>
              Open flash cards
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
    <div className="lab-entry">
      <Card className="lab-entry__hero" accent>
        <div className="lab-entry__header">
          <div>
            <p className="lab-entry__eyebrow">Practice Lab</p>
            <h2 className="lab-entry__title">{definition.title}</h2>
          </div>
          <span className={`simulation-status ${labComplete ? 'simulation-status--viewed' : 'simulation-status--pending'}`}>
            {labComplete ? 'Completed' : 'Ready to launch'}
          </span>
        </div>

        <p className="lab-entry__description">{definition.summary}</p>
        <p className="lab-entry__scenario">{definition.scenario}</p>

        <div className="lab-entry__actions">
          <Link className="button button--primary" to={`/lesson/${lessonId}/lab`}>
            <TerminalSquare size={18} />
            {isDesktop ? 'Launch practice lab' : 'View desktop requirement'}
          </Link>
          <Link className="button button--ghost" to={`/lesson/${lessonId}/quiz`}>
            Take lesson quiz
          </Link>
        </div>
      </Card>

      <div className="lab-entry__grid">
        <Card className="lab-entry__card">
          <h3 className="lab-entry__card-title">Objectives in this lab</h3>
          <ul className="lab-entry__list">
            {definition.objectives.map((objective) => (
              <li key={objective.id}>
                <CheckCircle2 size={16} />
                <span>
                  <strong>{objective.title}.</strong> {objective.description}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="lab-entry__card">
          <h3 className="lab-entry__card-title">Support systems</h3>
          <ul className="lab-entry__meta-list">
            <li>
              <MonitorUp size={16} />
              <span>{isDesktop ? 'Desktop viewport detected for the full CLI shell.' : 'The lab route will show the desktop-only guard on this viewport.'}</span>
            </li>
            <li>
              <Lightbulb size={16} />
              <span>{definition.hints.length} authored hints are available, and opening them does not reduce progress.</span>
            </li>
            <li>
              <TerminalSquare size={16} />
              <span>IOS-style mode switching, command history, tab completion, contextual help, and reset are all available inside the route.</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
