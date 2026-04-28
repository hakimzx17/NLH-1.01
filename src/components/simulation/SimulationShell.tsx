import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, StepForward } from 'lucide-react';

import type { LessonSimulationDefinition, SimulationSpeed } from '../../content/simulations/types';
import { SIMULATION_SPEED_OPTIONS } from '../../content/simulations/types';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

type SimulationShellProps = {
  definition: LessonSimulationDefinition;
  isViewed: boolean;
  onViewed: () => void;
};

export function SimulationShell({ definition, isViewed, onViewed }: SimulationShellProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<SimulationSpeed>(1);
  const hasMarkedViewedRef = useRef<boolean>(isViewed);

  const speedOptions = definition.speedOptions ?? SIMULATION_SPEED_OPTIONS;
  const activeStep = definition.steps[activeStepIndex];
  const isLastStep = activeStepIndex >= definition.steps.length - 1;
  const Scene = definition.Scene;
  const stepAnnouncement = `Step ${activeStepIndex + 1} of ${definition.steps.length}. ${activeStep.label}. ${activeStep.caption} ${activeStep.instruction} Current state: ${activeStep.stateLabel}.`;

  useEffect(() => {
    if (isViewed) {
      hasMarkedViewedRef.current = true;
    }
  }, [isViewed]);

  useEffect(() => {
    if (!isPlaying) {
      return undefined;
    }

    if (isLastStep) {
      setIsPlaying(false);
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setActiveStepIndex((currentIndex) => Math.min(currentIndex + 1, definition.steps.length - 1));
    }, Math.max(1000, Math.round(activeStep.dwellMs / speed)));

    return () => {
      window.clearTimeout(timeout);
    };
  }, [activeStep.dwellMs, definition.steps.length, isLastStep, isPlaying, speed]);

  function markViewedOnce(): void {
    if (hasMarkedViewedRef.current) {
      return;
    }

    hasMarkedViewedRef.current = true;
    onViewed();
  }

  function handlePlayPause(): void {
    markViewedOnce();

    if (isPlaying) {
      setIsPlaying(false);
      return;
    }

    if (isLastStep) {
      setActiveStepIndex(0);
    }

    setIsPlaying(true);
  }

  function handleStep(): void {
    markViewedOnce();
    setIsPlaying(false);
    setActiveStepIndex((currentIndex) => Math.min(currentIndex + 1, definition.steps.length - 1));
  }

  function handleReset(): void {
    setIsPlaying(false);
    setActiveStepIndex(0);
  }

  return (
    <div className="simulation-shell">
      <Card className="simulation-shell__viewport" accent>
        <div className="simulation-shell__viewport-header">
          <div>
            <p className="simulation-shell__eyebrow">Shared simulation shell</p>
            <h2 className="simulation-shell__title">{definition.title}</h2>
          </div>
          <span className={`simulation-status ${isViewed ? 'simulation-status--viewed' : 'simulation-status--pending'}`}>
            {isViewed ? 'Viewed' : 'Not yet viewed'}
          </span>
        </div>

        <Scene
          activeStep={activeStep}
          activeStepIndex={activeStepIndex}
          totalSteps={definition.steps.length}
          isPlaying={isPlaying}
          reducedMotion={prefersReducedMotion}
        />

        <div className="sr-only" aria-atomic="true" aria-live="polite" role="status">
          {stepAnnouncement}
        </div>
      </Card>

      <div className="simulation-shell__panel-grid">
        <Card className="simulation-shell__panel simulation-shell__panel--controls">
          <div className="simulation-shell__panel-header">
            <h3 className="simulation-shell__panel-title">Playback controls</h3>
            <p className="simulation-shell__panel-copy">Default state is paused. Advance manually or let the shell walk through the lesson at your chosen speed.</p>
          </div>

          <div className="simulation-shell__control-row">
            <Button className="simulation-shell__control-button" onClick={handlePlayPause}>
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              {isPlaying ? 'Pause' : isLastStep ? 'Replay' : 'Play'}
            </Button>
            <Button className="simulation-shell__control-button" variant="ghost" onClick={handleStep} disabled={isLastStep}>
              <StepForward size={16} />
              Step
            </Button>
            <Button className="simulation-shell__control-button" variant="ghost" onClick={handleReset}>
              <RotateCcw size={16} />
              Reset
            </Button>
          </div>

          <div className="simulation-shell__speed-block">
            <span className="simulation-shell__speed-label">Speed</span>
            <div className="simulation-shell__speed-options" role="group" aria-label="Simulation speed">
              {speedOptions.map((speedOption) => (
                <button
                  key={speedOption}
                  type="button"
                  className={`simulation-shell__speed-button ${speed === speedOption ? 'simulation-shell__speed-button--active' : ''}`}
                  aria-pressed={speed === speedOption}
                  onClick={() => setSpeed(speedOption)}
                >
                  {speedOption}x
                </button>
              ))}
            </div>
          </div>

          <p className="simulation-shell__support-copy">
            {prefersReducedMotion
              ? 'Reduced motion is active, so the viewport swaps between clear static states instead of animating movement.'
              : 'Playback uses subtle motion only. Every state change is also explained in text so the concept stays understandable.'}
          </p>
        </Card>

        <Card className="simulation-shell__panel simulation-shell__panel--caption">
          <div className="simulation-shell__panel-header">
            <h3 className="simulation-shell__panel-title">What you are seeing</h3>
            <span className="simulation-shell__step-pill">Step {activeStepIndex + 1}</span>
          </div>

          <h4 className="simulation-shell__caption-title">{activeStep.label}</h4>
          <p className="simulation-shell__caption-copy">{activeStep.caption}</p>
          <p className="simulation-shell__caption-note">{activeStep.instruction}</p>
          <div className="simulation-shell__caption-state">{activeStep.stateLabel}</div>
        </Card>

        <Card className="simulation-shell__panel simulation-shell__panel--steps">
          <div className="simulation-shell__panel-header">
            <h3 className="simulation-shell__panel-title">Visual state map</h3>
            <p className="simulation-shell__panel-copy">Use the highlighted step rail to tie the viewport, caption, and lesson language together.</p>
          </div>

          <ol className="simulation-shell__step-list">
            {definition.steps.map((step, index) => {
              const stateClassName =
                index < activeStepIndex
                  ? 'simulation-shell__step-item--complete'
                  : index === activeStepIndex
                    ? 'simulation-shell__step-item--active'
                    : 'simulation-shell__step-item--upcoming';

              return (
                <li className={`simulation-shell__step-item ${stateClassName}`} key={step.id}>
                  <span className="simulation-shell__step-index">{index + 1}</span>
                  <div>
                    <strong className="simulation-shell__step-label">{step.label}</strong>
                    <p className="simulation-shell__step-state">{step.stateLabel}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Card>
      </div>
    </div>
  );
}
