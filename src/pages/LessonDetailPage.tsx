import { useEffect } from 'react';
import { BookOpen, ClipboardList, FlaskConical, Layers, PlayCircle } from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import { getDomainById, getDomainLessonPreviews, getLessonPreviewById } from '../content/domains';
import { getLessonById } from '../content/lessons';
import type { LessonPreview } from '../content/domains';
import type { LessonProgress } from '../store/progressStore';
import type { ModuleSidebarItem } from '../content/types';
import { useProgressStore } from '../store/progressStore';
import { LessonDetailHeader } from '../components/lesson/LessonDetailHeader';
import { LessonTabBar } from '../components/lesson/LessonTabBar';
import { LessonTabContent } from '../components/lesson/LessonTabContent';
import { ModuleSidebar } from '../components/lesson/ModuleSidebar';

type TabId = 'theory' | 'simulation' | 'lab' | 'flashcards' | 'quiz';

const TABS: { id: TabId; label: string; icon: typeof BookOpen }[] = [
  { id: 'theory', label: 'Theory', icon: BookOpen },
  { id: 'simulation', label: 'Simulation', icon: PlayCircle },
  { id: 'lab', label: 'Practice Lab', icon: FlaskConical },
  { id: 'flashcards', label: 'Flash cards', icon: Layers },
  { id: 'quiz', label: 'Lesson Quiz', icon: ClipboardList },
];

function getSidebarItemStatus(lessonId: string, currentIndex: number, lessonStatuses: Record<string, LessonProgress>): ModuleSidebarItem['status'] {
  const status = lessonStatuses[lessonId]?.status;
  if (status === 'passed') return 'completed';
  if (currentIndex === 0 || status === 'in-progress' || status === 'available') return 'active';
  if (status === 'locked' || !status) return 'locked';
  return 'locked';
}

export function LessonDetailPage() {
  const { id = '' } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const lessonPreview = getLessonPreviewById(id);
  const lesson = getLessonById(id);
  const lessonProgress = useProgressStore((state: { lessons: Record<string, LessonProgress> }) => state.lessons);
  const markLessonAccessed = useProgressStore((state: { markLessonAccessed: (id: string) => void }) => state.markLessonAccessed);

  const domain = lesson ? getDomainById(lesson.domainId) : lessonPreview ? getDomainById(lessonPreview.domainId) : null;
  const domainLessons: LessonPreview[] = lesson ? getDomainLessonPreviews(lesson.domainId) : [];
  const currentLessonProgress = lessonProgress[id];

  const sidebarItems: ModuleSidebarItem[] = domainLessons.map((preview: LessonPreview, index: number) => ({
    id: preview.id,
    moduleLabel: preview.moduleLabel,
    title: preview.title,
    status: getSidebarItemStatus(preview.id, index, lessonProgress),
  }));

  const tabParam = searchParams.get('tab');
  const activeTab: TabId =
    tabParam === 'simulation' || tabParam === 'lab' || tabParam === 'flashcards' || tabParam === 'quiz'
      ? tabParam
      : 'theory';

  function handleTabChange(tabId: TabId) {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (tabId === 'theory') {
      nextSearchParams.delete('tab');
    } else {
      nextSearchParams.set('tab', tabId);
    }

    setSearchParams(nextSearchParams, { replace: true });
  }

  // Mark lesson as accessed when the page loads
  useEffect(() => {
    if (id && currentLessonProgress?.status !== 'locked') markLessonAccessed(id);
  }, [currentLessonProgress?.status, id, markLessonAccessed]);

  if (!lessonPreview) {
    return (
      <section className="page page--narrow">
        <header className="page-header">
          <p className="page-header__eyebrow">Lesson not found</p>
          <h1>Lesson Not Found</h1>
          <p className="page-header__description">
            The lesson you are looking for does not exist yet. Structured lesson content is being added progressively.
          </p>
          <Link className="button button--primary" to="/domains">Back to Domains</Link>
        </header>
      </section>
    );
  }

  if (currentLessonProgress?.status === 'locked') {
    return (
      <section className="page page--narrow">
        <header className="page-header">
          <p className="page-header__eyebrow">Lesson locked</p>
          <h1>{lessonPreview.title} is still locked</h1>
          <p className="page-header__description">
            Complete the previous lesson sequence or finish the earlier domain path to unlock this lesson.
          </p>
          <Link className="button button--primary" to="/domains">
            Back to Domains
          </Link>
        </header>
      </section>
    );
  }

  if (!lesson || !domain) {
    return (
      <section className="page page--narrow">
        <header className="page-header">
          <p className="page-header__eyebrow">Lesson not found</p>
          <h1>Lesson Not Found</h1>
          <p className="page-header__description">
            The lesson you are looking for does not exist yet. Structured lesson content is being added progressively.
          </p>
          <Link className="button button--primary" to="/domains">Back to Domains</Link>
        </header>
      </section>
    );
  }

  return (
    <section className="lesson-detail" aria-label="Lesson detail view">
      <LessonDetailHeader
        domainIndex={domain.index}
        domainTitle={domain.title}
        lessonTitle={lesson.title}
        moduleLabel={lesson.moduleLabel}
        estimatedMinutes={lesson.estimatedMinutes}
        progressStatus={lessonProgress[id]?.status}
      />

      <ModuleSidebar items={sidebarItems} currentLessonId={id} />

      <div className="lesson-detail__content">
        <LessonTabBar tabs={TABS} activeTab={activeTab} onTabChange={handleTabChange} />
        <LessonTabContent activeTab={activeTab} lesson={lesson} lessonId={id} />
      </div>
    </section>
  );
}
