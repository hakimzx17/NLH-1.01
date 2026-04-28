import type { LessonDefinition } from '../types';

import { d1NetworkComponents } from './d1-network-components';
import { d1OsiModel } from './d1-osi-model';
import { d1IpAddressing } from './d1-ip-addressing';
import { d1SubnettingBasics } from './d1-subnetting-basics';
import { d1BasicNetworkTesting } from './d1-basic-network-testing';
import { d1CablingStandards } from './d1-cabling-standards';
import { d1NetworkTopologies } from './d1-network-topologies';
import { d1WirelessBasics } from './d1-wireless-basics';
import { d1Ipv6Fundamentals } from './d1-ipv6-fundamentals';

const lessons: Record<string, LessonDefinition> = {
  'd1-network-components': d1NetworkComponents,
  'd1-osi-model': d1OsiModel,
  'd1-ip-addressing': d1IpAddressing,
  'd1-subnetting-basics': d1SubnettingBasics,
  'd1-basic-network-testing': d1BasicNetworkTesting,
  'd1-cabling-standards': d1CablingStandards,
  'd1-network-topologies': d1NetworkTopologies,
  'd1-wireless-basics': d1WirelessBasics,
  'd1-ipv6-fundamentals': d1Ipv6Fundamentals,
};

export function getLessonById(lessonId: string): LessonDefinition | null {
  return lessons[lessonId] ?? null;
}

export function getLessonsByDomain(domainId: string): LessonDefinition[] {
  return Object.values(lessons).filter((lesson) => lesson.domainId === domainId);
}

export function getAllLessons(): LessonDefinition[] {
  return Object.values(lessons);
}
