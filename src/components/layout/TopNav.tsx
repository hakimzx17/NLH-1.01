import { useEffect, useRef } from 'react';
import {
  Boxes,
  ChevronDown,
  GraduationCap,
  Layers3,
  LibraryBig,
  Plane,
  Shield,
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

type TopNavProps = {
  lastLessonId: string;
};

export function TopNav({ lastLessonId }: TopNavProps) {
  const location = useLocation();
  const simulationsRef = useRef<HTMLDetailsElement>(null);
  const quickActionsRef = useRef<HTMLDetailsElement>(null);
  const isCourseMapRoute = location.pathname.startsWith('/domains');

  useEffect(() => {
    if (simulationsRef.current) {
      simulationsRef.current.open = false;
    }

    if (quickActionsRef.current) {
      quickActionsRef.current.open = false;
    }
  }, [location.pathname]);

  return (
    <div className="top-nav">
      <NavLink
        className={({ isActive }) =>
          ['top-nav__link', isActive || isCourseMapRoute ? 'top-nav__link--active' : ''].filter(Boolean).join(' ')
        }
        to="/domains"
      >
        Course map
      </NavLink>
      <NavLink
        className={({ isActive }) => ['top-nav__link', isActive ? 'top-nav__link--active' : ''].filter(Boolean).join(' ')}
        to="/flashcards"
      >
        Flashcards
      </NavLink>
      <NavLink
        className={({ isActive }) => ['top-nav__link', isActive ? 'top-nav__link--active' : ''].filter(Boolean).join(' ')}
        to="/vault"
      >
        Vault
      </NavLink>

      <details className="top-nav__dropdown" ref={simulationsRef}>
        <summary className="top-nav__summary">
          Simulations <ChevronDown size={16} />
        </summary>
        <div className="top-nav__menu">
          <NavLink className="top-nav__menu-link" to={`/lesson/${lastLessonId}/simulation`}>
            <Layers3 size={16} /> Packet flow simulation
          </NavLink>
          <NavLink className="top-nav__menu-link" to={`/lesson/${lastLessonId}/lab`}>
            <Boxes size={16} /> VLAN and lab preview
          </NavLink>
          <NavLink className="top-nav__menu-link" to={`/lesson/${lastLessonId}/quiz`}>
            <GraduationCap size={16} /> Lesson quiz route
          </NavLink>
        </div>
      </details>

      <details className="top-nav__dropdown top-nav__dropdown--highlight" ref={quickActionsRef}>
        <summary className="top-nav__summary top-nav__summary--highlight">
          Quick actions <ChevronDown size={16} />
        </summary>
        <div className="top-nav__menu">
          <NavLink className="top-nav__menu-link" to="/domains">
            <Boxes size={16} /> Browse CCNA Domains
          </NavLink>
          <NavLink className="top-nav__menu-link" to="/flashcards/domain-2">
            <LibraryBig size={16} /> Flashcard Mode
          </NavLink>
          <NavLink className="top-nav__menu-link" to="/exam">
            <Shield size={16} /> Launch Exam Session
          </NavLink>
          <NavLink className="top-nav__menu-link" to="/vault">
            <Plane size={16} /> Open Resource Library
          </NavLink>
          <NavLink className="top-nav__menu-link" to={`/lesson/${lastLessonId}/simulation`}>
            <Layers3 size={16} /> Subnet Calculator
          </NavLink>
        </div>
      </details>
    </div>
  );
}
