import { CheckCircle2, Compass, Lightbulb, RotateCcw } from 'lucide-react';

import type { LabDefinition } from '../../content/types';
import type { LabSessionState } from '../../lib/labEngine';
import type { LabGuidedAssist } from '../../content/types';

type LabObjectivesPanelProps = {
  definition: LabDefinition;
  session: LabSessionState;
  guidedMode: boolean;
  guidedAssist: LabGuidedAssist | null;
  hintsVisible: boolean;
  onToggleGuidedMode: () => void;
  onToggleHints: () => void;
  onReset: () => void;
};

export function LabObjectivesPanel({
  definition,
  session,
  guidedMode,
  guidedAssist,
  hintsVisible,
  onToggleGuidedMode,
  onToggleHints,
  onReset,
}: LabObjectivesPanelProps) {
  const completedObjectives = session.objectiveProgress.filter((objective) => objective.isComplete).length;

  return (
    <section className="lab-panel lab-panel--brief" aria-labelledby="lab-objectives-title">
      <div className="lab-panel__header">
        <div>
          <p className="lab-panel__eyebrow">Lab brief</p>
          <h2 className="lab-panel__title" id="lab-objectives-title">Mission and objectives</h2>
        </div>
        <span className={`simulation-status ${session.isComplete ? 'simulation-status--viewed' : 'simulation-status--pending'}`}>
          {completedObjectives}/{definition.objectives.length} complete
        </span>
      </div>

      <p className="lab-panel__copy">{definition.scenario}</p>

      <div className="lab-objectives__progress" aria-hidden="true">
        <span className="lab-objectives__progress-bar" style={{ width: `${session.completionPercent}%` }} />
      </div>

      <ul className="lab-objectives__list">
        {definition.objectives.map((objective) => {
          const isComplete = session.objectiveProgress.find((item) => item.objectiveId === objective.id)?.isComplete ?? false;

          return (
            <li key={objective.id} className={`lab-objectives__item ${isComplete ? 'lab-objectives__item--complete' : ''}`}>
              <div className="lab-objectives__item-icon" aria-hidden="true">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <h3 className="lab-objectives__item-title">{objective.title}</h3>
                <p className="lab-objectives__item-copy">{objective.description}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="lab-objectives__actions">
        <button
          type="button"
          className={`button ${guidedMode ? 'button--primary' : 'button--ghost'}`}
          onClick={onToggleGuidedMode}
        >
          <Compass size={16} />
          {guidedMode ? 'Guided mode on' : 'Guided mode off'}
        </button>
        <button
          type="button"
          className={`button ${hintsVisible ? 'button--primary' : 'button--ghost'}`}
          onClick={onToggleHints}
        >
          <Lightbulb size={16} />
          {hintsVisible ? 'Hide hints' : 'Show hints'}
        </button>
        <button type="button" className="button button--danger" onClick={onReset}>
          <RotateCcw size={16} />
          Reset lab
        </button>
      </div>

      {guidedMode && guidedAssist ? (
        <div className="lab-guided-callout" role="status" aria-live="polite">
          <p className="lab-guided-callout__eyebrow">Next command assist</p>
          <code className="lab-guided-callout__command">{guidedAssist.command}</code>
          <p className="lab-guided-callout__copy">{guidedAssist.explanation}</p>
        </div>
      ) : null}

      {hintsVisible ? (
        <div className="lab-hints">
          <h3 className="lab-hints__title">Hints</h3>
          <ul className="lab-hints__list">
            {definition.hints.map((hint) => (
              <li key={hint.id} className="lab-hints__item">
                <strong>{hint.title}</strong>
                <p>{hint.body}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
