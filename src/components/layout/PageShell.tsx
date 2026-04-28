import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useProfileStore } from '../../store/profileStore';
import { useProgressStore } from '../../store/progressStore';
import { getInitials } from '../../lib/format';
import { ProfileSetupModal } from '../profile/ProfileSetupModal';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';

export function PageShell() {
  const hasCompletedSetup = useProfileStore((state) => state.hasCompletedSetup);
  const name = useProfileStore((state) => state.name);

  const domainProgress = useProgressStore((state) => state.domains);
  const hydrateVisit = useProgressStore((state) => state.hydrateVisit);
  const lastLessonId = useProgressStore((state) => state.lastLessonId);

  useEffect(() => {
    hydrateVisit();
  }, [hydrateVisit]);

  const displayName = name || 'Guest profile';

  return (
    <div className="app-shell">
      <div className="app-shell__background" aria-hidden="true" />

      <Sidebar
        avatarMonogram={name ? getInitials(name) : 'GP'}
        displayName={displayName}
        domainProgress={domainProgress}
      />

      <div className="app-shell__main">
        <TopNav lastLessonId={lastLessonId} />
        <main className="app-shell__content">
          <Outlet />
        </main>
      </div>

      <ProfileSetupModal isOpen={!hasCompletedSetup} />
    </div>
  );
}
