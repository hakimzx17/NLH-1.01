import {
  Beaker,
  LayoutGrid,
  Shield,
} from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { domains } from '../../content/domains';
import type { DomainId } from '../../content/domains';
import type { DomainProgress } from '../../store/progressStore';

type SidebarProps = {
  avatarMonogram: string;
  displayName: string;
  domainProgress: Record<DomainId, DomainProgress>;
};

const primaryLinks = [
  { icon: LayoutGrid, label: 'Lessons', to: '/domains' },
  { icon: Beaker, label: 'Labs', to: '/lesson/d2-stp/lab' },
  { icon: Shield, label: 'Quiz', to: '/lesson/d2-stp/quiz' },
];

function getDomainDotClass(status: DomainProgress['status']): string {
  if (status === 'complete') {
    return 'sidebar__domain-dot sidebar__domain-dot--complete';
  }

  if (status === 'in-progress') {
    return 'sidebar__domain-dot sidebar__domain-dot--active';
  }

  return 'sidebar__domain-dot';
}

export function Sidebar({ avatarMonogram, displayName, domainProgress }: SidebarProps) {
  const location = useLocation();
  const isCourseMapRoute = location.pathname.startsWith('/domains');

  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <Link aria-label="Go to dashboard" className="sidebar__brand" to="/">
          <span aria-hidden="true" className="sidebar__brand-badge">
            <svg className="sidebar__brand-badge-svg" viewBox="0 0 100 100">
              <circle className="sidebar__brand-circle sidebar__brand-glow" cx="50" cy="50" r="34" />
              <text
                className="sidebar__brand-badge-text sidebar__brand-glow"
                dominantBaseline="middle"
                fill="#05D588"
                fontFamily="Outfit, sans-serif"
                fontSize="21"
                fontWeight="600"
                letterSpacing="1.5"
                textAnchor="middle"
                x="51.5"
                y="52"
              >
                NLH
              </text>
            </svg>
          </span>
          <span className="sidebar__brand-copy">
            <svg aria-hidden="true" className="sidebar__brand-wordmark" viewBox="0 0 250 100">
              <line className="sidebar__brand-divider sidebar__brand-glow" x1="14" x2="14" y1="30" y2="70" />
              <text
                className="sidebar__brand-wordmark-text"
                dominantBaseline="middle"
                fontFamily="Outfit, sans-serif"
                fontSize="30"
                letterSpacing="1.5"
                x="39"
                y="52"
              >
                <tspan className="sidebar__brand-wordmark-fill sidebar__brand-glow" fontWeight="600">
                  NetLearnHub
                </tspan>
              </text>
            </svg>
          </span>
        </Link>
      </div>

      <div className="sidebar__section">
        <p className="sidebar__eyebrow">Navigation core</p>
        <nav className="sidebar__nav" aria-label="Primary navigation">
          {primaryLinks.map(({ icon: Icon, label, to }) => (
            <NavLink
              className={({ isActive }) =>
                [
                  'sidebar__nav-link',
                  isActive || (to === '/domains' && isCourseMapRoute) ? 'sidebar__nav-link--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')
              }
              key={to}
              to={to}
            >
              <Icon aria-hidden="true" size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar__section sidebar__section--stretch">
        <p className="sidebar__eyebrow">Domain matrix</p>
        <div className="sidebar__domain-list">
          {domains.map((domain) => (
            <NavLink
              className={({ isActive }) =>
                ['sidebar__domain-link', isActive ? 'sidebar__domain-link--active' : ''].filter(Boolean).join(' ')
              }
              key={domain.id}
              to={`/domains/${domain.id}`}
            >
              <span
                className={getDomainDotClass(
                  domainProgress[domain.id]?.status ?? 'not-started',
                )}
              />
              <span className="sidebar__domain-copy">
                <strong>
                  {domain.index}. {domain.title}
                </strong>
                <span>{domainProgress[domain.id]?.completionPercent ?? 0}% complete</span>
              </span>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="sidebar__footer">
        <Link className="sidebar__footer-link" to="/profile">
          <span className="sidebar__avatar">{avatarMonogram}</span>
          <div className="sidebar__footer-copy">
            <strong>{displayName}</strong>
            <span>Guest profile</span>
          </div>
        </Link>
      </div>
    </aside>
  );
}
