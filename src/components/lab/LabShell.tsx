import type { FormEvent, KeyboardEvent } from 'react';

import type { LabDefinition, LabGuidedAssist } from '../../content/types';
import type { LabSessionState } from '../../lib/labEngine';
import { LabObjectivesPanel } from './LabObjectivesPanel';
import { LabTerminalPanel } from './LabTerminalPanel';
import { LabTopologyPanel } from './LabTopologyPanel';

type LabShellProps = {
  definition: LabDefinition;
  session: LabSessionState;
  guidedAssist: LabGuidedAssist | null;
  guidedMode: boolean;
  hintsVisible: boolean;
  selectedNodeId: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  onInputKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClearInput: () => void;
  onToggleGuidedMode: () => void;
  onToggleHints: () => void;
  onReset: () => void;
  onSelectNode: (nodeId: string) => void;
};

export function LabShell({
  definition,
  session,
  guidedAssist,
  guidedMode,
  hintsVisible,
  selectedNodeId,
  inputValue,
  onInputChange,
  onInputKeyDown,
  onSubmit,
  onClearInput,
  onToggleGuidedMode,
  onToggleHints,
  onReset,
  onSelectNode,
}: LabShellProps) {
  return (
    <div className="lab-shell">
      <div className="lab-shell__grid">
        <LabTopologyPanel
          definition={definition}
          onSelectNode={onSelectNode}
          selectedNodeId={selectedNodeId}
          session={session}
        />

        <LabObjectivesPanel
          definition={definition}
          guidedAssist={guidedAssist}
          guidedMode={guidedMode}
          hintsVisible={hintsVisible}
          onReset={onReset}
          onToggleGuidedMode={onToggleGuidedMode}
          onToggleHints={onToggleHints}
          session={session}
        />
      </div>

      <LabTerminalPanel
        inputValue={inputValue}
        onClearInput={onClearInput}
        onInputChange={onInputChange}
        onInputKeyDown={onInputKeyDown}
        onSubmit={onSubmit}
        session={session}
      />
    </div>
  );
}
