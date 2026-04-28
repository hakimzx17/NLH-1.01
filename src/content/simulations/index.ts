import { d1NetworkComponentsSimulation } from './d1-network-components';
import type { LessonSimulationDefinition } from './types';

const simulations: Record<string, LessonSimulationDefinition> = {
  'd1-network-components': d1NetworkComponentsSimulation,
};

export function getLessonSimulation(lessonId: string): LessonSimulationDefinition | null {
  return simulations[lessonId] ?? null;
}
