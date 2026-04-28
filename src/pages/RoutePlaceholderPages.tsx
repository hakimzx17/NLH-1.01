import { useParams } from 'react-router-dom';

import { RoutePlaceholderPage } from './RoutePlaceholderPage';
import { FlashcardDeckPicker } from '../components/flashcard/FlashcardDeckPicker';
import { FlashcardSession } from '../components/flashcard/FlashcardSession';
import { VaultHome } from '../components/vault/VaultHome';
import { VaultCategory } from '../components/vault/VaultCategory';

export function SimulationPage() {
  const { id = 'lesson' } = useParams();

  return (
    <RoutePlaceholderPage
      actionLabel="Back to lesson"
      actionTo={`/lesson/${id}`}
      checklist={[
        'Desktop-first route is available in the router.',
        'Simulation shell and controls land in Milestone 3.',
        'This path is already linked from the dashboard and lesson flow.',
      ]}
      description="Simulation routes exist early so the product loop is visible before the bespoke animations are built."
      eyebrow="Simulation route"
      title="Simulation shell placeholder"
    />
  );
}

export function DomainQuizPage() {
  const { id = 'domain-1' } = useParams();

  return (
    <RoutePlaceholderPage
      actionLabel="Return to domain"
      actionTo={`/domain/${id}`}
      checklist={[
        'Domain quiz route is configured and reachable.',
        'Question pools and scoring logic land in Milestone 2.',
        'The dashboard already reflects domain completion shape from persisted state.',
      ]}
      description="The capstone quiz entry point for each domain is already part of the router and shell."
      eyebrow="Domain quiz route"
      title="Domain quiz placeholder"
    />
  );
}

export function VaultPage() {
  return <VaultHome />;
}

export function VaultCategoryPage() {
  return <VaultCategory />;
}

export function FlashcardsPage() {
  return <FlashcardDeckPicker />;
}

export function FlashcardSessionPage() {
  return <FlashcardSession />;
}

export function ExamPage() {
  return (
    <RoutePlaceholderPage
      actionLabel="Open exam session placeholder"
      actionTo="/exam/session"
      checklist={[
        'Exam home route is active.',
        'Scoped domain selection and timer logic land in Milestone 6.',
        'The shell already distinguishes long-lived progress from future exam state.',
      ]}
      description="Exam mode is part of the global navigation now, even though the assessment engine is still ahead."
      eyebrow="Exam route"
      title="Exam mode home placeholder"
    />
  );
}

export function ExamSessionPage() {
  return (
    <RoutePlaceholderPage
      actionLabel="View exam results placeholder"
      actionTo="/exam/results"
      checklist={[
        'Exam session route is active.',
        'Timed behavior and mixed-domain question assembly land in Milestone 6.',
        'The router already supports a full start-to-results flow.',
      ]}
      description="The dedicated active-session route is in place so later work can focus on exam behavior instead of shell plumbing."
      eyebrow="Exam session route"
      title="Exam session placeholder"
    />
  );
}

export function ExamResultsPage() {
  return (
    <RoutePlaceholderPage
      actionLabel="Back to exam mode"
      actionTo="/exam"
      checklist={[
        'Results route is live and reachable from the exam session placeholder.',
        'Per-domain breakdowns and weak-area guidance land in Milestone 6.',
        'The route structure now matches the PRD information architecture.',
      ]}
      description="Results already have a stable URL in the product shell, ready for the future scoring and review UI."
      eyebrow="Exam results route"
      title="Exam results placeholder"
    />
  );
}
