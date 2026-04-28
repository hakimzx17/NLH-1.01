import type { ModuleSidebarItem } from '../../content/types';
import { Link } from 'react-router-dom';

type ModuleSidebarProps = {
  items: ModuleSidebarItem[];
  currentLessonId: string;
};

export function ModuleSidebar({ items, currentLessonId }: ModuleSidebarProps) {
  return (
    <nav className="lesson-sidebar" aria-label="Lesson modules">
      <p className="lesson-sidebar__label">Modules</p>
      {items.map((item) => {
        const isActive = item.id === currentLessonId;
        const isLocked = item.status === 'locked';
        const isCompleted = item.status === 'completed';

        let itemClass = 'lesson-sidebar__item';
        if (isActive) itemClass += ' lesson-sidebar__item--active';
        if (isLocked) itemClass += ' lesson-sidebar__item--locked';
        if (isCompleted) itemClass += ' lesson-sidebar__item--completed';

        return (
          <Link
            className={itemClass}
            key={item.id}
            to={`/lesson/${item.id}`}
            aria-current={isActive ? 'page' : undefined}
            aria-disabled={isLocked}
          >
            <span className="lesson-sidebar__item-label">{item.moduleLabel}</span>
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
