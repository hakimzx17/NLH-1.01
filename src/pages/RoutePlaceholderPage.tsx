import { Link } from 'react-router-dom';

import { Card } from '../components/ui/Card';
import { getButtonClassName } from '../components/ui/buttonClassName';

type RoutePlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel: string;
  actionTo: string;
  checklist: string[];
};

export function RoutePlaceholderPage({
  eyebrow,
  title,
  description,
  actionLabel,
  actionTo,
  checklist,
}: RoutePlaceholderPageProps) {
  return (
    <section className="page page--placeholder">
      <header className="page-header">
        <p className="page-header__eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-header__description">{description}</p>
        <div className="page-header__actions">
          <Link className={getButtonClassName()} to={actionTo}>
            {actionLabel}
          </Link>
        </div>
      </header>

      <Card className="placeholder-card" accent>
        <h2>Milestone 0 status</h2>
        <p>
          The route, shell, persistence, and navigation model are live. Feature-specific content and interaction
          engines land in later milestones.
        </p>
        <ul className="placeholder-card__list">
          {checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Card>
    </section>
  );
}
