import type { LucideIcon } from 'lucide-react';

type TabId = 'theory' | 'simulation' | 'lab' | 'flashcards' | 'quiz';

type LessonTabBarProps = {
  tabs: { id: TabId; label: string; icon: LucideIcon }[];
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
};

export function LessonTabBar({ tabs, activeTab, onTabChange }: LessonTabBarProps) {
  return (
    <div className="lesson-tabs" role="tablist" aria-label="Lesson content tabs">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            className={`lesson-tab ${isActive ? 'lesson-tab--active' : ''}`}
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tab-panel-${tab.id}`}
            type="button"
          >
            <Icon size={16} aria-hidden="true" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
