import { useEffect, useRef } from 'react';
import { CornerDownLeft, Delete, HelpCircle } from 'lucide-react';
import type { ChangeEvent, FormEvent, KeyboardEvent } from 'react';

import type { LabSessionState } from '../../lib/labEngine';
import { getLabPrompt } from '../../lib/labEngine';

type LabTerminalPanelProps = {
  session: LabSessionState;
  inputValue: string;
  onInputChange: (value: string) => void;
  onInputKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClearInput: () => void;
};

export function LabTerminalPanel({
  session,
  inputValue,
  onInputChange,
  onInputKeyDown,
  onSubmit,
  onClearInput,
}: LabTerminalPanelProps) {
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof transcriptEndRef.current?.scrollIntoView === 'function') {
      transcriptEndRef.current.scrollIntoView({ block: 'end' });
    }
  }, [session.transcript.length]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onInputChange(event.target.value);
  }

  return (
    <section className="lab-panel lab-panel--terminal" aria-labelledby="lab-terminal-title">
      <div className="lab-panel__header">
        <div>
          <p className="lab-panel__eyebrow">Terminal panel</p>
          <h2 className="lab-panel__title" id="lab-terminal-title">IOS command line</h2>
        </div>
        <div className="lab-terminal__support">
          <span><HelpCircle size={14} /> Use Tab to complete known commands</span>
          <span><CornerDownLeft size={14} /> Press Enter to run</span>
        </div>
      </div>

      <div className="lab-terminal__screen" aria-live="polite">
        {session.transcript.length === 0 ? (
          <div className="lab-terminal__empty-state">
            <p>The terminal is ready. Start with <code>enable</code> or type <code>?</code> for contextual help.</p>
          </div>
        ) : null}

        {session.transcript.map((entry) => (
          <div key={entry.id} className={`lab-terminal__entry lab-terminal__entry--${entry.tone}`}>
            <p className="lab-terminal__command-line">
              <span className="lab-terminal__prompt">{entry.prompt}</span>
              <span>{entry.command}</span>
            </p>
            {entry.output.length > 0 ? (
              <pre className="lab-terminal__output">
                {entry.output.join('\n')}
              </pre>
            ) : null}
          </div>
        ))}
        <div ref={transcriptEndRef} />
      </div>

      <form className="lab-terminal__composer" onSubmit={onSubmit}>
        <label className="sr-only" htmlFor="lab-terminal-input">IOS command input</label>
        <div className="lab-terminal__input-row">
          <span className="lab-terminal__active-prompt">{getLabPrompt(session)}</span>
          <input
            id="lab-terminal-input"
            autoComplete="off"
            className="lab-terminal__input"
            name="lab-terminal-input"
            onChange={handleChange}
            onKeyDown={onInputKeyDown}
            placeholder="Type a command or ? for help"
            spellCheck={false}
            type="text"
            value={inputValue}
          />
        </div>
        <div className="lab-terminal__composer-actions">
          <button type="button" className="button button--ghost button--sm" onClick={onClearInput}>
            <Delete size={16} />
            Clear input
          </button>
          <button type="submit" className="button button--primary button--sm">
            Run command
          </button>
        </div>
      </form>
    </section>
  );
}
