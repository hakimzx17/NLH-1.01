import type { QuizQuestion } from '../types';

import { d1NetworkComponentsQuiz } from './d1-network-components';
import { d1OsiModelQuiz } from './d1-osi-model';
import { d1IpAddressingQuiz } from './d1-ip-addressing';
import { d1SubnettingBasicsQuiz } from './d1-subnetting-basics';
import { domain1Quiz } from './domain-1';

const lessonQuizzes: Record<string, QuizQuestion[]> = {
  'd1-network-components': d1NetworkComponentsQuiz,
  'd1-osi-model': d1OsiModelQuiz,
  'd1-ip-addressing': d1IpAddressingQuiz,
  'd1-subnetting-basics': d1SubnettingBasicsQuiz,
};

const domainQuizzes: Record<string, QuizQuestion[]> = {
  'domain-1': domain1Quiz,
};

export function getLessonQuiz(lessonId: string): QuizQuestion[] {
  return lessonQuizzes[lessonId] ?? [];
}

export function getDomainQuiz(domainId: string): QuizQuestion[] {
  return domainQuizzes[domainId] ?? [];
}

export function hasLessonQuiz(lessonId: string): boolean {
  return lessonId in lessonQuizzes;
}

export function hasDomainQuiz(domainId: string): boolean {
  return domainId in domainQuizzes;
}
