import type { LabDefinition } from '../types';

import { d1NetworkComponentsLab } from './d1-network-components';

const labsByLessonId: Record<string, LabDefinition> = {
  'd1-network-components': d1NetworkComponentsLab,
};

export function getLessonLab(lessonId: string): LabDefinition | null {
  return labsByLessonId[lessonId] ?? null;
}
