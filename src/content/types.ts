import type { DomainId } from './domains';

// ---------------------------------------------------------------------------
// Lesson content models
// ---------------------------------------------------------------------------

export type CalloutType = 'why-matters' | 'exam-trap' | 'remember' | 'real-world' | 'analogy';

export type CalloutBlock = {
  type: CalloutType;
  title: string;
  body: string;
};

export type CLISpotlight = {
  id: string;
  title: string;
  commands: string[];
  explanation: string;
};

export type CheckpointOption = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type ConceptCheckpoint = {
  id: string;
  question: string;
  options: CheckpointOption[];
  hint?: string;
};

export type LessonSection = {
  id: string;
  heading: string;
  body: string;
  estimatedReadingMinutes: number;
};

export type VisualBlock = {
  id: string;
  type: 'diagram' | 'topology' | 'flow';
  title: string;
  description: string;
  svgContent: string;
};

export type LessonDefinition = {
  id: string;
  domainId: DomainId;
  moduleLabel: string;
  title: string;
  estimatedMinutes: number;
  hook: string;
  sections: LessonSection[];
  callouts: CalloutBlock[];
  cliSpotlights: CLISpotlight[];
  checkpoints: ConceptCheckpoint[];
  visualBlocks: VisualBlock[];
  summaryPoints: string[];
};

// ---------------------------------------------------------------------------
// Module sidebar item
// ---------------------------------------------------------------------------

export type ModuleSidebarItem = {
  id: string;
  moduleLabel: string;
  title: string;
  status: 'completed' | 'active' | 'locked';
};

// ---------------------------------------------------------------------------
// Domain directory card
// ---------------------------------------------------------------------------

export type DomainDirectoryCard = {
  id: DomainId;
  index: number;
  shortLabel: string;
  title: string;
  examWeightPercent: number;
  lessonsTarget: number;
  description: string;
  progressPercent: number;
  completedLessons: number;
  status: 'not-started' | 'in-progress' | 'complete';
  firstLessonId: string;
  isLocked: boolean;
};

// ---------------------------------------------------------------------------
// Simulation metadata
// ---------------------------------------------------------------------------

export type SimulationMetadata = {
  lessonId: string;
  type: string;
  title: string;
  description: string;
  caption: string;
};

// ---------------------------------------------------------------------------
// Lab metadata
// ---------------------------------------------------------------------------

export type LabObjective = {
  id: string;
  title: string;
  description: string;
  validation: LabObjectiveValidation;
};

export type LabNodeType = 'router' | 'switch-l2' | 'switch-l3' | 'pc' | 'server' | 'firewall' | 'cloud';

export type LabLinkType = 'copper' | 'fiber' | 'serial';

export type LabTopologyNode = {
  id: string;
  label: string;
  type: LabNodeType;
  x: number;
  y: number;
  note: string;
};

export type LabTopologyLink = {
  id: string;
  sourceId: string;
  targetId: string;
  type: LabLinkType;
  label: string;
  stateBinding?: {
    deviceId: string;
    interfaceId: string;
  };
};

export type LabHint = {
  id: string;
  title: string;
  body: string;
};

export type LabInterfaceRuntimeState = {
  id: string;
  label: string;
  ipAddress: string | null;
  subnetMask: string | null;
  description: string;
  adminUp: boolean;
  protocolUp: boolean;
};

export type LabOspfNetwork = {
  network: string;
  wildcard: string;
  area: string;
};

export type LabRoutingProcessState = {
  processId: string;
  networks: LabOspfNetwork[];
};

export type LabDeviceRuntimeState = {
  deviceId: string;
  hostname: string;
  type: LabNodeType;
  interfaces: Record<string, LabInterfaceRuntimeState>;
  ospfProcesses: Record<string, LabRoutingProcessState>;
};

export type LabInitialState = {
  activeDeviceId: string;
  devices: Record<string, LabDeviceRuntimeState>;
};

export type LabObjectiveValidation =
  | {
      type: 'hostname';
      deviceId: string;
      expectedHostname: string;
    }
  | {
      type: 'interface';
      deviceId: string;
      interfaceId: string;
      expected: {
        description: string;
        ipAddress: string;
        subnetMask: string;
        adminUp: boolean;
      };
    }
  | {
      type: 'ospf-network';
      deviceId: string;
      processId: string;
      expected: LabOspfNetwork;
    };

export type LabGuidedAssist = {
  command: string;
  explanation: string;
  objectiveId: string;
};

export type LabDefinition = {
  id: string;
  lessonId: string;
  title: string;
  summary: string;
  scenario: string;
  topology: {
    devices: LabTopologyNode[];
    links: LabTopologyLink[];
  };
  objectives: LabObjective[];
  hints: LabHint[];
  initialState: LabInitialState;
};

export type LabMetadata = Pick<LabDefinition, 'lessonId' | 'title' | 'summary' | 'scenario' | 'objectives' | 'hints'>;

export type LabObjectiveProgress = {
  objectiveId: string;
  isComplete: boolean;
};

// ---------------------------------------------------------------------------
// Flashcard metadata
// ---------------------------------------------------------------------------

export type FlashcardMetadata = {
  lessonId: string;
  deckId: string;
  cardCount: number;
  title: string;
};

// ---------------------------------------------------------------------------
// Quiz metadata
// ---------------------------------------------------------------------------

export type QuizMetadata = {
  lessonId: string;
  questionCount: number;
  passThreshold: number;
  title: string;
};

// ---------------------------------------------------------------------------
// Quiz question models
// ---------------------------------------------------------------------------

export type QuestionType = 'single-mcq' | 'multi-mcq' | 'true-false' | 'fill-blank';

export type QuizOption = {
  id: string;
  text: string;
};

export type QuizQuestion = {
  id: string;
  type: QuestionType;
  stem: string;
  options?: QuizOption[];
  correct: string | string[];
  explanation: string;
  lessonId: string;
  domainId: DomainId;
};

export type QuizAttempt = {
  quizId: string;
  score: number;
  attemptDate: string;
  missedQuestionIds: string[];
};

export type QuizState = {
  questions: QuizQuestion[];
  currentIndex: number;
  answers: Record<string, string | string[]>;
  startTime: number;
  elapsedSeconds: number;
  isSubmitted: boolean;
  isComplete: boolean;
};
