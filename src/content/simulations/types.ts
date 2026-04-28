import type { ComponentType } from 'react';

export const SIMULATION_SPEED_OPTIONS = [0.75, 1, 1.5, 2] as const;

export type SimulationSpeed = (typeof SIMULATION_SPEED_OPTIONS)[number];

export type SimulationStep = {
  id: string;
  label: string;
  caption: string;
  instruction: string;
  stateLabel: string;
  dwellMs: number;
};

export type LessonSimulationSceneProps = {
  activeStep: SimulationStep;
  activeStepIndex: number;
  totalSteps: number;
  isPlaying: boolean;
  reducedMotion: boolean;
};

export type LessonSimulationDefinition = {
  lessonId: string;
  title: string;
  summary: string;
  learningGoals: string[];
  steps: SimulationStep[];
  speedOptions?: readonly SimulationSpeed[];
  Scene: ComponentType<LessonSimulationSceneProps>;
};
