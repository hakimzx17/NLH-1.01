import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, ClipboardList } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import type { FormEvent, KeyboardEvent, ReactElement } from 'react';

import { LabDesktopGuard } from '../components/lab/LabDesktopGuard';
import { LabLockedGuard } from '../components/lab/LabLockedGuard';
import { LabShell } from '../components/lab/LabShell';
import { Card } from '../components/ui/Card';
import { getLessonPreviewById } from '../content/domains';
import { getLessonById } from '../content/lessons';
import { getLessonLab } from '../content/labs';
import { useMediaQuery } from '../hooks/useMediaQuery';
import {
  completeLabCommand,
  createLabSession,
  executeLabCommand,
  getGuidedAssist,
  navigateLabHistory,
} from '../lib/labEngine';
import { useProgressStore } from '../store/progressStore';

export function LabPage() {
  const { id = '' } = useParams<{ id: string }>();
  const lesson = getLessonById(id);
  const preview = getLessonPreviewById(id);
  const definition = getLessonLab(id);
  const isDesktop = useMediaQuery('(min-width: 1024px)', true);

  const lessonProgress = useProgressStore((state) => state.lessons[id]);
  const markLabComplete = useProgressStore((state) => state.markLabComplete);

  const [session, setSession] = useState(() => (definition ? createLabSession(definition) : null));
  const [inputValue, setInputValue] = useState('');
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [guidedMode, setGuidedMode] = useState(true);
  const [hintsVisible, setHintsVisible] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState(definition?.topology.devices[0]?.id ?? '');

  useEffect(() => {
    if (!definition) {
      setSession(null);
      setSelectedNodeId('');
      return;
    }

    setSession(createLabSession(definition));
    setSelectedNodeId(definition.topology.devices[0]?.id ?? '');
    setInputValue('');
    setHistoryIndex(null);
    setGuidedMode(true);
    setHintsVisible(false);
  }, [definition]);

  useEffect(() => {
    if (session?.isComplete && !lessonProgress?.labComplete) {
      markLabComplete(id);
    }
  }, [id, lessonProgress?.labComplete, markLabComplete, session?.isComplete]);

  const lessonTitle = lesson?.title ?? preview?.title ?? 'Lesson';
  const moduleLabel = lesson?.moduleLabel ?? preview?.moduleLabel ?? '0.0';
  const isLocked = lessonProgress?.status === 'locked';
  const guidedAssist = useMemo(() => {
    if (!definition || !session || !guidedMode) {
      return null;
    }

    return getGuidedAssist(definition, session);
  }, [definition, guidedMode, session]);

  function renderPendingLabFallback(): ReactElement {
    return (
      <section className="page page--narrow lab-page">
        <header className="page-header lab-page__header">
          <Link className="page-header__back" to={`/lesson/${id}?tab=lab`}>
            <ArrowLeft size={16} />
            Back to lesson
          </Link>
          <p className="page-header__eyebrow">{moduleLabel} · Practice Lab</p>
          <h1>Lab platform ready, lesson scenario pending</h1>
          <p className="page-header__description">
            {lessonTitle} does not have a bespoke practice lab yet. The shared CLI shell is ready for authored lessons, and you can continue into the lesson quiz from here.
          </p>
        </header>

        <Card className="lab-page__fallback" accent>
          <h2 className="lab-page__fallback-title">Next study steps</h2>
          <p className="lab-page__fallback-copy">
            Stay in the lesson flow by reviewing theory or moving into the quiz while this specific lab scenario is still pending.
          </p>
          <div className="lab-page__actions">
            <Link className="button button--ghost" to={`/lesson/${id}`}>
              Return to lesson
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

  if (!lesson && !preview) {
    return (
      <section className="page page--narrow lab-page">
        <header className="page-header">
          <p className="page-header__eyebrow">Practice lab not found</p>
          <h1>Practice lab not found</h1>
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
      <LabLockedGuard
        domainId={preview.domainId}
        lessonId={id}
        lessonTitle={lessonTitle}
        moduleLabel={moduleLabel}
      />
    );
  }

  if (!definition) {
    return renderPendingLabFallback();
  }

  if (!isDesktop) {
    return <LabDesktopGuard lessonId={id} lessonTitle={lessonTitle} moduleLabel={moduleLabel} />;
  }

  if (!session) {
    return renderPendingLabFallback();
  }

  const activeDefinition = definition;
  const activeSession = session;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (inputValue.trim().length === 0) {
      return;
    }

    setSession((currentSession) => (currentSession ? executeLabCommand(activeDefinition, currentSession, inputValue) : currentSession));
    setInputValue('');
    setHistoryIndex(null);
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setInputValue(completeLabCommand(activeDefinition, activeSession, inputValue));
      return;
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      const direction = event.key === 'ArrowUp' ? 'up' : 'down';
      const historyState = navigateLabHistory(activeSession.commandHistory, historyIndex, direction);

      setHistoryIndex(historyState.nextIndex);
      setInputValue(historyState.nextInput);
    }
  }

  function handleReset() {
    setSession(createLabSession(activeDefinition));
    setInputValue('');
    setHistoryIndex(null);
    setGuidedMode(true);
    setHintsVisible(false);
    setSelectedNodeId(activeDefinition.topology.devices[0]?.id ?? '');
  }

  return (
    <section className="page lab-page">
      <header className="page-header lab-page__header">
        <Link className="page-header__back" to={`/lesson/${id}?tab=lab`}>
          <ArrowLeft size={16} />
          Back to lesson
        </Link>
        <p className="page-header__eyebrow">{moduleLabel} · Practice Lab</p>
        <h1>{activeDefinition.title}</h1>
        <p className="page-header__description">{activeDefinition.summary}</p>
      </header>

      <LabShell
        definition={activeDefinition}
        guidedAssist={guidedAssist}
        guidedMode={guidedMode}
        hintsVisible={hintsVisible}
        inputValue={inputValue}
        onClearInput={() => {
          setInputValue('');
          setHistoryIndex(null);
        }}
        onInputChange={setInputValue}
        onInputKeyDown={handleInputKeyDown}
        onReset={handleReset}
        onSelectNode={setSelectedNodeId}
        onSubmit={handleSubmit}
        onToggleGuidedMode={() => setGuidedMode((current) => !current)}
        onToggleHints={() => setHintsVisible((current) => !current)}
        selectedNodeId={selectedNodeId}
        session={activeSession}
      />

      <Card className="lab-page__next" accent={lessonProgress?.labComplete}>
        <div className="lab-page__next-header">
          <div>
            <p className="lab-page__next-eyebrow">Progression</p>
            <h2 className="lab-page__next-title">
              {lessonProgress?.labComplete ? 'Lab completion saved to lesson progress' : 'Complete all objectives to save lab progress'}
            </h2>
          </div>
          <span className={`simulation-status ${lessonProgress?.labComplete ? 'simulation-status--viewed' : 'simulation-status--pending'}`}>
            {lessonProgress?.labComplete ? 'Saved' : 'In progress'}
          </span>
        </div>
        <p className="lab-page__next-copy">
          The objective checklist is driven by expected configuration state, so repeating the same command sequence always produces the same result. When all objectives complete, the lesson store records the lab as finished.
        </p>
        <div className="lab-page__actions">
          <Link className="button button--ghost" to={`/lesson/${id}?tab=lab`}>
            Return to practice lab tab
          </Link>
          <Link className="button button--primary" to={`/lesson/${id}/quiz`}>
            {lessonProgress?.labComplete ? <CheckCircle2 size={18} /> : <ClipboardList size={18} />}
            {lessonProgress?.labComplete ? 'Continue to lesson quiz' : 'Open lesson quiz'}
          </Link>
        </div>
      </Card>
    </section>
  );
}
